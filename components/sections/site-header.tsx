'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpRight, Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation, Locale } from '../../context/language-context'

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} aria-label="TLUX inicio" className="flex items-center gap-3 group">
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

export function SiteHeader() {
  const { locale, setLocale, t } = useTranslation()
  const pathname = usePathname() || ''
  const router = useRouter()
  const isBlogRoute = pathname.includes('/blog')

  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const items: [string, string][] = [
    [t('nav.servicios'), '#mercados'],
    [t('nav.funciones'), '#metodo'],
    [t('nav.nosotros'), '#estudio'],
  ]

  const close = () => setMenuOpen(false)

  const homeHref = locale === 'es' ? '/' : `/${locale}`
  const blogHref = locale === 'es' ? '/blog' : `/${locale}/blog`

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToId = (e: React.MouseEvent, id: string) => {
    const targetId = id.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      e.preventDefault()
      router.push(`${homeHref}#${targetId}`)
    }
  }

  const currentLang = LANGUAGES.find((l) => l.code === locale || (locale === 'pt-BR' && l.code === 'pt')) || LANGUAGES[0]

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'border-b border-slate-200/70 bg-white/70 backdrop-blur-md shadow-md shadow-slate-900/5'
            : 'border-b border-slate-200 bg-white shadow-none'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Logo href={homeHref} />

          <nav className="hidden items-center gap-8 font-mono text-[13px] uppercase tracking-wider text-zinc-700 md:flex" aria-label="Navegación principal">
            {isBlogRoute ? (
              <>
                <Link href={homeHref} className="transition-colors hover:text-slate-900">
                  {t('nav.inicio') || 'Inicio'}
                </Link>
                <Link href={blogHref} className="text-blue-600 font-bold transition-colors">
                  {t('nav.blog') || 'Blog'}
                </Link>
              </>
            ) : (
              <>
                {items.map(([label, href]) => (
                  <a key={href} href={href} onClick={(e) => scrollToId(e, href)} className="transition-colors hover:text-slate-900">{label}</a>
                ))}
                <Link href={blogHref} className="transition-colors hover:text-slate-900 text-blue-600 font-semibold">
                  {t('nav.blog')}
                </Link>
              </>
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/#contacto" onClick={(e) => scrollToId(e, 'contacto')} className="h-10 items-center gap-1 border border-slate-950 bg-slate-950 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:border-blue-600 hover:bg-blue-600 inline-flex">
              {t('nav.hablemos')} <ArrowUpRight className="size-4" />
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex h-10 items-center gap-2 border border-slate-300 bg-white px-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-800 transition-all hover:border-blue-600 hover:text-blue-600 cursor-pointer shadow-xs"
                aria-label="Seleccionar idioma"
              >
                <Globe className="size-4 text-blue-600" />
                <span>{currentLang.flag} {locale.toUpperCase()}</span>
                <ChevronDown className={`size-3 text-slate-500 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 border border-slate-200 bg-white py-2 shadow-xl z-50">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code)
                        setLangMenuOpen(false)
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 font-mono text-xs transition-colors cursor-pointer ${
                        locale === l.code || (locale === 'pt-BR' && l.code === 'pt')
                          ? 'bg-blue-50 text-blue-600 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className="flex size-11 items-center justify-center border border-slate-200 bg-white text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-600 md:hidden"
            aria-label="Abrir menú de navegación"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm md:hidden"
            onClick={close}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="ml-auto flex h-full w-[85%] max-w-sm flex-col border-l border-slate-800 bg-slate-950 p-6 text-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                <Logo />
                <button
                  className="flex size-11 items-center justify-center border border-slate-700 text-white transition-colors hover:border-blue-600 hover:bg-blue-600"
                  aria-label="Cerrar menú"
                  onClick={close}
                >
                  <X />
                </button>
              </div>

              <nav className="mt-8 flex flex-col" aria-label="Navegación móvil">
                {isBlogRoute ? (
                  <>
                    <Link
                      href={homeHref}
                      onClick={close}
                      className="flex items-center justify-between border-b border-slate-800 py-4 font-mono text-sm uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-white"
                    >
                      <span><span className="mr-4 text-blue-500">01</span>{t('nav.inicio') || 'Inicio'}</span>
                      <ArrowUpRight className="size-4 text-blue-500" />
                    </Link>
                    <Link
                      href={blogHref}
                      onClick={close}
                      className="flex items-center justify-between border-b border-slate-800 py-4 font-mono text-sm uppercase tracking-[0.16em] text-blue-400 font-bold transition-colors hover:text-white"
                    >
                      <span><span className="mr-4 text-blue-500">02</span>{t('nav.blog') || 'Blog'}</span>
                      <ArrowUpRight className="size-4 text-blue-500" />
                    </Link>
                  </>
                ) : (
                  <>
                    {items.map(([label, href], i) => (
                      <a
                        key={href}
                        href={href}
                        onClick={(e) => { close(); scrollToId(e, href); }}
                        className="flex items-center justify-between border-b border-slate-800 py-4 font-mono text-sm uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-white"
                      >
                        <span><span className="mr-4 text-blue-500">0{i + 1}</span>{label}</span>
                        <ArrowUpRight className="size-4 text-blue-500" />
                      </a>
                    ))}
                    <Link
                      href={blogHref}
                      onClick={close}
                      className="flex items-center justify-between border-b border-slate-800 py-4 font-mono text-sm uppercase tracking-[0.16em] text-blue-400 font-semibold transition-colors hover:text-white"
                    >
                      <span><span className="mr-4 text-blue-500">04</span>{t('nav.blog')}</span>
                      <ArrowUpRight className="size-4 text-blue-500" />
                    </Link>
                  </>
                )}
                <Link
                  href="/#contacto"
                  onClick={(e) => { close(); scrollToId(e, 'contacto'); }}
                  className="mt-6 flex items-center justify-between border border-blue-600 bg-blue-600 px-5 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent"
                >
                  {t('nav.hablemos')} <ArrowUpRight className="size-4" />
                </Link>
              </nav>

              <div className="mt-8 border-t border-slate-800 pt-6">
                <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">[ IDIOMA / LANGUAGE ]</p>
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code)
                        close()
                      }}
                      className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 font-mono text-xs uppercase font-bold transition-all ${
                        locale === lang.code || (lang.code === 'pt' && locale === 'pt-BR')
                          ? 'border-blue-500 bg-blue-600/30 text-blue-400'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-auto pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">TLUX / Digital studio / 2026</p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
