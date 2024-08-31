import {
  defineConfig,
  presetWebFonts,
  presetWind,
  presetIcons,
  transformerVariantGroup,
  presetTypography,
  transformerDirectives,
} from "unocss"
import { BREAKPOINTS } from "./consts.ts"
import customIcons from "./icons/index.ts"

const GET_BREAKPOINTS_AS_PX = () => {

  type Breakpoint = keyof typeof BREAKPOINTS

  const breakpoints = {} as Record<Breakpoint, string>
  
  Object.entries(BREAKPOINTS).forEach(([key, val]) => breakpoints[key as Breakpoint] = val+'px')

  return breakpoints
  
}

export default defineConfig({
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "src/**/*.{js,ts}",
      ],
    },
  },
  presets: [
    presetWind(),
    presetIcons({
      collections: {
        custom: () => customIcons,
      },
    }),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        "primary": ["Fira Sans:400;500;600;700;"],
      },
    }),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '4rem',
        md: '4rem',
        lg: '4rem',
        xl: '4rem',
        '2xl': '4rem',
      },
    },
    breakpoints: GET_BREAKPOINTS_AS_PX(),
  },
})
