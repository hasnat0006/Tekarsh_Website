import type { Metadata } from "next"
import JobsTable from "@/components/admin/jobs-table"

export const metadata: Metadata = {
  title: "Job Listings | Admin Dashboard",
  description: "Manage job listings",
}

export default function JobsPage() {
  return (
    <div className="space-y-6 p-4">
      <JobsTable />
    </div>
  )
}
