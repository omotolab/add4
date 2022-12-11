<template lang="pug">
    .uk-panel
        aux-switcher.d(v-if="history !== null" :pulse="pulse" :history="history")
        aux-editable.u(:action="makeApiRequest" :query="pulse.query" :state="state.card.isEditable" @update:query="updateQuery")
</template>
<script>

let u = userData.mailchimp
let s = userData.influx
let defaultQuery = s.q
let influxdb = `${s.h}/query?u=${s.u}&p=${s.p}&db=${s.db}&q=`
let mailchimpdb = `${u.h}/${u.db}/${u.q}.json`
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    auth: {
          username: s.u,
          password: s.p
    }
}
export default {
    name: 'mark-tm',
    components: {
        AuxEditable,
        AuxSwitcher
    },
    data: () => {
        return {
            pulse: {
                query: defaultQuery
            },
            view: 'table',
            state: {
                card: {
                    isEditable: false
                }
            }
        }
    },
    async fetch ({ store, params }) {
        await this.$axios.$get(mailchimpdb, config).then((res) => {
            this.$store.commit('members/add', res.data)
            console.log("FETCH EVENT:", store)
        })
    },
    actions: {
        nuxtServerInit ({ commit }, { req }) {
           console.log("SERVER REQUEST:", req)
        }
    },
    computed: {
        history: function () { return this.$store.state.history }
    },
    methods: {
        async makeApiRequest() {
            let query = this.pulse.query
            let influx = influxdb + query
            let sensors = await this.$axios.$get(influx)
            let series = sensors.results[0].series[0]
            let pulse = this.createPulse(query, series)
            this.updatePulse(pulse)
            console.log("NEW SENSOR RESULT", pulse)
        },
        updateQuery(query) {
            let pulse = this.createPulse(query, "NOT SENT")
            return this.updatePulse(pulse)
            console.log("UPDATED QUERY: ", pulse)
        },
        createPulse(req, res) {
            let pulse = {}
            pulse.query = req
            pulse.result = res
            pulse.moment = Date.now()
            pulse.description = 'New Pulse created from USP at ' + Date.now() + "."
            return pulse
        },
        updatePulse(pulse) {
            this.pulse = pulse
            // this.$store.commit('history/add', pulse)
        }
    }
}
</script>
