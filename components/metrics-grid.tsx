"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Package, Truck, AlertTriangle, CheckCircle, Factory, Users, DollarSign, Clock, Calendar, Target, BarChart3, ShoppingCart, ShieldAlert, ShieldCheck, XCircle } from 'lucide-react'
import { useRole } from "@/hooks/use-role"

export function MetricsGrid() {
  const { role } = useRole()

  const metricsByRole = {
    "Product Ops Leader": [
      {
        title: "Total NPI Programs",
        value: "8",
        change: "+2",
        trend: "up",
        icon: Target,
      },
      {
        title: "Programs On Schedule",
        value: "75%",
        change: "+8%",
        trend: "up",
        icon: CheckCircle,
      },
      {
        title: "Overall BOM Cost",
        value: "$4.2M",
        change: "-$180K",
        trend: "down",
        icon: DollarSign,
      },
      {
        title: "Supply Chain Health",
        value: "94%",
        change: "+3%",
        trend: "up",
        icon: TrendingUp,
      },
      {
        title: "Active Suppliers",
        value: "127",
        change: "+8",
        trend: "up",
        icon: Users,
      },
      {
        title: "Critical Issues",
        value: "5",
        change: "-3",
        trend: "down",
        icon: AlertTriangle,
      },
      {
        title: "On-Time Delivery",
        value: "96.2%",
        change: "+1.4%",
        trend: "up",
        icon: Truck,
      },
      {
        title: "Cost Savings (YTD)",
        value: "$2.8M",
        change: "+$420K",
        trend: "up",
        icon: BarChart3,
      },
    ],
    "NPI Ops Program Mgr": [
      {
        title: "Active NPI Programs",
        value: "8",
        change: "+2",
        trend: "up",
        icon: Target,
      },
      {
        title: "Programs On Track",
        value: "6",
        change: "+1",
        trend: "up",
        icon: CheckCircle,
      },
      {
        title: "Design Milestones Due",
        value: "12",
        change: "-3",
        trend: "down",
        icon: Calendar,
      },
      {
        title: "Supplier Qualifications",
        value: "94%",
        change: "+2%",
        trend: "up",
        icon: Users,
      },
    ],
    "Sustaining Ops Program Mgr": [
      {
        title: "Active Programs",
        value: "24",
        change: "+1",
        trend: "up",
        icon: Factory,
      },
      {
        title: "Production Efficiency",
        value: "92.3%",
        change: "+1.5%",
        trend: "up",
        icon: TrendingUp,
      },
      {
        title: "Quality Issues",
        value: "3",
        change: "-2",
        trend: "down",
        icon: AlertTriangle,
      },
      {
        title: "On-Time Delivery",
        value: "96.1%",
        change: "+0.8%",
        trend: "up",
        icon: CheckCircle,
      },
    ],
    "Material Program Mgr": [
      {
        title: "Total BOM Cost",
        value: "$142.50",
        change: "-$2.30",
        trend: "down",
        icon: DollarSign,
      },
      {
        title: "Commodity Suppliers",
        value: "47",
        change: "+3",
        trend: "up",
        icon: Users,
      },
      {
        title: "Cost Savings (YTD)",
        value: "$1.2M",
        change: "+$180K",
        trend: "up",
        icon: TrendingUp,
      },
      {
        title: "Supplier Negotiations",
        value: "8",
        change: "+2",
        trend: "up",
        icon: BarChart3,
      },
    ],
    "Supply Planner": [
      {
        title: "Clear to Build (3W)",
        value: "94%",
        change: "+3%",
        trend: "up",
        icon: CheckCircle,
      },
      {
        title: "Orders at Risk",
        value: "7",
        change: "-4",
        trend: "down",
        icon: AlertTriangle,
      },
      {
        title: "Component Inventory",
        value: "Healthy",
        change: "+2%",
        trend: "up",
        icon: Package,
      },
      {
        title: "Pending Approvals",
        value: "12",
        change: "-3",
        trend: "down",
        icon: ShoppingCart,
      },
    ],
    "Logistics Planner": [
      {
        title: "Ready to Ship (4W)",
        value: "1,847",
        change: "+234",
        trend: "up",
        icon: Truck,
      },
      {
        title: "Active Shipments",
        value: "342",
        change: "+28",
        trend: "up",
        icon: Package,
      },
      {
        title: "Fulfillment Centers",
        value: "18",
        change: "+1",
        trend: "up",
        icon: Factory,
      },
      {
        title: "Avg Transit Time",
        value: "12 days",
        change: "-1 day",
        trend: "down",
        icon: Clock,
      },
    ],
    "Global Commodity Manager": [
      {
        title: "Active Negotiations",
        value: "14",
        change: "+3",
        trend: "up",
        icon: BarChart3,
      },
      {
        title: "Avg Price Reduction",
        value: "8.2%",
        change: "+1.1%",
        trend: "up",
        icon: DollarSign,
      },
      {
        title: "Avg Lead Time",
        value: "16 days",
        change: "-2 days",
        trend: "down",
        icon: Clock,
      },
      {
        title: "Supply Agreements",
        value: "32",
        change: "+4",
        trend: "up",
        icon: CheckCircle,
      },
    ],
    "Material Manager": [
      {
        title: "Active Suppliers",
        value: "28",
        change: "+2",
        trend: "up",
        icon: Users,
      },
      {
        title: "Supply Commitments",
        value: "94%",
        change: "+3%",
        trend: "up",
        icon: CheckCircle,
      },
      {
        title: "Component Shortages",
        value: "5",
        change: "-3",
        trend: "down",
        icon: AlertTriangle,
      },
      {
        title: "Qualification Pending",
        value: "8",
        change: "+2",
        trend: "up",
        icon: Target,
      },
    ],
    "Supplier Quality Manager": [
      {
        title: "Supplier Quality Score",
        value: "96.2%",
        change: "+1.3%",
        trend: "up",
        icon: ShieldCheck,
      },
      {
        title: "Incoming Defects",
        value: "23",
        change: "-8",
        trend: "down",
        icon: AlertTriangle,
      },
      {
        title: "Quarantined Inventory",
        value: "1,247 units",
        change: "-342",
        trend: "down",
        icon: XCircle,
      },
      {
        title: "Supplier Audits Due",
        value: "4",
        change: "+1",
        trend: "up",
        icon: Calendar,
      },
    ],
    "Manufacturing Technical Engineer": [
      {
        title: "Manufacturing Yield",
        value: "98.4%",
        change: "+0.6%",
        trend: "up",
        icon: Factory,
      },
      {
        title: "Quality Incidents",
        value: "7",
        change: "-4",
        trend: "down",
        icon: ShieldAlert,
      },
      {
        title: "Process Compliance",
        value: "99.1%",
        change: "+0.3%",
        trend: "up",
        icon: CheckCircle,
      },
      {
        title: "Root Cause Analyses",
        value: "3",
        change: "+1",
        trend: "up",
        icon: Target,
      },
    ],
  }

  const metrics = metricsByRole[role] || []

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive =
          (metric.trend === "up" &&
            !metric.title.includes("Alerts") &&
            !metric.title.includes("Risk") &&
            !metric.title.includes("Issues") &&
            !metric.title.includes("Shortages")) ||
          (metric.trend === "down" &&
            (metric.title.includes("Alerts") ||
              metric.title.includes("Lead Time") ||
              metric.title.includes("Transit Time") ||
              metric.title.includes("Risk") ||
              metric.title.includes("Issues") ||
              metric.title.includes("Shortages") ||
              metric.title.includes("Approvals") ||
              metric.title.includes("Cost") ||
              metric.title.includes("Due")))
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendIcon className={`h-3 w-3 ${isPositive ? "text-green-600" : "text-red-600"}`} />
                <span className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>{metric.change}</span>
                <span className="text-xs text-muted-foreground ml-1">vs last week</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
