<template lang="pug">
.uk-height-viewport.uk-flex.uk-flex-center.uk-flex-middle
    ClientOnly
        div(v-if="!isTauri")
            span(uk-icon="world")
        div(v-else)
            div(@click="designProcess").uk-placeholder.uk-padding-small.uk-width-medium.uk-flex.uk-flex-between
                div ok
            ul.uk-list
                li(v-for="{ name, monit } in output.reverse()")
                    .uk-placeholder.uk-padding-small.uk-width-medium.uk-flex.uk-flex-between.uk-background-muted
                        div
                            span(uk-icon="cog")
                            span.uk-margin-small-left {{ name }}
                        nuxt-link(to="process")
                            span.uk-margin-small-left {{ monit.cpu }}
                            span.uk-margin-small-left {{ monit.memory }}
            
</template>
<script>
const command = async ({ program, args, options}) => {
  const { __TAURI__ } = window
  if(!__TAURI__) return

  const { Command } = __TAURI__.shell

  const output = await new Command(
    program, 
    args,
    options
  ).execute(); 

  return output
}

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
    computed: {
        isTauri() {
            return window.__TAURI__ !== undefined
        }
    },
    methods: {
        async monitorProcess() {
            const result = await command({
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
        },
        async designProcess() {
            const result = await command({
                program: 'pm2',
                args: 'start --only tm-studio'
            })
            console.log('result', result)
            /* const output = JSON.parse(result.stdout)
            return output.map(({ pid, name, monit }) => ({ 
                    pid,
                    name,
                    monit
                })
            ) */
        }
    }
}
</script>