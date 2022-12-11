<template>
    <div class="uk-card uk-card-small uk-card-default">
        <uk-card-header @switch="toc = !toc"/>
        <uk-card-body :document="document" :toc="toc"/>
    </div>
</template>
<script>
export default {
    props: ['document'],
    data() {
        return {
            toc: false
        }
    }
}
</script>