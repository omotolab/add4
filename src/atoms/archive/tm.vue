<template>
    <div id="scene">
        <div>My first Layer!</div>
        <div>My second Layer!</div>
    </div>
</template>
<script>
import Parallax from 'parallax-js'

export default {
    mounted() {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);

    }
}
</script>
<!-- <style scope>
html,
body {
    background: rgb(0, 0, 0)
}
</style> -->