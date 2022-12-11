<template>
    <div class="uk-button uk-button-primary uk-button-large uk-border-pill uk-light uk-text-lowercase">
        <uk-svg :src="logoSrc" />
       <!--  <span class="uk-text-large uk-margin-small-bottom">{{ text }}</span> -->
    </div>
</template>
<template lang="pug">
    div
        uk-svg(:src="'/' + $route.params.account +'/'+ logoSrc")
        span.uk-flex.uk-flex-middle.uk-flex-center
            span(v-show="icon" :uk-icon="icon" ).uk-icon-button
            span(v-show="text" ) {{ text }}
</template>
<style scope>


.uk-margin-small-bottom {
    margin-bottom: 7px!important;
}

.uk-text-lead {
    font-size: 3rem;
    line-height: 1.5;
}
</style>
<script>
export default {
    props: {
        icon: {
            type: String,
            default: null
        },
        text: {
            type: String,
            default: null
        },
        logoSrc: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            full: false
        }
    }
}
</script>
