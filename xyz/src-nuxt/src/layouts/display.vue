<template>
    <div>
        <uk-navbar v-show="$route.params.service" :items="items"/>
        <nuxt />
    </div>
</template>
<script>

export default {
    data() {
      return {
        items: []
      }
    },
    async fetch() {

      const content = await this.$content(`@marli`).fetch()
      this.items = content.map(item => ({
        name: item.slug,
        path: item.path
      }))
      
    }
}
</script>