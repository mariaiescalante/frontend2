import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPostBySlug, getLocalizedPost, getAllPosts } from '@/lib/mock-data'
import { normalizeLocale, type Locale } from '@/lib/locale'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { ArticleBody } from '@/components/article/article-body'
import { buildBlogPostMetadata } from '@/lib/blog-metadata'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  return buildBlogPostMetadata(lang, slug)
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const languages = ['es', 'en', 'pt', 'pt-BR']

  return languages.flatMap((lang) =>
    posts.map((post) => ({
      lang,
      slug: post.slug,
    }))
  )
}

export default async function LocalizedBlogPostDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const validLang: Locale = normalizeLocale(lang)
  if (validLang === 'es') permanentRedirect(`/blog/${slug}`)

  const rawPost = getPostBySlug(slug)

  if (!rawPost) {
    notFound()
  }

  const post = getLocalizedPost(rawPost, validLang)

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Exactamente el mismo Navbar de la landing */}
      <SiteHeader />

      {/* Vista Detallada del Artículo con TOC Interactivo y Secciones Exactas */}
      <main className="flex-1">
        <ArticleBody post={post} />
      </main>

      {/* Exactamente el mismo Footer de la landing */}
      <SiteFooter />
      <WhatsAppFloatingButton />
    </div>
  )
}