<template lang="pug">
div(uk-height-viewport="offset-top: true; offset-bottom: true")
    cover(
        :headline="message"
        :options="authOptions"
    )
</template>
<script>

export default {
    //layout: 'author',
    data() {
        return {
            message: 'You don’t have start alone.',
            authOptions: [
                {icon:'github'},
                {icon:'linkedin'},
                {icon: 'google'},
                
            ]
        }
    }
}
</script>
