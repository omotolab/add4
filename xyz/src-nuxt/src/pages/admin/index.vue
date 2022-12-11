<script setup>
console.log(Date.now(), 'setup script')
const { data: count } = await useFetch('/api')
const program = 'list'
const args = 'message'
const options = {
  cwd: '../',
  env: {
    SCOPE: 'INDEX'
  }
}
const commands = [{
  program,
  options,
  args
},{
  program: 'process',
  options: { cwd: '../../../tm-studio' } ,
  args: 'start --only tm-studio'
}]

const stream = {}

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

<template lang="pug">
.uk-height-viewport.uk-flex.uk-flex-center.uk-flex-middle.uk-background-muted
  div(v-for="(command, id) in commands" :key="id")
    div.uk-card.uk-card-small.uk-flex.uk-flex-center
      form(@submit.prevent="monitor(id)").uk-width-medium
        input(v-model="command.options.cwd" placeholder="program").uk-input
        input(v-model="command.program" placeholder="program").uk-input
        input(v-model="command.args" placeholder="arguments").uk-input
        input(type="submit").uk-button.uk-width-1-1
      // textarea(v-model="").uk-placeholder.uk-card-default.uk-width-medium
      .uk-card.uk-card-small.uk-width-medium.uk-card-default.uk-card-hover
        template(v-if="!stream[id]")
          div(@click="monitor(id)").uk-card-body.uk-button
            span.uk-text-capitalize Launch 
            span.uk-text-lowercase Native App
        template(v-else)  
          div.uk-card-body.uk-height-max-large.uk-overflow-auto
            ul.uk-list
              li(v-for="(value, key) in stream[id]" :key="key")
                pre
                  code {{ key + ": " }}
                  code {{ value }}
</template>
<script>

export default {
  mounted() {
    const { __TAURI__ } = window
    if(!__TAURI__) return consoe.log('not tauri')
    this.tauri: true
  }
}
</script>