import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
console.log('dev', process.env.NODE_ENV)
const iconSrc = `//${process.env.BASE_API}.supabase.co/storage/v1/object/public/@/${process.env.BASE_HOST}/icon.png`
const srcDir = 'src'
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
    },
    SUPABASE_API: imprint.split(':')[0],
    SUPABASE_KEY: imprint.split(':')[1],
    /* public: {
      account: process.env.account || 'thismedium',
      project: process.env.project || 'thismedium.com',
    } */
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

const account = process.env.account || 'thismedium'
const project = process.env.project || 'logic.to'
const imprint = process.env.imprint || 'api:key'

const isDev = process.env.NODE_ENV === 'development'


export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
        head: {
            title: process.env.NODE_ENV !== 'production' ? `@${account}/${project}` : `${project}`,
            link: [
                {
                    rel: 'icon', type: 'image/png', href: '/images/icon.png',
                },
            ],
        },
    },
    ssr,
    srcDir,
    runtimeConfig,
    components,
    css: ['assets/css/nuxt.css', 'assets/css/theme.css', 'uikit/dist/css/uikit.min.css'],
    modules: [
        '@kevinmarrec/nuxt-pwa',
        '@vueuse/nuxt',
        '@nuxtjs/i18n',
        '@formkit/nuxt',
        '@nuxt/content',
        'nuxt-windicss'
    ],
    build: {
        transpile: ['troisjs']
    },
    i18n: {
        locales: ['en', 'nl'],
        defaultLocale: 'en',
        vueI18n: {
            locale: 'nl', // set locale
            fallbackLocale: 'en', // set fallback locale
            messages: {
                en: {
                    hello: 'hello world'
                },
                nl: {
                    hello: 'hallo wereld'
                }
            }
        }
    },

    telemetry: false,
    // srcDir: `${process.cwd()}/:./@`,
    // buildDir: `${process.cwd()}/:./@${account}/${project}/build`,


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
        meta: {
            name: 'Continuity',
            appleStatusBarStyle: 'white',
            theme_color: '#fff',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
        },
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

