<script setup>
const emit = defineEmits(['update:modelValue', 'change', 'ready'])
const props = defineProps(['settings','modelValue'])
const state = reactive({
    ...props.settings
})

function onEnter(e) {
    e.preventDefault()
    console.log('enter', e)
}

function onChange(api, event) {
    emit('change', {
        api,
        event
    })
}

function onReady() {
   /*  emit('ready', {
        editor: this.editor
    }) */
}

function initComponentModel() {
    
    /* data.value = {
        time: Date.now(),
        version: 0,
        blocks: [{
            type: 'paragraph',
            text: 'hello'
        }]
    }
    settings.value = {
        holder: 'ok',
        hideToolbar: true,
        placeholder: 'Let`s write an awesome story!',
        minHeight: 35,
        onChange,
        onReady,
        data: data.value
    } */
    console.log(Date.now(), 'editor component modelled')
}

function initComponentView() {
    // editor.value = 
    // console.log('editor component mounted', plugins)
}

onBeforeMount(initComponentModel)
// onMounted(initComponentView)
</script>
<template>
    <ClientOnly>
        <!-- <div>{{state}}</div> -->
        <div :id="state.holder"></div>
    </ClientOnly>
</template>
<script>
export default {
    data() {
        return {
            editor: null
        }
    },
    mounted() {
        const { settings } = this
        this.editor = this.$editor({ settings })
    }
}
</script>
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