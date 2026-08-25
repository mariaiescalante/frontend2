'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTranslation } from '../../context/language-context'
import { useLandingContent } from '../../lib/use-landing-content'

const hidden = { opacity: 0, y: 24 }
const visible = { opacity: 1, y: 0 }
const ease = 'easeOut' as const

export function NosotrosSection() {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()
  const aboutData = locale === 'es' ? content.about : null
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleClick = (idx: number) => {
    setActiveIndex(idx)
  }

  return (
    <section
      id="nosotros"
      ref={ref}
      className="scroll-mt-24 border-b border-slate-200 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Encabezado Superior ───────────────────────────── */}
        <motion.div
          initial={hidden}
          animate={inView ? visible : hidden}
          transition={{ duration: 0.6, ease, delay: 0 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-400">
            {aboutData?.tag || t('nosotros.tag')}
          </p>
          <h2 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {aboutData?.titlePart1 || t('nosotros.title_part1')}{' '}
            <span className="font-serif italic text-[#2563eb]">
              {aboutData?.titleBold || t('nosotros.title_bold')}
            </span>{' '}
            {aboutData?.titlePart2 || t('nosotros.title_part2')}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-500 lg:text-lg">
            {aboutData?.description || t('nosotros.description')}
          </p>
        </motion.div>

        {/* ── Módulo Horizontal Interactivo (Misión & Visión) ───────────────────────────── */}
        <motion.div
          className="mt-12 w-full min-h-104 lg:h-104 border-t border-b border-slate-200 py-4 bg-white"
          initial={hidden}
          animate={inView ? visible : hidden}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 w-full h-full">

            {/* ── Bloque 01 - MISIÓN ───────────────────────────── */}
            <div
              onClick={() => handleClick(0)}
              className={`group relative cursor-pointer p-6 sm:p-8 rounded-none border transition-all duration-500 ease-in-out overflow-hidden flex flex-col justify-between ${activeIndex === 0
                  ? 'md:flex-[2.5] bg-blue-50/40 border-blue-500/40 shadow-xl shadow-blue-500/5'
                  : 'md:flex-1 bg-slate-50 border-slate-200'
                }`}
            >
              {/* Barra de acento Azul TLUX (#2563eb) */}
              <span
                className={`absolute left-0 top-0 h-1 md:h-full md:w-1 bg-[#2563eb] transition-all duration-500 ${activeIndex === 0 ? 'opacity-100' : 'opacity-0'
                  }`}
              />

              {/* Tag + Titular Gigante */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-600">
                    {t('nosotros.mision_tag')}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    01
                  </span>
                </div>

                <h3 className="mt-4 text-4xl font-extrabold tracking-tight text-blue-600 transition-colors duration-300 sm:text-5xl lg:text-7xl">
                  {t('nosotros.mision_title')}
                </h3>

                {/* Previsualización legible cuando está contraída */}
                <AnimatePresence initial={false}>
                  {activeIndex !== 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4">
                        <p className="line-clamp-2 text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                          {t('nosotros.mision_desc')}
                        </p>
                        <span className="mt-3 block font-mono text-[11px] font-bold text-blue-600">
                          {t('nosotros.expandir_hint')}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contenido Completo Revelable cuando está abierta */}
              <AnimatePresence initial={false}>
                {activeIndex === 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-4 border-t border-blue-200/60">
                      <p className="text-base font-medium leading-relaxed text-slate-800 lg:text-lg">
                        {t('nosotros.mision_desc')}
                      </p>

                      <span className="mt-6 block font-mono text-xs font-bold tracking-widest text-blue-600">
                        [ FOCUS: USER SATISFACTION & GROWTH ]
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Bloque 02 - VISIÓN ───────────────────────────── */}
            <div
              onClick={() => handleClick(1)}
              className={`group relative cursor-pointer p-6 sm:p-8 rounded-none border transition-all duration-500 ease-in-out overflow-hidden flex flex-col justify-between ${activeIndex === 1
                  ? 'md:flex-[2.5] bg-blue-50/40 border-blue-500/40 shadow-xl shadow-blue-500/5'
                  : 'md:flex-1 bg-slate-50 border-slate-200'
                }`}
            >
              {/* Barra de acento Azul TLUX (#2563eb) */}
              <span
                className={`absolute right-0 top-0 h-1 md:h-full md:w-1 bg-[#2563eb] transition-all duration-500 ${activeIndex === 1 ? 'opacity-100' : 'opacity-0'
                  }`}
              />

              {/* Tag + Titular Gigante */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-600">
                    {aboutData?.visionTag || t('nosotros.vision_tag')}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    02
                  </span>
                </div>

                <h3 className="mt-4 text-4xl font-extrabold tracking-tight text-blue-600 transition-colors duration-300 sm:text-5xl lg:text-7xl">
                  {aboutData?.visionTitle || t('nosotros.vision_title')}
                </h3>

                {/* Previsualización legible cuando está contraída */}
                <AnimatePresence initial={false}>
                  {activeIndex !== 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4">
                        <p className="line-clamp-2 text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                          {aboutData?.visionDesc || t('nosotros.vision_desc')}
                        </p>
                        <span className="mt-3 block font-mono text-[11px] font-bold text-blue-600">
                          {t('nosotros.expandir_hint')}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contenido Completo Revelable cuando está abierta */}
              <AnimatePresence initial={false}>
                {activeIndex === 1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-4 border-t border-blue-200/60">
                      <p className="text-base font-medium leading-relaxed text-slate-800 lg:text-lg">
                        {t('nosotros.vision_desc')}
                      </p>

                      <span className="mt-6 block font-mono text-xs font-bold tracking-widest text-blue-600">
                        [ TARGET: GLOBAL USER EXPERIENCE ]
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
