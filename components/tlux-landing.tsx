'use client'

import { useEffect } from 'react'
import { SiteHeader }     from '@/components/sections/site-header'
import { HeroSection }    from '@/components/sections/hero-section'
import { StatsSection }   from '@/components/sections/stats-section'
import { ClientsSection } from '@/components/sections/clients-section'
import { ServiciosSection } from '@/components/sections/servicios-section'
import { FuncionesSection } from '@/components/sections/funciones-section'
import { StackSection }     from '@/components/sections/stack-section'
import { NosotrosSection }  from '@/components/sections/nosotros-section'
import { ContactoSection, SiteFooter } from '@/components/sections/contacto-section'

export function TluxLanding() {
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

        {/* Frase separadora */}
        <section className="border-y border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl font-serif text-2xl leading-tight text-slate-900 sm:text-3xl">
              No hacemos páginas bonitas. <span className="text-slate-400">Hacemos que tu negocio sea la opción obvia.</span>
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600">Scroll to explore ↓</span>
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
