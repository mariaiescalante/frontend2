'use client'

import { useState, useEffect } from 'react'
import { FullLandingContent } from '../types/landing'
import { initialLandingData } from './landing-mock-data'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
const CACHE_KEY = 'tlux_landing_content_cache'

export function useLandingContent() {
  // Carga instantánea síncrona desde caché local para evitar cualquier parpadeo de imagen o texto
  const [content, setContent] = useState<FullLandingContent>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          return {
            ...initialLandingData,
            ...parsed,
            hero: { ...initialLandingData.hero, ...(parsed.hero || {}) },
          }
        }
      } catch {}
    }
    return initialLandingData
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchLanding() {
      try {
        const res = await fetch(`${API_BASE_URL}/landing`, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        })

        if (!res.ok) return

        const json = await res.json()
        const data = json.data || {}

        if (isMounted && data) {
          const merged: FullLandingContent = {
            hero: { ...initialLandingData.hero, ...(data.hero || {}) },
            stats: { ...initialLandingData.stats, ...(data.stats || {}) },
            clients: { ...initialLandingData.clients, ...(data.clients || {}) },
            services: { ...initialLandingData.services, ...(data.services || {}) },
            features: { ...initialLandingData.features, ...(data.features || {}) },
            about: { ...initialLandingData.about, ...(data.about || {}) },
            techStack: { ...initialLandingData.techStack, ...(data.techStack || {}) },
            ratings: { ...initialLandingData.ratings, ...(data.ratings || {}) },
            contact: { ...initialLandingData.contact, ...(data.contact || {}) },
            blog: { ...initialLandingData.blog, ...(data.blog || {}) },
            faq: { ...initialLandingData.faq, ...(data.faq || {}) },
            customSections: data.customSections || [],
          }

          setContent(merged)

          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(CACHE_KEY, JSON.stringify(merged))
            } catch {}
          }
        }
      } catch (err) {
        console.warn('[USE_LANDING_CONTENT] Usando defaults:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchLanding()

    return () => {
      isMounted = false
    }
  }, [])

  return { content, isLoading }
}
