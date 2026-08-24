import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { FaqView } from '@/components/faq/faq-view'
import { buildFaqMetadata } from '@/lib/faq-metadata'
import { fetchPublicFaqs } from '@/lib/faq-service'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const metadata = buildFaqMetadata('es')

export default async function FaqPage() {
  // Cargar preguntas frecuentes dinámicas reales desde la base de datos MySQL / Panel CMS
  const { items, categories } = await fetchPublicFaqs('es')

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1">
        <FaqView initialFaqs={items} initialCategories={categories} />
      </main>

      <SiteFooter />
      <WhatsAppFloatingButton />
    </div>
  )
}
