'use client'

export function ClientsSection() {
  const brands = [
    { name: 'BDL Cap',          src: '/BDL-Cap.webp' },
    { name: 'Elizabeth Costa',  src: '/Elizabeth-Costa-Top-Real-Estate-Agent-Doral-logo-fondo-nergo.webp' },
    { name: 'Forget Me Not',   src: '/Forget-me-not.webp' },
    { name: 'Maraka',           src: '/Maraka.webp' },
    { name: 'Open Market',      src: '/Open-Market-company.webp' },
    { name: 'Trailvision Optics', src: '/Trailvision-Optics.webp' },
    { name: 'Vistalite',        src: '/Vistalite_color-version.webp' },
  ]
  const marquee = [...brands, ...brands, ...brands, ...brands]

  return (
    <section className="border-b border-slate-800 bg-slate-950 py-12 text-white sm:py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-blue-500">[ CONFIANZA_Y_PARTNERS ]</p>
        <h2 className="font-serif text-3xl leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
          Marcas con <em className="font-serif italic text-blue-500">ambición</em> que <em className="font-serif italic text-blue-500">confían</em> en nuestra arquitectura digital.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Diseñamos y desarrollamos plataformas de alto rendimiento para compañías que buscan dominar su categoría.</p>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-36" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-36" />
          <div className="animate-marquee flex items-center gap-6 sm:gap-8">
            {marquee.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="group relative flex h-22 sm:h-28 w-52 sm:w-64 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 sm:p-3 shadow-md shadow-white/5 transition-all duration-300 ease-out hover:scale-105 hover:z-20 hover:shadow-2xl hover:shadow-blue-500/20 [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden]"
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain pointer-events-none [image-rendering:-webkit-optimize-contrast] [transform:translateZ(0)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
