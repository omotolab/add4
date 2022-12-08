<script setup>
import { useBrowserLocation } from '@vueuse/core'

const props = defineProps(['session'])
const { params } = useRoute()
const { value: { hostname, href } } = useBrowserLocation()
const items = {
    channel: hostname,
    ...params,
}
</script>
<template>
    <div>
        <div>
            <!-- <to-list :items="items" />
            <hr /> -->
            <use-qrcode :text="href+`/`+props.session" />
        </div>
    </div>
</template>