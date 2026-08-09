'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation, Locale } from '../context/language-context'
import { SiteHeader }     from '@/components/sections/site-header'
import { HeroSection }    from '@/components/sections/hero-section'
import { StatsSection }   from '@/components/sections/stats-section'
import { ClientsSection } from '@/components/sections/clients-section'
import { RatingsSection } from '@/components/sections/ratings-section'
import { ServiciosSection } from '@/components/sections/servicios-section'
import { FuncionesSection } from '@/components/sections/funciones-section'
import { StackSection }     from '@/components/sections/stack-section'
import { NosotrosSection }  from '@/components/sections/nosotros-section'
import { ContactoSection, SiteFooter } from '@/components/sections/contacto-section'

export function TluxLanding({ initialLocale }: { initialLocale?: Locale }) {
  const { t, setLocale } = useTranslation()

  useEffect(() => {
    if (initialLocale) {
      setLocale(initialLocale)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocale])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 font-sans text-slate-950">
      <SiteHeader />
      <main id="inicio">
        <HeroSection />
        <StatsSection />
        <ClientsSection />
        <RatingsSection />

        {/* ── Frase Separadora & "Scroll to explore ↓" con Efecto Fade-Right Pausado y Suave ── */}
        <section className="border-y border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-10 overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl font-serif text-2xl leading-tight text-slate-900 sm:text-3xl"
            >
              {t('banner.part1')}<span className="text-slate-400">{t('banner.part2')}</span>
            </motion.p>
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="font-mono text-xs uppercase tracking-widest text-blue-600 shrink-0"
            >
              {t('banner.scroll')}
            </motion.span>
          </div>
        </section>

        <ServiciosSection />
        <FuncionesSection />
        <StackSection />
        <NosotrosSection />
        <ContactoSection />
      </main>
      <SiteFooter />
    </div>
  )
}
