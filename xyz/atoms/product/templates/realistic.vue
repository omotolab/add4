<template>
<div>
    <div id="canvas"></div>
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
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.cjs';
//import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.cjs';import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture.cjs';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.cjs'

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
        // set up the scene
        const dat = require('dat.gui')
        const scene = new THREE.Scene()
        

         //Debug
        const gui = new dat.GUI({ closed: true, width: 400})
            //gui.hide()


        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize( sizes.width, sizes.height )
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        const doc = document.getElementById( "canvas" )
        doc.appendChild( renderer.domElement );      /// assigning the canvas in the html to this canvas
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.25

        window.addEventListener('resize', () =>
        {
            // Update sizes, camera and renderer
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
            // Update renderer
            renderer.setSize( sizes.width, sizes.height )
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        // textures
        let mesh, geometry, material, ballMaterial
        const loaderCallBack = function(hdrmap) {
            const parameters = {
            color: 0xffd8b2,
        }
            
            let envmap = envmaploader.fromCubemap(hdrmap)

            let texture = new THREE.CanvasTexture(new FlakesTexture())
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping

            texture.repeat.x = 40
            texture.repeat.y = 15
        
            ballMaterial = {
                clearcoat: 1.0,
                //clearcoatRoughness: 0.2,
                metalness: 0.9,
                roughness: 0.5,
                color: parameters.color,
                normalMap: texture,
                normalScale: new THREE.Vector2(0.15,0.15),
                envMap: envmap.texture,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide,
            }    

            // bubble
            geometry = new THREE.SphereGeometry(1, 64, 64)
            material = new THREE.MeshPhysicalMaterial(ballMaterial)
            mesh = new THREE.Mesh(geometry, material)
            const smallGeometry = new THREE.SphereGeometry(0.01, 64, 64)
            const littleMesh = new THREE.Mesh(smallGeometry, material)
            scene.add(littleMesh, mesh)
            scene.background = envmap.texture

            tick()
            //gui 
            const objectFolder = gui.addFolder('objects')
            objectFolder.add(mesh.position, 'y').min(-1).max(3).step(0.01)
            objectFolder.add(mesh, 'visible')
            objectFolder.addColor(parameters, 'color').onChange( () => {
            material.color.set(parameters.color) }) 

        }

        let envmaploader = new THREE.PMREMGenerator(renderer)
        new RGBELoader().setPath('/textures/hdri/').load('studio_small_09_4k.hdr', loaderCallBack)

        console.log(mesh)
        
        // lights
        const pointLight = new THREE.PointLight(0xffffff,1)
        pointLight.position.set(2,2,2)
        scene.add(pointLight)

        
        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.set(0,0,5)

        scene.add(camera)

        
        // Controls
        const orbitControls = new OrbitControls( camera, renderer.domElement );
        const trackBallControls = new TrackballControls(camera, renderer.domElement)


        // clock
        const clock = new THREE.Clock()

        // animations
        const tick = () =>{

            //update camera
            if(this.mode !== 'orbit') {

                trackBallControls.update();
                orbitControls.enabled = false

            } else if(this.mode === 'orbit') {
                orbitControls.enabled = true
                orbitControls.update()
                orbitControls.enableDamping = true

            } 
            

            const elapsedTime = clock.getElapsedTime()    
            mesh.rotation.y = elapsedTime * 0.1

            window.requestAnimationFrame(tick)
            renderer.render(scene, camera)

        }
        
    
    }
}
</script>