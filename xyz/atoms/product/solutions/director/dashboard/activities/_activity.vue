<template lang="pug">
div(v-if="!activity") 
    h1.uk-h1.uk-margin-large-top {{ phase.title }}
    p.uk-text-lead.uk-width-large {{ phase.description}}
div(v-else) 
    h1.uk-h1.uk-margin-large-top(v-if="activity.title") {{ activity.title }}
    p.uk-text-lead.uk-width-large(v-if="activity.description") {{ activity.description }}
    div(v-if="activity.children").uk-width-1-1
        ul(uk-tab)
            li(v-for="(activity, i) in activity.children") 
                a(v-if="!activity.children") {{ activity }}
                a(v-else) {{ activity.title }}
        ul.uk-switcher
            li(v-for="(activity, i) in activity.children").uk-height-large.uk-width-large
                h2.uk-h2 {{ activity.title }}
                p.uk-text-meta {{ activity.description }}
                p {{ activity.question }}
                div(v-if="activity.children").uk-flex.uk-flex-column
                    ul(uk-switcher).uk-subnav.uk-subnav-pill.uk-flex-last
                        li(v-for="(activity, j) in activity.children" :key="j")
                            a.uk-border-rounded {{ j + 1 }}
                    ul.uk-switcher
                        li(v-for="(activity, j) in activity.children" :key="j")
                            form.uk-margin-top
                                label.uk-margin {{ activity }}
                                textarea.uk-margin.uk-border-rounded.uk-textarea(placeholder="Write your answer in here")
                    

    
    
</template>
<script>
import {activities} from "~/constants/activities"
export default {
    layout: 'dashboard',
    data() {
        return {
            phase: {},
            activity: {},
            answers: {}
        }
    },
    mounted() {

        let params, phase, activity

        params = this.$route.params.activity.split("-")


        phase = params[0]
        activity = params[1]

        console.log(phase, activity)

        this.phase = activities[ phase ]
        this.activity = this.phase.children[ activity ] 
    },
    methods: {
        handleActivity(id) {
            alert("You have completed this!", id)
        }
    },
    computed: {
        
    }
}
</script>