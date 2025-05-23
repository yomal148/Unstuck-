import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbvpropbxwzemhqkdeux.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidnByb3BieHd6ZW1ocWtkZXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTU0MjUsImV4cCI6MjA2MzQzMTQyNX0.QEr1U_MPgZy2TWPF4aScKQkAVOChrYodCq5k8GlX-Bo' // Get this from project > Settings > API

export const supabase = createClient(supabaseUrl, supabaseKey)




