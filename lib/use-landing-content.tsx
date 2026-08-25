'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { FullLandingContent } from '../types/landing'
import { initialLandingData } from './landing-mock-data'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

interface LandingContextValue {
  content: FullLandingContent
  isLoading: boolean
}

const LandingContentContext = createContext<LandingContextValue>({
  content: initialLandingData,
  isLoading: false,
})

export function LandingContentProvider({
  initialContent,
  children,
}: {
  initialContent?: FullLandingContent
  children: React.ReactNode
}) {
  const [content, setContent] = useState<FullLandingContent>(initialContent || initialLandingData)
  const [isLoading, setIsLoading] = useState(false)

  // Si cambia initialContent por re-render del servidor, sincronizar
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent)
    }
  }, [initialContent])

  return (
    <LandingContentContext.Provider value={{ content, isLoading }}>
      {children}
    </LandingContentContext.Provider>
  )
}

export function useLandingContent() {
  return useContext(LandingContentContext)
}
