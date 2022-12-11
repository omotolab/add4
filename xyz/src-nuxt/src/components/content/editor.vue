<script setup>
const route = useRoute()
const { data } = await useAsyncData('get-document', () => queryContent(route.path).findOne())
console.log('d', data.value)
</script>
<template lang="pug">
</template>