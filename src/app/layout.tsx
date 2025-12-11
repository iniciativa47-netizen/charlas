import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Charlas - Red Social',
  description: 'Conecta con amigos y comparte tus pensamientos',
  icons: {
    icon: '/logos/logo-favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
