<template lang="pug">
    .uk-card.uk-card-body.uk-card-small.uk-width-large
        form(@submit.prevent="handleStatementSubmission")
            label(for="statement").uk-margin-bottom.uk-text-small {{ response.message }}

            textarea-growable(
                id="statement" 
                name="statement" 
                :text="statement"
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
    return sentences

}

const getMeaningfulParts = function(sentence) {
    const doc = getParsedDocument(sentence)
    const words = doc.list[0].cache.terms
    const verbs = doc.verbs().list.map( verb => {
        const terms = verb.cache.terms
        if(terms.length === 1) {

            const thisWord = terms[0]
            const nextWord = words.find(word => word.id === thisWord.next );

            if(thisWord.tags['Modal']) {
                return [ thisWord.clean, nextWord.clean ].join(' ')
            }

            return thisWord.clean

        } 

        return terms.map( term => term.clean ).join(' ')

        
        }
    )
    const conju = doc.conjunctions()
    const subjects = doc.verbs().json().map( verb => {
        return verb.parts.subject
    })

    

    const preps = doc.prepositions().text()
    const clauses = doc.clauses().out('array')
    const statement = [ verbs, conju, clauses ]

    return statement
}

const makeProposition = function(entry) {
    
    const sentences = getSentences(entry)
    sentences.forEach(sentence => {
         // console.log(sentence.text())
         console.log(getMeaningfulParts(sentence.text()))
    })
   
    // const questions = getQuestions(this.entry)
    // console.log("questions", questions)

    // const clauses = doc.clauses().out('array')
    // console.log('clauses', clauses)
    // console.log(doc)

    /* clauses.forEach(clause => {
        const doc = getParsedDocument(clause)
        const subj = doc.sentences().subjects().text()
        const verb = doc.verbs().text()
        const prep = doc.prepositions().text()
        // const noun = doc.nouns().text()
        // const topic = doc.topics()

        const statement = [subj, verb, prep ]

        console.log(statement)
    }) */
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
            statement: "Jimmy got up at six-thirty today. He glanced hopefully at the clock on the dresser but knew that it would ring any moment. He knew he had to get out of bed.",
            message: null,
            tags: [],
            disabled: true,
            result: null,
            statements: [
                'The central idea is that, broadly speaking, any given application is made up of three types of code; they are: 1) feature code, 2) infrastructure code, and 3) reliability code.',
                'There are three types of codes which are​ TECHNICAL CODES,SYMBOLIC CODES,WRITTEN CODES.'
            ],
            questions: [
                'how does electricity get to my house?',
                'Where should I complain about the non-availability of electricity in my village so that my village can get electricity for 24 hours?'
            ],
            references: {
                '#ai' : [
                    'https://www.bbvaopenmind.com/en/technology/artificial-intelligence/the-true-father-of-artificial-intelligence/',
                    'https://www.govtech.com/computing/understanding-the-four-types-of-artificial-intelligence.html',
                    'https://www.wired.com/story/researcher-says-ai-not-artificial-intelligent/',
                    'https://www.vectoritcgroup.com/en/tech-magazine-en/artificial-intelligence-en/edge-ai-el-futuro-de-la-inteligencia-artificial/'
                ],
                '#nlp' : [
                    'https://www.sltinfo.com/how-to-identify-clauses/',
                    'http://resources.mpi-inf.mpg.de/d5/clausie/clausie-www13.pdf',
                    'https://www.researchgate.net/publication/334191303_Multilingual_Open_Information_Extraction_Challenges_and_Opportunities',
                    'https://www.let.rug.nl/vannoord/papers/bplank-vannoord-clin2010.pdf'
                ],
                '#logic' : [
                    'https://www.youtube.com/watch?v=pS1zAAD1nXI',
                    'https://www.youtube.com/watch?v=HUs1bH85X9I'
                ],
                '#edge' : [
                    'https://www.trentonsystems.com/blog/is-edge-computing-secure'
                ]
            }
        }
    },
    methods: {
        handleStatementChange(event) {
            // updateReplicatedValue(event)
            this.statement = event
        },
        handleStatementSubmission() {
            makeProposition(this.statement)
            // console.log(this.statement)
        },
    },
    computed: {
        response() {
            return checkStatement(this.statement)
        }
    }
}
</script>
