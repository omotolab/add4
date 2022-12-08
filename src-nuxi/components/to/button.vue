<script setup>

const props = defineProps({
  action: {
    default: function() {
        return function({ value }) {
          console.log(Date.now(), value)
        }
    }
  }
})

function handleAction({ event }) {
    props.action({ event })
}

</script>
<template>
        <button class="uk-icon-button uk-border-rounded" @click="(event) = handleAction({ event })">
            <slot></slot>
        </button>
</template>
<style>
.uk-button-default {
    background-color: transparent;
    color: #333;
    border: 2px solid #e5e5e5;
}
</style>