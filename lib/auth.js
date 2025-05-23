import supabase from '../lib/supabaseClient.js';

export async function signup(email, password) {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return user;
}