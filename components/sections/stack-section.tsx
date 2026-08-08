'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

interface TechTool {
  id: string
  name: string
  categoryTag: string
  categoryName: string
  version: string
  accentColor: string
  description: string
  useCase: string
  performanceMetric: string
  logo: React.ReactNode
}

const TECH_TOOLS: TechTool[] = [
  {
    id: 'angular',
    name: 'Angular',
    categoryTag: '[ DEV_FRAMEWORK ]',
    categoryName: 'Frontend Application Framework',
    version: 'v18.2 Core Architecture',
    accentColor: '#DD0031',
    description: 'Framework enterprise de Google para aplicaciones web progresivas de alta densidad y estado complejo.',
    useCase: 'Plataformas SaaS, dashboards ejecutivos y sistemas de alta escala.',
    performanceMetric: '99.8% Type Safety / Strict Dependency Injection',
    logo: (
      <svg viewBox="0 0 256 272" className="h-8 w-auto transition-transform duration-300">
        <path fill="#DD0031" d="M128 0L0 45.6l19.5 169.5L128 272l108.5-56.9L256 45.6z"/>
        <path fill="#C3002F" d="M128 0v272l108.5-56.9L256 45.6z"/>
        <path fill="#FFFFFF" d="M128 35.5L46.8 218h31.8l16.4-40.9h66l16.4 40.9h31.8zM108.6 150l19.4-48.4 19.4 48.4z"/>
      </svg>
    ),
  },
  {
    id: 'laravel',
    name: 'Laravel',
    categoryTag: '[ DEV_BACKEND ]',
    categoryName: 'Backend & Infrastructure Engine',
    version: 'v11.x REST & GraphQL API',
    accentColor: '#FF2D20',
    description: 'Motor backend de alta velocidad con arquitectura MVC, seguridad criptográfica y colas asíncronas.',
    useCase: 'APIs distribuidas, autenticación OAuth2 y procesamiento masivo de datos.',
    performanceMetric: 'Sub-20ms Response Time / Automated Queue Processing',
    logo: (
      <svg viewBox="0 0 512 512" className="h-8 w-auto transition-transform duration-300">
        <path fill="#FF2D20" d="M485.4 140.7L330.1 51.1c-12.7-7.3-28.5-7.3-41.2 0L133.7 140.7c-12.7 7.3-20.6 20.9-20.6 35.6v179.3c0 14.7 7.8 28.3 20.6 35.6l155.2 89.6c12.7 7.3 28.5 7.3 41.2 0l155.2-89.6c12.7-7.3 20.6-20.9 20.6-35.6V176.3c.1-14.7-7.8-28.3-20.5-35.6zM289.4 87.2l128 73.9-63.5 36.7-128-73.9 63.5-36.7zm-144 83.1l128-73.9 63.5 36.7-128 73.9-63.5-36.7zm16.5 45.2l128 73.9v73.4l-128-73.9v-73.4zm144 220.8l-128-73.9v-45.2l64.5 37.3 63.5-36.7v118.5zm16.5-147.7l63.5-36.7 63.5 36.7-127 73.4v-73.4zm144-45.2v73.4l-63.5 36.7v-73.4l63.5-36.7z"/>
      </svg>
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    categoryTag: '[ E_COMMERCE ]',
    categoryName: 'Global Commerce Ecosystem',
    version: 'Storefront API / Hydrogen',
    accentColor: '#95BF47',
    description: 'Infraestructura global de e-commerce con pasarelas ultra-seguras y optimización de conversión.',
    useCase: 'Tiendas online de alto volumen, checkout sin fricción y ventas globales.',
    performanceMetric: '99.99% Uptime / Global CDN Checkout Acceleration',
    logo: (
      <svg viewBox="0 0 512 512" className="h-8 w-auto transition-transform duration-300">
        <path fill="#95BF47" d="M374.3 118.8c-2.4-1.2-5.4-.5-6.9 1.7l-41.8 61.2-22.3-47.5c-1.3-2.7-4.4-4.1-7.3-3.3l-160 42.7c-2.8.7-4.7 3.3-4.5 6.2l18 238c.3 4.2 3.8 7.4 8 7.4h229.4c4.2 0 7.7-3.2 8-7.4l15-212.8c.2-2.9-1.5-5.6-4.2-6.5l-30.9-8.4zm-142 57.5l17.7 37.8-49 71.8c-1.5 2.2-4.5 2.9-6.9 1.7L154.5 268l77.8-91.7z"/>
        <path fill="#5E8E3E" d="M325.6 181.7l41.8-61.2c1.5-2.2 4.5-2.9 6.9-1.7l30.9 8.4c2.7.9 4.4 3.6 4.2 6.5l-15 212.8c-.3 4.2-3.8 7.4-8 7.4H285l40.6-172.2z"/>
      </svg>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    categoryTag: '[ CMS_PLATFORM ]',
    categoryName: 'Headless Content Management',
    version: 'Custom Engine / Headless REST',
    accentColor: '#21759B',
    description: 'Gestor editorial personalizado con arquitectura sin acoplamiento para máxima velocidad de carga.',
    useCase: 'Portales de contenido masivo, blogs de autoridad e integración multilingüe.',
    performanceMetric: 'Headless Decoupled Architecture / Optimized Caching',
    logo: (
      <svg viewBox="0 0 512 512" className="h-8 w-auto transition-transform duration-300">
        <path fill="#21759B" d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 411.4c-35.3 0-68.3-9.9-96.5-27l63.5-174.1 63.8 174.4c.1.3.2.7.4 1 1.4 3.6 2.9 7 4.6 10.3-11.4 9.9-23.9 15.4-35.8 15.4zm-126.9-46.7C100.5 365 80 313.2 80 256c0-43.2 11.9-83.5 32.5-118.2l76.7 210-60.1 248.9zM256 80c43.2 0 83.5 11.9 118.2 32.5l-33.3 97h-1.5c-11.7-23.7-27.1-40.2-49-40.2-25.2 0-43 20.3-43 42 0 20.1 11.7 37 25.5 53.6l44.3 53.1c16.3 19.5 33.7 44.8 33.7 75.7 0 22.8-8.2 44.5-20.8 62.3L256 80z"/>
      </svg>
    ),
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    categoryTag: '[ ADS_MARKETING ]',
    categoryName: 'Intent-Based Traffic Engine',
    version: 'Smart Bidding & Analytics v4',
    accentColor: '#4285F4',
    description: 'Estrategias de adquisición de alta intención mediante pujas algorítmicas y embudos de búsqueda directa.',
    useCase: 'Captación de leads cualificados, retargeting de intención e inversión optimizada.',
    performanceMetric: 'Real-Time ROAS Tracking / Conversion Rate Optimization',
    logo: (
      <svg viewBox="0 0 512 512" className="h-8 w-auto transition-transform duration-300">
        <path fill="#4285F4" d="M120.5 376.5l112-280c6.6-16.5 24.8-24.8 41.3-18.2 8 3.2 14.5 9.7 17.7 17.7l112 280c7.1 17.7-1.4 37.9-19.1 45-17.7 7.1-37.9-1.4-45-19.1l-25.2-63.1H197.8l-25.2 63.1c-7.1 17.7-27.3 26.2-45 19.1-17.7-7.1-26.2-27.3-19.1-44.5zM224 288h64l-32-80-32 80z"/>
        <path fill="#34A853" d="M437.5 395.6l-112-280c-6.6-16.5-24.8-24.8-41.3-18.2-8 3.2-14.5 9.7-17.7 17.7l-112 280c-7.1 17.7 1.4 37.9 19.1 45 17.7 7.1 37.9-1.4 45-19.1l25.2-63.1h132.4l25.2 63.1c7.1 17.7 27.3 26.2 45 19.1 17.7-7.1-26.2-27.3-19.1-44.5z" opacity="0.3"/>
        <circle cx="390" cy="380" r="32" fill="#FBBC04"/>
      </svg>
    ),
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    categoryTag: '[ SOCIAL_ADS ]',
    categoryName: 'Social Growth & Scale',
    version: 'Meta Conversions API (CAPI)',
    accentColor: '#1877F2',
    description: 'Embudo de conversión social con seguimiento first-party CAPI y prueba social masiva.',
    useCase: 'Escalamiento de marca, campañas creativas de alto impacto y remarketing.',
    performanceMetric: 'Server-Side Event Tracking / First-Party Pixel Match',
    logo: (
      <svg viewBox="0 0 512 512" className="h-8 w-auto transition-transform duration-300">
        <path fill="#1877F2" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.3 482.4 504 379.8 504 256z"/>
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    categoryTag: '[ FRONTEND_UI ]',
    categoryName: 'Component Architecture',
    version: 'v19 Client Runtime',
    accentColor: '#00D8FF',
    description: 'Librería de renderizado reactivo para la creación de componentes interactivos modulares.',
    useCase: 'Interfaces web dinámicas, micro-animaciones e interacciones en tiempo real.',
    performanceMetric: 'Virtual DOM Reconciliation / Concurrent Rendering',
    logo: (
      <svg viewBox="0 0 512 512" className="h-8 w-auto transition-transform duration-300">
        <path fill="#00D8FF" d="M256 216c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 64c-13.2 0-24-10.8-24-24s10.8-24 24-24 24 10.8 24 24-10.8 24-24 24z"/>
        <path fill="#00D8FF" d="M480 256c0-29.3-17.9-57.3-47.8-78.7-29.8-21.3-71.8-37.3-118.2-45.1C295.2 78.4 275.9 32 256 32s-39.2 46.4-58 100.2c-46.4 7.8-88.4 23.8-118.2 45.1C50 198.7 32 226.7 32 256s17.9 57.3 47.8 78.7c29.8 21.3 71.8 37.3 118.2 45.1 18.8 53.8 38.1 100.2 58 100.2s39.2-46.4 58-100.2c46.4-7.8 88.4-23.8 118.2-45.1C462.1 313.3 480 285.3 480 256zm-224 199.1c-15.6-47-32.9-97.4-45.8-144.1 14.5-2.2 29.8-3.5 45.8-3.5s31.3 1.3 45.8 3.5c-12.9 46.7-30.2 97.1-45.8 144.1zM93.3 318.9c-20.7-14.8-33.3-33.6-33.3-52.9s12.6-38.1 33.3-52.9c22.3-15.9 54.3-28.7 91.1-36.2 12.9 46.7 30.2 97.1 45.8 144.1-36.8-7.5-68.8-20.3-91.1-36.2zm232.3 36.2c15.6-47 32.9-97.4 45.8-144.1 36.8 7.5 68.8 20.3 91.1 36.2 20.7 14.8 33.3 33.6 33.3 52.9s-12.6 38.1-33.3 52.9c-22.3 15.9-54.3 28.7-91.1 36.2z"/>
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    categoryTag: '[ WEB_STACK ]',
    categoryName: 'Enterprise Web Framework',
    version: 'App Router / SSR & Edge',
    accentColor: '#14b8a6',
    description: 'Framework híbrido para Next-Gen Web Applications con Server Components y renderizado perimetral.',
    useCase: 'Aplicaciones web modernas, portales SEO de alta velocidad y arquitecturas Jamstack.',
    performanceMetric: '100/100 Lighthouse Performance / Edge Rendering',
    logo: (
      <svg viewBox="0 0 512 512" className="h-8 w-auto transition-transform duration-300">
        <path fill="#000000" d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm112.5 315.6L242.7 194.2v153.4h-35.6V164.4h35.6l125.8 153.4v-153.4h35.6v183.2h-35.6z"/>
      </svg>
    ),
  },
]

export function StackSection() {
  const [selectedTool, setSelectedTool] = useState<TechTool>(TECH_TOOLS[0])

  return (
    <section id="tecnologias" className="relative scroll-mt-24 border-y border-slate-200/80 bg-slate-100/90 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* ── 1. ENCABEZADO AWWWARDS ───────────────────────────── */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold">
              [ 05 // SYSTEM_STACK ]
            </p>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Tecnologías más <span className="font-serif italic text-[#2563eb]">usadas</span>.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Estas son las tecnologías que mayormente implementamos en el desarrollo de nuestros proyectos, aunque contamos con muchas más herramientas a nuestra disposición para adaptarnos a tus necesidades específicas.
            </p>
          </div>
          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 lg:flex">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>[ INFINITE_CARRUSEL // RÁPIDO ]</span>
          </div>
        </div>

        {/* ── 2. CARRUSEL INFINITO EN MOVIMIENTO CONTINUO Y RÁPIDO ───────────────────────────── */}
        <div className="group relative my-10 overflow-hidden border-y border-slate-200 bg-white/80 py-7 select-none shadow-sm">
          {/* Degradados de desvanecimiento sutil */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-slate-100/90 via-slate-100/60 to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-slate-100/90 via-slate-100/60 to-transparent" />

          {/* Cinta Continua del Carrusel con Marquee Animado Hardware-Accelerated */}
          <div className="animate-fast-marquee flex w-max items-center gap-6 py-2 select-none group-hover:[animation-play-state:paused]">
            {[...TECH_TOOLS, ...TECH_TOOLS].map((tool, index) => {
              const isSelected = selectedTool.id === tool.id
              return (
                <button
                  key={`${tool.id}-${index}`}
                  onClick={() => setSelectedTool(tool)}
                  className={`group/card flex shrink-0 cursor-pointer items-center gap-4 rounded-none border px-7 py-4.5 transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-blue-600 bg-white shadow-lg shadow-blue-600/10 ring-2 ring-blue-600/20 translate-y-[-2px]'
                      : 'border-slate-200 bg-white hover:border-blue-500 hover:shadow-md'
                  }`}
                >
                  {/* Trato de Logo */}
                  <div
                    className={`flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'grayscale-0 opacity-100 scale-110'
                        : 'grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-105'
                    }`}
                  >
                    {tool.logo}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                        isSelected ? 'text-blue-600 font-bold' : 'text-slate-400 group-hover/card:text-blue-600'
                      }`}
                    >
                      {tool.categoryTag}
                    </span>
                    <span className="font-mono text-sm font-bold tracking-tight text-slate-900">
                      {tool.name}
                    </span>
                  </div>

                  {/* Badge de Selección al hacer clic */}
                  {isSelected ? (
                    <span className="ml-2 flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-bold text-blue-600 border border-blue-200">
                      <Check className="size-3 text-blue-600" /> SELECCIONADO
                    </span>
                  ) : (
                    <span
                      className="ml-2 h-2 w-2 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: tool.accentColor || '#2563eb' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 3. DETALLE / INSPECTOR TERMINAL REVELADO AL CLIC (TAMAÑO Y FUENTES AMPLIADAS) ───────────────────────────── */}
        <div className="relative overflow-hidden border border-slate-900 bg-slate-950 p-8 text-white shadow-2xl sm:p-10 lg:p-12 rounded-none">
          {/* Barra superior de terminal */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300 font-bold sm:text-sm">
                TERMINAL_INSPECTOR // {selectedTool.categoryTag}
              </span>
            </div>
            <span className="hidden font-mono text-xs uppercase tracking-[0.16em] text-blue-400 font-semibold sm:inline">
              [ INSIGHT_ACTIVO: {selectedTool.name.toUpperCase()} ]
            </span>
          </div>

          {/* Rejilla de detalles de la herramienta SELECCIONADA mediante clic */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.6fr_1.1fr] lg:items-center">
            {/* Columna 1: Nombre & Versión */}
            <div className="flex items-center gap-6 border-b border-slate-800 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
              <div className="flex size-18 sm:size-24 shrink-0 items-center justify-center rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 shadow-inner [&_svg]:h-12 sm:[&_svg]:h-14 [&_svg]:w-auto">
                {selectedTool.logo}
              </div>
              <div>
                <h3 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {selectedTool.name}
                </h3>
                <p className="mt-1.5 font-mono text-sm text-blue-400 font-semibold sm:text-base">
                  {selectedTool.version}
                </p>
              </div>
            </div>

            {/* Columna 2: Descripción y Uso */}
            <div className="space-y-3 border-b border-slate-800 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
                [ ESPECIFICACIÓN_DE_INTEGRACIÓN ]
              </p>
              <p className="text-base leading-relaxed text-slate-100 font-medium sm:text-lg">
                {selectedTool.description}
              </p>
              <p className="text-sm text-slate-300 font-mono pt-2 leading-relaxed">
                <span className="text-white font-bold">Caso de Uso:</span> {selectedTool.useCase}
              </p>
            </div>

            {/* Columna 3: Métrica de Rendimiento */}
            <div className="flex flex-col justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold">
                [ MÉTRICA_DE_RENDIMIENTO ]
              </span>
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-5 font-mono text-sm text-emerald-400 font-bold sm:text-base shadow-inner">
                {selectedTool.performanceMetric}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                VERIFICADO 100% ARQUITECTURA TLUX
              </span>
            </div>
          </div>

          {/* Línea inferior de acento en color nativo de la herramienta seleccionada */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5 transition-all duration-500"
            style={{ backgroundColor: selectedTool.accentColor || '#2563eb' }}
          />
        </div>
      </div>
    </section>
  )
}
