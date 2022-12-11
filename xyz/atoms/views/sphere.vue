<template lang="pug">
  to-cont(
    :ref="canvasRef"
  )
</template>

<script>
export default {
  name: 'Sphere',
  data() {
    return {
      canvasRef: 'sphere-ref'
    }
  },
  mounted() {
    const ref = this.$refs[canvasRef]
    const renderCube = require('~/assets/script/cube.js')
    renderCube(ref)
  }
}
</script>

<style></style>