# TLUX Landing + Blog — README

Documento de contexto del proyecto. Léelo antes de editar o crear código.

## 1. Qué es este proyecto

Landing institucional de **TLUX Studio** con blog técnico integrado. Estudio digital que convierte negocios con ambición en experiencias imposibles de ignorar. La landing es el componente principal; el blog comparte el mismo header, footer y botón de WhatsApp.

## 2. Stack

- **Next.js 16.3.0** — App Router (`app/`), TypeScript, `output: 'standalone'`.
- **React 19**.
- **Tailwind CSS v4.3.3** — config CSS-first (`app/globals.css`), **NO** hay `tailwind.config.js`.
- **shadcn/ui** (`components.json`, estilo `base-nova`, base color `neutral`).
- `tw-animate-css`, `framer-motion`, `lucide-react`, `@vercel/analytics`.
- Tipografías vía `next/font`: `Geist` (`--font-geist`), `Geist Mono` (`--font-geist-mono`), `Cormorant Garamond` (`--font-cormorant`).
- Lint: `npm run lint` (ESLint + `eslint-config-next`).

## 3. Estructura de la landing

La landing se compone en `components/tlux-landing.tsx` (componente cliente). Orden real de renderizado:

| # | Sección | Componente | Ancla |
|---|---|---|---|
| 1 | Hero | `sections/hero-section.tsx` | `#inicio` |
| 2 | Stats | `sections/stats-section.tsx` | — |
| 3 | Clientes | `sections/clients-section.tsx` | — |
| 4 | Opiniones / Ratings | `sections/ratings-section.tsx` | `#opiniones` |
| 5 | Banner separador (frase + "scroll to explore") | inline en `tlux-landing.tsx` | — |
| 6 | Servicios / Mercados | `sections/servicios-section.tsx` | `#mercados` |
| 7 | Funciones / Método | `sections/funciones-section.tsx` | `#metodo` |
| 8 | Stack / Tecnologías | `sections/stack-section.tsx` | `#tecnologias` |
| 9 | Nosotros / Estudio | `sections/nosotros-section.tsx` | `#estudio` |
| 10 | Contacto | `sections/contacto-section.tsx` | `#contacto` y `#empezar-conversacion` |
| — | Footer | `SiteFooter` (exportado por `contacto-section.tsx`) | — |
| — | Botón flotante de WhatsApp | `whatsapp-floating-button.tsx` | — |

- `SiteHeader` (`sections/site-header.tsx`): logo TLUX con gradiente, menú móvil, selector de idioma y cambio de estado al hacer scroll.
- El banner separador anima con Framer Motion (`opacity/x` con `whileInView`).
- El botón de WhatsApp se oculta automáticamente cuando la sección `#contacto` entra en pantalla.
- La landing usa scroll suave (`html { scroll-behavior: smooth }` en `globals.css`) y resetea el scroll al navegar entre páginas.

## 4. Estructura de rutas (i18n)

Patrón estándar de i18n: **español es el idioma canónico sin prefijo**; los demás van bajo `/[lang]`.

| Ruta | Archivo |
|---|---|
| `/` | `app/page.tsx` |
| `/en`, `/pt`, `/pt-BR` | `app/[lang]/page.tsx` |
| `/blog` | `app/blog/page.tsx` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` |
| `/en/blog`, `/pt/blog`, `/pt-BR/blog` | `app/[lang]/blog/page.tsx` |
| `/en/blog/[slug]`, etc. | `app/[lang]/blog/[slug]/page.tsx` |

- `app/[lang]/...` con `lang === 'es'` hace `permanentRedirect()` a la ruta canónica sin prefijo (`/`, `/blog`, `/blog/[slug]`). Esto evita contenido duplicado y NO es redundancia: es el diseño intencional.
- `generateStaticParams()` genera `es, en, pt, pt-BR`.
- No eliminar/renombrar rutas ni agregar duplicados: la estructura ya está resuelta.

## 5. Idiomas y textos

- `lib/locale.ts`: `Locale = 'es' | 'en' | 'pt' | 'pt-BR'`, `normalizeLocale()` (normaliza `pt-pt` → `pt-BR`), títulos y descripciones SEO por idioma.
- `locales/es.json`, `locales/en.json`, `locales/pt.json`: diccionarios de texto. **`pt-BR` usa el diccionario `pt`**.
- `context/language-context.tsx`: `LanguageProvider` + hook `useTranslation()`. La clave `t('ruta.al.key')` resuelve desde el diccionario del locale activo con **fallback automático a español**.
- Cambio de idioma: `setLocale()` guarda la preferencia y recarga la página preservando la subruta actual (p. ej. `/blog` o `/blog/mi-post`).
- Idiomas disponibles en el selector del header: `es`, `en`, `pt` (🇧🇷).

## 6. Layout, SEO y datos estructurados

- `app/layout.tsx`: `html lang="es"` + clase `light`, `viewport.themeColor: '#f8fafc'`, ícono `/tlux-logo.png`, `Analytics` de Vercel solo en producción.
- `lib/site.ts`: `BASE_URL` (configurable por variable de entorno `NEXT_PUBLIC_SITE_URL`, fallback `http://corptlux.test`), email `hola@tlux.studio`, teléfono, logo, redes sociales y canónicos por idioma.
- `lib/metadata.ts`: `buildMetadata(locale)` — metadata + OpenGraph + Twitter + alternates por idioma.
- `lib/json-ld.ts`: `buildJsonLd(locale)` — grafo Schema.org (`Organization`, `WebSite`, `WebPage`, `Service`) para SEO/AEO.
- `lib/blog-metadata.ts`: metadata para listado y detalle de posts.
- Componente `JsonLd` (`components/json-ld.tsx`) inyecta el JSON-LD como `script`.

## 7. Blog

- Datos de prueba en `lib/mock-data.ts`: 5 posts en 4 idiomas (`getAllPosts`, `getPostBySlug`, `getLocalizedPost`). Cada post incluye slug, título, excerpt, contenido HTML (con secciones `#introduccion`, `#principios-renderizado`, `#estrategia-caching`, `#conclusion`), portada, autor, tags y fecha.
- `components/blog/blog-view.tsx`: listado del blog con sus secciones.
- `components/article/article-body.tsx`: vista del artículo con TOC interactivo.
- Las páginas del blog usan fondo oscuro `bg-slate-950` y mantienen el mismo `SiteHeader`, `SiteFooter` y `WhatsAppFloatingButton`.

## 8. Reglas de estilo — Tailwind CSS v4 (IMPORTANTE)

El proyecto usa **Tailwind v4 CSS-first**. Solo se pueden usar utilidades que el compilador v4 entienda (v4.3.3).

**Prohibido usar sintaxis v3/vieja** (da advertencias de IntelliSense/build):

- ❌ `bg-gradient-to-*` → ✅ `bg-linear-to-*` (`bg-linear-to-r/t/l/b`).
- ❌ `placeholder-slate-400` → ✅ `placeholder:text-slate-400`.
- ❌ `aspect-16/9` → ✅ `aspect-video`.
- ❌ Brackets arbitrarios cuando existe utilidad estándar (`min-h-[300px]` → `min-h-75`, `min-w-[260px]` → `min-w-65`, `tracking-[-0.05em]` → `tracking-tighter`, `leading-[1.0]` → `leading-none`).
- ❌ `focus:outline-none` cuando se busca quitar el contorno oculto → ✅ `focus:outline-hidden` (en v4 `outline-none` = `outline-style: none`; `outline-hidden` = el viejo comportamiento v3).
- En colores, prefiera tokens de la paleta (ver sección 9). Evitar `text-[#14b8a6]` → usar `text-teal-500` (mismo valor) si la paleta lo permite.

**Verificación rápida de una clase**: compilar el CSS o buscar su selector en el CSS generado. Si IntelliSense la subraya y la clase es válida, revisar `tailwindCSS.lint.cssConflict` en `.vscode/settings.json` antes de editar el código.

## 9. Paleta de marca TLUX

- Fondos: `bg-slate-950`, `bg-slate-900`, `bg-white`, `bg-slate-50`.
- Acento 1 (azul): `text-blue-600` / `bg-blue-600` / `border-blue-600`; gradiente `from-[#4F46E5]` a `to-[#2DD4BF]` (logo y frases).
- Acento 2 (teal/cyan): `text-teal-400` / `text-cyan-400` / `border-cyan-500/40` / `bg-cyan-950/40`.
- Bordes: `border-slate-800` (modo oscuro), `border-slate-200` (modo claro).
- Formas: **`rounded-none`** en botones, tarjetas, tags, inputs y contenedores (estética brutalista).
- Tipografía técnica: labels `font-mono` en `text-xs uppercase tracking-widest`.
- No introducir colores fuera de la paleta (aplica a landing, `/blog` y `/blog/[slug]`).

## 10. Despliegue (Docker)

- **`Dockerfile`** multi-etapa (deps → builder → runner) sobre `node:22-alpine`, `output: 'standalone'` con usuario no-root `nextjs`, puerto `3000`.
- **`docker-compose.yml`**: servicio `web` (frontend) + servicio `nginx` (proxy reverso en 80/443, certificados Let's Encrypt vía `certbot/` y `nginx.conf`).
- **`nginx.conf`**: proxy hacia `http://web:3000`; SSL comentado (activar al emitir certificados en producción).
- **`next.config.mjs`**: `output: 'standalone'` e `images.unoptimized: true`.

## 11. Scripts

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir build |
| `npm run lint` | ESLint |

## 12. Reglas de trabajo (prioridad del usuario)

1. **Usar solo CSS que el Tailwind del proyecto entienda** (v4). Si una clase da advertencia de IntelliSense, verificar primero que el problema no sea una regla del linter antes de cambiarla.
2. **Respetar el diseño existente**: no cambiar estilos, colores, tipografías, espaciados ni estructura que ya estén implementados.
3. **No hacer cambios innecesarios**: edición mínima, solo lo que pide la tarea.
4. **Mantener cero advertencias** de ESLint, TypeScript y Tailwind CSS IntelliSense en el código editado/creado.
5. Comunicar al usuario cuando una "advertencia" no sea un error real de código.