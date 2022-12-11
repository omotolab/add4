<template lang="pug">
.uk-height-viewport.uk-flex.uk-flex-center.uk-flex-middle.uk-background-muted
    canvas-three.uk-card.uk-card-secondary.uk-width-large.uk-height-large.uk-border-rounded
// div
    .uk-card.uk-card-default.uk-background-muted.uk-card-small
        .uk-card-header Header
        .uk-grid.uk-grid-collapse(uk-height-viewport="offset-top: true; offset-bottom: true")
            .uk-width-expand.uk-flex.uk-flex-center.uk-flex-middle
                .uk-grid.uk-grid-small.uk-background-secondary.uk-border-rounded.uk-padding-small
                    canvas-three.uk-width-large.uk-height-large.uk-background-primary.uk-border-rounded
                    section.uk-width-medium
                        ul.uk-list(uk-sortable)
                            li(v-for="stream in streams")
                                .uk-card.uk-card-primary.uk-card-small.uk-card-body.uk-border-rounded 
                                    .uk-text-small {{ stream }}

                        
            // .uk-width-auto
                .uk-card.uk-card-default.uk-card-small
                    .uk-card-header(v-for="panel in panels")
                        .uk-flex.uk-flex-between
                            div {{ panel.label }}
                            ul.uk-iconnav
                                li(v-for="option in panel.options")
                                    .uk-width-medium
                                        a(:uk-icon="option")
                                    
                    .uk-card-body(uk-height-viewport="offset-top: true; offset-bottom: true")
                        input(placeholder="Input somthing here").uk-input
                        ul.uk-list.uk-list-small
                            li(v-for="control in controls")
                                div {{ control }}
                    .uk-card-footer
                        div time
</template>
<script>
export default {
    data: () => ({
        panels: [],
        streams: [],
        current: 0
    }),
    mounted() {
        this.streams = [
            'settings',
            'comments',
            'users',
            ...this.streams
        ],
        this.panels = [{
            label: 'main panel',
            settings: [
                'tick',
                'position',
                'scale',
            ],
            
        }, ...this.panels ]
    }
}
</script>