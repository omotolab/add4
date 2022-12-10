<script setup>

const has = defineProps(['blocks'])
const emit = defineEmits(['save'])

const holder = 'editorjs'
const data = {
    // blocks: page.value.body ? page.value.body.children.map(toBlock) : [],
    blocks: []
}

const page = reactive({
    title: '',
    description: ''
})

const editor = reactive({})

function isReady(r) {
    console.log('r', r)
}

function handleSave() {
    editor.value.save().then((i) => {
        emit('save', i)
    })
}

onMounted(() => {
    // console.log('e', $editor())
    editor.value = inject('editor')({
        minHeight: 30,
        // readOnly: true,
        hideToolbar: true,
        tools: {},
        holder,
        // data,
        isReady
    })
})

</script>
<template>
    <div id="text" class="uk-card-small uk-card-default flex flex-col h-full">
        <div v-if="(page.title.trim().length > 0 || page.description.trim().length > 0)" class="uk-card-header uk-text-small">
            <div v-show="page.title">{{ page.title }}</div>
            <div v-show="page.description" class="uk-text-meta">{{ page.description }}</div>
        </div>
        <div :id="holder" class="h-full uk-card-body uk-overflow-auto uk-width-medium uk-height-medium"></div>
        <div class="uk-card-footer">
            <ul class="uk-iconnav uk-flex uk-flex-between">
                <li>
                    <ul class="uk-iconnav">
                        <li><button class="uk-icon-button uk-border-rounded"><span uk-icon="image"></span></button></li>
                        <li><button class="uk-icon-button uk-border-rounded"><span uk-icon="microphone"></span></button></li>
                    </ul>
                    
                    
                </li>
                <li>
                    <button class="uk-icon-button uk-border-rounded" @click="handleSave"><span uk-icon="check"></span></button>
                </li>
            </ul>
        </div>
    </div>
</template>