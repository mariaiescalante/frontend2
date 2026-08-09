'use client'

import { useState } from 'react'
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    rating: 5,
    categoryTag: '[ DESARROLLO WEB ]',
    comment: 'Quedé impresionado con el trabajo. Entregaron el sitio web exactamente en la fecha acordada y la velocidad de carga mejoró muchísimo. Muy recomendados.',
    date: 'Enero 2026',
    avatarInitial: 'CM',
    accentColor: '#2563eb',
  },
  {
    id: '2',
    name: 'Valeria Sotomayor',
    rating: 5,
    categoryTag: '[ DISEÑO & EXPERIENCIA ]',
    comment: 'Atención de primera. Entendieron exactamente lo que buscábamos desde la primera reunión y supieron plasmar la idea a la perfección.',
    date: 'Diciembre 2025',
    avatarInitial: 'VS',
    accentColor: '#0d9488',
  },
  {
    id: '3',
    name: 'Andrés Guarch',
    rating: 5,
    categoryTag: '[ REDISEÑO COMPLETO ]',
    comment: 'Buscábamos un rediseño completo y el resultado superó nuestras expectativas. La experiencia para nuestros usuarios es mucho más fluida ahora.',
    date: 'Noviembre 2025',
    avatarInitial: 'AG',
    accentColor: '#4f46e5',
  },
  {
    id: '4',
    name: 'Elena Rostova',
    rating: 5,
    categoryTag: '[ OPTIMIZACIÓN WEB ]',
    comment: 'Excelente servicio. Nos ayudaron a optimizar la estructura de nuestras páginas y el sitio responde súper rápido tanto en móviles como en laptop.',
    date: 'Febrero 2026',
    avatarInitial: 'ER',
    accentColor: '#2563eb',
  },
  {
    id: '5',
    name: 'Mateo Benítez',
    rating: 5,
    categoryTag: '[ DESARROLLO A MEDIDA ]',
    comment: 'Muy profesionales y dedicados. Resolvieron cada detalle técnico que les pedimos y la comunicación durante todo el proceso fue impecable.',
    date: 'Enero 2026',
    avatarInitial: 'MB',
    accentColor: '#059669',
  },
  {
    id: '6',
    name: 'Sofia Costa',
    rating: 5,
    categoryTag: '[ IDENTIDAD DIGITAL ]',
    comment: 'Un trabajo impecable. La estética de nuestro sitio web se ve seria y elegante, justo lo que queríamos para proyectar confianza a nuestros clientes.',
    date: 'Febrero 2026',
    avatarInitial: 'SC',
    accentColor: '#d97706',
  },
  {
    id: '7',
    name: 'Lucía Fernández',
    rating: 5,
    categoryTag: '[ NAVEGACIÓN & SOPORTE ]',
    comment: 'Súper atentos a cada requerimiento. Hicieron la web fácil de navegar para nuestros usuarios y el soporte posterior ha sido de gran ayuda.',
    date: 'Febrero 2026',
    avatarInitial: 'LF',
    accentColor: '#9333ea',
  },
  {
    id: '8',
    name: 'Javier Morales',
    rating: 5,
    categoryTag: '[ PLATAFORMA DIGITAL ]',
    comment: 'Cumplieron con todo lo prometido. La plataforma quedó rápida, moderna y sin errores. Volvería a trabajar con ellos sin ninguna duda.',
    date: 'Enero 2026',
    avatarInitial: 'JM',
    accentColor: '#0284c7',
  },
  {
    id: '9',
    name: 'Martina Bianchi',
    rating: 5,
    categoryTag: '[ ADAPTACIÓN MÓVIL ]',
    comment: 'Increíble trabajo de desarrollo. El diseño quedó muy limpio, los efectos se ven geniales y la adaptación a teléfonos celulares funciona perfecto.',
    date: 'Febrero 2026',
    avatarInitial: 'MB',
    accentColor: '#e11d48',
  },
]

export function RatingsSection() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  const itemsPerPage = 3
  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage)

  const handleNext = () => {
    setDirection(1)
    setPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrev = () => {
    setDirection(-1)
    setPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const visibleTestimonials = TESTIMONIALS.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  )

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
              [ 01.1 / REPUTACIÓN & OPINIONES ]
            </p>
            <h2 className="mt-4 font-serif text-4xl font-normal leading-none tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl">
              Lo que dicen nuestros <em className="text-blue-600 font-serif italic">clientes</em>.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              La satisfacción de quienes confían en nosotros se refleja en su experiencia directa, atención dedicada y resultados reales.
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
                / 5.0 RATING
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
                <span>Opiniones de Clientes Reales</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 2. BARRA DE CONTROL CON BOTONES DE NAVEGACIÓN Y FLECHAS A LOS LADOS ───────────────────────────── */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>MOSTRANDO {page * itemsPerPage + 1} - {Math.min((page + 1) * itemsPerPage, TESTIMONIALS.length)} DE {TESTIMONIALS.length} RESEÑAS</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-blue-600 border border-slate-200">
              [ PÁGINA 0{page + 1} / 0{totalPages} ]
            </span>
          </div>

          {/* Botones de Flechas (Izquierda & Derecha) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Página anterior"
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
                    setDirection(idx > page ? 1 : -1)
                    setPage(idx)
                  }}
                  aria-label={`Ir a página ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${page === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Página siguiente"
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* ── 3. MOSTRAR 3 TARJETAS A LA VEZ CON FADE-IN DURADERO + EFECTO DE BRINCO SECUENCIAL (UNA POR UNA) ───────────────────────────── */}
        <div className="relative mt-8 min-height: 340px;">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleTestimonials.map((item, cardIdx) => (
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

                    {/* Fecha */}
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
