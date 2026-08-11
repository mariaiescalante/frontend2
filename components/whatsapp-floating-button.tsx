'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from '@/context/language-context'

function WhatsAppIcon({ className = "size-8 sm:size-9" }: { className?: string }) {
  return (
    <img
      src="/whatsapp-logo.png"
      alt="WhatsApp"
      className={`${className} object-contain shrink-0 pointer-events-none drop-shadow-md`}
    />
  )
}

export function WhatsAppFloatingButton() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contacto')
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect()
        // Si la parte superior de la sección contacto entra a la vista, ocultamos el botón flotante
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappMsg = encodeURIComponent(t('contacto.whatsapp_msg'))
  const whatsappUrl = `https://api.whatsapp.com/send?phone=573203249742&text=${whatsappMsg}`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center group"
        >
          {/* Etiqueta flotante expansiva (Tooltip / Píldora de conversación) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3 hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-xl shadow-slate-950/40 transition-all duration-300 group-hover:border-emerald-400 group-hover:bg-slate-900 group-hover:shadow-emerald-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t('contacto.cta')}</span>
            <ArrowUpRight className="size-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Burbuja Circular Flotante Principal de WhatsApp */}
          <motion.a
            id="burbuja-whatsapp-flotante"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            whileHover={{ scale: 1.12, rotate: 6 }}
            whileTap={{ scale: 0.92 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 20,
            }}
            className="relative flex size-16 sm:size-18 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 shadow-2xl shadow-emerald-500/60 hover:shadow-emerald-400/90 transition-shadow duration-300 cursor-pointer border-2 border-white/30"
          >
            {/* Anillo de pulso exterior en verde esmeralda */}
            <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping pointer-events-none -z-10" />

            {/* Logo oficial de WhatsApp extra grande */}
            <WhatsAppIcon className="size-12 sm:size-[52px]" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
