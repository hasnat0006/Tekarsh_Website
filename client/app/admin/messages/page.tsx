import type { Metadata } from "next"
import MessagesTable from "@/components/admin/messages-table"

export const metadata: Metadata = {
  title: "Contact Messages | Admin Dashboard",
  description: "Manage contact form messages",
}

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <MessagesTable />
    </div>
  )
}
