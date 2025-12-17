"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Label } from "@/components/ui/label"

interface EmailResultProps {
  data: {
    myRole: string
    recipientRole: string
    projectName: string
    senderName: string
    recipientName: string
    contextText: string
    purpose: string
    clarifications: Record<string, string | boolean>
    uploadedFile?: { name: string; content: string }
  }
}

export function EmailResult({ data }: EmailResultProps) {
  const [emailContent, setEmailContent] = useState("")
  const [copied, setCopied] = useState(false)
  const [revisionRequest, setRevisionRequest] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const { uiLanguage, emailLanguage, setEmailLanguage } = useLanguage()
  const t = translations[uiLanguage]

  const generateEmail = async (revisionInstructions?: string) => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          language: emailLanguage === "en" ? "English" : "Korean",
          revisionInstructions,
        }),
      })

      if (!res.ok) throw new Error("API error")

      const json = await res.json()
      setEmailContent(json.result)
    } catch (e) {
      setError(t.result.error || "메일 생성에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateEmail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailLanguage])

  const handleRevisionRequest = () => {
    if (!revisionRequest.trim()) return
    generateEmail(revisionRequest)
    setRevisionRequest("")
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex justify-center bg-background px-4 pt-18">
      <div className="w-full max-w-3xl space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium">{t.result.title}</h2>
          <p className="text-sm text-muted-foreground">{t.result.subtitle}</p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">{t.result.emailLanguage}</Label>
          <div className="flex gap-2">
            <Button
              variant={emailLanguage === "ko" ? "default" : "outline"}
              size="sm"
              onClick={() => setEmailLanguage("ko")}
            >
              한국어
            </Button>
            <Button
              variant={emailLanguage === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setEmailLanguage("en")}
            >
              English
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border bg-muted p-6 text-sm">
            {t.result.loading || "메일 생성 중입니다…"}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-sm text-red-600">
            {error}
          </div>
        ) : (
          <Textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="min-h-[400px] resize-none font-mono text-sm"
          />
        )}

        <div className="space-y-4 rounded-lg border bg-card p-6">
          <Label className="text-sm font-medium">{t.result.revisionTitle}</Label>
          <Textarea
            value={revisionRequest}
            onChange={(e) => setRevisionRequest(e.target.value)}
            placeholder={t.result.revisionPlaceholder}
            className="min-h-[100px] resize-none text-sm"
          />
          <Button
            onClick={handleRevisionRequest}
            disabled={!revisionRequest.trim() || loading}
            className="w-full"
          >
            {t.result.revisionButton}
          </Button>
        </div>

        <Button onClick={handleCopy} className="h-12 w-full gap-2" disabled={!emailContent}>
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              {t.result.copied}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {t.result.copy}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
