'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../context/language-context'

function StatItem({ index, value, suffix, labelKey, highlightColor }: { index: string; value: number; suffix: string; labelKey: string; highlightColor: string }) {
  const { t } = useTranslation()
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        let start = 0
        const increment = value / 30
        const timer = setInterval(() => {
          start += increment
          if (start >= value) { setCount(value); clearInterval(timer) }
          else setCount(Math.ceil(start))
        }, 1200 / 30)
        observer.unobserve(node)
      }
    }, { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className={`group flex flex-col items-center justify-center p-4 sm:p-6 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
      <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-blue-400">[ METRIC_{index} ]</span>
      <div className="font-sans text-4xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-105 sm:text-5xl lg:text-6xl">
        {count}<span className={highlightColor}>{suffix}</span>
      </div>
      <p className="mt-2 font-sans text-sm sm:text-base font-semibold text-slate-100">{t(labelKey)}</p>
    </div>
  )
}

export function StatsSection() {
  const statsData = [
    { index: '01', value: 15, suffix: '+', labelKey: 'stats.proyectos_creados', highlightColor: 'text-blue-500' },
    { index: '02', value: 15, suffix: '+', labelKey: 'stats.proyectos', highlightColor: 'text-teal-400' },
    { index: '03', value: 8, suffix: '', labelKey: 'stats.clientes_felices', highlightColor: 'text-blue-500' },
    { index: '04', value: 5, suffix: '+', labelKey: 'stats.anos', highlightColor: 'text-teal-400' },
  ]

  return (
    <section className="border-y border-slate-800 bg-slate-950 px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-800/80 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {statsData.map((s) => (
          <StatItem key={s.index} {...s} />
        ))}
      </div>
    </section>
  )
}
