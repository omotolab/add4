
<template>
    <BoltIcon  class="h-24px w-24px"  v-if="active" />
    <BoltSlashIcon class="h-24px w-24px"   v-else/>
</template>
<style >
.rotate {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
<script>
import { BoltIcon } from '@heroicons/vue/24/solid'
import { BoltSlashIcon } from '@heroicons/vue/24/solid'
export default {
    props: ['active'],
    components: { BoltIcon, BoltSlashIcon },
}
</script>