import { createI18n } from 'vue-i18n'

// https://vue-i18n.intlify.dev/guide/#javascript

const messages = {
    en: {
        message: {
            hello: 'hello world'
        }
    },
    nl: {
        message: {
            hello: 'hallo wereld'
        }
    }
}

const i18n = createI18n({
    locale: 'nl', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages
})

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(i18n)
})