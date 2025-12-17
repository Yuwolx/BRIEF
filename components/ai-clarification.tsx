"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface AiClarificationProps {
  data: {
    clarifications: Record<string, string | boolean>
  }
  onNext: (data: { clarifications: Record<string, string | boolean> }) => void
}

const questions = [
  {
    id: "deadline",
    type: "text" as const,
    question: "Is there a specific deadline or timeframe?",
  },
  {
    id: "blocking",
    type: "checkbox" as const,
    question: "Is this request blocking other work?",
  },
  {
    id: "resources",
    type: "text" as const,
    question: "What resources or access are needed?",
  },
]

export function AiClarification({ data, onNext }: AiClarificationProps) {
  const [clarifications, setClarifications] = useState<Record<string, string | boolean>>(data.clarifications)
  const { uiLanguage } = useLanguage()
  const t = translations[uiLanguage]

  const handleTextChange = (id: string, value: string) => {
    setClarifications((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setClarifications((prev) => ({ ...prev, [id]: checked }))
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8 pt-20">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-medium">{t.clarification.title}</h2>
            <p className="text-sm text-muted-foreground">{t.clarification.subtitle}</p>
          </div>

          <div className="space-y-6">
            {t.clarification.questions.map((q) => (
              <div key={q.id} className="space-y-2">
                <Label className="text-sm font-normal">{q.question}</Label>
                {q.id === "blocking" ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={q.id}
                      checked={(clarifications[q.id] as boolean) || false}
                      onCheckedChange={(checked) => handleCheckboxChange(q.id, checked as boolean)}
                    />
                    <Label htmlFor={q.id} className="cursor-pointer text-sm font-normal">
                      {t.clarification.yes}
                    </Label>
                  </div>
                ) : (
                  <Input
                    value={(clarifications[q.id] as string) || ""}
                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                    placeholder={t.clarification.placeholder}
                    className="h-10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Button size="lg" onClick={() => onNext({ clarifications })} className="h-12 w-full">
          {t.clarification.button}
        </Button>
      </div>
    </div>
  )
}
