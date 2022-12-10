export async function useBase({ body, path, key }) {
    const { public: { API, KEY } } = useRuntimeConfig()
    const requestPath = `https://` + API + '.supabase.co' + path
    const requestOptions = {
        method: 'post',
        headers: {
            "apiKey": KEY,
            "Authorization": !key ? `Bearer ${KEY}` : `Bearer ${key}`
        },
        body
    }
    const { data, error } = await useFetch(requestPath, requestOptions)

    // console.log('e', error.value.data)

    if(error.value) {
        return error.value.data
    }

    if(error.message) {
        return error.message
    }

    if(!error.value && !error.message) {
        // auth.email = body.email
        return { data }
    }
}
