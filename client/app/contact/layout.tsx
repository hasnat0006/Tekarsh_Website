
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us | Tekarsh",
  description: "Get in touch with us for any inquiries or support",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
}


