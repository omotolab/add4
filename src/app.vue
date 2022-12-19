<script setup async >
import { useStorage } from '@vueuse/core'

/* useHead({
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/images/logo.png',
    },
    {
      rel: 'manifest', href: '/manifest.json',
    },
  ],
}) */

const config = useRuntimeConfig()
const { width, height } = useWindowSize()
const languages = usePreferredLanguages()
const { language, isSupported } = useNavigatorLanguage()
const touch = ref(null)
const data = await useStorage('data', {})
console.log('data_2', data.value)
onMounted(async () => {
    console.log('data_1', await data.value)
})
</script>
<template>
    <environment v-if="false" :window="{
        height,
        width
    }">
        <!-- <div class="container">
            <div class="p-2" v-if="touch">touched: {{ touch._custom }}</div>
            <div class="p-2">{{  focused  }}</div>
            <div class="p-2">{{ language }}</div>
            <div class="p-2">{{ languages }}</div>
            <div class="p-2">dashboard</div>
            <div class="p-2">document</div>
            <div>
                <div class="uk-form-label p-2">{{ $t('welcome') }}</div>
                <select class="uk-select" v-model="locale" @change="handleChange">
                    <option v-for="loc in locales" :value="loc.code">{{ loc.name }}</option>
                </select>
            </div>
            <div>
                <div class="uk-form-label p-2">{{ $t('welcome') }}</div>
                <select class="uk-select" v-model="voice" @change="handleChange">
                    <option v-for="voice in choices" :value="voice">{{ voice.name }}</option>
                </select>
            </div>

            <div class="p-2">{{ message }}</div>
            <div class="p-2">
                <block-form />
            </div>
            
        </div> -->
    </environment>
    <client-only>
        <div class="uk-flex uk-flex-center uk-section">
            <document-editor v-model="data" />
        </div>
    </client-only>


</template>
