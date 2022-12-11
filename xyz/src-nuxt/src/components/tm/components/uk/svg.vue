<template>
  <img class="uk-flex uk-flex-middle" :src="src" width="100" height="100" uk-svg />
</template>
<style>
.uk-svg {
    fill: none;
    stroke: #ffffff;
    stroke-width: 10px;
    stroke-miterlimit: 10;
    stroke-opacity: 1;
}
</style>
<script>
export default {
  props: [
    'src',
    'size'
  ]
}
</script>
