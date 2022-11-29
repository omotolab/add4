import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    nitro: {
        preset: "vercel",
    },
    srcDir: "xyz",
    css: ['uikit/dist/css/uikit.min.css']
    /* modules: [
        'nuxt-windicss'
    ], */
})
