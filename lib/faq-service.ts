const API_BASE_URL = (typeof window === 'undefined' ? process.env.API_URL : null) || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export interface FaqItem {
  id: string
  number: string
  question: string
  answer: string
  category: string
  categoryId: string
  categoryLabel: string
}

export interface FaqCategoryItem {
  id: string
  label: string
}

function normalizeArray<T>(rawJson: any): T[] {
  if (!rawJson) return []
  if (Array.isArray(rawJson)) return rawJson
  if (Array.isArray(rawJson.data)) return rawJson.data
  if (rawJson.data && Array.isArray(rawJson.data.rows)) return rawJson.data.rows
  if (Array.isArray(rawJson.rows)) return rawJson.rows
  return []
}

function parseMultiLang(val: any, locale: string = 'es', defaultText: string = ''): string {
  if (!val) return defaultText
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val)
      if (typeof parsed === 'object' && parsed !== null) {
        const norm = locale.toLowerCase()
        if (norm === 'pt' || norm === 'pt-br') {
          return parsed['pt'] || parsed['pt-BR'] || parsed['es'] || Object.values(parsed)[0] || defaultText
        }
        if (norm === 'en') {
          return parsed['en'] || parsed['es'] || Object.values(parsed)[0] || defaultText
        }
        return parsed['es'] || Object.values(parsed)[0] || defaultText
      }
      return parsed
    } catch {
      return val
    }
  }
  if (typeof val === 'object') {
    const norm = locale.toLowerCase()
    if (norm === 'pt' || norm === 'pt-br') {
      return val['pt'] || val['pt-BR'] || val['es'] || Object.values(val)[0] || defaultText
    }
    if (norm === 'en') {
      return val['en'] || val['es'] || Object.values(val)[0] || defaultText
    }
    return val['es'] || Object.values(val)[0] || defaultText
  }
  return String(val)
}

/**
 * Consulta las Preguntas Frecuentes (FAQs) dinámicas reales registradas en MySQL desde el Panel CMS
 */
export async function fetchPublicFaqs(locale: string = 'es'): Promise<{ items: FaqItem[]; categories: FaqCategoryItem[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs`, {
      cache: 'no-store', // Reflejar cambios del CMS en tiempo real
    })

    if (!res.ok) {
      console.warn(`[FAQ_SERVICE] La API respondió con estado ${res.status}`)
      return { items: [], categories: [{ id: 'todas', label: 'TODAS' }] }
    }

    const rawJson = await res.json()
    const faqsList = normalizeArray<any>(rawJson)

    const items: FaqItem[] = faqsList.map((f, idx) => {
      const catName = parseMultiLang(f.categories || f.category, locale, 'GENERAL')
      const catId = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      return {
        id: String(f.id || `faq-${idx + 1}`),
        number: f.number || String(idx + 1).padStart(2, '0'),
        question: parseMultiLang(f.questions || f.question, locale, 'Pregunta sin título'),
        answer: parseMultiLang(f.answers || f.answer, locale, 'Sin respuesta configurada.'),
        category: catName,
        categoryId: catId,
        categoryLabel: catName.toUpperCase(),
      }
    })

    // Construir lista única de categorías detectadas de MySQL
    const uniqueCatsMap = new Map<string, string>()
    uniqueCatsMap.set('todas', locale === 'en' ? 'ALL' : (locale === 'pt' || locale === 'pt-BR') ? 'TODAS' : 'TODAS')

    items.forEach((item) => {
      if (item.categoryId && item.categoryLabel) {
        uniqueCatsMap.set(item.categoryId, item.categoryLabel)
      }
    })

    const categories: FaqCategoryItem[] = Array.from(uniqueCatsMap.entries()).map(([id, label]) => ({
      id,
      label,
    }))

    return { items, categories }
  } catch (error) {
    console.error('[FAQ_SERVICE] Error al conectar con la API de MySQL:', error)
    return { items: [], categories: [{ id: 'todas', label: 'TODAS' }] }
  }
}
