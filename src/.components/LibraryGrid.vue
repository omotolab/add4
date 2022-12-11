<script setup>
const props = defineProps({
  items: Array
})
// console.log(props.items)
// const gestures = ref(items)
</script>
<template>
    <div uk-grid="masonry: true" class="uk-flex uk-section uk-section-small uk-grid-small">
        <div v-for="(gesture, i) in items" :key="i" >
            <GestureCard v-if="gesture.samples" :label="gesture.label" :samples="gesture.samples" />
        </div>
    </div>
</template>