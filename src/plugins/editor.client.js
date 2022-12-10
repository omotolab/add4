import EditorJS from '@editorjs/editorjs'
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.provide('editor', (settings) => {
        return new EditorJS({
            ...settings
        })
    })
})