/**
 * Utilidad de Extracción de Tabla de Contenidos (TOC), Slugificación de Encabezados y Tiempo de Lectura
 * Cumple con el sistema de diseño TLUX.
 */

export interface TocItem {
  id: string
  text: string
  level: 'h2' | 'h3'
  number: string
}

/**
 * Convierte un texto de encabezado en un id slug estandarizado
 * Ej: "Características Principales & Ventajas" -> "caracteristicas-principales-ventajas"
 */
export function slugifyHeading(text: string): string {
  if (!text) return 'seccion'
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || 'seccion'
}

/**
 * Extrae encabezados H2 e H3 de una cadena HTML o Markdown y retorna elementos TOC estructurados
 */
export function extractTocFromHtml(contentHtml: string): { items: TocItem[]; processedHtml: string } {
  if (!contentHtml) {
    return { items: [], processedHtml: '' }
  }

  // Si la plataforma corre en el servidor o cliente, parseamos regex y DOM de forma segura
  const items: TocItem[] = []
  const usedIds = new Set<string>()

  // Expresión regular para detectar <h2> y <h3> con o sin ID
  let itemCounter = 1

  const processedHtml = contentHtml.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, levelStr, attrs, innerText) => {
    const level = `h${levelStr}` as 'h2' | 'h3'
    const cleanText = innerText.replace(/<[^>]*>/g, '').trim()
    if (!cleanText) return match

    // Extraer ID existente o generar uno nuevo slugificado
    let idMatch = attrs.match(/id=["']([^"']+)["']/i)
    let id = idMatch ? idMatch[1] : slugifyHeading(cleanText)

    // Garantizar unicidad de IDs
    let uniqueId = id
    let suffix = 1
    while (usedIds.has(uniqueId)) {
      uniqueId = `${id}-${suffix}`
      suffix++
    }
    usedIds.add(uniqueId)

    const numStr = itemCounter < 10 ? `0${itemCounter}` : `${itemCounter}`
    itemCounter++

    items.push({
      id: uniqueId,
      text: cleanText,
      level,
      number: numStr,
    })

    // Retornar etiqueta reconstruida con scroll-margin y el id asignado
    const cleanAttrs = attrs.replace(/id=["']([^"']+)["']/gi, '').trim()
    return `<h${levelStr} id="${uniqueId}" class="scroll-mt-28 ${cleanAttrs}">${innerText}</h${levelStr}>`
  })

  return { items, processedHtml }
}

/**
 * Calcula el tiempo estimado de lectura en minutos basado en un promedio de 200 palabras por minuto
 */
export function calculateReadingTime(content: string): { words: number; minutes: number; label: string } {
  if (!content) {
    return { words: 0, minutes: 1, label: '1 min de lectura' }
  }

  // Limpiar etiquetas HTML para obtener el texto puro
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = plainText ? plainText.split(' ').length : 0
  const minutes = Math.max(1, Math.ceil(words / 200))

  return {
    words,
    minutes,
    label: `${minutes} min de lectura`,
  }
}
