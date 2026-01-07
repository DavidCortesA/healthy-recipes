import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-0 md:ml-64 pt-16 min-h-screen bg-neutral-50">
        {children}
      </main>
    </div>
  )
}