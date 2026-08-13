import type { Metadata } from 'next'
import type { Locale } from './locale'
import { normalizeLocale } from './locale'
import { BASE_URL, OG_LOCALES, OG_ALTERNATE_LOCALES } from './site'
import { getPostBySlug, getLocalizedPost } from './mock-data'

export const BLOG_OG_IMAGE = `${BASE_URL}/tlux-logo.png`

const BLOG_TITLES: Record<Locale, string> = {
  es: 'Blog & Recursos Técnicos | TLUX Studio',
  en: 'Blog & Technical Insights | TLUX Studio',
  pt: 'Blog & Recursos Técnicos | TLUX Studio',
  'pt-BR': 'Blog & Recursos Técnicos | TLUX Studio',
}

const BLOG_DESCRIPTIONS: Record<Locale, string> = {
  es: 'Conocimiento e infraestructura de contenido: Análisis sobre Next.js, arquitectura de software, SEO/AEO y experiencia de usuario.',
  en: 'Knowledge and content infrastructure: Insights on Next.js, software architecture, SEO/AEO, and user experience.',
  pt: 'Conhecimento e infraestrutura de conteúdo: Análises sobre Next.js, arquitetura de software, SEO/AEO e experiência do usuário.',
  'pt-BR': 'Conhecimento e infraestrutura de conteúdo: Análises sobre Next.js, arquitetura de software, SEO/AEO e experiência do usuário.',
}

export function blogListingUrl(locale: Locale): string {
  return locale === 'es' ? `${BASE_URL}/blog/` : `${BASE_URL}/${locale}/blog/`
}

export function blogPostUrl(locale: Locale, slug: string): string {
  return locale === 'es' ? `${BASE_URL}/blog/${slug}/` : `${BASE_URL}/${locale}/blog/${slug}/`
}

export function buildBlogListingMetadata(localeInput: string): Metadata {
  const locale = normalizeLocale(localeInput)
  const canonicalUrl = blogListingUrl(locale)

  return {
    title: BLOG_TITLES[locale],
    description: BLOG_DESCRIPTIONS[locale],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: blogListingUrl('es'),
        en: blogListingUrl('en'),
        'pt-BR': blogListingUrl('pt-BR'),
        'x-default': blogListingUrl('es'),
      },
    },
    openGraph: {
      title: BLOG_TITLES[locale],
      description: BLOG_DESCRIPTIONS[locale],
      url: canonicalUrl,
      siteName: 'TLUX Studio',
      type: 'website',
      locale: OG_LOCALES[locale],
      alternateLocale: OG_ALTERNATE_LOCALES[locale],
      images: [
        {
          url: BLOG_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: BLOG_TITLES[locale],
        },
      ],
    },
  }
}

export function buildBlogPostMetadata(localeInput: string, slug: string): Metadata {
  const locale = normalizeLocale(localeInput)
  const rawPost = getPostBySlug(slug)

  if (!rawPost) {
    return {
      title: 'Publicación No Encontrada | TLUX Blog',
    }
  }

  const post = getLocalizedPost(rawPost, locale)
  const canonicalUrl = blogPostUrl(locale, post.slug)

  return {
    title: `${post.title} | TLUX Blog`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: blogPostUrl('es', post.slug),
        en: blogPostUrl('en', post.slug),
        'pt-BR': blogPostUrl('pt-BR', post.slug),
        'x-default': blogPostUrl('es', post.slug),
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'TLUX Studio',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}