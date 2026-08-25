import type { Metadata } from 'next'
import { TluxLanding } from '@/components/tlux-landing'
import { JsonLd } from '@/components/json-ld'
import { buildMetadata } from '@/lib/metadata'
import { buildJsonLd } from '@/lib/json-ld'
import { fetchLandingContent } from '@/lib/landing-service'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('es')
}

export default async function RootPage() {
  const jsonLd = buildJsonLd('es')
  const initialContent = await fetchLandingContent()

  return (
    <>
      <JsonLd data={jsonLd} />
      <TluxLanding initialContent={initialContent} initialLocale="es" />
    </>
  )
}