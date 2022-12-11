<template lang="pug">
div
    .hidden
        vs-navbar(shadow='' square='' center-collapsed='' v-model='active')
            template(#right='')
                vs-button(@click='activeSidebar = !activeSidebar' flat='' icon='')
                    i.bx.bx-menu
                vs-navbar-item#guide(:active="active == 'guide'")
                vs-navbar-item#guide(:active="active == 'guide'")
        vs-sidebar(right='' absolute='' v-model='active' :open.sync='activeSidebar')
            template
            vs-sidebar-item#home
                template(#icon='')
                    i.bx.bx-support
                | Signs assistent
</template>
<script>
export default {
    layout: 'dashboard',
    data:() => ({
        active: 'home',
        activeSidebar: false
    })
}
</script>