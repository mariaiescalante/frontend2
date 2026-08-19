'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '../../context/language-context'

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
            {t('contacto.tag')}
          </motion.p>

          {/* Título con animación de entrada fluida palabra por palabra */}
          <h2
            key={`h2-${locale}`}
            className="max-w-3xl font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white flex flex-wrap gap-x-[0.28em] gap-y-2"
          >
            {words.map(({ word, isItalic }, wIdx) => (
              <motion.span
                key={`word-${locale}-${wIdx}-${word}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.45,
                  delay: wIdx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={isItalic ? 'text-blue-500 font-serif italic inline-block' : 'inline-block'}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Botón de acción hacia WhatsApp (+57 320 324 9742) con el logo agrandado y resaltado */}
        <motion.a
          id="empezar-conversacion"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
          }}
          whileHover={{
            scale: 1.04,
            y: -4,
            boxShadow: '0 14px 35px rgba(37, 211, 102, 0.35)',
          }}
          whileTap={{
            scale: 0.96,
            y: 0,
          }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            opacity: { duration: 0.5, delay: 0.8 },
            y: { duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] },
            scale: { type: 'spring', stiffness: 300, damping: 15 },
          }}
          className="group scroll-mt-32 inline-flex w-fit items-center gap-4 border border-emerald-500/60 bg-slate-900 px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-emerald-400 hover:bg-slate-800 cursor-pointer shadow-xl shadow-emerald-950/50"
        >
          <WhatsAppIcon className="size-11 sm:size-13" />
          <span className="text-sm font-semibold">{t('contacto.cta')}</span>
          <ArrowUpRight className="size-5 text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const { locale, t } = useTranslation()
  const router = useRouter()
  const homeHref = locale === 'es' ? '/' : `/${locale}`

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const targetId = id.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('scrollTarget', targetId)
      }
      router.push(`${homeHref}#${targetId}`)
    }
  }

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'Twitter/X', href: 'https://x.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
  ]

  const navLinks = [
    { name: t('nav.servicios'), href: 'mercados' },
    { name: t('nav.funciones'), href: 'metodo' },
    { name: t('nav.nosotros'), href: 'estudio' },
    { name: t('nav.hablemos'), href: 'contacto' },
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
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
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
