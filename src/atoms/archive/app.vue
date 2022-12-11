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


function handleChange(event) {
    // console.log('change', event)
}

function handleReady({ editor }) {
    author.value = editor
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

</script>
<template>
    <div v-if="mode === 'display'">
        <screen class=" uk-height-viewport"></screen>
    </div>
    <div v-else class="uk-background-muted">
       <design></design>
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