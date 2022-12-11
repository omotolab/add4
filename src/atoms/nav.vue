<template lang="pug">
nav(uk-navbar )
    template(v-if="edit")
        .uk-navbar-left
            ul.uk-iconnav
                li
                    nuxt-link(:to="'/'").uk-icon-button.uk-border-rounded
                        span(uk-icon="world")
                // li(v-for="route in map.stems")
                    nuxt-link(:to="route").uk-icon-button.uk-border-rounded
                        span(:uk-icon="index[route].icon")
        .uk-navbar-center 
            form
                // .uk-inline
                    span( class="uk-form-icon" uk-icon="icon: user")
                    .uk-icon-button.uk-border-rounded.uk-form-icon.uk-form-icon-flip
                        span( uk-icon="icon: chevron-down ")
                    input(v-model="author.displayName" disabled).uk-input.uk-form-blank
                
                .uk-inline
                    span( class="uk-form-icon" uk-icon="icon: user")
                    span( class="uk-form-icon" uk-icon="icon: lock").uk-form-icon-flip
                    input(v-model="author.displayName + ':' + author.displayStatus" disabled).uk-input.uk-form-blank.uk-text-center
                
        // 
        .uk-navbar-right
            ul.uk-iconnav
                li
                    .uk-icon-button.uk-border-rounded
                        span(uk-icon="check" @click="edit = false")
    template(v-else)
        slot
            .uk-navbar-left
                span {{ href }}
        .uk-navbar-right
            ul.uk-iconnav
                li
                    .uk-icon-button.uk-border-rounded
                        span(uk-icon="pencil" @click="edit = true")
                li
                    .uk-icon-button.uk-border-rounded
                        span(uk-icon="expand" @click="control")
</template>
<script>
export default {
    props: ['author', 'control'],  
    data() {
        return {
            edit: true,
            href: null
        }
    },
    mounted() {
        this.href = window.location.href
    }
}
</script>