'use client'

import { useState } from 'react'
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../../context/language-context'
import type { Locale } from '../../context/language-context'
import { useLandingContent } from '../../lib/use-landing-content'

interface Testimonial {
  id: string
  name: string
  rating: number
  categoryTag: string
  comment: string
  date: string
  avatarInitial: string
  accentColor: string
}

function formatTestimonialDate(rawDate: string, loc: Locale) {
  if (!rawDate) return '2026'
  if (loc === 'es') return rawDate
  const MONTHS_EN: Record<string, string> = {
    enero: 'January', febrero: 'February', marzo: 'March', abril: 'April',
    mayo: 'May', junio: 'June', julio: 'July', agosto: 'August',
    septiembre: 'September', octubre: 'October', noviembre: 'November', diciembre: 'December'
  }
  const MONTHS_PT: Record<string, string> = {
    enero: 'Janeiro', febrero: 'Fevereiro', marzo: 'Março', abril: 'Abril',
    mayo: 'Maio', junio: 'Junho', julio: 'Julho', agosto: 'Agosto',
    septiembre: 'Setembro', octubre: 'Outubro', noviembre: 'Novembro', diciembre: 'Dezembro'
  }
  const dict = loc.startsWith('pt') ? MONTHS_PT : MONTHS_EN
  return rawDate.replace(/(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/gi, (m) => dict[m.toLowerCase()] || m)
}

function formatTestimonialTag(rawTag: string, loc: Locale) {
  if (!rawTag) return loc === 'es' ? '[ CLIENTE TLUX ]' : loc === 'pt' ? '[ CLIENTE TLUX ]' : '[ TLUX CLIENT ]'
  if (loc === 'es') return rawTag
  if (loc === 'en') {
    return rawTag
      .replace('CLIENTE TLUX', 'TLUX CLIENT')
      .replace('DESARROLLO WEB', 'WEB DEVELOPMENT')
      .replace('DISEÑO & EXPERIENCIA', 'DESIGN & EXPERIENCE')
      .replace('REDISEÑO COMPLETO', 'COMPLETE REDESIGN')
      .replace('OPTIMIZACIÓN WEB', 'WEB OPTIMIZATION')
      .replace('DESARROLLO A MEDIDA', 'CUSTOM DEVELOPMENT')
      .replace('IDENTIDAD DIGITAL', 'DIGITAL IDENTITY')
      .replace('NAVEGACIÓN & SOPORTE', 'NAVIGATION & SUPPORT')
      .replace('PLATAFORMA DIGITAL', 'DIGITAL PLATFORM')
      .replace('RESPONSIVE MÓVIL', 'MOBILE RESPONSIVENESS')
      .replace('ADAPTACIÓN MÓVIL', 'MOBILE RESPONSIVENESS')
  }
  if (loc.startsWith('pt')) {
    return rawTag
      .replace('DESARROLLO WEB', 'DESENVOLVIMENTO WEB')
      .replace('DISEÑO & EXPERIENCIA', 'DESIGN & EXPERIÊNCIA')
      .replace('REDISEÑO COMPLETO', 'REDESIGN COMPLETO')
      .replace('OPTIMIZACIÓN WEB', 'OTIMIZAÇÃO WEB')
      .replace('DESARROLLO A MEDIDA', 'DESENVOLVIMENTO SOB MEDIDA')
      .replace('IDENTIDAD DIGITAL', 'IDENTIDADE DIGITAL')
      .replace('NAVEGACIÓN & SOPORTE', 'NAVEGAÇÃO & SUPORTE')
      .replace('PLATAFORMA DIGITAL', 'PLATAFORMA DIGITAL')
      .replace('RESPONSIVE MÓVIL', 'RESPONSIVIDADE MOBILE')
      .replace('ADAPTACIÓN MÓVIL', 'RESPONSIVIDADE MOBILE')
  }
  return rawTag
}

export function RatingsSection() {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()
  const ratingsDataContent = content.ratings

  const BASE_DATES = [
    'Enero 2026',
    'Diciembre 2025',
    'Noviembre 2025',
    'Febrero 2026',
    'Enero 2026',
    'Diciembre 2025',
    'Febrero 2026',
    'Enero 2026',
    'Febrero 2026',
  ]

  const BASE_TAGS = [
    '[ DESARROLLO WEB ]',
    '[ DISEÑO & EXPERIENCIA ]',
    '[ REDISEÑO COMPLETO ]',
    '[ OPTIMIZACIÓN WEB ]',
    '[ DESARROLLO A MEDIDA ]',
    '[ IDENTIDAD DIGITAL ]',
    '[ NAVEGACIÓN & SOPORTE ]',
    '[ PLATAFORMA DIGITAL ]',
    '[ RESPONSIVE MÓVIL ]',
  ]

  const TESTIMONIALS_FALLBACK: Testimonial[] = [
    { id: '1', name: 'Carlos Mendoza', rating: 5, categoryTag: t('ratings.t1_tag'), comment: t('ratings.t1_comment'), date: formatTestimonialDate('Enero 2026', locale), avatarInitial: 'CM', accentColor: '#2563eb' },
    { id: '2', name: 'Valeria Sotomayor', rating: 5, categoryTag: t('ratings.t2_tag'), comment: t('ratings.t2_comment'), date: formatTestimonialDate('Diciembre 2025', locale), avatarInitial: 'VS', accentColor: '#0d9488' },
    { id: '3', name: 'Andrés Guarch', rating: 5, categoryTag: t('ratings.t3_tag'), comment: t('ratings.t3_comment'), date: formatTestimonialDate('Noviembre 2025', locale), avatarInitial: 'AG', accentColor: '#4f46e5' },
    { id: '4', name: 'Elena Rostova', rating: 5, categoryTag: t('ratings.t4_tag'), comment: t('ratings.t4_comment'), date: formatTestimonialDate('Febrero 2026', locale), avatarInitial: 'ER', accentColor: '#2563eb' },
    { id: '5', name: 'Mateo Benítez', rating: 5, categoryTag: t('ratings.t5_tag'), comment: t('ratings.t5_comment'), date: formatTestimonialDate('Enero 2026', locale), avatarInitial: 'MB', accentColor: '#059669' },
    { id: '6', name: 'Sofia Alarcón', rating: 5, categoryTag: t('ratings.t6_tag'), comment: t('ratings.t6_comment'), date: formatTestimonialDate('Diciembre 2025', locale), avatarInitial: 'SA', accentColor: '#d97706' },
    { id: '7', name: 'Gabriel Torres', rating: 5, categoryTag: t('ratings.t7_tag'), comment: t('ratings.t7_comment'), date: formatTestimonialDate('Febrero 2026', locale), avatarInitial: 'GT', accentColor: '#2563eb' },
    { id: '8', name: 'Lucía Fernández', rating: 5, categoryTag: t('ratings.t8_tag'), comment: t('ratings.t8_comment'), date: formatTestimonialDate('Enero 2026', locale), avatarInitial: 'LF', accentColor: '#4f46e5' },
    { id: '9', name: 'Diego Ramírez', rating: 5, categoryTag: t('ratings.t9_tag'), comment: t('ratings.t9_comment'), date: formatTestimonialDate('Febrero 2026', locale), avatarInitial: 'DR', accentColor: '#0d9488' },
  ]

  const ACCENT_COLORS = ['#2563eb', '#0d9488', '#4f46e5', '#059669', '#d97706', '#6366f1']

  const activeTestimonials: Testimonial[] = Array.isArray(ratingsDataContent?.items) && ratingsDataContent.items.length > 0
    ? ratingsDataContent.items.map((it: any, idx: number) => {
        const name = it.clientName || it.name || 'Cliente TLUX'
        const initials = name.split(' ').map((n: string) => n[0]).filter(Boolean).join('').slice(0, 2).toUpperCase() || 'TL'
        
        // Si hay traducción en el diccionario de idiomas para el slot base, usarla cuando locale !== 'es'
        const langKey = locale.startsWith('pt') ? 'pt' : (locale === 'en' ? 'en' : 'es')
        const transObj = it.translations?.[langKey] || it.translations?.[locale]

        const dictComment = locale !== 'es'
          ? (transObj?.comment || (t(`ratings.t${idx + 1}_comment`) !== `ratings.t${idx + 1}_comment` ? t(`ratings.t${idx + 1}_comment`) : null))
          : null
        const dictTag = locale !== 'es'
          ? (transObj?.tag || (t(`ratings.t${idx + 1}_tag`) !== `ratings.t${idx + 1}_tag` ? t(`ratings.t${idx + 1}_tag`) : null))
          : null

        const rawTag = dictTag || it.tag || BASE_TAGS[idx % BASE_TAGS.length] || '[ CLIENTE TLUX ]'
        const finalTag = formatTestimonialTag(rawTag, locale)
        const rawDate = it.date || BASE_DATES[idx % BASE_DATES.length] || 'Enero 2026'
        const finalDate = formatTestimonialDate(rawDate, locale)

        return {
          id: it.id || `r-${idx + 1}`,
          name,
          rating: typeof it.rating === 'number' ? it.rating : 5,
          categoryTag: finalTag,
          comment: dictComment || it.comment || '',
          date: finalDate,
          avatarInitial: initials,
          accentColor: ACCENT_COLORS[idx % ACCENT_COLORS.length]
        }
      })
    : TESTIMONIALS_FALLBACK

  const [page, setPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.max(1, Math.ceil(activeTestimonials.length / itemsPerPage))

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const displayedTestimonials = activeTestimonials.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  )

  const sectionTag = (locale === 'es' && ratingsDataContent?.tag) || t('ratings.tag')
  const titlePart1 = (locale === 'es' && ratingsDataContent?.titlePart1) || t('ratings.title_part1')
  const titleBold = (locale === 'es' && ratingsDataContent?.titleBold) || t('ratings.title_bold')
  const sectionDesc = (locale === 'es' && ratingsDataContent?.description) || t('ratings.description')

  return (
    <section id="opiniones" className="scroll-mt-24 border-b border-slate-200 bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* ── 1. ENCABEZADO DE SECCIÓN Y RESUMEN GENERAL DE VALORACIÓN ───────────────────────────── */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-slate-200 pb-12 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
              {sectionTag}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-normal leading-none tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl">
              {titlePart1}<em className="text-blue-600 font-serif italic">{titleBold}</em>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {sectionDesc}
            </p>
          </motion.div>

          {/* Tarjeta de Resumen General de Estrellas (Score Card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-xs shrink-0"
          >
            <div className="flex flex-col items-center justify-center border-r border-slate-200 pr-5">
              <span className="font-sans text-4xl font-bold tracking-tight text-slate-900">
                4.98
              </span>
              <span className="font-mono text-xs font-semibold text-slate-500">
                {t('ratings.rating_score')}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-slate-600">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{t('ratings.verified_label')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 2. BARRA DE CONTROL CON BOTONES DE NAVEGACIÓN Y FLECHAS A LOS LADOS ───────────────────────────── */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{t('ratings.showing_label')} {page * itemsPerPage + 1} - {Math.min((page + 1) * itemsPerPage, activeTestimonials.length)} {t('ratings.of_label')} {activeTestimonials.length} {t('ratings.reviews_label')}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-blue-600 border border-slate-200">
              [ {t('ratings.page_label')} 0{page + 1} / 0{totalPages} ]
            </span>
          </div>

          {/* Botones de Flechas (Izquierda & Derecha) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label={locale === 'es' ? 'Página anterior' : locale === 'pt' ? 'Página anterior' : 'Previous page'}
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Indicadores de Puntos de Página */}
            <div className="flex items-center gap-1.5 px-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPage(idx)
                  }}
                  aria-label={`${t('ratings.page_label') || 'Page'} ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${page === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label={locale === 'es' ? 'Página siguiente' : locale === 'pt' ? 'Próxima página' : 'Next page'}
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* ── 3. MOSTRAR 3 TARJETAS A LA VEZ CON FADE-IN DURADERO + EFECTO DE BRINCO SECUENCIAL (UNA POR UNA) ───────────────────────────── */}
        <div className="relative mt-8" style={{ minHeight: '340px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {displayedTestimonials.map((item, cardIdx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: 24 }}
                  whileInView={{
                    opacity: 1,
                    scale: [0.95, 1.03, 1],
                    y: [24, -8, 0],
                  }}
                  viewport={{ once: true, margin: '-60px' }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{
                    opacity: { duration: 0.5, delay: cardIdx * 0.22 },
                    scale: { duration: 0.5, delay: cardIdx * 0.22, ease: 'easeOut' },
                    y: { duration: 0.5, delay: cardIdx * 0.22, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Parte Superior: Tag & Estrellas & Icono de Cita */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
                        {item.categoryTag}
                      </span>
                      <Quote className="size-6 text-slate-200 group-hover:text-blue-200 transition-colors duration-300" />
                    </div>

                    {/* Calificación en Estrellas Doradas */}
                    <div className="mt-4 flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, starIndex) => (
                        <Star key={starIndex} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Comentario del Usuario */}
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 font-normal">
                      &ldquo;{item.comment}&rdquo;
                    </p>
                  </div>

                  {/* Parte Inferior: ÚNICAMENTE EL NOMBRE DEL USUARIO & Fecha */}
                  <div className="mt-8 border-t border-slate-100 pt-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Avatar con Iniciales Nítidas */}
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: item.accentColor }}
                      >
                        {item.avatarInitial}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-sans text-sm font-bold text-slate-900">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Fecha Traducida */}
                    <span className="font-mono text-xs font-semibold text-slate-400 shrink-0">
                      {item.date}
                    </span>
                  </div>

                  {/* Borde inferior sutil al hacer Hover */}
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
