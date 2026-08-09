/* eslint-disable @next/next/no-img-element */
'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../context/language-context'

export function ClientsSection() {
  const { t } = useTranslation()
  const brands = [
    { name: 'BDL Cap', src: '/BDL-Cap.webp' },
    { name: 'Elizabeth Costa', src: '/Elizabeth-Costa-Top-Real-Estate-Agent-Doral-logo-fondo-nergo.webp' },
    { name: 'Forget Me Not', src: '/Forget-me-not.webp' },
    { name: 'Maraka', src: '/Maraka.webp' },
    { name: 'Open Market', src: '/Open-Market-company.webp' },
    { name: 'Trailvision Optics', src: '/Trailvision-Optics.webp' },
    { name: 'Vistalite', src: '/Vistalite_color-version.webp' },
  ]
  const marquee = [...brands, ...brands, ...brands, ...brands]

  return (
    <section className="border-b border-slate-800 bg-slate-950 py-12 text-white sm:py-16">
      {/* ── Encabezado con efecto Fade-Up Suave & Pausado ── */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8"
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-blue-500">{t('clients.tag')}</p>
        <h2 className="font-serif text-3xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t('clients.title_part1')}<em className="font-serif italic text-blue-500">{t('clients.title_bold1')}</em>{t('clients.title_part2')}<em className="font-serif italic text-blue-500">{t('clients.title_bold2')}</em>{t('clients.title_part3')}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{t('clients.description')}</p>
      </motion.div>

      {/* ── Carrusel de Marcas con efecto Fade-Up Suave y Retraso Escalonado ── */}
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="mx-auto mt-10 max-w-7xl px-5 sm:px-8"
      >
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-linear-to-r from-slate-950 to-transparent sm:w-36" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-linear-to-l from-slate-950 to-transparent sm:w-36" />
          <div className="animate-marquee flex items-center gap-6 sm:gap-8">
            {marquee.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="group relative flex h-24 sm:h-28 w-52 sm:w-64 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 sm:p-3 shadow-md shadow-white/5 transition-all duration-300 ease-out hover:scale-105 hover:z-20 hover:shadow-2xl hover:shadow-blue-500/20 transform-gpu"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain pointer-events-none transform-gpu"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
