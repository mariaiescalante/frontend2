'use client'

import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="#inicio" aria-label="TLUX inicio" className="flex items-center gap-3 group">
      <img
        src="/tlux-logo.png"
        alt="TLUX Logo"
        className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text font-sans text-2xl sm:text-3xl font-bold tracking-tight text-transparent">
        TLUX
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const items: [string, string][] = [['Servicios', '#mercados'], ['Funciones', '#metodo'], ['Nosotros', '#estudio']]
  const close = () => setMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const targetId = id.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'border-b border-slate-200/70 bg-white/70 backdrop-blur-md shadow-md shadow-slate-900/5'
            : 'border-b border-slate-200 bg-white shadow-none'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 font-mono text-[13px] uppercase tracking-wider text-zinc-700 md:flex" aria-label="Navegación principal">
            {items.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => scrollToId(e, href)} className="transition-colors hover:text-slate-900">{label}</a>
            ))}
          </nav>
          <a href="#contacto" onClick={(e) => scrollToId(e, 'contacto')} className="hidden h-10 items-center gap-1 border border-slate-950 bg-slate-950 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:border-blue-600 hover:bg-blue-600 md:inline-flex">
            Hablemos <ArrowUpRight className="size-4" />
          </a>
          <button className="flex size-10 items-center justify-center border border-slate-300 text-slate-900 md:hidden" aria-label="Abrir menú" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/45 md:hidden" onClick={close}>
          <aside className="ml-auto flex h-full w-[85%] max-w-sm flex-col border-l border-slate-700 bg-slate-950 p-6 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-6">
              <Logo dark />
              <button className="flex size-11 items-center justify-center border border-slate-700 text-white transition-colors hover:border-blue-600 hover:bg-blue-600" aria-label="Cerrar menú" onClick={close}>
                <X />
              </button>
            </div>
            <nav className="mt-10 flex flex-col" aria-label="Navegación móvil">
              {items.map(([label, href], i) => (
                <a key={href} href={href} onClick={(e) => { close(); scrollToId(e, href); }} className="flex items-center justify-between border-b border-slate-800 py-5 font-mono text-sm uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-white">
                  <span><span className="mr-4 text-blue-500">0{i + 1}</span>{label}</span>
                  <ArrowUpRight className="size-4 text-blue-500" />
                </a>
              ))}
              <a href="#contacto" onClick={(e) => { close(); scrollToId(e, 'contacto'); }} className="mt-8 flex items-center justify-between border border-blue-600 bg-blue-600 px-5 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent">
                Hablemos <ArrowUpRight className="size-4" />
              </a>
            </nav>
            <p className="mt-auto font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">TLUX / Digital studio / 2026</p>
          </aside>
        </div>
      )}
    </>
  )
}
