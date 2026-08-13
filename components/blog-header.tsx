'use client'

import Link from 'next/link'
import { ArrowLeft, Globe, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslation, Locale } from '@/context/language-context'

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

function Logo() {
  return (
    <Link href="/" aria-label="TLUX inicio" className="flex items-center gap-3 group">
      <img
        src="/tlux-logo.png"
        alt="TLUX Logo"
        className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span className="bg-linear-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text font-sans text-2xl sm:text-3xl font-bold tracking-tight text-transparent">
        TLUX
      </span>
    </Link>
  )
}

export function BlogHeader() {
  const { locale, setLocale, t } = useTranslation()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLang = LANGUAGES.find((l) => l.code === locale || (locale === 'pt-BR' && l.code === 'pt')) || LANGUAGES[0]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-6">
          <Logo />
          <span className="hidden sm:inline font-mono text-xs text-blue-500 font-semibold tracking-widest border-l border-slate-800 pl-6">
            [ EDITORIAL_STUDIO ]
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-2 border border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate-300 transition-colors hover:border-blue-600 hover:text-white rounded-none"
          >
            <ArrowLeft className="size-3.5 text-blue-400" />
            <span>{t('blog.back_to_home')}</span>
          </Link>

          {/* Selector de idioma */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex h-9 items-center gap-2 border border-slate-800 bg-slate-900 px-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-200 transition-all hover:border-blue-500 hover:text-white cursor-pointer rounded-none"
              aria-label="Seleccionar idioma"
            >
              <Globe className="size-3.5 text-blue-400" />
              <span>{currentLang.flag} {locale.toUpperCase()}</span>
              <ChevronDown className={`size-3 text-slate-400 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 border border-slate-800 bg-slate-950 py-1 shadow-2xl z-50 rounded-none">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLocale(l.code)
                      setLangMenuOpen(false)
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 font-mono text-xs transition-colors cursor-pointer ${
                      locale === l.code || (locale === 'pt-BR' && l.code === 'pt')
                        ? 'bg-blue-600/20 text-blue-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{l.flag} {l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
