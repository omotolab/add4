
<template>
    <div  style="height: 20px;  width: 20px">
        <BoltIcon />
    </div>
    
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
export default {
    components: { BoltIcon },
}
</script>