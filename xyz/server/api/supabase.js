import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {

    // Setup Environment
    const account = process.env.account
    const project = process.env.project
    const imprint = process.env.imprint

    // Create a single supabase client for interacting with your database

    if(project && imprint) {
      const supabase = createClient(`https://${imprint.split(':')[0]}.supabase.co`, imprint.split(':')[1])
      const { data, error } = await supabase.from('@index').select().match({'account': account})

      if(error) { 
          return {
            error
          }
      } else {
        const today = new Date();
        return {
          account,
          project,
          imprint: {
            data,
            error,
            copyright: `©${today.getFullYear()} ${project}. All rights reserved.`
          }
          
        }
      }
    } 
    else {
      return {
        message: 'you have no credentials'
      }
    }
})