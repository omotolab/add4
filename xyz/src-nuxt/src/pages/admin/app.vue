<template lang="pug">
.uk-height-viewport.uk-flex.uk-flex-center.uk-flex-middle
    ClientOnly
        div(v-if="!isTauri")
            span(uk-icon="world")
        div(v-else)
            form(@submit.prevent="makeCommand")
                .uk-inline.uk-width-1-1
                    span(uk-icon="icon: chevron-right").uk-form-icon
                    // a(uk-icon="icon: check").uk-form-icon.uk-form-icon-flip
                    input(placeholder="Write a command..." v-model="input").uk-input.uk-form-blank.uk-placeholder.uk-margin-remove
            .uk-placeholder.uk-margin-small {{ command }}
              div(v-if="output") 
                pre 
                    code.uk-width-medium {{ output.stdout }}
    
</template>
<style>
    p {
    	white-space: pre;
    }
</style>
<script setup>
const monitor = async (id) => {
  const { __TAURI__ } = window
  if(!__TAURI__) return
  
  const { WebviewWindow } = __TAURI__.window
  const { Command } = __TAURI__.shell

  const command = commands[id]
  const output = await new Command(
    command.program, 
    command.args,
    command.options
  ).execute();

  const process = {
    type: 'command',
    source: command.options.cwd,
    input: command.program + ' ' + command.args,
    output,
    target: '@'
  }

  stream[id] = process;
  console.log('process', process)
  
  /* // loading embedded asset:
  const webview = new WebviewWindow('theUniqueLabel', {
    url: 'localhost:19006'
  });

  webview.once('tauri://created', function () {
    // webview window successfully created
    console.log('ready')
  });
  webview.once('tauri://error', function (e) {
    // an error happened creating the webview window
    console.error(e)
  }); */
};
</script>
<script>
    export default {
        data: () => ({
            input: '',
            program: 'mkdir',
            arguments: '@thismedium',
            options: {
                env: {
                    host: 'thismedium.com'
                },
                cwd: '.'
            },
            output: null
        }),
        computed: {
            isTauri() {
                return window.__TAURI__ !== undefined
            },
            command() {
                const parts = this.input.trim().split(' ')
                const program = parts[0].toLowerCase()
                const args = parts.slice(1)

                if( args.length < 1) return { program }
                return {
                    program,
                    args
                }
            }
        },
        methods: {
            async makeCommand() {
                if(!this.isTauri) return
                const { Command } = __TAURI__.shell
                const { program, args } = this.command

                if( args ) {
                    this.output = await new Command(
                        program, 
                        args,
                        this.options
                    ).execute();
                }  else {
                    this.output = await new Command(
                        program + '*', 
                        null,
                        this.options
                    ).execute();
                }
                
            }
        },
        created() {
            console.log('created')
        },
        mounted() {
            console.log('mounted')
        }
    }
</script>