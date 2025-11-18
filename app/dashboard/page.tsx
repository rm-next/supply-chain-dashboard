"use client"

import { MetricsGrid } from "@/components/metrics-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActionsTab } from "@/components/actions-tab"
import { WatchListTab } from "@/components/watch-list-tab"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const initialTab = searchParams?.get('tab') || 'recommendations'
  
  const [recommendationsCount, setRecommendationsCount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)
  const [inProgressCount, setInProgressCount] = useState(0)

  useEffect(() => {
    const updateCounts = () => {
      if (typeof window === 'undefined') return
      
      const approvedActions = JSON.parse(localStorage.getItem("approvedActions") || "[]")
      const actionStatuses = JSON.parse(localStorage.getItem("actionStatuses") || "{}")
      
      // Mock counts - in real app would calculate from actual data
      setRecommendationsCount(12)
      setApprovedCount(approvedActions.length || 5)
      setInProgressCount(8)
    }
    
    updateCounts()
    
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => updateCounts()
      window.addEventListener("storage", handleStorageChange)
      return () => window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your supply chain operations.</p>
      </div>

      <MetricsGrid />

      <Tabs defaultValue={initialTab} className="w-full">
        <TabsList className="h-auto bg-transparent border-b border-border p-0 w-full justify-start gap-6">
          <TabsTrigger
            value="recommendations"
            className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Recommendations
            <Badge variant="secondary" className="ml-2">{recommendationsCount}</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Approved
            <Badge variant="secondary" className="ml-2">{approvedCount}</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            In-Progress
            <Badge variant="secondary" className="ml-2">{inProgressCount}</Badge>
          </TabsTrigger>
          <TabsTrigger
            value="watchlist"
            className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Watch List
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="mt-6">
          <ActionsTab activeTab="recommendations" />
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <ActionsTab activeTab="approved" />
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          <ActionsTab activeTab="in-progress" />
        </TabsContent>

        <TabsContent value="watchlist" className="mt-6">
          <WatchListTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
