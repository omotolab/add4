<script setup>
const props = defineProps({
  session: {
    type: Object,
    default: null
  },
});

const { session } = toRefs(props);

</script>

<template lang="pug">
div 
  div {{ session }}  
</template>