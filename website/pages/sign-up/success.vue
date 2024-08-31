<script setup lang="ts" >

const hasSignedUpWithInviteCode = useLocalStorage('has-signed-up-with-invite-code', '')

onMounted(() => {

  watch(hasSignedUpWithInviteCode, (v) => {
    if(v.length === 0) navigateTo('/sign-up/with-invite')
  }, { immediate: true })

})

</script>

<template>
  <div class="flex min-h-screen flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            <span class="i-tdesign:loading h-8 w-8 inline-block mr-1 animate-spin animate-duration-1000" ></span><br /> All done! We'll let you in soon.
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            We'll be reaching out soon via email and help you with onboarding.
          </p>
          <div class="mt-6 ring-1 ring-inset ring-gray-500/20 rounded-4 p-6" >
            <div class="text-xs font-medium text-gray-400 mb-1" >
              Account credit:
            </div>
            <div class="text-3xl font-bold text-gray-900" >
              $200
            </div>
            <div class="text-xs font-medium text-gray-400 mt-1" >
              {{ hasSignedUpWithInviteCode }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="/assets/train.webp"
        alt=""
      />
    </div>
  </div>
</template>
