'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../../context/language-context'
import { useLandingContent } from '../../lib/use-landing-content'

export function FuncionesSection() {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null)

  const features = locale === 'es' && content.features?.items?.length > 0
    ? content.features.items.map((item, idx) => ({
        title: item.title,
        kicker: item.kicker,
        image: item.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      }))
    : [
        {
          title: t('funciones.f1_title'),
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
          kicker: t('funciones.f1_kicker'),
        },
        {
          title: t('funciones.f2_title'),
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
          kicker: t('funciones.f2_kicker'),
        },
        {
          title: t('funciones.f3_title'),
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
          kicker: t('funciones.f3_kicker'),
        },
        {
          title: t('funciones.f4_title'),
          image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop',
          kicker: t('funciones.f4_kicker'),
        },
        {
          title: t('funciones.f5_title'),
          image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
          kicker: t('funciones.f5_kicker'),
        },
        {
          title: t('funciones.f6_title'),
          image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
          kicker: t('funciones.f6_kicker'),
        },
      ]

  const tag = (locale === 'es' && content.features?.tag) || t('funciones.tag')
  const description = (locale === 'es' && content.features?.description) || t('funciones.description')

  const handleMouseEnter = (i: number) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setActiveItemIndex(i)
    }
  }

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setActiveItemIndex(null)
    }
  }

  const handleClick = (i: number) => {
    setActiveItemIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section id="metodo" className="relative scroll-mt-24 bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">

          {/* ── Columna izquierda: texto ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">{tag}</p>
            <h2 className="font-serif text-4xl leading-none tracking-tighter sm:text-5xl lg:text-6xl">
              {t('funciones.title_part1')}<em className="text-blue-500 font-serif italic">{t('funciones.title_bold1')}</em>{t('funciones.title_part2')}<em className="text-blue-500 font-serif italic">{t('funciones.title_bold2')}</em>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-slate-400">
              {description}
            </p>
          </motion.div>

          {/* ── Columna derecha: lista de opciones con hover flotante original ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative flex flex-col justify-center border-l border-slate-800"
          >
            {features.map((feature, i) => {
              const isSelected = activeItemIndex === i

              return (
                <div
                  key={feature.title}
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  className={`group relative flex flex-col border-b border-slate-800/80 px-5 py-6 transition-all duration-300 cursor-pointer sm:px-8 ${
                    isSelected ? 'bg-slate-900/80 border-slate-700' : 'hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-300 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'border-slate-700 bg-slate-900 text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-400'
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={`font-sans text-base sm:text-lg font-semibold transition-all duration-300 ${
                        isSelected ? 'text-white translate-x-2' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {feature.title}
                    </span>
                    <span
                      className={`ml-auto font-mono text-xs transition-colors ${
                        isSelected ? 'text-blue-400 font-bold' : 'text-slate-600'
                      }`}
                    >
                      [0{i + 1}]
                    </span>
                  </div>

                  {/* ── 1. VISTA PREVIA ORIGINAL EN DESKTOP (Emergente Flotante a la Derecha) ── */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 16 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 16 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-6 z-30 hidden lg:block w-72 h-44 overflow-hidden rounded-xl border border-slate-700/90 bg-slate-900 shadow-2xl shadow-blue-500/20"
                      >
                        <div className="relative h-full w-full">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 block mb-0.5">
                              [ TLUX // 0{i + 1} ]
                            </span>
                            <p className="font-sans text-xs font-semibold text-white truncate">
                              {feature.kicker}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── 2. VISTA PREVIA ADAPTATIVA EN MÓVIL Y TABLET (Desplegable Inline) ── */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden mt-4 lg:hidden"
                      >
                        <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-xl border border-slate-700/90 bg-slate-900 shadow-xl">
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 block mb-0.5">
                              [ TLUX // 0{i + 1} ]
                            </span>
                            <p className="font-sans text-xs sm:text-sm font-semibold text-white truncate">
                              {feature.kicker}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
