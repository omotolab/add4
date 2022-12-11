import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    // Check Params
    const parts = event.context.params.channel.split('@')
    const channel = parts[1]

    // Setup Imprint
    const account = channel || process.env.account
    const project = process.env.project
    const imprint = process.env.imprint

    // Create a single supabase client for interacting with your database

    if(project && imprint) {
      const supabase = createClient(`https://${imprint.split(':')[0]}.supabase.co`, imprint.split(':')[1])
      const { data, error } = await supabase.from('@index').select().match({'account': account})
      
      if(error) { 
          console.log('err', error) 
      }

      const today = new Date();

      return {
        // channel,
        account,
        project,
        imprint: {
          data,
          error,
          copyright: `©${today.getFullYear()} ${data.project}. All rights reserved.`
        },
      }
    } 
    else {
      return {
        message: 'you have no credentials'
      }
    }
})