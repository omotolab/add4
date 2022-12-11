<template lang="pug">
#canvasContainer(:ref="'canvasContainer'")
    to-canvas(
        :canvasId="canvasRef"
        :onCanvasInited="onCanvasInited"
    )
</template>
<script>
export default {
    props: [
        'canvasRef'
    ],
    mounted() {
        // const container = this.$refs['canvasContainer']
        // const logic = require('~/components/containers/textured.js')
        // logic.mounted(container)
    },
    methods: {
        onCanvasInited(canvas) {
            // require('~/components/containers/textured.js').mounted(canvas)
            const container = this.$refs['canvasContainer']
            const logic = require('~/assets/script/textured.js')
            logic.mounted(canvas)
           
        }
    },

}
</script>