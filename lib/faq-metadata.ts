import type { Metadata } from 'next'
import { BASE_URL } from './site'

const TITLES: Record<string, string> = {
  es: 'Preguntas Frecuentes (FAQ) | TLUX Studio',
  en: 'Frequently Asked Questions (FAQ) | TLUX Studio',
  pt: 'Perguntas Frequentes (FAQ) | TLUX Studio',
  'pt-BR': 'Perguntas Frequentes (FAQ) | TLUX Studio',
}

const DESCRIPTIONS: Record<string, string> = {
  es: 'Encuentra respuestas a todas tus dudas sobre nuestra plataforma, ingeniería en Next.js, contenidos técnicos y servicios de desarrollo digital en TLUX.',
  en: 'Find answers to all your questions regarding our platform, Next.js engineering, technical content, and digital development services at TLUX.',
  pt: 'Encontre respostas para todas as suas dúvidas sobre nossa plataforma, engenharia em Next.js, conteúdo técnico e serviços de desenvolvimento digital na TLUX.',
  'pt-BR': 'Encontre respostas para todas as suas dúvidas sobre nossa plataforma, engenharia em Next.js, conteúdo técnico e serviços de desenvolvimento digital na TLUX.',
}

export function buildFaqMetadata(locale: string = 'es'): Metadata {
  const langKey = locale.toLowerCase() === 'pt-br' ? 'pt-BR' : locale === 'en' ? 'en' : locale === 'pt' ? 'pt' : 'es'
  const title = TITLES[langKey] || TITLES.es
  const description = DESCRIPTIONS[langKey] || DESCRIPTIONS.es
  const path = langKey === 'es' ? '/faq' : `/${langKey}/faq`
  const canonicalUrl = `${BASE_URL}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: `${BASE_URL}/faq`,
        en: `${BASE_URL}/en/faq`,
        pt: `${BASE_URL}/pt/faq`,
        'pt-BR': `${BASE_URL}/pt-BR/faq`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'TLUX Studio',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/tlux-logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/tlux-logo.png`],
    },
  }
}
