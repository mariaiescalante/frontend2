'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check, Share2, ChevronDown, ChevronRight, ListFilter } from 'lucide-react'
import { getAllPosts, getLocalizedPost, type LocalizedBlogPost } from '@/lib/mock-data'
import { useTranslation } from '@/context/language-context'

interface TocItem {
  id: string
  text: string
  num: string
  level: 'h2' | 'h3'
}

export function ArticleBody({ post }: { post: LocalizedBlogPost }) {
  const { locale } = useTranslation()
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('introduccion')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [copied, setCopied] = useState<boolean>(false)
  const [isTocOpenMobile, setIsTocOpenMobile] = useState<boolean>(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const allPosts = getAllPosts().map((p) => getLocalizedPost(p, locale))
  const currentIdx = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null
  const nextPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  const articleDate = (post as any).date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : '18 AGO 2026')
  const articleReadTime = (post as any).readTime || (post.readingTime ? `${post.readingTime} MIN READ` : '5 MIN READ')
  const authorName = typeof post.author === 'string' ? post.author : (post.author?.name || 'Elena Vásquez')
  const authorRole = typeof post.author === 'object' ? (post.author?.role || 'LEAD CONTENT ENGINEER') : 'LEAD CONTENT ENGINEER'
  const authorInitials = authorName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()

  // Sincronización del TOC e IntersectionObserver: extrae ESTRICTAMENTE encabezados H2 y H3 reales
  useEffect(() => {
    if (!contentRef.current) return

    const container = contentRef.current
    const items: TocItem[] = []

    // 01. Introducción siempre primero
    items.push({
      id: 'introduccion',
      text: 'Introducción',
      num: '01',
      level: 'h2',
    })

    // Extraer de forma estricta solo elementos <h2> y <h3> del cuerpo
    const headingElements = Array.from(container.querySelectorAll('h2, h3'))
    headingElements.forEach((heading, idx) => {
      const textClean = (heading.textContent || '').replace(/^\d+\.\s*/, '').trim()
      
      // Ignorar encabezados vacíos o demasiado largos (si accidentalmente un párrafo largo fue marcado)
      if (!textClean || textClean.length > 120) return

      const isH3 = heading.tagName.toLowerCase() === 'h3'
      let id = heading.id

      if (!id) {
        id = textClean
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '') || `seccion-${idx + 2}`
        heading.id = id
      }
      heading.classList.add('scroll-mt-28')

      const displayText = textClean.length > 55 ? textClean.substring(0, 55) + '...' : textClean
      const numStr = items.length + 1 < 10 ? `0${items.length + 1}` : `${items.length + 1}`

      items.push({
        id,
        text: displayText,
        num: numStr,
        level: isH3 ? 'h3' : 'h2',
      })
    })

    setTocItems(items)

    const handleScroll = () => {
      if (!contentRef.current) return

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalScroll) * 100, 0), 100)
        setScrollProgress(Math.round(progress))
      }

      const scrollPosition = window.scrollY + 180
      let currentActiveId = items[0]?.id || 'introduccion'

      const allNodes = Array.from(container.querySelectorAll('h2, h3, [id="introduccion"]'))
      for (const el of allNodes) {
        const top = el.getBoundingClientRect().top + window.scrollY
        if (scrollPosition >= top) {
          currentActiveId = el.id
        }
      }
      setActiveId(currentActiveId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [post])

  const copyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const titleParts = post.title.split(' ')
  const mainTitle = titleParts.length > 2 ? titleParts.slice(0, titleParts.length - 2).join(' ') : post.title
  const italicTitle = titleParts.length > 2 ? titleParts.slice(titleParts.length - 2).join(' ') : ''

  return (
    <article className="w-full bg-slate-950 text-white selection:bg-blue-600 selection:text-white">
      {/* ── HEADER NEGRO TLUX (bg-slate-950) ── */}
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
            <span>{articleDate}</span>
            <span className="text-slate-700">|</span>
            <span className="text-cyan-400">[ {articleReadTime} ]</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {mainTitle}{' '}
            {italicTitle && <span className="font-serif italic text-blue-600 font-normal">{italicTitle}</span>}
          </h1>

          {post.excerpt && (
            <p className="font-sans text-lg sm:text-xl text-slate-400 max-w-4xl leading-relaxed font-normal">
              {post.excerpt}
            </p>
          )}

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-blue-500 rounded-none shrink-0">
                {authorInitials}
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-white leading-snug">{authorName}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">{authorRole}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={copyUrl}
                className="px-4 py-2.5 border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer rounded-none uppercase font-bold"
              >
                [ COMPARTIR EN X ]
              </button>

              <button
                onClick={copyUrl}
                className="px-4 py-2.5 border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer rounded-none uppercase font-bold"
              >
                [ LINKEDIN ]
              </button>

              <button
                onClick={copyUrl}
                className="px-4 py-2.5 border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer rounded-none uppercase font-bold flex items-center gap-1.5"
              >
                <span>{copied ? '[ COPIADO! ]' : '[ COPIAR LINK 🔗 ]'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── CUERPO BLANCO CLEAN LECTURA CON PÁRRAFOS DE PESO NORMAL (NO NEGRITA POR DEFECTO) ── */}
      <section className="bg-white text-slate-900 px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* TABLA DE CONTENIDOS EN MÓVIL DESPLEGABLE */}
          {tocItems.length > 0 && (
            <div className="lg:hidden border border-slate-200 bg-slate-50 p-6 space-y-4 rounded-none col-span-1">
              <button
                onClick={() => setIsTocOpenMobile(!isTocOpenMobile)}
                className="w-full flex items-center justify-between font-mono text-xs uppercase tracking-widest font-bold text-slate-900 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ListFilter className="size-4 text-blue-600" />
                  <span>TABLA DE CONTENIDOS ({tocItems.length})</span>
                </div>
                {isTocOpenMobile ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
              </button>

              {isTocOpenMobile && (
                <nav className="space-y-2 pt-2 border-t border-slate-200 font-mono text-xs">
                  {tocItems.map((item) => {
                    const isActive = activeId === item.id
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setIsTocOpenMobile(false)}
                        className={`block py-2 transition-colors ${
                          item.level === 'h3' ? 'pl-4 text-[11px]' : 'px-3 border-l-2'
                        } ${
                          isActive
                            ? 'border-blue-600 text-blue-600 bg-blue-50 font-bold'
                            : 'border-transparent text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        <span className="text-slate-400 mr-2">{item.num}.</span>
                        {item.text}
                      </a>
                    )
                  })}
                </nav>
              )}
            </div>
          )}

          {/* TABLA DE CONTENIDOS FLOTANTE EN DESKTOP */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold">
                [ TABLA DE CONTENIDOS ]
              </div>

              <nav className="space-y-3 font-mono text-xs">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id
                  const isH3 = item.level === 'h3'

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block transition-colors leading-normal ${
                        isH3 ? 'pl-4 text-[11px]' : ''
                      } ${
                        isActive
                          ? 'text-blue-600 font-bold'
                          : 'text-slate-400 hover:text-slate-950 font-medium'
                      }`}
                    >
                      <span className={`mr-2 ${isActive ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                        {item.num}.
                      </span>
                      <span>{item.text}</span>
                    </a>
                  )
                })}
              </nav>

              <div className="pt-6 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest font-bold text-slate-400">
                  <span>PROGRESO</span>
                  <span className="text-blue-600 font-bold">{scrollProgress}%</span>
                </div>
                <div className="h-1 w-full bg-slate-100">
                  <div
                    className="h-full bg-blue-600 transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL: PÁRRAFOS REGULARES (FONT-NORMAL) Y STRONG/B EN NEGRITA */}
          <div className="lg:col-span-8">
            <div
              ref={contentRef}
              className="max-w-none text-slate-900
                [&_h1]:font-sans [&_h1]:font-black [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:text-slate-950 [&_h1]:mt-10 [&_h1]:mb-6 [&_h1]:leading-tight
                [&_h2]:font-sans [&_h2]:font-black [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:text-slate-950 [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:pt-6 [&_h2]:border-t [&_h2]:border-slate-200 [&_h2]:leading-snug
                [&_h3]:font-sans [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:text-slate-950 [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-snug
                [&_p]:font-sans [&_p]:font-normal [&_p]:text-slate-700 [&_p]:text-base [&_p]:sm:text-lg [&_p]:leading-relaxed [&_p]:mb-6
                [&_strong]:font-bold [&_b]:font-bold
                [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-slate-50 [&_blockquote]:p-6 [&_blockquote]:italic [&_blockquote]:text-slate-800 [&_blockquote]:my-8
                [&_pre]:bg-[#08080a] [&_pre]:text-slate-100 [&_pre]:p-6 [&_pre]:border [&_pre]:border-slate-800 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:font-mono [&_pre]:text-sm
                [&_img]:w-full [&_img]:border [&_img]:border-slate-200 [&_img]:my-8 [&_img]:object-cover
                [&_figure]:my-8 [&_figcaption]:text-center [&_figcaption]:font-mono [&_figcaption]:text-xs [&_figcaption]:text-slate-500 [&_figcaption]:mt-3
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-2"
              dangerouslySetInnerHTML={{ __html: post.content || '<p>Contenido del artículo no publicado.</p>' }}
            />
          </div>
        </div>
      </section>

      {/* ── NAVEGACIÓN Y PUBLICACIONES RELACIONADAS ── */}
      <footer className="bg-white text-slate-900 border-t border-slate-200 px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group border border-slate-200 bg-white p-8 hover:border-blue-600 transition-colors"
              >
                <span className="text-slate-400 font-bold uppercase block mb-2">← ARTÍCULO ANTERIOR</span>
                <span className="text-lg font-sans font-bold text-slate-950 group-hover:text-blue-600 transition-colors block truncate">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group border border-slate-200 bg-white p-8 hover:border-blue-600 transition-colors text-right"
              >
                <span className="text-slate-400 font-bold uppercase block mb-2">SIGUIENTE ARTÍCULO →</span>
                <span className="text-lg font-sans font-bold text-slate-950 group-hover:text-blue-600 transition-colors block truncate">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* PUBLICACIONES RELACIONADAS */}
          {relatedPosts.length > 0 && (
            <div className="space-y-8 border-t border-slate-200 pt-12">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                  Publicaciones <span className="font-serif italic text-blue-600 font-normal">relacionadas</span>.
                </h3>
                <span className="font-mono text-xs text-slate-400 uppercase font-bold">[ 02 RESULTADOS ]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((rel: any, idx: number) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group border border-slate-200 bg-white p-8 space-y-4 hover:border-blue-600 transition-colors"
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-cyan-600 font-bold uppercase">[ ARTICLE_0{idx + 1} ]</span>
                      <span className="text-slate-400">{rel.publishedAt ? new Date(rel.publishedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : '12 AGO 2026'}</span>
                    </div>

                    {rel.coverImage && (
                      <div className="w-full h-48 bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}

                    <h4 className="font-sans text-2xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug">
                      {rel.title}
                    </h4>

                    <div className="pt-2 flex items-center justify-between font-mono text-xs text-slate-400 font-bold border-t border-slate-100">
                      <div className="flex gap-2">
                        {((rel as any).tags || ['NEXT.JS', 'ARCHITECTURE']).map((t: string) => (
                          <span key={t} className="bg-slate-100 border border-slate-200 px-2 py-0.5 text-slate-600 uppercase">
                            [ {t} ]
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="size-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </footer>
    </article>
  )
}
