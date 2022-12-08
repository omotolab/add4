<script setup>
const props = defineProps(['label', 'description', 'path'])
// const body = data.value[selection.value]
const current = reactive({})
const stream = computed(async () => {
    const { data } = await useFetch(`/api/signal?path=${props.path}`)
    current.value = data.value
    return data.value
})
</script>
<template>
    <Suspense>
        <motion-absolute v-if="stream && current.value" :name="label" :stream="current.value"
            />
    </Suspense>
</template>