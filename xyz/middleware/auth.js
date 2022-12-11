import { useSupabase } from "~/composables/database"

export default defineNuxtRouteMiddleware(async (to) => {
    const { name, fullPath, hash, query: { key }, params: { channel } } =  to
    const { access_token } = Object.fromEntries((new URLSearchParams(hash.slice(1))));
    const user = await useSupabaseUser()

    console.log('name', name)
    console.log('keys', access_token)

    if( fullPath === '/login' &&  (access_token || user) ) {
        return navigateTo('/home')
    }

    if( fullPath !== '/login' &&  (!access_token || !user) ) {
        return navigateTo('/login')
    }

    // const client = useSupabase()
    // const user = await client.auth.user()

    // If I am not at login page, and I don't have a user, go to login page.
    /* if(name !== 'login' && !user) {
        const client = useSupabase()
        const user = await client.auth.user()

        if(user && channel !== 'home') {
            console.log('user', Date.now(), user, channel)
            return navigateTo('/home')
        } 
    } */



    /* if(user && !channel) {
        return navigateTo('/home')
    }  */

    /* if(!user && channel) {
        return navigateTo('/login')
    } */
        // console.log('none', Date.now(), user, channel, name)


})
