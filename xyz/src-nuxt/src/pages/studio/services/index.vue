<script>
export default {
  data() {
    return {
      title: 'How it works',
      subtitle: 'the subtitle',
      description:'Mini.ai uses notion. Start writing and ask mini for help whenever you need suggestions for sentences or paragraphs. Add the suggestions to your text, edit and continue your flow. Mini.ai is your own ghost writer at hand.',
      action:'Try it out!',
      items: [
        {
          title: 'Features',
          items: [
            {
              title:'Realtime prompts',
              description:'Mini.ai will generate real-time prompts for sentences and paragraphs, while you are writing.',
              image:'https://via.placeholder.com/450x250'
            },
            {
              title:'Add and edit',
              description:'Select the suggestions you like, add them to your document and see your story unfold.',
              image:'https://via.placeholder.com/450x250'
            }
          ]
        },
        {
          title: 'Benefits',
          items: [
            {
              title:'Stay in a flow',
              description:'Never leave your document screen, no additional buttons or distractions. Mini.ai helps you stay focussed and in the flow.',
              image:'https://via.placeholder.com/280x225'
            },
            {
              title:'No more writers block',
              description:'Improve your writing by having a sparring partner that generates real-time suggestions for additional lines.',
              image:'https://via.placeholder.com/280x225'
            },
            {
              title:'Continues writing',
              description:'Continue writing from anywhere on your laptop or phone.',
              image:'https://via.placeholder.com/280x225'
            }
          ]
        }
      ],
    }
  },
  head() {
      return {
        title: this.title,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: this.description
          }
        ],
        link:[
          {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/' +this.$route.params.account + '/favicon.ico'
          }
        ]
      }
    }
}
</script>

<template lang='pug'>
div
  section.uk-section.uk-section-small
    .uk-container-small.uk-margin-auto
      article.uk-width-xlarge
        h2.uk-h2 {{title}}
        p {{description}}
        .uk-button.uk-button-default {{action}}
    // cover
  section(v-for="({ title, items }, i) in items").uk-section
    .uk-container-small.uk-margin-auto
      h3.uk-h3 {{ title }}
      article(v-show="title === 'Features'" class='uk-child-width-1-2@m' uk-grid='')
          div(v-for="item in items")
            .uk-card.uk-card-default.uk-card-small
              .uk-card-media-top
                img(:src='item.image').uk-width-expand.uk-border-rounded
              .uk-card-body
                h3.uk-h5.uk-card-title {{item.title}}
                p {{item.description}}  
      article(v-show="title === 'Benefits'" class='uk-child-width-1-2@s uk-child-width-1-3@m' uk-grid='') 
        div(v-for="item in items")
          .uk-card.uk-card-default.uk-card-small
            .uk-card-media-top.uk-cover-container
              img(:src='item.image').uk-width-expand.uk-border-rounded
            .uk-card-body
              h3.uk-h4.uk-card-title {{item.title}}
              p {{item.description}} 
  // section
    h3.uk-h3 Benefits
    article(class='uk-child-width-1-3@m' uk-grid='')
      div(v-for="benefit in benefits")
        .uk-card.uk-card-default
          .uk-card-media-top.uk-cover-container
            img(:src='benefit.image' uk-img).uk-width-expand.uk-border-rounded
            .uk-overlay.uk-light.uk-position-bottom
              h3.uk-h3.uk-card-title {{benefit.title}}
          .uk-card-body
            p {{benefit.description}}
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
/* .uk-h2 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 3em;
} */

.uk-h2 {
  @apply font-semibold text-5xl text-black
}
.uk-h3 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
}

.uk-h4 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 2.2em;
}

p {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5em;
  color: black;
  line-height: 1.4;
  @apply text-lg text-black
}

.uk-button {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 0.8em;
  color: black;
  background-color: lightgrey;
}

</style>
