// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    srcDir: "src",
    css: ['uikit/dist/css/uikit.min.css'],
    modules: [
        '@kevinmarrec/nuxt-pwa',
        '@vueuse/nuxt',
        '@formkit/nuxt',
        '@nuxt/content',
        'nuxt-windicss'
    ],


    /* Module Settings */
    pwa: {
        /* icon: {
            source: '//static.vecteezy.com/system/resources/previews/001/206/198/original/mountain-icon-png.png',
            fileName: 'mountain-icon-png.png'
        }, */
        icon: false,
        manifest: {
            icons: [
                {
                    src: !!process.env.SITE_FAVICON ? process.env.SITE_FAVICON : '//static.vecteezy.com/system/resources/previews/001/206/198/original/mountain-icon-png.png',
                    sizes: "72x72 96x96 128x128 256x256 512x512"
                }
            ]
        }
    }


})

