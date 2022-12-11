<script setup>
const charge = reactive({
    used: 0,
    left: 0,
    bill: []
})

const plans = [
    {
        name: 'Curious',
        ram: '12 EUR',
        cpus: '1 MONTH',
        disk: '100 Requests',
    },
    {
        name: 'Confident',
        ram: '24 EUR',
        cpus: '3 MONTHS',
        disk: '300 Requests',
    }
]

const plan = ref({})

const text = ref('We all know why the chicken cross the road, but how exactly did it do it?')
const choices = ref([])

async function getSteps(prompt) {
    if (charge.left < 1) {
        return
    } else {
        const method = 'post'
        const body = {
            type: 'sources',
            prompt
        }
        console.log('charge', charge)

        const { data: { value }, error } = await useFetch('/api', { method, body })

        charge.used = charge.used + 1
        charge.left = charge.left - 1
        charge.bill.push(value.usage)
        choices.value = value.choices
    }


}

</script>
<template>
    <div class="uk-height-viewport uk-background-muted">
        <div uk-height-viewport="offset-top: true; offset-bottom: true">
            <div class="uk-container">

                <div
                    class="uk-card uk-border-rounded uk-card-body uk-height-medium uk-flex uk-flex-center uk-flex-column uk-text-center">
                    <div>
                        <div class="uk-text-meta ">logic.to:</div>
                    </div>

                    <div class="uk-margin">
                        <h1 class=" uk-text-large uk-text-bold">
                            Get an overview of the content in your sources with this logic.
                        </h1>
                    </div>

                    <div>
                        <div class="uk-text-center">Try your first search for free, then charge your account to edit
                            your sources or save your results.</div>
                    </div>
                </div>

                <div class="uk-card uk-card-body">
                    <!-- <editor class="" /> -->
                    <!-- <div class="uk-margin">Enter an example of something you want steps for, like: </div> -->
                    <FormKit type="textarea" v-model="text" :placeholder="'How did the chicken cross the road?'"
                        class="uk-card uk-card-default uk-border-rounded uk-card-body uk-height-small uk-width-medium" />
                </div>

                <div class="uk-card uk-card-body">
                    <div v-for="(choice, c) in choices" :key="c"> {{ choice.text }}</div>
                </div>


            </div>

        </div>
        <div class="uk-card-footer">
            <div class="uk-text-center">
                <div class="uk-card uk-card-footer">
                    <dialogue v-if="charge.left < 1">
                        <template v-slot:head>Charge your account!</template>
                        <template v-slot:body>
                            <!-- <div>
                                <options :options="plans" v-model="plan" />
                                <windi-button class="uk-flex uk-flex-right">
                                    Continue
                                </windi-button>
                            </div> -->
                            <div>
                                <FormKit type="form" id="registration" :form-class="submitted ? 'hide' : 'show'"
                                    submit-label="Register" @submit="submitHandler" :actions="false">
                                    <div>
                                        <div class="uk-margin">
                                            <FormKit v-model="profile.firstName" />
                                            <FormKit v-model="profile.lastName" />
                                        </div>
                                        <div class="uk-margin">
                                            <Formkit v-model="profile.email" />
                                        </div>
                                    </div>

                                    <windi-button class="uk-flex uk-flex-right">
                                        Create Account and Confirm Payment
                                    </windi-button>
                                </FormKit >
                            </div>

                        </template>
                    </dialogue>
                    <div v-else>
                        <button class="uk-button uk-button-large uk-button-default" @click="getSteps(text)"
                            :disabled="text.trim().length === 0 ? true : false">Find out how!</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>