import { getAllPosts, getLocalizedPost } from '@/lib/mock-data'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { BlogView } from '@/components/blog/blog-view'
import { buildBlogListingMetadata } from '@/lib/blog-metadata'

export const metadata = buildBlogListingMetadata('es')

export default function BlogListingPage() {
  const rawPosts = getAllPosts()
  const locale = 'es'
  const posts = rawPosts.map((p) => getLocalizedPost(p, locale))

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Exactamente el mismo Navbar adaptado para no saturar con anclas de la landing */}
      <SiteHeader />

      {/* Cuerpo Principal del Blog con las 5 Secciones Requeridas */}
      <main className="flex-1">
        <BlogView posts={posts} />
      </main>

      {/* Exactamente el mismo Footer institucional */}
      <SiteFooter />
      <WhatsAppFloatingButton />
    </div>
  )
}