export default defineEventHandler(async (event) => {
    const { public: { API, KEY } } = useRuntimeConfig()
    const params = getRouterParams(event)
    const { path } = getQuery(event)
    const body = readBody(event)

    const requestPath = `https://` + API + '.supabase.co'
    const requestOptions = {
        headers: {
            "apiKey": KEY,
            "Authorization": `Bearer ${KEY}`
        }
    }
    
    if (!path) {
        const requestPath = `https://` + API + '.supabase.co'
        const requestOptions = {
            headers: {
                "apiKey": KEY,
                "Authorization": `Bearer ${KEY}`
            }
        }
        const endpoint = '/rest/v1/signals?select=*'
        const results = await $fetch(requestPath + endpoint, requestOptions)
        return results
    } else {
        const endpoint = '/storage/v1/object/public/' + path
        const results = await $fetch(requestPath + endpoint, requestOptions)
        // console.log('r', results)
        return results
    }

})