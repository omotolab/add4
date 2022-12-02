<script setup>
import { useBrowserLocation } from '@vueuse/core'

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
            <to-list :items="items" />
            <hr />
            <view-qrcode :text="href" />
        </div>
    </div>
</template>