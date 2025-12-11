import { supabase } from './supabase'

export async function signUp(email: string, password: string, displayName: string, username: string) {
  try {
    // Sign up with auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      return { data: null, error: signUpError }
    }

    // Create user profile
    if (authData.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            auth_id: authData.user.id,
            email,
            username,
            display_name: displayName,
          },
        ])
        .select()
        .single()

      return { data: userData, error: userError }
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
