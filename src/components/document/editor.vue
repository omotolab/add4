<script setup>
const emit = defineEmits(['save', 'update:modelValue'])
const data = defineProps(['modelValue'])

const holder = 'editorjs'
const edit = inject('editor')({
    minHeight: 30,
    //readOnly: true,
    hideToolbar: true,
    holder,
    data: data.modelValue,
    onReady,
    onChange
})

console.log('edit', edit)


async function onReady(r) {
    console.log(Date.now(), 'editor: ready')
    console.log('data', data)
}

async function onChange(api, { type, timeStamp, detail }) {
    const data = await api.saver.save()
    emit('update:modelValue', data)
}

function handleSave() {
    edit.value.save().then((data) => {
        emit('save', {
            ...data
        })
    })
}

</script>
<template>

    <div class="uk-width-large uk-height-max-large bg-white uk-padding-small uk-overflow-auto">
        <ClientOnly>
            <div :id="holder"></div>
        </ClientOnly>
    </div>

</template>
<style>
.simple-image {
    padding: 20px 0;
}

.simple-image input {
    width: 100%;
    padding: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    outline: none;
    font-size: 14px;
}

.simple-image img {
    max-width: 100%;
}

.simple-image input,
.simple-image [contenteditable] {}

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