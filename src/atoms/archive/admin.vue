<script setup>

import { useDark } from '@vueuse/core'
const { logic: { to } } = require('./node_packages/thismedium/index.js') 

console.log('logic.to', to.log('hello'))

/* useHead({
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/images/logo.png',
    },
    {
      rel: 'manifest', href: '/manifest.json',
    },
  ],
}) */

const route = useRoute()
console.log('route', route)




// const toggleDarkness = useToggle(conditions.dark)
// const toggleEditability = useToggle(conditions.editable)

// Setup readable content
// const { account, project } = useRuntimeConfig()
// console.log(account, project)

// const today = new Date();
// const copyright = `Copyright © ${today.getFullYear()} ${account}. All rights reserved.`
// console.log(copyright)

const conditions = ref({
  dark: useDark(),
  mutuality: false,
  viewable: {
    panel: true,
    cover: true,
    page: true
  },
  content: 'Hello world'
})

const handlePanel = () => {
  console.log('con', conditions)
  conditions.value.viewable.panel = !conditions.value.viewable.panel
}

const actions = {
  header: [
    {
      type: 'toggle',
      name: 'mutability',
      icon: ['lock', 'unlock']
    }
  ],
  footer: [
    {
      type: 'toggle-settings',
      icon: ['unlock', 'lock'],
      state: conditions.value.viewable.panel,
      logic: handlePanel,
    }
  ]
}
console.log(actions)

onServerPrefetch(async () => {
  // component is rendered as part of the initial request
  // pre-fetch data on server as it is faster than on the client
  // data.value = await fetchOnServer(/* ... */)
  // console.log('ok', $config.public)
})

onMounted(() => {
  // console.log(document, window, process, this)
  // const { data: api } = await useFetch('/api/index')
})

</script>
<script>
export default {
  name: 'ChannelPage'
}
</script>

<template lang="pug">
div
  div(v-show="conditions.cover")
    // to-cover
  div(v-show="conditions.page")
    // to-page
</template>

<style>
html, body {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

.uk-height-viewport.uk-overflow-auto {
  height: 100vh
}

.uk-text-tiny {
  font-size: 10px
}

.uk-padding-tiny {
  padding: 2px
}

.uk-background-black {
  background: #000;
}

.uk-height-tiny {
  height: 25px,
}

.uk-width-tiny {
  width: 25px,
}

.uk-padding-xsmall {
  padding: 6px
}

</style>