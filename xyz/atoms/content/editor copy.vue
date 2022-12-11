<script setup>
const emit = defineEmits(['update:modelValue', 'change', 'ready'])
const props = defineProps(['settings', 'modelValue'])
const state = reactive({
    ...props.settings
})
const data = {
    time: Date.now(),
    version: 0,
    blocks: []
}
const setup = {
    on: false,
    hideToolbar: true,
    holder: 'editor',
    placeholder: 'Write something..',
    minHeight: 40,
    onChange,
    onReady,
    data: props.modelValue,
}
const signal = reactive([])

function onEnter(e) {
    e.preventDefault()
    console.log('enter', e)
}

async function onChange(api, { type, timeStamp, detail }) {
    const content = await api.saver.save()
    emit('update:modelValue', content)
}

function onReady(event) {
    emit('ready', event)
    console.log('r', event)
}


// onBeforeMount(initComponentModel)
onMounted(() => {
    state.editor = useEditor({
        ...setup,
        onChange,
        onReady
    })

})
</script>
<template>

        <div >
            <ClientOnly>
                <div :id="setup.holder"></div>
            </ClientOnly>
        </div>
  
</template>
<style>
/* .codex-editor__redactor {
    padding-bottom: 0px !important;
    height: 100%
} */

.ce-inline-toolbar {
    --y-offset: 30px;
    position: absolute;
    background-color: #fff;
    border: 1px solid #e8e8eb;
    -webkit-box-shadow: 0 3px 15px -3px rgb(13 20 33 / 13%);
    box-shadow: 0 3px 15px -3px rgb(13 20 33 / 13%);
    border-radius: 0px;
    z-index: 2;
}

.ce-inline-toolbar--left-oriented.ce-inline-toolbar--showed {
    -webkit-transform: translateX(-20px);
    transform: translateX(-20px);
}

.ce-inline-toolbar--left-oriented {
    -webkit-transform: translateX(-20px) translateY(20px) scale(.94);
    transform: translateX(-20px) translateY(20px) scale(.94);
}
</style>