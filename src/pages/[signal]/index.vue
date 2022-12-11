<script setup>
import { AtSymbolIcon, DocumentIcon, HomeIcon, EllipsisHorizontalIcon,  MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
const config = useRuntimeConfig()
const icon = config.public.pwaManifest.icons[0]
const route = useRoute()
const stream = route.params.stream
const status = stream.split('@').length === 2 && !stream.split('@')[1].includes("@")
console.log('r', status, stream.split('@'))
/* const { data } = await useFetch('/api/sample') */
const fixed = {
    'search': {
        icon: MagnifyingGlassIcon,
        link: '/search'
    },
    /* 'login': {
        icon: ArrowRightOnRectangleIcon,
        link: '/login'
    },
    'home': {
        icon: HomeIcon,
        link: '/home'
    },
    'guide': {
        icon: BookOpenIcon,
        link: '/guide'
    }, */

}
const known = {
    hosts: ['@skvr', '@mini', '@earthly'],
}
const search = computed(() => {
    const open = (Object.keys(route.query).length > 0) || route.params.stream === 'search'
    if (!open) { return false }
    return true
    console.log('route', route.query)
})
console.log('s', search)

const display = ({ name, icon }) => {
    console.log('i', icon)
    return h('div', { class: 'p-2' }, h(icon, { class: 'h-20px' }))
}

</script>
<template>
    <nuxt-layout>
        <!-- <div class="container overflow-auto">
                <div uk-grid="masonry: true">
                        <div v-for="(item, i) in data" :key="i">
                                <div class="">
                                        <view-token class="bg-white p-2 h-150px w-300px rounded">{{ item }}</view-token>
                                </div>
                        </div>
                        <div>
                                <div>
                                        <button @click="$router.push('/draft')">
                                                <div class="bg-white p-2 h-150px w-300px rounded">
                                                        <xyz-icon-plus></xyz-icon-plus>
                                                </div>
                                        </button>

                                </div>
                        </div>
                </div>
        </div> -->
            <view-token-link />
            <document-icon v-if="!status" class="h-20px" />
            <at-symbol-icon v-else class="h-20px" />
            <home-icon class="h-20px" />
            <nav class="w-full justify-center items-center p-2">
            <div v-if="!search && route.params.stream !== 'search'">
                <ul class="uk-iconnav w-auto m-auto flex justify-between">

                    <li>
                        <ul class="uk-iconnav">
                            <li v-for="(route, r) in fixed" :key="r">
                                <nuxt-link class="uk-icon-button uk-width-auto uk-border-rounded uk-padding-small"
                                    :to="route.link">
                                    <!--  <route.link class="h-20px w-20px"/> -->
                                    <display :name="r" :icon="route.icon"></display>
                                </nuxt-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <nuxt-link class="uk-icon-button uk-width-auto uk-border-rounded uk-padding-small"
                            :to="route.link">
                            <!--  <route.link class="h-20px w-20px"/> -->
                            <EllipsisHorizontalIcon class="h-20px w-20px"/>
                        </nuxt-link>
                    </li>

                </ul>
            </div>
            <div v-else>
                <ul class="uk-iconnav w-auto m-auto flex justify-end">
                    <li>
                        <button @click="() => $router.back()">
                            <div class="uk-icon-button uk-width-auto uk-border-rounded uk-padding-small">o</div>
                        </button>

                    </li>
                    <li>
                        <!-- display :name="r" :icon="route.icon"></display> -->
                        <!-- <div class="uk-icon-button uk-width-medium uk-border-rounded uk-padding-small">
                            
                        </div> -->
                        <FormKit placeholder="ok" class="w-10" />
                    </li>
                    <li>
                        <div class="uk-icon-button uk-width-auto uk-border-rounded uk-padding-small">o</div>
                    </li>
                </ul>
            </div>

        </nav>
            <!-- <div>{{ stream.split('@')[1] }}</div> -->
    </nuxt-layout>
</template>