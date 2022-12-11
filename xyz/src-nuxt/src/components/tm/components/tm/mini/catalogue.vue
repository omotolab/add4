<template lang="pug">
div(  uk-grid="masonry: true" )
        div( v-for="(item, i) in results.slice(0, 12)" :key="i" )
            tm-marli-ticket(:item="item" :index="i" @select="(state) => toggleSelection({ state, item, i })")
</template>
<script>
const tmEventPath = ({ keyword }) => {
    return `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword.replace(' ', '+')}&countryCode=NL&apikey=X6Q554L8KptqlzWqZFJ54jGCNKmHxVuh`
}

export default {
    props: ['items'],
    data() {
        return {
            selections: {},
            results: [],
            limit: 5,
            frame: 1000
        }
    },
    mounted() {
        this.items.forEach((item, i) => {
            const interval = this.frame / this.limit * i + 600
            
            setTimeout(async () => {
                const result = await this.searchKeywords({
                    keyword: item.name
                })
                if(!result["_embedded"]) return
                const { _embedded: { events } } = result
                this.results.push({
                    events,
                    ...item
                })
            }, interval)

        })
    },
    methods: {
        toggleSelection( { state, item, i } ) {
            this.selections[item.path] = {
                ...item,
                state
            }
        },
        async searchKeywords({ keyword }) {
            return await this.$axios.$get(tmEventPath({ keyword }))
        }
    },
}
</script>