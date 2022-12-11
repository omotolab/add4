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
//import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.cjs';import { DragControls } from 'three/examples/jsm/controls/DragControls.cjs';

import gsap from 'gsap'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.cjs'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.cjs'
//import { FBXLoader } from './jsm/loaders/FBXLoader.cjs'



export default {
    data() {
        return {
            mode: 'orbit',
            options: [
                'orbit',
                'track',
                'drag'
            ],
            outlines: [
                {
                    url: '/img/svg/elements_user.svg',
                    transform: {
                        color: '',
                        depth: 5,
                        origin: [-1, -1, 0],
                        scale: 0.006
                    }
                },
                {
                    url: '/img/svg/elements_keyboard.svg',
                    transform: {
                        color: '#0e86be',
                        depth: 1,
                        origin: [0.4, -1, 0.6],
                        scale: 0.004
                    }
                },
                {
                    url: '/img/svg/elements_ticker.svg',
                    transform: {
                        color: ['#00fd9f', '#d9ff2d'],
                        depth: 0.5,
                        origin: [-2, -0.2, -0.6],
                        scale: 0.004,
                        stagger: true
                    }
                },
                {
                    url: '/img/svg/elements_display.svg',
                    transform: {
                        color: ['#00fd9f'],
                        depth: 0.5,
                        origin: [-2, 0.3, -0.6],
                        scale: 0.004,
                    }
                },
                {
                    url: '/img/svg/elements_motion.svg',
                    transform: {
                        color: '#dcb3ff',
                        depth: 1,
                        origin: [-2.5, 1, 0],
                        scale: 0.004,
                        stagger: true
                    }
                },
                                {
                    url: '/img/svg/elements_motion2.svg',
                    transform: {
                        color: '#dcb3ff',
                        depth: 1,
                        origin: [2.5, -0.2, 0],
                        scale: 0.003,
                        stagger: true
                    }
                },
                
            ]
        }
    },
    mounted() {
        // set up the scene
        const dat = require('dat.gui')
        const scene = new THREE.Scene()
        let textOne, textA, textB, textC
 

        

         //Debug
        const gui = new dat.GUI({ closed: true, width: 400})
            //gui.hide()

        const parameters = {
            color: '#eaeaea',
            spin: () =>
            {
                gsap.to(textOne.rotation, { duration: 2,  y: textOne.rotation.y + 12 })
            }
        }

        scene.background = new THREE.Color(parameters.color);
        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const renderer = new THREE.WebGLRenderer({ antialias: true})
        renderer.setSize( sizes.width, sizes.height )
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        const doc = document.getElementById( "canvas" )
        doc.appendChild( renderer.domElement );      /// assigning the canvas in the html to this canvas

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 1
        camera.position.z = 8
        
        // Axes Helper
        const axesHelper = new THREE.AxesHelper(2)
        
        scene.add(camera)

        gui.add(camera.position, 'z').min(1).max(20).step(0.01)

        
        
        // Controls
        const orbitControls = new OrbitControls( camera, renderer.domElement );
        const trackBallControls = new TrackballControls(camera, renderer.domElement)
        


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

        //textureLoader
        const textureLoader = new THREE.TextureLoader()
        const matcapTexture0 = textureLoader.load('/textures/matcaps/6b.jpg')
        const matcapTexture = textureLoader.load('/textures/matcaps/matcap2tang1.jpg')
        const matcapTexture1 = textureLoader.load('/textures/matcaps/matcap2tang5.jpg')
        const matcapTexture2 = textureLoader.load('/textures/matcaps/matcap2tang7.jpg')
        const matcapTexture3 = textureLoader.load('/textures/matcaps/matcap2tang8.jpg')
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const material1 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture1 })
        const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
        const material3 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })
        
        /**
         * Models
         */
        const gltfLoader = new GLTFLoader()
        /* gltfLoader.load(
            '/models/minimalphone3.gltf',
            (gltf) =>
            {
                gltf.scene.scale.set( 0.5, 1, 1)
                gltf.scene.position.set( -0.5, 0, -0.5)
                gltf.scene.rotation.y = -1.2
                scene.add(gltf.scene)
            }
        ) */
        //let mixer = null

        /*
        let groupZ
        this.outlines.forEach((outline, i) => {
            // instantiate a loader
            const loader = new SVGLoader();
                    // load a SVG resource

            const urlChecked = (outline) => {
                if( typeof outline === 'string') {
                    return `${outline}`
                } else if ( typeof outline === 'object' && outline.url ) {
                    return `${outline.url}`
                }

            }
            
            loader.load(
                // resource URL
               urlChecked(outline),
                // called when the resource is loaded
                function ( data ) {
                     //console.log(outline)

                    const paths = data.paths;
                    groupZ = new THREE.Group();

                    for ( let i = 0; i < paths.length; i ++ ) {
                        let colorCheck


                        if(Array.isArray(outline.transform.color)) {
                            colorCheck = outline.transform.color[i]
                        } else if (typeof outline.transform.color === 'string') {
                            colorCheck = outline.transform.color
                        }


                        const path = paths[ i ];
                        const material = new THREE.MeshMatcapMaterial( {
                            color: colorCheck,
                            matcap: matcapTexture0,
                            side: THREE.DoubleSide,
                            depthWrite: true
                        } );

                        const shapes = SVGLoader.createShapes( path );

                        for ( let j = 0; j < shapes.length; j ++ ) {

                            const shape = shapes[ j ];
                            const geometry = new THREE.ExtrudeGeometry( shape, {
                                depth: outline.transform.depth,
                                bevelEnabled: true,
                                bevelThickness: 2,
                                bevelSize: 1,
                                bevelOffset: 0,
                                bevelSegments: 4
                            } );
                            const mesh = new THREE.Mesh( geometry, material );
                            groupZ.add( mesh );

                            if(outline.transform.stagger) {
                                const stagger = i*5
                                mesh.position.set(outline.transform.origin[0],outline.transform.origin[1], outline.transform.origin[2] + stagger )
                            }
                            
                        }
                            gui.addColor(parameters, 'color').onChange( () => {
                            material.color.set(parameters.color) })
                    }

                    groupZ.position.set(0,0,0)
                    groupZ.scale.set( 0.0181, 0.0181, 0.0181)


                    if(outline.transform.origin) {
                        groupZ.position.set(outline.transform.origin[0],outline.transform.origin[1],outline.transform.origin[2] )
                    }

                    if(outline.transform.scale) {
                        if(Array.isArray(outline.transform.scale)) {
                            groupZ.scale.set(outline.transform.scale[0],outline.transform.scale[1],outline.transform.scale[3])
                        } else if (typeof outline.transform.scale === 'number') {
                            groupZ.scale.set(outline.transform.scale,outline.transform.scale,outline.transform.scale)
                        }
                    }
                
                    
                    scene.add( groupZ );
                    
                    camera.lookAt( groupZ )
                    //console.log( group )

                },


                // called when loading is in progresses
                function ( xhr ) {

                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

                },


                // called when loading has errors
                function ( error ) {

                    console.log( 'An error happened' );

                }
            );


        })*/

        const fontLoader = new THREE.FontLoader()
        

        fontLoader.load(
            '/fonts/helvetiker_regular.typeface.json',
            (font) => {
                const textGeometry = new THREE.TextGeometry(
                    'For yourself',
                    {
                        font: font,
                        size: 0.6,
                        height: 0.05,
                        curveSegments: 6,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 4
                    }
                )
                textGeometry.center()
                textOne = new THREE.Mesh(textGeometry, material)
                scene.add(textOne)
        })
        
        console.log(textOne)
        
        for(let i = 0; i < 25; i++)
        {
            fontLoader.load(
                        '/fonts/helvetiker_regular.typeface.json',
                        (font) =>
                        {
                            const textGeometry = new THREE.TextGeometry(
                                'A',
                                {
                                    font: font,
                                    size: 0.2,
                                    height: 0.05,
                                    curveSegments: 6,
                                    bevelEnabled: true,
                                    bevelThickness: 0.03,
                                    bevelSize: 0.02,
                                    bevelOffset: 0,
                                    bevelSegments: 4
                                }
                            )
                            textA = new THREE.Mesh(textGeometry, material1)
                            textA.position.x = (Math.random() - 0.5) * 6
                            textA.position.z = (Math.random() - 0.5) * 6
                            textA.position.y = (Math.random() - 0.5) * 6

                            textA.rotation.x = Math.random() * Math.PI
                            textA.rotation.y = Math.random() * Math.PI

                            const scale = Math.random()
                            textA.scale.set(scale, scale, scale)
                            scene.add(textA)

                            }
                        )                        
        }
         for(let i = 0; i < 25; i++)
        {
            fontLoader.load(
                        '/fonts/helvetiker_regular.typeface.json',
                        (font) =>
                        {
                            const textGeometry = new THREE.TextGeometry(
                                'B',
                                {
                                    font: font,
                                    size: 0.2,
                                    height: 0.03,
                                    curveSegments: 6,
                                    bevelEnabled: true,
                                    bevelThickness: 0.03,
                                    bevelSize: 0.02,
                                    bevelOffset: 0,
                                    bevelSegments: 4
                                }
                            )
                            textB = new THREE.Mesh(textGeometry, material2)
                            textB.position.x = (Math.random() - 0.5) * 6
                            textB.position.y = (Math.random() - 0.5) * 8
                            textB.position.z = (Math.random() - 0.5) * 6

                            textB.rotation.x = Math.random() * Math.PI
                            textB.rotation.y = Math.random() * Math.PI

                            const scale = Math.random()
                            textB.scale.set(scale, scale, scale)
                            scene.add(textB)

                            }
                        )                        
        }
         for(let i = 0; i < 25; i++)
        {
            fontLoader.load(
                        '/fonts/helvetiker_regular.typeface.json',
                        (font) =>
                        {
                            const textGeometry = new THREE.TextGeometry(
                                'C',
                                {
                                    font: font,
                                    size: 0.4,
                                    height: 0.03,
                                    curveSegments: 6,
                                    bevelEnabled: true,
                                    bevelThickness: 0.03,
                                    bevelSize: 0.02,
                                    bevelOffset: 0,
                                    bevelSegments: 4
                                }
                            )

                            textC = new THREE.Mesh(textGeometry, material3)
                            textC.position.x = (Math.random() - 0.5) * 6
                            textC.position.y = (Math.random() - 0.5) * 10
                            textC.position.z = (Math.random() - 0.5) * 6

                            textC.rotation.x = Math.random() * Math.PI
                            textC.rotation.y = Math.random() * Math.PI

                            const scale = Math.random()
                            textC.scale.set(scale, scale, scale)
                            scene.add(textC)

                            }
                        )                        
        }

        /*textGeometry.computeBoundingBox()
        textGeometry.translate(
            - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
            - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
            - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
        )*/ // this is a more difficult way to center the text.

        //lights
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
        directionalLight.position.set(2.2, 1.8, 2.6)
        scene.add(directionalLight)

        //const dragControls = new DragControls( groupZ, camera, renderer.domElement );

        //gui 
        gui.add(directionalLight, 'intensity').min(0).max(5).step(0.01)
        gui.add(directionalLight.position, 'z').min(0).max(5).step(0.01)
        gui.add(directionalLight.position, 'x').min(0).max(5).step(0.01)
        gui.add(directionalLight.position, 'y').min(0).max(5).step(0.01)
        gui.add(directionalLight, 'visible')
        
        //gui.add(text.position, 'y').min(-1).max(3).step(0.01)
        //gui.add(text, 'visible')
        
        gui.add(parameters, 'spin')

        // clock
        const clock = new THREE.Clock()

        // animations
        const tick = () => {

            //update camera
            if(this.mode !== 'orbit') {

                trackBallControls.update();
                orbitControls.enabled = false

            } else if(this.mode === 'orbit') {
                orbitControls.enabled = true
                orbitControls.update()
                orbitControls.enableDamping = true

            } /*else if(this.mode === 'drag') {
                dragControls.update()
                orbitControls.enableDamping = false

            } */
            /*
             if(mixer)
            {
                mixer.update(deltaTime)
            }*/


            const elapsedTime = clock.getElapsedTime()    
            //console.log(textOne)

            if(textOne) {
                textOne.position.y = Math.sin(elapsedTime)* 0.1
            } 

            if(textA) {
                // textA.rotation.y = elapsedTime * 0.2
                textA.rotation.x = elapsedTime * 3.14
            }
            if(textB) {
                textB.rotation.z = elapsedTime * 0.2
            }


            window.requestAnimationFrame(tick)
            renderer.render(scene, camera)

        }
        tick()
    
    }
}
</script>