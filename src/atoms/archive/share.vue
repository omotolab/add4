<script setup>
import { Buffer } from "buffer";

const setup = ref(false)
const handleSetupData = (setup) => {
    setup.value = true
}
const structures = [
    {
        $cmp: 'FormKit',
        props: {
            type: 'select',
            id: 'drink',
            label: 'Drink',
            placeholder: 'Pick your drink',
            options: {
                coffee: 'Drip coffee',
                espresso: 'Espresso shot',
                tea: 'Tea'
            },
            validation: 'required'
        }
    },
    {
        $cmp: 'FormKit',
        if: '$get(drink).value',
        props: {
            type: 'radio',
            label: '$: "Drink options (" + $get(drink).value + ")"',
            options: {
                if: '$get(drink).value === coffee',
                then: [
                    'Large',
                    'Medium',
                    'Small'
                ],
                else: {
                    if: '$get(drink).value === espresso',
                    then: [
                        'Single shot',
                        'Double shot',
                    ],
                    else: [
                        'Earl grey',
                        'Matcha',
                        'Green tea',
                        'Jasmine'
                    ]
                }
            }
        }
    }
]

const time = Date.now()

const Machine = () => {
    if (!time) {
        return h('noscript', 'No javascript')
    } else {
        return h('div', 'hello machine world')
    }
}


const { value: { href, hostname, host, port, protocol } } = useBrowserLocation()

const message = ref(`https://${host}/code/${Buffer.from(JSON.stringify({ href, time })).toString('base64')}`)
const mounted = ref(false)
const focused = ref(false)

onMounted(() => {
    mounted.value = true
})

const toggleShareCode = () => {
    focused.value = !focused.value
}

</script>
<template>
    <div>
        <Cover v-if="!mounted" class="uk-background-muted">
            <ul class="uk-iconnav">
                <li>
                    <a class="uk-icon-button uk-border-rounded">
                        <view-icon-load class="rotate" />
                    </a>
                </li>
            </ul>
        </Cover>
        <Cover v-else class="uk-section uk-section-muted">
            <div class="uk-container uk-width-expand">
                <div uk-grid="masonry: true" class="uk-grid-small uk-child-width-1-1">
                    
                    <div v-if="!$route.params.scope">
                        <div class="uk-card-default uk-border-rounded uk-background-muted uk-width-large@s uk-margin-auto">
                            <div v-show="focused" class="uk-card">
                                <nuxt-link :to="message">
                                    <view-code :message="message" class="uk-width-1-1" />
                                </nuxt-link>
                            </div>
                            <div
                                class="uk-card uk-card-default uk-card-body uk-border-rounded uk-animation-scale-up uk-width-1-1">
                                <ul class="uk-iconnav uk-flex uk-flex-middle uk-width-1-1">
                                    <li class="uk-width-expand">
                                        <div class="uk-text-small uk-width-small">
                                            <div>
                                                <strong>Anonymous</strong>
                                            </div>
                                            <div>{{ hostname }}</div>
                                        </div>
                                    </li>
                                    <li class="uk-width-auto">
                                        <nuxt-link
                                            class="uk-icon-button uk-button-default uk-text-small uk-border-rounded"
                                            @click="(event) => toggleShareCode()">
                                            <view-icon-code />
                                        </nuxt-link>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="uk-card-default uk-border-rounded uk-background-secondary uk-width-large@s uk-margin-auto">
                            <section class="uk-margin-small">
                                <nuxt-page  />
                            </section>
                        </div>
                    </div>
                    
                </div>
            </div>



        </Cover>
    </div>
</template>
<style>
.uk-button-default {
    background-color: transparent;
    color: #333;
    border: 2px solid #e5e5e5;
}

.uk-button-default:hover {
    background-color: transparent;
    color: #333;
    border-color: rgb(111, 110, 110);
}
</style>