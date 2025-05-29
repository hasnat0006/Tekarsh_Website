import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Tekarsh",
  description:
    "Tekarsh delivers innovative, high-performance software solutions for businesses of the future.",
};


import { ThemeProvider } from "@/components/theme-provider";
import {NavbarDemo} from "@/components/navbar";
import TekarshFooter from "@/components/ui/tekarsh-footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="theme"
        >
          <div
            className={`${poppins.className} ${inter.className} $ bg-background text-foreground antialiased`}
          >
            <NavbarDemo />
            {children}
          </div>
          <TekarshFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
