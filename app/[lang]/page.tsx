import type { Metadata } from 'next'
import { permanentRedirect } from 'next/navigation'
import { TluxLanding } from '@/components/tlux-landing'
import { JsonLd } from '@/components/json-ld'
import { normalizeLocale } from '@/lib/locale'
import { buildMetadata } from '@/lib/metadata'
import { buildJsonLd } from '@/lib/json-ld'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata(normalizeLocale(lang))
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }, { lang: 'pt' }, { lang: 'pt-BR' }]
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const validLang = normalizeLocale(lang)

  if (validLang === 'es') permanentRedirect('/')

  const jsonLd = buildJsonLd(validLang)

  return (
    <>
      <JsonLd data={jsonLd} />
      <TluxLanding />
    </>
  )
}
