// https://nuxt.com/docs/api/configuration/nuxt-config

'https://rdwzcfpkxxbixgksgbch.supabase.co/storage/v1/object/public/@/thismedium.com/icon.png'
export default defineNuxtConfig({
    ssr: false,
    srcDir: "src",
    runtimeConfig: {
        // The private keys which are only available within server-side
        apiSecret: '123',
        // Keys within public, will be also exposed to the client-side
        public: {
            API_KEY: process.env.API_KEY,
            IMG_KEY: process.env.IMG_KEY,
            TXT_KEY: process.env.TXT_KEY,
            PIN: process.env.BASE_PIN,
            API: process.env.BASE_API,
            KEY: process.env.BASE_KEY
          
        }
    },
    css: ['uikit/dist/css/uikit.min.css'],
    modules: [
        '@kevinmarrec/nuxt-pwa',
        '@vueuse/nuxt',
        '@formkit/nuxt',
        '@nuxt/content',
        'nuxt-windicss'
    ],

    /* build: {
        transpile: ['troisjs']
    }, */


    /* Module Settings */
    content: {
        documentDriven: true
    },
    pwa: {
        /* icon: {
            source: '//static.vecteezy.com/system/resources/previews/001/206/198/original/mountain-icon-png.png',
            fileName: 'mountain-icon-png.png'
        }, */
        icon: false,
        manifest: {
            name: 'Continuity™',
            lang: 'en',
            useWebmanifestExtension: false,
            icons: [
                {
                    src: !!process.env.SITE_FAVICON ? process.env.SITE_FAVICON : `//${process.env.BASE_API}.supabase.co/storage/v1/object/public/@/${process.env.BASE_PIN}/icon.png`,
                    sizes: "72x72 96x96 128x128 256x256 512x512"
                }
            ]
        }
    }


})

