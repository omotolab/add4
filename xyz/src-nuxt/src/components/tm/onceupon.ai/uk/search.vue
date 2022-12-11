<template>
    <form class="uk-search uk-search-default uk-width-xlarge@s">
        <span uk-search-icon></span>
        <input v-model="input" class="uk-search-input uk-border-pill uk-input-small" type="search" placeholder="Search">
    </form>
</template>
<script>
export default {
    props: ['query'],
    data() {
        return {
            input: this.query
        }
    },
    watch: {
        input(newInput) {
            this.$emit('change', newInput)
        }
    }
}
</script>