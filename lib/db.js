// db.js
import { supabase }  from './supabaseClient.js';

// Insert a user
export async function insertUser({ email, number, name }) {
  const { data, error } = await supabase.from('users').insert([{ email, number, name }])
  if (error) throw new Error(error.message)
  return data
}

// Get user by email
export async function getUserByEmail(email) {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single()
  if (error) throw new Error(error.message)
  return data
}

// Update user
export async function updateUserByEmail(email, updates) {
  const { data, error } = await supabase.from('users').update(updates).eq('email', email)
  if (error) throw new Error(error.message)
  return data
}
