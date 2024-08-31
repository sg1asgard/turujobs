// source: https://iconify.design/docs/libraries/tools/export/json.html
// modifications released under agency tools

import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from "@iconify/tools"
import fs from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputPath = join(__dirname, "./input")
const outputPath = join(__dirname, "./output")

const importIcons = async (prefix: string) => {
  // Import icons
  const iconSet = await importDirectory(inputPath, {
    prefix,
    includeSubDirs: true,
    keepTitles: true,
  })

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    if (type !== "icon") {
      return
    }

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      cleanupSVG(svg)

      // Assume icon is monotone: replace color with currentColor, add if missing
      // If icon is not monotone, remove this code
      parseColors(svg, {
        defaultColor: "currentColor",
        callback: (_attr, colorStr, color) => {
          return !color || isEmptyColor(color) ? colorStr : "currentColor"
        },
      })

      // Optimise
      runSVGO(svg)
    } catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  // Export
  const exported = JSON.stringify(iconSet.export(), null, "\t") + "\n"

  // Save to file
  await fs.writeFile(`${outputPath}/${iconSet.prefix}.json`, exported, "utf8")
}

export default importIcons
