<script setup>
const config = useRuntimeConfig()
const icon = config.public.pwaManifest.icons[0]
const isDark = useDark()
const { value: { hostname } } = useBrowserLocation()
const origin = (config.public.HOST === hostname)
console.log('H', config.public.HOST)
console.log('h', hostname)
</script>
<template>
    <cover :class="`${isDark ? 'uk-background-secondary' : 'bg-gray-300'} uk-position-fixed w-full h-screen`">
        <div class="flex items-center h-full w-full justify-center">
            <template v-if="!origin"><view-icon-bolt class="h-20px w-20px" /></template>
            <template v-else>
                <div :style="`background-image: url('${icon.src}')`"
                    :class="`bg-contain flex flex-column h-20px w-20px '`">
                </div>
            </template>
        </div>
    </cover>
</template>
