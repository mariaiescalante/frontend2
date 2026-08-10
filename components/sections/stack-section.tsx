'use client'

import { useState, useRef, useEffect } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '../../context/language-context'

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
      <Image
        src="/Angularjsoldicon.webp"
        alt="Angular"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'laravel',
    name: 'Laravel',
    categoryTag: '[ BACKEND_ENGINE ]',
    categoryName: 'PHP Web Application Framework',
    version: 'v11.x Enterprise Suite',
    accentColor: '#FF2D20',
    description: 'Motor backend de alta elegancia para arquitecturas de datos complejas, ORM Eloquent e integraciones API seguras.',
    useCase: 'APIs RESTful, microservicios empresariales y portales web transaccionales.',
    performanceMetric: '99.99% Reliability / Automated Queue Processing',
    logo: (
      <Image
        src="/Laravel.svg.webp"
        alt="Laravel"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    categoryTag: '[ FULLSTACK_META ]',
    categoryName: 'React Server Components Framework',
    version: 'v15 App Router Architecture',
    accentColor: '#000000',
    description: 'El estándar moderno de Next.js para renderizado híbrido (SSR, SSG, ISR), optimización de assets y carga ultrarrápida.',
    useCase: 'E-commerce headless, plataformas de contenido masivo e interfaces interactivas de alto SEO.',
    performanceMetric: '100/100 Lighthouse Performance / Zero Layout Shift',
    logo: (
      <Image
        src="/nextjs-icon-dark-background.webp"
        alt="Next.js"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300 rounded-full"
      />
    ),
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    categoryTag: '[ RUNTIME_ENVIRONMENT ]',
    categoryName: 'Asynchronous Event-Driven JS',
    version: 'v22.x LTS Engine',
    accentColor: '#5FA04E',
    description: 'Entorno de ejecución orientado a eventos y E/S no bloqueante para servicios en tiempo real y microservicios escalables.',
    useCase: 'WebSockets, APIs GraphQL/gRPC y backends distribuidos en la nube.',
    performanceMetric: '100k+ Concurrently Handled Requests / Non-blocking IO',
    logo: (
      <Image
        src="/Node.js_logo.svg"
        alt="Node.js"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    categoryTag: '[ DATABASE_SYSTEM ]',
    categoryName: 'Advanced Relational Database',
    version: 'v16.x ACID Engine',
    accentColor: '#336791',
    description: 'La base de datos relacional de código abierto más avanzada del mundo, especializada en integridad de datos y búsquedas vectoriales.',
    useCase: 'Almacenamiento transaccional, datos financieros y vectores para Inteligencia Artificial.',
    performanceMetric: 'ACID Strict Concurrency / JSONB Index Optimization',
    logo: (
      <Image
        src="/Postgresql.svg.webp"
        alt="PostgreSQL"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'python',
    name: 'Python',
    categoryTag: '[ AI_DATA_ENGINE ]',
    categoryName: 'High-Level Data Science & Backend',
    version: 'v3.12 64-bit Core',
    accentColor: '#3776AB',
    description: 'Lenguaje líder en automatización, procesamiento masivo de datos, algoritmos de Machine Learning e integraciones de IA.',
    useCase: 'Modelos de lenguaje (LLMs), pipelines de datos y APIs con FastAPI/Django.',
    performanceMetric: 'Sub-millisecond Vector Calculations / Direct Tensor Binding',
    logo: (
      <Image
        src="/python.webp"
        alt="Python"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'react',
    name: 'React',
    categoryTag: '[ UI_LIBRARY ]',
    categoryName: 'Declarative UI Component Library',
    version: 'v19 Concurrent Mode',
    accentColor: '#61DAFB',
    description: 'La librería UI más popular para construir interfaces declarativas y reactivas con renderizado basado en componentes.',
    useCase: 'SPAs de alto rendimiento, microfrontends y aplicaciones móviles con React Native.',
    performanceMetric: '60 FPS Smooth Rendering / Fiber Architecture',
    logo: (
      <Image
        src="/React.svg.webp"
        alt="React"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    categoryTag: '[ DESIGN_SYSTEM ]',
    categoryName: 'Utility-First CSS Engine',
    version: 'v4.0 Oxide Core Engine',
    accentColor: '#06B6D4',
    description: 'Motor CSS de última generación compilado en Rust para crear sistemas de diseño responsivos y de alto impacto estético sin CSS residual.',
    useCase: 'Interfaces premium Awwwards, sistemas de diseño corporativos y animaciones fluidas.',
    performanceMetric: '0kb Unused CSS / JIT Instant Compilation Engine',
    logo: (
      <Image
        src="/Tailwind_CSS_Logo.svg.webp"
        alt="Tailwind CSS"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    categoryTag: '[ LANGUAGE_CORE ]',
    categoryName: 'Strongly Typed JavaScript',
    version: 'v5.7.3 Compiler',
    accentColor: '#3178C6',
    description: 'Superset tipado de JavaScript que garantiza mantenibilidad a largo plazo, refactorización segura y detección de errores en desarrollo.',
    useCase: 'Grandes bases de código, integraciones complejas y contratos de datos seguros.',
    performanceMetric: 'Zero Runtime Errors / Strictly Enforced Type Checking',
    logo: (
      <Image
        src="/Typescript_logo_2020.svg.webp"
        alt="TypeScript"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'facebook-ads',
    name: 'Facebook Ads',
    categoryTag: '[ ADS_MARKETING ]',
    categoryName: 'Meta Business & Performance Ads Engine',
    version: 'Meta Ads Manager Enterprise',
    accentColor: '#0666E5',
    description: 'Plataforma publicitaria de Meta para campañas de alto impacto, segmentación avanzada de audiencias y retargeting conversivo.',
    useCase: 'Campañas de adquisición, retargeting dinámico y generación de clientes potenciales.',
    performanceMetric: 'High-ROAS Conversion Pixel & CAPI Event Sync',
    logo: (
      <Image
        src="/facebook-ads.svg"
        alt="Facebook Ads"
        width={75}
        height={16}
        className="h-full w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    categoryTag: '[ SEARCH_MARKETING ]',
    categoryName: 'Google Performance Max & Search Engine',
    version: 'Google Ads Manager Suite',
    accentColor: '#4285F4',
    description: 'Ecosistema publicitario de Google para posicionamiento inmediato en búsquedas, campañas de Display, Shopping y Performance Max.',
    useCase: 'Captura de intención de compra directa, anuncios de búsqueda y campañas multicanal.',
    performanceMetric: 'Top-of-Page Impression Share & Smart Bidding AI',
    logo: (
      <Image
        src="/google-ads.webp"
        alt="Google Ads"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    categoryTag: '[ ECOMMERCE_SUITE ]',
    categoryName: 'Enterprise Commerce Platform',
    version: 'Shopify Plus & Liquid Core',
    accentColor: '#95BF47',
    description: 'La plataforma de comercio electrónico líder para tiendas online de alta conversión, pasarelas de pago y gestión de inventario.',
    useCase: 'Tiendas online escalables, e-commerce global y checkout ultrarrápido.',
    performanceMetric: 'Sub-second Shop Pay Checkout & 99.99% Uptime',
    logo: (
      <Image
        src="/shopify.webp"
        alt="Shopify"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    categoryTag: '[ CMS_PLATFORM ]',
    categoryName: 'Content Management System Engine',
    version: 'v6.7 Headless & Core CMS',
    accentColor: '#21759B',
    description: 'El gestor de contenidos más utilizado del mundo para portales de noticias, blogs corporativos y sitios institucionales autogestionables.',
    useCase: 'Sitios corporativos autogestionables, portales de noticias e integraciones headless.',
    performanceMetric: '100% Custom Gutenberg Blocks & Headless API',
    logo: (
      <Image
        src="/wordpress.webp"
        alt="WordPress"
        width={40}
        height={40}
        className="h-7 w-auto object-contain transition-transform duration-300"
      />
    ),
  },
]

export function StackSection() {
  const { t } = useTranslation()
  const [selectedTool, setSelectedTool] = useState<TechTool>(TECH_TOOLS[0])
  const scrollRef = useRef<HTMLDivElement>(null)

  // Desplazamiento suave continuo para el carrusel infinito de tecnologías
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animId: number
    let isHovered = false

    const handleMouseEnter = () => { isHovered = true }
    const handleMouseLeave = () => { isHovered = false }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    const step = () => {
      if (el && !isHovered) {
        const maxScroll = el.scrollWidth - el.clientWidth
        if (maxScroll > 100) {
          el.scrollLeft += 0.8
          if (el.scrollLeft >= maxScroll / 2) {
            el.scrollLeft = 1
          }
        }
      }
      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(animId)
      if (el) {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section id="tecnologias" className="relative scroll-mt-24 border-y border-slate-200/80 bg-slate-100/90 px-5 py-24 sm:px-8 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* ── 1. ENCABEZADO CON EFECTO DE APARICIÓN HACIA ABAJO (FADE-DOWN) ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold">
              {t('stack.tag')}
            </p>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {t('stack.title_part1')}<span className="font-serif italic text-[#2563eb]">{t('stack.title_bold')}</span>.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              {t('stack.description')}
            </p>
          </div>
          <div className="hidden items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate-500 lg:flex">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{t('stack.marquee_tag')}</span>
          </div>
        </motion.div>

        {/* ── 2. CARRUSEL CON APARICIÓN FADE-IN ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 }}
          className="group relative my-8 overflow-hidden border-y border-slate-200 bg-white/90 py-5 select-none shadow-sm"
        >
          {/* Degradados de desvanecimiento sutil en los costados */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-linear-to-r from-slate-100/90 via-slate-100/50 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-linear-to-l from-slate-100/90 via-slate-100/50 to-transparent sm:w-24" />

          {/* Cinta con Movimiento Automático + Arrastre Manual Táctil con el Dedo */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none touch-pan-x gap-3 sm:gap-4 px-4 py-1 select-none cursor-drag"
          >
            {[...TECH_TOOLS, ...TECH_TOOLS, ...TECH_TOOLS, ...TECH_TOOLS].map((tool, index) => {
              const isSelected = selectedTool.id === tool.id
              return (
                <button
                  key={`${tool.id}-${index}`}
                  onClick={() => setSelectedTool(tool)}
                  className={`group/card flex shrink-0 cursor-pointer items-center gap-3 rounded-none border px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 text-left ${isSelected
                      ? 'border-blue-600 bg-white shadow-md shadow-blue-600/10 ring-2 ring-blue-600/20 -translate-y-px'
                      : 'border-slate-200 bg-white hover:border-blue-500 hover:shadow-sm'
                    }`}
                >
                  {/* Logo compacto */}
                  <div
                    className={`flex items-center justify-center transition-all duration-300 [&_svg]:h-6 sm:[&_svg]:h-7 [&_svg]:w-auto ${tool.id === 'facebook-ads'
                        ? '[&_img]:h-2.5 sm:[&_img]:h-3'
                        : '[&_img]:h-6 sm:[&_img]:h-7'
                      } [&_img]:w-auto [&_img]:object-contain ${isSelected
                        ? 'grayscale-0 opacity-100 scale-105'
                        : 'grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 group-hover/card:scale-105'
                      }`}
                  >
                    {tool.logo}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${isSelected ? 'text-blue-600 font-bold' : 'text-slate-400 group-hover/card:text-blue-600'
                        }`}
                    >
                      {tool.categoryTag}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-slate-900">
                      {tool.name}
                    </span>
                  </div>

                  {/* Indicador compacto */}
                  {isSelected ? (
                    <span className="ml-1 flex items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 font-mono text-xs font-bold text-blue-600 border border-blue-200">
                      <Check className="size-2.5 text-blue-600" />
                    </span>
                  ) : (
                    <span
                      className="ml-1 h-1.5 w-1.5 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
                      style={{ backgroundColor: tool.accentColor || '#2563eb' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* ── 3. DETALLE / INSPECTOR TERMINAL REVELADO CON EFECTO FADE-UP (HACIA ARRIBA) ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="relative overflow-hidden border border-slate-900 bg-slate-950 p-5 text-white shadow-2xl sm:p-8 lg:p-10 rounded-none"
        >
          {/* Barra superior de terminal */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold">
                {t('stack.terminal_tag')}{' // '}{selectedTool.categoryTag}
              </span>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-blue-400 font-semibold">
              [ {t('stack.active_insight')}: {selectedTool.name.toUpperCase()} ]
            </span>
          </div>

          {/* Rejilla de detalles de la herramienta SELECCIONADA mediante clic */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-start lg:gap-8">
            {/* Columna 1: Nombre & Versión */}
            <div className="flex items-center gap-4 border-b border-slate-800 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <div className="flex size-14 sm:size-18 shrink-0 items-center justify-center rounded-xl bg-slate-900/90 border border-slate-800 p-1 sm:p-1.5 shadow-inner overflow-hidden [&_svg]:h-8 sm:[&_svg]:h-10 [&_svg]:w-auto">
                {selectedTool.id === 'facebook-ads' ? (
                  <Image
                    src="/facebook-ads.svg"
                    alt="Facebook Ads"
                    width={160}
                    height={35}
                    className="w-full h-auto object-contain scale-115 transition-transform duration-300"
                  />
                ) : selectedTool.id === 'wordpress' ? (
                  <Image
                    src="/wordpress.webp"
                    alt="WordPress"
                    width={60}
                    height={60}
                    className="h-10 sm:h-12 w-auto object-contain scale-115 transition-transform duration-300"
                  />
                ) : (
                  selectedTool.logo
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl wrap-break-word">
                  {selectedTool.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-blue-400 font-semibold sm:text-sm">
                  {selectedTool.version}
                </p>
              </div>
            </div>

            {/* Columna 2: Descripción y Uso */}
            <div className="space-y-2 border-b border-slate-800 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                [ {t('stack.active_insight')} ]
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-medium">
                {(() => {
                  const keyId = selectedTool.id.replace(/-/g, '_')
                  const translated = t(`stack.${keyId}_desc`)
                  return translated !== `stack.${keyId}_desc` ? translated : selectedTool.description
                })()}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-mono pt-1 leading-relaxed wrap-break-word">
                <span className="text-white font-bold">{t('stack.usage_case')}:</span>{' '}
                {(() => {
                  const keyId = selectedTool.id.replace(/-/g, '_')
                  const translated = t(`stack.${keyId}_case`)
                  return translated !== `stack.${keyId}_case` ? translated : selectedTool.useCase
                })()}
              </p>
            </div>

            {/* Columna 3: Métrica de Rendimiento */}
            <div className="flex flex-col justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                [ {t('stack.metric_label')} ]
              </span>
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 font-mono text-xs sm:text-sm text-emerald-400 font-bold shadow-inner wrap-break-word">
                {selectedTool.performanceMetric}
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                VERIFICADO 100% ARQUITECTURA TLUX
              </span>
            </div>
          </div>

          {/* Línea inferior de acento en color nativo de la herramienta seleccionada */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5 transition-all duration-500"
            style={{ backgroundColor: selectedTool.accentColor || '#2563eb' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
