'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import es from '../locales/es.json'
import en from '../locales/en.json'
import pt from '../locales/pt.json'

export type Locale = 'es' | 'en' | 'pt' | 'pt-BR'

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

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || 'es')

  useEffect(() => {
    if (initialLocale && ['es', 'en', 'pt', 'pt-BR'].includes(initialLocale)) {
      setLocaleState(initialLocale)
      if (typeof window !== 'undefined') {
        localStorage.setItem('tlux_locale', initialLocale)
      }
      return
    }

    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      const match = pathname.match(/^\/(es|en|pt|pt-BR)(\/|$)/i)
      if (match && ['es', 'en', 'pt', 'pt-BR'].includes(match[1])) {
        const matchedLocale = match[1] === 'pt' ? 'pt-BR' : (match[1] as Locale)
        setLocaleState(matchedLocale)
      } else {
        const savedLocale = localStorage.getItem('tlux_locale') as Locale
        if (savedLocale && ['es', 'en', 'pt', 'pt-BR'].includes(savedLocale)) {
          setLocaleState(savedLocale)
        }
      }
    }
  }, [initialLocale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('tlux_locale', newLocale)
      const hash = window.location.hash || ''
      const newPath = newLocale === 'es' ? '/' : `/${newLocale}/`
      window.history.pushState({}, '', newPath + hash)
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
