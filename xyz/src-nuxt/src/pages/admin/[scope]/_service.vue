<template lang="pug">
.uk-section.uk-section-small
  .uk-container
    div.uk-flex.uk-flex-center.uk-grid.uk-grid-small

      div.uk-width-auto(v-if="isLive")
        div.uk-width-medium
          tm-mini-dialogue( :aid="isLive.id" :service="$route.params.service" class="uk-width-large uk-margin-auto")

      template(v-if="list")
        div.uk-width-expand
          div(
            :class="Object.keys(selections).length > 0 ? `` : `uk-grid uk-grid-small uk-child-width-1-2@m`" 
            uk-grid="masonry: true" )
            div(v-if="Array.isArray(list)" v-for="(item, i) in list.slice(0, 10)" :key="i" )
              nuxt-content-item(:item="item" @select="(state) => toggleSelection({ state, item, i })")
        div(v-if="Object.keys(selections).length > 0")
          .uk-card.uk-card-small
            .uk-card-header Selections
            .uk-card-body
              ul.uk-list
                li(v-for="(item, i) in selections" :key="i")
                  div.uk-width-medium {{ item }}

      template(v-else-if="content")
        nuxt-content-item(:item="content" @select="(state) => toggleSelection({ state, item, i })")
      
</template>

<script>
import { findIndex } from 'rambda'
const tmEventPath = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=sensation&countryCode=NL&apikey=X6Q554L8KptqlzWqZFJ54jGCNKmHxVuh'
async function  asyncData ({ $content, $axios, route }) {

    const { name, path, hash, params } = route
    let content, events
    
    try {

      content = await $content(path).fetch()
      events = await $axios.$get(tmEventPath)

    } catch(err) {

      console.log(err)

    } finally {
      if (!content) { return { events } }
      if ( Array.isArray(content) ) return { list: content, events }
      else if ( content.body && Array.isArray(content.body) ) return { list: content.body, events }
      else return { list: [ content ], events }

    }
}

export default {
  asyncData,
  data: () => ({
    query: '',
    selections: {},
    services: {
      'Ticket Master': ''
    }
  }),
  methods: {
    changeSearchQuery(i) {
      this.query = i
      // this.$router.push(`?search=${i}`)
    },
    toggleSelection( { state, item, i } ) {
      this.selections[item.path] = {
        ...item,
        state
      }
    },
    toggleView( instanceId ) {
      this.view[instanceId] !== undefined ? 
        this.view[instanceId] = !this.view[instanceId] :
        this.view[instanceId] = false
        console.log(instanceId, this.view[instanceId])
    }
  },
  computed: {
        isLive() {
            const param = this.$route.params.scope
            const parts = param.split('@')

            const isLive = parts.length === 2 && parts[0].length === 0

            if(!isLive) return

            return {
                isLive,
                id: parts[1]
            }
        },
  },
}
</script>
