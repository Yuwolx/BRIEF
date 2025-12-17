"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

interface NavigationHeaderProps {
  onBack?: () => void
  onHome: () => void
  showBack?: boolean
}

export function NavigationHeader({ onBack, onHome, showBack = true }: NavigationHeaderProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <div className="flex items-center gap-2">
        {showBack && onBack && (
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onBack}
            className="h-11 w-11 rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="size-6" strokeWidth={2.5} />
          </Button>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon-lg"
        onClick={onHome}
        className="h-11 w-11 rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Home className="size-6" strokeWidth={2.5} />
      </Button>
    </div>
  )
}
