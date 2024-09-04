<script setup lang="ts">
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import type { Rules } from "async-validator";

const hasSignedUpWithInviteCode = useLocalStorage<boolean>('has-signed-up-with-invite-code', false)

watch(hasSignedUpWithInviteCode, (v) => {
  if(v) navigateTo('/sign-up/success')
}, { immediate: true })

useHead({
  title: "Welcome to TuruJobs.",
  meta: [
    {
      name: "description",
      content:
        "Connect with an audience of 230,000+ highly skilled designers and developers directly from design & development communities.",
    },
  ],
});

const form = reactive({
  email: '',
  inviteCode: '',
  acceptedTerms: false
})

const rules: Rules = {
  email: {
    type: "email",
    required: true,
    message: 'Please enter your company email'
  },
  inviteCode: {
    type: 'string',
    required: true,
    message: "Invite code invalid, reach us at help@turujobs.com if you've lose your invite code."
  },
  acceptedTerms: {
    type: 'boolean',
    asyncValidator: async (_r, v) => {

      if(!v) throw new Error('Please accept terms of service')

    },
    required: true
  }
}

const { errorFields, execute: executeAsyncValidate, pass } = useAsyncValidator(form, rules, { manual: true });
const codeIsIncorrect = ref(false)

async function submit() {

  await executeAsyncValidate()

  if(!pass.value) return 

  try {

    const res = await $fetch('/api/sign-up-with-invite', {
      method: 'POST',
      body: form
    })

    if(res.success) {

      localStorage.setItem('early-sign-up-data', JSON.stringify({
        email: form.email,
        invite_code: form.inviteCode,
        referral_code: res.referral_code
      }))

      hasSignedUpWithInviteCode.value = true

    } else {

      codeIsIncorrect.value = true
      
    }    
    
  } catch(e) {

    codeIsIncorrect.value = true

  }


  
}

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
            Sign up with invite code
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Sign up with your invite code to claim your $200 worth of job posting credits.
          </p>
        </div>

        <div class="mt-10">
          <div>
            <div class="space-y-6">

              <div>
                <label
                  for="invite-code"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Invite Code</label
                >
                <div class="mt-2">
                  <input
                    id="invite-code"
                    v-model="form.inviteCode"
                    name="invite-code"
                    type="invite-code"
                    placeholder="xxxx-xxxx-xxxx"
                    required
                    class="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 uppercase"
                  />
                </div>
                <div 
                  class="text-sm text-red mt-2"
                  v-if="errorFields?.inviteCode?.length"
                >
                  {{ errorFields.inviteCode[0].message }}
                </div>
                <div 
                  class="text-sm text-red mt-2"
                  v-else-if="codeIsIncorrect"
                >
                  Invite code invalid, reach us at help@turujobs.com if you've lose your invite code.
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Company Email address</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    v-model="form.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="john.doe@company.com"
                    required
                    class="block w-full px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div 
                  class="text-sm text-red mt-2"
                  v-if="errorFields?.email?.length"
                >
                  {{ errorFields.email[0].message }}
                </div>
              </div>

              <div class="w-full">
                <div class="flex items-center w-full">
                  <input
                    id="accepted-terms"
                    name="accepted-terms"
                    type="checkbox"
                    v-model="form.acceptedTerms"
                    class="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                  />
                  <label
                    for="accepted-terms"
                    class="ml-3 block text-sm leading-6 text-gray-700"
                  >
                    I accept 
                      <NuxtLink 
                        class="text-gray-900 underline" 
                        href="/resources/terms-of-service" 
                        target="_blank" 
                      >
                        Terms of Service
                      </NuxtLink>,
                      <NuxtLink 
                        class="text-gray-900 underline" 
                        href="/resources/disclaimer" 
                        target="_blank" 
                      >
                        Disclaimer
                      </NuxtLink>,
                      <NuxtLink 
                        class="text-gray-900 underline" 
                        href="/resources/coupon-legal" 
                        target="_blank" 
                      >
                        Coupon Terms of Service
                      </NuxtLink>,
                      <NuxtLink 
                        class="text-gray-900 underline" 
                        href="/resources/privacy-policy" 
                        target="_blank" 
                      >
                        Privacy Policy
                      </NuxtLink>
                  </label>
                </div>
                <div 
                  class="text-sm text-red mt-2"
                  v-if="errorFields?.acceptedTerms?.length"
                >
                  {{ errorFields.acceptedTerms[0].message }}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="rounded-full group/button bg-gray-900 text-white w-full px-8 py-4 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                  @click="submit"
                >
                  Next
                  <span
                    class="group-hover/button:translate-x-.5 duration-300 ease-in-out inline-block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </div>
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
