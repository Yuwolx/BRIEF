"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Upload, X, FileText } from "lucide-react"

interface ContextInputProps {
  data: {
    contextText: string
    uploadedFile?: { name: string; content: string }
  }
  onNext: (data: { contextText: string; uploadedFile?: { name: string; content: string } }) => void
  onSkip: () => void
}

export function ContextInput({ data, onNext, onSkip }: ContextInputProps) {
  const [contextText, setContextText] = useState(data.contextText)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; content: string } | undefined>(data.uploadedFile)
  const { uiLanguage } = useLanguage()
  const t = translations[uiLanguage]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    const validTypes = [".pdf", ".docx", ".txt", ".doc"]
    const fileExtension = file.name.substring(file.name.lastIndexOf("."))
    if (!validTypes.includes(fileExtension.toLowerCase())) {
      alert("Please upload PDF, DOCX, or TXT files only")
      return
    }

    // Read file content
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setUploadedFile({
        name: file.name,
        content: content,
      })
    }
    reader.readAsText(file)
  }

  const handleRemoveFile = () => {
    setUploadedFile(undefined)
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-8 pt-20">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          <div className="space-y-4">
            <Label htmlFor="context" className="text-base font-medium">
              {t.context.title}
            </Label>
            <Textarea
              id="context"
              placeholder={t.context.placeholder}
              value={contextText}
              onChange={(e) => setContextText(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <p className="text-sm text-muted-foreground">{t.context.helper}</p>
          </div>

          <div className="space-y-4 rounded-md border border-border bg-muted/30 p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">{t.context.fileUploadHelper}</p>
              <p className="text-xs text-muted-foreground">{t.context.fileUploadNote}</p>
            </div>

            {uploadedFile ? (
              <div className="flex items-center justify-between rounded-md border border-border bg-background p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{uploadedFile.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleRemoveFile} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx,.txt,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {t.context.uploadButton}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={onSkip} className="h-12 flex-1 bg-transparent">
            {t.context.skip}
          </Button>
          <Button onClick={() => onNext({ contextText, uploadedFile })} className="h-12 flex-1">
            {t.context.continue}
          </Button>
        </div>
      </div>
    </div>
  )
}
