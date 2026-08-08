'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    title: 'Consulta de Optimización Gratuita',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    kicker: 'Auditoría & Estrategia',
  },
  {
    title: 'Desarrollo Full Stack',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    kicker: 'Código & Arquitectura Escalable',
  },
  {
    title: 'Optimización de Contenido',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    kicker: 'UX Writing & Copywriting',
  },
  {
    title: 'Análisis de Sitio Web',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop',
    kicker: 'Performance & Core Web Vitals',
  },
  {
    title: 'Seguimiento y Reporte de Rendimiento',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
    kicker: 'Métricas & Conversión en Tiempo Real',
  },
  {
    title: 'Gestión de Redes Sociales',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    kicker: 'Branding & Presencia Digital',
  },
]

export function FuncionesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="metodo" className="relative scroll-mt-24 bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">

          {/* Columna izquierda: título + descripción */}
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-teal-400">[ 02 / FUNCIONES ]</p>
            <h2 className="font-serif text-5xl leading-[1.0] tracking-[-0.04em] sm:text-6xl">
              Ofrecemos Funciones Importantes para el <em className="text-blue-500">Desarrollo Web</em> y el <em className="text-blue-500">Marketing Digital.</em>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-slate-400">
              En <span className="font-semibold text-white">TLUX</span>, creemos en ofrecer soluciones digitales integrales que mejoren su presencia en línea y generen resultados. Nuestras características principales incluyen:
            </p>
          </div>

          {/* Columna derecha: lista interactiva con imagen alineada a cada fila (Estilo Monolog) */}
          <div className="relative flex flex-col justify-center border-l border-slate-800">
            {features.map((feature, i) => {
              const isHovered = hoveredIndex === i
              return (
                <div
                  key={feature.title}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative flex items-center gap-5 border-b border-slate-800/80 px-5 py-6 transition-all duration-300 cursor-pointer sm:px-8 ${
                    isHovered ? 'bg-slate-900/80 border-slate-700' : 'hover:bg-slate-900/40'
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-300 ${
                      isHovered
                        ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'border-slate-700 bg-slate-900 text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-400'
                    }`}
                  >
                    ✓
                  </span>
                  <span
                    className={`font-sans text-base sm:text-lg font-semibold transition-all duration-300 ${
                      isHovered ? 'text-white translate-x-2' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {feature.title}
                  </span>
                  <span
                    className={`ml-auto font-mono text-xs transition-colors ${
                      isHovered ? 'text-blue-400 font-bold' : 'text-slate-600'
                    }`}
                  >
                    [0{i + 1}]
                  </span>

                  {/* ── Imagen que aparece al costado DERECHO de la fila activa ── */}
                  <AnimatePresence>
                    {isHovered && (
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
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-400 block mb-0.5">
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
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
