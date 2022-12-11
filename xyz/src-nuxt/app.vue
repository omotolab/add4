<script setup>
useHead({
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})

console.log()
const project = process.env.project
const notice = '©2022 Plausible Analytics. All rights reserved.'
</script>

<template lang="pug">
.uk-height-viewport.uk-flex.uk-flex-center.uk-flex-middle
  div
    p {{ project }}
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
