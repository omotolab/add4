<script>
export default {
    async fetch() {
        this.content = await this.$content('pages/index', {
            text: true
        }).fetch()

        /* const { list } = await this.$axios.$post('api/channel/notion', {
            database_id: '6c03009afb9045548ec4f37fb2b9c070'
        }) */

        /* const items = list.results.map(result => ({
            name: result.properties['name'].title[0].plain_text,
            tags: result.properties['tags']
        })) */

        /* this.options = items.map(item => ({
            ...item,
            flow: this[item.name.toLowerCase()]
        })) */

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
            href: '/' +this.$route.params.scope + '/favicon.ico'
          }
        ]
      }
    },
    data() {
        return {
            paymentOptions: [
                {
                    name: 'get 10 more requests',
                    flow: this['get more requests']
                },
                {
                    name: 'or subscribe',
                    flow: this['pay per hour']
                }
            ],
            counter: 0,
            options: {
                'write for me': {
                    name: 'write for me',
                    flow: this['complete this sentence']
                },
                'write for me': {
                    name: 'write for me',
                    flow: this['complete this sentence']
                },
                'get more practice': {
                    name: 'buy more suggestions',
                    flow: this['get more practice']
                },
                'go pro': {
                    name: '♾️',
                    flow: this['go pro']
                }
            },
            responses: [],
            checkout: null,
            title: null,
            content: '',
            text: '',
            max: 5
        }
    },
    methods: {
        'complete this sentence': async function() {
            console.log(Date.now(), 'sentence')
            const { data } = await this.$axios.post('/api/channel/nlpcloud', {
                input: this.text,
                length: 1000,
                length_no_input: false,
                remove_input: true
            })

            this.counter++
            this.response = data
            this.text = data.generated_text
        },
        'get more practice': async function() {
            const { data: { id, checkout: { href }} } = await this.$axios.post('/api/channel/mollie')
            window.open(href, '_self', 'popup=yes');

        },
        'go pro': () => {
             alert('go pro')
        },
        'save to notion': async function() {
            const service = '/api/channel/notion/update'
            const database_id = 'edb56e031f924088941a4f3ad9ba8616'

            let properties = {
                name: {
                    title: [{"text": { "content": 'Draft @' + Date.now() } }]
                }
            }

            Object.entries(this.response).forEach((entry, entryIndex) => {
                const key = entry[0]
                const value = entry[1]

                // console.log(entry)
                // console.log(value)

                switch (typeof value) {
                    case 'string':
                        properties[key] = {
                            rich_text: [
                                {
                                    text: {
                                        content: value
                                    }
                                }
                            ]
                        }
                        break;
                    case 'number':
                        properties[key] = {
                            number: value
                        }
                    default:
                        break;
                }
            })

            const body = {
                parent: {
                    database_id
                },
                properties
            }

            // console.log(body)
            
            const { data } = await this.$axios.post( service , body )
            // console.log('data', data)
        }
    },
    computed: {
        isLive() {
            const param = this.$route.params.scope
            const parts = param.split('@')

            const isLive = parts.length === 2 && parts[0].length === 0

            if(!isLive) return

            return {
                isLive,
                id: parts[1]
            }
        }
    },
    watch: {
        content(nContent) {
            // this.text = nContent.text
        }
    },
    
    mounted() {
        // this.text = this.content.text
    }
}
</script>
<template lang="pug">
    .uk-card.uk-card-small
        .uk-card-header.uk-text-center 
            ul.uk-list
                li 
                    span {{ $route.params.scope }}
        .uk-card-body.uk-width-large.uk-margin-auto.uk-padding-remove-bottom
            // mini-author(:text="content.text" @change="i =>  content = i")
            // nuxt-content(ref="content" :document="content")
            // tm-mini-dialogue(:aid="isLive.id")
            form
                textarea(v-model="text").nuxt-content-editor.uk-width-large.uk-height-medium.uk-textarea.uk-border-rounded
        .uk-card-footer.uk-width-large.uk-margin-auto
            template(v-if="counter === max")
                div.uk-list.uk-list-small.uk-flex.uk-flex-center.uk-grid.uk-grid-small
                    
                    div.uk-margin-remove.uk-width-expand
                        div(@click="options['get more practice'].flow").uk-button.uk-button-default.uk-button-large.uk-border-rounded.uk-margin-small.uk-width-1-1
                            template(v-if="options['get more practice'].icon")
                                span(:uk-icon="options['get more practice'].icon")
                            template(v-if="options['get more practice'].name")
                                span.uk-margin-small-left
                                    span.uk-text-capitalize {{ `${options['get more practice'].name.split(' ')[0]} ` }}
                                    span.uk-text-lowercase {{ options['get more practice'].name.split(' ').splice(1).join(' ') + '.'}}
                    div.uk-margin-remove.uk-width-auto
                        div(@click="options['go pro'].flow").uk-button.uk-button-primary.uk-button-large.uk-border-rounded.uk-margin-small.uk-width-1-1.uk-light
                            template(v-if="options['go pro'].icon")
                                span(:uk-icon="options['go pro'].icon")
                            template(v-if="options['go pro'].name")
                                span.uk-margin-small-left
                                    span.uk-text-capitalize {{ `${options['go pro'].name.split(' ')[0]} ` }}
                                    span.uk-text-lowercase {{ options['go pro'].name.split(' ').splice(1).join(' ') + '.'}}
            template(v-else)
                div.uk-list.uk-list-small.uk-flex.uk-flex-center.uk-grid.uk-grid-small
                    div.uk-margin-remove.uk-width-expand
                        .uk-inline.uk-width-1-1.uk-margin-remove
                            div(@click="options['write for me'].flow").uk-position-top.uk-button.uk-button-default.uk-button-large.uk-border-rounded
                                template(v-if="options['write for me'].icon")
                                    span(:uk-icon="options['write for me'].icon")
                                template(v-if="options['write for me'].name")
                                    span.uk-text-capitalize {{ options['write for me'].name.split(' ')[0] + ' ' }}
                                    span.uk-text-lowercase {{ options['write for me'].name.split(' ').splice(1).join(' ') + '.'}}
                            progress(class="uk-progress" style="content: 'hello'" :value="counter" :max="max" min="0").uk-margin-remove.uk-border-rounded
                    div.uk-margin-remove.uk-width-auto
                        .uk-button.uk-button-default.uk-button-large.uk-border-rounded.uk-margin-small.uk-card.uk-card-hover
                            span(uk-icon="check")
            template(v-else)
                    ul.uk-list.uk-list-small
                        li(v-for="item in paymentOptions").uk-flex.uk-flex-center
                            div(@click="item.flow").uk-button.uk-button-default.uk-button-large.uk-border-rounded.uk-margin-small.uk-width-medium
                                template(v-if="item.icon")
                                    span(:uk-icon="item.icon")
                                template(v-if="item.name")
                                    span.uk-text-capitalize {{ item.name.split(' ')[0] + ' ' }}
                                    span.uk-text-lowercase {{ item.name.split(' ').splice(1).join(' ') + '.'}}

</template>
<style>
.insert-image-container {
    margin-left: -15px;
}

.insert-image-menu {
    margin-left: 15px;
}

.uk-progress {
    height: 55px
}
</style>