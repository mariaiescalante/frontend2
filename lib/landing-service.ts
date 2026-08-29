import { FullLandingContent } from '../types/landing'
import { initialLandingData } from './landing-mock-data'

const API_BASE_URL = (typeof window === 'undefined' ? process.env.API_URL : null) || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export async function fetchLandingContent(): Promise<FullLandingContent> {
  try {
    const res = await fetch(`${API_BASE_URL}/landing`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    if (!res.ok) return initialLandingData

    const json = await res.json()
    const data = json.data || {}

    return {
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
  } catch (err) {
    console.warn('Error en fetchLandingContent (SSR):', err)
    return initialLandingData
  }
}
