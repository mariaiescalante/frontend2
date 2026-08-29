import { BlogPost } from './mock-data'

const API_BASE_URL = (typeof window === 'undefined' ? process.env.API_URL : null) || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export interface ArticleApiItem {
  id: string
  code: string
  title: string
  titles?: Record<string, string>
  category: string
  author: string
  date: string
  views: string
  status: 'PUBLICADO' | 'BORRADOR'
  languages: string[]
  slug?: string
  slugs?: Record<string, string>
  excerpt?: string
  excerpts?: Record<string, string>
  content?: string
  contents?: Record<string, string>
  coverImage?: string
  cover_image?: string
}

/**
 * Extrae de forma segura el arreglo de artículos sin importar el wrapper de Express ({ data: [...] }, { rows: [...] }, etc)
 */
function normalizeArticlesArray(rawJson: any): ArticleApiItem[] {
  if (!rawJson) return []
  if (Array.isArray(rawJson)) return rawJson
  if (Array.isArray(rawJson.data)) return rawJson.data
  if (rawJson.data && Array.isArray(rawJson.data.rows)) return rawJson.data.rows
  if (Array.isArray(rawJson.rows)) return rawJson.rows
  return []
}

function parseMultiLang(val: any, defaultText: string = ''): { es: string; en: string; pt: string } {
  if (!val) return { es: defaultText, en: defaultText, pt: defaultText }
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val)
      if (typeof parsed === 'object' && parsed !== null) {
        const fallback = parsed.es || parsed.en || parsed.pt || Object.values(parsed)[0] || defaultText
        return {
          es: parsed.es || fallback,
          en: parsed.en || fallback,
          pt: parsed.pt || parsed['pt-BR'] || fallback,
        }
      }
    } catch {}
    return { es: val, en: val, pt: val }
  }
  if (typeof val === 'object') {
    const fallback = val.es || val.en || val.pt || Object.values(val)[0] || defaultText
    return {
      es: val.es || fallback,
      en: val.en || fallback,
      pt: val.pt || val['pt-BR'] || fallback,
    }
  }
  return { es: String(val), en: String(val), pt: String(val) }
}

/**
 * Servicio dinámico REAL que consulta EXCLUSIVAMENTE al Backend API & Panel CMS (Cero Mock Data)
 */
export async function fetchPublicBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles`, {
      cache: 'no-store', // Deshabilita cache para reflejar cambios instantáneos del CMS
    })

    if (!res.ok) {
      console.warn(`[BLOG_SERVICE] La API respondió con estado ${res.status}`)
      return []
    }

    const rawJson = await res.json()
    const articlesList = normalizeArticlesArray(rawJson)

    // Filtrar únicamente los artículos HABILITADOS / PUBLICADOS en el Panel CMS
    const publishedArticles = articlesList.filter((art) => art && art.status === 'PUBLICADO')

    if (publishedArticles.length === 0) {
      return []
    }

    // Mapear los artículos reales del CMS al formato exigido por la interfaz del Blog
    return publishedArticles.map((art) => {
      const codeStr = art.code || `ART-${art.id || '101'}`
      const articleCover = art.coverImage || art.cover_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
      const slugObj = parseMultiLang(art.slugs || art.slug, codeStr.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
      const titleObj = parseMultiLang(art.titles || art.title, 'Artículo sin título')
      const excerptObj = parseMultiLang(art.excerpts || art.excerpt, 'Artículo administrado desde el Panel CMS.')
      const contentObj = parseMultiLang(art.contents || art.content, `<p class="text-lg text-slate-300">${titleObj.es}</p>`)

      return {
        slug: slugObj.es,
        slugs: slugObj,
        title: titleObj,
        excerpt: excerptObj,
        content: contentObj,
        coverImage: articleCover,
        publishedAt: art.date || new Date().toISOString().split('T')[0],
        readingTime: 5,
        tags: [art.category || 'GENERAL'],
        author: {
          name: art.author || 'Equipo TLUX',
          role: 'Tech Lead',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        },
      }
    })
  } catch (error) {
    console.error('[BLOG_SERVICE] Error de conexión con la API:', error)
    return []
  }
}

/**
 * Obtiene un artículo específico por su slug (filtrando que esté PUBLICADO)
 */
export async function fetchPublicBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchPublicBlogPosts()
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim()
  return posts.find((p: any) => {
    if (p.slug === cleanSlug || p.slug?.includes(cleanSlug)) return true
    if (p.slugs) {
      if (p.slugs.es === cleanSlug || p.slugs.en === cleanSlug || p.slugs.pt === cleanSlug) return true
    }
    return false
  })
}
