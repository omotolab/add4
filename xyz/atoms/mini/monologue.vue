<script setup>
import nlp from 'compromise'
import getCaretCoordinates from 'textarea-caret';

const title = 'once upon...'
const key = ref(0)
const request = ref("Once upon...")
const response = ref("")
const responses = ref(["Once upon a time...", "...there was a little girl who lived in a big house in the middle of a big"])
const sessions = ref([])

const count = ref(10)
const memory = ref({})
const editable = ref(true)
const visible = ref(false)
const account = 'anonymous'
const wait = ref(false)
const cursor = ref({
    x: 0,
    y: 0,
})

async function saveResponse() {
    if(!response.value.trim().length > 0) return
    responses.value = [
        ...responses.value, {
        text: request.value,
        edit: Date.now()
    }]
    request.value = ''
}

async function addSubscription(name) {
    const requestPath = 'api/mollie'
    const requestOptions = {
        method: 'post',
        body: {
            plan: { name },
            redirectUrl: window.location.href
        }
    }
    const { data: { value: { payment: { _links: { checkout: { href }} } } } } = await useFetch(requestPath, requestOptions)
    // console.log( href )
    window.open(href, '_self', 'popup=yes');
}

function onInput (e, i) {
    const textarea = document.getElementById('textarea')


    const { width, height } = textarea.getBoundingClientRect()

    if(memory.value.length !== request.value.length) {
        const { top, left } = getCaretCoordinates(textarea, textarea.selectionEnd);

        console.log( 'new state', top, left, request.value.length, memory.value.length)
        memory.value = { top, left, length: request.value.length }

        cursor.value = {
            x: left / width * 100,
            y: top / height * 100
        }
    }

    setTimeout(() => {
        // textarea.style.height = "auto"
        // textarea.style.height = (textarea.scrollHeight + 2) + "px"

        // textarea.scrollTop(textarea[0].scrollHeight);

        const { top, left } = getCaretCoordinates(textarea, textarea.selectionEnd);
        cursor.value = {
            x: left / width * 100,
            y: top / height * 100
        }
        textarea.focus()


    }, 1)
}

function forceRerender() {
    const textarea = document.getElementById('textarea')
    const { top, left } = getCaretCoordinates(textarea, textarea.selectionEnd);

    console.log( 'change key', top, left, request.value.length, memory.value.length)

    key.value += 1;
}

async function requestSuggestions (service) {

    console.log('text', request.value)
    if(!request.value.trim().length > 0) return

    const requestPath = 'api/' + service
    const requestOptions = {
        method: 'post',
        body: {
            input: request.value,
            length: 50
        }
    }

    wait.value = true
    const { data: { value: { generated_text } } } = await useFetch(requestPath, requestOptions );
    wait.value = false

    if(!generated_text) return console.warn('no text')

    console.log(generated_text.toString())
    response.value = generated_text.toString()
    responses.value = [...responses.value, [request.value, response.value]]
    request.value = sample.value

    count.value--
    onInput()
    // console.log('suggestion', text.value)
};

async function requestAnswers (service) {
    if(!request.value.trim().length > 0) return
    const requestPath = 'api/' + service
    const requestOptions = {
        method: 'post',
        body: {
            questions: questions.value,
            input: request.value
        }
    }

    wait.value = true
    const { data: { value: { answers } } } = await useFetch(requestPath, requestOptions );
    wait.value = false

    console.log('answers', answers)
    request.value = request.value + "\r\n" + answers.map(a => a.generated_text[0]).join("\r\n")
    onInput()

    count.value--


    // console.log('suggestion', text.value)
};

const questions = computed(() => {
    const doc = nlp(request.value.trim())
    const questions = doc.sentences().isQuestion()
    return questions.json()
})

const sample = computed(() => {
    return request.value + response.value
})

const log = (e) => {
    console.log(Date.now(), JSON.stringify(e))
}


/* const marker = computed(() => {
    // console.log('s', getCaretCoordinates(textarea, textarea.selectionStart))
    // console.log('e', getCaretCoordinates(textarea, textarea.selectionEnd))
    return { x: 0, y: 0}
}); */

onMounted(() => {
    if(!editable.value) return
    onInput()
})

</script>
<template lang="pug">
article.uk-card.uk-card-small.uk-border-rounded.uk-padding-remove
    // .uk-margin
        h1 {{ title }}
    // .uk-margin.uk-margin-top
        ul(v-if="samples.length > 0" uk-grid="masonry: true" class="uk-child-width-1-1").uk-grid-small.uk-list.uk-border-rounded
            li(v-for="sample in samples")
                .uk-card-default.uk-card-body
                    p {{ sample.text }}
    .uk-border-rounded.uk-margin-top.uk-margin.uk-card.uk-card-default.uk-card-small
        article(v-if="!editable").uk-border-rounded
            h2(:contenteditable="false").uk-card-body.uk-margin-remove {{ title }}
            p#page(  :contenteditable="true" @input.prevent="(e) => log(e)").uk-card-body.uk-border-rounded.uk-text-light.uk-overflow-auto.uk-height-max-xlarge.uk-width-1-1 {{ sample }}
        .uk-inline.uk-width-1-1(v-else)
            textarea#textarea(v-model="request" @keyup="onInput" @keydown="onInput" @focus="onInput").uk-card-body.bg-gray-200.uk-card-body.uk-border-rounded.uk-text-light.uk-width-1-1.uk-height-medium.uk-textarea
            div(:style="`left: ${cursor.x}%; top: ${cursor.y}%`").uk-position-absolute
                // .uk-icon-button.uk-border-rounded.uk-button-default.uk-placeholder.uk-padding-remove.uk-margin-remove
                Transition(name="slide-right" mode="out-in")
                    ul(v-if="wait").uk-iconnav
                        li
                            a.uk-flex.uk-flex-middle
                                span(uk-icon="lifesaver" :class="request.length !== 0 ? 'uk-margin-small-left' : ''")
                                span.uk-text-meta brainstorming...

                    ul(v-else).uk-iconnav
                        li(v-if="options.questions")
                            a(href="#/request-suggestion" @click="requestAnswers('mystic')" ).uk-flex.uk-flex-middle
                                span(uk-icon="question" :class="request.length !== 0 ? 'uk-margin-small-left' : ''")
                        li
                            a(href="#/request-suggestion" @click="requestSuggestions('mystic')" ).uk-flex.uk-flex-middle
                                span(uk-icon="chevron-double-right" :class="request.length !== 0 ? 'uk-margin-small-left' : ''")
                                // span Hello
                        // li(v-if="options.commands")
                            a(href="#/request-suggestion" @click="requestSuggestions" ).uk-flex.uk-flex-middle
                                span(uk-icon="play-circle" :class="text.length !== 0 ? 'uk-margin-small-left' : ''")
                                // span Hello
                        // li(v-else)
                            a(href="#/request-suggestion" @click="requestSuggestions" ).uk-flex.uk-flex-middle
                                span(uk-icon="chevron-double-right" :class="text.length !== 0 ? 'uk-margin-small-left' : ''").animate-spin
                                // span Hello
        // ul.uk-list.uk-grid.uk-grid-small.uk-flex.uk-flex-middle.uk-flex-around.uk-flex-row-reverse(class="uk-child-width-1-1 uk-child-width-expand@s" uk-grid="masonry: true")
            // li.uk-margin-remove
                tm-button(:icon="plus-circle")
            li.uk-margin-remove
                // tm-button(:icon="plus-circle")
                tm-button(:onPress="startSample" :icon="`plus`" :notice="`Start a new thread`" ).uk-placeholder.uk-padding-remove.uk-button.uk-button-default.uk-button-large.uk-border-rounded.uk-width-1-1
                    div.uk-flex.uk-flex-middle
                        span.uk-icon-button.uk-border-rounded.uk-button-default
                            span(uk-icon="user")
                        span.uk-margin-small-left {{ "@" + account }}
            li.uk-margin-remove
                template(v-if="count < 1")
                    //tm-button(:to="'/plans?unlimited=true'" :text="'Get unlimited requests'" :notice="'€25 / month'").uk-placeholder.uk-padding-remove.uk-button.uk-button-default.uk-button-large.uk-border-rounded.uk-width-1-1
                    tm-button(:onPress="() => addSubscription('unlimited-day')" :text="'Get unlimited requests'" :notice="'€5 / day'").uk-padding-remove.uk-button.uk-button-secondary.uk-button-large.uk-border-rounded.uk-width-1-1
                template(v-else)
                    tm-button(:onPress="requestSuggestions" :wait="wait" :text="'Brainstorm'" :notice="count + ' more suggestions'").uk-padding-remove.uk-button.uk-button-primary.uk-button-large.uk-border-rounded.uk-width-1-1
                        span(uk-icon="more")

            li.uk-margin-remove
                tm-button(:onPress="startSample" :icon="`plus`" :notice="`Start a new thread`" ).uk-placeholder.uk-padding-remove.uk-button.uk-button-default.uk-button-large.uk-border-rounded.uk-width-1-1
                    div.uk-flex.uk-flex-middle
                        span.uk-icon-button.uk-border-rounded.uk-button-default
                            span(uk-icon="user")
                        span.uk-margin-small-left {{ "@" + account }}


            //.uk-button.uk-button-default.uk-border-rounded Get unlimited suggestions
    div
            // ul(v-if="suggestions.length > 0").uk-list.uk-card-default.uk-border-rounded
                li(v-for="suggestion in suggestions")
                    .uk-padding-small {{ suggestion }}
</template>
<style>
p {
    width: 100%;
    white-space: pre-wrap;

}</style>
<script>
export default {
 props: {
    page: {
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
            plans: {
/*                 'unlimited-year':{
                    name: "Storyteller Pass",
                    description: " €25 a month.",
                    notice: "Billed monthly",
                    features: [
                        'Work on your work, always, everywhere.',
                        'Unlimited Request.',
                        'Unlimited document size.',

                    ],
                    action: 'get unlimited access'
                },
                'unlimited-month':{
                    name: "Storyteller Pass",
                    description: " €20 a month.",
                    notice: "Billed yearly.",
                    features: [
                        'Work on your work, always, everywhere.',
                        'Unlimited requests.',
                        'Unlimited document size.',
                        'Sync with 2 devices'
                    ],
                    action: 'get unlimited access'
                }, */
                'daily':{
                    name: "Daily Pass",
                    description: " €5 a day.",
                    features: [
                        'Up to 2000 words',
                        'Up to 2 devices',
                        'Expires at' + Date.now()
                    ],
                    action: 'get a day pass'
                },
            }
        }
    },
    computed: {
        propositions() {
            console.log(this.request)
            const doc = nlp(this.request.trim())
            const obj = doc.json()
            const hints = obj.map( reading => {
                return {
                    request: reading.terms[reading.terms.length - 1].post.includes('...') || reading.terms[reading.terms.length - 1].normal.includes('...'),
                    command: reading.terms[0].normal.includes('>'),
                    question: reading.terms[reading.terms.length - 1].post.includes('?') || reading.terms[reading.terms.length - 1].text.includes('?'),
                    ...reading
                }
            })
            return hints
        },
        options() {
            const questions = this.propositions.filter( prop => prop.question).length > 0
            const commands = this.propositions.filter( prop => prop.command).length > 0
            const requests = this.propositions.filter( prop => prop.request).length > 0
            return {
                questions,
                commands,
                requests
            }

        }
    }
}
</script>
