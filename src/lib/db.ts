import { supabase } from './supabase'

// ============================================
// USERS
// ============================================
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

export async function searchUsers(query: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
    .limit(10)
  return { data, error }
}

// ============================================
// POSTS
// ============================================
export async function getPosts(limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      user_id,
      image_url,
      users!user_id(id, username, display_name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  return { data, error }
}

export async function getUserPosts(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      user_id,
      image_url,
      users!user_id(id, username, display_name, avatar_url)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

export async function createPost(userId: string, content: string, imageUrl?: string) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ user_id: userId, content, image_url: imageUrl }])
    .select(`
      id,
      content,
      created_at,
      user_id,
      image_url,
      users!user_id(id, username, display_name, avatar_url)
    `)
    .single()
  return { data, error }
}

export async function deletePost(postId: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
  return { error }
}

// ============================================
// LIKES
// ============================================
export async function likePost(userId: string, postId: string) {
  const { data, error } = await supabase
    .from('likes')
    .insert([{ user_id: userId, post_id: postId }])
    .select()
    .single()
  return { data, error }
}

export async function unlikePost(userId: string, postId: string) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('post_id', postId)
  return { error }
}

export async function getPostLikes(postId: string) {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId)
  return { data, error }
}

export async function hasUserLikedPost(userId: string, postId: string) {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .single()
  return { liked: !!data, error }
}

// ============================================
// FRIENDSHIPS
// ============================================
export async function getUserFriends(userId: string) {
  const { data, error } = await supabase
    .from('friendships')
    .select(`
      *,
      users1:user_id_1(id, username, display_name, avatar_url),
      users2:user_id_2(id, username, display_name, avatar_url)
    `)
    .or(`and(user_id_1.eq.${userId},status.eq.accepted),and(user_id_2.eq.${userId},status.eq.accepted)`)
  return { data, error }
}

export async function getFriendshipStatus(userId1: string, userId2: string) {
  const minId = userId1 < userId2 ? userId1 : userId2
  const maxId = userId1 < userId2 ? userId2 : userId1
  
  const { data, error } = await supabase
    .from('friendships')
    .select('*')
    .eq('user_id_1', minId)
    .eq('user_id_2', maxId)
    .single()
  
  return { data, error }
}

export async function sendFriendRequest(userId1: string, userId2: string) {
  const minId = userId1 < userId2 ? userId1 : userId2
  const maxId = userId1 < userId2 ? userId2 : userId1
  
  const { data, error } = await supabase
    .from('friendships')
    .insert([{ user_id_1: minId, user_id_2: maxId, status: 'pending' }])
    .select()
    .single()
  return { data, error }
}

export async function acceptFriendRequest(friendshipId: string) {
  const { data, error } = await supabase
    .from('friendships')
    .update({ status: 'accepted' })
    .eq('id', friendshipId)
    .select()
    .single()
  return { data, error }
}

export async function removeFriend(friendshipId: string) {
  const { error } = await supabase
    .from('friendships')
    .delete()
    .eq('id', friendshipId)
  return { error }
}

// ============================================
// MESSAGES
// ============================================
export async function getConversation(userId: string, friendId: string, limit = 50) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(
      `and(sender_id.eq.${userId},recipient_id.eq.${friendId}),and(sender_id.eq.${friendId},recipient_id.eq.${userId})`
    )
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

export async function sendMessage(senderId: string, recipientId: string, content: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ sender_id: senderId, recipient_id: recipientId, content }])
    .select()
    .single()
  return { data, error }
}

export async function markMessageAsRead(messageId: string) {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)
  return { error }
}

export async function getUnreadMessages(userId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('recipient_id', userId)
    .eq('read', false)
  return { data, error }
}

export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      users1:sender_id(id, username, display_name, avatar_url),
      users2:recipient_id(id, username, display_name, avatar_url)
    `)
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: false })
  return { data, error }
}
