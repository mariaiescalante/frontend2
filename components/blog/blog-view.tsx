'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'
import type { LocalizedBlogPost } from '@/lib/mock-data'
import { useTranslation } from '@/context/language-context'
import { useLandingContent } from '@/lib/use-landing-content'

type CategoryFilter = 'TODOS' | 'DESARROLLO' | 'DISEÑO UI/UX' | 'SEO & AEO'

export function BlogView({ posts }: { posts: LocalizedBlogPost[] }) {
  const { t, locale } = useTranslation()
  const { content } = useLandingContent()
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('TODOS')
  const [searchQuery, setSearchQuery] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Restaurar la posición exacta de scroll si venimos de un cambio de idioma
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedPosY = sessionStorage.getItem('scrollPosY')
      if (savedPosY !== null) {
        sessionStorage.removeItem('scrollPosY')
        const posY = parseInt(savedPosY, 10)
        if (!isNaN(posY)) {
          setTimeout(() => {
            window.scrollTo({ top: posY, left: 0, behavior: 'instant' as ScrollBehavior })
          }, 0)
        }
      }
    }
  })

  // Category labels map for filter buttons
  const categoryLabels: Record<CategoryFilter, string> = {
    'TODOS': t('blog.cat_todos') || 'TODOS',
    'DESARROLLO': t('blog.cat_desarrollo') || 'DESARROLLO',
    'DISEÑO UI/UX': t('blog.cat_diseno') || 'DISEÑO UI/UX',
    'SEO & AEO': t('blog.cat_seo') || 'SEO & AEO',
  }

  // Filtrado dinámico
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (activeCategory === 'TODOS') return true
    if (activeCategory === 'DESARROLLO') {
      return post.tags.some((t) => ['NEXTJS', 'NEXT.JS', 'ARCHITECTURE', 'PERFORMANCE', 'DESARROLLO', 'DEVELOPMENT'].includes(t.toUpperCase()))
    }
    if (activeCategory === 'DISEÑO UI/UX') {
      return post.tags.some((t) => ['UX_UI', 'DISEÑO UI/UX', 'CONVERSION', 'DESIGN SYSTEM'].includes(t.toUpperCase()))
    }
    if (activeCategory === 'SEO & AEO') {
      return post.tags.some((t) => ['SEO_AEO', 'SEO & AEO', 'ARTIFICIAL_INTELLIGENCE', 'SEMANTICS'].includes(t.toUpperCase()))
    }
    return true
  })

  // Artículo Destacado (Primer post o fallback)
  const featuredPost: LocalizedBlogPost = posts[0] || {
    slug: 'arquitectura-nextjs-app-router-2026',
    title: 'Arquitectura de contenido escalable con Next.js y CMS headless.',
    excerpt: 'Cómo estructurar aplicaciones web escalables combinando Server Components, caching inteligente en el edge y la compilación acelerada con Turbopack.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-18T10:00:00Z',
    readingTime: 5,
    tags: ['NEXTJS', 'ARCHITECTURE'],
    author: {
      name: 'Elena Vásquez',
      role: 'LEAD CONTENT ENGINEER',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    },
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setNewsletterEmail('')
    }
  }

  // Textos dinámicos del Blog desde CMS con fallback a traducción
  const heroTag = (locale === 'es' && content.blog?.heroTag) || t('blog.hero_tag')
  const heroTitlePart1 = (locale === 'es' && content.blog?.heroTitlePart1) || t('blog.hero_title_1')
  const heroTitleItalic = (locale === 'es' && content.blog?.heroTitleItalic) || t('blog.hero_title_italic')
  const heroDescription = (locale === 'es' && content.blog?.heroDescription) || t('blog.hero_description')

  const recentTag = (locale === 'es' && content.blog?.recentTag) || t('blog.recent_tag')
  const recentTitlePart1 = (locale === 'es' && content.blog?.recentTitlePart1) || t('blog.recent_title_1')
  const recentTitleItalic = (locale === 'es' && content.blog?.recentTitleItalic) || t('blog.recent_title_italic')
  const recentTitlePart2 = (locale === 'es' && content.blog?.recentTitlePart2) || t('blog.recent_title_2')

  return (
    <div className="w-full bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
      {/* ── 1. HERO / HEADER DEL BLOG ── */}
      <section className="w-full bg-slate-950 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="border-b border-slate-800 pb-12">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
            {heroTag}
          </p>
          <h1 className="max-w-4xl font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            {heroTitlePart1}<span className="font-serif italic font-normal text-blue-500">{heroTitleItalic}</span>
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-base sm:text-lg leading-relaxed text-slate-400">
            {heroDescription}
          </p>
        </div>

        {/* ── 2. ARTÍCULO DESTACADO / FEATURED INSIGHT ── */}
        <div className="mt-12">
          <article className="grid grid-cols-1 lg:grid-cols-12 rounded-none border border-slate-800 bg-slate-900/50 overflow-hidden shadow-2xl">
            {/* Columna Izquierda */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              <div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-6">
                  <span className="text-cyan-400 font-bold tracking-wider">{t('blog.featured_badge')}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">[ {featuredPost.readingTime || 5} {t('blog.read_time')} ]</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">18 AUG 2026</span>
                </div>

                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                  {featuredPost.title}
                </h2>

                <p className="font-sans text-base sm:text-lg leading-relaxed text-slate-300 mb-8">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                {/* Tarjeta de autor */}
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                    alt="Elena Vásquez"
                    className="size-11 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">{featuredPost.author.name}</p>
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-400">{featuredPost.author.role}</p>
                  </div>
                </div>

                {/* Botón de acción */}
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-none border border-blue-600 bg-blue-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 hover:border-blue-500 cursor-pointer shadow-lg shadow-blue-950/50 shrink-0"
                >
                  <span>{t('blog.featured_read_btn')}</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="lg:col-span-5 relative min-h-75 lg:min-h-full bg-slate-950">
              <img
                src={featuredPost.coverImage}
                alt="Featured Insight Preview"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent lg:bg-none pointer-events-none" />
            </div>
          </article>
        </div>
        </div>
      </section>

      {/* ── 3. SECCIÓN "NUESTROS ARTÍCULOS MÁS RECIENTES" CON FILTROS Y BUSCADOR ── */}
      <section id="articulos-recientes" className="w-full border-t border-slate-200 bg-white py-16 text-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Header de la sección clara */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-8">
            <div>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
                {recentTag}
              </p>
              <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                {recentTitlePart1}<span className="font-serif italic font-normal text-blue-600">{recentTitleItalic}</span>{recentTitlePart2}
              </h2>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500 shrink-0">
              [ {filteredPosts.length < 10 ? `0${filteredPosts.length}` : filteredPosts.length} {t('blog.results_label')} ]
            </span>
          </div>

          {/* BARRA DE FILTROS Y BUSCADOR UBICADA DIRECTAMENTE SOBRE LAS NOTICIAS */}
          <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-none border border-slate-200 bg-slate-50 p-3 sm:p-4 shadow-xs">
            {/* Pills/Tabs de filtro */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {(['TODOS', 'DESARROLLO', 'DISEÑO UI/UX', 'SEO & AEO'] as CategoryFilter[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 rounded-none border uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeCategory === category
                      ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>

            {/* Input de Búsqueda */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.search_placeholder') || 'Buscar artículos...'}
                className="w-full h-11 pl-10 pr-4 rounded-none border border-slate-300 bg-white text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Rejilla de Artículos Filtrados */}
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-slate-300 bg-slate-50/50 p-8 rounded-none">
              <p className="font-mono text-sm text-slate-500 uppercase tracking-wider mb-2">
                [ {t('blog.no_results')} ]
              </p>
              <p className="font-sans text-xs text-slate-400">
                {t('blog.try_another_search')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col justify-between border border-slate-200 bg-white rounded-none overflow-hidden transition-all duration-300 hover:border-blue-600 hover:shadow-xl"
                >
                  <div>
                    {/* Imagen de Portada */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm text-cyan-400 font-mono text-xs uppercase font-bold border border-slate-800">
                          {post.tags[0] || 'GENERAL'}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center gap-2 font-mono text-xs text-slate-400 mb-3">
                        <span>[ {post.readingTime || 4} {t('blog.read_time')} ]</span>
                        <span>•</span>
                        <span>18 AUG 2026</span>
                      </div>

                      <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="font-sans text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer de Tarjeta con Autor y Enlace */}
                  <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="size-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-sans text-xs font-semibold text-slate-800">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-blue-600 group-hover:translate-x-1 transition-transform"
                    >
                      <span>LEER</span>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. NEWSLETTER & SUSCRIPCIÓN TÉCNICA ── */}
      <section className="w-full border-t border-slate-800 bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="border border-slate-800 bg-slate-900/40 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400">
                [ TLUX_NEWSLETTER // DISPATCHES ]
              </span>
              <h3 className="mt-3 font-sans text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {t('blog.newsletter_title')}
              </h3>
              <p className="mt-4 font-sans text-sm sm:text-base text-slate-400 leading-relaxed">
                {t('blog.newsletter_description')}
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full lg:max-w-md space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('blog.newsletter_placeholder') || 'tu@email.com'}
                  className="flex-1 h-12 px-4 rounded-none border border-slate-800 bg-slate-950 text-sm font-mono text-white placeholder:text-slate-500 focus:border-blue-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-12 px-6 rounded-none bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors shrink-0 cursor-pointer"
                >
                  {t('blog.newsletter_btn')}
                </button>
              </div>
              {subscribed && (
                <p className="font-mono text-xs text-teal-400 font-bold">
                  ✓ {t('blog.newsletter_success')}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
