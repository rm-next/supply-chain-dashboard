"use client"

import { MetricsGrid } from "@/components/metrics-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActionsTab } from "@/components/actions-tab"
import { FavoritesTab } from "@/components/favorites-tab"
import { WatchListTab } from "@/components/watch-list-tab"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your supply chain operations.</p>
      </div>

      <MetricsGrid />

      <Tabs defaultValue="actions" className="w-full">
        <TabsList className="h-auto bg-transparent border-b border-border p-0 w-full justify-start gap-8">
          <TabsTrigger
            value="actions"
            className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Actions
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Favorites
          </TabsTrigger>
          <TabsTrigger
            value="watchlist"
            className="rounded-none border-0 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Watch List
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="mt-6">
          <ActionsTab />
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <FavoritesTab />
        </TabsContent>

        <TabsContent value="watchlist" className="mt-6">
          <WatchListTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
