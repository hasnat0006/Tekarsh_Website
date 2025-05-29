"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import SidebarDemo from "@/components/admin/admin-sidebar";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const userid = localStorage.getItem("userid");
      if (!userid) {
        console.log("No user ID found in localStorage");
        setIsAuthenticated(false);
        setIsLoading(false);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
        return;
      }
      try {
        const authenticated = await fetch(`${url}/admin/check_valid_user?userid=` + userid);

        const data = await authenticated.json();
        console.log("Authentication check result:", data);
        setIsAuthenticated(data.valid);
        setIsLoading(false);
        if (!data.valid && pathname !== "/admin/login") {
          router.push("/admin/login");
        } else if (data.valid && pathname === "/admin/login") {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          <p className="text-sm text-muted-foreground">
            You are not authenticated. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative ">
        <SidebarDemo />
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
