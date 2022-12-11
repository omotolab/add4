<template>
    <client-only>
        <JsonEditorVue v-model="content" v-bind="{/* local props & attrs */}" />
    </client-only>
</template>
  
<script setup>
const props = defineProps({
    content: String,
});

const { content } = toRefs(props);
</script>