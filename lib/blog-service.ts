import { BlogPost } from './mock-data'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export interface ArticleApiItem {
  id: string
  code: string
  title: string
  category: string
  author: string
  date: string
  views: string
  status: 'PUBLICADO' | 'BORRADOR'
  languages: string[]
  slug?: string
  excerpt?: string
  content?: string
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
      const generatedSlug = art.slug || codeStr.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const articleCover = art.coverImage || art.cover_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'

      return {
        slug: generatedSlug,
        title: {
          es: art.title || 'Artículo sin título',
          en: art.title || 'Untitled Article',
          pt: art.title || 'Artigo sem título',
        },
        excerpt: {
          es: art.excerpt || 'Artículo administrado desde el Panel CMS.',
          en: art.excerpt || 'Article managed from CMS Panel.',
          pt: art.excerpt || 'Artigo gerenciado pelo Painel CMS.',
        },
        content: {
          es: art.content || `<p class="text-lg text-slate-300">${art.title}</p>`,
          en: art.content || `<p class="text-lg text-slate-300">${art.title}</p>`,
          pt: art.content || `<p class="text-lg text-slate-300">${art.title}</p>`,
        },
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
  return posts.find((p) => p.slug === slug || p.slug.includes(slug))
}
