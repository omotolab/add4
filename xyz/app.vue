<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'
import { PhotoIcon } from '@heroicons/vue/24/solid'
 
const location = ref(null)
onMounted(() => {
  location.value = window.location.hostname
})

</script>
<template>
  <div class="uk-height-viewport uk-flex uk-flex-middle uk-flex-center ">
    <div class="text-red-400 dark:text-green-400">
      <div class="uk-margin uk-text-center">
        <div class="uk-text-large">Unwelcome</div>
        <div >This page is empty.</div>
      </div>
     
      <div class="uk-text-center">
        <pre style="white-space: pre-wrap;" class="uk-margin-small uk-text-center uk-flex uk-flex-center uk-flex-middle uk-border-rounded uk-width-medium uk-height-small uk-background-secondary"><code>{{location}}</code></pre>
      </div>

      <div class="uk-flex uk-flex-between">
        
        <div class="uk-text-small">
          <ul class="uk-iconnav uk-flex uk-flex-middle">
            <li>
              <span class="uk-icon-button uk-button-secondary uk-border-rounded">
                <PhotoIcon style="padding: 5px"/>
              </span>
            </li>
            <li>
              <div style="margin-bottom: -1px;">First writing block.</div>
              <div style="font-size: 0.8rem" class="uk-text-meta">This is a first.</div>
            </li>
          </ul>
          
        </div>
        <div class="uk-flex uk-flex-middle">
          <ul class="uk-iconnav uk-flex uk-flex-middle uk-flex-right">
            <li>
              <span class="uk-icon-button uk-button-default uk-border-rounded">
                <PlusIcon style="padding: 5px"/>
              </span>
            </li>
           <!--  <li><switch></switch></li> -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
