// db.js
import { supabase }  from './supabaseClient.js';

// Insert a user
export async function insertUser({ email, number, name }) {

  const {data: existingUser, error: selectError} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  if (selectError && selectError.code !== 'PGRST116') { // ignore "no rows" error
    throw new Error(selectError.message);
  }

  const { data, error } = await supabase.from('users').insert([{ email, number, name }])
  if (error) throw new Error(error.message)
  return data
}

  // Fetch all users from the 'users' table
  export async function fetchUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, number, name');
    if (error) throw new Error(error.message);
    return data;
  }

// Get user by email
export async function getUserByEmail(email) {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single()
  if (error) throw new Error(error.message)
  return data
}

// Insert user thought data
export async function insertUserThought({ user_id, thought, category }) {
  const { data, error } = await supabase.from('user_thoughts').insert([{ user_id, thought, category}])
  if (error) throw new Error(error.message)
  return data
}


// Update user
export async function updateUserByEmail(email, updates) {
  const { data, error } = await supabase.from('users').update(updates).eq('email', email)
  if (error) throw new Error(error.message)
  return data
}
