<template>
  <img class="uk-flex uk-flex-middle" :src="src" width="130" height="42" uk-svg />
</template>
<script>
export default {
  props: [
    'src',
    'size'
  ]
}
</script>
