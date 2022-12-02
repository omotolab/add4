<script setup>
import { PhotoIcon, EllipsisHorizontalIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    title: {
        type: String,
        default: 'First writing block'
    },
    meta:{
        type: Object,
        default: function() {
            return {
                'description': 'This is a first of many'
            }
        }
    },
    action: {
        default: function () {
            return (i) => console.log(`${i}@${Date.now()}`)
        }
    }
})

function handleAction() {
    props.action(Date.now())
}

</script>
<template>
    <div class="uk-text-small">
        <ul class="uk-iconnav uk-flex uk-flex-middle">
            <li>
                <to-button class="uk-flex uk-flex-column uk-button-secondary">
                    <div>
                        <PhotoIcon style="width: 35px; margin-bottom: -15px" />
                    </div>
                    <span>
                        <EllipsisHorizontalIcon style="height: 25px; margin-top: -0px; margin-bottom: -3px" />
                    </span>
                </to-button>
            </li>
            <li>
                <div style="margin-bottom: -1px;">{{ title }}</div>
                <div style="font-size: 0.8rem" class="uk-text-meta">{{ meta.description }}</div>
            </li>
        </ul>
    </div>
</template>