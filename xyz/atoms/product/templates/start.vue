<template>
<div>
    <div class="uk-card uk-width-medium uk-height-medium uk-card-hover">
        <div id="canvas" class="uk-height-1-1 uk-width-1-1"></div>
    </div>
    
    <form>
        <select v-model="mode">
            <option v-for="(option, optionIndex) in options" :key="optionIndex"> {{ option }}</option>
        </select>
    </form>
</div>
    
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.cjs';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.cjs'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.cjs';
//import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.cjs';
import gsap from 'gsap'

export default {
    data() {
        return {
            mode: 'orbit',
            options: [
                'orbit',
                'track'
            ]
        }
    },
    mounted() {

        const dat = require('dat.gui')
        const hdriURL = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/empty_warehouse_01_1k.hdr'
        //Debug
        const gui = new dat.GUI({ closed: true, width: 400})
        //gui.hide()

        createApp(
            {
                params: {
                roughness: 0.1
            },
            async init() {
                // OrbitControls
                this.controls = new OrbitControls(this.camera, this.renderer.domElement)
                this.controls.enableDamping = true
                this.controls.autoRotate = true
                
                // Environment
                const envMap = await loadHDRI(hdriURL, this.renderer)
                //this.scene.environment = this.scene.background = envMap
                this.scene.environment = envMap
                
                // Mesh
                const geometry = new THREE.SphereGeometry(1, 64, 32)
                //const geometry = new THREE.BoxGeometry(2, 2, 2)
                const material = new THREE.MeshStandardMaterial(this.params)
                
                material.onBeforeCompile = shader => {
                    shader.fragmentShader = shader.fragmentShader.replace(/vec4 diffuseColor.*;/, `
                    //vec3 rgb = vNormal * 0.5 + 0.5;
                            //vec4 diffuseColor = vec4(rgb, 1.);  
                    vec4 diffuseColor = vec4(0, 2.55, 2.25, 1.);  
                `)
                }
                
                this.mesh = new THREE.Mesh(geometry, material)
                this.scene.add(this.mesh)
                
                // GUI
                gui.add(this.params, 'roughness', 0, 1, 0.01).onChange(v => material.roughness = v)
            },
            tick(time) {
                //this.mesh.rotation.x = this.mesh.rotation.y = time
                this.controls.update()
            }
        })

            /*
            * Below: boilerplate Three.js app setup and helper functions
            */

        function createApp(app) {
        const scene = new THREE.Scene()
        const renderer = createRenderer()
        const camera = createCamera()
        Object.assign(renderer.domElement.style, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'radial-gradient(#eeeeee, #aaaaaa)'
        })
        document.body.appendChild(renderer.domElement)
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }, false)
        const clock = new THREE.Clock()
        const loop = () => {
            requestAnimationFrame(loop)
            const delta = clock.getDelta()
            app.tick(clock.elapsedTime, delta)
            renderer.render(scene, camera)
        }
        Object.assign(app, { scene, camera, renderer, clock })
        app.init().then(loop)
        }

        /*
        * Sets up a WebGLRenderer with color management
        * See https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/
        */
        function createRenderer() {
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, domElement: document.getElementById('canvas') })
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            renderer.outputEncoding = THREE.sRGBEncoding
            return renderer
        }

        function createCamera() {
            const camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            camera.position.set(0, 0, 4)
            return camera
        }

        /*
        * @param {string} url - Path to equirectandular .hdr
        * @param {THREE.WebGLRenderer} renderer
        * @returns {Promise<THREE.Texture>}
        */
        function loadHDRI(url, renderer) {
            return new Promise(resolve => {
                const loader = new RGBELoader()
                const pmremGenerator = new THREE.PMREMGenerator(renderer)
                loader.load(url, (texture) => {
                const envMap = pmremGenerator.fromEquirectangular(texture).texture
                texture.dispose()
                pmremGenerator.dispose()
                resolve(envMap)
                })
            })
        }
    }
}
</script>