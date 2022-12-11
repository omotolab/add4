<script>
export default {
  data() {
  	return {
	    title: 'Benefits',
    	items: [
        { heading: 'Express yourself more naturally', text: 'Find out how you can use Signs to express yourself the way you naturally want to.' },
        { heading: 'Create a shared family language', text: 'Share your Signs within your family and get to know each other better.' },
        { heading: 'Use your Signs in everyday live', text: "When you know your Signs, you'll find yourself signing them even when you're not using your phone." }
      ]
  	}
	}
}
</script>

<template lang="pug">
.uk-section.uk-background-secondary
    .uk-container.uk-text-center.uk-light
        .uk-margin-large
            h2.uk-h2  {{ title }}
        .uk-text.uk-grid(class='uk-child-width-expand@s' uk-scrollspy="cls: uk-animation-slide-bottom; target: .uk-card; delay: 80; repeat: false")
            div(v-for='(item, index) in items')
                .uk-card.uk-card-body.uk-margin
                    h3.uk-card-title {{ item.heading }}
                    p
                    | {{ item.text }}
