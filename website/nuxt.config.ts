import { BREAKPOINTS } from "./consts";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-31',
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    'nuxt-delay-hydration',
    '@nuxt/content'
  ],
  image: {
    screens: BREAKPOINTS
  },
  nitro: {
    preset: 'static',
    
  },
  delayHydration: {
    mode: 'init',
    replayClick: true,
    hydrateOnEvents: ['click', 'scroll']
  },
  experimental: {
    componentIslands: true
  }
})