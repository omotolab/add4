<script setup>
const config = useRuntimeConfig()

const name = window.location.hostname
const icon = config.public.pwaManifest.icons[0]

const tick = reactive({
    started: Date.now()
})

onMounted(() => {
    tick.mounted = Date.now()
    console.log('mounted in', tick.mounted - tick.started, 'ms')
    /*  draft.title =  draft.content.blocks[0].data.text
     draft.meta = {
         description: draft.content.blocks[1].data.text
     } */

})
</script>
<template>
    <div class="bg-blue-300 fixed h-full w-full flex flex-col justify-between">
        <!-- <div class="mx-1 flex items-center justify-between w-full h-60px">
            <div class="ml-12px uk-icon-button uk-border-rounded">
                <span uk-icon="chevron-left"></span>
            </div>
            <div>{{Date.now()}}</div>
            <div class="mr-17px">
                <div class="uk-icon-button uk-border-rounded">
                    <span uk-icon="check"></span>
                </div>
            </div>
            
        </div> -->

        <div class="h-376px shadow m-0.75 bg-green-200 rounded-lg w-auto uk-overflow-auto">
            <div placeholder="Omotola " contenteditable="true">ok</div>
        </div>
        <div class=" h-20 bg-white shadow-xl">
            <div>ok</div>
        </div>
        <!-- <div class="border-3 border-white p-4 rounded-2xl ">
            <div :style="`background-image: url('${icon.src}')`"
                :class="`flex flex-column h-9 w-9 shadow-xl bg-contain mix-blend-${tick.mounted ? 'screen' : 'difference'}`">
            </div>
        </div> -->
    </div>

</template>