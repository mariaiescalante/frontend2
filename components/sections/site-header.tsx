'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowUpRight, Menu, X, Globe, ChevronDown, Check } from 'lucide-react'
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
  const isFaqRoute = pathname.includes('/faq')

  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const items: [string, string][] = [
    [t('nav.inicio') || 'Inicio', '#inicio'],
    [t('nav.servicios'), '#servicios'],
    [t('nav.funciones'), '#funciones'],
    [t('nav.nosotros'), '#nosotros'],
  ]

  const close = () => setMenuOpen(false)

  const homeHref = locale === 'es' ? '/' : `/${locale}`
  const blogHref = locale === 'es' ? '/blog' : `/${locale}/blog`
  const faqHref = locale === 'es' ? '/faq' : `/${locale}/faq`

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

  const scrollToId = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    close()
    const targetId = href.replace('#', '')

    if (isBlogRoute || isFaqRoute) {
      sessionStorage.setItem('scrollTarget', targetId)
      router.push(homeHref)
      return
    }

    const element = document.getElementById(targetId) ||
      (targetId === 'servicios' ? document.getElementById('mercados') :
       targetId === 'funciones' ? document.getElementById('metodo') :
       targetId === 'nosotros' ? document.getElementById('estudio') : null)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (targetId === 'inicio') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0]

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

          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-wider text-zinc-700 md:flex" aria-label="Navegación principal">
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => scrollToId(e, href)}
                className="transition-colors hover:text-slate-900 cursor-pointer"
              >
                {label}
              </a>
            ))}

            <Link
              href={blogHref}
              className={`transition-colors hover:text-slate-900 ${
                isBlogRoute ? 'text-blue-600 font-bold' : ''
              }`}
            >
              {t('nav.blog')}
            </Link>

            <Link
              href={faqHref}
              className={`transition-colors hover:text-slate-900 ${
                isFaqRoute ? 'text-blue-600 font-bold' : ''
              }`}
            >
              {t('nav.faq') || 'FAQ'}
            </Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {/* ── Selector de Idiomas ── */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex h-10 items-center gap-2 border border-slate-300 bg-white px-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-800 transition-all hover:border-blue-600 hover:text-blue-600 cursor-pointer"
                aria-label="Seleccionar idioma"
              >
                <Globe className="size-4 text-blue-600" />
                <span>{currentLang.flag} {locale.toUpperCase()}</span>
                <ChevronDown className={`size-3 text-slate-500 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code)
                          setLangMenuOpen(false)
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-mono text-xs font-semibold transition-colors cursor-pointer ${
                          locale === lang.code
                            ? 'bg-blue-50 text-blue-600 font-bold'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </span>
                        {locale === lang.code && <Check className="size-4 text-blue-600" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Botón Original HABLEMOS ── */}
            <a
              href="#contacto"
              onClick={(e) => scrollToId(e, '#contacto')}
              className="h-10 items-center gap-1.5 border border-slate-950 bg-slate-950 px-5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-blue-600 hover:bg-blue-600 inline-flex cursor-pointer"
            >
              <span>{t('nav.hablemos') || 'Hablemos'}</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <button
            className="flex size-10 items-center justify-center border border-slate-300 text-slate-900 md:hidden cursor-pointer"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* ── ANIMACIÓN DE APARICIÓN SUAVE DEL MENÚ LATERAL (SIDEBAR DRAWER) ── */}
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
                <Logo href={homeHref} />
                <button
                  className="flex size-11 items-center justify-center border border-slate-700 text-white transition-colors hover:border-blue-600 hover:bg-blue-600 cursor-pointer"
                  aria-label="Cerrar menú"
                  onClick={close}
                >
                  <X />
                </button>
              </div>

              <nav className="mt-8 flex flex-col" aria-label="Navegación móvil">
                {items.map(([label, href], i) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => { close(); scrollToId(e, href); }}
                    className="flex items-center justify-between border-b border-slate-800 py-4 font-mono text-sm uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
                  >
                    <span><span className="mr-4 text-blue-500">0{i + 1}</span>{label}</span>
                    <ArrowUpRight className="size-4 text-blue-500" />
                  </a>
                ))}
                <Link
                  href={blogHref}
                  onClick={close}
                  className="flex items-center justify-between border-b border-slate-800 py-4 font-mono text-sm uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
                >
                  <span>{t('nav.blog')}</span>
                  <ArrowUpRight className="size-4 text-blue-500" />
                </Link>
                <Link
                  href={faqHref}
                  onClick={close}
                  className="flex items-center justify-between border-b border-slate-800 py-4 font-mono text-sm uppercase tracking-wider text-slate-300 transition-colors hover:text-white"
                >
                  <span>{t('nav.faq') || 'FAQ'}</span>
                  <ArrowUpRight className="size-4 text-blue-500" />
                </Link>

                <a
                  href="#contacto"
                  onClick={(e) => { close(); scrollToId(e, '#contacto'); }}
                  className="mt-6 flex items-center justify-between border border-blue-600 bg-blue-600 px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-transparent"
                >
                  <span>{t('nav.hablemos') || 'Hablemos'}</span>
                  <ArrowUpRight className="size-4" />
                </a>
              </nav>

              {/* Selector de idioma en menú móvil */}
              <div className="mt-8 border-t border-slate-800 pt-6">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">[ IDIOMA / LANGUAGE ]</p>
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code)
                        close()
                      }}
                      className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 font-mono text-xs uppercase font-bold transition-all ${
                        locale === lang.code
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

              <p className="mt-auto pt-6 font-mono text-xs uppercase tracking-wider text-slate-500">TLUX / Digital studio / 2026</p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
