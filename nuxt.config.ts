import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
console.log('dev', process.env.NODE_ENV)
const iconSrc = `//${process.env.BASE_API}.supabase.co/storage/v1/object/public/@/${process.env.BASE_HOST}/icon.png`
const srcDir = process.env.NODE_ENV === 'development' ? 'xyz' : 'src'
const ssr = process.env.NODE_ENV === 'development' ? true : false
const runtimeConfig = {
    // The private keys which are only available within server-side
    APP: process.env.BASE_APP,
    // Keys within public, will be also exposed to the client-side
    public: {
        API_KEY: process.env.API_KEY,
        IMG_KEY: process.env.IMG_KEY,
        TXT_KEY: process.env.TXT_KEY,
        HOST: process.env.BASE_HOST,
        API: process.env.BASE_API,
        KEY: process.env.BASE_KEY,
    }
}

const components = {
    dirs: [
      {
        "path": "@@/src-nuxt/components",
        "global": true
      },
      "@@/xyz/atoms",
      "~/atoms"
    ]
}

export default defineNuxtConfig({
    ssr,
    srcDir,
    runtimeConfig,
    components,
    css: ['assets/css/nuxt.css', 'uikit/dist/css/uikit.min.css'],
    modules: [
        '@kevinmarrec/nuxt-pwa',
        '@vueuse/nuxt',
        '@formkit/nuxt',
        '@nuxt/content',
        'nuxt-windicss'
    ],
    build: {
        transpile: ['troisjs']
    },

    /* build: {
        transpile: ['troisjs']
    }, */


    /* Module Settings */
    content: {
        documentDriven: true,
        sources: {
            content: {
                driver: 'fs',
                prefix: '/content', // All contents inside this source will be prefixed with `/docs`
                base: resolve(__dirname, `./${srcDir}/assets/md/`)
            }
        }
    },

    pwa: {
        /* icon: {
            source: '//static.vecteezy.com/system/resources/previews/001/206/198/original/mountain-icon-png.png',
            fileName: 'mountain-icon-png.png'
        }, */
        icon: false,
        manifest: {
            name: process.env.BASE_NAME,
            lang: 'en',
            useWebmanifestExtension: false,
            icons: [{
                src: iconSrc,
                sizes: "72x72 96x96 128x128 256x256 512x512"
            }]
        }
    }


})

