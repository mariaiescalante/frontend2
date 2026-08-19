import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { FaqView } from '@/components/faq/faq-view'
import { buildFaqMetadata } from '@/lib/faq-metadata'

export const metadata = buildFaqMetadata('es')

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1">
        <FaqView initialLocale="es" />
      </main>

      <SiteFooter />
      <WhatsAppFloatingButton />
    </div>
  )
}
