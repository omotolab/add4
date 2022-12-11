<script setup>
import { BoltIcon, PlusIcon, BoltSlashIcon, PhotoIcon, EllipsisHorizontalIcon, PaperAirplaneIcon, EnvelopeIcon } from '@heroicons/vue/20/solid'
const props = defineProps({
    auth: Object,
    tick: Object,
    icon: Object,
    body: Object,
    draft: Object,
})
</script>
<template>
    <div :class="`uk-flex uk-flex-middle uk-flex-between uk-flex-row-reverse`">
        <div v-if="!auth.xyz.projects"
            class=" transition-transform duration-150 p-0.5 h-14 w-auto hover:p-0 flex items-center justify-center ">
            <div
                class="transition-transform duration-150 h-13 w-13 hover:h-14 hover:w-14 flex items-center justify-center shadow-md bg-white cursor-pointer">
                <!-- <span uk-icon="bolt"></span> -->
                <EllipsisHorizontalIcon class="h-5" />
            </div>
        </div>
        <div v-if="!auth.xyz.projects"
            class=" transition-transform duration-150 p-0.5 h-13 w-full flex items-center justify-center shadow-md bg-white ">
            <div
                class="transition-transform duration-150 h-13 w-50 flex items-center justify-center  cursor-pointer">
                <!-- <span uk-icon="bolt"></span> -->
                <!--  <plus-icon class="h-5" /> -->
                <div uk-slider>
                    <ul class="uk-slider-items">
                        <li v-for="block in draft.content.blocks">
                            <img class="h-10 w-10 bg-blue-100" src="" width="" height="" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="auth.xyz.projects" class=" transition-transform p-0.5 h-14 w-14  flex items-center justify-center ">
            <div class="duration-150 h-13 w-13 flex items-center justify-center shadow-md bg-white cursor-pointer">
                <span uk-icon="plus"></span>
            </div>
        </div>
        <div v-else
            class=" transition-transform duration-150 p-0.5 h-14 w-14 hover:p-0 flex items-center justify-center ">
            <div
                class="transition-transform duration-150 h-13 w-13 hover:h-14 hover:w-14 flex items-center justify-center shadow-md bg-white cursor-pointer">
                <!-- <span uk-icon="bolt"></span> -->
                <bolt-icon class="h-5" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.uk-iconnav>* {
    padding-left: 3px;
}
</style>