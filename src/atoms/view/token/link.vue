<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

// `qrcode` will be a ref of data URL
const { reader, text } = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        default: 'Hello world'
    },
    reader: {
        type: String,
        default: 'reader-key'
    }
})

const src = computed(() => {

    const code = useQRCode(text)
        
    return code
})

console.log('c', src.value)
/* const decoded = reactive({})

onMounted(() => setupScanner({ reader }))
function setupScanner({ reader }) {

    const scanner = useCamera({ reader })
    scanner.render(onScanSuccess, onScanFailure);

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    decoded.value = {
        text: decodedText,
        result: decodedResult
    }
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}
}
 */
</script>

<template>
    
    <template v-if="active && src.value">
        <img :src="src.value" alt="QR Code" />
    </template>
    <template v-else>
        <img src="//via.placeholder.com/300" />
    </template>
</template>