"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function LanguageToggle() {
  const { uiLanguage, setUILanguage } = useLanguage()

  return (
    <div className="fixed right-4 top-4 z-50 flex gap-2">
      <Button
        variant={uiLanguage === "ko" ? "default" : "outline"}
        size="sm"
        onClick={() => setUILanguage("ko")}
        className="h-10 px-5 text-sm font-medium"
      >
        {translations.ko.languageToggle.ko}
      </Button>
      <Button
        variant={uiLanguage === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setUILanguage("en")}
        className="h-10 px- text-sm font-medium"
      >
        {translations.en.languageToggle.en}
      </Button>
    </div>
  )
}
