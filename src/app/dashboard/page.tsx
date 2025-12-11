'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { signOut, getUser, getCurrentSession } from '@/lib/auth'
import { getPosts, createPost, likePost, unlikePost, hasUserLikedPost, getUserFriends, getConversation, sendMessage } from '@/lib/db'

interface Post {
  id: string
  content: string
  created_at: string
  users: { username: string; display_name: string; avatar_url: string }
  likes: Array<any>
}

interface Message {
  id: string
  content: string
  sender_id: string
  created_at: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('feed')
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const [friends, setFriends] = useState([])
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: sessionData } = await getCurrentSession()
        const { data: userData } = await getUser()
        
        if (userData?.user) {
          setCurrentUser(userData.user)
          const { data: postsData } = await getPosts(20)
          setPosts(postsData || [])
          const { data: friendsData } = await getUserFriends(userData.user.id)
          setFriends(friendsData || [])
        } else if (!sessionData?.session) {
          // No hay sesión, redirigir al login
          window.location.href = '/'
        }
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handlePostSubmit = async () => {
    if (newPost.trim() && currentUser) {
      try {
        await createPost(currentUser.id, newPost)
        setNewPost('')
        // Recargar posts
        const { data: updatedPosts } = await getPosts(20)
        setPosts(updatedPosts || [])
      } catch (err) {
        console.error('Error creating post:', err)
        alert('Error al crear el post. Asegúrate de estar logged in.')
      }
    }
  }

  const handleLike = async (postId: string, isLiked: boolean) => {
    if (!currentUser) return
    try {
      if (isLiked) {
        await unlikePost(currentUser.id, postId)
      } else {
        await likePost(currentUser.id, postId)
      }
      const { data: updatedPosts } = await getPosts(20)
      setPosts(updatedPosts || [])
    } catch (err) {
      console.error('Error liking post:', err)
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/'
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <img 
            src="/logos/logo-horizontal-lightmode.png" 
            alt="Charlas" 
            className="h-12"
          />
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-gray-900">Notificaciones</button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <nav className="bg-white rounded-lg p-4 space-y-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'feed' ? 'bg-blue-100 text-[#4796c4]' : 'hover:bg-gray-100'}`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'friends' ? 'bg-blue-100 text-[#4796c4]' : 'hover:bg-gray-100'}`}
            >
              Amigos
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'messages' ? 'bg-blue-100 text-[#4796c4]' : 'hover:bg-gray-100'}`}
            >
              Mensajes
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-100 text-[#4796c4]' : 'hover:bg-gray-100'}`}
            >
              Perfil
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2">
          {activeTab === 'feed' && (
            <div className="space-y-4">
              {/* Post Creator */}
              <div className="bg-white rounded-lg p-4 shadow">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="¿Qué estás pensando?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4796c4] resize-none"
                  rows={3}
                />
                <button
                  onClick={handlePostSubmit}
                  className="mt-2 w-full bg-gradient-to-r from-[#4796c4] to-[#193d6d] text-white py-2 rounded-lg font-semibold hover:shadow-lg"
                >
                  Publicar
                </button>
              </div>

              {/* Posts */}
              {posts.length === 0 ? (
                <div className="bg-white rounded-lg p-4 shadow text-center text-gray-500">
                  No hay posts aún. ¡Sé el primero!
                </div>
              ) : (
                posts.map(post => (
                  <div key={post.id} className="bg-white rounded-lg p-4 shadow">
                    <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#4796c4] rounded-full flex items-center justify-center text-white font-bold">
                      {post.users?.display_name?.charAt(0).toUpperCase()}
                    </div>
                      <div>
                        <h3 className="font-semibold">{post.users?.display_name || 'Usuario'}</h3>
                        <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition">
                      Favorito {post.likes?.length || 0}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="bg-white rounded-lg p-6 shadow space-y-4">
              <h2 className="text-xl font-bold">Mis Amigos</h2>
              {friends.length === 0 ? (
                <p className="text-gray-500">No tienes amigos aún</p>
              ) : (
                <div className="space-y-3">
                  {friends.map((friend: any, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#193d6d] rounded-full flex items-center justify-center text-white font-bold">
                        {(friend.users1?.display_name || friend.users2?.display_name)?.charAt(0).toUpperCase()}
                      </div>
                        <span className="font-semibold">{friend.users1?.display_name || friend.users2?.display_name}</span>
                      </div>
                      <button className="text-[#4796c4] hover:underline text-sm">Ver perfil</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Mensajes</h2>
              </div>
              <div className="p-4 text-center text-gray-500">
                Selecciona un amigo para iniciar una conversación
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-[#4796c4] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {currentUser?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Mi Perfil</h2>
                  <p className="text-gray-600">@{currentUser?.email?.split('@')[0]}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">Este es mi perfil en Charlas</p>
              <button className="px-6 py-2 bg-gradient-to-r from-[#4796c4] to-[#193d6d] text-white rounded-lg hover:shadow-lg">
                Editar Perfil
              </button>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-bold text-lg mb-4">Sugerencias</h3>
            <div className="space-y-3">
              {['Ana Martínez', 'Lucas Torres', 'Sofia Rivera'].map((name, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{name}</span>
                  <button className="text-[#4796c4] text-xs hover:underline">Seguir</button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
