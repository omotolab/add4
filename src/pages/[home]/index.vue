<script setup>
import { HomeIcon } from '@heroicons/vue/24/solid'
const config = useRuntimeConfig()
const icon = config.public.pwaManifest.icons[0]
const route = useRoute()
/* const { data } = await useFetch('/api/sample') */
</script>
<template>
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
        <div class="bg-gray-300">
                {{ route.params.stream }}
                <home-icon class="h-20px" />
        </div>
</template>