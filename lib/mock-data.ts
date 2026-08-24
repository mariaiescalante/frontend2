export interface Author {
  name: string
  role: string
  avatar: string
}

export interface BlogPost {
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  coverImage: string
  publishedAt: string
  readingTime: number
  tags: string[]
  author: Author
}

export interface LocalizedBlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  publishedAt: string
  readingTime: number
  tags: string[]
  author: Author
}

export const MOCK_POSTS: BlogPost[] = [
  {
    slug: 'arquitectura-nextjs-app-router-2026',
    title: {
      es: 'Arquitectura de contenido escalable con Next.js y CMS headless.',
      en: 'Scalable content architecture with Next.js and headless CMS.',
      pt: 'Arquitetura de conteúdo escalável com Next.js e CMS headless.',
      'pt-BR': 'Arquitetura de conteúdo escalável com Next.js e CMS headless.',
    },
    excerpt: {
      es: 'Cómo estructurar aplicaciones web escalables combinando Server Components, caching inteligente en el edge y la compilación acelerada con Turbopack.',
      en: 'How to structure scalable web applications combining Server Components, edge smart caching, and accelerated compilation with Turbopack.',
      pt: 'Como estruturar aplicações web escaláveis combinando Server Components, caching inteligente no edge e compilação acelerada com Turbopack.',
      'pt-BR': 'Como estruturar aplicações web escaláveis combinando Server Components, caching inteligente no edge e compilação acelerada com Turbopack.',
    },
    content: {
      es: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">L</span>a arquitectura de contenido define cómo se modela, almacena y distribuye la información de un producto digital. Cuando se combina un CMS headless con el App Router de Next.js, obtenemos una capa de presentación desacoplada, cacheable y optimizada para buscadores y motores de respuesta generativa.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // PRINCIPIOS DE RENDERIZADO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Server Components como cimiento.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    El App Router prioriza los Server Components, lo que reduce el JavaScript enviado al cliente y acerca la obtención de datos al servidor. El contenido del CMS se resuelve en el servidor y se transmite mediante streaming a medida que está disponible.
  </p>

  <div class="rounded-none border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-white shadow-xl my-8">
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
      <span>APP/BLOG/[SLUG]/PAGE.TSX</span>
      <span class="text-cyan-400 font-bold">TSX</span>
    </div>
    <pre class="overflow-x-auto text-slate-200 leading-relaxed"><code>export default async function Page({ params }: Props) {
  const post = await cms.getPost(params.slug)
  return &lt;Article data={post} /&gt;
}</code></pre>
  </div>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // ESTRATEGIA DE CACHING
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Revalidación explícita por tipo de contenido.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    No todo el contenido cambia con la misma frecuencia. Definir perfiles de caché por entidad evita invalidaciones innecesarias y mantiene la frescura donde importa.
  </p>

  <div class="my-8 rounded-none border-l-4 border-blue-600 bg-slate-50 p-6 sm:p-8 italic font-serif text-lg sm:text-xl text-slate-800">
    “La caché no es una optimización tardía: es una decisión de arquitectura que debe tomarse junto al modelo de contenido.”
  </div>

  <div class="space-y-3 font-mono text-xs text-slate-700 my-8">
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Separa el modelo de contenido de la capa de presentación.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Define límites de revalidación explícitos por tipo de contenido.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Instrumenta métricas reales antes de optimizar.</span>
    </p>
  </div>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSIÓN
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Una base que escala con el equipo.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar un CMS headless con el App Router entrega una plataforma de contenido rápida, mantenible y lista para SEO y AEO. El resultado es una experiencia editorial coherente que crece sin fricción a medida que el producto evoluciona.
  </p>
</div>
      `,
      en: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">C</span>ontent architecture defines how digital product information is modeled, stored, and distributed. When pairing a headless CMS with Next.js App Router, we obtain a decoupled, cacheable presentation layer optimized for search engines and generative AI.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // RENDERING PRINCIPLES
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Server Components as a Foundation.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    App Router prioritizes React Server Components, reducing the client JavaScript bundle and moving data fetching closer to the server. CMS content resolves on the server and streams progressively as it becomes available.
  </p>

  <div class="rounded-none border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-white shadow-xl my-8">
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
      <span>APP/BLOG/[SLUG]/PAGE.TSX</span>
      <span class="text-cyan-400 font-bold">TSX</span>
    </div>
    <pre class="overflow-x-auto text-slate-200 leading-relaxed"><code>export default async function Page({ params }: Props) {
  const post = await cms.getPost(params.slug)
  return &lt;Article data={post} /&gt;
}</code></pre>
  </div>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // CACHING STRATEGY
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Explicit Revalidation by Content Type.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Not all content changes at the same frequency. Defining explicit cache profiles per entity prevents unnecessary cache invalidations and maintains data freshness where it matters most.
  </p>

  <div class="my-8 rounded-none border-l-4 border-blue-600 bg-slate-50 p-6 sm:p-8 italic font-serif text-lg sm:text-xl text-slate-800">
    “Caching is not a late optimization: it is a core architectural decision made alongside the content model.”
  </div>

  <div class="space-y-3 font-mono text-xs text-slate-700 my-8">
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Separate the content model from the presentation layer.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Define explicit revalidation boundaries per content type.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Instrument real user metrics before optimizing.</span>
    </p>
  </div>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSION
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    A Foundation That Scales With Your Team.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combining a headless CMS with Next.js App Router delivers a fast, maintainable, SEO and AEO ready platform. The outcome is a coherent editorial experience that evolves seamlessly as your product grows.
  </p>
</div>
      `,
      pt: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">A</span> arquitetura de conteúdo define como a informação é modelada, armazenada e distribuída. Ao combinar um CMS headless com o App Router do Next.js, obtemos uma camada de apresentação desacoplada, cacheável e otimizada para buscadores e motores de IA.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // PRINCÍPIOS DE RENDERIZAÇÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Server Components como Fundação.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    O App Router prioriza os Server Components, reduzindo o JavaScript enviado ao navegador e aproximando a busca de dados do servidor. O conteúdo do CMS é resolvido no servidor e transmitido via streaming.
  </p>

  <div class="rounded-none border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-white shadow-xl my-8">
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
      <span>APP/BLOG/[SLUG]/PAGE.TSX</span>
      <span class="text-cyan-400 font-bold">TSX</span>
    </div>
    <pre class="overflow-x-auto text-slate-200 leading-relaxed"><code>export default async function Page({ params }: Props) {
  const post = await cms.getPost(params.slug)
  return &lt;Article data={post} /&gt;
}</code></pre>
  </div>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // ESTRATÉGIA DE CACHING
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Revalidação Explícita por Tipo de Conteúdo.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Nem todo conteúdo muda na mesma frequência. Definir perfis de cache por entidade evita invalidações desnecessárias e mantém a rapidez onde importa.
  </p>

  <div class="my-8 rounded-none border-l-4 border-blue-600 bg-slate-50 p-6 sm:p-8 italic font-serif text-lg sm:text-xl text-slate-800">
    “O cache não é uma otimização tardia: é uma decisão de arquitetura tomada junto ao modelo de conteúdo.”
  </div>

  <div class="space-y-3 font-mono text-xs text-slate-700 my-8">
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Separe o modelo de conteúdo da camada de apresentação.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Defina limites de revalidação explícitos por tipo de conteúdo.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Instrumente métricas reais antes de otimizar.</span>
    </p>
  </div>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Uma Base que Escala com a Equipe.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar um CMS headless com o App Router entrega uma plataforma de conteúdo rápida, sustentável e pronta para SEO e AEO. O resultado é uma experiência editorial coerente.
  </p>
</div>
      `,
      'pt-BR': `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">A</span> arquitetura de conteúdo define como a informação é modelada, armazenada e distribuída. Ao combinar um CMS headless com o App Router do Next.js, obtemos uma camada de apresentação desacoplada, cacheável e otimizada para buscadores e motores de IA.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // PRINCÍPIOS DE RENDERIZAÇÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Server Components como Fundação.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    O App Router prioriza os Server Components, reduzindo o JavaScript enviado ao navegador e aproximando a busca de dados do servidor. O conteúdo do CMS é resolvido no servidor e transmitido via streaming.
  </p>

  <div class="rounded-none border border-slate-800 bg-slate-950 p-5 font-mono text-xs text-white shadow-xl my-8">
    <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-400">
      <span>APP/BLOG/[SLUG]/PAGE.TSX</span>
      <span class="text-cyan-400 font-bold">TSX</span>
    </div>
    <pre class="overflow-x-auto text-slate-200 leading-relaxed"><code>export default async function Page({ params }: Props) {
  const post = await cms.getPost(params.slug)
  return &lt;Article data={post} /&gt;
}</code></pre>
  </div>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // ESTRATÉGIA DE CACHING
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Revalidação Explícita por Tipo de Conteúdo.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Nem todo conteúdo muda na mesma frequência. Definir perfis de cache por entidade evita invalidações desnecessárias e mantém a rapidez onde importa.
  </p>

  <div class="my-8 rounded-none border-l-4 border-blue-600 bg-slate-50 p-6 sm:p-8 italic font-serif text-lg sm:text-xl text-slate-800">
    “O cache não é uma otimização tardia: é uma decisão de arquitetura tomada junto ao modelo de conteúdo.”
  </div>

  <div class="space-y-3 font-mono text-xs text-slate-700 my-8">
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Separe o modelo de conteúdo da camada de apresentação.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Defina limites de revalidação explícitos por tipo de conteúdo.</span>
    </p>
    <p class="flex items-center gap-2">
      <span class="text-blue-600 font-bold">[ → ]</span>
      <span>Instrumente métricas reais antes de otimizar.</span>
    </p>
  </div>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Uma Base que Escala com a Equipe.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar um CMS headless com o App Router entrega uma plataforma de conteúdo rápida, sustentável e pronta para SEO e AEO. O resultado é uma experiência editorial coerente.
  </p>
</div>
      `,
    },
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-18T10:00:00Z',
    readingTime: 5,
    tags: ['NEXT.JS', 'DESARROLLO', 'ARCHITECTURE'],
    author: {
      name: 'Elena Vásquez',
      role: 'LEAD CONTENT ENGINEER',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    },
  },
  {
    slug: 'aeo-seo-inteligencia-artificial-buscadores',
    title: {
      es: 'De SEO a AEO: Dominando la Optimización para Motores de Respuestas IA',
      en: 'From SEO to AEO: Dominating Answer Engine Optimization for AI Search',
      pt: 'De SEO a AEO: Dominando a Otimização para Motores de Resposta IA',
      'pt-BR': 'De SEO a AEO: Dominando a Otimização para Motores de Resposta IA',
    },
    excerpt: {
      es: 'Estrategias técnicas con datos estructurados JSON-LD, microdatos Schema.org y arquitectura semántica para posicionar en ChatGPT, Perplexity y Google Gemini.',
      en: 'Technical strategies with JSON-LD structured data, Schema.org microdata, and semantic architecture to rank in ChatGPT, Perplexity, and Google Gemini.',
      pt: 'Estratégias técnicas com dados estruturados JSON-LD e microdados Schema.org para posicionar no ChatGPT, Perplexity e Google Gemini.',
      'pt-BR': 'Estratégias técnicas com dados estruturados JSON-LD e microdados Schema.org para posicionar no ChatGPT, Perplexity e Google Gemini.',
    },
    content: {
      es: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">L</span>os buscadores basados en palabras clave están evolucionando hacia sistemas conversacionales de respuestas directas impulsadas por inteligencia artificial como ChatGPT, Perplexity y Gemini.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // DATOS ESTRUCTURADOS JSON-LD
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Grafos de conocimiento y esquemas semánticos.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Para que los motores de IA citen tu contenido como fuente de verdad, la información debe empaquetarse utilizando microdatos Schema.org explícitos.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // OPTIMIZACIÓN AEO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Formato de pregunta y respuesta directa.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Estructurar encabezados H2 en forma de preguntas claras y seguir con párrafos conclusivos de 40 a 60 palabras incrementa la probabilidad de inclusión en sintetizadores IA.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSIÓN
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    El futuro del descubrimiento digital.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Dominar AEO posiciona a tu marca en las conversaciones directas que los usuarios sostienen a diario con modelos de IA generativa.
  </p>
</div>
      `,
      en: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">K</span>eyword-based search engines are evolving into conversational direct answer systems powered by artificial intelligence such as ChatGPT, Perplexity, and Gemini.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // JSON-LD STRUCTURED DATA
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Knowledge Graphs & Semantic Schemas.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    For AI engines to cite your content as an authoritative source, information must be structured using explicit Schema.org microdata.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // AEO OPTIMIZATION
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Direct Q&A Formatting.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Structuring H2 headers as direct questions followed by 40-60 word concise answers drastically improves AI LLM citation rates.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSION
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    The Future of Digital Discovery.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Dominating Answer Engine Optimization positions your brand inside the generative AI workflows that millions of users rely on daily.
  </p>
</div>
      `,
      pt: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">O</span>s motores de busca baseados em palavras-chave estão evoluindo para sistemas conversacionais de resposta direta alimentados por IA.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // DADOS ESTRUTURADOS JSON-LD
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Grafos de Conhecimento e Esquemas Semânticos.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Para que motores de IA citem seu conteúdo, as informações precisam utilizar microdados Schema.org explícitos.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // OTIMIZAÇÃO AEO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Formatação Direta de Perguntas e Respostas.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Estruturar cabeçalhos H2 como perguntas diretas seguidas de parágrafos concisos aumenta a inclusão em sintetizadores de IA.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    O Futuro da Descoberta Digital.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Dominar o AEO posiciona sua marca nas conversas diárias que os usuários mantêm com modelos de IA.
  </p>
</div>
      `,
      'pt-BR': `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">O</span>s motores de busca baseados em palavras-chave estão evoluindo para sistemas conversacionais de resposta direta alimentados por IA.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // DADOS ESTRUTURADOS JSON-LD
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Grafos de Conhecimento e Esquemas Semânticos.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Para que motores de IA citem seu conteúdo, as informações precisam utilizar microdados Schema.org explícitos.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // OTIMIZAÇÃO AEO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Formatação Direta de Perguntas e Respostas.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Estruturar cabeçalhos H2 como perguntas diretas seguidas de parágrafos concisos aumenta a inclusão em sintetizadores de IA.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    O Futuro da Descoberta Digital.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Dominar o AEO posiciona sua marca nas conversas diárias que os usuários mantêm com modelos de IA.
  </p>
</div>
      `,
    },
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-12T14:30:00Z',
    readingTime: 6,
    tags: ['SEO & AEO', 'SEMANTICS', 'AI SEARCH'],
    author: {
      name: 'Manuel R.',
      role: 'HEAD OF ENGINEERING @ TLUX',
      avatar: '/tlux-logo.png',
    },
  },
  {
    slug: 'optimizacion-rendimiento-ux-conversion',
    title: {
      es: 'Diseño Awwwards y Métricas Core Web Vitals: La Fórmula de Conversión',
      en: 'Awwwards Design & Core Web Vitals: The Ultimate Conversion Formula',
      pt: 'Design Awwwards e Métricas Core Web Vitals: A Fórmula da Conversão',
      'pt-BR': 'Design Awwwards e Métricas Core Web Vitals: A Fórmula da Conversão',
    },
    excerpt: {
      es: 'Un desglose técnico sobre cómo combinar micro-animaciones fluidas en Framer Motion con LCP < 1.2s y CLS de 0.00 para elevar la tasa de conversión.',
      en: 'A technical breakdown of combining smooth Framer Motion micro-animations with LCP < 1.2s and 0.00 CLS to maximize conversion rates.',
      pt: 'Uma análise técnica de como combinar micro-animações fluidas no Framer Motion com LCP < 1.2s e CLS 0.00 para elevar conversões.',
      'pt-BR': 'Uma análise técnica de como combinar micro-animações fluidas no Framer Motion com LCP < 1.2s e CLS 0.00 para elevar conversões.',
    },
    content: {
      es: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">E</span>l diseño espectacular no tiene valor comercial si paraliza el navegador del usuario o causa desplazamientos inesperados del layout durante la carga.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // CORE WEB VITALS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    LCP por debajo de 1.2 segundos.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Optimizar las imágenes principales mediante compresión WebP/AVIF y precargar fuentes tipográficas reduce el tiempo del elemento con renderizado más grande (LCP).
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // MICRO-ANIMACIONES ACCESIBLES
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Interacciones en GPU a 60fps.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Utilizar Framer Motion delegando transformaciones de escala y opacidad a la tarjeta gráfica evita bloqueos en el hilo principal del navegador.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSIÓN
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Estética y velocidad sin concesiones.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Lograr premios Awwwards junto a una puntuación de 100 en Google Lighthouse es la combinación definitiva para convertir visitas en clientes.
  </p>
</div>
      `,
      en: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">S</span>tunning design has zero commercial value if it freezes the user's browser or causes unexpected layout shifts during load.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // CORE WEB VITALS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    LCP Under 1.2 Seconds.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Optimizing key hero imagery through WebP/AVIF compression and preloading brand fonts dramatically reduces Largest Contentful Paint.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // ACCESSIBLE MICRO-ANIMATIONS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    60fps GPU Interactions.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Leveraging Framer Motion for hardware-accelerated transform and opacity animations ensures buttery smooth performance.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSION
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Uncompromising Aesthetics & Speed.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Pairing Awwwards-worthy design with a 100 Google Lighthouse score is the ultimate conversion multiplier.
  </p>
</div>
      `,
      pt: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">D</span>esign espetacular não tem valor se desacelera o navegador do cliente ou causa mudanças inesperadas de layout.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // CORE WEB VITALS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    LCP Abaixo de 1.2 Segundos.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Otimizar imagens com compressão WebP/AVIF reduz o tempo de renderização da maior pintura de conteúdo.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // MICRO-ANIMAÇÕES ACESSÍVEIS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Interações GPU a 60fps.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Utilizar o Framer Motion delegando transformações de escala e opacidade à placa gráfica evita travamentos.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Estética e Velocidade Sem Concessões.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar design Awwwards com uma pontuação 100 no Lighthouse é a fórmula definitiva de conversão.
  </p>
</div>
      `,
      'pt-BR': `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">D</span>esign espetacular não tem valor se desacelera o navegador do cliente ou causa mudanças inesperadas de layout.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // CORE WEB VITALS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    LCP Abaixo de 1.2 Segundos.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Otimizar imagens com compressão WebP/AVIF reduz o tempo de renderização da maior pintura de conteúdo.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // MICRO-ANIMAÇÕES ACESSÍVEIS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Interações GPU a 60fps.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Utilizar o Framer Motion delegando transformações de escala e opacidade à placa gráfica evita travamentos.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Estética e Velocidade Sem Concessões.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar design Awwwards com uma pontuação 100 no Lighthouse é a fórmula definitiva de conversão.
  </p>
</div>
      `,
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-08T09:15:00Z',
    readingTime: 4,
    tags: ['DISEÑO UI/UX', 'CONVERSION', 'DESIGN SYSTEM'],
    author: {
      name: 'Sofía Mendoza',
      role: 'LEAD UI/UX ARCHITECT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
  },
  {
    slug: 'sistemas-de-diseno-brutalistas-digitales',
    title: {
      es: 'Sistemas de Diseño Brutalistas: Geometría Afilada y Tipografía Técnica',
      en: 'Brutalist Design Systems: Sharp Geometry & Technical Typography',
      pt: 'Sistemas de Design Brutalistas: Geometria Afiada e Tipografia Técnica',
      'pt-BR': 'Sistemas de Design Brutalistas: Geometria Afiada e Tipografia Técnica',
    },
    excerpt: {
      es: 'Cómo construir componentes reutilizables con Tailwind CSS v4 aplicando bordes delgados de 1px, esquinas afiladas y jerarquía mono-espaciada.',
      en: 'How to build reusable components with Tailwind CSS v4 using 1px crisp borders, sharp corners, and mono-spaced hierarchy.',
      pt: 'Como construir componentes reutilizáveis no Tailwind CSS v4 aplicando bordas de 1px e cantos retos.',
      'pt-BR': 'Como construir componentes reutilizáveis no Tailwind CSS v4 aplicando bordas de 1px e cantos retos.',
    },
    content: {
      es: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">E</span>l brutalismo digital contemporáneo celebra la estructura cruda, la legibilidad técnica y la funcionalidad absoluta sobre el adorno innecesario.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // BORDES DE 1PX Y ESQUINAS AFILADAS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Precisión técnica con Tailwind CSS v4.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Reemplazar los bordes redondeados estándar con bordes nítidos de 1px otorga a la interfaz una estética de instrumento de precisión.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // JERARQUÍA MONO-ESPACIADA
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Tipografía de código para llamadas a la acción.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar fuentes Sans de alta legibilidad con detalles en Mono-espaciado refuerza el carácter ingenieril de la marca.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSIÓN
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Identidad visual inconfundible.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    El brutalismo bien ejecutado transmite solidez técnica, autoridad y velocidad incomparables.
  </p>
</div>
      `,
      en: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">C</span>ontemporary digital brutalism celebrates raw structure, technical legibility, and absolute functionality over superfluous ornament.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // 1PX BORDERS & SHARP CORNERS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Technical Precision with Tailwind CSS v4.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Replacing default rounded borders with crisp 1px borders gives the interface a high-precision instrument aesthetic.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // MONO-SPACED HIERARCHY
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Code Typography for Technical CTAs.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Blending highly readable Sans body fonts with Mono-spaced micro-details enforces engineering authority.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSION
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Unmistakable Visual Identity.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Well-executed digital brutalism communicates technical mastery and unmatched performance.
  </p>
</div>
      `,
      pt: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">O</span> brutalismo digital contemporâneo celebra a estrutura bruta e a funcionalidade absoluta sobre adornos desnecessários.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // BORDAS DE 1PX E CANTOS RETOS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Precisão Técnica com Tailwind CSS v4.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Substituir bordas arredondadas por bordas nítidas de 1px concede à interface uma estética de instrumento de precisão.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // HIERARQUIA MONO-ESPAÇADA
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Tipografia de Código para Chamadas de Ação.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar fontes Sans com detalhes Mono-espaçados reforça a autoridade em engenharia.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Identidade Visual Inconfundível.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    O brutalismo bem executado transmite solidez técnica e autoridade.
  </p>
</div>
      `,
      'pt-BR': `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">O</span> brutalismo digital contemporâneo celebra a estrutura bruta e a funcionalidade absoluta sobre adornos desnecessários.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // BORDAS DE 1PX E CANTOS RETOS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Precisão Técnica com Tailwind CSS v4.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Substituir bordas arredondadas por bordas nítidas de 1px concede à interface uma estética de instrumento de precisão.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // HIERARQUIA MONO-ESPAÇADA
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Tipografia de Código para Chamadas de Ação.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Combinar fontes Sans com detalhes Mono-espaçados reforça a autoridade em engenharia.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Identidade Visual Inconfundível.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    O brutalismo bem executado transmite solidez técnica e autoridade.
  </p>
</div>
      `,
    },
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-05T11:00:00Z',
    readingTime: 5,
    tags: ['DISEÑO UI/UX', 'DESIGN SYSTEM', 'TAILWIND'],
    author: {
      name: 'Sofía Mendoza',
      role: 'LEAD UI/UX ARCHITECT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
  },
  {
    slug: 'optimizacion-servidor-edge-computing-cdn',
    title: {
      es: 'Edge Computing y Micro-Servicios: Reduciendo la Latencia Global a Cero',
      en: 'Edge Computing & Micro-Services: Reducing Global Latency to Zero',
      pt: 'Edge Computing e Micro-Serviços: Reduzindo a Latência Global a Zero',
      'pt-BR': 'Edge Computing e Micro-Serviços: Reduzindo a Latência Global a Zero',
    },
    excerpt: {
      es: 'Despliegue de funciones serverless en nodos distribuidos globalmente para una respuesta de servidor de sub-50ms.',
      en: 'Deploying serverless functions across globally distributed nodes for sub-50ms server response times.',
      pt: 'Implantação de funções serverless em nós distribuídos globalmente para resposta de servidor abaixo de 50ms.',
      'pt-BR': 'Implantação de funções serverless em nós distribuídos globalmente para resposta de servidor abaixo de 50ms.',
    },
    content: {
      es: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">A</span>cercar la lógica de negocio al lugar físico donde se encuentra el usuario final es el estándar dorado de la infraestructura moderna.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // FUNCIONES SERVERLESS EN EL EDGE
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Ejecución distribuida en +300 ciudades.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Mover el enrutamiento y la personalización a nodos Edge elimina el tiempo de ida y vuelta al servidor de origen.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // RESPUESTA SUB-50MS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Optimización de latencia en la última milla.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Las conexiones HTTP/3 y la memoria intermedia cercana al usuario garantizan cargas instantáneas incluso en redes móviles.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSIÓN
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Infraestructura sin fronteras.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    El Edge Computing transforma la experiencia global de usuario al erradicar la latencia geográfica.
  </p>
</div>
      `,
      en: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">B</span>ringing business logic closer to the end user's physical location is the gold standard of modern infrastructure.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // SERVERLESS AT THE EDGE
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Distributed Execution Across 300+ Edge Nodes.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Moving routing, auth, and dynamic personalization to regional Edge nodes removes round-trip latency to origin servers.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // SUB-50MS RESPONSE TIMES
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Last-Mile Latency Optimization.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Leveraging HTTP/3 connections and edge key-value caching guarantees instantaneous page loads on cellular networks worldwide.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSION
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Borderless Infrastructure.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Edge Computing eliminates geographic latency penalties, delighting users regardless of their physical location.
  </p>
</div>
      `,
      pt: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">A</span>proximar a lógica de negócios do usuário final é o padrão ouro da infraestrutura moderna.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // SERVERLESS NO EDGE
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Execução Distribuída em +300 Cidades.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Mover o roteamento para nós Edge elimina o tempo de ida e volta ao servidor de origem.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // RESPOSTA ABAIXO DE 50MS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Otimização de Latência de Última Milha.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Conexões HTTP/3 e cache próximo ao cliente garantem carregamento instantâneo.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Infraestrutura Sem Fronteiras.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    O Edge Computing erradica a latência geográfica em escala global.
  </p>
</div>
      `,
      'pt-BR': `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">A</span>proximar a lógica de negócios do usuário final é o padrão ouro da infraestrutura moderna.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // SERVERLESS NO EDGE
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Execução Distribuída em +300 Cidades.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Mover o roteamento para nós Edge elimina o tempo de ida e volta ao servidor de origem.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // RESPOSTA ABAIXO DE 50MS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Otimização de Latência de Última Milha.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Conexões HTTP/3 e cache próximo ao cliente garantem carregamento instantâneo.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Infraestrutura Sem Fronteiras.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    O Edge Computing erradica a latência geográfica em escala global.
  </p>
</div>
      `,
    },
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-03T16:20:00Z',
    readingTime: 6,
    tags: ['DESARROLLO', 'EDGE', 'INFRASTRUCTURE'],
    author: {
      name: 'Manuel R.',
      role: 'HEAD OF ENGINEERING @ TLUX',
      avatar: '/tlux-logo.png',
    },
  },
  {
    slug: 'estrategia-de-contenido-para-ia-generativa',
    title: {
      es: 'Estrategia de Contenido Semántico para Motores de Respuesta Generativos',
      en: 'Semantic Content Strategy for Generative Answer Engines',
      pt: 'Estratégia de Conteúdo Semântico para Motores de Resposta Gerativos',
      'pt-BR': 'Estratégia de Conteúdo Semântico para Motores de Resposta Gerativos',
    },
    excerpt: {
      es: 'Guía práctica para estructurar grafos de conocimiento y microdatos Schema.org que maximizan las citaciones en ChatGPT y Gemini.',
      en: 'Practical guide to structuring knowledge graphs and Schema.org microdata that maximize citations in ChatGPT and Gemini.',
      pt: 'Guia prático para estruturar grafos de conhecimento e microdados Schema.org que maximizam citações no ChatGPT.',
      'pt-BR': 'Guia prático para estruturar grafos de conhecimento e microdados Schema.org que maximizam citações no ChatGPT.',
    },
    content: {
      es: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">E</span>l contenido web que no puede ser indexado e interpretado gramaticalmente por modelos de lenguaje grande perderá visibilidad orgánica.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // ENTIDADES Y RELACIONES
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Modelado de conocimiento para LLMs.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Definir entidades claras y sus relaciones gramaticales ayuda a los modelos generativos a extraer respuestas exactas.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // CITACIONES Y AUTORIDAD
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Maximizar atribuciones en motores IA.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Incorporar datos originales, benchmarks y referencias citables posiciona a tu dominio como fuente prioritaria en ChatGPT y Gemini.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSIÓN
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Visibilidad en la era generativa.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Adaptar tu contenido para IA asegura la relevancia y el tráfico cualificado de tu producto digital.
  </p>
</div>
      `,
      en: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">W</span>eb content that cannot be indexed and syntactically parsed by LLMs will rapidly lose organic visibility.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // ENTITIES & RELATIONSHIPS
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Knowledge Modeling for LLMs.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Explicitly defining entities and their relationships enables LLMs to extract precise factual answers.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // CITATIONS & AUTHORITY
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Maximizing AI Engine Attributions.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Publishing original data, technical benchmarks, and citable references ranks your domain as a primary source.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSION
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Generative Era Visibility.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Adapting your content strategy for AI ensures high-intent organic traffic for your digital product.
  </p>
</div>
      `,
      pt: `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">C</span>onteúdo web que não pode ser interpretado por modelos LLM perderá visibilidade orgânica.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // ENTIDADES E RELAÇÕES
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Modelagem de Conhecimento para LLMs.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Definir entidades e relações gramaticais ajuda modelos de IA a extrair respostas exatas.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // CITAÇÕES E AUTORIDADE
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Maximizar Atribuições em Motores de IA.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Incorporar dados originais e benchmarks posiciona seu domínio como fonte prioritária.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Visibilidade na Era Gerativa.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Adaptar seu conteúdo para IA garante tráfego qualificado.
  </p>
</div>
      `,
      'pt-BR': `
<div id="introduccion" class="scroll-mt-28 mb-12">
  <p class="font-sans text-lg sm:text-xl leading-relaxed text-slate-700">
    <span class="float-left text-5xl sm:text-6xl font-serif font-bold text-blue-600 leading-none mr-3">C</span>onteúdo web que não pode ser interpretado por modelos LLM perderá visibilidade orgânica.
  </p>
</div>

<div id="principios-renderizado" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    01 // ENTIDADES E RELAÇÕES
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Modelagem de Conhecimento para LLMs.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Definir entidades e relações gramaticais ajuda modelos de IA a extrair respostas exatas.
  </p>
</div>

<div id="estrategia-caching" class="scroll-mt-28 pt-8 border-t border-slate-200 mb-12">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    02 // CITAÇÕES E AUTORIDADE
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Maximizar Atribuições em Motores de IA.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Incorporar dados originais e benchmarks posiciona seu domínio como fonte prioritária.
  </p>
</div>

<div id="conclusion" class="scroll-mt-28 pt-8 border-t border-slate-200">
  <p class="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-[#14b8a6]">
    03 // CONCLUSÃO
  </p>
  <h2 class="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-6">
    Visibilidade na Era Gerativa.
  </h2>
  <p class="font-sans text-base sm:text-lg leading-relaxed text-slate-700 mb-8">
    Adaptar seu conteúdo para IA garante tráfego qualificado.
  </p>
</div>
      `,
    },
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-08-01T08:45:00Z',
    readingTime: 4,
    tags: ['SEO & AEO', 'ARTIFICIAL_INTELLIGENCE'],
    author: {
      name: 'Elena Vásquez',
      role: 'LEAD CONTENT ENGINEER',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    },
  },
]

export function getAllPosts(): BlogPost[] {
  return MOCK_POSTS
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return MOCK_POSTS.find((p) => p.slug === slug)
}

export function getLocalizedPost(post: BlogPost, locale: string = 'es'): LocalizedBlogPost {
  const norm = String(locale).toLowerCase()
  const resolve = (field: Record<string, string> | any, fallbackKey = 'es') => {
    if (!field) return ''
    if (typeof field === 'string') return field
    if (norm === 'pt' || norm === 'pt-br') {
      return field['pt'] || field['pt-BR'] || field[fallbackKey] || Object.values(field)[0] || ''
    }
    if (norm === 'en') {
      return field['en'] || field[fallbackKey] || Object.values(field)[0] || ''
    }
    return field['es'] || field[fallbackKey] || Object.values(field)[0] || ''
  }

  return {
    ...post,
    title: resolve(post.title, 'es'),
    excerpt: resolve(post.excerpt, 'es'),
    content: resolve(post.content, 'es'),
  }
}
