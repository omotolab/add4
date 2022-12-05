<script setup>
import { BoltIcon, ArrowRightOnRectangleIcon, CubeTransparentIcon, SunIcon, PhotoIcon, DocumentTextIcon, SpeakerWaveIcon, SpeakerXMarkIcon, MicrophoneIcon, BoltSlashIcon, EllipsisHorizontalIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/20/solid'
import { BoltIcon as BoltIconOutline } from '@heroicons/vue/24/outline'
import { useStorage, useDark, useToggle } from '@vueuse/core'
import { useJwt } from '@vueuse/integrations/useJwt'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const router = useRouter()
const config = useRuntimeConfig()
const route = useRoute()
const name = window.location.hostname
const icon = config.public.pwaManifest.icons[0]
const size = 12

const auth = useStorage('auth', null)
const load = useStorage('load', {
    time: Date.now(),
    items: {}
}, localStorage, { mergeDefaults: true })

const user = reactive({
    name: '',
    pass: ''
})

const isDone = ref(false)
const toggleDone = useToggle(isDone)

const isDark = useDark()
const toggleDark = useToggle(isDark)
// const conditions =  `mix-blend-${tick.mounted ? 'screen' : 'difference'}`

const tick = reactive({
    started: Date.now(),
    created: {}
})

onBeforeMount(() => {
    tick.current = Date.now()
    setInterval(() => {
        tick.current = Date.now()
    }, 20)
})

onMounted(() => {
    tick.mounted = Date.now()
    console.log('mounted in', tick.mounted - tick.started, 'ms')
    /*  draft.title =  draft.content.blocks[0].data.text
     draft.meta = {
         description: draft.content.blocks[1].data.text
     } */

})

const method = "post"
const headers = {
    "Content-Type": "application/json"
}

const prompt = "Hello world"
const modelOutputs = reactive({})
// Request Body Params

const apiKey = config.public.API_KEY
async function handleBananaTxt(e) {
    const { _vts, timeStamp } = e
    const created = Date.now()
    const id = self.crypto.randomUUID()

    tick.created[id] = {
        time: Date.now(),
        tock: Date.now() - _vts,
    }

    const modelKey = config.public.TXT_KEY

    // Model Inputs
    const modelInputs = {
        prompt
    }
    const startOnly = false

    const body = { created, apiKey, modelKey, modelInputs, startOnly }


    if (!e.isTrusted) {
        console.log('not trusted', e)
        return
    }

    const url = `https://api.banana.dev/start/v4/`
    const { data, error } = await useFetch(url, { method, headers, body })

    if (error.value) {
        console.log('err', error.value)
        return
    }

    const response = JSON.parse(data.value)
    if (response) {
        if (response.finished) {
            load.value.items[id] = {
                prompt,
                outputs: response.modelOutputs
            }
            console.log('load', response.id)
        }
        /* if (!startOnly) {
            (response.finished) ? load.items = response.modelOutputs : response.message
            tick.created[id] = {
                ...tick.created[id],
                time: Date.now(),
                from: tick.created[id].time,
                span: Date.now() - tick.created[id].time,
                cost: Math.round(((response.created * 1000) - tick.created[id].time)  / 1000),
                item: response.finished ? response.modelOutputs : response.message
            }
        } else {
            console.log(Date.now(), 'started', response.id, Date.now() - response.created * 1000, 'ms', 'response.created', response)
            const { id, created, callID } = response

            async function checkBanana() {
                console.log(Date.now(), 'checked', id, Date.now() - created * 1000, 'ms', 'res', callID)
                const url = `https://api.banana.dev/check/v4/`
                const body = { callID }
                const { data, error } = await useFetch(url, { method, headers, body })
                if (error.value) {
                    console.log('err', error.value)
                    return
                }
                const response = JSON.parse(data.value)
                console.log(Date.now(), 'created', id, Date.now() - response.created * 1000, 'ms', 'res', callID)
            }

            setTimeout(checkBanana, 0)
        }
        console.log('finished', tick.created[id]) */
    }

}

async function handleBananaImg(e) {
    const { _vts, timeStamp } = e
    const created = Date.now()
    const id = self.crypto.randomUUID()

    tick.created[id] = {
        time: Date.now(),
        tock: Date.now() - _vts,
    }

    const modelKey = config.public.IMG_KEY

    // Model Inputs
    const modelInputs = {
        prompt
    }
    const startOnly = false

    const body = { created, apiKey, modelKey, modelInputs, startOnly }

    if (!e.isTrusted) {
        console.log('not trusted', e)
        return
    }

    const url = `https://api.banana.dev/start/v4/`
    const { data, error } = await useFetch(url, { method, headers, body })

    if (error.value) {
        console.log('err', error.value)
        return
    }

    const response = JSON.parse(data.value)
    if (response) {
        if (response.finished) {
            load.value.items[id] = {
                prompt,
                outputs: response.modelOutputs
            }
            console.log('load', response.id)
        }
        /* if (!startOnly) {
            (response.finished) ? load.items = response.modelOutputs : response.message
            tick.created[id] = {
                ...tick.created[id],
                time: Date.now(),
                from: tick.created[id].time,
                span: Date.now() - tick.created[id].time,
                cost: Math.round(((response.created * 1000) - tick.created[id].time)  / 1000),
                item: response.finished ? response.modelOutputs : response.message
            }
        } else {
            console.log(Date.now(), 'started', response.id, Date.now() - response.created * 1000, 'ms', 'response.created', response)
            const { id, created, callID } = response

            async function checkBanana() {
                console.log(Date.now(), 'checked', id, Date.now() - created * 1000, 'ms', 'res', callID)
                const url = `https://api.banana.dev/check/v4/`
                const body = { callID }
                const { data, error } = await useFetch(url, { method, headers, body })
                if (error.value) {
                    console.log('err', error.value)
                    return
                }
                const response = JSON.parse(data.value)
                console.log(Date.now(), 'created', id, Date.now() - response.created * 1000, 'ms', 'res', callID)
            }

            setTimeout(checkBanana, 0)
        }
        console.log('finished', tick.created[id]) */
    }

}

const handleEmail = async () => {
    const url = `https://${config.public.API}.supabase.co/auth/v1/magiclink`
    const { data, error } = await useFetch(url, {
        method: 'post',
        headers: {
            apikey: config.public.KEY,
            "Content-Type": "application/json"
        },
        body: { email: user.name }
    })
    if (!error.message) {
        // auth.email = body.email
        console.log('good')
        return
    }
    console.log('bad')
    // useMagicLogin({})
}

function handleBanana() {
    console.log('banana')
}

/* const balance = computed(() => {
    let wicks = []
    Object.values(tick.created).forEach(({ finished }) => {
        if(finished) {
            wicks.push(finished.time - _vts)
        }
    })
    console.log(wicks)
    return wicks
}) */

onBeforeMount(() => {
    let author = {}


    if (route.hash) {
        
        route.hash.split('#')[1].split('&').forEach(entry => {
            const part = entry.split('=')
            author[part[0]] = part[1]
        })
        author.user = useJwt(author.access_token).payload.value
        console.log('user', author)

        auth.value = route.hash
        user.value = author.user
        router.push('home')
        /* collectProject({
            KEN: auth.access_token,
            KEY: config.public.KEY
        }) */
    } 

    else if (auth.value) {
        auth.value.split('#')[1].split('&').forEach(entry => {
            const part = entry.split('=')
            author[part[0]] = part[1]
        })

        author.user = useJwt(author.access_token).payload.value
        if( author.user ) {
            console.log('user', author.user)
        }
        
        // auth.value = route.hash
    }
    
    
    else {
        console.log('no block')
    }


    tick.mounting = Date.now()
})

onMounted(() => {
    tick.mounted = Date.now()
    console.log('mounted in', tick.mounted - tick.started, 'ms')
    /*  draft.title =  draft.content.blocks[0].data.text
     draft.meta = {
         description: draft.content.blocks[1].data.text
     } */

})
</script>
<template>
    <cover :class="`uk-background-${isDark ? 'secondary' : 'muted'} uk-position-fixed w-full`"
        v-if="name !== 'localhost'">

        <div
            v-if="name === 'thismedium.com' || name === '127.0.0.1' || name === '192.168.2.5' || name === '172.20.10.3'">
            <div class="mix-blend-difference flex items-center h-full w-full justify-center">
                <div :style="`background-image: url('${icon.src}')`" :class="`bg-contain flex flex-column h-9 w-9 '`">
                </div>
            </div>
        </div>
        <div v-else-if="name === '192.168.2.5' || name === '172.20.10.3' || name === 'onceupon.ai'">
            <ul class="uk-iconnav">
                <!-- <li><view-focus>
                <div class="mix-blend-difference flex items-center h-full w-full justify-center">
                        <div :style="`background-image: url('${icon.src}')`"
                            :class="`bg-contain flex flex-column h-9 w-9 '`">
                        </div>
                </div>
            </view-focus></li> -->
                <li v-if="!auth">
                    <view-focus :toggleDone="toggleDone">

                        <CubeTransparentIcon class="w-9 " />
                        <template v-slot:header>
                            <div>Passwordless login</div>
                        </template>
                        <template v-slot:tick>
                            <FormKit v-model="user.name" type="email" placeholder="Enter an email to recieve your link" />
                        </template>
                        <template v-slot:tock>
                            <div>
                                A link has been sent to the email you provided. Check in a spam
                                as well for an email from supabase.
                            </div>
                        </template>
                        <template v-slot:primary>
                            <button type="button" @click="handleEmail"
                                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">

                                Continue
                            </button>
                        </template>
                    </view-focus>
                </li>
                <li v-else>
                    'logged in' as {{ auth }}
                </li>
            </ul>


        </div>
        <div v-else>
            <bolt-icon class="h-20px" />
        </div>

    </cover>
    <cover v-else class="bg-gray-300">
        <div class="w-250px">

            <div class="mb-2 bg-gray-100 hover:bg-gray-50 shadow-xl cursor-pointer h-60px rounded  bg-gray-200 hover:bg-gray-100flex text-center items-center justify-center "
                @click="handleBanana">
                <div class="mix-blend-difference flex items-center h-full w-full justify-center">
                    <div :style="`background-image: url('${icon.src}')`"
                        :class="`bg-contain flex flex-column h-9 w-9 '`">
                    </div>
                </div>
            </div>

            <div>
                <ul class="uk-iconnav m-0">
                    <li class="uk-width-expand">
                        <div class=" bg-gray-100 hover:bg-gray-50 shadow-xl cursor-pointer h-60px rounded  bg-gray-200 hover:bg-gray-100flex text-center items-center justify-center "
                            @click="handleBananaTxt">
                            <div class="mix-blend-difference flex items-center h-full w-full justify-center">
                                <!-- <div :style="`background-image: url('${icon.src}')`"
                        :class="`bg-contain flex flex-column h-9 w-9 '`">
                    </div> -->
                                <ChatBubbleBottomCenterTextIcon class="h-8 p-0.5 mr-1" />
                            </div>
                        </div>
                    </li>
                    <li class="uk-width-expand">
                        <div class=" bg-gray-100 hover:bg-gray-50 shadow-xl cursor-pointer h-60px rounded  bg-gray-200 hover:bg-gray-100flex text-center items-center justify-center "
                            @click="handleBananaImg">
                            <div class="mix-blend-difference flex items-center h-full w-full justify-center">
                                <!-- <div :style="`background-image: url('${icon.src}')`"
                        :class="`bg-contain flex flex-column h-9 w-9 '`">
                    </div> -->
                                <PhotoIcon class="h-8 p-0.5 mr-1" />
                            </div>
                        </div>
                    </li>

                </ul>
                <div class="mt-2 bg-gray-100 hover:bg-gray-50 shadow-xl cursor-pointer h-60px rounded  bg-gray-200 hover:bg-gray-100flex text-center flex items-center justify-center "
                    @click="handleBanana">

                    <div v-if="Object.entries(tick.created).length > 0">
                        <!--  <span v-for="entry in Object.entries(tick.created)">
                            <BoltIcon v-if="load.items[entry[0]]" class="h-18px p-0.5 mr-1" />
                            <BoltSlashIcon v-else class="h-18px p-0.5 mr-1" />
                        </span> -->
                        <span v-for="(entry, e) in size" :key="e">

                            <!-- <BoltIcon v-if="Object.entries(load.items)[e]" class="h-18px p-0.5 mr-1"/>
                            <SunIcon v-else-if="Object.entries(tick.created)[e]" class="h-18px p-0.5 mr-1" /> -->
                            <!-- <BoltIconOutline  class="h-18px p-0.5 mr-1" />
                            <div>{{Object.entries(tick.created)[e]}}</div> -->

                            <template v-if="Object.entries(tick.created)[e]">
                                <BoltIcon v-if="load.items[Object.entries(tick.created)[e][0]]"
                                    class="h-18px p-0.5 mr-1" />
                                <SunIcon v-else class="h-18px p-0.5 mr-1" />
                            </template>


                            <BoltIconOutline v-else class="h-18px p-0.5" />


                        </span>
                    </div>
                    <div v-else class="mix-blend-difference flex items-center h-full w-full justify-center">
                        <span v-for="(entry, e) in size" :key="e">

                            <BoltIconOutline class="h-18px p-0.5" />

                        </span>
                    </div>
                </div>

            </div>

            <div class="w-full">
                <ul v-if="Object.entries(tick.created).length > 0" class="uk-list uk-list-collapse w-full pt-15">
                    <li class="mt-1">
                        <div class="bg-gray-100 hover:bg-gray-50 cursor-pointer h-24px rounded ">
                            <!-- <progress class="uk-progress shadow-inner" v-if="entry[1].finished"
                                :value="(entry[1].finished.time - entry[1].clicked.time + entry[1].clicked.delay) / 1000"
                                max="100"></progress> -->
                            <progress class="uk-progress shadow-inner" :value="Object.entries(load.items).length"
                                :max="size"></progress>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center justify-between py-2" @click="handleBanana">

                            <span
                                class="uk-icon-button uk-button-secondary uk-border-rounded uk-flex uk-text-center uk-flex-center">
                                <BoltIcon v-if="load.items" class="h-18px p-0.5" />
                                <BoltSlashIcon v-else class="h-18px p-0.5 " />
                            </span>


                            <div class="flex items-center justify-center">
                                <ul v-if="load.items" class="uk-list uk-list-collapse m-0">
                                    <li v-for="({ output, image_base64 }, o) in load.items" :key="o">
                                        <div>{{ image_base64 }}</div>
                                        <ChatBubbleBottomCenterTextIcon v-show="output" class="h-8 p-0.5" />
                                        <PhotoIcon v-show="image_base64" class="h-8 p-0.5" />
                                    </li>
                                </ul>
                                <div v-else>
                                    <div
                                        class="uk-text-meta uk-text-center h-23px flex items-center justify-center bg-gray-100 rounded shadow-lg">
                                        {{ Math.round((tick.current - entry[1].time) / 1000) }}</div>
                                    <div class="h-4px mt-1 w-7 rounded-full bg-gray-500">
                                        <progress class="uk-progress shadow-inner"
                                            :value="((tick.current - entry[1].time) / 1000)" max="100"></progress>
                                    </div>

                                </div>
                            </div>

                            <EllipsisHorizontalIcon class="h-18px p-0.5 mr-1" />




                            <!-- <div class="bg-gray-300 hover:bg-blue-400 cursor-pointer w-200px h-24px rounded ">
<progress class="uk-progress shadow-inner" v-if="entry[1].finished"
:value="(entry[1].finished.time - entry[1].clicked.time + entry[1].clicked.delay) / 1000"
max="100"></progress>
<progress class="uk-progress shadow-inner" v-else
:value="(tick.current - entry[1].clicked.time) / 1000" max="100"></progress>
</div> -->
                            <!-- <div style="font-family: monospace, monospace;">
<div v-if="entry[1].finished">
{{ Math.round(((entry[1].finished.time - entry[1].clicked.time +
        entry[1].clicked.delay) / 1000) * 100) / 100
}}
</div>
<div v-else>{{ Math.round(((tick.current - entry[1].clicked.time) / 1000) * 100) / 100
}}</div>
</div> -->

                        </div>
                    </li>
                    <li class=" uk-height-medium uk-overflow-auto shadow-inner bg-gray-400 rounded">
                        <ul class="uk-list">
                            <li v-for="entry in Object.entries(tick.created)">
                                <div class="flex items-center justify-between p-2" @click="handleBanana">


                                    <BoltIcon v-if="load.items[entry[0]]" class="h-18px p-0.5 mr-1" />
                                    <SunIcon v-else class="h-18px p-0.5 mr-1" />

                                    <div class="flex items-center justify-center">
                                        <ul v-if="load.items[entry[0]]" class="uk-list uk-list-collapse m-0">
                                            <li v-for="({ output, image_base64 }, o) in load.items[entry[0]].outputs"
                                                :key="o">
                                                <ChatBubbleBottomCenterTextIcon v-show="output" class="h-8 p-0.5" />
                                                <PhotoIcon v-show="image_base64" class="h-8 p-0.5" />
                                            </li>
                                        </ul>
                                        <div v-else>
                                            <div
                                                class="uk-text-meta uk-text-center h-23px flex items-center justify-center bg-gray-100 rounded shadow-lg">
                                                {{ Math.round((tick.current - entry[1].time) / 1000) }}</div>
                                            <div class="h-4px mt-1 w-7 rounded-full bg-gray-500">
                                                <progress class="uk-progress shadow-inner"
                                                    :value="((tick.current - entry[1].time) / 1000)"
                                                    max="100"></progress>
                                            </div>

                                        </div>
                                    </div>

                                    <EllipsisHorizontalIcon class="h-18px p-0.5 mr-1" />




                                    <!-- <div class="bg-gray-300 hover:bg-blue-400 cursor-pointer w-200px h-24px rounded ">
                            <progress class="uk-progress shadow-inner" v-if="entry[1].finished"
                                :value="(entry[1].finished.time - entry[1].clicked.time + entry[1].clicked.delay) / 1000"
                                max="100"></progress>
                            <progress class="uk-progress shadow-inner" v-else
                                :value="(tick.current - entry[1].clicked.time) / 1000" max="100"></progress>
                        </div> -->
                                    <!-- <div style="font-family: monospace, monospace;">
                                <div v-if="entry[1].finished">
                                    {{ Math.round(((entry[1].finished.time - entry[1].clicked.time +
                                            entry[1].clicked.delay) / 1000) * 100) / 100
                                    }}
                                </div>
                                <div v-else>{{ Math.round(((tick.current - entry[1].clicked.time) / 1000) * 100) / 100
                                }}</div>
                            </div> -->

                                </div>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <div>{{ balance }}</div>
                    </li>
                </ul>
            </div>
        </div>



    </cover>
</template>
<style>
.uk-progress {
    height: inherit;
    border-radius: inherit;
    background-color: inherit;
}
</style>