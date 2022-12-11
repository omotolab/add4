<template>
    <div class="w-full max-w-md ">

        <TabGroup>

            <div class="h-15 shadow-md text-black text-sm overflow-auto px-1 pt-1.5 sm:px-0">
                <div class="flex justify-between items-center">
                    <ul class="uk-iconnav uk-flex uk-flex-between uk-flex-middle w-full">
                        <li class="uk-width-auto">
                            <div class="uk-icon-button uk-border-rounded uk-padding-xsmall">
                                <span uk-icon="icon: users; ratio: 1"></span>
                            </div>
                        </li>
                        <li class="uk-width-expand">
                            <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-full">
                                <Tab v-for="category in Object.keys(categories)" as="template" :key="category"
                                    v-slot="{ selected }">
                                    <button :class="[
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                                    ]">
                                        {{ category }}
                                    </button>
                                </Tab>
                            </TabList>
                        </li>
                        <li class="uk-width-auto">
                            <div class="uk-icon-button uk-border-rounded">
                                <span uk-icon="comments"></span>
                            </div>
                        </li>
                    </ul>
                </div>


            </div>

            <TabPanels class="mt-2">
                <TabPanel v-for="(posts, idx) in Object.values(categories)" :key="idx">
                    <div class="uk-flex uk-grid uk-grid-collapse" uk-grid="masonry: true">
                        <div v-for="(item, i) in posts">
                            <button
                                class="rounded-md bg-gray-200 bg-opacity-20 mx-1 my-2 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">{{
        item.date
                                }}</button>
                        </div>
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const categories = ref({
    Type: [
        {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: 'I need',
            commentCount: 5,
            shareCount: 2,
        },
        {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: 'I have',
            commentCount: 3,
            shareCount: 2,
        },
    ],
    Topic: [
        {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: 'I need',
            commentCount: 5,
            shareCount: 2,
        },
        {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: 'I have',
            commentCount: 3,
            shareCount: 2,
        },
    ],
    Time: [
        {
            id: 1,
            title: 'Is tech making coffee better or worse?',
            date: 'Jan 7',
            commentCount: 29,
            shareCount: 16,
        },
        {
            id: 2,
            title: 'The most innovative things happening in coffee',
            date: 'Mar 19',
            commentCount: 24,
            shareCount: 12,
        },
        {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
        },
        {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
        },
        {
            id: 1,
            title: 'Does drinking coffee make you smarter?',
            date: '5h ago',
            commentCount: 5,
            shareCount: 2,
        },
        {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: '2h ago',
            commentCount: 3,
            shareCount: 2,
        }
    ]
})
</script>
  