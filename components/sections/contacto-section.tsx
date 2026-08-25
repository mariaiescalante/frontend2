'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '../../context/language-context'
import { useLandingContent } from '../../lib/use-landing-content'
import { trackLeadInteraction } from '../../lib/lead-tracker'

function WhatsAppIcon({ className = "size-11 sm:size-13" }: { className?: string }) {
  return (
    <img
      src="/whatsapp-logo.png"
      alt="WhatsApp"
      className={`${className} object-contain shrink-0 pointer-events-none drop-shadow-[0_0_12px_rgba(37,211,102,0.45)] group-hover:scale-110 transition-transform duration-300`}
    />
  )
}

export function ContactoSection() {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()
  const contactData = locale === 'es' ? content.contact : null

  const part1 = t('contacto.title_part1')
  const part2 = t('contacto.title_part2')
  const fullText = `${part1}${part2}?`
  const part2Normalized = part2.toLowerCase().trim()

  const words = fullText.split(' ').filter(Boolean).map((word) => {
    const isItalic = word.toLowerCase().includes(part2Normalized)
    return { word, isItalic }
  })

  let globalCharIndex = 0

  const whatsappMsg = encodeURIComponent(t('contacto.whatsapp_msg'))
  const whatsappUrl = `https://api.whatsapp.com/send?phone=573203249742&text=${whatsappMsg}`

  const handleWhatsAppClick = () => {
    trackLeadInteraction('WHATSAPP', 'Footer Sección Contacto')
  }

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-slate-800 bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Tag de sección con Fade-Down */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-blue-500"
          >
            {contactData?.tag || t('contacto.tag')}
          </motion.p>

          {/* Título con animación de entrada fluida palabra por palabra */}
          <h2
            key={`h2-${locale}`}
            className="max-w-3xl font-serif text-4xl sm:text-6xl lg:text-7xl leading-tight tracking-tight text-white flex flex-wrap gap-x-3 gap-y-2"
          >
            {words.map(({ word, isItalic }, wIdx) => (
              <motion.span
                key={`word-${locale}-${wIdx}-${word}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: wIdx * 0.07,
                }}
                className="inline-block"
              >
                {isItalic ? (
                  <span className="font-serif italic text-blue-500 font-normal">
                    {word.split('').map((char, cIdx) => {
                      const charDelay = 0.25 + globalCharIndex * 0.02
                      globalCharIndex++
                      return (
                        <motion.span
                          key={`char-${cIdx}-${char}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: 'easeOut',
                            delay: charDelay,
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      )
                    })}
                  </span>
                ) : (
                  <span>
                    {word.split('').map((char, cIdx) => {
                      const charDelay = 0.1 + globalCharIndex * 0.015
                      globalCharIndex++
                      return (
                        <motion.span
                          key={`char-${cIdx}-${char}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                            delay: charDelay,
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      )
                    })}
                  </span>
                )}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* ── BOTÓN DE WHATSAPP ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="shrink-0"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="group inline-flex items-center gap-4 rounded-none border border-emerald-500/40 bg-emerald-950/40 p-4 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-900/50 hover:shadow-xl hover:shadow-emerald-950/60 cursor-pointer"
          >
            <div className="flex size-14 items-center justify-center rounded-none bg-emerald-500/20 border border-emerald-500/30 transition-transform group-hover:scale-105">
              <WhatsAppIcon className="size-8" />
            </div>
            <div className="text-left pr-2">
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                [ {t('contacto.cta')} ]
              </span>
              <span className="block font-sans text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                Chat en WhatsApp
              </span>
            </div>
            <ArrowUpRight className="size-5 text-emerald-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const { t, locale } = useTranslation()
  const router = useRouter()

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      const isHome = window.location.pathname === '/' || window.location.pathname === `/${locale}`
      if (!isHome) {
        sessionStorage.setItem('scrollTarget', id)
        router.push(locale === 'es' ? '/' : `/${locale}`)
        return
      }
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (id === 'inicio') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    }
  }

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'Twitter/X', href: 'https://x.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
  ]

  const navLinks = [
    { name: t('nav.inicio'), href: 'inicio' },
    { name: t('nav.servicios'), href: 'servicios' },
    { name: t('nav.funciones'), href: 'funciones' },
    { name: t('nav.nosotros'), href: 'nosotros' },
  ]

  const serviceLinks = [
    t('footer.svc1'),
    t('footer.svc2'),
    t('footer.svc3'),
    t('footer.svc4'),
  ]

  return (
    <footer className="border-t-2 border-slate-800/90 bg-slate-900 text-white">
      {/* ── Rejilla de 4 Columnas ───────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">

          {/* Columna 1: Brand & Manifiesto & Disponibilidad */}
          <div className="flex flex-col justify-between">
            <div>
              <Link href="#inicio" onClick={(e) => scrollToId(e, 'inicio')} aria-label="TLUX inicio" className="flex items-center gap-3 group w-fit">
                <img
                  src="/tlux-logo.png"
                  alt="TLUX Logo"
                  className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="bg-linear-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text font-sans text-3xl font-bold tracking-tight text-transparent">
                  TLUX
                </span>
              </Link>

              <p className="mt-5 text-sm leading-relaxed text-slate-400">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Badge de Disponibilidad */}
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-teal-400 w-fit">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-teal-400" />
              </span>
              {t('footer.disponible')}
            </div>
          </div>

          {/* Columna 2: Navegación Principal */}
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-blue-400">
              [ {t('nav.navegacion')} ]
            </p>
            <ul className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider text-slate-400">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => scrollToId(e, item.href)}
                    className="transition-colors hover:text-white hover:translate-x-1 inline-block duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={locale === 'es' ? '/blog' : `/${locale}/blog`}
                  className="transition-colors hover:text-white hover:translate-x-1 inline-block duration-200"
                >
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'es' ? '/faq' : `/${locale}/faq`}
                  className="transition-colors hover:text-white hover:translate-x-1 inline-block duration-200"
                >
                  {t('nav.faq') || 'FAQ'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Servicios Destacados */}
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-blue-400">
              [ {t('nav.servicios_label')} ]
            </p>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              {serviceLinks.map((svc) => (
                <li key={svc} className="transition-colors hover:text-white">
                  {svc}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Conectemos & Zona Horaria */}
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-blue-400">
              [ {t('nav.conectemos')} ]
            </p>
            <a
              href="mailto:hola@tlux.studio"
              className="block font-mono text-sm font-semibold text-white transition-colors hover:text-blue-400"
            >
              hola@tlux.studio
            </a>
            <p className="mt-3 font-mono text-xs text-slate-500">
              {t('footer.timezone')}
            </p>

            {/* Redes Sociales */}
            <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider text-slate-400">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blue-400"
                >
                  {s.name} ↗
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Barra Inferior de Copyright & Scroll Top ───────────────────────────── */}
      <div className="border-t border-slate-800 bg-slate-950/60 px-5 py-6 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-slate-500">
            {t('footer.rights')}
          </p>
          <button
            onClick={(e) => scrollToId(e, 'inicio')}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-blue-400 cursor-pointer"
          >
            {t('footer.volver_arriba')}{' '}
            <span className="flex size-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
