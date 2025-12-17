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
  const [isRevising, setIsRevising] = useState(false)
  const { uiLanguage, emailLanguage, setEmailLanguage } = useLanguage()
  const t = translations[uiLanguage]

  const generateEmail = (revisionInstructions?: string) => {
    if (emailLanguage === "ko") {
      // Korean email generation
      const purposeMap: Record<string, string> = {
        feasibility: "실행 가능성 확인",
        schedule: "일정 조율",
        risks: "리스크 검토",
        work: "업무 요청",
        opinion: "의견 요청",
      }
      const purposeText = purposeMap[data.purpose] || data.purpose

      const subject = `요청: ${purposeText}${data.projectName ? ` - ${data.projectName}` : ""}`

      const greeting = data.recipientName ? `안녕하세요 ${data.recipientName}님,` : "안녕하세요,"

      const deadline = data.clarifications.deadline ? `\n\n일정: ${data.clarifications.deadline}` : ""

      const blocking = data.clarifications.blocking
        ? "\n\n참고: 다른 팀의 업무 일정에 영향을 줄 수 있어 우선 검토를 요청드립니다."
        : ""

      const resources = data.clarifications.resources ? `\n\n필요한 리소스: ${data.clarifications.resources}` : ""
      const context = data.contextText ? `\n\n배경:\n${data.contextText}` : ""
      const fileReference = data.uploadedFile ? `\n\n첨부 문서: ${data.uploadedFile.name}` : ""

      const signature = data.senderName ? `감사합니다,\n${data.senderName}` : "감사합니다,"

      let email = `제목: ${subject}

${greeting}

${data.myRole} 팀에서 ${purposeText}를 위해 연락드립니다.${context}${fileReference}${deadline}${blocking}${resources}

검토 후 의견 공유 부탁드립니다. ${data.recipientRole} 관점에서의 의견을 듣고 싶습니다.

기대하는 답변: 초기 평가 또는 질문 사항이 있으시면 말씀해주세요.

${signature}`

      if (revisionInstructions) {
        if (revisionInstructions.includes("부드럽") || revisionInstructions.includes("softer")) {
          email = email.replace("부탁드립니다", "부탁드려도 될까요?")
          email = email.replace("말씀해주세요", "말씀해주시면 감사하겠습니다")
        }
        if (revisionInstructions.includes("부담") || revisionInstructions.includes("demanding")) {
          email = email.replace("검토 후 의견 공유", "시간 되실 때 검토 후 의견 공유")
          email = email.replace("부탁드립니다", "가능하시면 부탁드립니다")
        }
      }

      setEmailContent(email)
    } else {
      // English email generation
      const purposeText = data.purpose
        .replace("feasibility", "check the feasibility")
        .replace("schedule", "align on the schedule")
        .replace("risks", "review potential risks")
        .replace("work", "request work")
        .replace("opinion", "get your opinion")

      const subject = `Request: ${purposeText}${data.projectName ? ` - ${data.projectName}` : ""}`

      const greeting = data.recipientName ? `Hi ${data.recipientName},` : "Hi,"

      const deadline = data.clarifications.deadline ? `\n\nTimeline: ${data.clarifications.deadline}` : ""

      const blocking = data.clarifications.blocking
        ? "\n\nNote: This may affect other teams' schedules, so I'd appreciate your priority review."
        : ""

      const resources = data.clarifications.resources ? `\n\nResources needed: ${data.clarifications.resources}` : ""
      const context = data.contextText ? `\n\nContext:\n${data.contextText}` : ""
      const fileReference = data.uploadedFile ? `\n\nAttached document: ${data.uploadedFile.name}` : ""

      const signature = data.senderName ? `Thanks,\n${data.senderName}` : "Thanks,"

      let email = `Subject: ${subject}

${greeting}

I'm reaching out from the ${data.myRole} team to ${purposeText} with you.${context}${fileReference}${deadline}${blocking}${resources}

Could you please review and share your thoughts? I'd appreciate your ${data.recipientRole.toLowerCase()} perspective on this.

Expected response: Your initial assessment or any questions you might have.

${signature}`

      if (revisionInstructions) {
        if (revisionInstructions.includes("softer") || revisionInstructions.includes("부드럽")) {
          email = email.replace("Could you please", "When you have a moment, could you please")
          email = email.replace("I'd appreciate", "I'd really appreciate")
        }
        if (revisionInstructions.includes("demanding") || revisionInstructions.includes("부담")) {
          email = email.replace("Could you please", "If possible, could you")
          email = email.replace("review and share", "take a look and share")
        }
      }

      setEmailContent(email)
    }
  }

  useEffect(() => {
    generateEmail()
  }, [data, emailLanguage])

  const handleRevisionRequest = () => {
    if (!revisionRequest.trim()) return
    setIsRevising(true)
    // Simulate AI processing
    setTimeout(() => {
      generateEmail(revisionRequest)
      setIsRevising(false)
      setRevisionRequest("")
    }, 1000)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8 pt-20">
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
              className="h-9 px-4"
            >
              한국어
            </Button>
            <Button
              variant={emailLanguage === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setEmailLanguage("en")}
              className="h-9 px-4"
            >
              English
            </Button>
          </div>
        </div>

        <Textarea
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className="min-h-[400px] resize-none font-mono text-sm"
        />

        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <Label className="text-sm font-medium">{t.result.revisionTitle}</Label>
          <Textarea
            value={revisionRequest}
            onChange={(e) => setRevisionRequest(e.target.value)}
            placeholder={t.result.revisionPlaceholder}
            className="min-h-[100px] resize-none text-sm"
          />
          <Button onClick={handleRevisionRequest} disabled={!revisionRequest.trim() || isRevising} className="w-full">
            {isRevising ? t.result.revising : t.result.revisionButton}
          </Button>
        </div>

        <Button onClick={handleCopy} className="h-12 w-full gap-2">
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
