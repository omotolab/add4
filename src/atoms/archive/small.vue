<script setup>
import { h } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const time = Date.now()
const head = ref('@scope')
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

const author = ref(null)
const content = ref(null)
const editable = ref(true)

function handleChange(event) {
    // console.log('change', event)
}

function handleReady({ editor }) {
    author.value = editor
}

function handleSave() {
    author.value.save().then(handleSuccess).catch(handleError);

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

    function handleError(error) {
        console.log('Saving failed: ', error)
    }
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

function handleContentUpdate(outputData) {
    body.value.content = outputData
}


</script>
<template>
    <div class="uk-height-viewport uk-card-default uk-background-muted uk-width-expand">

        <div>
            <div class="uk-card-footer">
                <div class="uk-container">hello</div>
            </div>
        </div>
        <div uk-height-viewport="offset-top: true; offset-bottom: true" >
            <div class="uk-grid uk-grid-collapse uk-flex">
                <div class="uk-width-expand">
                    <div class="uk-container">
                        <div class="uk-card-header uk-background-muted ">
                            Hello
                        </div>
                    </div>


                </div>
                <div class="uk-width-auto">
                    <div class="uk-container-small uk-margin-auto">
                            <div class="uk-width-xlarge uk-margin-auto">
                                <div class="uk-card-small uk-card-default">

                                    <div class="uk-card-header">
                                        <div class="uk-flex uk-flex-between uk-flex-middle">
                                            <div class="uk-text-small">
                                                <div class="uk-flex uk-flex-middle">
                                                    <!--  <div class="uk-icon-button uk-button-default uk-border-rounded">
    <div uk-icon="album"></div>
</div> -->
                                                    <div>
                                                        <div contenteditable="true" @input="handleTitleUpdate"> {{
                                                                body.title
                                                        }}
                                                        </div>
                                                        <div contenteditable="true" @input="handleDescriptionUpdate"
                                                            class="uk-text-meta">
                                                            {{ body.description }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button @click="handleSave" class="uk-icon-button uk-border-rounded">
                                                    <div uk-icon="check"></div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="uk-card-body uk-height-max-large uk-overflow-auto ">
                                        <div class="uk-margin-bottom uk-height-max-medium uk-overflow">
                                            <editor @ready="handleReady" @change="handleChange" :data="body.content" />
                                        </div>
                                    </div>
                                    <div class="uk-card-header uk-card-default">
                                        hello
                                    </div>
                                </div>
                            </div>

                        </div>


                </div>
                <div class="uk-width-expand">
                    <div class="uk-container">
                        <div class="uk-card-header uk-height-1-1">
                            hello
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div>
            <div class="uk-card-small uk-card-footer uk-background-muted">
                <div class="uk-container">
                    <div class="uk-container-small uk-margin-auto">
                        <div class="uk-width-xlarge uk-margin-auto">
                            <div class="uk-flex uk-flex-between uk-flex-middle">
                                <div class="uk-text-small">
                                    <div class="uk-flex uk-flex-middle">
                                        <!--  <div class="uk-icon-button uk-button-default uk-border-rounded">
                            <div uk-icon="album"></div>
                        </div> -->
                                        <div>
                                            <div contenteditable="true" @input="handleTitleUpdate"> {{ body.title }}
                                            </div>
                                            <div contenteditable="true" @input="handleDescriptionUpdate"
                                                class="uk-text-meta">
                                                {{ body.description }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button @click="handleSave"
                                        class="uk-icon-button uk-card-default uk-border-rounded">
                                        <div uk-icon="check"></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>


    </div>

</template>