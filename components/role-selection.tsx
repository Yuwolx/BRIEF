"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface RoleSelectionProps {
  data: {
    myRole: string
    recipientRole: string
    projectName: string
    senderName: string
    recipientName: string
  }
  onNext: (data: {
    myRole: string
    recipientRole: string
    projectName: string
    senderName: string
    recipientName: string
  }) => void
}

export function RoleSelection({ data, onNext }: RoleSelectionProps) {
  const [myRole, setMyRole] = useState(data.myRole)
  const [recipientRole, setRecipientRole] = useState(data.recipientRole)
  const [projectName, setProjectName] = useState(data.projectName)
  const [senderName, setSenderName] = useState(data.senderName)
  const [recipientName, setRecipientName] = useState(data.recipientName)
  const { uiLanguage } = useLanguage()
  const t = translations[uiLanguage]

  const handleNext = () => {
    if (myRole && recipientRole) {
      onNext({ myRole, recipientRole, projectName, senderName, recipientName })
    }
  }

  return (
    <div className="flex justify-center bg-background px-4 pt-13">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-8 rounded-2xl bg-card p-8 shadow-sm">
          <div className="space-y-5">
            <Label className="text-base font-normal text-foreground">{t.roles.myRole}</Label>
            <div className="flex flex-wrap gap-2">
              {t.roles.roleOptions.myRoles.map((role) => (
                <Button
                  key={role}
                  variant={myRole === role ? "default" : "outline"}
                  onClick={() => setMyRole(role)}
                  className="h-10 rounded-xl font-normal shadow-none transition-all hover:shadow-sm"
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="senderName" className="text-sm font-normal text-muted-foreground">
              {t.roles.myName}
            </Label>
            <Input
              id="senderName"
              placeholder={t.roles.myNamePlaceholder}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="h-11 rounded-xl border-border/50 bg-input/50 font-normal shadow-none transition-colors focus:bg-background"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="projectName" className="text-sm font-normal text-muted-foreground">
              {t.roles.projectName}
            </Label>
            <Input
              id="projectName"
              placeholder={t.roles.projectPlaceholder}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="h-11 rounded-xl border-border/50 bg-input/50 font-normal shadow-none transition-colors focus:bg-background"
            />
          </div>
        </div>

        <div className="space-y-8 rounded-2xl bg-card p-8 shadow-sm">
          <div className="space-y-2">
            <Label className="text-base font-normal text-foreground">{t.roles.recipientRole}</Label>
            <p className="text-sm font-normal text-muted-foreground">{t.roles.recipientHelper}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.roles.roleOptions.recipientRoles.map((role) => (
              <Button
                key={role}
                variant={recipientRole === role ? "default" : "outline"}
                onClick={() => setRecipientRole(role)}
                className="h-10 rounded-xl font-normal shadow-none transition-all hover:shadow-sm"
              >
                {role}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            <Label htmlFor="recipientName" className="text-sm font-normal text-muted-foreground">
              {t.roles.recipientName}
            </Label>
            <Input
              id="recipientName"
              placeholder={t.roles.recipientNamePlaceholder}
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="h-11 rounded-xl border-border/50 bg-input/50 font-normal shadow-none transition-colors focus:bg-background"
            />
          </div>

          <p className="text-xs font-normal text-muted-foreground">{t.roles.nameHelper}</p>
        </div>

        <Button
          size="lg"
          onClick={handleNext}
          disabled={!myRole || !recipientRole}
          className="h-12 w-full rounded-xl font-normal shadow-sm transition-all hover:shadow-md"
        >
          {t.roles.continue}
        </Button>
      </div>
    </div>
  )
}
