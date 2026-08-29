import { Analytics } from '@vercel/analytics/next'
import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { LanguageProvider } from '../context/language-context'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-cormorant', style: ['normal', 'italic'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://corptlux.test'),
  title: 'Tlux | Tecnología Líder en Experiencia de Usuario',
  description: 'Tlux es un estudio digital independiente que convierte negocios con ambición en experiencias imposibles de ignorar.',
  generator: 'v0.app',
  icons: {
    icon: '/tlux-logo.png',
    shortcut: '/tlux-logo.png',
    apple: '/tlux-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8fafc',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`light bg-background ${geist.variable} ${geistMono.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && process.env.VERCEL && <Analytics mode="production" />}
      </body>
    </html>
  )
}
