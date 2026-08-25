'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation, LanguageProvider } from '../context/language-context'
import type { Locale } from '../context/language-context'
import { FullLandingContent } from '../types/landing'
import { LandingContentProvider } from '@/lib/use-landing-content'
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
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { initSectionEngagementTracker } from '@/lib/section-tracker'

export function TluxLanding({ initialContent, initialLocale }: { initialContent?: FullLandingContent; initialLocale?: Locale }) {
  const { t } = useTranslation()

  useEffect(() => {
    const cleanupTracker = initSectionEngagementTracker()
    return () => {
      if (cleanupTracker) cleanupTracker()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }

      const pendingTarget = sessionStorage.getItem('scrollTarget')
      const hashTarget = window.location.hash.replace('#', '')
      const targetId = pendingTarget || hashTarget

      if (targetId) {
        sessionStorage.removeItem('scrollPosY')
        const scrollToElement = () => {
          const el = document.getElementById(targetId) ||
            (targetId === 'servicios' ? document.getElementById('mercados') :
             targetId === 'funciones' ? document.getElementById('metodo') :
             targetId === 'nosotros' ? document.getElementById('estudio') : null)

          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          } else if (targetId === 'inicio') {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }
        }

        scrollToElement()
        const t1 = setTimeout(scrollToElement, 100)
        const t2 = setTimeout(scrollToElement, 350)
        const t3 = setTimeout(() => {
          scrollToElement()
          sessionStorage.removeItem('scrollTarget')
        }, 850)

        return () => {
          clearTimeout(t1)
          clearTimeout(t2)
          clearTimeout(t3)
        }
      }
    }
  }, [])

  return (
    <LanguageProvider initialLocale={initialLocale}>
    <LanguageProvider initialLocale={initialLocale}>
    <LandingContentProvider initialContent={initialContent}>
      <div className="min-h-screen overflow-x-clip bg-slate-50 font-sans text-slate-950">
        <SiteHeader />
        <main className="relative">
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
        <WhatsAppFloatingButton />
      </div>
            </LandingContentProvider>
    </LanguageProvider>
    </LanguageProvider>
  )
}
