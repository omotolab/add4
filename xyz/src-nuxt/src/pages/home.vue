<template lang="pug">
div(uk-height-viewport="offset-top: true; offset-bottom: true")
    cover(
        :name="headline"
        :options="options"
    )
</template>
<script>

export default {
    // layout: 'author',
    data() {
        return {
            headline: 'ai.logic.to:',
            authOptions: [
                { link: '@earthly', name: 'Discuss Earthly Matters'},
                { link: '@mini', name: 'Make it yours'},
            ]
        }
    },
    computed: {
        options() {
            return this.authOptions.map( option => {
                return {
                    ...option,
                    name: option.name +' '+ option.link
                }
            })
        },
        
    }
}
</script>
