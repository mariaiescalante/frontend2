'use client'

import React, { createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
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

const translationCache = new Map<string, string>()

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const pathname = usePathname()

  const locale: Locale = React.useMemo(() => {
    const match = pathname.match(/^\/(en|pt|pt-BR)(\/|$)/i)
    if (match) return normalizeLocale(match[1])
    if (initialLocale) return normalizeLocale(initialLocale)
    return 'es'
  }, [pathname, initialLocale])

  const setLocale = (newLocale: Locale) => {
    const normalized = normalizeLocale(newLocale)
    const cleanPath = pathname.replace(/^\/(es|en|pt|pt-BR)(\/|$)/i, '/')

    let newPath = ''
    if (normalized === 'es') {
      newPath = cleanPath === '' ? '/' : cleanPath
    } else {
      newPath = cleanPath === '/' ? `/${normalized}` : `/${normalized}${cleanPath}`
    }

    if (pathname !== newPath) {
      localStorage.setItem('tlux_locale', normalized)
      window.location.href = newPath
    }
  }

  // Traducción ultra-optimizada con caché Map en memoria (evita re-ejecutar loops y splits en cada render)
  const t = React.useCallback((keyPath: string): string => {
    const cacheKey = `${locale}:${keyPath}`
    const cached = translationCache.get(cacheKey)
    if (cached !== undefined) {
      return cached
    }

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
            translationCache.set(cacheKey, keyPath)
            return keyPath
          }
        }
        const resFallback = typeof fallback === 'string' ? fallback : keyPath
        translationCache.set(cacheKey, resFallback)
        return resFallback
      }
    }

    const res = typeof current === 'string' ? current : keyPath
    translationCache.set(cacheKey, res)
    return res
  }, [locale])

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
