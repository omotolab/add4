<template lang="pug">
.uk-background-muted.uk-background-cover.uk-background-overlay.uk-background-norepeat.uk-height-viewport.uk-width-viewport(style='background-image: url(/print-grey.png);')
    .tm-gradient
        .uk-container
            .uk-width-xlarge.uk-margin-auto
                .uk-margin-top
                    .uk-flex.uk-flex-between.uk-text-meta
                        nuxt-link(to='/')
                            tm-logo(:src="logoSrc")
                        ul.uk-list.uk-flex.uk-flex-middle.uk-grid.uk-grid-small
                            li(v-for="(route,i) in routes").uk-margin-remove
                                nuxt-link(:to="i") {{ route.title }}
            div.uk-width-xlarge.uk-margin-auto.uk-overflow-auto(uk-height-viewport="offset-top:true; offset-bottom:true")
                slot
            tm-footer
</template>
<script>
export default {
    data() {
        return {
            logoSrc: '/logo.svg',
            routes : {
                '/features': {
                    title: 'Features'
                },
                '/articles': {
                    title: 'Articles'
                },
                '/plans': {
                    title: 'Plans'
                }
            }
        }
    }
}
</script>
