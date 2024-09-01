<script setup lang="ts" >
import { UseClipboard } from '@vueuse/components'

const hasSignedUpWithInviteCode = useLocalStorage('has-signed-up-with-invite-code', false)

interface EarlySignUpData {
  email: string
  invite_code: string
  referral_code: string
}

const earlySignUpData = useLocalStorage<EarlySignUpData>('early-sign-up-data', { email: '', invite_code: '', referral_code: '' }, { initOnMounted: true })

onMounted(() => {

  watch(hasSignedUpWithInviteCode, (v) => {
    if(!v) navigateTo('/sign-up/with-invite')
  }, { immediate: true })

})

const { data, status, refresh } = await useAsyncData(
  'info',
  () => $fetch('/api/get-sign-up-info', {
    method: 'POST',
    body: {
      email: earlySignUpData.value?.email,
      inviteCode: earlySignUpData.value?.invite_code
    }
  }),
  {
    server: false,
    watch: [earlySignUpData],
    immediate: false
  }
)

useIntervalFn(refresh, 60_000)

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
            <span class="i-tdesign:loading h-8 w-8 inline-block mr-1 animate-spin animate-duration-1000" ></span><br /> You're all done! We'll let you in soon.
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            We'll be reaching out soon via email and help you with onboarding.
          </p>
          <div class="mt-6 ring-1 ring-inset ring-gray-500/20 rounded-4 p-6" >
            <div class="text-xs font-medium text-gray-400 mb-1" >
              Account credit:
            </div>
            <div class="text-3xl font-bold text-gray-900" >
              $ {{ status === 'success' ? data?.credits : '...' }}
            </div>
            <div class="text-xs font-medium text-gray-400 mt-1" >
              {{ earlySignUpData?.email ?? '' }}
            </div>
          </div>
          <div class="mt-6 ring-1 ring-inset ring-gray-500/20 rounded-4 p-6" >
            <div class="text-lg text-gray-900 font-bold mb-1" >
              Invite your friends & earn more credits until you're let in:
            </div>
            <div class="text-sm text-gray-500 mb-1" >
              When a friend uses your invite code they get $100, and you get $10 worth of credits.
            </div>
            <UseClipboard v-slot="{ copy, copied }" :source="earlySignUpData.referral_code">
              <div class="mt-6 ring-1 ring-inset ring-gray-500/20 rounded-4 p-4 font-medium text-base relative" >
                <span class="select-all" >
                  {{ earlySignUpData.referral_code }}
                </span>
                <button 
                  class="right-4 top-1/2 -translate-y-1/2 absolute bg-gray-900 text-white rounded-full text-sm py-1.5 px-4" 
                  @click="copy()"
                >
                  {{ copied ? 'Copied' : 'Copy' }}
                </button>
              </div>
            </UseClipboard>
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
