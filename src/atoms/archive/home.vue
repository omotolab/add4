<script setup>
import { h } from 'vue'

const initialRoute = 'home'
const currentRoute = ref(initialRoute)
const routes = [
    'home',
    'map',
    'search',
    'favorites',
    'profile'
]

const screens = {
    "home": {
        icon: 'home',
        title: 'Explore',
        description: '',
        children: [
            'account details',
            'tickets',
            'payments',
            'calendar'
        ]
    },
    "map": {
        icon: 'location',
        title: 'Locate',
        description: '',
        children: [
            'near you'
        ]
    },
    "search": {
        icon: 'search',
        title: 'Search',
        description: '',
        children: [
            'genres'
        ]
    },
    "favorites": {
        icon: 'heart',
        title: 'Favorites',
        description: '',
        children: [
            'favorites'
        ]
    },
    "profile": {
        icon: 'user',
        title: 'Personal Vault',
        description: '',
        children: [
            'account details',
            'tickets',
            'payments',
            'calendar'
        ]
    }
}

const items = {
    'account details': [
        'detail 1',
        'detail 2',
        'detail 3'
    ],
    'tickets': [
        'ticket 1',
        'ticket 2',
        'ticket 3'
    ],
    'payments': [
        'payments 1',
        'payments 2',
        'payments 3'
    ],
    'reminders': [
        'reminder 1',
        'reminder 2',
        'reminder 3'
    ],
    'near you': [
        'one',
        'two',
        'three'
    ],
    'genres': [
        'techno',
        'pop',
        'dance',
        'indie'
    ],
    'favorites': [
        'hello'
    ]
}

const vnode = h(
    'div', // type
    { id: 'foo', class: 'bar' }, // props
    [
        /* children */
    ]
)

const compose = ({ tag, name, classes, children }) => h(tag, { name, classes }, children)

const structures = {
    'ticket': {
        tag: 'div',
        name: 'ticket',
        classes: 'uk-card uk-card-body',
        children: ['hi']
    }
}

const view = (id) => {
    console.log('id', id)
    const { tag, name, classes, children } = structures[id]
    return compose({ tag, name, classes, children })
}

const widgets = {
    tickets: compose({
        tag: 'div',
        name: 'ticket',
        classes: 'uk-card uk-card-body',
        children: ['hi']
    }),
    payment: {},
    account: {},
    map: {},
    genre: {}

}

</script>
<template>
    <!--  <div class="uk-grid uk-grid-collapse uk-flex">
        <div class="uk-width-medium uk-background-muted"> <nuxt-menu /> </div>
        <div class="uk-width-expand  uk-height-viewport uk-overflow-auto"> 
            <nuxt-layout>
                <nuxt-page /> 
            </nuxt-layout>
        </div>
    </div> -->
    <div class="uk-card uk-card-small">
        <div class="uk-card-header">

            <ul class="uk-switcher">
                <li v-for="route in routes">
                    <ul class="uk-iconnav uk-flex uk-flex-between uk-flex-middle">
                        <li>
                            <ul class="uk-iconnav uk-flex uk-flex-middle">
                                <!-- <li>
                                    <span class="uk-button-default uk-icon-button uk-border-rounded"
                                        uk-icon="arrow-left"></span>
                                </li> -->
                                <li>
                                    <div>
                                        <strong>{{ screens[route].title }}</strong>
                                    </div>
                                    <div class="uk-text-small">{{ screens[route].description }}</div>
                                </li>
                            </ul>
                        </li>
                        <li>
                        <li>
                            <span class="uk-button-default uk-icon-button uk-border-rounded" uk-icon="comment"></span>
                        </li>
                </li>
            </ul>
            </li>
            </ul>

        </div>
        <div class="uk-card-body" uk-height-viewport="offset-top: true; offset-bottom: true">
            <ul class="uk-switcher">
                <li v-for="route in routes">
                    <div>
                        <div v-for="item in screens[route].children">
                            <div>{{item}}</div>
                            <view id="ticket" /> 
                            <ul class="uk-list">
                                <li v-for="i in items[item]">{{ i }}</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="uk-card-footer uk-background-muted ">
            <!-- <div>Footer</div> -->
            <ul class="uk-iconnav uk-flex uk-flex-around uk-subnav" uk-switcher="connect: .uk-switcher">
                <li v-for="route in routes">
                    <a href="#" :class="currentRoute === route ? `uk-active` : ''" @click="currentRoute = route">
                        <span class="uk-icon-button uk-button-rounded" :uk-icon="screens[route].icon"></span>
                    </a>
                </li>

            </ul>
        </div>
    </div>
</template>