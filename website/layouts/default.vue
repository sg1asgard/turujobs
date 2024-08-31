<script setup lang="ts">
import "@unocss/reset/tailwind-compat.css";
import Footer from "~/components/Footer/Footer.server.vue";
import Header from "~/components/Header/Header.vue";

useHead({
  meta: [
    {
      name: "theme-color",
      content: "#ffffff",
    },
    {
      charset: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: "antialiased font-primary sm:text-lg text-gray-800 bg-white",
  },
});

</script>

<template>
  <a class="not-focus:sr-only focus:(z-10000 absolute)" href="#content">
    Skip to content
  </a>
  <Header />
  <main 
    id="content" 
    class="relative w-full overflow-hidden z-10"
  >
    <slot></slot>
  </main>
  <Footer />
  <!-- <div class="fixed bottom-0 inset-x-0 h-40 bg-gradient-to-t from-neutral-100/40 to-transparent pointer-events-none" /> -->
  <!-- <div class="fixed bottom-0 inset-x-0 h-4 backdrop-blur-md pointer-events-none" /> -->
</template>

<style>
  html {
    color-scheme: only light;
  }

  * {
    --uno: "focus:(outline-brand-primary outline-offset-4 )";
  }

  a,
  button {
    --uno: "touch-manipulation";
  }
</style>
