const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

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

/**
 * Consulta las Preguntas Frecuentes (FAQs) dinámicas reales registradas en MySQL desde el Panel CMS
 */
export async function fetchPublicFaqs(): Promise<{ items: FaqItem[]; categories: FaqCategoryItem[] }> {
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
      const catName = f.category || 'GENERAL'
      const catId = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')

      return {
        id: String(f.id || `faq-${idx + 1}`),
        number: f.number || String(idx + 1).padStart(2, '0'),
        question: f.question || 'Pregunta sin título',
        answer: f.answer || 'Sin respuesta configurada.',
        category: catName,
        categoryId: catId,
        categoryLabel: catName.toUpperCase(),
      }
    })

    // Construir lista única de categorías detectadas de MySQL
    const uniqueCatsMap = new Map<string, string>()
    uniqueCatsMap.set('todas', 'TODAS')

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
