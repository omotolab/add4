<script setup>
import { PaperAirplaneIcon, EnvelopeIcon, ArrowPathIcon } from '@heroicons/vue/20/solid'
import { useJwt } from '@vueuse/integrations/useJwt'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'
import toObject from 'dayjs/plugin/toObject'
import { useStorage } from '@vueuse/core'

dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(toObject)

/* dayjs('2018-04-04T16:00:00.000Z')
dayjs('2018-04-13 19:18:17.040+02:00')
dayjs('2018-04-13 19:18')
dayjs('1999-01-01').fromNow()
dayjs('1999-01-01').from(a) 
dayjs('1999-01-01').to(a)
dayjs('1999-01-01').toNow(true)
dayjs('2019-01-25').valueOf() 
dayjs('2019-01-25').toJSON()
dayjs('2019-01-25').toString()
dayjs().calendar(dayjs('2008-01-01')) */

const date1 = dayjs('2019-01-25')
const date2 = dayjs('2018-06-05')
date1.diff(date2)

const config = useRuntimeConfig()
const route = useRoute()

const name = window.location.hostname
const icon = config.public.pwaManifest.icons[0]

const time = reactive([])
const tick = reactive({
    started: Date.now()
})

const auth = reactive({
    xyz: {
        focus: {},
        index: {}
    },
    email: null,
})
const body = reactive({
    name: '',
    email: '',
})

const draft = useStorage('draft', {
    content: {
        blocks: [
            {
                type: 'paragraph',
                data: {
                    text: 'Unwritten'
                }
            }
        ]
    }
}, null, { mergeDefaults: true })


const title = computed(() => {
    console.log('dr', draft)
    if (!draft.value.content.blocks[0]) {
        return "Untitled"
    }
    return draft.value.content.blocks[0].data.text
})

const meta = computed(() => {
    if (!draft.value.content.blocks[1]) {
        return "Undescribed"
    }
    return {
        description: draft.value.content.blocks[1].data.text
    }
})


const handleUpdate = (u) => {
    console.log('ok', u)
    console.log('draft',)
    draft.value.content = u
    // useStorage('draft', draft)
}

const handleEmail = async () => {
    const url = `https://${config.public.API}.supabase.co/auth/v1/magiclink`
    const { data, error } = await useFetch(url, {
        method: 'post',
        headers: {
            apikey: config.public.KEY,
            "Content-Type": "application/json"
        },
        body: { email: body.email }
    })
    if (!error.message) {
        auth.email = body.email
    }
    // useMagicLogin({})
}

const collectProject = async ({ KEY, KEN }) => {
    const url = `https://${config.public.API}.supabase.co/rest/v1/@project?select=*`
    const { data, error } = await useFetch(url, {
        headers: {
            apikey: KEY,
            "Authorization": `Bearer ${KEN ? KEN : KEY}`,
            "Content-Type": "application/json"
        },
        // body: { email: body.email }
    })
    if (!error.value) {
        auth.xyz.projects = data.value
        useStorage('projects', data.value)
        console.log('d', data)
        console.log('a', auth)
    } else {
        console.log('stop', error)
    }

}

onBeforeMount(() => {
    if (route.hash) {
        route.hash.split('#')[1].split('&').forEach(entry => {
            const part = entry.split('=')
            auth[part[0]] = part[1]
        })
        auth.user = useJwt(auth.access_token).payload.value
        console.log('mounting', {
            session: auth.user.session_id,
            email: auth.user.email,
            role: auth.user.role,
            amr: dayjs(auth.user.amr[0].timestamp * 1000).fromNow(),
            exp: dayjs(auth.user.exp * 1000).fromNow(),
            sub: auth.user.sub,
        })
        collectProject({
            KEN: auth.access_token,
            KEY: config.public.KEY
        })
    } else {
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
    <cover class="h-screen w-screen bg-black justify-between  uk-position-fixed uk-position-top">
        <div class="w-full">
            <div class="w-full h-15 bg-green-200 flex items-center justify-center" >
                ok
            </div>
            <div class="w-full bg-green-300 shadow py-0.5">
                <div class="uk-height-medium uk-card-default mx-0.5 overflow-auto" contenteditable="true">ok</div>
            </div>
        </div>
       <!--  <cover class="h-full  uk-overflow-auto ">
            <div class="uk-container">
                <div class="uk-container-small bg-gray-100 shadow">
                    <div class="p-2 ">
                        <view-entry :title="title" :meta="meta" />
                    </div>
                    <div class="m-0.5 shadow-sm p-5 bg-white overflow-auto">
                        <view-content-editor v-model="draft.content" @update:modelValue="(i) => handleUpdate(i)"
                            class="uk-height-small" />
                    </div>
                    <div>
                        <view-content-monitor :body="body" :auth="auth" :icon="icon" :tick="tick" :draft="draft" />
                    </div>

                </div>

            </div>

        </cover> -->

        <div class="uk-position-fixed uk-position-bottom">
            <div class="bg-gray-100 shadow w-full">
                <div class="uk-container">
                    <div class="uk-container-small uk-margin-auto">
                        <div
                            :class="`uk-flex uk-flex-middle ${!auth.xyz.projects ? 'uk-flex-center' : 'uk-flex-between'}`">
                            <div class="p-2">
                                <ul class="uk-iconnav flex items-center">
                                    <li>
                                        <div :style="`background-image: url('${icon.src}')`"
                                            :class="`flex flex-column h-9 w-9 shadow-xl bg-contain mix-blend-${tick.mounted ? 'screen' : 'difference'}`">
                                        </div>
                                    </li>
                                    <li class="uk-width-expand">
                                        <div class="uk-grid uk-grid-small uk-flex uk-flex-between uk-flex-middle ">
                                            <form v-if="!auth.xyz.projects" @submit.prevent="() => handleEmail()"
                                                class="uk-inline ">
                                                <!-- <a class="uk-form-icon uk-form-icon-flip" href="#" :uk-icon="`icon: ${data.email.length > 0 ? 'check' : 'mail'}`"> </a> -->

                                                <button class="uk-form-icon uk-form-icon-flip"
                                                    :disabled="!body.email.trim().length > 0">
                                                    <template v-if="body.email.trim().length > 0">
                                                        <PaperAirplaneIcon style="height: 20px" />
                                                    </template>
                                                    <template v-else>
                                                        <template v-if="!auth.email">
                                                            <EnvelopeIcon style="height: 20px" />
                                                        </template>
                                                        <template v-else>
                                                            <ArrowPathIcon class="animate-spin" style="height: 20px" />
                                                        </template>

                                                    </template>
                                                </button>

                                                <input v-model="body.email"
                                                    class="uk-card-default uk-margin-remove p-20 uk-input uk-form-blank bg-white"
                                                    :placeholder="auth.email ? auth.email : `What is your email?`" />
                                            </form>
                                            <template v-else>
                                                <ul class="uk-iconnav uk-margin-small-left"
                                                    v-if="auth.xyz.projects.length > 0">
                                                    <li v-for="(project, p) in auth.xyz.projects" :key="p">
                                                        <div
                                                            :class="`flex flex-column items-center justify-center bg-white h-9 w-9 shadow-xl bg-contain mix-blend-${!tick.mounted ? 'screen' : 'difference'}`">
                                                            {{ p + 1 }}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <ul class="uk-iconnav">
                                                            <li v-for="(block, b) in draft.content.blocks" :key="b">
                                                                <div
                                                                    :class="`flex flex-column items-center justify-center bg-white h-9 px-3 w-auto shadow-xl bg-contain mix-blend-${!tick.mounted ? 'screen' : 'difference'}`">
                                                                    <span>{{ block.type }}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>

                                                <div class="uk-text-center ">
                                                    •••
                                                </div>
                                                <div class="uk-text-right">
                                <span uk-icon="plus"></span>
                            </div>
                                            </template>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="auth.xyz.projects"
                                class="transition-transform duration-150 p-0.5 h-14 w-14 hover:p-0 flex items-center justify-center ">
                                <div
                                    class="transition-transform duration-150 h-13 w-13 hover:h-14 hover:w-14 flex items-center justify-center shadow-md bg-white cursor-pointer">
                                    <span uk-icon="plus"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <cover class="h-300px bg-grey-300 bg-blue-300 w-full rounded-b-2xl ">Hello</cover>
        </div>

        <!--  <nuxt-page class="overflow-auto"/> -->
    </cover>
</template>