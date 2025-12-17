"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface RequestPurposeProps {
  data: {
    purpose: string
  }
  onNext: (data: { purpose: string }) => void
}

export function RequestPurpose({ data, onNext }: RequestPurposeProps) {
  const [purpose, setPurpose] = useState(data.purpose)
  const { uiLanguage } = useLanguage()
  const t = translations[uiLanguage]

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8 pt-20">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          <Label className="text-base font-medium">{t.purpose.title}</Label>
          <RadioGroup value={purpose} onValueChange={setPurpose}>
            <div className="space-y-3">
              {t.purpose.options.map((item) => (
                <div key={item.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={item.value} id={item.value} />
                  <Label htmlFor={item.value} className="cursor-pointer font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Button size="lg" onClick={() => onNext({ purpose })} disabled={!purpose} className="h-12 w-full">
          {t.purpose.continue}
        </Button>
      </div>
    </div>
  )
}
