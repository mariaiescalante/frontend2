'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { CustomSectionItem } from '../../types/landing'

export function CustomSection({ section }: { section: CustomSectionItem }) {
  if (!section) return null

  const hasImage = Boolean(section.imageUrl)
  const hasCta = Boolean(section.ctaText)

  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-b border-slate-800 bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={`grid gap-12 lg:gap-16 items-center ${
            hasImage ? 'lg:grid-cols-2' : 'max-w-4xl'
          }`}
        >
          {/* ── Columna de Texto ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {section.tag && (
              <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-teal-400">
                {section.tag}
              </p>
            )}

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white">
              {section.titlePart1}
              {section.titleBold && (
                <em className="font-serif italic text-blue-500 font-normal">
                  {section.titleBold}
                </em>
              )}
              {section.titlePart2}
            </h2>

            {section.description && (
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                {section.description}
              </p>
            )}

            {section.content && (
              <div className="pt-2 text-sm sm:text-base leading-relaxed text-slate-400 whitespace-pre-line border-l-2 border-slate-800 pl-4">
                {section.content}
              </div>
            )}

            {hasCta && (
              <div className="pt-4">
                <a
                  href={section.ctaUrl || '#contacto'}
                  className="inline-flex items-center gap-3 border border-blue-600 bg-blue-600 px-7 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-blue-700 transition-all rounded-none shadow-lg shadow-blue-950/50"
                >
                  <span>{section.ctaText}</span>
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            )}
          </motion.div>

          {/* ── Columna de Imagen (Opcional) ── */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative aspect-video lg:aspect-4/3 w-full overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl"
            >
              <img
                src={section.imageUrl}
                alt={section.titlePart1 || 'Sección'}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
