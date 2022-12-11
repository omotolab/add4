<template lang='pug'>
article(class='uk-child-width-1-2@m' uk-grid uk-height-match="target: > div > .uk-card")
  div(v-for="article in articles")
    div(class="uk-card uk-card-default uk-card-small uk-margin")
      div(class='uk-width-expand').uk-card-body.uk-text-center
        .uk-card-title
          h3.uk-h4 {{article.title}}
            h5.uk-h5 By {{article.author}}, {{article.date}}
        p(class='uk-visible@s') {{article.excerpt}}
</template>

<script>
export default {
  data() {
    return {
      title: '',
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
        }
      ]
    }
  }
}
</script>
