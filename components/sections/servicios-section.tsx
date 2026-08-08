'use client'

import Link from 'next/link'
import { ArrowRight, Check, Code, ShoppingBag, Megaphone, Database, Mail, BookOpen, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'

const servicesData = [
  { index: '01', title: 'Desarrollo Web a Medida',      kicker: 'Tecnología que escala',      description: 'Creamos soluciones personalizadas que se adaptan a las necesidades específicas de tu negocio, garantizando un rendimiento y escalabilidad óptimos.',                                                                                                                               deliverables: ['Soluciones 100% personalizadas', 'Rendimiento y escalabilidad óptimos', 'Arquitectura moderna'],          result: 'Más control. Máximo rendimiento.', icon: Code },
  { index: '02', title: 'Desarrollo de E-commerce',     kicker: 'Conversión que se siente',   description: 'Creamos plataformas de comercio electrónico personalizadas y optimizadas que permiten vender en línea de manera efectiva, con gestión de inventario, pasarelas de pago seguras y experiencias atractivas.',                                                                       deliverables: ['Pasarelas de pago seguras', 'Gestión avanzada de inventario', 'Experiencias de usuario atractivas'],      result: 'Más ventas. Menos fricción.',     icon: ShoppingBag },
  { index: '03', title: 'Marketing Digital Estratégico', kicker: 'Alcance que importa',        description: 'Implementamos estrategias efectivas de marketing digital que incluyen SEO, PPC y campañas en redes sociales para aumentar tu visibilidad y atraer tráfico relevante.',                                                                                                           deliverables: ['Estrategia SEO, PPC y SEM', 'Campañas en redes sociales', 'Tráfico relevante y calificado'],             result: 'Más visibilidad. Tráfico de valor.', icon: Megaphone },
  { index: '04', title: 'Software de Backend',           kicker: 'Infraestructura sólida',    description: 'Proporcionamos sistemas robustos y seguros que gestionan eficientemente tus operaciones y datos, asegurando una integración fluida con tus plataformas.',                                                                                                                         deliverables: ['Sistemas robustos y seguros', 'Gestión eficiente de datos', 'Integración fluida de plataformas'],        result: 'Operaciones estables. Cero fallos.', icon: Database },
  { index: '05', title: 'Email Marketing',               kicker: 'Comunicación que conecta',  description: 'Diseñamos campañas de email marketing segmentadas que resuenan con tu audiencia y fomentan la lealtad de los clientes a través de diseños de alto impacto.',                                                                                                                     deliverables: ['Campañas de email segmentadas', 'Diseños de alto impacto', 'Fidelización de clientes'],                  result: 'Más retención. Mayor lealtad.',   icon: Mail },
  { index: '06', title: 'Consultoría Digital',           kicker: 'Estrategia con visión',     description: 'Asesoramos a las empresas en su proceso de digitalización, ayudándoles a adoptar tecnologías que optimicen sus procesos y mejoren su competitividad en el mercado.',                                                                                                             deliverables: ['Asesoría en digitalización', 'Adopción de nuevas tecnologías', 'Optimización de procesos internos'],     result: 'Más eficiencia. Alta competitividad.', icon: BookOpen },
  { index: '07', title: 'SEO | SEM',                     kicker: 'Visibilidad orgánica',      description: 'Ofrecemos servicios expertos de SEO y SEM para potenciar tu presencia online y atraer tráfico de calidad. Campañas SEM estratégicas que maximizan tu retorno de inversión (ROI).',                                                                                               deliverables: ['Posicionamiento destacado en buscadores', 'Campañas SEM estratégicas', 'Resultados inmediatos y ROI alto'], result: 'Posiciones destacadas. Tráfico de calidad.', icon: TrendingUp },
  { index: '08', title: 'Integración de CRM',            kicker: 'Clientes en el centro',     description: 'Centralizamos y optimizamos la gestión de clientes integrando un CRM adaptado a tus procesos, automatizando tareas y brindando datos en tiempo real para impulsar la productividad.',                                                                                            deliverables: ['Centralización de gestión de clientes', 'Tareas automatizadas en tiempo real', 'Productividad e informes avanzados'], result: 'Mayor productividad. Fidelización real.', icon: Users },
]

export function ServiciosSection() {
  const [activeService, setActiveService] = useState(0)
  const svc = servicesData[activeService]
  const SvcIcon = svc.icon

  return (
    <section id="mercados" className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">[ 01 / SERVICIOS & SOLUCIONES ]</p>
            <h2 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-slate-900 sm:text-7xl lg:text-7xl">Soluciones y servicios <em className="text-blue-600">hechos a tu medida.</em></h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-slate-600 font-medium">No usamos fórmulas. Encontramos la oportunidad específica que tu mercado está esperando.</p>
        </div>

        <div className="grid border-y border-slate-300 lg:grid-cols-[0.65fr_1.35fr]">
          {/* Tabs verticales */}
          <div className="flex flex-col border-b border-slate-300 lg:border-b-0 lg:border-r">
            {servicesData.map((item, index) => {
              const isActive = activeService === index
              const ItemIcon = item.icon
              return (
                <button
                  key={item.index}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center gap-3.5 border-b border-slate-200 px-5 py-4.5 text-left transition-all duration-200 last:border-b-0 sm:px-6 sm:py-5 ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
                >
                  <span className="shrink-0 font-mono text-xs font-bold text-blue-600">[{item.index}]</span>
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <ItemIcon className="size-4" />
                  </div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] leading-tight">{item.title}</span>
                </button>
              )
            })}
          </div>

          {/* Panel de detalle */}
          <div key={activeService} className="animate-panel-in grid gap-8 bg-white p-6 sm:p-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 flex items-center gap-3.5">
                <div className="flex size-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <SvcIcon className="size-7" />
                </div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{svc.kicker}</p>
              </div>
              <h3 className="max-w-xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl font-bold">{svc.title}</h3>
              <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-slate-600 font-medium">{svc.description}</p>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-8 inline-flex items-center gap-2 border-b-2 border-slate-900 pb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-600"
              >
                HABLEMOS DE ESTO <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="border-t border-slate-200 pt-6 lg:border-l lg:border-t-0 lg:pl-10">
              <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-600">[ ENTREGABLES ]</p>
              <ul className="flex flex-col divide-y divide-slate-200">
                {svc.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3.5 py-3.5 text-base font-semibold text-slate-700">
                    <Check className="size-5 shrink-0 text-teal-600 stroke-[2.5]" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-serif text-2xl sm:text-3xl italic font-bold text-slate-900">{svc.result}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
