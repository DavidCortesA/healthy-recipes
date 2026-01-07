export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <main className="ml-0 md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}