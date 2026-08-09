import Link from 'next/link'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function ContactoSection() {
  const words = [
    { text: '¿Qué ', isItalic: false },
    { text: 'espacio ', isItalic: false },
    { text: 'quieres ', isItalic: false },
    { text: 'ocupar', isItalic: true },
    { text: '?', isItalic: false },
  ]

  // Calcular índice global para escalonar letra por letra
  let charCounter = 0

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
            [ 04 / CONTACTO ]
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

        {/* Botón de acción con efecto de brinco de entrada + Hover animado con resplandor */}
        <motion.a
          id="empezar-conversacion"
          href="mailto:hola@tlux.studio"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0, -10, 0, -4, 0],
          }}
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: '0 12px 30px rgba(37, 99, 235, 0.45)',
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
          className="scroll-mt-32 inline-flex w-fit items-center gap-2 border border-slate-700 bg-slate-900 px-7 py-4.5 font-mono text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:border-blue-500 hover:bg-blue-600"
        >
          Empezar una conversación <ArrowUpRight className="size-4 text-blue-400" />
        </motion.a>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks = [
    { name: 'LinkedIn',  href: 'https://linkedin.com' },
    { name: 'GitHub',    href: 'https://github.com' },
    { name: 'Twitter/X', href: 'https://x.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
  ]

  const navLinks = [
    { name: 'Servicios', href: 'mercados' },
    { name: 'Funciones', href: 'metodo' },
    { name: 'Nosotros',  href: 'estudio' },
    { name: 'Contacto',  href: 'contacto' },
  ]

  const serviceLinks = [
    'Desarrollo Web Full-Stack',
    'Desarrollo de E-Commerce',
    'Marketing Digital & SEO',
    'Consultoría & Infraestructura',
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
                Estudio de ingeniería y arquitectura digital. Transformamos visión estratégica en plataformas web de alto rendimiento.
              </p>
            </div>

            {/* Badge de Disponibilidad */}
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-teal-400 w-fit">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-teal-400" />
              </span>
              [ DISPONIBLE PARA PROYECTOS Q1/Q2 2026 ]
            </div>
          </div>

          {/* Columna 2: Navegación Principal */}
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-blue-400">
              [ NAVEGACIÓN ]
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
              [ SERVICIOS ]
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
              [ CONECTEMOS ]
            </p>
            <a
              href="mailto:hola@tlux.studio"
              className="block font-mono text-sm font-semibold text-white transition-colors hover:text-blue-400"
            >
              hola@tlux.studio
            </a>
            <p className="mt-3 font-mono text-xs text-slate-500">
              América / España • [ UTC -4 / UTC +1 ]
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
            © 2026 TLUX. Todos los derechos reservados.
          </p>
          <button
            onClick={(e) => scrollToId(e, 'inicio')}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-blue-400"
          >
            Volver arriba{' '}
            <span className="flex size-6 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
              <ArrowUp className="size-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
