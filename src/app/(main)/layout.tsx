import { AuthProvider } from "@/lib/context/AuthContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AuthProvider>
        <main className="ml-0 min-h-screen w-full flex-1 overflow-y-auto">
          {children}
        </main>
      </AuthProvider>
    </div>
  )
}