
<template lang="pug"> 
header
  .uk-container-small.uk-margin-auto 
    .uk-grid.uk-grid-collapse.uk-width-1-1.uk-flex.uk-flex-between.uk-flex-middle
      div
        nuxt-link(:to="'/' + $route.params.scope")
          logo.uk-logo.uk-dark
      div.uk-flex.uk-flex-middle.uk-flex-between.uk-grid.uk-grid-small
        div
          ul(v-if="rightOptions").uk-subnav.uk-subnav-pill.uk-flex.uk-flex-center.uk-flex-middle.uk-margin-remove
            li(v-for="option in rightOptions")
              template(v-if="$route.params.scope")
                nuxt-link(:to="'/'+$route.params.scope+'/'+option.route") {{ option.name }}
              template(v-else)
                nuxt-link(:to="option.route") {{ option.name }}
        div
          ul.uk-flex.uk-margin-remove.uk-list
            li
              nuxt-link(to="account").uk-button.uk-button-default Login

</template>
<style>
.uk-logo svg {
  height: 30px;
  width: 30px
}
</style>
<script>
export default {
    props: {
        text: {
            type: String,
            default: 'custom header'
        },
        rightOptions: {
            type: Array,
            default: function() {
              return [{
                name: "Features",
                route: 'features'
              },{
                name: "Plans",
                route: 'plans'
              }]
            }
        }
    }
}
</script>