import { encode, decode } from 'gpt-3-encoder'
export default defineEventHandler((event) => {

    /* console.log(event.req.method)
    console.log(event.req.context)
    console.log(event.req.headers)
    console.log(event.req.originalUrl)
    console.log(event.req.query) */

    const { value } = useQuery(event)

    if(!value) return 'no text'
    if(typeof value !== 'string') return 'not text'

    const tokens = encode(value)
    console.log(tokens.length)
    let index = {}
    for(let token of tokens){
        index[token] = decode([token])
    }

    return index
})