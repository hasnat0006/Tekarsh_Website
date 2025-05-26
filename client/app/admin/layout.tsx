import SidebarDemo from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="relative ">
        <SidebarDemo />
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
