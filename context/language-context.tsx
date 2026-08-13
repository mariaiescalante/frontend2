'use client'

import React, { createContext, useContext, useSyncExternalStore } from 'react'
import es from '../locales/es.json'
import en from '../locales/en.json'
import pt from '../locales/pt.json'
import { normalizeLocale } from '../lib/locale'
import type { Locale } from '../lib/locale'

export type { Locale } from '../lib/locale'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (keyPath: string) => string
}

const dictionaries: Record<string, Record<string, unknown>> = {
  es: es as Record<string, unknown>,
  en: en as Record<string, unknown>,
  pt: pt as Record<string, unknown>,
  'pt-BR': pt as Record<string, unknown>,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getUrlLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  const pathname = window.location.pathname
  const match = pathname.match(/^\/(en|pt|pt-BR)(\/|$)/i)
  if (match) return normalizeLocale(match[1])
  return 'es'
}

function subscribeUrlLocale(callback: () => void) {
  window.addEventListener('popstate', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener('storage', callback)
  }
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const urlLocale = useSyncExternalStore(subscribeUrlLocale, getUrlLocale, () => 'es' as Locale)
  const locale: Locale = normalizeLocale(urlLocale || initialLocale || 'es')

  // Cambio de idioma: recarga completa de la página preservando la subruta actual (ej: /blog o /blog/mi-post)
  const setLocale = (newLocale: Locale) => {
    const normalized = normalizeLocale(newLocale)
    if (typeof window === 'undefined') return
    localStorage.setItem('tlux_locale', normalized)

    const currentPath = window.location.pathname
    const hash = window.location.hash || ''

    // Remueve prefijo de idioma previo (/en, /pt, /pt-BR, /es) si existe en la URL
    const cleanPath = currentPath.replace(/^\/(es|en|pt|pt-BR)(\/|$)/i, '/')

    // Construye la nueva ruta conservando el camino actual (/blog, /blog/post-slug, etc.)
    let newPath = ''
    if (normalized === 'es') {
      newPath = cleanPath === '' ? '/' : cleanPath
    } else {
      newPath = cleanPath === '/' ? `/${normalized}/` : `/${normalized}${cleanPath}`
    }

    if (currentPath !== newPath) {
      window.location.assign(newPath + hash)
    }
  }

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.')
    let current: unknown = dictionaries[locale] || dictionaries['es']

    for (const key of keys) {
      if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
        current = (current as Record<string, unknown>)[key]
      } else {
        // Fallback al idioma español si la llave no existe
        let fallback: unknown = dictionaries['es']
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in (fallback as Record<string, unknown>)) {
            fallback = (fallback as Record<string, unknown>)[fbKey]
          } else {
            return keyPath
          }
        }
        return typeof fallback === 'string' ? fallback : keyPath
      }
    }

    return typeof current === 'string' ? current : keyPath
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
