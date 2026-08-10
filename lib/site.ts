import type { Locale } from './locale'

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://corptlux.test'

export const SITE_EMAIL = 'hola@tlux.studio'
export const SITE_PHONE = '+573203249742'
export const SITE_LOGO = `${BASE_URL}/tlux-logo.png`

export const SOCIAL_LINKS = [
  'https://linkedin.com',
  'https://github.com',
  'https://x.com',
  'https://instagram.com',
]

export const OG_LOCALES: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_US',
  pt: 'pt_BR',
  'pt-BR': 'pt_BR',
}

export const OG_ALTERNATE_LOCALES: Record<Locale, string[]> = {
  es: ['pt_BR', 'en_US'],
  en: ['es_ES', 'pt_BR'],
  pt: ['es_ES', 'en_US'],
  'pt-BR': ['es_ES', 'en_US'],
}

export function canonicalFor(locale: Locale): string {
  return locale === 'es' ? `${BASE_URL}/` : `${BASE_URL}/${locale}/`
}
