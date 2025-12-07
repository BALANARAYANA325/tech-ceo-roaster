// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ateclunskeziyycqrnlq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0ZWNsdW5za2V6aXl5Y3FybmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTM0NTcsImV4cCI6MjA4MDY2OTQ1N30.v1zU6mqpxgSN-82n7VxclE3DBWJBqIny-gSRtY_CbqY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)