<template lang="pug">
div
    .uk-card.uk-card-small
        .uk-card-header {{ $route.params.id }}
        ul(uk-height-overflow="offset-top: true; offset-bottom: 70" v-if="messages").uk-list
            li(v-for="item in messages") 
                p {{ item.text }}
                em {{ item.user }}
        .uk-card-body(v-else) No Items
        .uk-card-footer.uk-card-secondary Input here
    .uk-card.uk-card-small Activities
        ul(uk-height-overflow="offset-top: true; offset-bottom: 70" v-if="activities").uk-list
            li(v-for="item in activities") 
                p {{ item.text }}
                em {{ item.user }}
        .uk-card-body(v-else) No Activities
        
</template>
<script>
export default {
    layout: 'home',
    mounted() {
        this.$store.dispatch('getMessages', this.$route.params.id)
        this.$store.dispatch('getActivities', this.$route.params.id)
    },
    computed: {
        messages() {
            return this.$store.state.message[this.$route.params.id]
        },
        activities() {
            return this.$store.state.activity[this.$route.params.id]
        }
    }
}
</script>