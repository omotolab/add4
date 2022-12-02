<script setup>
const { name, label, value } = defineProps({
    'name': 'label',
    'label': 'Label',
    'value': Date.now()
})
</script>
<template>
    <!-- <div>
        <div v-if="name">name: {{ name }}</div>
        <div v-if="label">label: {{ label }}</div>
        <div v-if="value">value: {{ value }}</div>
        <div v-else>unknown entity</div>
    </div> -->
    <div>
        <div>{{ name }}: {{ value }}</div>
    </div>
</template>