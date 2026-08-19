'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'
import type { LocalizedBlogPost } from '@/lib/mock-data'
import { useTranslation } from '@/context/language-context'

type CategoryFilter = 'TODOS' | 'DESARROLLO' | 'DISEÑO UI/UX' | 'SEO & AEO'

export function BlogView({ posts }: { posts: LocalizedBlogPost[] }) {
  const { t } = useTranslation()
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

  return (
    <div className="w-full bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
      {/* ── 1. HERO / HEADER DEL BLOG (HERO CON ESPACIADO IDÉNTICO A LANDING Y FAQ) ── */}
      <section className="w-full bg-slate-950 text-white pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="border-b border-slate-800 pb-12">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
            {t('blog.hero_tag')}
          </p>
          <h1 className="max-w-4xl font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            {t('blog.hero_title_1')}<span className="font-serif italic font-normal text-blue-500">{t('blog.hero_title_italic')}</span>
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-base sm:text-lg leading-relaxed text-slate-400">
            {t('blog.hero_description')}
          </p>
        </div>

        {/* ── 2. ARTÍCULO DESTACADO / FEATURED INSIGHT (HERO GRID 2 COLUMNAS) ── */}
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
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{featuredPost.author.role}</p>
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

            {/* Columna Derecha (Preview técnica full cover) */}
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

      {/* ── 3. SECCIÓN "NUESTROS ARTÍCULOS MÁS RECIENTES" CON FILTROS Y BUSCADOR JUSTO ENCIMA DE LAS NOTICIAS ── */}
      <section id="articulos-recientes" className="w-full border-t border-slate-200 bg-white py-16 text-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Header de la sección clara */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-8">
            <div>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-blue-600">
                {t('blog.recent_tag')}
              </p>
              <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                {t('blog.recent_title_1')}<span className="font-serif italic font-normal text-blue-600">{t('blog.recent_title_italic')}</span>{t('blog.recent_title_2')}
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
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950'
                  }`}
                >
                  [ {categoryLabels[category]} ]
                </button>
              ))}
            </div>

            {/* Lado derecho: Buscador con lupa */}
            <div className="relative min-w-65 sm:min-w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.search_placeholder')}
                className="w-full rounded-none border border-slate-300 bg-white pl-10 pr-4 py-2.5 font-mono text-xs uppercase tracking-wider text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Grid de 3 Columnas (3x2 Tarjetas de tipo <article>) */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, idx) => {
              const titleText = post.title
              const excerptText = post.excerpt
              const articleNum = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`

              return (
                <article
                  key={post.slug}
                  className="group flex flex-col justify-between rounded-none border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-600 hover:shadow-xl shadow-sm"
                >
                  <div>
                    {/* Cabecera de la tarjeta: Tag + Fecha */}
                    <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                      <span className="text-blue-600 font-bold uppercase tracking-wider">
                        [ ARTICLE_{articleNum} ]
                      </span>
                      <span>12 AUG 2026</span>
                    </div>

                    {/* Imagen / Preview */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-none border border-slate-200 mb-5 bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt={titleText}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Titular H3 */}
                    <h3 className="font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {titleText}
                    </h3>

                    {/* Extracto corto */}
                    <p className="mt-3 font-sans text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {excerptText}
                    </p>
                  </div>

                  {/* Footer de la tarjeta: Tags de categorías + Link */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-500">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="bg-slate-100 px-2 py-0.5 border border-slate-200 uppercase font-semibold">
                          [ {t} ]
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase text-blue-600 group-hover:text-slate-950 transition-colors"
                    >
                      <span>{t('blog.featured_read_btn')}</span>
                      <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. BANNER DE NEWSLETTER TÉCNICA (FONDO OSCURO BG-SLATE-950) ── */}
      <section className="w-full border-t border-slate-800 bg-slate-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
            {t('blog.newsletter_tag')}
          </p>

          <h2 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {t('blog.newsletter_title_1')}<span className="font-serif italic font-normal text-blue-500">{t('blog.newsletter_title_italic')}</span>{t('blog.newsletter_title_2')}
          </h2>

          <p className="mt-4 font-sans text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            {t('blog.newsletter_desc')}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-10 flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-xl mx-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t('blog.newsletter_placeholder')}
              className="flex-1 rounded-none border border-slate-800 bg-slate-900 px-5 py-4 font-mono text-xs uppercase tracking-wider text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-none border border-blue-600 bg-blue-600 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 cursor-pointer shadow-lg shadow-blue-950/50 shrink-0"
            >
              <span>{subscribed ? t('blog.newsletter_success') : t('blog.newsletter_btn')}</span>
              <ArrowUpRight className="size-4" />
            </button>
          </form>

          <p className="mt-6 font-mono text-xs text-slate-500 uppercase tracking-widest">
            {t('blog.newsletter_subscribers')}
          </p>
        </div>
      </section>
    </div>
  )
}

