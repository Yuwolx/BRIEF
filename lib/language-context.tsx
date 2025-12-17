"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UILanguage = "ko" | "en"
type EmailLanguage = "ko" | "en"

interface LanguageContextType {
  uiLanguage: UILanguage
  setUILanguage: (lang: UILanguage) => void
  emailLanguage: EmailLanguage
  setEmailLanguage: (lang: EmailLanguage) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [uiLanguage, setUILanguage] = useState<UILanguage>("ko")
  const [emailLanguage, setEmailLanguage] = useState<EmailLanguage>("ko")

  return (
    <LanguageContext.Provider value={{ uiLanguage, setUILanguage, emailLanguage, setEmailLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
