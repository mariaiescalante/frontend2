'use client'

import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="#inicio" aria-label="TLUX inicio" className={`font-mono text-xl font-bold tracking-[-0.12em] ${dark ? 'text-white' : 'text-slate-950'}`}>
      TLUX<span className="text-blue-600">.</span>
    </Link>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const items: [string, string][] = [['Servicios', '#mercados'], ['Funciones', '#metodo'], ['Nosotros', '#estudio']]
  const close = () => setMenuOpen(false)
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 md:flex" aria-label="Navegación principal">
            {items.map(([label, href]) => (
              <Link key={href} href={href} className="transition-colors hover:text-blue-600">{label}</Link>
            ))}
          </nav>
          <Link href="#contacto" className="hidden h-10 items-center gap-1 border border-slate-950 bg-slate-950 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:border-blue-600 hover:bg-blue-600 md:inline-flex">
            Hablemos <ArrowUpRight className="size-4" />
          </Link>
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
                <Link key={href} href={href} onClick={close} className="flex items-center justify-between border-b border-slate-800 py-5 font-mono text-sm uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-white">
                  <span><span className="mr-4 text-blue-500">0{i + 1}</span>{label}</span>
                  <ArrowUpRight className="size-4 text-blue-500" />
                </Link>
              ))}
              <Link href="#contacto" onClick={close} className="mt-8 flex items-center justify-between border border-blue-600 bg-blue-600 px-5 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent">
                Hablemos <ArrowUpRight className="size-4" />
              </Link>
            </nav>
            <p className="mt-auto font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">TLUX / Digital studio / 2026</p>
          </aside>
        </div>
      )}
    </>
  )
}
