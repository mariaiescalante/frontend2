import type { Metadata } from 'next'
import { TluxLanding } from '@/components/tlux-landing'
import { JsonLd } from '@/components/json-ld'
import { buildMetadata } from '@/lib/metadata'
import { buildJsonLd } from '@/lib/json-ld'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('es')
}

export default function RootPage() {
  const jsonLd = buildJsonLd('es')

  return (
    <>
      <JsonLd data={jsonLd} />
      <TluxLanding />
    </>
  )
}
