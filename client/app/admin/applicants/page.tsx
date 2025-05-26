import type { Metadata } from "next"
import ApplicantsTable from "@/components/admin/applicants-table"


export const metadata: Metadata = {
  title: "Applicants | Admin Dashboard",
  description: "Manage job applicants with AI-powered insights",
}

export default function ApplicantsPage() {
  return (
    <div className="space-y-6 p-4">
      <ApplicantsTable />
    </div>
  )
}
