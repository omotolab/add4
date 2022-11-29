// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    srcDir: "xyz",
    css: ['uikit/dist/css/uikit.min.css'],
    modules: [
        'nuxt-windicss'
    ]
})

