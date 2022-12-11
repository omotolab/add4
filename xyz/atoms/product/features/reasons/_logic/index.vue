<template lang="pug">
.uk-card
    .uk-card-header
        span.uk-text-meta logic.to / {{ $route.params.logic }} / 
        span.uk-text-meta {{ $route.query }}
        ul
            // li(v-for="(propValue, propName) in Object.entries($route.query)")
                n-link
                    // span.uk-text-meta {{ $route.params.logic }} / {{ $route.query[propName] }}
        h2 {{ $route.params.logic }} 
    .uk-card-body   
        ul
            li(v-for="task in tasks") {{ task.name }}
    .uk-card-footer
        span logic.to / {{ $route.params.logic }}

</template>
<script>
export default {
    data() {
       return {
           list: this.tasks
       }
    },
    computed: {
        tasks() {
            return [
                { name: "Task A" },
                { name: "Task B" },
                { name: "Task C" }
            ]
        }
    },
    mounted() {
        console.log(this.$router)
    }
}
</script>