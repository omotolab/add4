<template>
  <Renderer ref="renderer" alpha="false" height="512" width="512">
    <Camera ref="camera" :position="camPosition" />
    <Scene background="transparent">
      <PointLight :position="sunPosition" />
      <Box ref="box" :rotation="boxRotation">
        <LambertMaterial />
      </Box>
    </Scene>
  </Renderer>
</template>
  
<script>
export default {
  props: {
    motionData: {
      type: Object,
      default: function () {
        return {
          rotationRate: {
            beta: 0.5,
            gamma: 0.5,
            alpha: 0.5
          },
          acceleration: { x: 1, y: 1, x: 1},
          accelerationIncludingGravity: { x: 1, y: 1, x: 1},
          interval: 1
        }
      }
    }
  },
  data() {
    return {
      camPosition: { z: 10, y: 0, x: 0 },
      sunPosition: { y: 50, z: 50 },
      boxRotation: { x: 0, y: 0, z: 0 },
      boxOrigin: { x: 0, y: 0, z: 0 },
      pinData: this.motionData
    }
  },
  computed: {
    boxPosition() {
      console.log('this', this.$refs)
      return this.$refs.box.mesh.position
    }
  },
  methods: {
    updateScene() {
      
      const camera = this.$refs.camera
      const box = this.$refs.box.mesh;


      const {
        rotationRate: {
          beta,
          gamma,
          alpha
        },
        acceleration,
        accelerationIncludingGravity,
        interval
      } = this.motionData

      box.rotation.x += (beta / 100);
      box.rotation.y += (gamma / 100);
      box.rotation.z += (alpha / 100);

      // box.position.z = ((1 / (1 + Math.exp(acceleration.z))) - 0.5) * Math.PI * 2
      // box.position.y = ((1 / (1 + Math.exp(acceleration.y))) - 0.5) * Math.PI * 2
      // box.position.x = ((1 / (1 + Math.exp(acceleration.x))) - 0.5) * Math.PI * 2
      // cameraRef.camera.lookAt( box.position );
      // console.log('box', camera)


    }
  },
  mounted() {


    // renderer.setClearColor( 0xf8f8f8, 0 )

    const renderer = this.$refs.renderer;
    renderer.onBeforeRender(this.updateScene);
  },
};
</script>