<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'settings'
  },

  action: {
    type: Function,
    default: function() {
        return console.log('running settings')
    }
  },

  children: {
    type: Array,
    default: function() {
        return []
    }
  }
});

const { name, children, action } = toRefs(props);
// console.log( 's', task.value)

</script>
<template lang="pug">
div
  div(v-if="children.length < 1")
    p hello
    // tm-input(:name="name" )
    // tm-button(:action="action")
  div(v-else)
      ul.uk-list.uk-list-small
          li
              .uk-text-meta {{ name }}
          li 
              hr.uk-divider-small
          li(v-for="setting in children")
              template(v-if="typeof setting.action === 'function'")
                // tm-button(:name="setting.name" :action="setting.action")
                tm-input(:name="setting.name" :value="setting.value" :action="setting.action" :placeholder="JSON.stringify(setting.value)" :disabled="true").uk-padding-xsmall
              template(v-else-if="Array.isArray(setting.action)")
                  // tm-input(:name="setting.name")
                  to-control(:name="setting.name" :children="setting.action")
              
</template>