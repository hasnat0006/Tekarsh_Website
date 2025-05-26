// import Navbar from "@/components/navbar";

export default function QualityAssuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
