<template>
    <!-- The `show` prop controls all nested `TransitionChild` components. -->
    <TransitionRoot :show="isShowing" appear>
      <!-- Background overlay -->
      <TransitionChild
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <!-- ... -->
        A
      </TransitionChild>
  
      <!-- Sliding sidebar -->
      <TransitionChild
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <!-- ... -->
        B
      </TransitionChild>
    </TransitionRoot>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import { TransitionRoot, TransitionChild } from '@headlessui/vue'
  
    const isShowing = ref(true)
  </script>