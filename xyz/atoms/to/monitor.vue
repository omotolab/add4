<script setup>
import collect from 'collect.js';
import { useSupabase } from '~/composables/stores'
const client = useSupabase()

const props = defineProps({
    title: {
        type: String,
        default: 'Title Placeholder'
    },
    subtitle: {
        type: String,
        default: 'Subtitle Placeholder'
    },
    conditions: {
        type: Object,
        default: {
            isDark: false
        }
    },
    footnote: {
        type: String,
        default: "All rights reserverd"
    }
});

const { conditions, footnote } = toRefs(props);

const process = computed(() => {
    return returnInputControlList(props.conditions)
})


async function signOutCurrentUser() {
    
    const { error } = await client.auth.signOut()
    
    if(error) {
       return console.error('err', error)
    }

    const router = useRouter()
    router.push('/login')

    console.log('current user is now logged out.')
}

function returnInputControlList(conditions) {
    return Object.entries(conditions).map(condition => {
        const entry = [condition[0], condition[1], returnInputControl(condition)]
        return collect(['name', 'value', 'action']).combine(entry).all()
    })
}

function returnInputControl(condition) {
    switch(typeof condition[1]) {
        case 'boolean':
            return function() {
                    const x = condition[0]
                    const y = conditions.value[condition[0]]
                    conditions.value[condition[0]] = !y
                    // console.log(x, y)
                }
        case 'object':
            return returnInputControlList(condition[1])
    }
}

// const { monitor } = toRefs(props);
// console.log('hello', controls.value)
</script>
<template lang="pug">
div
    .uk-card-header
        tm-header(:title="title" :subtitle="subtitle" :action="signOutCurrentUser")
    hr.uk-margin-remove
    .uk-card-body(uk-height-viewport="offset-top: true; offset-bottom: true")
        // pre
            code {{ process }}
        to-control(:children="process")
        // to-control(:name="`Settings`" :process="process")
        // slot
            ul.uk-list.uk-list-collapse
                li settings
                li 
                    hr
                li(v-for="task in process")
                    // to-control(:name="task.name" :action="task.action")
            .uk-grid.uk-flex.uk-flex-between.uk-flex-middle
                .uk-text-left.uk-text-tiny
                    .uk-text-small
                        ul.uk-list.uk-list-collapse.uk-margin-remove
                            li
                                span 
                                    .uk-text-small.uk-text-tiny Terms
                            li
                                span
                                    .uk-text-small.uk-text-tiny Terms
        .uk-width-expand
            tm-input(:conditions="conditions")
    // div
        hr.uk-margin-remove
        tm-footer(:links="['Terms', 'Privacy', 'Cookies']" :footnote="footnote" :actions="footerActions").uk-card-footer  


              
</template>
