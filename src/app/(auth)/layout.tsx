import { AuthProvider } from '@/lib/context/AuthContext';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <main className="ml-0 pt-16 pb-16  bg-gradient-hero">
        {children}
      </main>
    </AuthProvider>
  )
}