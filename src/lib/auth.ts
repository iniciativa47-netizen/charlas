import { supabase } from './supabase'

export async function signUp(email: string, password: string, displayName: string, username: string) {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          username: username,
        }
      }
    })

    if (signUpError) {
      return { data: null, error: signUpError }
    }

    return { data: authData, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()
  return { data, error }
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}
