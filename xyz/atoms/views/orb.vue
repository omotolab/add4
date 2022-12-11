<template lang="pug">
    canvas(ref="canvas-orb")
</template>
<script>
import * as THREE from 'three'
export default {
    name: "orb",
    mounted() {
        const canvas = this.$refs['canvas-orb']
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight )
        const geometry = new THREE.SphereGeometry( 15, 32, 16 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        const sphere = new THREE.Mesh( geometry, material );
        scene.add( sphere );
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        }
        animate()
    }
}
</script>