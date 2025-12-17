"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RoleSelection } from "@/components/role-selection"
import { ContextInput } from "@/components/context-input"
import { RequestPurpose } from "@/components/request-purpose"
import { AiClarification } from "@/components/ai-clarification"
import { EmailResult } from "@/components/email-result"
import { LanguageToggle } from "@/components/language-toggle"
import { NavigationHeader } from "@/components/navigation-header"
import { HomeConfirmationModal } from "@/components/home-confirmation-modal"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import Image from "next/image"

type Step = "landing" | "roles" | "context" | "purpose" | "clarification" | "result"

export default function Page() {
  const [step, setStep] = useState<Step>("landing")
  const [showHomeConfirm, setShowHomeConfirm] = useState(false)
  const [formData, setFormData] = useState({
    myRole: "",
    recipientRole: "",
    projectName: "",
    senderName: "",
    recipientName: "",
    contextText: "",
    purpose: "",
    clarifications: {} as Record<string, string | boolean>,
  })

  const { uiLanguage } = useLanguage()
  const t = translations[uiLanguage]

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleHomeClick = () => {
    if (step === "landing") return
    setShowHomeConfirm(true)
  }

  const handleHomeConfirm = () => {
    setFormData({
      myRole: "",
      recipientRole: "",
      projectName: "",
      senderName: "",
      recipientName: "",
      contextText: "",
      purpose: "",
      clarifications: {},
    })
    setStep("landing")
    setShowHomeConfirm(false)
  }

  const handleBack = () => {
    if (step === "context") setStep("roles")
    else if (step === "purpose") setStep("context")
    else if (step === "clarification") setStep("purpose")
    else if (step === "result") setStep("clarification")
  }

  if (step === "landing") {
    return (
      <>
        <LanguageToggle />
        <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
          {/* 중앙 콘텐츠 */}
          <div className="w-full max-w-5xl space-y-10 text-center">
            <h1
              className={`text-5xl font-semibold tracking-tight text-foreground md:text-6xl ${
                uiLanguage === "en" ? "whitespace-nowrap" : ""
              }`}
            >
              {t.landing.title}
            </h1>

            <Button
              size="lg"
              onClick={() => setStep("roles")}
              className="h-13 rounded-xl px-10 text-base font-bold"
            >
              {t.landing.button}
            </Button>
          </div>

          {/* 하단 중앙 로고 */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-90">
            <Image
              src="/logo.png"
              alt="BRIEF logo"
              width={150}
              height={150}
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <LanguageToggle />

      <NavigationHeader
        onBack={handleBack}
        onHome={handleHomeClick}
        showBack={step !== "roles"}
      />

      {/* ✅ 홈 이동 확인 모달 (여기 추가) */}
      <HomeConfirmationModal
        open={showHomeConfirm}
        onOpenChange={setShowHomeConfirm}
        onConfirm={handleHomeConfirm}
      />

      <div className="pt-8">
        {step === "roles" && (
          <RoleSelection
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              setStep("context")
            }}
          />
        )}

        {step === "context" && (
          <ContextInput
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              setStep("purpose")
            }}
            onSkip={() => setStep("purpose")}
          />
        )}

        {step === "purpose" && (
          <RequestPurpose
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              setStep("clarification")
            }}
          />
        )}

        {step === "clarification" && (
          <AiClarification
            data={formData}
            onNext={(data) => {
              updateFormData(data)
              setStep("result")
            }}
          />
        )}

        {step === "result" && <EmailResult data={formData} />}
      </div>
    </>
  )

}
