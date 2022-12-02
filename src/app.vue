<script setup>
import { useBrowserLocation } from '@vueuse/core'

const location = useBrowserLocation()
</script>
<template>
    <cover>
        {{ location.hostname }}
    </cover>
</template>