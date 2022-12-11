import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {

    // Setup Imprint
    const account = event.context.params.channel || process.env.account
    const project = event.context.params.stream || process.env.project
    const imprint = event.context.params.signal || process.env.imprint

    // Create a single supabase client for interacting with your database
    if(project && imprint) {
      const supabase = createClient(`https://${imprint.split(':')[0]}.supabase.co`, imprint.split(':')[1])
      const { data, error } = await supabase.from(stream).select()
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