<template>
  <Renderer ref="renderer" resize antialias alpha :orbit-ctrl="{ autoRotate: true, enableDamping: true, dampingFactor: 0.05 }">
    <Camera :position="{ x: 0, y: 0, z: 10 }" />
    <Scene background="#ffffff">
      <Box ref="mesh" :size="3" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
        <MatcapMaterial name="2E763A_78A0B7_B3D1CF_14F209" />
      </Box>
    </Scene>
  </Renderer>
</template>

<script>
import { Box, Camera, MatcapMaterial, Renderer, Scene } from 'troisjs';
export default {
  components: { Box, Camera, MatcapMaterial, Renderer, Scene },
  computed: {
    frame() {
      const canvas = this.$refs.renderer
      console.log(canvas)
      return canvas.toDataURL();
    }
  },
  mounted() {
    console.log('frame', frame)
  }

};
</script>
Footer
