<template>
    <div class="uk-card uk-card-small uk-card-default">
        <nuxt-content-head :content="item" @select="(i) => $emit('select', i)" @switch="toc = !toc"/>
        <nuxt-content-body :content="item" :toc="toc" />
    </div>
</template>
<script>
export default {
    props: ['item'],
    data() {
        return {
            toc: false
        }
    }
}
</script>