"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface ScrollToSectionProps {
  targetId: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function ScrollToSection({
  targetId,
  children,
  className,
  variant = "default",
  size = "default",
}: ScrollToSectionProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleClick = (e: MouseEvent) => {
      e.preventDefault()
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Calculate position with offset for header
        const headerOffset = 80 // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        // Scroll to the element
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Update URL without reload
        history.pushState(null, "", `#${targetId}`)

        // Set focus to the target for accessibility
        targetElement.setAttribute("tabindex", "-1")
        targetElement.focus({ preventScroll: true })
      }
    }

    button.addEventListener("click", handleClick as EventListener)

    return () => {
      button.removeEventListener("click", handleClick as EventListener)
    }
  }, [targetId])

  return (
    <Button ref={buttonRef} className={className} variant={variant} size={size}>
      {children}
    </Button>
  )
}
