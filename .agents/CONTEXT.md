# CONTEXT.md — TLUX Landing + Blog

Documento de contexto del proyecto. Léelo antes de editar o crear código.

## 1. Stack

- **Next.js 16.3.0** — App Router (`app/`), TypeScript, `output: 'standalone'`.
- **React 19**.
- **Tailwind CSS v4.3.3** — config CSS-first (`app/globals.css`), **NO** hay `tailwind.config.js`.
- **shadcn/ui** (`components.json`, estilo `base-nova`, base color `neutral`).
- `tw-animate-css`, `framer-motion`, `lucide-react`, `@vercel/analytics`.
- Tipografías vía `next/font`: `Geist` (`--font-geist`), `Geist Mono` (`--font-geist-mono`), `Cormorant Garamond` (`--font-cormorant`).
- Lint: `npm run lint` (ESLint + `eslint-config-next`).

## 2. Estructura de rutas (i18n)

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

## 3. Layout / librerías

- `app/layout.tsx`: `html lang="es"` + clase `light`, `viewport.themeColor: '#f8fafc'`, `Metadata` con base URL `NEXT_PUBLIC_SITE_URL` (fallback `http://corptlux.test`).
- `lib/locale.ts`: `Locale = 'es' | 'en' | 'pt' | 'pt-BR'`, `normalizeLocale()`.
- `lib/site.ts`: `BASE_URL`, email, redes, canónicos.
- `lib/metadata.ts`, `lib/json-ld.ts`, `lib/blog-metadata.ts`: metadata y JSON-LD.
- `lib/mock-data.ts`: posts del blog (`getAllPosts`, `getPostBySlug`, `getLocalizedPost`).
- `context/language-context.tsx`: `LanguageProvider` para idioma.
- Componentes compartidos: `SiteHeader`, `SiteFooter` (en `contacto-section`), `WhatsAppFloatingButton`, `JsonLd`, `BlogView`, `ArticleBody`.

## 4. Reglas de estilo — Tailwind CSS v4 (IMPORTANTE)

El proyecto usa **Tailwind v4 CSS-first**. Solo se pueden usar utilidades que el compilador v4 entienda (v4.3.3).

**Prohibido usar sintaxis v3/vieja** (da advertencias de IntelliSense/build):

- ❌ `bg-gradient-to-*` → ✅ `bg-linear-to-*` (`bg-linear-to-r/t/l/b`).
- ❌ `placeholder-slate-400` → ✅ `placeholder:text-slate-400`.
- ❌ `aspect-16/9` → ✅ `aspect-video`.
- ❌ Brackets arbitrarios cuando existe utilidad estándar (`min-h-[300px]` → `min-h-75`, `min-w-[260px]` → `min-w-65`, `tracking-[-0.05em]` → `tracking-tighter`, `leading-[1.0]` → `leading-none`).
- ❌ `focus:outline-none` cuando se busca quitar el contorno oculto → ✅ `focus:outline-hidden` (en v4 `outline-none` = `outline-style: none`; `outline-hidden` = el viejo comportamiento v3).
- En colores, prefiera tokens de la paleta (ver sección 5). Evitar `text-[#14b8a6]` → usar `text-teal-500` (mismo valor) si la paleta lo permite.

**Verificación rápida de una clase**: compilar el CSS o buscar su selector en el CSS generado (`.next/`). Si IntelliSense la subraya y la clase es válida, revisar `tailwindCSS.lint.cssConflict` en `.vscode/settings.json` antes de editar el código.

## 5. Paleta de marca TLUX

- Fondos: `bg-slate-950`, `bg-slate-900`, `bg-white`, `bg-slate-50`.
- Acento 1 (azul): `text-blue-600` / `bg-blue-600` / `border-blue-600`; gradiente `from-[#4F46E5]` a `to-[#2DD4BF]`.
- Acento 2 (teal/cyan): `text-teal-400` / `text-cyan-400` / `border-cyan-500/40` / `bg-cyan-950/40`.
- Bordes: `border-slate-800` (modo oscuro), `border-slate-200` (modo claro).
- Formas: **`rounded-none`** en botones, tarjetas, tags, inputs y contenedores.
- No introducir colores fuera de la paleta (aplica a landing, `/blog` y `/blog/[slug]`).

## 6. Reglas de trabajo (prioridad del usuario)

1. **Usar solo CSS que el Tailwind del proyecto entienda** (v4). Si una clase da advertencia de IntelliSense, verificar primero que el problema no sea una regla del linter antes de cambiarla.
2. **Respetar el diseño existente**: no cambiar estilos, colores, tipografías, espaciados ni estructura que ya estén implementados.
3. **No hacer cambios innecesarios**: edición mínima, solo lo que pide la tarea.
4. **Mantener cero advertencias** de ESLint, TypeScript y Tailwind CSS IntelliSense en el código editado/creado.
5. Comunicar al usuario cuando una "advertencia" no sea un error real de código.