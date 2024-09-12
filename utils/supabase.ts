import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_KEY || ""


export default defineNuxtPlugin(() => {
  const supabase = createClient(supabaseUrl, supabaseKey)
  return {
    provide: {
      supabase
    }
  }
})
