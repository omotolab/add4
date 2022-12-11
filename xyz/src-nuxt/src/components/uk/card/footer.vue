<template lang="pug">
.uk-card-footer
    .uk-button.uk-button-default.uk-button-large.uk-width-1-1(
        @click="proceed"
        :class="state == 100 ? 'uk-button-primary' : 'uk-button-default' "
        )
        span(v-show="!state") Reserve Ticket
        input( v-show="state" v-model="state" class="uk-range" type="range" min="0" max="100" step="10")
</template>
<script>
export default {
    data() {
        return {
            state: null
        }
    },
    methods: {
        proceed(e) {
            console.log(e)
            if(!this.state) { 
                return this.state = '50'
            }
        }
    }
}
</script>