<script>
export default {
    data() {
        return {
            sources: []
        }
    },
    methods: {
        addSource( url ) {
            this.sources = [ ...this.sources, {
                url
            }]
            this.$forceUpdate();
        }
    }
}
</script>
<template lang="pug">
client-only
    .uk-section-small.uk-section-muted
        .uk-container
            .uk-grid.uk-grid-small
                div.uk-width-expand
                    // ul.uk-list.uk-list-small
                        li(v-for="i in 10")
                            .uk-card.uk-card-small.uk-margin-auto.uk-border-rounded.uk-placeholder.uk-padding-remove
                                .uk-card-header.uk-width-small
                                    .uk-text-meta Hello
                div.uk-width-auto
                    ul.uk-list.uk-list-small
                        li
                            .uk-card.uk-card-small.uk-margin-auto.uk-border-rounded.uk-placeholder.uk-padding-remove
                                .uk-card-header Hello
                                .uk-card-body.uk-border-rounded
                                    three-scene-physics-attraction(@snapshot="addSource" @recording="addSource").uk-width-xlarge.uk-height-xlarge.uk-border-rounded.uk-card-default
                                // .uk-card-footer
                                    .uk-text-meta Hello
                        li
                            .uk-card.uk-card-small.uk-margin-auto.uk-border-rounded.uk-placeholder.uk-padding-remove
                                .uk-card-body.uk-card-hover
                                    ul.uk-list.uk-list-collapse
                                        li(v-for="(source, id) in sources" :key="source")
                                            span {{ source.url }}
                                .uk-card-footer Hello
                div.uk-width-expand
                    // .uk-card.uk-card-small.uk-margin-auto.uk-border-rounded.uk-placeholder.uk-padding-remove.uk-height-1-1
                        .uk-card-header
                            .uk-width-small Hello
                        
</template>
