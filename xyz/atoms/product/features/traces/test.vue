<template lang="pug">
  .temp
    .leftBar
      .accelerationGrapher
        AccelerationGrapher
      .localMap
        LocalMap
    .pathTracer
      PathTracer
</template>
<script>
import PathTracer from '~/components/prototype/accelerate/pathTracer'
import AccelerationGrapher from '~/components/prototype/accelerate/accelerationGrapher'
import LocalMap from '~/components/prototype/accelerate/localMap'
export default {
  components: {
    PathTracer,
    AccelerationGrapher,
    LocalMap
  }
}
</script>

<style scoped="">
  .pathTracer {
    float : left;
    display: block;
    width: 50%;
    height: 500px;
  }

  .leftBar {
    float : left;
    display: block;
    width : 50%;
  }

  .accelerationGrapher {
    height: 400px;
    width: 100%;
  }
  .localMap {
    height: 400px;
    width: 100%;
  }
</style>
