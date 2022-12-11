<template lang="pug">
div
  tm-marli-cover(:list="list")
  tm-marli-hero
  tm-marli-benefits
  tm-marli-footer
</template>
<script>
/* const fetchLibrairy = async () => {
  const { librairies } = await $fetch('/api/librairies')
} */

/* const user = ref(null)
const fetchMe = async () => {
  const { data } = await useFetch('/api/me', {
    headers: useRequestHeaders(['cookie'])
  })
  user.value = data
}
 */

async function  asyncData ({ $content, route }) {

    const { name, path, hash, params } = route
    let list
    
    try {

      list = await await $content(`${path}`).fetch()

    } catch(err) {

      console.log(err)

    } finally {

      return {
        list
      }

    }
}

export default {
  asyncData,
  computed: {
        isLive() {
            const param = this.$route.params.scope
            const parts = param.split('@')

            const isLive = parts.length === 2 && parts[0].length === 0

            if(!isLive) return

            return {
                isLive,
                id: parts[1]
            }
        }
  },
 }
</script>