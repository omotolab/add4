<template lang="pug">
.uk-height-viewport
  // div(uk-sticky="sel-target: nav; cls-active: uk-navbar-sticky")
      uk-navbar(v-if="$route.name !== 'index' && $route.name !== 'login' ")
  nuxt
  // nuxt-footer(v-if="$route.name !== 'index'").uk-light
</template>

<template lang="pug">
div
    nuxt-header(v-if="!options.includes($route.name)" options="options")
    nuxt
    nuxt-footer(v-if="!options.includes($route.name)").uk-container.uk-section.uk-section-small
</template>
<script>

export default {
    data() {
      return {
        items: [],
        options: [
          'index',
          'login'
        ]
      }
    },
    async fetch() {

      const content = await this.$content(`/`).fetch()
      this.items = content.map(item => ({
        name: item.slug,
        path: item.path
      }))
      
    }
}
</script>