import { Facebook, Twitter, Instagram, Linkedin, Github, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TekarshFooter() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Tekarsh Logo"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6 items-center justify-start">
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>

          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                About Us
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Services
              </Link>
              <Link href="/careers" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Careers
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/services/software-development"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Software Development
              </Link>
              <Link
                href="/services/qa-testing"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                QA & Testing
              </Link>
              <Link
                href="/services/data-processing"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Data Processing
              </Link>
              <Link
                href="/services/product-support"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Product Support
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 p-2">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Tekarsh. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
