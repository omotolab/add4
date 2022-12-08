<script setup async>
import EditorJS from '@editorjs/editorjs';
// const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const { page } = useContent()
const { hash } = useRoute()

const mode = ref('viewer')
const data = {
    blocks: page.value.body ? page.value.body.children.map(toBlock) : []
}
const editor = new EditorJS({
    holderId: 'editorjs',
    // readOnly: true,
    minHeight: 30,
    data
})

const change = computed(() => {
    console.log('has', hash)
    return hash
})


function toBlock(el) {
    // console.log('el', el.children[0].value)
    if (!el.children[0]) { return null }
    if (!el.children[0].children) {
        return {
            type: 'paragraph',
            data: {
                text: el.children[0].value
            }
        }
    }

}
</script>
<template>
    <div class="bg-gray-300 overflow-auto h-full">
        <div>{{ change }}</div>
        <div class="container m-auto">
            <div class="uk-width-large@s uk-margin-auto">
                <ul class="">
                    <li v-if="mode === 'viewer'">
                        <div class="uk-card-small uk-card-default flex flex-col">
                            <div class="h-full uk-card-body uk-overflow-auto">
                                <NuxtPage />
                            </div>
                        </div>

                    </li>
                    <li v-else>
                        <div id="text" class="uk-card-small uk-card-default flex flex-col">
                            <div class="uk-card-header uk-text-small">
                                <div>{{ page.title }}</div>
                                <div class="uk-text-meta">{{ page.description }}</div>
                            </div>
                            <div id="editorjs" class="h-full uk-card-body uk-overflow-auto"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>