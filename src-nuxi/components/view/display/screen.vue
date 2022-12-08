<script setup>
const refreshIconStyle = 'animation: spin 3s linear infinite'
</script>
<template>
    <div class="h-full w-full flex items-center justify-center bg-white rounded shadow">
        <slot>
            <app-icon-refresh :style="refreshIconStyle" />
        </slot>
    </div>
</template>