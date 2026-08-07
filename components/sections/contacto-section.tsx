'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export function ContactoSection() {
  return (
    <section id="contacto" className="border-t border-slate-800 bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-500">[ 04 / CONTACTO ]</p>
          <h2 className="max-w-3xl font-serif text-6xl leading-[0.85] tracking-[-0.05em] text-white sm:text-8xl">
            ¿Qué espacio quieres <em className="text-blue-500">ocupar</em>?
          </h2>
        </div>
        <Link href="mailto:hola@tlux.studio" className="inline-flex w-fit items-center gap-2 border border-slate-700 bg-slate-900 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-blue-500 hover:bg-blue-600">
          Empezar una conversación <ArrowUpRight className="size-4 text-blue-400" />
        </Link>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 px-5 py-10 text-white sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <Link href="#inicio" aria-label="TLUX inicio" className="font-mono text-xl font-bold tracking-[-0.12em] text-white">
            TLUX<span className="text-blue-600">.</span>
          </Link>
          <span className="hidden h-4 w-px bg-slate-800 sm:inline-block" />
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">TLUX / Digital studio / 2026</p>
        </div>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.16em]">
          <a href="mailto:hola@tlux.studio" className="text-blue-400 transition-colors hover:text-white">hola@tlux.studio</a>
          <Link href="#inicio" className="text-slate-400 transition-colors hover:text-blue-400">Volver arriba ↑</Link>
        </div>
      </div>
    </footer>
  )
}
