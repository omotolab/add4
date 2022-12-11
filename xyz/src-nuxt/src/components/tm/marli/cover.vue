<template lang="pug">
.uk-background-primary 
  .tm-gradient
    .uk-section.uk-light.uk-height-viewport
      .uk-container.uk-flex.uk-flex-middle.uk-flex-center.uk-flex-column.uk-flex-around.uk-height-1-1
        tm-marli-logo(:src="logoSrc")
        .uk-margin-top.uk-height-medium.uk-width-large.uk-width-1-1.uk-flex.uk-flex-middle
          article.uk-text-center
            h1
              .uk-h1 
                | Two steps to your next
                br
                | {{ this.events[this.count] }}
        ul.uk-list.uk-margin-large-top
          li 
            nuxt-link(to="account").uk-button.uk-button-large.uk-button-primary.uk-width-medium Join Private Beta
          // li 
            nuxt-link(to="tickets").uk-button.uk-button-large.uk-button-primary.uk-width-medium Join Private Beta
          li 
            nuxt-link(to="#features" uk-scroll).uk-button.uk-button-large.uk-button-default.uk-width-medium Learn More
          // ul(v-if="list").uk-list
            li(v-for="(item, i) in list")
              nuxt-link(:to="`${item.slug}`")
                .uk-button.uk-button-default.uk-border-rounded 
                  span Find {{ item.slug }}
</template>
<script>
export default {
    props: ['list'],
    data() {
      return {
        logoSrc: '/logo.svg',
        count: 0,
        events: [
          'party',
          'festival',
          'concert',
        ]
      }
    },
    mounted() {
      setInterval(() => {
        
        if(this.count === this.events.length - 1) {
          return this.count = 0
        }
        this.count = this.count + 1
        
      }, 1500);
    }
}
</script>