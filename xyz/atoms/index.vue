<template lang="pug">
div.uk-panel.uk-width-expand.uk-flex.uk-grid.uk-grid-collapse

        .uk-card.uk-card-small.uk-card-default.uk-card-small.uk-width-expand
            .uk-card-media.uk-overflow-auto(uk-height-viewport="offset-top: true; offset-bottom: true")
                .uk-section.uk-section-muted.uk-section-small.uk-height-1-3
                    .uk-container
                        h1.uk-h1 {{ $route.params.action }}
                        p {{ action.description }}
                        .uk-grid.uk-grid-small.uk-child-width-medium
                            .uk-panel
                                ul.uk-list
                                    li(v-for="(option, optionId) in options[$route.params.action]") 
                                        n-link(:to="$route.params.action+ '/' + optionId")
                                            .uk-card.uk-card-default.uk-width-medium.uk-background-muted
                                                .uk-card-header 
                                                    .uk-text-meta {{ optionId }}
                                                .uk-card-body {{ option.title }}
                                                .uk-card-footer
                                    li
                                        n-link(:to="`/create/profile`") 
                                            .uk-card.uk-card-default.uk-width-medium.uk-background-muted 
                                                .uk-card-header
                                                    .uk-text-meta {{ $route.params.action }}
                                                .uk-card-body Create a new {{ $route.params.action }}
                                        // n-link(:to="'/' + $route.params.action + '/' + account.id + '/'" ).uk-button.uk-button-default.uk-border-rounded.uk-text-lowercase.uk-width-1-1 {{ account.name }}
                            // div.uk-width-expand
                                .uk-height-large.uk-placeholder.uk-border-rounded hi
            .uk-card-footer.uk-card-default
                .uk-text-meta footer
        // .uk-card.uk-card-small.uk-card-default
            .uk-card-header.uk-flex.uk-flex-middle
                // span(uk-icon="chevron-left" @click="$router.push('/')").uk-text-meta
                .uk-text-meta {{ $route.params.action + 's' }}
            .uk-card-body(uk-height-viewport="offset-top: true; offset-bottom: true")
                
            .uk-card-footer
                .uk-text-meta &copy; 2021 Coordinature

</template>
<style>
 .resizable {
     resize: both;
 }
</style>
<script>
export default {
   // layout: 'mini',
   data() {
       return {
           action: {
               description: 'With Chrome profiles you can separate all of your Chrome stuff. Create profiles for friends and family, or split between work and fun.'
           },
           options: {
               create: {
                   report: {
                       file: {
                           name: 'first.txt',
                           time: {
                               save: '',
                               edit: '',
                           },
                           draft: '',
                           type: 'txt'
                       },
                       title: 'The First of many',
                   }
               }
           }
       }
   },
}
</script>