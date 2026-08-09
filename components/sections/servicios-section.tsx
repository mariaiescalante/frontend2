'use client'

import { ArrowRight, Check, Code, ShoppingBag, Megaphone, Database, Mail, BookOpen, TrendingUp, Users, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../../context/language-context'

export function ServiciosSection() {
  const { t } = useTranslation()
  const [activeDesktopService, setActiveDesktopService] = useState<number>(0)
  const [activeMobileService, setActiveMobileService] = useState<number | null>(0)

  const servicesData = [
    { index: '01', title: t('servicios.s1_title'), kicker: t('servicios.s1_kicker'), description: t('servicios.s1_desc'), deliverables: [t('servicios.s1_d1'), t('servicios.s1_d2'), t('servicios.s1_d3')], result: t('servicios.s1_result'), icon: Code },
    { index: '02', title: t('servicios.s2_title'), kicker: t('servicios.s2_kicker'), description: t('servicios.s2_desc'), deliverables: [t('servicios.s2_d1'), t('servicios.s2_d2'), t('servicios.s2_d3')], result: t('servicios.s2_result'), icon: ShoppingBag },
    { index: '03', title: t('servicios.s3_title'), kicker: t('servicios.s3_kicker'), description: t('servicios.s3_desc'), deliverables: [t('servicios.s3_d1'), t('servicios.s3_d2'), t('servicios.s3_d3')], result: t('servicios.s3_result'), icon: Megaphone },
    { index: '04', title: t('servicios.s4_title'), kicker: t('servicios.s4_kicker'), description: t('servicios.s4_desc'), deliverables: [t('servicios.s4_d1'), t('servicios.s4_d2'), t('servicios.s4_d3')], result: t('servicios.s4_result'), icon: Database },
    { index: '05', title: t('servicios.s5_title'), kicker: t('servicios.s5_kicker'), description: t('servicios.s5_desc'), deliverables: [t('servicios.s5_d1'), t('servicios.s5_d2'), t('servicios.s5_d3')], result: t('servicios.s5_result'), icon: Mail },
    { index: '06', title: t('servicios.s6_title'), kicker: t('servicios.s6_kicker'), description: t('servicios.s6_desc'), deliverables: [t('servicios.s6_d1'), t('servicios.s6_d2'), t('servicios.s6_d3')], result: t('servicios.s6_result'), icon: BookOpen },
    { index: '07', title: t('servicios.s7_title'), kicker: t('servicios.s7_kicker'), description: t('servicios.s7_desc'), deliverables: [t('servicios.s7_d1'), t('servicios.s7_d2'), t('servicios.s7_d3')], result: t('servicios.s7_result'), icon: TrendingUp },
    { index: '08', title: t('servicios.s8_title'), kicker: t('servicios.s8_kicker'), description: t('servicios.s8_desc'), deliverables: [t('servicios.s8_d1'), t('servicios.s8_d2'), t('servicios.s8_d3')], result: t('servicios.s8_result'), icon: Users },
  ]

  const toggleMobileService = (index: number) => {
    setActiveMobileService((prev) => (prev === index ? null : index))
  }

  const desktopSvc = servicesData[activeDesktopService] || servicesData[0]
  const DesktopSvcIcon = desktopSvc.icon

  return (
    <section id="mercados" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* ── Encabezado ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">{t('servicios.tag')}</p>
            <h2 className="max-w-3xl font-serif text-5xl leading-none tracking-tighter text-slate-900 sm:text-7xl lg:text-7xl">
              {t('servicios.title_part1')}<em className="text-blue-600 font-serif italic">{t('servicios.title_bold')}</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-slate-600 font-medium">
            {t('servicios.description')}
          </p>
        </motion.div>

        {/* ── 1. VISTA MÓVIL: DESPLEGABLE / ACCORDION CON APARICIÓN EN ESCALERA ── */}
        <div className="flex flex-col border-y border-slate-300 lg:hidden">
          {servicesData.map((item, index) => {
            const isOpen = activeMobileService === index
            const ItemIcon = item.icon

            return (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className="border-b border-slate-200 last:border-none"
              >
                <button
                  onClick={() => toggleMobileService(index)}
                  className={`flex w-full items-center justify-between gap-3 px-5 py-4.5 text-left transition-all duration-200 sm:px-6 ${isOpen ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="shrink-0 font-mono text-xs font-bold text-blue-600">[{item.index}]</span>
                    <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                      <ItemIcon className="size-4" />
                    </div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest leading-tight">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown className={`size-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden bg-slate-900 text-white"
                    >
                      <div className="p-6 space-y-6 sm:p-8">
                        <div>
                          <p className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                            {item.kicker}
                          </p>
                          <p className="text-sm leading-relaxed text-slate-300 font-medium">
                            {item.description}
                          </p>
                        </div>

                        <div className="border-t border-slate-800 pt-4">
                          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                            [ ENTREGABLES ]
                          </p>
                          <ul className="space-y-2.5">
                            {item.deliverables.map((d) => (
                              <li key={d} className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                                <Check className="size-4 shrink-0 text-teal-400 stroke-[2.5]" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-5 font-serif text-lg italic font-bold text-white">
                            {item.result}
                          </p>
                        </div>

                        <a
                          href="#contacto"
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                          }}
                          className="inline-flex items-center gap-2 border-b-2 border-blue-500 pb-1 font-mono text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-white"
                        >
                          HABLEMOS DE ESTO <ArrowRight className="size-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* ── 2. VISTA DESKTOP: APARICIÓN DE BOTONES EN ESCALERA HACIA ABAJO Y PANEL A LA DERECHA CON FADE-LEFT ── */}
        <div className="hidden border-y border-slate-300 lg:grid lg:grid-cols-[0.65fr_1.35fr]">

          {/* Columna Izquierda: Tabs verticales en Cascada / Escalera Hacia Abajo (Fade-Down Stagger) */}
          <div className="flex flex-col border-r border-slate-300">
            {servicesData.map((item, index) => {
              const isActive = activeDesktopService === index
              const ItemIcon = item.icon

              return (
                <motion.button
                  key={item.index}
                  initial={{ opacity: 0, y: -25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.09 }}
                  onClick={() => setActiveDesktopService(index)}
                  className={`flex items-center gap-3.5 border-b border-slate-200 last:border-none px-5 py-4.5 text-left transition-colors duration-200 sm:px-6 sm:py-5 ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                >
                  <span className="shrink-0 font-mono text-xs font-bold text-blue-600">[{item.index}]</span>
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                    <ItemIcon className="size-4" />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest leading-tight">
                    {item.title}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Columna Derecha: Panel de Detalle Desktop con Efecto Fade-Left Idéntico en Scroll y Clic */}
          <motion.div
            key={activeDesktopService}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 bg-white p-6 sm:p-12 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div>
              <div className="mb-5 flex items-center gap-3.5">
                <div className="flex size-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <DesktopSvcIcon className="size-7" />
                </div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600">{desktopSvc.kicker}</p>
              </div>
              <h3 className="max-w-xl font-serif text-4xl leading-none tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl font-bold">
                {desktopSvc.title}
              </h3>
              <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
                {desktopSvc.description}
              </p>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-8 inline-flex items-center gap-2 border-b-2 border-slate-900 pb-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                HABLEMOS DE ESTO <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-10">
              <p className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-slate-600">[ ENTREGABLES ]</p>
              <ul className="flex flex-col divide-y divide-slate-200">
                {desktopSvc.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3.5 py-3.5 text-base font-semibold text-slate-700">
                    <Check className="size-5 shrink-0 text-teal-600 stroke-[2.5]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-serif text-2xl sm:text-3xl italic font-bold text-slate-900">
                {desktopSvc.result}
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
