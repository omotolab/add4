// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    srcDir: "src",
    css: ['uikit/dist/css/uikit.min.css'],
    modules: [
        '@vueuse/nuxt',
        '@formkit/nuxt',
        '@nuxt/content',
        'nuxt-windicss'
    ],

    /* Module Settings */


})

