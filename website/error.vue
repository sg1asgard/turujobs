<script setup lang="ts">
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

const props = defineProps<Props>()

</script>

<template>
  <div>
    <NuxtLayout>
      <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 min-h-screen">
        <div class="bg-gradient-to-b from-blue-100 to-transparent absolute -z-1 top-0 inset-x-0 h-[75vh]" ></div>
        <div class="text-center">
          <p class="text-base font-semibold text-gray-600">400</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink
              href="/sign-up/with-invite"
              class="rounded-full bg-gray-900 text-white px-8 py-4 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
            >
              Go back home
            </NuxtLink>
          </div>
        </div>
      </main>
    </NuxtLayout>    
  </div>
</template>