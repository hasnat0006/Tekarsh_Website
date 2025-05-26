import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-32 relative">
            <Image
              src="/placeholder.svg?height=40&width=128"
              alt="Tekarsh Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-violet-600 transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-violet-600 transition-colors">
            Services
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-violet-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-violet-600 transition-colors">
            Contact
          </Link>
          <Button className="bg-violet-600 hover:bg-violet-700">Career</Button>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <Button variant="ghost" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
