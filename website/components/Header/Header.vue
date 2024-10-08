<script setup lang="ts">
import { ref } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink href="/" class="-m-1.5 p-1.5 font-bold"> TuruJobs </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900 bg-transparent"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <span
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="text-sm font-semibold leading-6 inline-flex items-center cursor-not-allowed"
        >
          {{ item.name }}
          <span class="rounded-full text-balance bg-gray-100/10 px-2 py-1 text-xs font-semibold leading-6 text-gray-800 ring-1 ring-inset ring-gray-500/20 ml-1 inline-flex items-center justify-center" >
            <span class="i-uis:lock-alt h-4 w-4 inline-block" />
          </span>
        </span>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink 
          href="/sign-up/with-invite" 
          class="text-sm font-semibold leading-6"
        >
          Sign up with Invite Code <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </nav>
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink href="/" class="-m-1.5 p-1.5 font-bold"> TuruJobs </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-900 bg-transparent"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/25">
            <div class="space-y-2 py-18">
              <span
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 sm:text-xl lt-sm:text-2xl font-semibold leading-7 cursor-not-allowed"
              >
                  {{ item.name }}
                  <span class="rounded-full text-balance bg-gray-100/10 px-2 py-1 text-xs font-semibold leading-6 text-gray-800 ring-1 ring-inset ring-gray-500/20 ml-1 inline-flex items-center justify-center" >
                    <span class="i-uis:lock-alt h-4 w-4 inline-block" />
                  </span>
              </span>
            </div>
            <div class="py-6 w-full">
              <NuxtLink
                href="/sign-up/with-invite"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
              >
                Sign up with Invite Code <span aria-hidden="true">&rarr;</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
