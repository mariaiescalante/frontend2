import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { TluxLanding } from '@/components/tlux-landing'
import { JsonLd } from '@/components/json-ld'
import { normalizeLocale } from '@/lib/locale'
import { buildMetadata } from '@/lib/metadata'
import { buildJsonLd } from '@/lib/json-ld'
import { fetchLandingContent } from '@/lib/landing-service'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata(normalizeLocale(lang))
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const validLang = normalizeLocale(lang)

  if (validLang === 'es') permanentRedirect('/')

  const jsonLd = buildJsonLd(validLang)
  const initialContent = await fetchLandingContent()

  return (
    <>
      <JsonLd data={jsonLd} />
      <TluxLanding initialContent={initialContent} initialLocale={validLang} />
    </>
  )
}
