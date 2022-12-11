<template lang="pug">
div
    .uk-container.uk-width-xlarge.uk-text-meta
        .uk-flex.uk-flex-between.uk-grid.uk-grid-collapse.uk-flex-middle.uk-flex-row-reverse(class='uk-child-width-expand@s')
            div.uk-margin-bottom
                ul(class="uk-flex uk-flex-center uk-text-left@s").uk-list.uk-iconnav
                    li(v-for="(route, key) in routes" :key="key").uk-margin-remove
                            nuxt-link(:to="key").uk-link-muted {{ route.title }}
            div.uk-margin-bottom
               div(class="uk-text-center uk-text-left@s") &copy; 2022 Coordinature
            
        
</template>
<script>
export default {
   data() {
        return {
            logoSrc: '/logo.svg',
            routes : {
                '/legal/cookies': {
                    title: 'Cookies'
                },
                '/legal/privacy': {
                    title: 'Privacy Policy'
                },
                '/legal/disclaimer': {
                    title: 'Disclaimer'
                },
                '/contact': {
                    title: 'Contact'
                },
            }
        }
    }
}
</script>
