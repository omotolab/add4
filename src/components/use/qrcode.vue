<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

// `qrcode` will be a ref of data URL
const { reader, text } = defineProps({
    text: {
        type: String,
        default: 'Hello world'
    },
    reader: {
        type: String,
        default: 'reader-key'
    }
})

const qrcode = useQRCode(text)
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
    <div>
        <img :src="qrcode" alt="QR Code" />
        <!-- <div v-if="reader" :id="reader"></div>
        <div>{{ decoded }}</div> -->
    </div>
</template>