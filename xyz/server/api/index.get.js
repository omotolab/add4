const config = useRuntimeConfig()
/* console.log('server config', config)
console.log('config.app', config.app)
console.log('config.public', config.public.pwaManifest)
console.log('config.public', config.public.pwaManifest.icons)
console.log('config.public', config.public.pwaManifest.theme_color)
console.log('config.public', config.public.pwaManifest.background_color)
console.log('start', config.public.pwaManifest.start_url)
console.log('config.content', config.public.content)
console.log('tags', config.public.content.tags)
console.log('base', config.public.content.base)
console.log('navi', config.public.content.navigation) */
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