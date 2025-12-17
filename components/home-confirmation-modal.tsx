"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface HomeConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function HomeConfirmationModal({ open, onOpenChange, onConfirm }: HomeConfirmationModalProps) {
  const { uiLanguage } = useLanguage()
  const t = translations[uiLanguage]

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="z-[200]">
        <AlertDialogHeader>
          <AlertDialogTitle>{t.nav.homeConfirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.nav.homeConfirmMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t.nav.homeConfirmCancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t.nav.homeConfirmOk}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
