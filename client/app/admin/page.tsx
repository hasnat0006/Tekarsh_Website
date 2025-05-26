import type { Metadata } from "next"
import Overview from "@/components/admin/overview"

export const metadata: Metadata = {
  title: "Admin Dashboard | Tekarsh",
  description: "Admin dashboard for Tekarsh careers website",
}

export default function AdminDashboard() {
  return (
    <div>
      <Overview />
    </div>
  );
}
