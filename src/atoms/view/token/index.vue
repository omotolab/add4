<script setup>
import { useJwt } from '@vueuse/integrations/useJwt'
const { session } = defineProps(['session'])

const body = computed(() => {
    return useJwt(session.access_token).payload.value
})

const current = reactive({
    tick: 0,
    time: Date.now(),
})

const tock = computed(() => {
    if (!body) { return 0 }
    return body.exp // Math.round(((body.exp * 1000) - current.time) / 1000)
})

onMounted(() => {
    current.tick = 1
    current.time = Date.now()
    const entries = Object.entries(session).map(entry => {
        return `${entry[0]}=${entry[1]}`
    })
    current.link = window.location.href + '#' + entries.join('&')

    setInterval(() => {
        current.time = Date.now()
        current.tick = current.tick + 1
        current.tock = Math.round(((body.value.exp * 1000) - current.time) / 1000)
        // console.log('b', refresh_token)
    }, 1000)
}) 
</script>
<template>
    <div v-if="!body.aud === 'authenticated'">
        <!-- <div>{{ token }}</div> -->
        <slot>{{ body }}</slot>
    </div>
    <div v-else class="bg-gray-200 rounded">
        <div v-if="(current.tock > 0)" class="w-full">
            <div class="w-full p-0.5">
                <view-token-link class="uk-width-medium rounded-sm" :text="current.link" :active="current.tock > 0" />
            </div>
            <div class="px-0.5">
                <slot name="on">
                    <button class="uk-width-auto uk-padding uk-card-default rounded-sm">
                        <xyz-icon-bolt :active="true" />

                    </button>
                </slot>
            </div>

           <!--  <div>
                <span class="uk-margin-small-left uk-margin-small-right">{{ current.tock + ' seconds left' }}</span>
            </div>
            <div>
                <span class="uk-margin-small-left uk-margin-small-right">{{ Math.round(current.tock / 3) + ' hot beats left' }}</span>
            </div>
            <div>
                <span class="uk-margin-small-left uk-margin-small-right">{{ Math.round(current.tock / 10) + ' warm beats left' }}</span>
            </div>
            <div>
                <span class="uk-margin-small-left uk-margin-small-right">{{ Math.round(current.tock / 30) + ' cold beats left' }}</span>
            </div> -->

        </div>
    </div>
</template>