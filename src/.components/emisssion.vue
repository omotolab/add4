<template lang="pug">
    .uk-container.uk-width-1-1
      article(v-on:click="emitData" ).uk-article.uk-placeholder
        header
          h1.uk-article-title {{ user.name }}

        .tm-background-neutral
          .uk-margin-left.uk-margin-right.uk-margin-top
            .uk-card.uk-card-default
              .uk-card-body
                input(v-on:keyup="emitData")
                hr
                template(v-if="event.signal !== ''") {{ event.signal.target.innerText }} {{ event.signal.target.type }} {{ event.signal.type }} on {{ point.layer }} in layer space and {{ point.timeStamp}} in local time.
            .uk-card-footer.uk-padding-remove.uk-button-group.uk-width-1-1
              button.uk-button.uk-width-1-3(type="button" v-on:click="emitEvent") Event
              button.uk-button.uk-width-1-3(type="button" v-on:click="emitData") Data
              button.uk-button.uk-width-1-3(type="button" v-on:click="emitEvent") Notice

          .uk-card
            .uk-margin
              .uk-card-header.tm-scroll-marker-start Header
              .uk-card-body.uk-background-default.uk-height-medium.tm-scroll-marker
                ul.uk-list
                  li(v-for="emission in stream.emissions") {{ emission }}
              .uk-card-footer
                template(v-if="event.signal !== ''") {{ event.signal.target.innerText }} {{ event.signal.target.type }} {{ event.signal.type }} on {{ point.layer }} in layer space and {{ point.timeStamp}} in local time.

</template>
<style>
.tm-background-neutral {
  background-color: #e5e5e5
}
.tm-scroll-marker-start {
  margin-right:10px;
}
.tm-scroll-marker {
  overflow-y: scroll;
  margin-left: 10px;
}
</style>


<script>
// import UIkit from 'uikit'
// UIkit.notification('hello')
const R = require('rambda')

export default {
  layout: 'abrie',
  data() {
    return {
      point: '',
      event: {
        definition: '',
        signal: ''
      },
      stream: {
        emissions: []
      },
      user: {
        name: 'Omotola'
      }
      // notice: ''
    }
  },
  methods: {
    emitData(e) {
      let point = {
        client: [
          e.clientX,
          e.clientY
        ],
        screen: [
          e.screenX,
          e.screenY
        ],
        page: [
          e.pageX,
          e.pageY
        ],
        layer: [
          e.layerX,
          e.layerY
        ],
        offset: [
          e.offsetX,
          e.offsetY
        ],
        timeStamp: e.timeStamp,
        target: e.target.innerText,
        key: e.key
      }
      console.log(point, e)
      this.point = point
      this.stream.emissions = R.prepend(this.point, this.stream.emissions)
    },
    emitEvent(e) {
      let signal = {
        time: e.timeStamp,
        type: e.type,
        target: e.target,
        shifted: e.shiftKey,
        altered: e.altKey,
        e
      }

      // this.event.signature = R.values(signal)
      this.event.signal = signal
      this.event.definition = R.keys(signal)

      let channel = this.stream.emissions
      // console.log('Channel:', channel)

      let vector = R.prepend(this.event, channel)
      // console.log('Emissions:', vector)

      this.stream.emissions = vector
      console.log(this.stream, e)
    }
  }
}
</script>
