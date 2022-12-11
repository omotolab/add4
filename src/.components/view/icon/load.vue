
<template>
    <div style="height: 20px;  width: 20px" class="on-rotate">
        <ArrowPathIcon />
    </div>
    
</template>

<script>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
export default {
    components: { ArrowPathIcon },
}
</script>

<style>
.on-rotate {
    animation: rotation 1s infinite linear;
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