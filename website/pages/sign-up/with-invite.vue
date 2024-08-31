<script setup lang="ts">
useHead({
  title: "TuruJobs: Reach new horizons",
  meta: [
    {
      name: "description",
      content:
        "Connect with an audience of 230,000+ highly skilled designers and developers directly from design & development communities.",
    },
  ],
});
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
            <form action="#" method="POST" class="space-y-6">

              <div>
                <label
                  for="invite-code"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Invite Code</label
                >
                <div class="mt-2">
                  <input
                    id="invite-code"
                    name="invite-code"
                    type="invite-code"
                    required
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-600"
                  />
                  <label
                    for="remember-me"
                    class="ml-3 block text-sm leading-6 text-gray-700"
                  >
                    I accept <NuxtLink class="text-gray-900 underline" href="/" >Terms of Service</NuxtLink>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="rounded-full group/button bg-gray-900 text-white w-full px-8 py-4 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
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
            </form>
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
