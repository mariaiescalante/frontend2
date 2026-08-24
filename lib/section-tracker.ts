'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

interface SectionConfig {
  id: string
  label: string
  selectors: string[]
}

const SECTION_CONFIGS: SectionConfig[] = [
  { id: 'hero', label: '01 // Hero & Portada', selectors: ['#inicio', 'section#inicio'] },
  { id: 'ratings', label: '06 // Opiniones & Reseñas', selectors: ['#opiniones', 'section#opiniones'] },
  { id: 'services', label: '02 // Servicios & Soluciones', selectors: ['#servicios', 'section#servicios', '#mercados'] },
  { id: 'features', label: '03 // Funciones Interactivas', selectors: ['#metodo', '#funciones', 'section#metodo'] },
  { id: 'techStack', label: '05 // Tech Stack & Terminal', selectors: ['#tecnologias', '#tech', 'section#tecnologias'] },
  { id: 'about', label: '04 // Nosotros (Misión & Visión)', selectors: ['#nosotros', '#estudio', 'section#nosotros'] },
  { id: 'contact', label: '07 // Contacto & Footer', selectors: ['#contacto', 'section#contacto'] },
]

export function initSectionEngagementTracker() {
  if (typeof window === 'undefined') return () => {}

  // Estado en memoria de cada sección
  const stateMap = new Map<string, { startTime: number | null; hasCountedView: boolean }>()

  SECTION_CONFIGS.forEach((cfg) => {
    stateMap.set(cfg.id, { startTime: null, hasCountedView: false })
  })

  const sendData = (sectionId: string, seconds: number, isNewView: boolean) => {
    if (seconds <= 0 && !isNewView) return
    try {
      const payload = {
        sectionId,
        seconds: Math.max(1, Math.round(seconds)),
        isNewView,
      }
      fetch(`${API_BASE_URL}/analytics/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {})
    } catch {}
  }

  const checkVisibility = () => {
    const now = Date.now()
    const windowHeight = window.innerHeight

    SECTION_CONFIGS.forEach((cfg) => {
      let el: HTMLElement | null = null
      for (const sel of cfg.selectors) {
        el = document.querySelector(sel) as HTMLElement
        if (el) break
      }

      if (!el) return

      const rect = el.getBoundingClientRect()
      // La sección está visible si al menos una porción significativa está en la ventana
      const isVisible = rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25
      const state = stateMap.get(cfg.id)!

      if (isVisible) {
        if (!state.startTime) {
          state.startTime = now
          if (!state.hasCountedView) {
            state.hasCountedView = true
            sendData(cfg.id, 0, true) // +1 vista
          }
        }
      } else {
        if (state.startTime) {
          const elapsed = (now - state.startTime) / 1000
          state.startTime = null
          if (elapsed >= 1) {
            sendData(cfg.id, elapsed, false) // +X segundos
          }
        }
      }
    })
  }

  const flushAll = () => {
    const now = Date.now()
    SECTION_CONFIGS.forEach((cfg) => {
      const state = stateMap.get(cfg.id)
      if (state && state.startTime) {
        const elapsed = (now - state.startTime) / 1000
        state.startTime = now
        if (elapsed >= 1) {
          sendData(cfg.id, elapsed, false)
        }
      }
    })
  }

  // Comprobar visibilidad en scroll, resize y periódicamente cada 4 segundos
  window.addEventListener('scroll', checkVisibility, { passive: true })
  window.addEventListener('resize', checkVisibility, { passive: true })
  const interval = setInterval(() => {
    checkVisibility()
    flushAll()
  }, 4000)

  // Ejecución inicial después del montaje
  setTimeout(checkVisibility, 500)

  window.addEventListener('beforeunload', flushAll)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushAll()
  })

  return () => {
    flushAll()
    clearInterval(interval)
    window.removeEventListener('scroll', checkVisibility)
    window.removeEventListener('resize', checkVisibility)
    window.removeEventListener('beforeunload', flushAll)
  }
}
