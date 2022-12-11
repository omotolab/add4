<template>
    <canvas :width="width" :height="height"></canvas>
</template>

<script>
export default {
    mounted() {
        this.canvasContext = this.$el.getContext('2d');
    },
    
    props: ['imageData'],

    data: function() {
        return {
            width: this.width || window.innerWidth || 0,
            height: this.height || window.innerHeight || 0
        }
    },

    watch: {
        imageData (newFrame, oldFrame) {
            if (!newFrame || !oldFrame) {
                return;
            }
            
            if (!('data' in newFrame)) {
                console.error("ImageData has no data.. Can't continue!");
                return;
            }

            if (!('width' in newFrame) || !('height' in newFrame)) {
                console.warn("imageData has unknown dimensions!");
                return;
            }

            // Update dimensions if source dimensions are changed.
            if (newFrame.width !== this.width) {
                this.width = newFrame.width;
            }
            if (newFrame.height !== this.height) {
                this.height = newFrame.height;
            }

            // Update imageData in canvas (because value has been changed)
            this.drawData(newFrame, oldFrame.width || this.width, oldFrame.height || this.height);
        }
    },

    methods: {
        /**
         * Draw an image on canvas.
         * @TODO Check if this is still relevant, if not; remove. 
         */
        draw(input, width, height, clearBeforeDraw = true) {
            clearBeforeDraw && this.clear(0, 0, width, height);
            this.canvasContext.drawImage(input, 0, 0, width, height);
        },

        /**
         * Draw imageData on canvas.
         * @TODO Check if this is still relevant, if not; remove.
         */
        drawData(data, width, height, clearBeforeDraw = true) {
            clearBeforeDraw && this.clear(0, 0, width, height);
            this.canvasContext.putImageData(data, 0, 0);
        },

        /**
         * Clears canvas by given coordinates
         */
        clear(startX, startY, width, height) {
            this.canvasContext.clearRect(startX, startY, width, height);
        },

        /**
         * Returns imageData object of canvas.
         */
        getImageData() {
            return this.canvasContext.getImageData(0, 0, this.width, this.height);
        }
    }
}
</script>