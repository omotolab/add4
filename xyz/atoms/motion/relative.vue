<template>
    <Renderer ref="renderer" alpha="true" height="512" width="512">
      <Camera ref="camera" :position="camPosition" />
      <Scene>
        <PointLight :position="sunPosition" />
        <Box ref="box" :rotation="boxRotation">
          <LambertMaterial />
        </Box>
      </Scene>
    </Renderer>
  </template>
    
  <script>
  export default {
    props: ['motionData'],
    data() {
      return {
        camPosition: { z: 10, y: 0, x: 0 },
        sunPosition: { y: 50, z: 50 },
        boxRotation: { x: 0, y: 0, z: 0 },
        boxOrigin: { x: 0, y: 0, z: 0 }
      }
    },
    computed: {
      boxPosition() {
        console.log('this', this.$refs)
        return this.$refs.box.mesh.position
      }
    },
    mounted() {
      const renderer = this.$refs.renderer;
      const camera = this.$refs.camera
      const box = this.$refs.box.mesh;
  
      console.log('cam', camera)
  
      if (motionData) {
        renderer.onBeforeRender(() => {
  
          const {
            rotationRate,
            acceleration,
            accelerationIncludingGravity,
            interval
          } = this.motionData
  
          box.rotation.x += (rotationRate.beta / 100);
          box.rotation.y += (rotationRate.gamma / 100);
          box.rotation.z += (rotationRate.alpha / 100);
  
          box.position.z = ((1 / (1 + Math.exp(acceleration.z))) - 0.5) * Math.PI * 2
          box.position.y = ((1 / (1 + Math.exp(acceleration.y))) - 0.5) * Math.PI * 2
          box.position.x = ((1 / (1 + Math.exp(acceleration.x))) - 0.5) * Math.PI * 2
          // cameraRef.camera.lookAt( box.position );
          console.log('box', camera)
  
          // console.log('acc', this.boxPosition.z)
          // console.log('b', box)
  
          /* if(rotation) {
            console.log('m', rotation)
          } */
  
        });
      }
  
    },
  };
  </script>