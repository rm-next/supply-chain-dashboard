"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SearchModal } from "@/components/search-modal"
import { SidebarProvider } from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showModuleName, setShowModuleName] = useState(false)
  const [moduleName, setModuleName] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      // Show module name in header when scrolled down more than 100px
      setShowModuleName(window.scrollY > 100)
    }

    const handleModuleNameChange = (event: CustomEvent) => {
      setModuleName(event.detail.moduleName)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("setModuleName" as any, handleModuleNameChange as any)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("setModuleName" as any, handleModuleNameChange as any)
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSearchOpen(true)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader moduleName={showModuleName ? moduleName : undefined} />
          <main className="flex-1 p-6 bg-muted/30">{children}</main>
        </div>
      </div>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} initialQuery={searchQuery} />
    </SidebarProvider>
  )
}
