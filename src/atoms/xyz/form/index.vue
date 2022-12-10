<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
<template>
    <div>
        <FormKit placeholder="Placeholder" :value="modelValue" @input="emit('update:modelValue', modelValue)"/>
    </div>
</template>