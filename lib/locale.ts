export type Locale = 'es' | 'en' | 'pt' | 'pt-BR'

export const SUPPORTED_LOCALES: Locale[] = ['es', 'en', 'pt', 'pt-BR']

export function normalizeLocale(raw: string): Locale {
  const value = raw.trim().toLowerCase()
  if (value === 'en') return 'en'
  if (value === 'pt' || value === 'pt-br' || value === 'pt-pt') return 'pt-BR'
  return 'es'
}

export const SITE_TITLES: Record<Locale, string> = {
  es: 'TLUX | Tecnología Líder en Experiencia de Usuario',
  en: 'TLUX | Leading User Experience Technology',
  pt: 'TLUX | Tecnologia Líder em Experiência do Usuário',
  'pt-BR': 'TLUX | Tecnologia Líder em Experiência do Usuário',
}

export const SITE_DESCRIPTIONS: Record<Locale, string> = {
  es: 'TLUX es un estudio digital independiente que convierte negocios con ambición en experiencias imposibles de ignorar.',
  en: 'TLUX is an independent digital studio turning ambitious businesses into unmissable experiences.',
  pt: 'TLUX é um estúdio digital independente que transforma negócios ambiciosos em experiências imperdíveis.',
  'pt-BR': 'TLUX é um estúdio digital independente que transforma negócios ambiciosos em experiências imperdíveis.',
}
