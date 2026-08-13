import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getLocalizedPost, getAllPosts } from '@/lib/mock-data'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { ArticleBody } from '@/components/article/article-body'
import { buildBlogPostMetadata } from '@/lib/blog-metadata'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return buildBlogPostMetadata('es', slug)
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params
  const rawPost = getPostBySlug(slug)

  if (!rawPost) {
    notFound()
  }

  const post = getLocalizedPost(rawPost, 'es')

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