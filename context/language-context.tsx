'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import es from '../locales/es.json'
import en from '../locales/en.json'
import pt from '../locales/pt.json'

export type Locale = 'es' | 'en' | 'pt'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (keyPath: string) => string
}

const dictionaries: Record<Locale, Record<string, unknown>> = {
  es: es as Record<string, unknown>,
  en: en as Record<string, unknown>,
  pt: pt as Record<string, unknown>,
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
    if (initialLocale && ['es', 'en', 'pt'].includes(initialLocale)) {
      setLocaleState(initialLocale)
      if (typeof window !== 'undefined') {
        localStorage.setItem('tlux_locale', initialLocale)
      }
      return
    }

    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      const match = pathname.match(/^\/(es|en|pt)(\/|$)/)
      if (match && ['es', 'en', 'pt'].includes(match[1])) {
        setLocaleState(match[1] as Locale)
      } else {
        const savedLocale = localStorage.getItem('tlux_locale') as Locale
        if (savedLocale && ['es', 'en', 'pt'].includes(savedLocale)) {
          setLocaleState(savedLocale)
        }
      }
    }
  }, [initialLocale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('tlux_locale', newLocale)
      const pathname = window.location.pathname
      const currentLocaleMatch = pathname.match(/^\/(es|en|pt)(\/|$)/)
      const hash = window.location.hash || ''
      if (currentLocaleMatch) {
        const newPath = pathname.replace(/^\/(es|en|pt)/, `/${newLocale}`)
        window.history.pushState({}, '', newPath + hash)
      } else {
        window.history.pushState({}, '', `/${newLocale}/` + hash)
      }
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
