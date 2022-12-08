<script setup>
import { useDeviceMotion } from '@vueuse/core'

const signal = ref(null)

const requestMotionData = () => {
    if (location.protocol != "https:") {
        location.href = "https:" + window.location.href.substring(window.location.protocol.length);
    }

    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    motionData.value = useDeviceMotion('devicemotion', {
                        interval: 10
                    })
                }
            })
            .catch(console.error);
    } else {
        // handle regular non iOS 13+ devices
        motionData.value = useDeviceMotion('devicemotion', {
            interval: 10
        })
    }


}

const motion = ref(false)
const motionData = ref(null)
const motionDataHandler = (m) => {
    console.log('m', m)
}
const toggleMotionData = () => {
    if (!motion.value) {
        requestMotionData()
        if (!motionData.value) { return }
        motion.value = true
        console.log('on')
    } else {
        window.removeEventListener("devicemotion", motionDataHandler, true);
        motion.value = false
        motionData.value = null

        console.log('off', motion.value, motionData.value)
    }
}


onMounted(() => { })
</script>

<template>
    <div>

        <div v-if="motionData" class="uk-card">
            <nuxt-link :to="signal">
                <!-- <pre>
                    <code>{{ motionData }}</code>
                </pre> -->
                <display-three :motionData="motionData" class="uk-width-expand uk-padding-small uk-border-rounded" />

                <!-- <view-code :message="focused" class="uk-width-1-1" /> -->
            </nuxt-link>
        </div>
        <div class="uk-card uk-card-default uk-card-body uk-border-rounded uk-animation-scale-up uk-width-1-1">
            <ul class="uk-iconnav uk-flex uk-flex-middle uk-width-1-1 uk-grid">
                <li class="uk-width-expand">
                    <div class="uk-text-small uk-width-1-1 uk-width-1-1">
                        <div>
                            <strong>{{ motionData ? 'Recording..' : 'Unknown Signal' }}</strong>
                            <div>{{ motionData ? `@: ${motionData.interval}` : 'not recording' }}</div>
                        </div>
                    </div>
                </li>
                <li class="uk-width-auto">
                    <nuxt-link
                        :class="`uk-icon-button uk-border-rounded ${!motion ? ' uk-button-default' : 'uk-button-secondary'}`"
                        @click="(event) => toggleMotionData()">
                        <view-icon-signal />
                    </nuxt-link>

                </li>
            </ul>
        </div>

    </div>
</template>