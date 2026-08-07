'use client'

export function FuncionesSection() {
  const features = [
    'Consulta de Optimización Gratuita',
    'Desarrollo Full Stack',
    'Optimización de Contenido',
    'Análisis de Sitio Web',
    'Seguimiento y Reporte de Rendimiento',
    'Gestión de Redes Sociales',
  ]

  return (
    <section id="metodo" className="bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">

          {/* Columna izquierda: título + descripción */}
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-teal-400">[ 02 / FUNCIONES ]</p>
            <h2 className="font-serif text-5xl leading-[1.0] tracking-[-0.04em] sm:text-6xl">
              Ofrecemos Funciones Importantes para el <em className="text-blue-500">Desarrollo Web</em> y el <em className="text-blue-500">Marketing Digital.</em>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-slate-400">
              En <span className="font-semibold text-white">TLUX</span>, creemos en ofrecer soluciones digitales integrales que mejoren su presencia en línea y generen resultados. Nuestras características principales incluyen:
            </p>
          </div>

          {/* Columna derecha: lista de características */}
          <div className="flex flex-col justify-center border-l border-slate-700">
            {features.map((feature, i) => (
              <div key={feature} className="group flex items-center gap-5 border-b border-slate-700 px-5 py-5 transition-colors hover:bg-slate-900 sm:px-8">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-teal-400/40 bg-teal-400/10 font-mono text-xs font-bold text-teal-400 transition-colors group-hover:bg-teal-400/20">
                  ✓
                </span>
                <span className="font-sans text-base font-medium text-slate-200 transition-colors group-hover:text-white">{feature}</span>
                <span className="ml-auto font-mono text-[10px] text-slate-600">[0{i + 1}]</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
