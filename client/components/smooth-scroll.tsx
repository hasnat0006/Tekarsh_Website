"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Apply smooth scrolling to the document
    document.documentElement.style.scrollBehavior = "smooth"

    // Handle all anchor clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (!anchor) return

      // Only handle same-page hash links
      const href = anchor.getAttribute("href")
      if (!href || !href.startsWith("#")) return

      e.preventDefault()

      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Update URL without reload
        window.history.pushState({}, "", href)

        // Scroll to the element with offset for header
        const headerOffset = 80 // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Set focus to the target for accessibility
        targetElement.setAttribute("tabindex", "-1")
        targetElement.focus({ preventScroll: true })

        setTimeout(() => {
        }, 1000) 
      }
    }

    // Handle initial hash in URL
    const handleInitialHash = () => {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          setTimeout(() => {
            const headerOffset = 80
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })

            targetElement.setAttribute("tabindex", "-1")
            targetElement.focus({ preventScroll: true })
          }, 300) // Small delay to ensure page is fully loaded
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    handleInitialHash()

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      document.documentElement.style.scrollBehavior = ""
    }
  }, [router])

  return <>{children}</>
}
