<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps(['session'])
const config = useRuntimeConfig()
const { params } = useRoute()
const { value: { host, pathname, port, href, fullPath, path, protocol } } = useBrowserLocation()
console.log('params', params, host, pathname, config.HOST)

const text = ref('')
if (config.HOST !== host) {
    if(!pathname) {
        text.value = "https://" + config.HOST
    } else {
        text.value = "https://" + config.HOST + pathname
    }
    
} else {
    text.value = href
}
const src = computed(() => useQRCode(text.value).value)

/* const { value: { hostname, pathname } } = useBrowserLocation()
const items = {
    channel: hostname,
    ...params,
} */
</script>
<template>
    <cover class="bg-gray-100">
        <div>
            <img :src="src" alt="QR Code" />
        </div>
        <div class="uk-card-default">
            <input v-model="text" />
        </div>
    </cover>
</template>
<style>
.h-w-screen {
    height: 100vw
}

@media (max-width: 640px) {
    .sm\:h-w-screen {
        height: 100vw
    }
}
</style>
