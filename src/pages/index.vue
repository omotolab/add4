<script setup>
import { GlobeAltIcon } from '@heroicons/vue/24/solid'
</script>
<template>
    <cover class="flex justify-center items-center h-screen w-screen ">
        <globe-alt-icon class="h-20px"/>
        <div><p>{{ $t('hello') }}</p></div>
    </cover>
</template>