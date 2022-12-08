<script setup async lang="ts">
// const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())

const active = ref('text')
const modes = ['text', 'motion']
const setActive = (mode) => {
    active.value = mode
}

const screen = reactive({
    height: Number,
    width: Number
})

const height = ref(0)
const width = ref(0)

onMounted(() => {
    const els = document.getElementsByTagName('html')
    /*  const resizeObserver = new ResizeObserver((el) => {
         // console.log('resized', el[0].target.scrollHeight, el[0].target.scrollWidth)
         height.value  = el[0].target.scrollHeight
         width.value = el[0].target.scrollWidth
 
     });
     resizeObserver.observe(els[0]); */

})

function captureChange(i) {
    const els = document.getElementsByTagName('html')
    const resizeObserver = new ResizeObserver((el) => {
        // console.log('resized', el[0].target.scrollHeight, el[0].target.scrollWidth)
        height.value = el[0].target.scrollHeight
        width.value = el[0].target.scrollWidth
        console.log('h', height)
    });
    resizeObserver.observe(els[0]);
    // console.log('h', els[0].height)
    // alert('touched')
    height.value = i.view.innerHeight
    i.view.innerHeight = 0
    // console.log('i', i.view, els[0].width)

}

</script>
<template>
    <ClientOnly>
        <div class="h-full flex flex-col">
            <!-- <ContentEditor class="h-full" @click="captureChange" /> -->
            <ContentEditor>
                <NuxtPage />
            </ContentEditor>
            <ContentBrowser />
        </div>
        <!--  <div>{{ height }}</div> -->
    </ClientOnly>
</template>