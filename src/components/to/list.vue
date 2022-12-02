<script setup>
const props = defineProps({
    items: {
        type: Object,
        default: function() {
            return [
                ['1', 'one'],
                ['2', 'two'],
                ['3', 'three']
            ]
        }
    }
})
</script>
<template>
    <ul>
        <li v-for="(itemValue, itemKey) in items" :key="itemKey">
            <to-list-item :name="itemKey" :value="itemValue" />
        </li>
    </ul>
</template>