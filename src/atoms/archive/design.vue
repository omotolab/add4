<script setup>
import { useLocalStorage } from '@vueuse/core'

const { public: { mode } } = useRuntimeConfig()

const body = useLocalStorage('local', {
    type: 'article',
    title: 'title',
    description: 'description',
    content: {
        time: Date.now(),
        version: 0,
        blocks: []
    }
})

const draft = ref(null)


function handleChange(event) {
    console.log('change', event)
    draft.value.save().then(handleContentUpdate).catch(handleError);
}

function handleReady({ editor }) {
    draft.value = editor
}

function handleSwitch(i) {
    console.log('i', i.target.innerText)
}

function handleTitleUpdate(i) {
    body.value.title = i.target.innerText
}

function handleDescriptionUpdate(i) {
    body.value.description = i.target.innerText
}

function handleSave() {
    draft.value.save().then(handleSuccess).catch(handleError);

    async function handleSuccess(outputData) {
        const config = useRuntimeConfig()
        handleContentUpdate(outputData)

        const { data, error } = await useFetch('api', {
            key: JSON.stringify(Date.now()),
            method: 'post',
            body: body.value
        })

        if (!data) {
            console.warn(error)
        } else {
            // alert(JSON.stringify(data))
            // await useStorage().setItem('storage', data)
            // store.value = await useStorage().getItem('storage')

            console.log('store', data.value)
        }

        // console.log('res', response)

    }

   
}

function handleError(error) {
        console.log('Saving failed: ', error)
    }

function handleContentUpdate(outputData) {
    body.value.content = outputData
}
</script>
<template>
    <div class="uk-grid uk-grid-collapse uk-flex uk-height-viewport">
        <div class="uk-width-expand shadow-inset">
            <div class="h-full p-4 ">
                <screen>
                    <div class="uk-card-default uk-width-expand uk-height-1-1 uk-section uk-card-body uk-overflow-auto">
                        <editor @ready="handleReady" @change="handleChange" :data="body.content" />
                    </div>

                </screen>

            </div>
        </div>
        <div class="uk-width-auto@s shadow-lg">
            <div class="uk-height-1-1">
                <div class="uk-height-viewport@s uk-overflow-auto">
                    <div class="uk-card uk-card-small shadow-innner">
                        <div class="uk-card-body uk-padding-remove-vertical">
                            <ul class="uk-list uk-list-small uk-margin-top uk-margin-bottom">
                                <li v-for="(block, b) in body.content.blocks" :key="b">
                                    <div class="shadow-md uk-background-default uk-border-rounded p-3 uk-width-medium@s">
                                        <div class="">
                                            <div class="uk-text-small uk-margin-small ">
                                                
                                                <div class="uk-text-meta text-xs">{{ block.type }}</div>
                                                <div>{{ block.data.text }}</div>
                                            </div>
                                            <div class="uk-flex uk-flex-right">
                                                <ul class="uk-iconnav">

                                                    <li>
                                                        <button class="uk-icon-button uk-border-rounded ">
                                                            <app-icon-picture />
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button class="uk-icon-button uk-border-rounded  ">
                                                            <app-icon-speaker />
                                                        </button>
                                                    </li>
                                                </ul>

                                            </div>

                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
.h-leave-square {
    height: calc(100% - 100vw)
}

.h-leave-options {
    height: calc(100vw - 234px)
}

.spin {
    animation: spin 60s linear infinite;
}

;

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>