<template>
    <Renderer ref="renderer" resize antialias
        :orbit-ctrl="{ autoRotate: true, enableDamping: true, dampingFactor: 0.05 }" pointer>
        <Camera :position="{ x: 0, y: 0, z: 10 }" />
        <Scene background="#000000">
            <PointLight ref="light" :intensity="0.5" :position="{ x: 0, y: 0, z: 0 }">
                <Sphere :radius="0.1" />
            </PointLight>
            <Group :rotation="{ x: -Math.PI / 2, y: 0, z: 0 }">
                <!-- <RectAreaLight color="#ff6000" :position="{ x: 0, y: 10, z: 1 }" v-bind="rectLightsProps" />
          <RectAreaLight color="#0060ff" :position="{ x: 10, y: 0, z: 1 }" v-bind="rectLightsProps" />
          <RectAreaLight color="#60ff60" :position="{ x: -10, y: 0, z: 1 }" v-bind="rectLightsProps" />
          <RectAreaLight color="#ffffff" :position="{ x: 0, y: -10, z: 1 }" v-bind="rectLightsProps" /> -->
                <Plane :width="30" :height="30" :rotation="{ x: 0 }" :position="{ z: -3 }">
                    <StandardMaterial :props="{ displacementScale: 0.2, roughness: 0, metalness: 0 }">
                        <Texture :props="texturesProps" src="/assets/textures/Wood_Tiles_002_basecolor.jpeg" />
                        <Texture :props="texturesProps" src="/assets/textures/Wood_Tiles_002_height.png"
                            name="displacementMap" />
                        <Texture :props="texturesProps" src="/assets/textures/Wood_Tiles_002_normal.jpeg"
                            name="normalMap" />
                        <Texture :props="texturesProps" src="/assets/textures/Wood_Tiles_002_roughness.jpeg"
                            name="roughnessMap" />
                        <Texture :props="texturesProps" src="/assets/textures/Wood_Tiles_002_ambientOcclusion.jpeg"
                            name="aoMap" />
                    </StandardMaterial>
                </Plane>
            </Group>
        </Scene>
        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.3" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>
    
<script>
// textures from https://3dtextures.me/2019/04/26/wood-tiles-002/
import { RepeatWrapping } from 'three';
export default {
    props: ['stream', 'name'],
    data() {
        return {
            texturesProps: {
                repeat: { x: 10, y: 10 },
                wrapS: RepeatWrapping,
                wrapT: RepeatWrapping,
            },
            rectLightsProps: {
                // rotation: { x: -Math.PI / 2 },
                lookAt: { x: 0, y: 0, z: 1 },
                intensity: 5,
                width: 5,
                height: 5,
                helper: true,
            },
            points: this.stream,
            pointer: 0,
            counter: null,
            ms: 10
        };
    },
    computed: {
        current() {
            return this.stream
        }
    }, 
    mounted() {
        const renderer = this.$refs.renderer;
        const light = this.$refs.light.light;
        const pointerV3 = renderer.three.pointer.positionV3;
        // console.log('p', this.stream)

        if (this.stream) {
            renderer.onBeforeRender((i) => {
                // light.position.copy(pointerV3);

                const counter = Math.round(i.time / this.ms)
                if (counter !== this.counter) {
                    this.counter = Math.round(i.time / this.ms)

                    if (this.pointer < this.points.length - 1) {
                        this.pointer = this.pointer + 1
                        // console.log('p', this.points[this.pointer])
                    } else {
                        this.pointer = 0
                        // console.log('p', this.points[this.pointer])
                    }
                }

                // console.log('this',this.points)


                light.position.copy(this.points[this.pointer]);
            });
        }

    },
    watch: {
        stream: function(newStream) {
            // console.log('s', newStream)
            this.points = newStream.reverse()
        }
    }
};
</script>