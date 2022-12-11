<template>
<div>
    <div id="canvas"></div>
</div>
    
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.cjs';
import CANNON from 'cannon' 

export default {
    
    mounted() {


        const parameters = {
                color: '#e1b5ff',
                spin: () =>{gsap.to(mesh.rotation, { duration: 2,  y: mesh.rotation.y + 10 })}
            }

    // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
    //create scene
        const clock = new THREE.Clock()
        const currentIntersect = null
        const scene = new THREE.Scene()
        const renderer = createRenderer()
        const element = createElement()
        const mesh = element.mesh
        const sphere = createSphere()
        const camera = createCamera()
        //const directionalLight = createDirectLights()
        const gui = createDebug(element)
        const particleTexture = createTextureLoader()
        const particles = createParticles()
   


        function createRenderer(){

        // renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true })
            renderer.setSize( sizes.width, sizes.height )
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.shadowMap.enabled = true


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
                renderer.render(scene, camera)
                })
                return renderer
}
        


        // mouse
        const mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (theEvent) => {
            mouse.x = theEvent.clientX / sizes.width * 2 - 1
            mouse.y = - (theEvent.clientY / sizes.height) * 2 + 1
        })

       window.addEventListener('click', () =>
        {
            if(currentIntersect)
            {
                switch(currentIntersect.object)
                {
                    case sphere:
                        console.log('click on sphere')
                    break
                    
                    case particles:
                    console.log('click on particles')
                    break
                }
            }
        })

        function createElement(){
            // create mesh
            // cube
            const geometry = new THREE.BoxGeometry(1, 0.5, 1)
            const material = new THREE.MeshBasicMaterial({ color: parameters.color })
            const mesh = new THREE.Mesh(geometry, material)

            return { mesh, material }
        } 
        

        function createTextureLoader(){
             //texture
            const textureLoader = new THREE.TextureLoader()
            const particleTexture = textureLoader.load('/textures/particles/1.png')
            return particleTexture
        } 

        function createSphere(){

            //Test sphere
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.5, 32, 32),
                new THREE.MeshStandardMaterial({
                    metalness: 0.3,
                    roughness: 0.2,
                })
            )
            sphere.castShadow = true
            //sphere.position.y = 1
            
            return sphere
        } 



        function createParticles(){
            // particles geometry & cound
            const particlesGeometry = new THREE.BufferGeometry()
            const particlesCount = 10000
            const positions = new Float32Array(particlesCount * 3)
            const particleColors = new Float32Array(particlesCount * 3)

            for(let i = 0; i < particlesCount * 3; i++)
                {
                    positions[i] = (Math.random() - 0.5) * 50
                    particleColors[i] = Math.random()
                }
            
            
            // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
            
            // Material
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.2,
                sizeAttenuation: true,
                alphaMap: particleTexture,
                transparent  : true,
                depthWrite : false,
                vertexColors : true
            })

            // mesh
            const particles = new THREE.Points(particlesGeometry, particlesMaterial)
            return particles
        }




        function createCamera(){
            const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
            camera.position.set(-3, 5, 0)
            return camera
        }
        
        function createTopCamera(){
            const topCamera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
            camera.position.set(0, 10, 0)
            return topCamera
        }
        
    // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
        //function createDirectLights(){}

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
            directionalLight.castShadow = true
            directionalLight.shadow.mapSize.set(1024, 1024)
            directionalLight.shadow.camera.far = 15
            directionalLight.shadow.camera.left = - 7
            directionalLight.shadow.camera.top = 7
            directionalLight.shadow.camera.right = 7
            directionalLight.shadow.camera.bottom = - 7
            directionalLight.position.set(5, 5, 5)

        function createDebug({ mesh, material }){

            //Debug
            const dat = require('dat.gui')
            const gui = new dat.GUI({ closed: true, width: 400})
                //gui.hide()

            //gui 
            const objectFolder = gui.addFolder('objects')
            objectFolder.add(mesh.position, 'y').min(-1).max(3).step(0.01)
            objectFolder.add(mesh, 'visible')
            objectFolder.addColor(parameters, 'color').onChange( () => {
                material.color.set(parameters.color) })
            objectFolder.add(parameters, 'spin')

            return gui 
        }


   

        
    // scene add
            scene.add( camera, directionalLight, ambientLight)
            //scene.add( sphere)
            scene.add( particles)
                
        
        //controls
            const controls = new OrbitControls(camera, canvas)
            controls.enableDamping = true

        let oldElapsedTime = 0

        function tick(){
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - oldElapsedTime
            oldElapsedTime = elapsedTime


            particles.position.y = elapsedTime * + 0.08

            
            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)
            window.requestAnimationFrame(tick)
        }
        tick()
        
        

    }
}
</script>