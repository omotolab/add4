export default defineEventHandler(async (event) => {
    const started = Date.now()

    const { questions, description, input } = await useBody(event)

    const requestPath = 'https://api.pipeline.ai/v2/runs'
    const requestImages = ({ description }) => {
      console.log('dec', description)
      return {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + process.env.MYSTIC_KEY,
              'Cache-Control': 'no-cache'
          },
          body: {
              pipeline_id: "pipeline_bb0aa1ded400417cb0b30a9ef4403ebf",
              data: [
                      [description],
                      {
                          num_images: 4,
                          seed: -1,
                          diversity: 3
                      }
              ]
          }
      }
    }

    const requestOptions = ({ text }) => ({
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + process.env.MYSTIC_KEY,
            'Cache-Control': 'no-cache'
        },
        body: {
            pipeline_id: "pipeline_6908d8fb68974c288c69ef45454c8475",
            data: [
                text,
                {
                    "response_length": 128,
                    "include_input": false,
                    "temperature": 0.4,
                    "top_k": 50,
                    "max_time": 10,
                    "num_return_sequences": 1,
                    "bad_words": [['time'], ['kill myself'], ['i'], ['children', 'kid', 'kids', 'little', 'prince', 'princess', 'fairies', 'gay', 'gays']]
                }
            ]
        }
    })

    if(description) {
      // requestOptions({ text: input })
        console.log(description)
        const response = await $fetch(requestPath, requestImages({ description }))
        
        return response
    }

    if(questions) {
        const answers = await Promise.allSettled(questions.map(async ({ text }) => {
            console.log(text)
            const { id, created_at, started_at, ended_at, run_state, compute_time_ms, result_preview } = await $fetch(requestPath, requestOptions({ text }))
            return {
                created_at,
                started_at,
                ended_at,
                compute_time_ms,
                run_state,
                generated_text: result_preview
            }
        }))

        console.log( answers )

        return { started, answers, finished: Date.now() }
    }

    else {
      const {
        id, created_at,
        started_at, ended_at,
        run_state, compute_time_ms } = await $fetch(requestPath, requestOptions({ text: input })
      )

      return {
          created_at,
          started_at,
          ended_at,
          compute_time_ms,
          run_state,
          generated_text: result_preview
      }
    }

})
