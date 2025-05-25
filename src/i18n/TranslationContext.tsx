'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Translations = Record<string, string>

interface TranslationContextType {
  t: (key: string) => string
  locale: string
  switchLanguage: (newLocale: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const locale = pathname.split('/')[1] || 'en'
  const [dict, setDict] = useState<Translations | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const module = await import(`@/i18n/locales/${locale}.json`)
        setDict(module.default)
      } catch (e) {
        console.error(`Missing translation for ${locale}`, e)
        setDict({})
      }
    }
    load()
  }, [locale])

  const t = (key: string): string => dict?.[key] || key

  const switchLanguage = (newLocale: string) => {
    if (!pathname.startsWith(`/${locale}`)) return
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  if (!dict) {
    return null // <LoadingSpinner />
  }

  return (
    <TranslationContext.Provider value={{ t, locale, switchLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslationContext() {
  const context = useContext(TranslationContext)
  if (!context) throw new Error('useTranslationContext must be used inside TranslationProvider')
  return context
}
