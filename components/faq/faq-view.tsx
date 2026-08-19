'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ChevronDown, MessageSquare, ArrowUpRight, HelpCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '../../context/language-context'
import { getAllFaqCategories, getLocalizedFaqItems } from '../../lib/faq-data'

export function FaqView({ initialLocale = 'es' }: { initialLocale?: string }) {
  const router = useRouter()
  const { locale, t } = useTranslation()
  const activeLocale = locale || initialLocale

  const categories = useMemo(() => getAllFaqCategories(activeLocale), [activeLocale])
  const allItems = useMemo(() => getLocalizedFaqItems(activeLocale), [activeLocale])

  const [activeCategory, setActiveCategory] = useState<string>('todas')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [openItemId, setOpenItemId] = useState<string | null>('faq-1')

  // Restaurar la posición exacta de scroll si venimos de un cambio de idioma
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedPosY = sessionStorage.getItem('scrollPosY')
      if (savedPosY !== null) {
        sessionStorage.removeItem('scrollPosY')
        const posY = parseInt(savedPosY, 10)
        if (!isNaN(posY)) {
          setTimeout(() => {
            window.scrollTo({ top: posY, left: 0, behavior: 'instant' as ScrollBehavior })
          }, 0)
        }
      }
    }
  })

  const toggleItem = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory = activeCategory === 'todas' || item.categoryId === activeCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [allItems, activeCategory, searchQuery])

  const leftColItems = useMemo(
    () => filteredItems.filter((_, idx) => idx % 2 === 0),
    [filteredItems]
  )
  const rightColItems = useMemo(
    () => filteredItems.filter((_, idx) => idx % 2 === 1),
    [filteredItems]
  )

  const homeHref = activeLocale === 'es' ? '/' : `/${activeLocale}`
  const blogHref = activeLocale === 'es' ? '/blog' : `/${activeLocale}/blog`
  const contactHref = `${homeHref}#contacto`

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('scrollPosY')
      sessionStorage.setItem('scrollTarget', 'contacto')
      const targetUrl = `${window.location.origin}${homeHref === '/' ? '/#' : homeHref + '/#'}contacto`
      window.location.assign(targetUrl)
    }
  }

  const renderCard = (item: typeof allItems[0]) => {
    const isOpen = openItemId === item.id
    return (
      <div
        key={item.id}
        className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'bg-slate-900 text-white border-slate-900 shadow-xl ring-1 ring-blue-500/30'
            : 'bg-white border-slate-200/90 text-slate-900 hover:border-blue-500/40 hover:bg-slate-50/80 shadow-xs'
        }`}
      >
        <button
          onClick={() => toggleItem(item.id)}
          className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus:outline-hidden"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col gap-2.5">
            <span
              className={`inline-flex items-center w-max px-2.5 py-0.5 text-xs font-semibold rounded-full font-mono uppercase tracking-wider transition-colors ${
                isOpen
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  : 'bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              {item.categoryLabel}
            </span>
            <h3
              className={`font-sans text-base sm:text-lg font-bold tracking-tight transition-colors leading-snug ${
                isOpen ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'
              }`}
            >
              {item.question}
            </h3>
          </div>

          <div
            className={`flex size-8 items-center justify-center rounded-full transition-all duration-300 shrink-0 ${
              isOpen
                ? 'rotate-180 bg-blue-600 text-white border border-blue-500 shadow-md'
                : 'bg-slate-100 border border-slate-200 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900'
            }`}
          >
            <ChevronDown className="size-4" />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="bg-white text-slate-900 border-t border-slate-200"
            >
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-5">
                <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* ── 1. HERO SECTION (TÍTULO Y DESCRIPCIÓN PRINCIPAL) ── */}
      <section className="w-full bg-slate-950 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-full">
              <span className="inline-block size-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>[ CENTRO DE AYUDA ]</span>
            </div>

            <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              {t('faq.hero_title_1') || 'Preguntas '}
              <span className="text-blue-500 font-serif italic font-normal">
                {t('faq.hero_title_italic') || 'Frecuentes.'}
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {t('faq.hero_description') || 'Todo lo que necesitas saber sobre nuestra plataforma, contenidos y publicaciones.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. CUERPO PRINCIPAL (FONDO BLANCO CON BARRA DE FILTROS Y BUSCADOR INLINE) ── */}
      <section className="w-full bg-white text-slate-950 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          
          {/* BARRA DE FILTROS POR CATEGORÍA Y BUSCADOR INLINE */}
          <div className="pb-8 mb-8 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white font-bold shadow-md border border-slate-950'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 border border-slate-200 font-medium'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Buscador Inline Sobrio */}
            <div className="relative flex items-center min-w-[260px] sm:min-w-[300px]">
              <Search className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
              <input
                id="faq-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('faq.search_placeholder') || 'Buscar preguntas...'}
                className="h-10 w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10 pr-9 font-sans text-xs focus:border-blue-600 focus:outline-hidden transition-all rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* LISTADO DE PREGUNTAS EN 2 COLUMNAS INDEPENDIENTES */}
          <div className="mb-16 sm:mb-24">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
                {/* Columna Izquierda */}
                <div className="flex flex-col gap-4 sm:gap-6">
                  {leftColItems.map((item) => renderCard(item))}
                </div>

                {/* Columna Derecha */}
                <div className="flex flex-col gap-4 sm:gap-6">
                  {rightColItems.map((item) => renderCard(item))}
                </div>
              </div>
            ) : (
              <div className="col-span-full py-16 text-center border border-dashed border-slate-300 rounded-2xl bg-slate-50">
                <HelpCircle className="size-12 mx-auto text-slate-400 mb-4" />
                <p className="font-sans text-lg text-slate-800 font-semibold mb-2">
                  {t('faq.no_results') || 'No encontramos preguntas que coincidan con tu búsqueda.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('todas')
                  }}
                  className="mt-4 px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer border border-slate-900"
                >
                  [ RESTABLECER BÚSQUEDA ]
                </button>
              </div>
            )}
          </div>

          {/* ── 3. BANNER INFERIOR (CTA PREMIUM TLUX) ── */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-linear-to-r from-slate-950 via-slate-900 to-blue-950/90 p-8 sm:p-12 shadow-2xl text-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div>
                <a
                  href={contactHref}
                  onClick={handleContactClick}
                  className="font-mono text-xs uppercase tracking-widest text-teal-400 mb-2 font-semibold flex items-center gap-2 hover:text-teal-300 transition-colors cursor-pointer w-fit"
                >
                  <MessageSquare className="size-3.5 text-teal-400" />
                  {t('faq.cta_tag') || '[ HABLEMOS ]'}
                </a>
                <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-xl leading-tight">
                  {t('faq.cta_title') || '¿Aún tienes dudas o no encuentras lo que buscas?'}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href={contactHref}
                  onClick={handleContactClick}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 font-mono text-xs uppercase tracking-wider text-white font-bold shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:scale-[1.02] cursor-pointer"
                >
                  <span>✉ {t('faq.cta_button_support') || 'Contactar a Soporte'}</span>
                </a>

                <Link
                  href={blogHref}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold shadow-md transition-all hover:bg-slate-800 hover:border-slate-600 hover:text-white cursor-pointer"
                >
                  <span>{t('faq.cta_button_blog') || 'Explorar el Blog'}</span>
                  <ArrowUpRight className="size-4 text-cyan-400" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
