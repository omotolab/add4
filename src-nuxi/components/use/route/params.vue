<script setup>
const { params } = useRoute()
const items = {
    params
}
console.log('p', params)
</script>
<template>
    <div>
        <to-list :items="params" />
    </div>
</template>