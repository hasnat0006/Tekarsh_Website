import type { Metadata } from "next"
import LoginForm from "@/components/admin/login-form"

export const metadata: Metadata = {
  title: "Admin Login | Tekarsh",
  description: "Sign in to access the Tekarsh admin dashboard",
}

export default function LoginPage() {
  return <LoginForm />
}
