import { SITE_TITLES, SITE_DESCRIPTIONS } from './locale'
import type { Locale } from './locale'
import {
  BASE_URL,
  canonicalFor,
  SOCIAL_LINKS,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_LOGO,
} from './site'

export function buildJsonLd(validLang: Locale) {
  const canonicalUrl = canonicalFor(validLang)
  const inLanguage = validLang === 'pt-BR' ? ['pt-BR', 'pt-PT'] : validLang

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'TLUX',
        alternateName: 'TLUX Studio',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: SITE_LOGO,
        },
        image: SITE_LOGO,
        description: SITE_DESCRIPTIONS[validLang],
        email: SITE_EMAIL,
        telephone: SITE_PHONE,
        priceRange: '$$$',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: SITE_PHONE,
          email: SITE_EMAIL,
          availableLanguage: ['es', 'en', 'pt-BR'],
        },
        sameAs: SOCIAL_LINKS,
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'TLUX',
        description: SITE_DESCRIPTIONS[validLang],
        inLanguage,
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: SITE_TITLES[validLang],
        description: SITE_DESCRIPTIONS[validLang],
        inLanguage,
        isPartOf: {
          '@id': `${BASE_URL}/#website`,
        },
        about: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${BASE_URL}/#service`,
        serviceType: 'Diseño y desarrollo web, marketing digital y consultoría UX',
        name: SITE_TITLES[validLang],
        description: SITE_DESCRIPTIONS[validLang],
        provider: {
          '@id': `${BASE_URL}/#organization`,
        },
        areaServed: 'Worldwide',
        audience: {
          '@type': 'Audience',
          audienceType: 'Empresas y negocios con ambición',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  }
}
