"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import toast, {Toaster} from "react-hot-toast";
import Image from "next/image";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

interface LoginCredentials {
  email: string;
  password: string;
}


export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    console.log("Submitting login with credentials:", credentials);
    try {
      const response = await fetch(
        `${url}/admin/login?email=${credentials.email}&password=${credentials.password}`
      );
      const data = await response.json();
      console.log("Login response:", data);
      if (data.ok) {
        setSuccess("Login successful! Redirecting...");
        toast.success("Login successful! Redirecting...");
        // localStorage.setItem("userid", data.result.id)
        // Small delay to show success message
        setTimeout(() => {
          localStorage.setItem("userid", data.result.id);
          router.push("/admin");
        }, 1000);
      } else {
        setError(data.message || "Login failed");
        toast.error(data.message || "Please check your credentials");
      }
    } catch (err) {
      const errorMessage = `Invalid credentials! + ${err}`;
      setError(errorMessage);
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };

  const isFormValid =
    credentials.email.trim() !== "" && credentials.password.trim() !== "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-4">
      <Toaster position="top-right" />
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <Image
            src="/logo.svg"
            alt="Tekarsh Logo"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <div className="p-2">
            <CardDescription className="text-gray-600 mt-2">
              Sign in to access the Tekarsh admin
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="admin@tekarsh.com"
                required
                disabled={isLoading}
                className="h-11 border-gray-200 text-black focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="h-11 pr-10 text-black border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full h-11 bg-[var(--green)]/15 text-[var(--green)] hover:bg-[var(--green)]/20 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}
