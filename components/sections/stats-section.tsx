'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../context/language-context'
import { useLandingContent } from '../../lib/use-landing-content'

function StatItem({ index, value, suffix, label, highlightColor }: { index: string; value: number; suffix: string; label: string; highlightColor: string }) {
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
        const numVal = typeof value === 'number' && !isNaN(value) ? value : 10
        const increment = Math.max(1, Math.floor(numVal / 30))
        const timer = setInterval(() => {
          start += increment
          if (start >= numVal) { setCount(numVal); clearInterval(timer) }
          else setCount(start)
        }, 1200 / 30)
        observer.unobserve(node)
      }
    }, { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className={`group flex flex-col items-center justify-center p-4 sm:p-6 text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
      <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-blue-400">[ METRIC_${index} ]</span>
      <div className="font-sans text-4xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:scale-105 sm:text-5xl lg:text-6xl">
        {count}<span className={highlightColor}>{suffix}</span>
      </div>
      <p className="mt-2 font-sans text-sm sm:text-base font-semibold text-slate-100">{label}</p>
    </div>
  )
}

export function StatsSection() {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()
  const s = locale === 'es' ? content.stats : null

  const parseVal = (str: string | undefined, defaultNum: number, defaultSuff: string) => {
    if (!str) return { val: defaultNum, suff: defaultSuff }
    const suff = str.includes('+') ? '+' : str.includes('%') ? '%' : ''
    const num = parseInt(str.replace(/[^0-9]/g, ''), 10)
    return { val: isNaN(num) ? defaultNum : num, suff: suff || defaultSuff }
  }

  const p1 = parseVal(s?.projectsCount, 15, '+')
  const p2 = parseVal(s?.clientsCount, 8, '')
  const p3 = parseVal(s?.yearsCount, 5, '+')

  const statsData = [
    { index: '01', value: p1.val, suffix: p1.suff, label: s?.projectsLabel || t('stats.proyectos_creados'), highlightColor: 'text-blue-500' },
    { index: '02', value: 15, suffix: '+', label: t('stats.proyectos'), highlightColor: 'text-teal-400' },
    { index: '03', value: p2.val, suffix: p2.suff, label: s?.clientsLabel || t('stats.clientes_felices'), highlightColor: 'text-blue-500' },
    { index: '04', value: p3.val, suffix: p3.suff, label: s?.yearsLabel || t('stats.anos'), highlightColor: 'text-teal-400' },
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
