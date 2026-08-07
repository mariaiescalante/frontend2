'use client'

export function ClientsSection() {
  const brands = [
    { name: 'NEXUS',   logo: <svg className="size-5 text-blue-500 transition-colors group-hover:text-blue-400"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
    { name: 'PRISM',   logo: <svg className="size-5 text-teal-400 transition-colors group-hover:text-teal-300"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 22 22 22" /></svg> },
    { name: 'QUANTUM', logo: <svg className="size-5 text-blue-400 transition-colors group-hover:text-blue-300"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" fill="currentColor" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" /></svg> },
    { name: 'ZENITH',  logo: <svg className="size-5 text-blue-500 transition-colors group-hover:text-blue-400"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l8 8-4 4-4-4-4 4-4-4 8-8z" /></svg> },
    { name: 'AURORA',  logo: <svg className="size-5 text-teal-400 transition-colors group-hover:text-teal-300"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 12c3-4 6-4 9 0s6 4 9 0" /><path d="M2 17c3-4 6-4 9 0s6 4 9 0" /></svg> },
    { name: 'HELIX',   logo: <svg className="size-5 text-blue-400 transition-colors group-hover:text-blue-300"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16" /></svg> },
    { name: 'NOVA',    logo: <svg className="size-5 text-blue-500 transition-colors group-hover:text-blue-400"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" /></svg> },
    { name: 'APEX',    logo: <svg className="size-5 text-teal-400 transition-colors group-hover:text-teal-300"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3L2 21h20L12 3z" /></svg> },
  ]
  const marquee = [...brands, ...brands, ...brands]

  return (
    <section className="border-b border-slate-800 bg-slate-950 py-12 text-white sm:py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-500">[ CONFIANZA_Y_PARTNERS ]</p>
        <h2 className="font-serif text-3xl leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
          Marcas con <em className="font-serif italic text-blue-500">ambición</em> que <em className="font-serif italic text-blue-500">confían</em> en nuestra arquitectura digital.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Diseñamos y desarrollamos plataformas de alto rendimiento para compañías que buscan dominar su categoría.</p>
      </div>
      <div className="mx-auto mt-8 max-w-4xl px-5 sm:px-8">
        <div className="relative overflow-hidden py-2">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-28" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-28" />
          <div className="animate-marquee flex items-center gap-6 sm:gap-10">
            {marquee.map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="group flex items-center gap-3 rounded-lg border border-slate-800/80 bg-slate-900/50 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-lg hover:shadow-blue-500/10">
                <span className="font-mono text-[10px] text-blue-500/70">✦</span>
                {brand.logo}
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-300 transition-colors group-hover:text-white">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
