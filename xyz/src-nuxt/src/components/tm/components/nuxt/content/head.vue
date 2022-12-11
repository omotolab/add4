<template>
    <uk-card-header 
        :extension="content.extension"
        :slug="content.slug || content.name"
        @switch="(i) => $emit('switch', i)"
        @select="(i) => $emit('select', i)"
    />
</template>
<script>
export default {
    props: ['content'],
}
</script>