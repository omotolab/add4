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
//import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.cjs';import gsap from 'gsap'

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

        const parameters = {
            color: '#e1b5ff',
            spin: () =>
            {
                gsap.to(mesh.rotation, { duration: 2,  y: mesh.rotation.y + 10 })
            }
        }

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


        //cursor
        const cursor = {
            x: 0,
            y: 0,
        }
        window.addEventListener('mousemove', (myEvent) => {
            cursor.x = myEvent.clientX / sizes.width - 0.5
            cursor.y = - (myEvent.clientY / sizes.height - 0.5)

            //console.log(cursor.y)
        })

        // cube
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: parameters.color })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        //gui 
        const objectFolder = gui.addFolder('objects')
        objectFolder.add(mesh.position, 'y').min(-1).max(3).step(0.01)
        objectFolder.add(mesh, 'visible')
        objectFolder.addColor(parameters, 'color').onChange( () => {
            material.color.set(parameters.color) })
        objectFolder.add(parameters, 'spin')

        
        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 1
        camera.position.y = 1
        camera.position.z = 1
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
            //mesh.rotation.y = elapsedTime * 0.1

            window.requestAnimationFrame(tick)
            renderer.render(scene, camera)

        }
        tick()
    
    }
}
</script>