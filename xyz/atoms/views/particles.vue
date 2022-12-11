<template lang="pug">
    to-canvas(
        :onMouseDown="handleMouseDown"
        :onCanvasInited="handleCanvasInited"
        :onResize="handleResize"
    )
</template>
<script>
import Proton from "proton-engine";
import RAFManager from "raf-manager";

export default {
    data() {
        return {
            canvas: null,
            proton: null,
            emitter: null,
            renderer: null,
        }
    },
    methods: {
        handleMouseDown(e) {
            this.clearCanvas();
            this.emitter.removeAllParticles();
            this.emitterType++;
            if (this.emitterType > 6) {
                this.emitterType = 1;
            }
            this.emitter.setType(this.emitterType);
        },
        handleCanvasInited(canvas) {
            this.canvas = canvas;
            this.createProton(canvas);
            RAFManager.add(this.renderProton);
        },
        handleResize(width, height) {
          this.renderer.resize(width, height);
        },
        renderProton() {
            this.proton.update();
        }
    }
}
</script>