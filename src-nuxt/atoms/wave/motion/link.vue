<template>
    <button @click="isShowing = !isShowing">Toggle</button>
    <TransitionRoot :show="isShowing" as="a" href="/my-url" class="font-bold">
      I will appear and disappear.
    </TransitionRoot>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import { TransitionRoot } from '@headlessui/vue'
  
    const isShowing = ref(true)
  </script>