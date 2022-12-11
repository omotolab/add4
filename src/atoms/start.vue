<template lang="pug">
main.uk-background-muted
  .uk-flex.uk-flex-column.uk-flex-center.uk-flex-middle.uk-section-small.uk-section-default
    .uk-container.uk-text-center
      img.uk-margin-bottom(src="img/logo.svg" height="100" width="100" uk-svg)
      article
        h1.uk-h1 
          | Simple & Secure
          br 
          | Assisted Messaging
        p.uk-text-meta
          | With Signs™, you'll get fast, simple. assisted
          br
          | messaging and signalling for free*,
          br
          | available on phones in the Netherlands.
    .uk-container
      // .uk-card.uk-margin-top.uk-flex.uk-flex-between
        // nuxt-link(to="//web.2tangosigns.com" target="_blank").uk-button.uk-button-small.uk-button-default Go to webapp
        button(@click="toggle('sharing')" uk-icon="twitter").uk-button.uk-button-small.uk-button-primary
          template(v-if='!sharing') Try on Mobile
          template(v-else) Sharing
        a(v-if="sharing" uk-icon="close").uk-icon-button.uk-button-default
      .uk-card-small.uk-card-default.uk-margin-top.uk-card-default.uk-card-media(v-if="sharing")
        .uk-card-header Scan Code
        sharing.uk-card-body.uk-width-small
      .uk-card.uk-margin-top.uk-flex.uk-flex-between
        // nuxt-link(to="//web.2tangosigns.com" target="_blank").uk-button.uk-button-small.uk-button-default Go to webapp
        // button(v-if="sharing").uk-icon-button.uk-button-default
        // a(v-if="sharing" uk-icon="close")
        button(v-if="mobile").uk-button.uk-button-secondary.uk-width-1-1
          template(v-if='$route.query.time') {{ $route.query.time }}
        button(v-else :disabled="sharing" @click="toggle('sharing')").uk-button.uk-button-primary.uk-width-1-1
          // template(v-if='scanning') Scanning...
          template(v-if='sharing') Waiting..
          template(v-else) Try on Mobile
        
        
        // button(@click="action('try signs')").uk-button.uk-button-small.uk-button-primary Try Signs
  // .uk-flex.uk-flex-column.uk-flex-center.uk-flex-middle.uk-height-large.uk-section-muted
      img(src="logo.svg" height="100" width="100" uk-svg)
      h2 Family Signs
      p Simple, Secure, Communication
      nuxt-link(to="/download/") Download
</template>
<script>

// Required for SEA functions and user authentication

import sharing from '~/atoms/sharing'
import { isMobileOnly } from 'mobile-device-detect';

export default {
  components: {
    sharing
  },
  data: () => ({
    mobile: isMobileOnly,
    sharing: false,
    scanning: false,
    started: Date.now(),
    actions: {
      'try signs': (i) => console.log(i)
    }
  }),
  mounted() {
    /* const context = new Gun()
    this.$store.dispatch('operations/update', {
      message: `${this.$route.params.id} page mounted`
    }) */
  },
  methods: {
    toggle(option) {
      switch(option) {
        case 'sharing':
          this[option] = !this[option]
          break
      }
    },
    action(input) {
      let actions = { }
      switch(input) {
        case 'try signs':
          console.log(input)
          break
      }
    }
  }
}
</script>