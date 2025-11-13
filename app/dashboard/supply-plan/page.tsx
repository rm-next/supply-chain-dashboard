"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const combinedPlanData = [
  {
    month: "Jan",
    supply: 45000,
    demand: 42000,
    inventory: 85000,
    capacity: 50000,
  },
  {
    month: "Feb",
    supply: 48000,
    demand: 46000,
    inventory: 82000,
    capacity: 52000,
  },
  {
    month: "Mar",
    supply: 52000,
    demand: 50000,
    inventory: 78000,
    capacity: 55000,
  },
  {
    month: "Apr",
    supply: 55000,
    demand: 54000,
    inventory: 75000,
    capacity: 55000,
  },
  {
    month: "May",
    supply: 58000,
    demand: 57000,
    inventory: 72000,
    capacity: 60000,
  },
  {
    month: "Jun",
    supply: 60000,
    demand: 59000,
    inventory: 68000,
    capacity: 60000,
  },
]

const demandPlanData = [
  { month: "Jan", forecast: 42000, actual: 43500, confirmed: 41000 },
  { month: "Feb", forecast: 46000, actual: 47200, confirmed: 45500 },
  { month: "Mar", forecast: 50000, actual: 51800, confirmed: 49800 },
  { month: "Apr", forecast: 54000, actual: 54200, confirmed: 53500 },
  { month: "May", forecast: 57000, actual: 0, confirmed: 56000 },
  { month: "Jun", forecast: 59000, actual: 0, confirmed: 58500 },
]

const inventoryPlanData = [
  { month: "Jan", onHand: 85000, safety: 60000, target: 70000 },
  { month: "Feb", onHand: 82000, safety: 60000, target: 70000 },
  { month: "Mar", onHand: 78000, safety: 60000, target: 70000 },
  { month: "Apr", onHand: 75000, safety: 60000, target: 70000 },
  { month: "May", onHand: 72000, safety: 60000, target: 70000 },
  { month: "Jun", onHand: 68000, safety: 60000, target: 70000 },
]

const capacityPlanData = [
  { month: "Jan", available: 50000, utilized: 43500, committed: 45000 },
  { month: "Feb", available: 52000, utilized: 47200, committed: 48500 },
  { month: "Mar", available: 55000, utilized: 51800, committed: 53000 },
  { month: "Apr", available: 55000, utilized: 54200, committed: 55000 },
  { month: "May", available: 60000, utilized: 0, committed: 58000 },
  { month: "Jun", available: 60000, utilized: 0, committed: 60000 },
]

export default function SupplyPlanPage() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["supply", "demand", "inventory", "capacity"])

  const toggleMetric = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overall Plan</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered supply planning with demand forecasting and inventory optimization
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Forecast Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">92.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Optimal Stock Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">87%</div>
            <p className="text-xs text-muted-foreground mt-1">Current vs target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Supply Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Low</div>
            <p className="text-xs text-muted-foreground mt-1">2.3/10 risk index</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Planning Views</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  Select Metrics <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuCheckboxItem
                  checked={selectedMetrics.includes("supply")}
                  onCheckedChange={() => toggleMetric("supply")}
                >
                  Supply
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedMetrics.includes("demand")}
                  onCheckedChange={() => toggleMetric("demand")}
                >
                  Demand
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedMetrics.includes("inventory")}
                  onCheckedChange={() => toggleMetric("inventory")}
                >
                  Inventory
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedMetrics.includes("capacity")}
                  onCheckedChange={() => toggleMetric("capacity")}
                >
                  Capacity
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedPlanData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedMetrics.includes("supply") && (
                  <Line type="monotone" dataKey="supply" stroke="#E85D3F" name="Supply" strokeWidth={2} />
                )}
                {selectedMetrics.includes("demand") && (
                  <Line type="monotone" dataKey="demand" stroke="#3B82F6" name="Demand" strokeWidth={2} />
                )}
                {selectedMetrics.includes("inventory") && (
                  <Line type="monotone" dataKey="inventory" stroke="#10B981" name="Inventory" strokeWidth={2} />
                )}
                {selectedMetrics.includes("capacity") && (
                  <Line type="monotone" dataKey="capacity" stroke="#F59E0B" name="Capacity" strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-medium sticky left-0 bg-muted/50 z-10">Metric</th>
                  {combinedPlanData.map((data) => (
                    <th key={data.month} className="p-3 text-right font-medium whitespace-nowrap">
                      {data.month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedMetrics.includes("supply") && (
                  <tr className="border-t">
                    <td className="p-3 font-medium sticky left-0 bg-background z-10">Supply</td>
                    {combinedPlanData.map((data) => (
                      <td key={data.month} className="p-3 text-right whitespace-nowrap">
                        {data.supply.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                )}
                {selectedMetrics.includes("demand") && (
                  <tr className="border-t">
                    <td className="p-3 font-medium sticky left-0 bg-background z-10">Demand</td>
                    {combinedPlanData.map((data) => (
                      <td key={data.month} className="p-3 text-right whitespace-nowrap">
                        {data.demand.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                )}
                {selectedMetrics.includes("inventory") && (
                  <tr className="border-t">
                    <td className="p-3 font-medium sticky left-0 bg-background z-10">Inventory</td>
                    {combinedPlanData.map((data) => (
                      <td key={data.month} className="p-3 text-right whitespace-nowrap">
                        {data.inventory.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                )}
                {selectedMetrics.includes("capacity") && (
                  <tr className="border-t">
                    <td className="p-3 font-medium sticky left-0 bg-background z-10">Capacity</td>
                    {combinedPlanData.map((data) => (
                      <td key={data.month} className="p-3 text-right whitespace-nowrap">
                        {data.capacity.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
