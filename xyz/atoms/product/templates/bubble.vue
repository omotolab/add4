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
//import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.cjs';import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.cjs'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.cjs'


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
        renderer.shadowMap.enabled = true
        renderer.outputEncoding = THREE.sRGBEncoding


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

        
        const parameters = {
            color: '#e1b5ff',
            backgroundColor: '#e1b5ff',
        }
       

        //Loaders
        const cubeTextureLoader = new THREE.CubeTextureLoader()
        const environmentMapTexture = cubeTextureLoader.load([
            '/textures/environmentMaps/5/px.jpg',
            '/textures/environmentMaps/5/nx.jpg',
            '/textures/environmentMaps/5/py.jpg',
            '/textures/environmentMaps/5/ny.jpg',
            '/textures/environmentMaps/5/pz.jpg',
            '/textures/environmentMaps/5/nz.jpg'
        ])
        
        scene.background = new THREE.Color('#e1b5ff')

        //material
        const reflectiveMaterial = new THREE.MeshStandardMaterial({
            envMap: environmentMapTexture,
            color: parameters.color,
            metalness: 1,
            roughness: 0,
            opacity: 0.6,
            transparent: true,
        })
        const wireframeMaterial = new THREE.MeshNormalMaterial( {
                    wireframe: true,
					side: THREE.DoubleSide
				} )


        // cube
        const bubble = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            reflectiveMaterial
        )

        scene.add(bubble)
        

         // lights
        bubble.castShadow = true
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
        directionalLight.position.set(2, 2, - 1)

        directionalLight.castShadow = true

        directionalLight.shadow.mapSize.width = 1024
        directionalLight.shadow.mapSize.height = 1024
        //Amplitude- to reduce the properties of the amplitude
        directionalLight.shadow.camera.top = 2
        directionalLight.shadow.camera.right = 2
        directionalLight.shadow.camera.bottom = - 2
        directionalLight.shadow.camera.left = - 2

        directionalLight.shadow.camera.near = 1
        directionalLight.shadow.camera.far = 6

        //directionalLight.shadow.radius = 10 //radius doesn't work with pcf
        renderer.shadowMap.type = THREE.PCFSoftShadowMap // makes the edges look a little better

        scene.add( directionalLight)
        scene.add( new THREE.HemisphereLight( '#ffffff', '#4f2c91', 0.4))
/*       


        const spotLight = new THREE.SpotLight( 0xffffff, 1 );
        spotLight.position.set( 0.6, 0.2, 1 );
        spotLight.position.multiplyScalar( 1 );
        scene.add( spotLight );

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        spotLight.shadow.camera.near = 200;
        spotLight.shadow.camera.far = 1500;

        spotLight.shadow.camera.fov = 40;

        spotLight.shadow.bias = - 0.005; */

        //gui 
        const objectFolder = gui.addFolder('objects')
        objectFolder.add(bubble.position, 'y').min(-1).max(3).step(0.01)
        objectFolder.add(bubble, 'visible')
        objectFolder.addColor(parameters, 'color').onChange( () => {
            bubbleMaterial.color.set(parameters.color) })

        
        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 0.5
        camera.position.z = 3
        scene.add(camera)

        
        // Controls
        const orbitControls = new OrbitControls( camera, renderer.domElement );
        const trackBallControls = new TrackballControls(camera, renderer.domElement)


        // clock
        const clock = new THREE.Clock()
        let previousTime = 0

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
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime

            window.requestAnimationFrame(tick)
            renderer.render(scene, camera)

        }
        tick()
    
    }
}
</script>