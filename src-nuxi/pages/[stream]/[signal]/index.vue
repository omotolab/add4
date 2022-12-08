<script setup>
import { SignalIcon, DocumentIcon  } from '@heroicons/vue/24/solid'
const route = useRoute()
const stream = route.params.stream
const status = stream.split('@').length === 2 && !stream.split('@')[1].includes("@")
console.log('r', status, stream.split('@'))

</script>
<template>
    <cover>
        <document-icon v-if="!status" class="h-20px"/>
        <signal-icon v-else class="h-20px"/>
        <!-- <div>{{ stream.split('@')[1] }}</div> -->
    </cover>
</template>