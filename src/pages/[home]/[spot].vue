<script setup>
import { useScreenOrientation } from '@vueuse/core'
const {
    isSupported,
    orientation,
    angle,
    lockOrientation,
    unlockOrientation,
} = useScreenOrientation()


const progress = ref(null)
const appConfig = useAppConfig()
const input = ref(null)


const { data } = await useFetch('/api/signal')

// console.log('d', data )
const selection = ref(0)
const options = computed(() => {
    if (!data.value) {
        return []
    }
    return data.value.map(g => g.label)
})

const tags = {
    contact: "Mama",
    expression: "need",
    topic: "food",
    time: "now"
}

const onTouch = ({ event, i }) => {
    console.log('item', i)
    selection.value = i
}

onMounted(() => {
    progress.value = 'loaded'
})
</script>
<template>
    <div v-if="!progress">
        <NuxtLayout name="display" class="">
            <view-icon-load />
            <div>loading..</div>
        </NuxtLayout>
    </div>
    <div v-else>
        <div class="h-screen w-screen flex items-center justify-center" style="background-color: #FFF">
            <div class="h-full flex flex-col">
                <div class="h-full bg-gray-50 p-0 shadow-md" style="background-color: #Fff">
                    <!--  <strong class="uk-h5 p-2 text-center uk-margin-remove w-full text-bold block"> Make a
                        gesture</strong>
                    <div>{{ orientation }}</div> -->
                    <!-- <motion-signal class="h-full" :label="data[selection].label" :path="data[selection].key" />
                     --><!-- <div>{{signal.value.length}}</div> -->
                </div>

                <div class="w-screen uk-background-primary h-600px overflow-auto"
                    uk-height-viewport="offset-bottom: true; offset-top: true">
                    <!-- <motion-absolute class="w-screen h-screen-w" v-if=" signal.value" :stream="signal.value" :name="data[selection].label"/> -->
                    <div class="overflow-auto shadow-md">
                        <!-- <view-tabs /> -->
                        <div class="shadow p-2">
                           <!--  <div class="my-2 uk-flex uk-flex-between uk-light">
                                    <button class="uk-border-rounded uk-icon-button mr-2"><span
                                            uk-icon="arrow-left"></span></button>
                                    
                                    

                                    <button class="uk-border-rounded uk-icon-button mr-2"><span
                                            uk-icon="check"></span></button>
                                </div> -->
                            <div class="uk-flex uk-flex-center uk-grid uk-grid-collapse" uk-grid="masonry: true">
                                <div v-for="(item, i) in options">
                                    <button @click="(event) => onTouch({ event, i })"
                                        class="rounded-md bg-gray-200 bg-opacity-20 mx-1 my-2 p-4 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">{{
        item
                                        }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" flex flex-col ">
                    <div class="h-full p-6 text-center w-full">
                        <ul class="uk-iconnav">
                            <li>
                                <span class="uk-icon-button uk-border-rounded uk-button-default">
                                    <view-icon-signal class="w-6 flex items-center justify-center" />
                                </span>
                            </li>
                            <li>
                                <span>
                                    <cover label="New Gesture" title="Create a new gesture" action="Save"></cover>
                                </span>
                            </li>
                        </ul>


                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
.h-screen-w {
    height: 100vw
}
</style>