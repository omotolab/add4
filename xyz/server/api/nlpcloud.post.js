import NLPCloudClient from 'nlpcloud'

export default defineEventHandler(async (event) => {
    const started = Date.now()
    const { questions, input, length } = await useBody(event)

    if(questions) {
        const model = new NLPCloudClient('fast-gpt-j' , process.env.NLPCLOUD_KEY, true)
        const answers = await Promise.all(questions.map(async q => {
            const { data } = await model.question(q)
            return { started, ...data, finished: Date.now() }
        }))

        console.log( answers )

        return { started, answers, finished: Date.now() }
        
    } else {
        const model = new NLPCloudClient('fast-gpt-j' , process.env.NLPCLOUD_KEY_ONE, true)
        const { data } = await model.generation(input, 1, 20, true)
        return { started, ...data, finished: Date.now() }
    }


    /* const { data } = await tm.generation(
        input, 
        10, 
        length,
        true,
        '...',
        true,
        true,
        false,
        1,
        false,
        0,
        1,
        0.7,
        1,
        0.5,
        1,
        1.0,
        1.0
    ) */

    
    return { started, ...data, finished: Date.now() }
})