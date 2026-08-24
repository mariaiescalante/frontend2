'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ChevronDown, MessageSquare, ArrowUpRight, HelpCircle } from 'lucide-react'
import { useTranslation } from '../../context/language-context'
import { fetchPublicFaqs, FaqItem, FaqCategoryItem } from '../../lib/faq-service'
import { useLandingContent } from '../../lib/use-landing-content'
import { trackLeadInteraction } from '../../lib/lead-tracker'

interface FaqViewProps {
  initialLocale?: string
  initialFaqs?: FaqItem[]
  initialCategories?: FaqCategoryItem[]
}

export function FaqView({ initialFaqs = [], initialCategories = [] }: FaqViewProps) {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()

  const [items, setItems] = useState<FaqItem[]>(initialFaqs)
  const [categories, setCategories] = useState<FaqCategoryItem[]>(initialCategories)
  const [isLoading, setIsLoading] = useState<boolean>(initialFaqs.length === 0)

  const [activeCategory, setActiveCategory] = useState<string>('todas')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [openItemId, setOpenItemId] = useState<string | null>(null)

  // Sincronizar estado inicial o cargar dinámicamente si no vino del servidor
  useEffect(() => {
    if (initialFaqs.length > 0) {
      setItems(initialFaqs)
      setCategories(initialCategories)
      if (!openItemId) setOpenItemId(initialFaqs[0].id)
      setIsLoading(false)
      return
    }

    async function loadDynamicFaqs() {
      try {
        const { items: fetchedItems, categories: fetchedCats } = await fetchPublicFaqs(locale)
        setItems(fetchedItems)
        setCategories(fetchedCats)
        if (fetchedItems.length > 0 && !openItemId) {
          setOpenItemId(fetchedItems[0].id)
        }
      } catch (err) {
        console.error('[FAQ_VIEW] Error al cargar FAQs desde MySQL:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadDynamicFaqs()
  }, [initialFaqs, initialCategories, locale])

  const toggleItem = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'todas' || item.categoryId === activeCategory
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [items, activeCategory, searchQuery])

  const leftColItems = useMemo(
    () => filteredItems.filter((_, idx) => idx % 2 === 0),
    [filteredItems]
  )

  const rightColItems = useMemo(
    () => filteredItems.filter((_, idx) => idx % 2 === 1),
    [filteredItems]
  )

  // Textos dinámicos FAQ del CMS con fallback
  const faqHeroTag = (locale === 'es' && content.faq?.heroTag) || t('faq.hero_tag') || '[ 01 // PREGUNTAS_FRECUENTES ]'
  const faqHeroBadge = (locale === 'es' && content.faq?.heroBadge) || t('faq.hero_badge') || 'CENTRO DE AYUDA & SOPORTE TÉCNICO'
  const faqHeroTitlePart1 = (locale === 'es' && content.faq?.heroTitlePart1) || t('faq.hero_title_1') || 'Preguntas '
  const faqHeroTitleItalic = (locale === 'es' && content.faq?.heroTitleItalic) || t('faq.hero_title_italic') || 'Frecuentes.'
  const faqHeroDescription = (locale === 'es' && content.faq?.heroDescription) || t('faq.hero_description') || 'Respuestas oficiales registradas en la base de datos MySQL desde nuestro Panel CMS.'

  return (
    <div className="w-full bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* ── 1. HERO / ENCABEZADO DEL FAQ (SLATE-950 IDÉNTICO AL BLOG) ── */}
      <section className="w-full bg-slate-950 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-slate-800 pb-12">
            <div className="max-w-3xl space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-teal-400 font-semibold"
              >
                <HelpCircle className="size-4 text-teal-400" />
                <span>{faqHeroBadge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
              >
                {faqHeroTitlePart1}
                <span className="font-serif italic font-normal text-blue-500">
                  {faqHeroTitleItalic}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-sans text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl"
              >
                {faqHeroDescription}
              </motion.p>
            </div>

            {/* Contador de preguntas en tiempo real */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 rounded-none border border-slate-800 bg-slate-900/60 p-6 shrink-0 shadow-lg"
            >
              <div className="flex size-14 items-center justify-center border border-slate-700 bg-slate-950 font-mono text-2xl font-black text-blue-500">
                {items.length < 10 ? `0${items.length}` : items.length}
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
                  ARTÍCULOS FAQ MYSQL
                </p>
                <p className="font-sans text-sm text-slate-200 font-semibold">
                  Actualizado en tiempo real
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── BARRA DE FILTROS POR CATEGORÍA Y BUSCADOR EN TIEMPO REAL ── */}
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Categorías Dinámicas de MySQL */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-none border uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Input de Búsqueda */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar preguntas o respuestas..."
                className="w-full h-11 pl-10 pr-10 rounded-none border border-slate-800 bg-slate-900 text-xs font-mono text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ACORDEÓN DE PREGUNTAS FRECUENTES (FONDO BLANCO LIMPIO) ── */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 font-mono text-xs text-blue-600 font-bold">
                <div className="size-4 border-2 border-blue-600 border-t-transparent animate-spin" />
                <span>[ CARGANDO PREGUNTAS DESDE MYSQL... ]</span>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="border border-dashed border-slate-200 bg-slate-50 p-12 text-center rounded-none">
              <p className="font-mono text-sm uppercase text-slate-600 font-bold">
                [ NO SE ENCONTRARON PREGUNTAS QUE COINCIDAN ]
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Intenta con otra palabra clave o selecciona otra categoría.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-start">
              {/* Columna Izquierda */}
              <div className="flex flex-col gap-4">
                {leftColItems.map((faq) => {
                  const isOpen = openItemId === faq.id
                  return (
                    <div
                      key={faq.id}
                      className={`border transition-all duration-200 rounded-none ${
                        isOpen
                          ? 'border-blue-600/60 bg-white shadow-lg'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md shadow-xs'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="flex w-full items-center justify-between gap-4 p-6 text-left cursor-pointer"
                      >
                        <div className="flex flex-col gap-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                            {faq.categoryLabel}
                          </span>
                          <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-slate-500 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-blue-600 border-blue-600/30 bg-blue-50/50' : ''
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
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Columna Derecha */}
              <div className="flex flex-col gap-4">
                {rightColItems.map((faq) => {
                  const isOpen = openItemId === faq.id
                  return (
                    <div
                      key={faq.id}
                      className={`border transition-all duration-200 rounded-none ${
                        isOpen
                          ? 'border-blue-600/60 bg-white shadow-lg'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md shadow-xs'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="flex w-full items-center justify-between gap-4 p-6 text-left cursor-pointer"
                      >
                        <div className="flex flex-col gap-2">
                          <span className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                            {faq.categoryLabel}
                          </span>
                          <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-slate-500 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-blue-600 border-blue-600/30 bg-blue-50/50' : ''
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
                            className="overflow-hidden"
                          >
                            <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CTA FOOTER BANNER CLARO ── */}
      <section className="border-t border-slate-200 bg-slate-50/80 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="border border-slate-200 bg-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 rounded-none shadow-lg">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600">
                [ ¿TIENES MÁS PREGUNTAS? ]
              </span>
              <h2 className="font-sans text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Estamos listos para analizar tu proyecto.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Agenda una consulta técnica con nuestros especialistas y recibe una propuesta de arquitectura a medida.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="mailto:hola@tlux.studio"
                onClick={() => trackLeadInteraction('EMAIL', 'FAQ CTA Correo Directo')}
                className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all rounded-none shadow-xs"
              >
                <span>CORREO DIRECTO</span>
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=573203249742&text=Hola%2C%20tengo%20preguntas%20sobre%20sus%20servicios%20de%20tecnolog%C3%ADa."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLeadInteraction('WHATSAPP', 'FAQ CTA WhatsApp')}
                className="inline-flex items-center justify-center gap-2 border border-blue-600 bg-blue-600 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700 transition-all rounded-none shadow-md shadow-blue-600/20"
              >
                <span>HABLEMOS POR WHATSAPP</span>
                <MessageSquare className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
