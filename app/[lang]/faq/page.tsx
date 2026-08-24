import { permanentRedirect } from 'next/navigation'
import { normalizeLocale, type Locale } from '@/lib/locale'
import { SiteHeader } from '@/components/sections/site-header'
import { SiteFooter } from '@/components/sections/contacto-section'
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating-button'
import { FaqView } from '@/components/faq/faq-view'
import { buildFaqMetadata } from '@/lib/faq-metadata'
import { fetchPublicFaqs } from '@/lib/faq-service'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props) {
  const { lang } = await params
  return buildFaqMetadata(lang)
}

export default async function LocalizedFaqPage({ params }: Props) {
  const { lang } = await params
  const validLang: Locale = normalizeLocale(lang)

  if (validLang === 'es') permanentRedirect('/faq')

  const { items, categories } = await fetchPublicFaqs(validLang)

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
