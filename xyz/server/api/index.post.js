
const config = useRuntimeConfig()
// console.log('server config', config)
export default defineEventHandler(async (event) => {
    const api = 'http://127.0.0.1:1880/api'
    const body = await readBody(event)

    if(!body.type) {
        return {
            error: {
                message: 'No Body type detected.'
            }
        }
    }

    const request = `${api}`
    const options = {
        method: 'post',
        headers: {
            "Authorization": config.key
        },
        body
    }
    const { data, error } = await $fetch(request, options)

   
    if(error) {
        console.log('error', error)
        return error
    } else {
        // await useStorage().setItem('storage', data)
        // const stored = await useStorage().getItem('storage')

        console.log('data', data)
        return data
    }
    
})