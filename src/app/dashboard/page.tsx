'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  liked: boolean
}

interface Message {
  id: number
  sender: string
  avatar: string
  text: string
  timestamp: string
}

const DEMO_POSTS: Post[] = [
  {
    id: 1,
    author: 'Juan Pérez',
    avatar: '👨',
    content: '¡Hola a todos! Bienvenidos a Charlas, nuestra nueva red social.',
    timestamp: 'Hace 2 horas',
    likes: 15,
    liked: false,
  },
  {
    id: 2,
    author: 'María García',
    avatar: '👩',
    content: 'Me encanta esta plataforma, es muy intuitiva y fácil de usar.',
    timestamp: 'Hace 1 hora',
    likes: 8,
    liked: false,
  },
  {
    id: 3,
    author: 'Carlos López',
    avatar: '👨',
    content: 'Compartiendo una foto hermosa del atardecer 🌅',
    timestamp: 'Hace 30 minutos',
    likes: 23,
    liked: false,
  },
]

const DEMO_MESSAGES: Message[] = [
  {
    id: 1,
    sender: 'Juan Pérez',
    avatar: '👨',
    text: '¡Hola! ¿Cómo estás?',
    timestamp: '10:30',
  },
  {
    id: 2,
    sender: 'Yo',
    avatar: '😊',
    text: 'Bien, gracias. ¿Y tú?',
    timestamp: '10:31',
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('feed')
  const [posts, setPosts] = useState(DEMO_POSTS)
  const [newPost, setNewPost] = useState('')

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ))
  }

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: 'Mi Perfil',
        avatar: '👤',
        content: newPost,
        timestamp: 'Ahora',
        likes: 0,
        liked: false,
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Charlas
          </h1>
          <div className="flex gap-4">
            <button className="text-gray-600 hover:text-gray-900">🔔</button>
            <Link href="/" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Salir
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <nav className="bg-white rounded-lg p-4 space-y-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'feed' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              📱 Feed
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'friends' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              👥 Amigos
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'messages' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              💬 Mensajes
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              👤 Perfil
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
                <button
                  onClick={handlePostSubmit}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Publicar
                </button>
              </div>

              {/* Posts */}
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{post.avatar}</span>
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${post.liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  >
                    {post.liked ? '❤️' : '🤍'} {post.likes}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="bg-white rounded-lg p-6 shadow space-y-4">
              <h2 className="text-xl font-bold">Mis Amigos</h2>
              <div className="space-y-3">
                {['Juan Pérez', 'María García', 'Carlos López'].map((friend, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👤</span>
                      <span className="font-semibold">{friend}</span>
                    </div>
                    <button className="text-blue-600 hover:underline">Ver perfil</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Conversación con Juan Pérez</h2>
              </div>
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {DEMO_MESSAGES.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'Yo' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'Yo' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}>
                      <p>{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <input
                  type="text"
                  placeholder="Escribe un mensaje..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-6xl">👤</span>
                <div>
                  <h2 className="text-2xl font-bold">Mi Perfil</h2>
                  <p className="text-gray-600">@miusuario</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">Esta es mi biografía en Charlas</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
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
                  <button className="text-blue-600 text-xs hover:underline">Seguir</button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
