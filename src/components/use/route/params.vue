<script setup>
const { params } = useRoute()
console.log('p', params)
</script>
<template>
    <div>
        <to-list :items="params" />
    </div>
</template>