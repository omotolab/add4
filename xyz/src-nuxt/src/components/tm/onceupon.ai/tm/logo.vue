<template>
   <uk-svg :src="logoSrc" />
</template>
<script>
export default {
    data() {
        return {
            logoSrc: '/logo.svg',
        }
    }
}
</script>
<style>
.nuxt-logo {
  height: 180px;
}
</style>
