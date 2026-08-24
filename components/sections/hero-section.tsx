'use client'

import { ArrowDownRight } from 'lucide-react'
import { useTranslation } from '../../context/language-context'
import { useLandingContent } from '../../lib/use-landing-content'

function HeroGraphic({
  systemTag,
  designTag,
  imageUrl,
}: {
  systemTag?: string
  designTag?: string
  imageUrl?: string
}) {
  const { t } = useTranslation()
  const { content } = useLandingContent()
  const resolvedImg = imageUrl || content.hero?.heroImageUrl

  return (
    <div className="group relative aspect-4/3 sm:aspect-square w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 p-2.5 shadow-2xl shadow-slate-950/10 transition-all duration-300 hover:shadow-blue-500/10">
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-950">
        {resolvedImg && (
          <img
            src={resolvedImg}
            alt="TLUX Equipo y Colaboración Digital"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-xs uppercase tracking-widest text-white/90 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          {systemTag || t('hero.system_tag')}
        </span>
        <span className="absolute bottom-4 right-4 font-mono text-xs uppercase tracking-widest text-blue-400 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/30">
          {designTag || t('hero.design_tag')}
        </span>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()
  const heroData = locale === 'es' ? content.hero : null

  const handleScrollToEnfoque = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('mercados')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const tag = heroData?.tag || t('hero.tag')
  const title = heroData?.title || t('hero.title')
  const boldIntro = heroData?.boldIntro || t('hero.bold_intro')
  const description = heroData?.description || t('hero.description')
  const ctaText = heroData?.ctaText || t('hero.cta_enfoque')

  // La imagen establecida en el CMS es global y permanente
  const heroImageUrl = content.hero?.heroImageUrl

  return (
    <section id="inicio" className="relative isolate overflow-hidden scroll-mt-24 px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28 lg:px-10 lg:pt-32">
      {/* ── 1. FUENTE DEL VIDEO PINTEREST (/hero-pinterest.mp4) ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/hero-pinterest.mp4" type="video/mp4" />
      </video>

      {/* ── 2. OVERLAY OSCURO SUTIL PARA ALTO CONTRASTE DE TEXTO BLANCO ── */}
      <div className="absolute inset-0 bg-slate-950/35 -z-10 pointer-events-none" />

      {/* ── 3. ESTRUCTURA Y CONTENIDO (relative z-10) ── */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-blue-400 drop-shadow-sm">{tag}</p>
          <h1 className="max-w-4xl font-serif text-5xl sm:text-7xl lg:text-9xl leading-none tracking-tighter text-white drop-shadow-lg">
            {title}
          </h1>
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end">
            <p className="max-w-sm text-pretty text-base leading-7 text-slate-100 drop-shadow">
              <span className="font-bold text-white">{boldIntro} </span>{description}
            </p>
            <a
              href="#mercados"
              onClick={handleScrollToEnfoque}
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:text-blue-400 drop-shadow cursor-pointer"
            >
              {ctaText} <ArrowDownRight className="size-5 text-blue-400 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
        <div className="relative flex justify-end lg:pb-4">
          <HeroGraphic
            systemTag={heroData?.systemTag}
            designTag={heroData?.designTag}
            imageUrl={heroImageUrl}
          />
        </div>
      </div>
    </section>
  )
}
