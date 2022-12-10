const time = Date.now()
export default defineEventHandler((event) => {
    console.log((Date.now() - time), event.req.url)
})