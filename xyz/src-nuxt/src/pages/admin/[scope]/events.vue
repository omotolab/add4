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

      // template(v-else-if="content")
        nuxt-content-item(:item="content" @select="(state) => toggleSelection({ state, item, i })")
      
</template>

<script>
import { findIndex } from 'rambda'
const tmEventPath = ({ keyword }) => {
    return `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&countryCode=NL&apikey=X6Q554L8KptqlzWqZFJ54jGCNKmHxVuh`
}

async function  asyncData ({ $content, $axios, route }) {

    const { name, path, hash, params } = route
    const content = await $content(path).fetch()
    const list = content.body

    return {
      list
    }
}

export default {
  asyncData,
  data: () => ({
    list: [],
    query: '',
    selections: {},
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
    },
    getDetails({
      list,
      size
    }) {
          let results = []
          for (let i = 0; i < list.length; i += size) {
            // console.log(i)
            // const chunk = list.slice(i, i + size);
            /* const details = chunk.map(async item => {
                let detail
                setTimeout(async () => {
                  detail = await $axios.$get( tmEventPath({
                    keyword: item.name.replace("_", "+") 
                  }))
                }, 3000)
                return detail
            }) */
            // console.log(i, details, Date.now())
            function getResult() {
              results.push({end: i, time: Date.now()})
            }
            
            setTimeout(
              () => getResult(),
              1000
            )
          }
          return results
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
        events() {
          
          const details = this.getDetails({
            list: this.list,
            size: 5
          })

          return details

          console.log(Date.now(), details)
        }
  },
}
</script>
