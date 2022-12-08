<script setup>
import { AtSymbolIcon, DocumentIcon } from '@heroicons/vue/24/solid'
const route = useRoute()
const stream = route.params.stream
const status = stream.split('@').length === 2 && !stream.split('@')[1].includes("@")
console.log('r', status, stream.split('@'))

</script>
<template>
    <nuxt-layout>
        
            <document-icon v-if="!status" class="h-20px" />
            <at-symbol-icon v-else class="h-20px" />
            <!-- <div>{{ stream.split('@')[1] }}</div> -->
    </nuxt-layout>
</template>