
<script setup>

const props = defineProps({
      logoSrc: {
        type: String,
        default: '/logo_black.svg'
      },
      title: {
        type: String,
        default: 'Make communicating easier and more exciting.'
      },
      description: {
        type: String,
        default: 'Create your own Sign language and share yourself with the world. Start building your Signs library today.'
      },
      count: {
        type: Number,
        default: 0
      },
      links: {
        type: Array,
        default: function() {
          return [
            {
              label: "Join the research",
              route: "research"
            },
            {
              label: "See the library",
              route: "library"
            }
          ]
        }
      },
      events: {
        type: Array,
        default: function() {
          return [
            'party',
            'festival',
            'concert',
          ]
        }
      }
  });

</script>
<template lang="pug">
.uk-background-primary
  .uk-background-cover HEllo
</template>
 <!-- <template lang="pug">
.uk-background-primary hello
  .tm-gradient
    .uk-background-cover.uk-height-xsmall.uk-light
        .uk-text-center(class='uk-child-width-1-2@m' uk-grid='').uk-margin-remove
            .uk-animation-toggle(tabindex='0')
            img.uk-animation-stroke(src='strokes/stroke.svg'  alt='' uk-svg='stroke-animation: true')
    a.uk-logo(href='/').uk-margin-large-left.uk-padding-top.uk-margin-top.uk-light Signs
    // .uk-section.uk-light.uk-height-viewport.uk-flex.uk-flex-middle.uk-flex-center.uk-padding-remove
      .uk-container
        // tm-signs-logo(:src="logoSrc")
        .uk-margin-top
          article(class="uk-width-medium uk-width-large@s uk-width-xlarge@m").uk-text-center.uk-text-break
            h1(class="uk-h2 uk-hidden@s") {{ title }}
            h1(class="uk-h1 uk-visible@s") { title }
            
            p {{ description }}
            
            ul(v-if="links" uk-grid="masonry: true").uk-flex.uk-flex-middle.uk-flex-center.uk-grid.uk-grid-small
                li(v-for="(item, i) in links" class="uk-width-1-2@s")
                  nuxt-link(:to="`${item.route}`").uk-width-1-1
                    div(:class="i === 0 ? 'uk-button-primary' : ''").uk-button.uk-button-large.uk-button-default.uk-border-rounded.uk-width-1-1
                      span {{ item.label  }}
</template> -->

<!-- <script>
export default {
    props: {
      logoSrc: {
        type: String,
        default: '/logo_black.svg'
      },
      title: {
        type: String,
        default: 'Make communicating easier and more exciting.'
      },
      description: {
        type: String,
        default: 'Create your own Sign language and share yourself with the world. Start building your Signs library today.'
      },
      count: {
        type: Number,
        default: 0
      },
      links: {
        type: Array,
        default: function() {
          return [
            {
              label: "Join the research",
              route: "research"
            },
            {
              label: "See the library",
              route: "library"
            }
          ]
        }
      },
      events: {
        type: Array,
        default: function() {
          return [
            'party',
            'festival',
            'concert',
          ]
        }
      }
    },
   /*  mounted() {
      setInterval(() => {
        
        if(this.count === this.events.length - 1) {
          return this.count = 0
        }
        this.count = this.count + 1
        
      }, 1500);
    } */
}
</script> -->
