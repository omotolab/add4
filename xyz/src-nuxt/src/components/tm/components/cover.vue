<template lang="pug">
.uk-card.uk-card-small.uk-background-muted.uk-height-1-1
  .uk-card-header
    logo(:text="name").uk-text-meta
  .uk-card-media.uk-flex.uk-flex-center.uk-flex-middle
    .uk-section
        .uk-card-media.uk-card-small.uk-text-lowercase.uk-text-large
          .uk-card-body.uk-border-rounded.uk-card-default.uk-card-hover.uk-height-small.uk-width-small
          .uk-card-footer.uk-text-meta.uk-text-center(v-show="name") {{ name }}
        .uk-card-header.uk-text-center
          logo(:text="name")
  .uk-card-body(uk-height-viewport="offset-top: true; offset-bottom: true").uk-flex.uk-flex-center.uk-flex-middle.uk-flex-column
    .uk-width-auto
      div.uk-flex.uk-flex-column.uk-flex-middle
        .uk-card.uk-card-small.uk-text-lowercase.uk-text-large
          .uk-card-body.uk-border-rounded.uk-card-default.uk-card-hover.uk-height-small.uk-width-small
          .uk-card-footer.uk-text-meta.uk-text-center {{ name }}
        article.uk-text-center.uk-margin
          h1.uk-margin-large
            .uk-h2 {{ headline }} 
          p {{ description }}

      div
        ul.uk-list
          // li.uk-width-medium
            .uk-flex.uk-flex-between.uk-grid.uk-grid-small(uk-height-match)
              div.uk-width-expand
                .uk-flex.uk-flex-middle.uk-inline.uk-width-1-1
                  span.uk-form-icon
                    span.uk-text-large.uk-margin-small-left @
                  nuxt-link(:to="`@${login.username}`").uk-flex.uk-flex-middle.uk-form-icon.uk-form-icon-flip
                    span(:uk-icon="`icon:${live.$service ? `chevron-right` : `plus`}`")
                  input(placeholder="Your agent's scope id" v-model="login.username").uk-margin-remove.uk-input.uk-form-large.uk-border-rounded.uk-text-large
          // li.uk-width-medium
            button(@click="$auth.loginWith('notion', { data: login })").uk-button.uk-button-large.uk-button-default.uk-border-rounded.uk-width-1-1
              span.uk-text-capitalize Create 
              span.uk-text-lowercase with your own agent.
          li
            ul.uk-list.uk-list-small
              li(v-for="item in options")
                nuxt-link(:to="item.link").uk-button.uk-button-default.uk-button-large.uk-border-rounded.uk-margin-small.uk-width-1-1
                  template(v-if="item.icon")
                    span(:uk-icon="item.icon")
                  template(v-if="item.name")
                    span.uk-text-capitalize {{ item.name.split(' ')[0] + ' ' }}
                    span.uk-text-lowercase {{ item.name.split(' ').splice(1).join(' ') + '.'}}
                
          // li
            button(@click="$auth.loginWith('notion', { data: login })").uk-button.uk-button-large.uk-button-default.uk-border-rounded.uk-width-1-1
              span.uk-text-capitalize Create 
              span.uk-text-lowercase with your own agent.
    

          // li
            hr.uk-divider-icon
            li.uk-width-medium
              button(@click="$auth.loginWith('notion', { data: login })").uk-button.uk-button-large.uk-button-primary.uk-border-rounded.uk-width-1-1
                span.uk-text-capitalize Connect 
                span.uk-text-lowercase to an agent
                span.uk-text-capitalize .
          
        // ul.uk-list
          li
            input.uk-input.uk-form-large.uk-border-rounded
          li
            input(type="submit").uk-button.uk-button-large.uk-button-default.uk-border-rounded.uk-width-1-1
        
  .uk-card-footer.uk-flex.uk-flex-row-reverse.uk-flex-center.uk-text-meta
    logo(:text="name").uk-margin-bottom
</template>
<script>
import GraphDB from 'gun/gun'
import 'gun/sea';
export default {
    props: ['list', 'name', 'headline', 'description', 'options'],
    props: {
      name: {
        type: String,
        default: 'Your element name'
      },
      title: {
        type: String,
        default: 'Your element title'
      },
      description: {
        type: String,
        default: 'Your element description'
      },
      options: {
        types: String,
      }
    },
    data() {
      return {
        logoSrc: '/logo.svg',
        count: 0,
        events: [ "book", "article", "essay", "post", "blog", "script" ],
        hostnames: ['io.logic.to'],
        login: {
          username: 'signs',
          password: ''
        },
        submit: false,
        $scope: null
      }
    },
    mounted() {
      setInterval(() => {
        
        if(this.count === this.events.length - 1) {
          return this.count = 0
        }
        this.count = this.count + 1
        
      }, 3000);
    },
    computed: {
      /* live() {
        const { 
          login: {
            username, 
            password 
          },
          hostnames,
          registerScope,
          checkScope
        } = this
        const network = GraphDB(hostnames.map(hostname => `https://${hostname}/gun`))
        const scope = network.user(); 
        const opt = {}
        
        // const $scope = scope.create(username, password, checkScope, opt)
        const $scope = network.get(`~@${username.trim()}`).once(checkScope);
        const $service = $scope['_'].put
        
        return {
          state: true,
          $service
        }
      } */
    },
    methods: {
      registerScope( ack ) {
        if(!ack) return console.log("No acknowledgement from server.")

        const { err } = ack
        if(!err) return this.scopes[pub].lastLogin = Date.now()

        switch (err) {
          case 'User already created!':
            console.log('User already created!');
            this.login = {
              
            }
            break;
          case 'Password too short!':
 
          default:
            console.log(Date.now(), `${err}`);
            this.submit = false
        }

        const { pub } = ack
        console.log('pub', pub)

      },
      checkScope(data, key) {
        this.$scope = { ...data }
        console.log( this.$scope )
      }
    }
  }
</script>