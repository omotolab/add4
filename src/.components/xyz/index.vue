<script setup>
import Parallax from 'parallax-js'
const { navigation, page, surround, globals } = useContent()
console.log(page.value)
/* onMounted(() => {
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene);
}) */

const items = [1, 2, 3].map((item, i) => ({
    key: i + '-' + Date.now(),
    value: Math.round(Date.now * Math.random()),
    class: `w-20 rounded-lg bg-gray-${i * 100}`,
    data: {
        depth: i
    }
}))

</script>

<template>
    <div>
        <div class="flex items-center justify-center w-screen h-full">
            <view-modal text="start gesture">
                hello
            </view-modal>
            <!-- <div id="scene">
                <div v-for="(item, i) in items" :key="item.key" :data-depth="item.data.depth"
                    :class="item.class ? item.class : `h-50 w-50 bg-gray-${i * 100}`">
                    <nuxt-link to="/signal">
                        <div class="inline-block flex items-center justify-center text-center h-20">
                            <view-icon-signal />
                        </div>
                    </nuxt-link>
                </div>
            </div> -->
        </div>
    </div>
</template>