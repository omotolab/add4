<template lang="pug">
    .uk-card.uk-card-body.uk-card-small.uk-width-large
        form(@submit.prevent="handleStatementSubmission")
            label(for="statement").uk-margin-bottom.uk-text-small
                template(v-if="response.message") {{ response.message }}
                template(v-else) Statement:
            
            textarea-growable(
                id="statement" 
                name="statement" 
                v-model="statement" 
                @input="handleStatementChange"
                placeholder="Make a statement"
                :classes="!response.disabled ? 'uk-form-success' : ''" ) 
            // .uk-textarea.uk-placeholder.uk-padding-small.uk-margin-small
            
            div.uk-flex.uk-flex-right.uk-margin-top
                input(type="submit" value="Get Logic" :disabled="response.disabled").uk-button.uk-button-small.uk-button-primary

                    
        // div
            div(v-show="tags.length > 0").uk-margin-small-top
                .uk-placeholder {{ tags }}
                
            div(v-show="result").uk-margin-small-top
                .uk-placeholder {{ result }}
            div.uk-flex.uk-flex-right.uk-margin-small-top
                input(type="submit" value="Get Logic").uk-button.uk-button-default

        // div(contenteditable).uk-form-blank.uk-form-large {{ entry }}
        // ul.uk-list
            li(v-for="question in questions") {{ question }}

</template>
<script>

const getParsedDocument =  function(entry) {
    // 0. Load required library/module
    const nlp = require('compromise').default

    // 1. Load entry into compromise to parse it
    const doc = nlp(entry)

    // 2. Return parsed document
    return doc
};

const getQuestions = function(entry) {

    // 0. Load required library/module
    const nlp = require('compromise').default
    nlp.extend(require('compromise-sentences').default)

    // 1. Load entry into compromise to parse it
    const doc = nlp(entry)
    const questions = doc.sentences().isQuestion()

    // 2. Return parsed document
    return questions.list

}

const getSentences = function(entry) {

    // 0. Load required library/module
    const nlp = require('compromise').default
    nlp.extend(require('compromise-sentences').default)

    // 1. Load entry into compromise to parse it
    const doc = nlp(entry)
    const sentences = doc.sentences()

    // 2. Return parsed document
    return sentences.list

}

const makeProposition = function(entry) {
    const doc = getParsedDocument(entry)
    // const questions = getQuestions(this.entry)
    // console.log("questions", questions)

    const clauses = doc.clauses().out('array')
    console.log('clauses', clauses)

    clauses.forEach(clause => {
        const doc = getParsedDocument(clause)
        const verb = doc.verbs().json()
        const noun = doc.nouns().json()
        // const topic = doc.topics()

        const statement = [verb, noun]

        console.log(statement)
    })
}


const checkStatement = function(entry) {
    // 1. Get parsed document from this.entry
    const sentences = getSentences(entry)
    const questions = getQuestions(entry)

    // 2. Set disabled to "true" if the length of the document is more than 1
    if( entry.trim().length === 0 ) {
        return {
            disabled: true,
            message: ''
        }
    } else if( sentences.length > 1 ) {
        return {
            disabled: true,
            message: 'Please formulate your question in one sentence.'
        }
    } else if ( questions.length === 0 ) {
        return {
            disabled: true,
            message: 'Please write a question.'
        }

    } else {
        return {
            disabled: false,
            message: 'Statement:'
        }
    }
}

export default {
    layout: 'props',
    data() {
        return {
            statement: "",
            message: null,
            tags: [],
            disabled: true,
            result: null,
            questions: [
                'how does electricity get to my house?',
                'Where should I complain about the non-availability of electricity in my village so that my village can get electricity for 24 hours?'
            ]
        }
    },
    methods: {
        handleStatementChange(event) {
            // updateReplicatedValue(event)
        },
        handleStatementSubmission() {
            console.log(this.statement)
        },
    },
    computed: {
        response() {
            return checkStatement(this.statement)
        }
    }
}
</script>
