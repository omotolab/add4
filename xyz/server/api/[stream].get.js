export default defineEventHandler(async () => {
    const { public: { URL, KEY }} = useRuntimeConfig()
    const requestPath = URL + '/rest/v1/signals?select=*'
    const requestOptions = {
        headers: {
            "apiKey": KEY,
            "Authorization": `Bearer ${KEY}`
        }
    }
    const gestures = await $fetch(requestPath, requestOptions)
    return gestures
})