<template lang="pug">
.uk-height-viewport.uk-flex.uk-flex-center.uk-flex-middle
    ClientOnly
        div(v-if="!isTauri")
            span(uk-icon="world")
        div(v-else)
            .uk-flex.uk-flex-inline.uk-flex-middle
                nuxt-link(to='/').uk-icon-button.uk-border-rounded
                    span(uk-icon="icon: arrow-left")
                h1.uk-text-center.uk-margin-remove
                    span.uk-margin-small-left {{ $route.params.scope }}
            // ul.uk-grid.uk-grid-small
                li(v-for="process in output")
                    pre.uk-width-medium.uk-height-small
                        code {{ process }}
            hr
            ul.uk-grid.uk-grid-small
                li(v-for="process in output")
                    pre.uk-width-medium.uk-height-small
                        code {{ process }}
</template>
<script setup>
const isTauri = computed(() => {
    return window.__TAURI__ !== undefined
})



/* const { Command } = window.__TAURI__.shell
const output = await new Command(
    'pm2', 
    'jlist'
).execute(); */


</script>
<script>
export default {
    data: () => ({
        output: null
    }),
    async mounted() {
        this.output = await this.monitorProcess()
        setInterval(async () => {
            this.output = await this.monitorProcess()
        }, 1000)
        
    },
    methods: {
        async monitorProcess() {
            const result = await this.command({
                program: 'pm2',
                args: 'jlist'
            })
            const output = JSON.parse(result.stdout)
            return output.map(({ pid, name, monit }) => ({ 
                    pid,
                    name,
                    monit
                })
            )
        }
    }
}
</script>