import { defineNuxtConfig } from 'nuxt'

const account = process.env.account || 'thismedium'
const project = process.env.project || 'logic.to'
const imprint = process.env.imprint || 'api:key'

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  telemetry: false,
  srcDir: `${process.cwd()}/:./@`,
  buildDir: `${process.cwd()}/:./@${account}/${project}/build`,
  app: {
    head: {
      title: process.env.NODE_ENV !== 'production' ? `@${account}/${project}` : `${project}`,
      link: [
        {
          rel: 'icon', type: 'image/png', href: '/images/icon.png',
        },
      ],
    },
  },
  css: ['uikit/dist/css/uikit.min.css'],
  runtimeConfig: {
    // MOLLIE_KEY: process.env.MOLLIE_KEY,
    // MYSTIC_KEY: process.env.MYSTIC_KEY,
    // NLPCLOUD_KEY: process.env.NLPCLOUD_KEY,
    SUPABASE_API: imprint.split(':')[0],
    SUPABASE_KEY: imprint.split(':')[1],
    public: {
      account: process.env.account || 'thismedium',
      project: process.env.project || 'thismedium.com',
    }
  },
  module: [
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@formkit/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
  ],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },

  /* Configurations */
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  components: {
    "dirs": [
      {
        "path": `${process.cwd()}/src-nuxt/src/components/tm/${project.split(':')[0]}/components`,
        "global": true
      },
      {
        "path": `${process.cwd()}/src-nuxt/src/atoms`,
        "global": true
      },
      "~/elements",
      "~/components"
    ]
  },
  content: {
    base: '/content',
    sources: [
      'content',
      'https://raw.githubusercontent.com/coordinature/systems/main/src/content/index.md?token=GHSAT0AAAAAABWQOB3EMRQ4ZBKI5IREAVAQYXJIIJA'
    ]
  }
  /* content: {
    markdown: {
      remarkPlugins: ['remark-reading-time'],
    },
  }, */
 /*  nitro: {
    plugins: ['~/server/plugins/content.js'],
  }, */
})
