import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    // Check Params
    const channel = event.context.params.channel.split('@')[1]

    console.log('ch', channel)

    // Setup Imprint
    const account = channel || process.env.account
    const project = event.context.params.stream
    const imprint = process.env.imprint

    // Create a single supabase client for interacting with your database

    if(project && imprint) {
      const supabase = createClient(`https://${imprint.split(':')[0]}.supabase.co`, imprint.split(':')[1])
      const { data, error } = await supabase.from('@index').select().match({'account': account, 'project': project})

      if(error) { 
          console.log('err', error) 
      }

      const today = new Date();

      return {
        name: 'index',
        account,
        project,
        imprint: data,
        copyright: `©${today.getFullYear()} ${project}. All rights reserved.`
      }
    } 
    else {
      return {
        message: 'you have no credentials'
      }
    }
})