'use client'

import Link from 'next/link'
import { ArrowDownRight } from 'lucide-react'

function OrbitGraphic() {
  return (
    <div className="relative aspect-square w-full max-w-[27rem] overflow-hidden border border-slate-200 bg-white shadow-[12px_12px_0_0_rgba(15,23,42,0.06)]">
      <div className="absolute inset-6 border border-slate-200 sm:inset-10" />
      <div className="absolute inset-16 border border-blue-600/30 sm:inset-24" />
      <div className="absolute inset-28 border border-slate-200 sm:inset-36" />
      <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 bg-blue-600 shadow-[0_0_70px_rgba(37,99,235,0.3)] sm:size-40" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-slate-200" />
      <span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">[ TLUX_SYSTEM / 01 ]</span>
      <span className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.18em] text-blue-600">[ IDEA_EN_ORBITA ]</span>
      <span className="absolute left-1/2 top-7 -translate-x-1/2 font-serif text-sm italic text-slate-500">made to matter</span>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44 lg:px-10">
      <div className="relative mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-blue-600">[ ESTUDIO_DIGITAL_INDEPENDIENTE / 2026 ]</p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.9] tracking-[-0.04em] text-slate-950">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#2DD4BF] bg-clip-text font-sans font-bold text-transparent">TLUX</span>
            {' '}Tecnología líder en experiencia de usuario.
          </h1>
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end">
            <p className="max-w-sm text-pretty text-base leading-7 text-slate-600">
              <span className="font-semibold text-slate-900">La innovación a tu alcance —</span> En un mundo donde la tecnología y el marketing avanzan a pasos agigantados, nosotros te ofrecemos las herramientas y estrategias necesarias para transformar tus ideas en realidades.
            </p>
            <Link href="#mercados" className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-900">
              Ver nuestro enfoque <ArrowDownRight className="size-5 text-blue-600 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </Link>
          </div>
        </div>
        <div className="relative flex justify-end lg:pb-8"><OrbitGraphic /></div>
      </div>
    </section>
  )
}
