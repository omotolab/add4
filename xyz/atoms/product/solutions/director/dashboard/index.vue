<template lang="pug">
        nuxt-content(:document="page[0]")
</template>
<style lang="scss">
.nuxt-content-editor{
    font-size: 16px ;
}
</style>
<script>
export default {
    layout: 'dashboard',
    data:() => ({
        active: 'home',
    }),
    asyncData:  async ({ $content }) => {

        const page = await $content().where({ slug: 'welcome' }).fetch()
        console.log("page", page)
        
        return {
            page
        }
    }
}
</script>
