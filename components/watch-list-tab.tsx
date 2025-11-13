"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRole } from "@/hooks/use-role"
import { Eye, Bell, TrendingUp, AlertTriangle } from "lucide-react"

interface WatchItem {
  id: string
  title: string
  description: string
  status: "critical" | "warning" | "info" | "positive"
  lastUpdate: string
  module: string
  roles: string[]
}

const watchItems: WatchItem[] = [
  {
    id: "1",
    title: "IC Chip Inventory Below Threshold",
    description: "Current inventory: 2,450 units. Reorder point: 3,000 units. Expected delivery in 5 days.",
    status: "warning",
    lastUpdate: "15 minutes ago",
    module: "Inventory Plan",
    roles: ["Supply Planner", "Material Manager"],
  },
  {
    id: "2",
    title: "Production Order PO-8472 At Risk",
    description: "Missing 2 critical components. Estimated delay: 3 days unless expedited.",
    status: "critical",
    lastUpdate: "1 hour ago",
    module: "Manufacturing Orders",
    roles: ["Supply Planner", "Sustaining Ops Program Mgr"],
  },
  {
    id: "3",
    title: "Supplier Performance Improvement",
    description: "TechComponents Inc on-time delivery improved from 87% to 94% this quarter.",
    status: "positive",
    lastUpdate: "3 hours ago",
    module: "Suppliers",
    roles: ["Material Manager", "Global Commodity Manager"],
  },
  {
    id: "4",
    title: "Freight Cost Increase Alert",
    description: "Asia-EU shipping rates increased 12% due to fuel surcharges.",
    status: "warning",
    lastUpdate: "5 hours ago",
    module: "Shipments",
    roles: ["Logistics Planner", "Material Program Mgr"],
  },
  {
    id: "5",
    title: "New Component Qualification Complete",
    description: "Alternative display panel supplier passed all quality tests. Ready for production.",
    status: "positive",
    lastUpdate: "1 day ago",
    module: "Components",
    roles: ["NPI Ops Program Mgr", "Material Manager"],
  },
  {
    id: "6",
    title: "Demand Forecast Updated",
    description: "Q3 smart speaker demand revised up 18% based on market trends.",
    status: "info",
    lastUpdate: "1 day ago",
    module: "Demand Plan",
    roles: ["Supply Planner", "Sustaining Ops Program Mgr"],
  },
]

export function WatchListTab() {
  const { role } = useRole()

  // Filter watch items based on current role
  const filteredItems = watchItems.filter((item) => item.roles.includes(role))

  const getStatusColor = (status: WatchItem["status"]) => {
    switch (status) {
      case "critical":
        return "destructive"
      case "warning":
        return "default"
      case "info":
        return "secondary"
      case "positive":
        return "outline"
    }
  }

  const getStatusIcon = (status: WatchItem["status"]) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "info":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Watch List</h2>
        </div>
        <p className="text-sm text-muted-foreground">{filteredItems.length} active items</p>
      </div>

      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </div>
                <Badge variant={getStatusColor(item.status)} className="ml-2">
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{item.module}</span>
                  <span>•</span>
                  <span>{item.lastUpdate}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No items in your watch list</p>
            <p className="text-sm text-muted-foreground mt-1">
              Subscribe to updates from any module to track them here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
