'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signUp, signIn } from '@/lib/auth'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isLogin) {
        const { data, error: signInError } = await signIn(email, password)
        if (signInError) {
          setError(signInError.message)
        } else {
          setSuccess('¡Iniciaste sesión! Redirigiendo...')
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        }
      } else {
        const { data, error: signUpError } = await signUp(email, password, displayName, username)
        if (signUpError) {
          setError(signUpError.message)
        } else {
          setSuccess('¡Cuenta creada! Verifica tu email para confirmar.')
          setEmail('')
          setPassword('')
          setDisplayName('')
          setUsername('')
          setIsLogin(true)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/logos/logo-horizontal-lightmode.png" 
            alt="Charlas" 
            className="h-16 mx-auto mb-2"
          />
          <p className="text-gray-600 mt-2">Conecta con tus amigos</p>
        </div>

        {/* Error & Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre completo"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4796c4]"
                required={!isLogin}
              />
              <input
                type="text"
                placeholder="Usuario (@usuario)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4796c4]"
                required={!isLogin}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4796c4]"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4796c4]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4796c4] to-[#193d6d] text-white py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
              setSuccess(null)
            }}
            className="text-[#4796c4] font-semibold hover:underline"
          >
            {isLogin ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </p>

        {/* Demo Link */}
        <Link href="/dashboard">
          <button className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition">
            Ver Demo
          </button>
        </Link>
      </div>
    </div>
  )
}
