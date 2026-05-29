import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be defined.')
  }

  // SECURITY NOTE: The NEXT_PUBLIC_SUPABASE_ANON_KEY is safe to expose in the browser 
  // ONLY because we have Row Level Security (RLS) enabled on our Supabase database. 
  // RLS ensures that users can only access data they are authorized to see.
  // NEVER expose the SUPABASE_SERVICE_ROLE_KEY to the client.
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
