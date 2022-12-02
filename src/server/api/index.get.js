const config = useRuntimeConfig()
console.log('server config', config)
export default defineEventHandler(async (event) => {
    const api = 'http://127.0.0.1:1880/api'
    const query = useQuery(event)

    if(!query.type) {
        return {
            error: {
                message: 'No Query Type'
            }
        }
    }

    const queryString = new URLSearchParams(query).toString()
    const request = `${api}?${queryString}`
    const options = {
        headers: {
            "Authorization": config.key
        }
    }
    const { data, error } = await $fetch(request, options)

    if(error) {
        return error
    } else {
        return data
    }
})