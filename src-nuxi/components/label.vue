
<script setup>
import {
    MagnifyingGlassIcon,
    XMarkIcon,
    PlayIcon,
    PauseIcon,
    PencilIcon,
    CheckIcon,
    BoltIcon,
    BoltSlashIcon,
    MoonIcon,
    SunIcon, PlusIcon, PhotoIcon, MicrophoneIcon, SpeakerWaveIcon, SpeakerXMarkIcon, EllipsisHorizontalIcon,
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon
} from '@heroicons/vue/24/solid'

const props = defineProps({
    action: 'search',
    show: false
})

const switches = {
    'search': h('')
}

const icon = 'MagnifyingGlass'
const ActionIcon = () => h(MagnifyingGlassIcon)

const on = ref(false)
</script>
<template>
    <div>
        <span class="uk-icon-button" @click="on = !on">
            <XMarkIcon v-show="on" style="height: 18px" />
            <ActionIcon v-show="!on" style="height: 18px" />
        </span>
    </div>
</template>