import type { Metadata } from 'next'
import { TluxLanding } from '@/components/tlux-landing'
import { Locale } from '@/context/language-context'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://corptlux.test'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const rawLang = lang.toLowerCase()
  const validLang: Locale = rawLang === 'pt-br' || rawLang === 'pt' ? 'pt-BR' : rawLang === 'en' ? 'en' : 'es'

  const titles: Record<string, string> = {
    es: 'TLUX | Tecnología Líder en Experiencia de Usuario',
    en: 'TLUX | Leading User Experience Technology',
    pt: 'TLUX | Tecnologia Líder em Experiência do Usuário',
    'pt-BR': 'TLUX | Tecnologia Líder em Experiência do Usuário',
  }

  const descriptions: Record<string, string> = {
    es: 'TLUX es un estudio digital independiente que convierte negocios con ambición en experiencias imposibles de ignorar.',
    en: 'TLUX is an independent digital studio turning ambitious businesses into unmissable experiences.',
    pt: 'TLUX é um estúdio digital independente que transforma negócios ambiciosos em experiências imperdíveis.',
    'pt-BR': 'TLUX é um estúdio digital independente que transforma negócios ambiciosos em experiências imperdíveis.',
  }

  // URL Canónica por defecto: En Español apunta directamente a la raíz http://corptlux.test/
  const canonicalUrl = validLang === 'es' ? `${BASE_URL}/` : `${BASE_URL}/${validLang}/`

  return {
    title: titles[validLang] || titles.es,
    description: descriptions[validLang] || descriptions.es,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es': `${BASE_URL}/`,
        'en': `${BASE_URL}/en/`,
        'pt-BR': `${BASE_URL}/pt-BR/`,
        'pt-PT': `${BASE_URL}/pt-BR/`,
        'pt': `${BASE_URL}/pt-BR/`,
        'x-default': `${BASE_URL}/`,
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }, { lang: 'pt' }, { lang: 'pt-BR' }]
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const rawLang = lang.toLowerCase()
  const validLang: Locale = rawLang === 'pt-br' || rawLang === 'pt' ? 'pt-BR' : rawLang === 'en' ? 'en' : 'es'

  const titles: Record<string, string> = {
    es: 'TLUX | Tecnología Líder en Experiencia de Usuario',
    en: 'TLUX | Leading User Experience Technology',
    pt: 'TLUX | Tecnologia Líder em Experiência do Usuário',
    'pt-BR': 'TLUX | Tecnologia Líder em Experiência do Usuário',
  }

  const descriptions: Record<string, string> = {
    es: 'TLUX es un estudio digital independiente que convierte negocios con ambición en experiencias imposibles de ignorar.',
    en: 'TLUX is an independent digital studio turning ambitious businesses into unmissable experiences.',
    pt: 'TLUX é um estúdio digital independente que transforma negócios ambiciosos em experiências imperdíveis.',
    'pt-BR': 'TLUX é um estúdio digital independente que transforma negócios ambiciosos em experiências imperdíveis.',
  }

  const currentCanonicalUrl = validLang === 'es' ? `${BASE_URL}/` : `${BASE_URL}/${validLang}/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${BASE_URL}/#organization`,
        name: 'TLUX',
        url: BASE_URL,
        logo: `${BASE_URL}/tlux-logo.png`,
        image: `${BASE_URL}/tlux-logo.png`,
        description: descriptions[validLang] || descriptions.es,
        telephone: '+573203249742',
        email: 'hola@tlux.studio',
        sameAs: [
          'https://linkedin.com',
          'https://github.com',
          'https://x.com',
          'https://instagram.com',
        ],
        priceRange: '$$$',
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: currentCanonicalUrl,
        name: titles[validLang] || titles.es,
        inLanguage: validLang === 'pt-BR' ? ['pt-BR', 'pt-PT'] : validLang,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TluxLanding initialLocale={validLang} />
    </>
  )
}
