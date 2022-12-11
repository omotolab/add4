<script setup>
const progress = ref(null)
onMounted(() => {
    progress.value = 'loaded'
})
</script>
<template>
    <div>
        <DocumentDrivenLoading v-if="!progress" />
        <DocumentDrivenLoaded v-else />
    </div>
</template>