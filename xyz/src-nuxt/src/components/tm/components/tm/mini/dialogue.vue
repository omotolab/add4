<template>
<div :id="aid"> 
    <bot-ui></bot-ui> 
</div>
</template>


<script>

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
    props: ['aid', 'service'],
    data() {
        return {
            intent: null,
            parameters: null,
            response: null,
            history: [],
            voiceOn: {
                system: false,
                human: true
            }
        }
    },
    methods: {
        async getTextReading( text ) {
            this.$axios.setToken('10c9eda0-dea2-11ec-8513-cf75b7fde594', 'Bearer')
            this.$axios.setHeader('Content-Type', 'application/json', [ 'post' ])

            await this.$axios.post('https://developer.voicemaker.in/voice/api', {
                "Engine": "neural",
                "VoiceId": "ai1-Amy",
                "LanguageCode": "en-GB",
                "AccentCode": "en-GB",
                "Text": text,
                "OutputFormat": "mp3",
                "SampleRate": "48000",
                "Effect": "default",
                "MasterSpeed": "0",
                "MasterVolume": "0",
                "MasterPitch": "0",
            }).then((response) => {

                this.voice = response.data
                const audio = new Audio(response.data.path)
                audio.play();

            })  
        },

        async takeStatement(input) {

            const value = input.trim()
            const { data } = await this.$axios.post('/api/chat', {
                input,
                history: this.history
            })

            return data
        },

        async systemToHuman(ai, messages) {
            const _this = this

            if(_this.voiceOn.system) {
                await this.getTextReading(content)
            }

            console.log(messages)

            return Promise.all(
                messages.map(async content => {
                    return await ai.message.add({
                        content
                    })
                })
            )
            
        },

        async humanToSystem(ai, content) {
            const _this = this

            if( _this.voiceOn.human ) {
                await this.getTextReading(content)
            }

            return await ai.message.add({
                human: true,
                content
            });

        },

        async promptToHuman(ai, { placeholder }) {
            const _this = this
            // wait till its shown
            return ai.action.text({ // show 'text' action
                action: {
                    placeholder
                }
            }).then(async (res) => {

                const { response, history, intent, messages, params } = await _this.takeStatement(res.value)
                _this.input = res.value
                _this.history = history
                _this.intent = intent
                _this.response = response
                _this.parameters = params.fields

                _this.systemToHuman(ai, messages).then(async () => _this.promptToHuman(ai, { placeholder } ))

            });

        },

        async systemToHumanFromAction(ai, { template }, res) {
            if(!template) return console.log('res', res)

            const statement = template.replace('#{res.value}', res.value)
            return await this.systemToHuman(ai, statement)
        },

        async systemToHumanWithAction(ai, {messages, placeholder, template}) {
            const _this = this

            return await _this.systemToHuman(ai, messages)
            .then(async () => _this.promptToHuman(ai, { placeholder } ))
            // .then(async (res) => _this.systemToHumanFromAction(ai, { template }, res))
        },

        greetingFlow(ai, messages) {

            const _this = this



            /* .then(() => _this.systemToHumanWithAction(ai, {
                content: "What is your name?",
                placeholder: 'Your name',
                template: `Hi #{res.value}!`
            }))

        
            .then(() => _this.systemToHumanWithAction(ai, {
                content: "Where are you from?",
                placeholder: 'Your country',
                template: `You are from #{res.value}!`
            })) */

        },

    },
    mounted() {
        const ai = BotUI(this.aid);
        // this.promptToHuman(ai, { placeholder: "Say something.." })

        this.systemToHumanWithAction(ai, {
            messages: [ "Hello", `My name is ${capitalizeFirstLetter(this.aid)}.`, `I was informed that you are looking for ${this.service}.`, "How can I help you?" ],
            placeholder: "Say something here."
        })
    }
}
</script>