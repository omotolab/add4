<script>
export default {
  data() {
  	return {
	    title: 'Everybody signs',
        subtitle: 'Benefits',
    	items: [
        { 
            heading: 'For yourself', 
            text: 'Make your first gesture', 
            benefits: "Your own private Signs Library: Keep track of your own signs, by creating your own library. Use your Signs in everyday live. When you know your Signs, you'll find yourself signing them even when you're not using your phone.",
            imgSrc: 'https://coordinature.github.io/development/applications/familysigns/images/ill-21-signs.png'
        },
        { 
            heading: 'For Family', 
            text: 'Create a shared family language', 
            benefits: 'Create a shared family language: Share your signs within your family and get to know each other better. Private Family Channel: Create a safe space. Send messages in a space made only for your family members.',
            imgSrc: 'https://coordinature.github.io/development/applications/familysigns/images/ill-21-family.png'
            
        },
        { 
            heading: 'For Groups', 
            text: 'Create a group and share your Signs with each other ', 
            benefits: 'A group for every group: Decide yourself what type of group you want to make. This could be for school, for sport teams or for work.',
            imgSrc: 'https://coordinature.github.io/development/applications/familysigns/images/ill-21-heart2.png'
        }
      ]
  	}
	}
}
</script>

<template lang="pug">
.uk-section.uk-background-muted.uk-height-viewport.uk-flex.uk-flex-middle
    .uk-container.uk-text-center
        .uk-margin-large
            h2.uk-h2 {{ title }}
            //h3.uk-h3 {{ subtitle }}
        .uk-text.uk-grid(class='uk-child-width-expand@s' uk-scrollspy="cls: uk-animation-slide-bottom; target: .uk-card; delay: 80; repeat: false")
            div(v-for='(item, index) in items')
                .uk-card
                    .uk-card-media-top
                        img(:src='item.imgSrc').uk-height-medium
                    .uk-card-body.uk-margin
                        h3.uk-h3.uk-card-title {{ item.heading }}
                        p
                        | {{ item.text }}
                        p {{ item.benefits }}
            
