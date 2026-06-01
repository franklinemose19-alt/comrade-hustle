'use client'

import React, { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar will go here */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header will go here */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}