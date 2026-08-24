import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getLocalizedPost } from '@/lib/mock-data'
import { fetchPublicBlogPostBySlug, fetchPublicBlogPosts } from '@/lib/blog-service'
import { normalizeLocale, type Locale } from '@/lib/locale'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { ArticleBody } from '@/components/article/article-body'
import { buildBlogPostMetadata } from '@/lib/blog-metadata'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  return buildBlogPostMetadata(lang, slug)
}

export default async function LocalizedBlogPostDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const validLang: Locale = normalizeLocale(lang)
  if (validLang === 'es') permanentRedirect(`/blog/${slug}`)

  const [rawPost, allRawPosts] = await Promise.all([
    fetchPublicBlogPostBySlug(slug),
    fetchPublicBlogPosts(),
  ])

  if (!rawPost) {
    notFound()
  }

  const post = getLocalizedPost(rawPost, validLang)
  const allPosts = allRawPosts.map((p) => getLocalizedPost(p, validLang))

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Exactamente el mismo Navbar de la landing */}
      <SiteHeader />

      {/* Vista Detallada del Artículo con TOC Interactivo y Secciones Exactas */}
      <main className="flex-1">
        <ArticleBody post={post} allPosts={allPosts} />
      </main>

      {/* Exactamente el mismo Footer de la landing */}
      <SiteFooter />
      <WhatsAppFloatingButton />
    </div>
  )
}