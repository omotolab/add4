<template lang="pug">
div.uk-flex.uk-flex-center
    .uk-container
        .uk-flex.uk-flex-between
            // ul.uk-breadcrumb.uk-text-meta.uk-margin-top.uk-margin-small-left
                li(v-for="part in $route.name.split('-')")
                    template(v-if="part === 'document'")
                        n-link(v-if="answers.title" to="") {{  answers.title.toLowerCase().split(' ').join('-')  }}
                        n-link(v-else to="") {{  $route.params[part] }}
                        n-link(v-else to="") {{  hash }}
                    template(v-else)
                        n-link(to="") {{ $route.params[part] }}
            ul.uk-iconnav.uk-margin-top
                
                // li
                    a( :uk-icon="editable ? 'check' : 'pencil'" @click="editable = !editable")
                li(v-if="keys.length > 0")
                    button( @click="checkAnswers").uk-button.uk-button-default.uk-icon.uk-flex.uk-flex-middle
                        span( :uk-icon="editable ? 'check' : 'cloud-upload'" )
                        span.uk-margin-small-left.uk-text-capitalize update
                // li
                    a( :uk-icon="assistance ? 'play' : 'play-circle'" @click="assistance = !assistance") 
                // li
                    a( :uk-icon="viewable ? 'info' : 'question'" @click="viewable = !viewable")
        template(v-show="hash")
            to-display(:node="hash")
            // hr.uk-margin-remove-top 
            // .uk-grid.uk-grid-small.uk-child-width-1-2
                .uk-panel(v-if="viewable")
                    to-card-form(
                        :class="'uk-card-body uk-card-small uk-card-default'"
                        :answers="answers"
                        :questions="questions"
                        :callback="handleAnswer"
                        :assistance="assistance" )
                .uk-panel
                    .uk-placeholder.uk-padding-small
                        to-card-display(:content="answers" :order="keys")
            // hr
            
            // to-checkable-list(v-if="tags.length > 0" :items="tags")
            // hr(v-if="tags.length > 0").uk-divider-small
            // to-checkable-item(text="add new text" :disabled="false")
        

</template>
<style scoped>
.uk-card-small .uk-card-body, .uk-card-small.uk-card-body {
    padding: 10px 10px;
}

.uk-button.uk-icon {
    margin-top: -10px
}

.tm-list-padding {
    padding: 8px
}

.uk-breadcrumb>:nth-child(n+2):not(.uk-first-column)::before {
    content: "/";
    display: inline-block;
    margin: 0 10px 0 calc(12px - 4px);
    font-size: .875rem;
    color: #999;
}
</style>
<script>
const mini = {
    traces: [
                {
                    question: 'What are you grateful for?',
                    // starter: 'Today, I am greatful for',
                    type: 'text'
                },
                {
                    question: 'Why?',
                    // starter: 'I am greatful because',
                    type: 'text',
                },
                {
                    question: 'Tell the story.',
                    // starter: 'Once, ',
                    type: 'text',
                    lines: 6
                }
    ],
    works: {
        title: {
            type: 'text',
            label: 'title',
            question: "What is the title of this list?",
            default: ''
        },
        description: {
            type: 'text',
            label: 'description',
            question: "What is the description of this list?",
            default: ''
        },
        items: {
            type: 'list',
            label: 'items',
            question: "What items do you want to include in this list?",
            default: []
        }
    }
}
export default {

    data() {
        return {

            active: 0,
            questions: mini.works,
            editable: false,
            assistance: false,
            viewable: true,
            answers: {},
            keys: [],
            newTags: []
        }
    },

    async asyncData ({ $content }) {
        const pages = await $content('').without(['body']).fetch()

        return {
            pages
        }
    },



    methods: {

        handleItemSelection() {
            console.log('selected')
        },
        handleAnswer(key, value) {
            // console.log(key, value)
            // this.answers.push(i)
            const attribute = {[key]: value}
            this.answers = {
                ...this.answers,
                ...attribute,
            }

            this.keys = Object.keys(this.answers)
            

            if ( this.active >= this.questions.length ) {
                console.log('there are no more questions')
            } else {
                this.active++
            }
        },
        findNouns(list) {
            const nlp = require('compromise').default
            const doc = nlp(list)
            return doc.nouns().json()
        },
        createTag() {
            this.newTags.push({
                text: '',
            })
        },
        checkAnswers() {

            let filter = []

            Object.keys(this.$route.params).forEach(key => {
                if(key !== 'content') {
                    filter.push(this.$route.params[key])
                } 
            })
            
            const slug = this.answers.title.toLowerCase().split(' ').join('-')

            let submission = {
                name: slug,
                index: this.keys.join(':'),
            }

            console.log(submission)

            const collection = this.$route.params.collection
            this.$gun.get(collection).set({
                ...submission,
             },(e) => {
                 if(e.err) {
                    console.log(Date.now(), e)
                 } else {
                    const seed = e['$']['_']
                    const graph = seed.graph
                    const keys = Object.keys(graph)
                    const lastKey = keys[keys.length - 1]
                    console.log(this.hash, this.answers.items)
                    if(lastKey.split('/').length === 2) {
                        const _items =  this.$gun.get('items')
                        this.answers.items.map(item => {
                            _items.set({
                                caption: item.caption,
                                data: item.data
                            })
                        })
                    }
                    
                 }
                 
             })
            

            let items = {}
            // this.answers.items
            // this.$gun.get('item')

            /* if(Array.isArray(this.answers.items)) {
                this.answers.items.map(item => {
                    this.$gun.get('item').set(item)
                })
            } */


             

            
        }
    },

    computed: {
        hash() {
            const hash = this.$store.state.index[this.$route.path]
            if(typeof hash === 'string') {
                 console.log(hash)
            }
            return hash
        },  
        tags() {
            const statements = this.answers
            const tags = this.findNouns(statements).map(tag => tag.normal)
            return tags
        }
    },

    
}
</script>