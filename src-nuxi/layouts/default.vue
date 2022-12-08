<script setup>
import { ArrowRightOnRectangleIcon, EllipsisHorizontalIcon,  MagnifyingGlassIcon, GlobeAltIcon, HomeIcon, BookOpenIcon, DocumentIcon, AtSymbolIcon } from '@heroicons/vue/24/solid'
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
const route = useRoute()
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
    <cover :class="`bg-gray-300`">

        <cover>
            <main class="h-full w-full p-0.5 flex justify-center items-center">
                <slot></slot>
            </main>
        </cover>
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
    </cover>
</template>
<style>
#__nuxt {
    height: 100vh;
}
</style>