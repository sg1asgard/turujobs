<script lang="ts">

</script>

<template>
  <div class="px-6 py-32 lg:px-8 mt-24 min-h-screen">
    <div class="bg-gradient-to-b from-blue-50 to-transparent absolute -z-1 top-0 inset-x-0 h-[25vh]" ></div>
    <div class="mx-auto prose prose-gray">
      <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
        <ContentRenderer :value="data" >
          <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
      </ContentQuery>
    </div>
  </div>
</template>