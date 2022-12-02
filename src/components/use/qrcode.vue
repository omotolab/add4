<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

// `qrcode` will be a ref of data URL
const props = defineProps({
    text: String,
    default: 'hello world'
})
const qrcode = useQRCode(props.text)

</script>

<template>
    <div>
        <img :src="qrcode" alt="QR Code" />
    </div>
</template>