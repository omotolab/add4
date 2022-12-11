<template lang="pug">
div(v-if="!link" @click="onPress" @mouseover="hovered = true" @mouseleave="hovered = false" :disabled="wait")
    template(v-if="!wait") 
        span(v-if="!hovered")
            span(v-show="icon" :uk-icon="icon")
            span(v-show="text") {{ text }}
        span(v-else)
            span {{ notice }}
    template(v-else)
        slot
div(v-else)
    nuxt-link( :to="link" ) {{ text }}
</template>
<script>
export default {
    props: ['onPress', 'notice', 'text', 'wait', 'link', 'icon'],
    data() {
        return {
            hovered: false
        }
    }
}
</script>