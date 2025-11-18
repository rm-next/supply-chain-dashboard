"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { ChevronDown, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    demand: 58000, // Demand exceeds capacity
    inventory: 75000,
    capacity: 55000,
  },
  {
    month: "May",
    supply: 58000,
    demand: 62000, // Demand exceeds capacity
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
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["supply", "demand", "capacity"])
  const [selectedProgram, setSelectedProgram] = useState<string>("PRG-008")
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("foxconn")
  const [hoveredCell, setHoveredCell] = useState<{ month: string; metric: string } | null>(null)

  const programs = [
    { id: "all", name: "All Programs" },
    { id: "PRG-008", name: "Fire SMP Horizon" },
    { id: "PRG-001", name: "Echo Show 15" },
    { id: "PRG-002", name: "Kindle Paperwhite Signature" },
    { id: "PRG-003", name: "Echo Frames Gen 2" },
  ]

  const manufacturers = [
    { id: "all", name: "All Manufacturers" },
    { id: "foxconn", name: "Foxconn Technology Group" },
    { id: "pegatron", name: "Pegatron Corporation" },
    { id: "flex", name: "Flex Ltd." },
    { id: "jabil", name: "Jabil Circuit" },
  ]

  const toggleMetric = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))
  }

  const hasCapacityIssue = (monthData: typeof combinedPlanData[0]) => {
    return monthData.demand > monthData.capacity
  }

  const handleCollaborate = (month: string) => {
    const monthData = combinedPlanData.find(d => d.month === month)
    if (!monthData) return

    const shortfall = monthData.demand - monthData.capacity
    const message = `Capacity shortfall detected for ${month}: Demand is ${monthData.demand.toLocaleString()} units but capacity is only ${monthData.capacity.toLocaleString()} units. We need ${shortfall.toLocaleString()} additional units. Can you help increase production capacity?`
    
    localStorage.setItem("assistantCollaboration", JSON.stringify({
      message,
      participants: ["Foxconn - EMS Partner"],
      timestamp: Date.now()
    }))
    
    window.dispatchEvent(new CustomEvent("openAssistantWithCollaboration"))
  }

  const handleExplainShortage = (month: string) => {
    const monthData = combinedPlanData.find(d => d.month === month)
    if (!monthData) return

    const shortfall = monthData.demand - monthData.capacity
    const explanation = `I've analyzed the capacity shortage for ${month}:\n\n**Why the shortage exists:**\n• Demand forecast: ${monthData.demand.toLocaleString()} units\n• Current capacity: ${monthData.capacity.toLocaleString()} units\n• Shortfall: ${shortfall.toLocaleString()} units (${Math.round((shortfall/monthData.demand)*100)}%)\n\n**Contributing factors:**\n• Increased market demand for Q2 product launches\n• Limited manufacturing line capacity at current EMS partners\n• Lead time constraints for capacity expansion\n• Seasonal demand spike typical for this period\n\n**Recommendation:**\nI recommend collaborating with your Contract Manufacturer to explore capacity expansion options or alternative production lines.`
    
    localStorage.setItem("assistantCollaboration", JSON.stringify({
      message: explanation,
      participants: [],
      timestamp: Date.now(),
      type: "capacity-explanation"
    }))
    
    window.dispatchEvent(new CustomEvent("openAssistantWithCollaboration"))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Overall Plan</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered supply planning with demand forecasting and inventory optimization
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="w-64">
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger>
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-64">
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger>
                <SelectValue placeholder="Select manufacturer" />
              </SelectTrigger>
              <SelectContent>
                {manufacturers.map((manufacturer) => (
                  <SelectItem key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Clear to Build</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Components available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Orders (Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">127</div>
            <p className="text-xs text-muted-foreground mt-1">Manufacturing orders this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Capacity Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">87.3%</div>
            <p className="text-xs text-muted-foreground mt-1">Current production capacity</p>
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
                {selectedMetrics.includes("capacity") && (
                  <tr className="border-t">
                    <td className="p-3 font-medium sticky left-0 bg-background z-10">Capacity</td>
                    {combinedPlanData.map((data) => (
                      <td 
                        key={data.month} 
                        className={`p-3 text-right whitespace-nowrap relative ${
                          hasCapacityIssue(data) ? "bg-red-50 dark:bg-red-950/20" : ""
                        }`}
                        onMouseEnter={() => hasCapacityIssue(data) && setHoveredCell({ month: data.month, metric: "capacity" })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className="flex items-center justify-end gap-2">
                          <span className={hasCapacityIssue(data) ? "text-red-600 dark:text-red-400 font-semibold" : ""}>
                            {data.capacity.toLocaleString()}
                          </span>
                          {hasCapacityIssue(data) && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleExplainShortage(data.month)}
                            >
                              <Sparkles className="h-4 w-4 text-primary" />
                            </Button>
                          )}
                        </div>
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
