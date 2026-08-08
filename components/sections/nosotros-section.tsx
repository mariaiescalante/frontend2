'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const hidden = { opacity: 0, y: 24 }
const visible = { opacity: 1, y: 0 }
const ease = 'easeOut' as const

export function NosotrosSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="estudio"
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
            [ 03 // NOSOTROS ]
          </p>
          <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 lg:text-5xl">
            Impulsamos tu negocio,{' '}
            <span className="font-serif italic text-[#2563eb]">
              revolucionando
            </span>{' '}
            la experiencia de usuario.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-500 lg:text-lg">
            En TLUX, transformamos la interacción digital con soluciones tecnológicas innovadoras que ponen al usuario en el centro. Nos enfocamos en crear experiencias intuitivas y accesibles que potencian el crecimiento de tu empresa, mientras nos posicionamos como líderes en la evolución de la tecnología para un mundo más conectado y eficiente.
          </p>
        </motion.div>

        {/* ── Módulo Horizontal Interactivo (Accordion Reveal) ───────────────────────────── */}
        <motion.div
          className="mt-12 w-full h-[540px] sm:h-[480px] lg:h-[420px] border-t border-b border-slate-200 py-4 bg-white overflow-hidden"
          initial={hidden}
          animate={inView ? visible : hidden}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 w-full h-full">

            {/* ── Bloque 01 - MISIÓN (Expansión hacia la Derecha) ───────────────────────────── */}
            <div
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative cursor-pointer p-6 sm:p-8 rounded-none border transition-all duration-500 ease-in-out overflow-hidden flex flex-col justify-between h-full ${
                hoveredIndex === 0
                  ? 'lg:flex-[2.5] bg-blue-50/40 border-blue-500/40 shadow-xl shadow-blue-500/5'
                  : 'flex-1 bg-slate-50 border-slate-200'
              }`}
            >
              {/* Barra de acento 3px Azul TLUX (#2563eb) */}
              <span
                className={`absolute left-0 top-0 h-1 lg:h-full lg:w-1 bg-[#2563eb] transition-all duration-500 ${
                  hoveredIndex === 0 ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Tag + Titular Gigante */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-600">
                    [ 01 // MISIÓN ]
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    01
                  </span>
                </div>

                <h3 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-300 transition-colors duration-300 group-hover:text-blue-600 lg:text-7xl">
                  MISIÓN
                </h3>
              </div>

              {/* Contenido Revelable (Texto literal + Badge) */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  hoveredIndex === 0
                    ? 'opacity-100 max-h-96 translate-y-0 mt-6'
                    : 'opacity-0 max-h-0 overflow-hidden translate-y-4 lg:opacity-0'
                }`}
              >
                <p className="text-base font-medium leading-relaxed text-slate-800 lg:text-lg">
                  Nuestro objetivo es empoderar a las empresas para que ofrezcan experiencias digitales excepcionales, enfocándonos en la facilidad de uso, la accesibilidad y la satisfacción del cliente. Buscamos ser el puente entre la tecnología y las personas, creando interacciones fluidas y memorables que impulsen el crecimiento y la lealtad.
                </p>

                <span className="mt-6 block font-mono text-xs font-bold tracking-widest text-blue-600">
                  [ FOCUS: USER SATISFACTION & GROWTH ]
                </span>
              </div>
            </div>

            {/* ── Bloque 02 - VISIÓN (Expansión hacia la Izquierda) ───────────────────────────── */}
            <div
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative cursor-pointer p-6 sm:p-8 rounded-none border transition-all duration-500 ease-in-out overflow-hidden flex flex-col justify-between h-full ${
                hoveredIndex === 1
                  ? 'lg:flex-[2.5] bg-blue-50/40 border-blue-500/40 shadow-xl shadow-blue-500/5'
                  : 'flex-1 bg-slate-50 border-slate-200'
              }`}
            >
              {/* Barra de acento 3px Azul TLUX (#2563eb) */}
              <span
                className={`absolute right-0 top-0 h-1 lg:h-full lg:w-1 bg-[#2563eb] transition-all duration-500 ${
                  hoveredIndex === 1 ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Tag + Titular Gigante */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-600">
                    [ 02 // VISIÓN ]
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    02
                  </span>
                </div>

                <h3 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-300 transition-colors duration-300 group-hover:text-blue-600 lg:text-7xl">
                  VISIÓN
                </h3>
              </div>

              {/* Contenido Revelable (Texto literal + Badge) */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  hoveredIndex === 1
                    ? 'opacity-100 max-h-96 translate-y-0 mt-6'
                    : 'opacity-0 max-h-0 overflow-hidden translate-y-4 lg:opacity-0'
                }`}
              >
                <p className="text-base font-medium leading-relaxed text-slate-800 lg:text-lg">
                  Ser la empresa líder en soluciones tecnológicas que redefinen la experiencia de usuario a nivel global. Aspiramos a transformar el mundo digital mediante productos intuitivos y de vanguardia, contribuyendo al éxito de nuestros clientes al facilitar interacciones que superen las expectativas. En TLUX, creemos que la tecnología debe adaptarse a las personas.
                </p>

                <span className="mt-6 block font-mono text-xs font-bold tracking-widest text-blue-600">
                  [ TARGET: GLOBAL USER EXPERIENCE ]
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
