'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getAllPosts, getLocalizedPost, type LocalizedBlogPost } from '@/lib/mock-data'
import { useTranslation } from '@/context/language-context'

interface TocItem {
  id: string
  text: string
  num: string
}

export function ArticleBody({ post }: { post: LocalizedBlogPost }) {
  const { t, locale } = useTranslation()
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [copied, setCopied] = useState<boolean>(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Obtener otros artículos para la sección de "Publicaciones relacionadas" y navegación Anterior/Siguiente en el idioma activo
  const allPosts = getAllPosts().map((p) => getLocalizedPost(p, locale))
  const currentIdx = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null
  const nextPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  useEffect(() => {
    if (!contentRef.current) return

    // Parsear automáticamente las secciones H2 del artículo
    const headings = Array.from(contentRef.current.querySelectorAll('h2'))
    const items: TocItem[] = []

    // Agregar sección 01. Introducción al inicio del TOC
    items.push({
      id: 'introduccion',
      text: 'Introducción',
      num: '01',
    })

    headings.forEach((heading, idx) => {
      let id = heading.id
      if (!id) {
        id = heading.textContent
          ? heading.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '')
          : `seccion-${idx + 2}`
        heading.id = id
      }
      heading.classList.add('scroll-mt-28')

      const textClean = (heading.textContent || '').replace(/^\d+\.\s*/, '').trim()
      const numStr = idx + 2 < 10 ? `0${idx + 2}` : `${idx + 2}`

      items.push({
        id,
        text: textClean || `Sección ${idx + 2}`,
        num: numStr,
      })
    })

    setTocItems(items)

    // Controlador unificado: la barra escala estrictamente desde el primer título (#introduccion, 0%) hasta el último (#conclusion, 100%)
    const handleScroll = () => {
      if (!contentRef.current) return

      const container = contentRef.current

      // Primer título de la Tabla de Contenidos (#introduccion)
      const firstHeading = container.querySelector('#introduccion') || container.firstElementChild || container
      // Último título de la Tabla de Contenidos (#conclusion)
      const lastHeading = container.querySelector('#conclusion') || container.lastElementChild || container

      const firstTop = firstHeading.getBoundingClientRect().top + window.scrollY
      const lastTop = lastHeading.getBoundingClientRect().top + window.scrollY

      // Punto exacto 0%: primer título (#introduccion) en la línea de lectura (offset 120px)
      const startScroll = firstTop - 120
      // Punto exacto 100%: último título (#conclusion) en la línea de lectura (offset 120px)
      const endScroll = lastTop - 120
      const totalDistance = endScroll - startScroll

      // ── A. Cálculo del porcentaje de progreso (0% ➔ 100%) ──
      if (window.scrollY <= startScroll) {
        setScrollProgress(0)
      } else if (window.scrollY >= endScroll) {
        setScrollProgress(100)
      } else if (totalDistance > 0) {
        const currentDistance = window.scrollY - startScroll
        const progress = Math.min(Math.max((currentDistance / totalDistance) * 100, 0), 100)
        setScrollProgress(Math.round(progress))
      }

      // ── B. Cálculo del ítem activo en la Tabla de Contenidos (TOC) ──
      if (window.scrollY < startScroll - 60) {
        setActiveId('')
        return
      }

      const sectionNodes = [
        firstHeading,
        ...headings
      ]

      let currentActiveId = 'introduccion'
      for (const node of sectionNodes) {
        if (node) {
          const nodeTop = node.getBoundingClientRect().top + window.scrollY
          if (window.scrollY >= nodeTop - 140) {
            currentActiveId = node.id || 'introduccion'
          }
        }
      }

      setActiveId(currentActiveId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [post.content])

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (id === 'introduccion') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveId('introduccion')
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
    }
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()

  return (
    <div className="w-full bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
      {/* ── BARRA DE PROGRESO DE LECTURA FIXA EN LA PARTE SUPERIOR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-900">
        <div
          className="h-full bg-linear-to-r from-blue-600 via-cyan-400 to-teal-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── 1. HERO / ENCABEZADO DEL ARTÍCULO (FONDO OSCURO LANDING SLATE-950) ── */}
      <section className="mx-auto max-w-7xl px-5 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16 lg:px-10">
        {/* Botón de retorno al Blog */}
        <div className="mb-8">
          <Link
            href={locale === 'es' ? '/blog' : `/${locale}/blog`}
            className="inline-flex items-center gap-2 rounded-none border border-slate-800 bg-slate-900/80 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 transition-all hover:border-blue-500 hover:text-white shadow-lg"
          >
            <ArrowLeft className="size-3.5 text-blue-400" />
            <span>{t('blog.back_to_blog')}</span>
          </Link>
        </div>

        {/* Metadatos superiores: Fecha | Tiempo de lectura */}
        <div className="mb-6 flex items-center gap-3 font-mono text-xs text-slate-400 uppercase tracking-widest">
          <span>{formattedDate}</span>
          <span className="text-slate-700">|</span>
          <span className="text-cyan-400 font-semibold">[ {post.readingTime} {t('blog.read_time')} ]</span>
        </div>

        {/* Titular Principal H1 renderizado dinámicamente desde el post traducido */}
        <h1 className="max-w-5xl font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-8">
          {post.title}
        </h1>

        {/* Subtítulo / Extracto descriptivo */}
        <p className="max-w-3xl font-sans text-lg sm:text-xl leading-relaxed text-slate-300 mb-12">
          {post.excerpt}
        </p>

        {/* Ficha de Autor y Barra de Acciones Social en Caja Estilo Terminal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-800 font-mono text-xs">
          {/* Ficha del autor */}
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-none border border-slate-700 bg-blue-950/60 font-mono text-xs font-bold text-blue-400">
              {post.author.name ? post.author.name.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'EV'}
            </div>
            <div>
              <p className="font-bold text-sm text-white">{post.author.name}</p>
              <p className="text-slate-500 text-[11px] uppercase tracking-wider">{post.author.role}</p>
            </div>
          </div>

          {/* Botones de Compartir */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
              className="inline-flex items-center gap-1.5 border border-slate-800 bg-slate-900/80 px-4 py-2 text-slate-300 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <span>{t('blog.share_x')}</span>
            </button>

            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`, '_blank')}
              className="inline-flex items-center gap-1.5 border border-slate-800 bg-slate-900/80 px-4 py-2 text-slate-300 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              <span>{t('blog.share_linkedin')}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 border border-slate-800 bg-slate-900/80 px-4 py-2 text-slate-300 hover:border-blue-500 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <span className="text-emerald-400 font-bold">{t('blog.link_copied')}</span>
              ) : (
                <span>{t('blog.copy_link')}</span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ── BANNER / IMAGEN FIG 1.0 INFRAESTRUCTURA ── */}
      <div className="w-full bg-slate-950 border-y border-slate-800">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-3 font-mono text-[11px] uppercase tracking-widest text-slate-500">
          {t('blog.fig_1_banner')}
        </div>
      </div>

      {/* ── 2. SECCIÓN DEL CUERPO PRINCIPAL CON FONDO BLANCO Y TABLA DE CONTENIDOS EN COLUMNA LATERAL ── */}
      <section className="w-full bg-white text-slate-950 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── COLUMNA LATERAL IZQUIERDA: TABLA DE CONTENIDOS (TOC STICKY) ── */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-8">
              <div>
                <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {t('blog.toc_title')}
                </p>

                <nav className="space-y-3 font-mono text-xs">
                  {tocItems.map((item) => {
                    const isActive = activeId === item.id || (activeId === '' && item.id === 'introduccion')
                    const textLabel = item.id === 'introduccion' ? (t('blog.toc_intro') || item.text) : item.text

                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`block py-1 transition-all duration-200 ${
                          isActive
                            ? 'border-l-2 border-blue-600 text-blue-600 font-bold pl-3'
                            : 'border-l-2 border-transparent text-slate-500 hover:text-slate-900 pl-3'
                        }`}
                      >
                        {item.num}. {textLabel}
                      </a>
                    )
                  })}
                </nav>
              </div>

              {/* Indicador de Progreso de lectura al pie del TOC */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
                  <span>{t('blog.toc_progress')}</span>
                  <span className="text-blue-600 font-bold">{scrollProgress}%</span>
                </div>
                <div className="h-1 w-full bg-slate-200 rounded-none overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>
            </aside>

            {/* ── COLUMNA PRINCIPAL DERECHA: LECTURA DEL ARTÍCULO (3/4 ANCHO) ── */}
            <div id="article-content-body" ref={contentRef} className="lg:col-span-9 space-y-12">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Tags al pie del contenido */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-600">
                {post.tags.map((t) => (
                  <span key={t} className="bg-slate-100 px-3 py-1 border border-slate-200 uppercase font-semibold text-slate-800">
                    [ {t} ]
                  </span>
                ))}
              </div>

              {/* ── BARRA 50/50 NAVEGACIÓN ARTÍCULO ANTERIOR / SIGUIENTE ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12">
                {prevPost ? (
                  <Link
                    href={locale === 'es' ? `/blog/${prevPost.slug}` : `/${locale}/blog/${prevPost.slug}`}
                    className="group rounded-none border border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-600 hover:bg-white"
                  >
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      {t('blog.prev_article')}
                    </p>
                    <p className="font-sans text-sm font-bold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {prevPost.title}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-none border border-slate-200 bg-slate-50 p-6 opacity-40">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{t('blog.start_of_blog')}</p>
                  </div>
                )}

                {nextPost ? (
                  <Link
                    href={locale === 'es' ? `/blog/${nextPost.slug}` : `/${locale}/blog/${nextPost.slug}`}
                    className="group rounded-none border border-slate-200 bg-slate-50 p-6 text-right transition-all hover:border-blue-600 hover:bg-white"
                  >
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      {t('blog.next_article')}
                    </p>
                    <p className="font-sans text-sm font-bold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {nextPost.title}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-none border border-slate-200 bg-slate-50 p-6 text-right opacity-40">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{t('blog.end_of_blog')}</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SECCIÓN "PUBLICACIONES RELACIONADAS." (FONDO BLANCO BG-WHITE) ── */}
      <section className="w-full border-t border-slate-200 bg-white py-16 text-slate-950">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex items-end justify-between border-b border-slate-200 pb-6">
            <h3 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              {t('blog.related_title_1')}<span className="font-serif italic font-normal text-blue-600">{t('blog.related_title_italic')}</span>
            </h3>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500">[ 02 {t('blog.results_label')} ]</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {relatedPosts.map((relPost, idx) => (
              <article
                key={relPost.slug}
                className="group flex flex-col justify-between rounded-none border border-slate-200 bg-white p-6 transition-all hover:border-blue-600 hover:shadow-xl shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    <span className="text-blue-600 font-bold uppercase tracking-wider">[ ARTICLE_0{idx + 1} ]</span>
                    <span>12 AGO 2026</span>
                  </div>

                  <div className="relative aspect-video w-full overflow-hidden rounded-none border border-slate-200 mb-5 bg-slate-100">
                    <img
                      src={relPost.coverImage}
                      alt={relPost.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h4 className="font-serif text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {relPost.title}
                  </h4>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-500">
                    {relPost.tags.slice(0, 2).map((t) => (
                      <span key={t} className="bg-slate-100 px-2 py-0.5 border border-slate-200 uppercase font-semibold">
                        [ {t} ]
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${relPost.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase text-blue-600 group-hover:text-slate-950 transition-colors"
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
