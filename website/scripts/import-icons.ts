// agency tool

import importIcons from "../icons/import.ts"

try {
  await importIcons("custom")
  console.log("Icons successfully imported!")
} catch (e) {
  console.log(e)
}
