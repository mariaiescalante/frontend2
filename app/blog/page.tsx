import { fetchPublicBlogPosts } from '@/lib/blog-service'
import { getLocalizedPost } from '@/lib/mock-data'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { BlogView } from '@/components/blog/blog-view'
import { buildBlogListingMetadata } from '@/lib/blog-metadata'

export const metadata = buildBlogListingMetadata('es')

export default async function BlogListingPage() {
  // Obtener artículos administrados dinámicamente desde el Panel CMS / Express API
  const rawPosts = await fetchPublicBlogPosts()
  const locale = 'es'
  const posts = rawPosts.map((p) => getLocalizedPost(p, locale))

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Navbar de la landing */}
      <SiteHeader />

      {/* Cuerpo Principal del Blog renderizando artículos dinámicos del Panel CMS */}
      <main className="flex-1">
        <BlogView posts={posts} />
      </main>

      {/* Footer de la landing */}
      <SiteFooter />
      <WhatsAppFloatingButton />
    </div>
  )
}