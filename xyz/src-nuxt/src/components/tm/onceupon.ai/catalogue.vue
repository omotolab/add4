<script>
export default {
  props: {
    cover: {
      type: Object,
      default: () => ({
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
      })
    }
  },
  data() {
    return {
      articles: [
        {
          title:'AI to the rescue',
          author:'Jane Doe',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quiit esnulla pariatur. Excepteurmollit anim id est laborum.',
          date: '2020',
          image: 'https://via.placeholder.com/450x275'
        },
        {
          title:"writer's blocks, sleeping bags and AI",
          author:'Gwen Doe',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. roident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: '2020',
          image: 'https://via.placeholder.com/450x275'
        },
        {
          title:"Column writing: a guide",
          author:'Jane Doe',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ercitationent, sunt in culpa quiit anim id est laborum.',
          date: '2020',
          image: 'https://via.placeholder.com/450x275'
        },
        {
          title:'AI to the rescue',
          author:'Jane Doe',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quiit esnulla pariatur. Excepteurmollit anim id est laborum.',
          date: '2020',
          image: 'https://via.placeholder.com/450x275'
        },
        {
          title:"writer's blocks, sleeping bags and AI",
          author:'Gwen Doe',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. roident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          date: '2020',
          image: 'https://via.placeholder.com/450x275'
        },
        {
          title:"Column writing: a guide",
          author:'Jane Doe',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ercitationent, sunt in culpa quiit anim id est laborum.',
          date: '2020',
          image: 'https://via.placeholder.com/450x275'
        }
      ],
      benefits:[
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
      ],
      plans: [
        {
          title:'Daily.',
          price:'€5 a day.',
          description: '- 15 suggestions per minute\n- Flexible plan\n- Ideal for undetermined working hours',
          button: 'Buy one day'
        },
        {
          title:'Unlimited.',
          price:'€25 a month.',
          description: '- No limitations\n- Work on your story, always, everywhere',
          button: 'Get miniPro'
        }
      ]
    }
  }
}
</script>

<template lang='pug'>
div
  section.uk-section.uk-section-small
    cover(
      :title="page.title" 
      :description="page.description"
      :action="page.action" )
      .uk-container
        section(v-for="({ title, items }, i) in page.items").uk-section
          .uk-container
            .uk-width-xlarge.uk-margin-auto
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
  section.uk-section-small
    .uk-container
      h3.uk-h3 Features
      article(class='uk-child-width-1-2@s' uk-grid='' uk-height-match="target: > div > .uk-card")
        div(v-for="feature in features")
          .uk-card.uk-card-default.uk-card-small
            .uk-card-media-top
              img(:src='feature.image').uk-width-expand.uk-border-rounded
            .uk-card-body
              h3.uk-h4.uk-card-title {{feature.title}}
              p {{feature.description}}
  section
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
  section(v-if="plans")
      section.uk-section-small
        .uk-container.uk-text-center
          h2.uk-h2 Plans for every situation
      section.uk-section-small
        .uk-container
          div(class="uk-child-width-1-2 uk-margin" uk-grid uk-height-match="target: > div > .uk-card")
            div(v-for="plan in plans")
              .uk-card.uk-card-large.uk-card-default.uk-border-rounded
                .uk-card-header
                  h3.uk-card-title.uk-h3.uk-margin-remove-bottom {{plan.title}}
                  h4.uk-h4.uk-margin-remove-top {{plan.price}}
                .uk-card-body.uk-margin-large-bottom
                  p {{plan.description}}
                .uk-card-footer
                  .uk-button.uk-border-pill.uk-align-center {{plan.button}}
  section(v-if="articles")
      section.uk-section-small
        .uk-container
          h2.uk-h2 Articles
      section.uk-section-small
        .uk-container
          article(class='' uk-grid='')
            div(v-for="article in articles")
              div(class="uk-card uk-card-small uk-grid-collapse uk-margin" uk-grid uk-height-match)
                div(class='uk-width-1-3@s').uk-card-media-left.uk-flex.uk-flex-middle
                  img(:src='article.image').uk-border-rounded
                div(class='uk-width-expand')
                  .uk-card-body
                    h3.uk-h3.uk-card-title {{article.title}}
                    p(class='uk-visible@s') {{article.excerpt}}
                    h5.uk-h5 By {{article.author}}, {{article.date}}
                
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
