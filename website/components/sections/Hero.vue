<script setup lang="ts">
import dayjs from 'dayjs';

const launch = dayjs('2024-09-15')

const timeLeftTillLaunch = ref<ReturnType<typeof dayjs.duration>>(dayjs.duration(launch.diff(dayjs())))

useRafFn(() => {

  timeLeftTillLaunch.value = dayjs.duration(launch.diff(dayjs()))

}, { fpsLimit: 16 })

const technologies = [
  {
    name: 'Vue',
    logoSrc: '/assets/technologies/vue3.svg'
  },
  {
    name: 'Nuxt',
    logoSrc: '/assets/technologies/nuxt3.svg'
  },
  {
    name: 'Astro',
    logoSrc: '/assets/technologies/astro.svg'
  },
  {
    name: 'React',
    logoSrc: '/assets/technologies/react.svg'
  },
  {
    name: 'Next',
    logoSrc: '/assets/technologies/next.svg'
  }
]

</script>

<template>
  <div class="bg-white">
    <div class="relative isolate py-32 md:py-64 min-h-screen grid place-content-center overflow-hidden">
      <div class="">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto text-center flex flex-col items-center">
            <span
              class="rounded-full text-balance bg-gray-100/10 px-6 py-2 text-base font-semibold leading-6 text-gray-800 ring-1 ring-inset ring-gray-500/20 mb-4 inline-block"
            >
              <span class="opacity-70 font-normal" >
                Launching Sept 15, 2024 /
              </span>
              <template v-if="timeLeftTillLaunch.days()" >
                {{ timeLeftTillLaunch.days() }}d, 
              </template>
              <template v-if="timeLeftTillLaunch.hours()" >
                {{ timeLeftTillLaunch.hours() }}h, 
              </template>
              <template v-if="timeLeftTillLaunch.minutes()" >
                {{ timeLeftTillLaunch.minutes() }}m, 
              </template>
              <template v-if="timeLeftTillLaunch.seconds()" >
                {{ timeLeftTillLaunch.seconds() }}s
              </template>
            </span>
            <h1 class="text-4xl font-bold tracking-tight sm:text-7xl">
              Hiring? Reach new horizons.
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-900 max-w-3xl">
              Connect with an audience of 230,000+ highly skilled designers and
              developers directly from design & development communities.
            </p>
            <div class="mt-10 flex items-center justify-center gap-6 lt-sm:flex-col">
              <NuxtLink
                href="/sign-up/with-invite"
                class="rounded-full group/button bg-gray-900 text-blue-100 px-8 py-4 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
              >
                Sign up with Invite Code
                <span
                  class="group-hover/button:translate-x-.5 duration-300 ease-in-out inline-block"
                  aria-hidden="true"
                >
                  →
                </span>
              </NuxtLink>
              <NuxtLink href="#" class="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
            <div class="flex flex-wrap justify-center items-center gap-12 mt-24" >
              <div
                v-for="(technology, index) in technologies"
                :key="index"
                class="invert-100 opacity-75"
              >
                <img
                  class="h-10 w-auto grayscale-100 contrast-100 brightness-250"
                  :src="technology.logoSrc"
                  :alt="technology.name"
                />
              </div>
              <div class="text-gray-900/80 font-medium">
                & 20+ other technologies
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute top-0 -z-1 w-full h-full overflow-hidden">
        <img
          src="/assets/document.png"
          alt="App screenshot"
          width="1000"
          height="1000"
          class="object-cover w-full h-full object-t lt-xl:blur-10"
        />
      </div>
    </div>
  </div>
</template>