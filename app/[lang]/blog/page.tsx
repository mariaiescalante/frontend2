import { permanentRedirect } from 'next/navigation'
import { getLocalizedPost } from '@/lib/mock-data'
import { fetchPublicBlogPosts } from '@/lib/blog-service'
import { normalizeLocale, type Locale } from '@/lib/locale'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { BlogView } from '@/components/blog/blog-view'
import { buildBlogListingMetadata } from '@/lib/blog-metadata'

type Props = {
  params: Promise<{ lang: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return buildBlogListingMetadata(lang)
}

export default async function LocalizedBlogListingPage({ params }: Props) {
  const { lang } = await params
  const validLang: Locale = normalizeLocale(lang)

  if (validLang === 'es') permanentRedirect('/blog')

  const rawPosts = await fetchPublicBlogPosts()
  const posts = rawPosts.map((p) => getLocalizedPost(p, validLang))

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Exactamente el mismo Navbar adaptado para no saturar con anclas de la landing */}
      <SiteHeader />

      {/* Cuerpo Principal del Blog */}
      <main className="flex-1">
        <BlogView posts={posts} />
      </main>

      {/* Exactamente el mismo Footer institucional */}
      <SiteFooter />
      <WhatsAppFloatingButton />
    </div>
  )
}