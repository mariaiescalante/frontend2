import type { Metadata } from 'next'
import type { Locale } from './locale'
import { SITE_TITLES, SITE_DESCRIPTIONS } from './locale'
import { BASE_URL, canonicalFor, OG_LOCALES, OG_ALTERNATE_LOCALES } from './site'

export function buildMetadata(locale: Locale): Metadata {
  const canonicalUrl = canonicalFor(locale)

  return {
    metadataBase: new URL(BASE_URL),
    title: SITE_TITLES[locale],
    description: SITE_DESCRIPTIONS[locale],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es': `${BASE_URL}/`,
        'en': `${BASE_URL}/en/`,
        'pt': `${BASE_URL}/pt/`,
        'pt-BR': `${BASE_URL}/pt-BR/`,
        'x-default': `${BASE_URL}/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'TLUX',
      title: SITE_TITLES[locale],
      description: SITE_DESCRIPTIONS[locale],
      locale: OG_LOCALES[locale],
      alternateLocale: OG_ALTERNATE_LOCALES[locale],
      images: [
        {
          url: `${BASE_URL}/tlux-logo.png`,
          alt: 'TLUX',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLES[locale],
      description: SITE_DESCRIPTIONS[locale],
      images: [`${BASE_URL}/tlux-logo.png`],
    },
  }
}
