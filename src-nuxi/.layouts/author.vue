<script setup>
const auth = reactive({
  name: '',
  email: ''
})
</script>
<template>
    <div>
        <div>author home</div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>