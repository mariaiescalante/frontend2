import type { Metadata } from 'next'
import { TluxLanding } from '@/components/tlux-landing'
import { Locale } from '@/context/language-context'

const BASE_URL = 'https://corptlux.com'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const validLang = ['es', 'en', 'pt'].includes(lang) ? lang : 'es'

  const titles: Record<string, string> = {
    es: 'TLUX | Tecnología Líder en Experiencia de Usuario',
    en: 'TLUX | Leading User Experience Technology',
    pt: 'TLUX | Tecnologia Líder em Experiência do Usuário',
  }

  const descriptions: Record<string, string> = {
    es: 'TLUX es un estudio digital independiente que convierte negocios con ambición en experiencias imposibles de ignorar.',
    en: 'TLUX is an independent digital studio turning ambitious businesses into unmissable experiences.',
    pt: 'TLUX é um estúdio digital independente que transforma negócios ambiciosos em experiências imperdíveis.',
  }

  return {
    title: titles[validLang] || titles.es,
    description: descriptions[validLang] || descriptions.es,
    alternates: {
      canonical: `${BASE_URL}/${validLang}/`,
      languages: {
        'es': `${BASE_URL}/es/`,
        'en': `${BASE_URL}/en/`,
        'pt': `${BASE_URL}/pt/`,
        'x-default': `${BASE_URL}/es/`,
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }, { lang: 'pt' }]
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const validLang: Locale = (['es', 'en', 'pt'].includes(lang) ? lang : 'es') as Locale

  return <TluxLanding initialLocale={validLang} />
}
