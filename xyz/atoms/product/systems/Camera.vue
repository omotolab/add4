<template lang="pug">
.camera-stream
    //
        <canvas> is needed to read stream as pixelated frames.
        @TODO if showCanvas==false, use offScreenCanvas (to optimize memory usage)
    target-canvas(v-show="showCanvas" ref="canvas" :imageData="imageFrameData" :width="cameraConfig.video.width" :height="cameraConfig.video.height")
    //
        <video> will receive incoming camera stream.
        Important: Video will stop playing when 'out of view' (At least chrome does).
    video(v-show="showOriginal" ref="video" data-keepplaying="" preload="" autoplay="" loop="" muted="" :width="cameraConfig.video.width" :height="cameraConfig.video.height")
    .debug-controls(v-if="debug")
        span {{ cameraActive ? "CameraStream active" : "CameraStream NOT active" }}
        button(@click="cameraActive = !cameraActive") Toggle camera stream
</template>

<script>
    import TargetCanvas from "./Canvas";
    import { getCanvasElementFromComponent } from "@/assets/origins/image";

    export default {
        components: {
            TargetCanvas
        },

        data: function() {
            return {
                cameraActive: false,
                imageFrameData: null
            }  
        },

        props: {
            debug: {
                type: Boolean,
                default: false
            },
            // What to do with the imageData per interval
            // Interval is the calculationsPerSecond prop.
            onStream: {
                type: Function,
                default: () => {}
            },
            // Are we showing the original (camera) image?
            showOriginal: {
                type: Boolean,
                default: false
            },
            // Are we shoing the parsed / calculated image?
            showCanvas: {
                type: Boolean,
                default: false
            },
            // FPS, how many times do we convert video to canvas.
            // This (ideally) means how many times we want to 
            // manipulate or 'calculate' per second.
            framesPerSecond: { 
                type: Number,
                default: 24
            },
            
            // Given as 'constraints' when running getUserMedia()
            cameraConfig: {
                type: Object,
                default: function() {
                    return {
                        audio: false,
                        video: {
                            facingMode: "environment",
                            width: 1280,
                            height: 720
                        }
                    };
                },
            },

            triggerActive: {
                type: Boolean,
                default: false
            }
            
        },

        watch: {
            triggerActive: { handler: function(isActive) { isActive ? this.cameraActive = true : this.cameraActive = false }},
            cameraActive: { handler: function(isActive) { isActive ? this.startCamera() : this.stopCamera() } },
            imageFrameData: { handler: function(currentFrameData, lastFrame) {
                if (this.checkFrames(currentFrameData, lastFrame)) {
                    console.warn("\
                        Image frames seem identical, is videoplayer still in view? \
                        (some browsers stop playback when 'irrelevant' \
                    ");
                } else {
                    this.onStream(currentFrameData);
                }
            } }
        },

        mounted (){
            this.videoElem = this.$refs.video;
            this.canvasElem = this.getCanvasElement();

            // Have power over calculation amount (a.k.a. frames) per second,
            // And keep our timestamps in memory for this.
            this.fpsInterval = 1000 / this.framesPerSecond;
            this.startTime = null;
            this.now = null;
            this.then = null;
            this.elapsed = null;

            // Initialize streaming image data of camera
            this.triggerActive ? this.startCamera() : console.info("Hit button to start camera.")     
        },

        methods: {
            checkFrames(current, last) {
                if(!current || !last || current.data.length != last.data.length)
                    return false;

                for(var i = 0; i < current.data.length; ++i){
                    if(current.data[i] != last.data[i])
                        return false;
                }
                return true;
            },

            /**
             * Get canvas component used inside this CameraStream (parent) component.
             */
            getCanvasElement() {
                if (!this.showCanvas) {
                    // @TODO Create OffScreenCanvas
                }
                return getCanvasElementFromComponent(this.$refs.canvas);
            },

            /**
             * Start checking and initializing reading out camera of user.
             * @uses getUserMedia()
             * @uses cameraConfig
             * @uses initCameraStream()
             * @uses handleStreamErrors()
             */      
            startCamera() {
                /**
                 * @NOTE 
                 * getUserMedia() can only be called from an HTTPS URL, localhost or a file:// URL. 
                 * Otherwise, the promise from the call will be rejected. 
                 */
                if (!this.userSupportsMedia()) {
                    console.error('getUserMedia not supported or allowed!');
                    return;
                }
                
                // Initialize camera stream
                navigator.mediaDevices.getUserMedia(this.cameraConfig)
                    .then(this.initCameraStream)
                    .catch(this.handleStreamErrors);
            },

            /**
             * Start (showing) our camera stream.
             * Able to show original and calculated camera (image) data.
             * @uses showOriginal
             * @uses showCanvas 
             */
            initCameraStream(stream) {
                this.cameraActive = true;
                this.videoElem.srcObject = stream;

                // Start reading out stream 
                // and convert to imageData
                this.then = Date.now();
                this.startTime = Date.now();
                this.copyStreamToCanvas();
            },

            /**
             * Parse incoming stream data (of camera) per given interval.
             */
            copyStreamToCanvas() {
                if (!this.cameraActive) {
                    return;
                }

                this.now = Date.now();
                this.elapsed = this.now - this.then;

                if (this.elapsed > this.fpsInterval) {

                    // Get ready for next frame by setting then=now, but also adjust for your
                    // specified fpsInterval not being a multiple of requestAnimationFrame's interval (16.7ms = 1000/60)
                    this.then = this.now - (this.elapsed % this.fpsInterval);
                    this.repaintCanvas() && this.holdImageData();
                }

                requestAnimationFrame(this.copyStreamToCanvas);
            },

            /**
             * Clear and repaint canvas. 
             * Mainly needed to be able to read out our stream as imageData.
             * (to handle per-frame 'pixel manipulation')
             */
            repaintCanvas() {
                if (!this.$refs.canvas) {
                    return false;
                }

                this.$refs.canvas.draw(
                    this.videoElem, 
                    this.cameraConfig.video.width, 
                    this.cameraConfig.video.height,
                );
                return true;
            },

            /**
             * Simply reads out image data from current frame (in canvas).
             * This only works when canvas is being updated (see repaintCanvas).
             */
            holdImageData() {
                if (!this.$refs.canvas) {
                    return false;
                }

                this.imageFrameData = this.$refs.canvas.getImageData(
                    0,
                    0,
                    this.cameraConfig.video.width,
                    this.cameraConfig.video.height
                );

                return true;
            },
            
            /**
             * Stop the stream by emptying srcObject.
             */
            stopCamera() {
        
                var stream = this.videoElem.srcObject;
                var tracks = stream.getTracks();

                for (var i = 0; i < tracks.length; i++) {
                    var track = tracks[i];
                    track.stop();
                }

                this.videoElem.srcObject = null;
            },

            /**
             * Called wen getUserMedia throws an error.
             */
            handleStreamErrors(error) {
                console.error(`handleStreamErrors: ${error}`);
            },

            /**
             * Simple check to see if current client has our needed tech.
             */
            userSupportsMedia() {
                return !!(navigator.mediaDevices &&
                    navigator.mediaDevices.getUserMedia);
            },
        }
    }
</script>

<style lang="scss" scoped>

    canvas {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color:rgba(0,0,0,0.5);
        opacity: 0.5;
    }



    video, 
    canvas {
        &.hidden {
            visibility: 0;
            opacity: 0;
            height: 0;
            width: 0;
        }
    }
    div.camera-stream{
        position: relative;

        video, canvas {
            // width: 100% !important;
            height: auto !important;
            max-width: 100%
        }
        
        video,
        canvas {
            &.hidden {
                visibility: 0;
                opacity: 0;
                height: 0;
                width: 0;
            }
        }
    }

    div.debug-controls {
        position: absolute;
        bottom: -50px;

        button {
            border: 1px solid #F1F1F1;
            background: #F1F1F1;
            padding: 3px 5px;
        }
    }
</style>
