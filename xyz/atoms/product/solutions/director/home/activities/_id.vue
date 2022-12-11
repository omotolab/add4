<template lang="pug">
div
    .uk-card.uk-card-small
        .uk-card-header {{ $route.params.id }}
    ul(uk-height-viewport v-if="items").uk-list
        li(v-for="item in items") 
            p {{ item.text }}
            em {{ item.user }}
    .uk-card-body(v-else) No Items
    .uk-card-footer Input here
</template>
<script>
export default {
    layout: 'home',
    mounted() {
        this.$store.dispatch('getActivities', this.$route.params.id)
    },
    computed: {
        items() {
            return this.$store.state.messages[this.$route.params.id]
        }
    }
}
</script>