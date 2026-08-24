const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export function trackLeadInteraction(
  type: 'WHATSAPP' | 'EMAIL' | 'NEWSLETTER',
  source = 'Landing General',
  customEmail?: string
) {
  if (typeof window === 'undefined') return

  try {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const isTablet = /(iPad)|(tablet)|(android(?!.*mobile))/i.test(navigator.userAgent)
    const device = isMobile ? 'Móvil' : isTablet ? 'Tablet' : 'Escritorio'
    const path = window.location.pathname || '/'
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const name =
      type === 'WHATSAPP'
        ? `Interés en WhatsApp (${device})`
        : type === 'EMAIL'
        ? `Interés en Correo Directo (${device})`
        : `Suscriptor de Newsletter (${device})`

    const email = customEmail || (type === 'WHATSAPP' ? 'lead.whatsapp@tlux.studio' : 'lead.email@tlux.studio')
    const subtitle = `Origen: ${source} • Ruta: ${path} • ${time}`

    fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subtitle }),
      keepalive: true,
    }).catch(() => {})
  } catch {}
}
