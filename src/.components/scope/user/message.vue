<script setup>
const progress = ref(null)
const appConfig = useAppConfig()
const input = ref(null)
const options = ref([
    'hello',
    'hi'
])
onMounted(() => {
    progress.value = 'loaded'
})
</script>
<template>
    <div v-if="!progress" class=" " style="background: #ccc">
        <NuxtLayout name="display" class="">
            <view-icon-load />
            <div>loading..</div>
        </NuxtLayout>
    </div>
   <div v-else class=" " style="background: #ccc">
        <NuxtLayout name="display" class="">
            <div class="fixed">
                <div uk-height-viewport="offset-bottom: true" class="flex items-center justify-center">
                    <div class="h-full">
                        <view-icon-chip />
                    </div>
                </div>
                <div class="w-screen uk-card uk-card-small uk-card-default">
                    <div class="uk-overflow-auto min-h-10">
                        <view-modal v-model="input" title="Write a new message" action="Save">
                            <template v-slot:trigger>
                                <div v-if="!input" class="uk-card-body">Write a new message</div>
                                <div v-else class="uk-card-body text-left h-20 uk-overflow-auto" >
                                    <span v-for="block in input.blocks" :key="block.id">{{ block.data.text.replace('&nbsp;', ' ') }}</span>
                                </div>
                            </template>
                            <template v-slot:modal>
                                <DocumentDrivenEditor v-model="input" class="w-full min-h-20 max-h-49 px-2 bg-white rounded-lg overflow-auto" />
                            </template>
                        </view-modal>
                        
                    </div>
                    <div class="uk-card-footer h-95">
                        <div>
                            <ul class="uk-list">
                                <li v-for="(item, i) in options">
                                    <button class="rounded-md bg-gray-200 bg-opacity-20 mx-2 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">{{item}}</button>
                                </li>
                            </ul>
                        </div>
                        <view-modal label="New Gesture" title="Create a new gesture" action="Save" ></view-modal>
                    </div>
                </div>
                
            </div>
        </NuxtLayout>
    </div>
    
</template>
<style>
.h-screen-w {
    height: 100vw
}
</style>