<script setup lang="ts">

</script>

<template>
  <footer class="">
    <div class="py-12 px-6 lg:px-12 flex items-center justify-between lt-sm:flex-col gap-8">

      <div class="flex gap-6 items-center lt-sm:flex-col" >
        <NuxtLink href="#" class="-m-1.5 p-1.5 font-bold text-3xl inline-block mr-2"> TuruJobs </NuxtLink>
        <p class="leading-5 text-gray-900 text-sm">
          &copy; 2024 Turujobs, Inc. All rights reserved.
        </p>        
      </div>

      <div class="flex gap-6 text-sm" >
        <NuxtLink 
          class="underline" 
          href="/resources/terms-of-service"
        >
          Privacy Policy
        </NuxtLink>
        <NuxtLink 
          class="underline" 
          href="/resources/privacy-policy"
        >
          Terms of Service
        </NuxtLink>
        <NuxtLink 
          class="underline" 
          href="/resources/disclaimer"
        >
          Disclaimer
        </NuxtLink>
        <NuxtLink 
          class="underline" 
          href="/resources/coupon-legal"
        >
          Coupons Service
        </NuxtLink>
      </div>

    </div>
  </footer>
</template>