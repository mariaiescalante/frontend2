/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '../../context/language-context'

function WhatsAppIcon({ className = "size-9" }: { className?: string }) {
  return (
    <img
      src="/whatsapp-logo.png"
      alt="WhatsApp"
      className={`${className} object-contain shrink-0 pointer-events-none`}
    />
  )
}

export function ContactoSection() {
  const { t } = useTranslation()

  const headingText = `${t('contacto.title_part1')}${t('contacto.title_part2')}?`
  const words = headingText.split(' ').map((word) => {
    const isItalic = word.toLowerCase().includes(t('contacto.title_part2').toLowerCase().trim())
    return { text: word + ' ', isItalic }
  })

  let charCounter = 0

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

          {/* Título con aparición LETRA POR LETRA */}
          <h2 className="max-w-3xl font-serif text-6xl leading-none tracking-tighter text-white sm:text-8xl flex flex-wrap">
            {words.map((wordObj, wordIdx) => (
              <span
                key={wordIdx}
                className={wordObj.isItalic ? 'text-blue-500 font-serif italic inline-flex' : 'inline-flex'}
              >
                {wordObj.text.split('').map((char, charIdx) => {
                  const currentIndex = charCounter
                  charCounter++
                  return (
                    <motion.span
                      key={`${wordIdx}-${charIdx}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 0.3,
                        delay: currentIndex * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </h2>
        </div>

        {/* Botón de acción hacia WhatsApp (+57 320 324 9742) con el logo exacto enviado por el usuario */}
        <motion.a
          id="empezar-conversacion"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0, -10, 0, -4, 0],
          }}
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: '0 12px 30px rgba(37, 211, 102, 0.4)',
          }}
          whileTap={{
            scale: 0.96,
            y: 0,
          }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            opacity: { duration: 0.5, delay: 1.05 },
            y: { duration: 1.3, delay: 1.1, ease: [0.22, 1, 0.36, 1] },
            scale: { type: 'spring', stiffness: 300, damping: 15 },
          }}
          className="scroll-mt-32 inline-flex w-fit items-center gap-3 border border-emerald-500/60 bg-slate-900 px-7 py-4 font-mono text-xs uppercase tracking-wider text-white transition-all duration-300 hover:border-emerald-400 hover:bg-slate-800 cursor-pointer shadow-lg shadow-emerald-950/40"
        >
          <WhatsAppIcon className="size-9 sm:size-10" />
          <span>{t('contacto.cta')}</span>
          <ArrowUpRight className="size-4 text-emerald-400" />
        </motion.a>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const { t } = useTranslation()

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
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
