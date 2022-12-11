<template>
    <medium-editor 
        v-model='content' 
        :options='options' 
        :onChange="onChange" 
        v-on:uploaded="uploadCallback" />
</template>
<style lang="css">
@import "medium-editor/dist/css/medium-editor.css";
@import "vuejs-medium-editor/src/themes/default.css";
/*@import '~highlight.js/styles/github.css';*/
/* @import '~highlight.js/styles/ocean.css'; */
</style>
<script>
import MediumEditor from 'vuejs-medium-editor'
export default {
    props: ['text'],
    data() {
        return {
            content: this.text,
            options: {
            }
        }
    },
    components: { MediumEditor },
    methods: {
      onChange() {
        this.$emit('change', this.content)
      },
      uploadCallback(url) {
        console.log("uploaded url", url)
      }
    },
}
</script>