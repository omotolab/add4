<script setup>
const description = ref("Mountain winds, and babbling springs, and moonlight seas")
const images = ref(['https://images.pexels.com/photos/12499889/pexels-photo-12499889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'])
async function requestImages (service) {

    if(!description.value.trim().length > 0) return

    const requestPath = 'api/' + service
    const requestOptions = {
        method: 'post',
        body: {
          description: description.value
        }
    }
    
    const { data:  { value: { result_preview } } } = await useFetch(requestPath, requestOptions );
    images.value = result_preview[0][0].map(image => 'data:image/png;base64,' + image)
    
    
}; 
</script>

<template lang="pug">
div
  .uk-card.uk-card-default.uk-grid-collapse.uk-margin(class='uk-child-width-1-2@s' uk-grid='')
    .uk-card-media-left.uk-cover-container
      img(:src='images[0]' alt='' uk-cover='')
      canvas(width='600' height='400')
    div
      .uk-card-body.uk-text-center
        h3.uk-card-title Illustrate for me
        input(v-model="description").uk-input
        button(@click="requestImages('mystic')").uk-button.uk-button-primary illustrate
    
</template>
