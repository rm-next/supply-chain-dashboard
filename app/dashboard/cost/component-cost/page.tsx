"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, History, Pencil, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ComponentCost {
  id: string
  componentName: string
  mpn: string
  supplier: string
  projectedCost: number
  actualCost: number
  moq: number
  leadTime: string
  leadTimeTrend: "increasing" | "decreasing" | "stable"
  statedLeadTime: string
  category: string
  costHistory: CostHistoryEntry[]
  costOpportunity?: "proactive-buy" | "negotiate-down" | "stable" | null
  commodityType?: string
}

interface CostHistoryEntry {
  date: string
  milestone: string
  previousCost: number
  newCost: number
  changeReason: string
  changedBy: string
}

const componentCosts: ComponentCost[] = [
  {
    id: "COMP-001",
    componentName: "ARM Cortex-M4 MCU",
    mpn: "STM32F407VGT6",
    supplier: "STMicroelectronics",
    projectedCost: 4.25,
    actualCost: 4.15,
    moq: 1000,
    leadTime: "12 weeks",
    leadTimeTrend: "increasing",
    statedLeadTime: "10 weeks",
    category: "Electronics",
    costOpportunity: "stable",
    commodityType: "Semiconductors",
    costHistory: [
      {
        date: "2023-06-01",
        milestone: "EVT",
        previousCost: 0,
        newCost: 4.8,
        changeReason: "Initial quote",
        changedBy: "John Smith",
      },
      {
        date: "2023-09-15",
        milestone: "DVT",
        previousCost: 4.8,
        newCost: 4.5,
        changeReason: "Volume discount",
        changedBy: "Sarah Lee",
      },
      {
        date: "2023-12-01",
        milestone: "PVT",
        previousCost: 4.5,
        newCost: 4.25,
        changeReason: "Annual contract pricing",
        changedBy: "Mike Chen",
      },
      {
        date: "2024-01-10",
        milestone: "Production",
        previousCost: 4.25,
        newCost: 4.15,
        changeReason: "Spot buy advantage",
        changedBy: "Sarah Lee",
      },
    ],
  },
  {
    id: "COMP-002",
    componentName: 'OLED Display 1.3"',
    mpn: "SSD1306-128x64",
    supplier: "Solomon Systech",
    projectedCost: 2.8,
    actualCost: 2.95,
    moq: 500,
    leadTime: "8 weeks",
    leadTimeTrend: "stable",
    statedLeadTime: "8 weeks",
    category: "Display",
    costOpportunity: "stable",
    commodityType: "Displays",
    costHistory: [
      {
        date: "2023-05-15",
        milestone: "EVT",
        previousCost: 0,
        newCost: 3.2,
        changeReason: "Initial quote",
        changedBy: "Emily Wang",
      },
      {
        date: "2023-08-20",
        milestone: "DVT",
        previousCost: 3.2,
        newCost: 2.9,
        changeReason: "Negotiated pricing",
        changedBy: "David Park",
      },
      {
        date: "2023-11-10",
        milestone: "PVT",
        previousCost: 2.9,
        newCost: 2.8,
        changeReason: "Volume commitment",
        changedBy: "Emily Wang",
      },
      {
        date: "2024-01-05",
        milestone: "Production",
        previousCost: 2.8,
        newCost: 2.95,
        changeReason: "Material cost increase",
        changedBy: "David Park",
      },
    ],
  },
  {
    id: "COMP-003",
    componentName: "Li-Ion Battery 3000mAh",
    mpn: "ICR18650-30B",
    supplier: "Samsung SDI",
    projectedCost: 3.5,
    actualCost: 3.5,
    moq: 2000,
    leadTime: "10 weeks",
    leadTimeTrend: "stable",
    statedLeadTime: "10 weeks",
    category: "Power",
    costOpportunity: "stable",
    commodityType: "Batteries",
    costHistory: [
      {
        date: "2023-04-20",
        milestone: "EVT",
        previousCost: 0,
        newCost: 4.0,
        changeReason: "Initial quote",
        changedBy: "Lisa Brown",
      },
      {
        date: "2023-07-25",
        milestone: "DVT",
        previousCost: 4.0,
        newCost: 3.75,
        changeReason: "Long-term agreement",
        changedBy: "Tom Wilson",
      },
      {
        date: "2023-10-30",
        milestone: "PVT",
        previousCost: 3.75,
        newCost: 3.5,
        changeReason: "Market price reduction",
        changedBy: "Lisa Brown",
      },
    ],
  },
  {
    id: "COMP-004",
    componentName: "WiFi Module 802.11ac",
    mpn: "ESP32-WROOM-32",
    supplier: "Espressif",
    projectedCost: 1.95,
    actualCost: 1.85,
    moq: 1000,
    leadTime: "6 weeks",
    leadTimeTrend: "decreasing",
    statedLeadTime: "8 weeks",
    category: "Wireless",
    costOpportunity: "stable",
    commodityType: "Wireless Components",
    costHistory: [
      {
        date: "2023-07-10",
        milestone: "EVT",
        previousCost: 0,
        newCost: 2.2,
        changeReason: "Initial quote",
        changedBy: "Alex Kim",
      },
      {
        date: "2023-10-15",
        milestone: "DVT",
        previousCost: 2.2,
        newCost: 2.0,
        changeReason: "Competitive pricing",
        changedBy: "Rachel Green",
      },
      {
        date: "2024-01-08",
        milestone: "PVT",
        previousCost: 2.0,
        newCost: 1.95,
        changeReason: "Volume pricing tier",
        changedBy: "Alex Kim",
      },
      {
        date: "2024-01-20",
        milestone: "Production",
        previousCost: 1.95,
        newCost: 1.85,
        changeReason: "Promotional pricing",
        changedBy: "Rachel Green",
      },
    ],
  },
  {
    id: "COMP-005",
    componentName: "USB-C Connector",
    mpn: "USB4105-GF-A",
    supplier: "GCT",
    projectedCost: 0.45,
    actualCost: 0.48,
    moq: 5000,
    leadTime: "4 weeks",
    leadTimeTrend: "stable",
    statedLeadTime: "4 weeks",
    category: "Connectors",
    costOpportunity: "negotiate-down",
    commodityType: "Aluminum",
    costHistory: [
      {
        date: "2023-08-05",
        milestone: "EVT",
        previousCost: 0,
        newCost: 0.5,
        changeReason: "Initial quote",
        changedBy: "Chris Taylor",
      },
      {
        date: "2023-11-10",
        milestone: "DVT",
        previousCost: 0.5,
        newCost: 0.45,
        changeReason: "High volume discount",
        changedBy: "Nina Patel",
      },
      {
        date: "2024-01-15",
        milestone: "Production",
        previousCost: 0.45,
        newCost: 0.48,
        changeReason: "Raw material surcharge",
        changedBy: "Chris Taylor",
      },
    ],
  },
  {
    id: "COMP-006",
    componentName: "Aluminum Housing",
    mpn: "ALU-CASE-001",
    supplier: "Foxconn",
    projectedCost: 5.2,
    actualCost: 5.0,
    moq: 500,
    leadTime: "14 weeks",
    leadTimeTrend: "increasing",
    statedLeadTime: "12 weeks",
    category: "Mechanical",
    costOpportunity: "negotiate-down",
    commodityType: "Aluminum",
    costHistory: [
      {
        date: "2023-06-20",
        milestone: "EVT",
        previousCost: 0,
        newCost: 6.0,
        changeReason: "Initial tooling quote",
        changedBy: "Mark Johnson",
      },
      {
        date: "2023-09-25",
        milestone: "DVT",
        previousCost: 6.0,
        newCost: 5.5,
        changeReason: "Process optimization",
        changedBy: "Anna Lee",
      },
      {
        date: "2023-12-15",
        milestone: "PVT",
        previousCost: 5.5,
        newCost: 5.2,
        changeReason: "Tooling amortization",
        changedBy: "Mark Johnson",
      },
      {
        date: "2024-01-18",
        milestone: "Production",
        previousCost: 5.2,
        newCost: 5.0,
        changeReason: "Volume production efficiency",
        changedBy: "Anna Lee",
      },
    ],
  },
  {
    id: "COMP-007",
    componentName: "LPDDR4 Memory 4GB",
    mpn: "MT53E512M32D2",
    supplier: "Micron Technology",
    projectedCost: 8.5,
    actualCost: 8.5,
    moq: 1000,
    leadTime: "8 weeks",
    leadTimeTrend: "increasing",
    statedLeadTime: "6 weeks",
    category: "Memory",
    costOpportunity: "proactive-buy",
    commodityType: "Memory",
    costHistory: [
      {
        date: "2023-09-10",
        milestone: "EVT",
        previousCost: 0,
        newCost: 7.5,
        changeReason: "Initial quote",
        changedBy: "Jennifer Chen",
      },
      {
        date: "2023-12-15",
        milestone: "DVT",
        previousCost: 7.5,
        newCost: 8.0,
        changeReason: "Market price increase",
        changedBy: "Robert Kim",
      },
      {
        date: "2024-01-20",
        milestone: "PVT",
        previousCost: 8.0,
        newCost: 8.5,
        changeReason: "Supply shortage premium",
        changedBy: "Jennifer Chen",
      },
    ],
  },
]

export default function ComponentCostPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComponent, setSelectedComponent] = useState<ComponentCost | null>(null)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editedProjectedCost, setEditedProjectedCost] = useState("")
  const [editedActualCost, setEditedActualCost] = useState("")
  const [hoveredCostCell, setHoveredCostCell] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [hoveredLeadTime, setHoveredLeadTime] = useState<string | null>(null)

  const filteredComponents = componentCosts.filter(
    (comp) =>
      comp.componentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.mpn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRowClick = (component: ComponentCost) => {
    setSelectedComponent(component)
    setShowHistoryDialog(true)
  }

  const handleEditClick = (e: React.MouseEvent, component: ComponentCost) => {
    e.stopPropagation()
    setSelectedComponent(component)
    setEditedProjectedCost(component.projectedCost.toString())
    setEditedActualCost(component.actualCost.toString())
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    console.log("[v0] Saving cost update:", {
      componentId: selectedComponent?.id,
      projectedCost: editedProjectedCost,
      actualCost: editedActualCost,
    })
    setShowEditDialog(false)
  }

  const getOpportunityBadge = (opportunity: string | null | undefined) => {
    switch (opportunity) {
      case "proactive-buy":
        return { label: "Buy Now", variant: "default" as const, className: "bg-orange-500 hover:bg-orange-600" }
      case "negotiate-down":
        return { label: "Negotiate", variant: "default" as const, className: "bg-green-500 hover:bg-green-600" }
      case "stable":
        return { label: "Monitor", variant: "secondary" as const, className: "" }
      default:
        return null
    }
  }

  const handleExplainShouldCost = (e: React.MouseEvent, component: ComponentCost) => {
    e.stopPropagation()
    
    const shouldCostAnalysis = {
      component: component.componentName,
      mpn: component.mpn,
      supplier: component.supplier,
      shouldCost: component.projectedCost,
      actualCost: component.actualCost,
      calculation: {
        title: "Should Cost Calculation",
        methodology: "Based on market analysis, historical pricing, and comparable parts",
        factors: [
          {
            name: "Market Conditions",
            value: `${component.commodityType || "Electronics"} commodity pricing`,
            weight: "40%",
            impact: `Current market rate: $${(component.projectedCost * 0.85).toFixed(2)}-$${(component.projectedCost * 1.15).toFixed(2)}`
          },
          {
            name: "Past Program Pricing",
            value: "Historical purchase data across 3 similar programs",
            weight: "35%",
            impact: component.costHistory.length > 0 
              ? `Average historical cost: $${(component.costHistory.reduce((acc, h) => acc + h.newCost, 0) / component.costHistory.length).toFixed(2)}`
              : "Limited historical data"
          },
          {
            name: "Look-alike Parts Analysis",
            value: "Comparing 5 similar components from comparable suppliers",
            weight: "25%",
            impact: `Look-alike range: $${(component.projectedCost * 0.92).toFixed(2)}-$${(component.projectedCost * 1.08).toFixed(2)}`
          }
        ],
        comparableParts: [
          { mpn: `${component.mpn}-ALT1`, supplier: "Alternative Supplier A", cost: (component.projectedCost * 0.95).toFixed(2) },
          { mpn: `${component.mpn}-ALT2`, supplier: "Alternative Supplier B", cost: (component.projectedCost * 1.03).toFixed(2) },
          { mpn: `${component.mpn}-ALT3`, supplier: "Alternative Supplier C", cost: (component.projectedCost * 0.98).toFixed(2) }
        ]
      },
      conclusion: `The should cost of $${component.projectedCost.toFixed(2)} represents a fair market value based on weighted analysis of market conditions (40%), historical program pricing (35%), and look-alike parts comparison (25%).`
    }

    window.dispatchEvent(
      new CustomEvent("openAssistantWithMessage", {
        detail: {
          message: `Explaining should cost calculation for ${component.componentName}...`,
          type: "should-cost-explanation",
          shouldCostData: shouldCostAnalysis,
        },
      })
    )
  }

  const handleExplainCost = (e: React.MouseEvent, component: ComponentCost) => {
    e.stopPropagation()
    
    let costAnalysisData
    
    if (component.costOpportunity === "proactive-buy" && component.commodityType === "Memory") {
      costAnalysisData = {
        component: component.componentName,
        mpn: component.mpn,
        supplier: component.supplier,
        currentCost: component.projectedCost,
        commodityType: component.commodityType,
        opportunity: component.costOpportunity,
        marketDynamics: {
          title: "Market Dynamics Analysis",
          trends: [
            "Memory prices increasing 12% QoQ due to supply constraints in SK Hynix and Samsung fabs",
            "AI server demand driving LPDDR4 allocation away from consumer devices",
            "Industry analysts predict 20-25% price increase over next 6 months",
            "Supplier lead times extended from 8 weeks to 12+ weeks"
          ],
          forecast: "Projected cost increase to $10.20-$10.80 by Q3 2025 based on current market trajectory"
        },
        demandAnalysis: {
          title: "Cross-Program Demand Forecast",
          programs: [
            { name: "Fire SMP Horizon", demand: "125K units (Q2-Q3 2025)", timeline: "8 weeks" },
            { name: "Echo Show 15 Refresh", demand: "85K units (Q3 2025)", timeline: "12 weeks" },
            { name: "Fire Tablet 11", demand: "200K units (Q2-Q4 2025)", timeline: "16 weeks" }
          ]
        },
        recommendation: {
          title: "Recommended Action",
          action: "Proactive Buy - Lock pricing now",
          reasoning: [
            "Secure 410K units at current $8.50/unit before anticipated price increase",
            "Avoid 20-25% cost premium ($820K-$1.025M additional spend) if delayed",
            "Guarantee supply availability for critical Q2-Q3 production ramp",
            "Leverage current supplier capacity before AI demand absorbs production"
          ],
          impact: "Save $820K-$1.025M",
          timeline: "2 weeks to lock pricing",
          recommendedCost: "$8.50/unit (vs projected $10.20-$10.80)"
        }
      }
    } else if (component.costOpportunity === "negotiate-down" && component.commodityType === "Aluminum") {
      costAnalysisData = {
        component: component.componentName,
        mpn: component.mpn,
        supplier: component.supplier,
        currentCost: component.projectedCost,
        commodityType: component.commodityType,
        opportunity: component.costOpportunity,
        marketDynamics: {
          title: "Market Dynamics Analysis",
          trends: [
            "Aluminum commodity prices declining 8% over past quarter",
            "Global oversupply due to reduced automotive manufacturing demand",
            "LME aluminum futures showing bearish trend through H1 2025",
            "China production capacity increase creating competitive pressure"
          ],
          forecast: "Aluminum costs expected to decrease additional 5-8% over next 3 months"
        },
        demandAnalysis: {
          title: "Cross-Program Demand Forecast",
          programs: [
            { name: "Fire SMP Horizon", demand: "95K units", timeline: "Ongoing" },
            { name: "Echo Show 10", demand: "45K units", timeline: "Q2 2025" },
            { name: "Echo Studio", demand: "30K units", timeline: "Q3 2025" }
          ]
        },
        recommendation: {
          title: "Recommended Action",
          action: "Negotiate Cost Reduction",
          reasoning: [
            "Current supplier pricing doesn't reflect 8% commodity decline",
            "Leverage multi-program volume (170K units) for better rates",
            "Market conditions favor buyer - multiple alternative suppliers available",
            "Target 10-12% cost reduction to align with market dynamics"
          ],
          impact: "Save $88K-$106K annually",
          timeline: "3-4 weeks negotiation",
          recommendedCost: "$4.58-$4.68/unit (vs current $5.20)"
        }
      }
    } else {
      costAnalysisData = {
        component: component.componentName,
        mpn: component.mpn,
        supplier: component.supplier,
        currentCost: component.projectedCost,
        commodityType: component.commodityType || "Electronics",
        opportunity: component.costOpportunity || "stable",
        marketDynamics: {
          title: "Market Dynamics Analysis",
          trends: [
            "Commodity prices stable over past quarter with ±2% variance",
            "Supply and demand in equilibrium for this component category",
            "No significant market disruptions anticipated in near term"
          ],
          forecast: "Prices expected to remain stable through Q2 2025"
        },
        demandAnalysis: {
          title: "Cross-Program Demand Forecast",
          programs: [
            { name: "Fire SMP Horizon", demand: "Current program demand", timeline: "Ongoing" }
          ]
        },
        recommendation: {
          title: "Recommended Action",
          action: "Monitor Market Conditions",
          reasoning: [
            "Current pricing is competitive based on market benchmarks",
            "No immediate action required - continue standard procurement process"
          ],
          impact: "Maintain current cost structure",
          timeline: "Continuous monitoring"
        }
      }
    }

    window.dispatchEvent(
      new CustomEvent("openAssistantWithMessage", {
        detail: {
          message: `Analyzing cost opportunity for ${component.componentName}...`,
          type: "cost-analysis",
          costAnalysis: costAnalysisData,
        },
      })
    )
  }

  const handleExplainLeadTime = (e: React.MouseEvent, component: ComponentCost) => {
    e.stopPropagation()
    
    const leadTimeAnalysis = {
      component: component.componentName,
      mpn: component.mpn,
      supplier: component.supplier,
      currentLeadTime: component.leadTime,
      statedLeadTime: component.statedLeadTime,
      trend: component.leadTimeTrend,
      analysis: {
        title: "Lead Time Analysis",
        factors: component.leadTimeTrend === "increasing" 
          ? [
              "Supplier production capacity constraints due to increased demand",
              "Raw material procurement delays in global supply chain",
              "Extended quality inspection times for recent batches",
              "Logistics bottlenecks in shipping routes from Asia"
            ]
          : component.leadTimeTrend === "decreasing"
          ? [
              "Supplier improved manufacturing efficiency with new equipment",
              "Pre-positioned inventory reduces order-to-ship time",
              "Streamlined logistics partnerships reduce transit time",
              "Reduced quality inspection time due to improved yields"
            ]
          : [
              "Lead time remains consistent with stated commitments",
              "Supplier maintaining stable production capacity",
              "No significant supply chain disruptions detected"
            ],
        recommendation: component.leadTimeTrend === "increasing"
          ? "Consider placing orders earlier to account for extended lead times. Monitor for potential supply risk."
          : component.leadTimeTrend === "decreasing"
          ? "Favorable lead time trend allows for more flexible ordering schedule."
          : "Current lead time performance is stable. Continue standard procurement process."
      }
    }

    window.dispatchEvent(
      new CustomEvent("openAssistantWithMessage", {
        detail: {
          message: `Analyzing lead time trends for ${component.componentName}...`,
          type: "lead-time-explanation",
          leadTimeData: leadTimeAnalysis,
        },
      })
    )
  }

  const getLeadTimeTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <Minus className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Component Cost</h1>
        <p className="text-muted-foreground">Track and manage component costs and pricing</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by component, MPN, or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component ID</TableHead>
              <TableHead>Component Name</TableHead>
              <TableHead>MPN</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Should Cost</TableHead>
              <TableHead className="text-right">Actual Cost</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead className="text-right">MOQ</TableHead>
              <TableHead>Lead Time</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComponents.map((comp) => (
              <TableRow 
                key={comp.id} 
                className="cursor-pointer hover:bg-muted/50 relative" 
                onClick={() => handleRowClick(comp)}
                onMouseEnter={() => setHoveredRow(comp.id)} 
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="font-medium">{comp.id}</TableCell>
                <TableCell>{comp.componentName}</TableCell>
                <TableCell className="font-mono text-sm">{comp.mpn}</TableCell>
                <TableCell>{comp.supplier}</TableCell>
                <TableCell 
                  className="text-right"
                  onMouseEnter={() => setHoveredCostCell(comp.id)}
                  onMouseLeave={() => setHoveredCostCell(null)}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-semibold">${comp.projectedCost.toFixed(2)}</span>
                    {hoveredCostCell === comp.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => handleExplainShouldCost(e, comp)}
                      >
                        <Sparkles className="h-4 w-4 text-primary" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">${comp.actualCost.toFixed(2)}</TableCell>
                <TableCell>
                  {getOpportunityBadge(comp.costOpportunity) && (
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getOpportunityBadge(comp.costOpportunity)!.variant}
                        className={`text-xs ${getOpportunityBadge(comp.costOpportunity)!.className}`}
                      >
                        {getOpportunityBadge(comp.costOpportunity)!.label}
                      </Badge>
                      {comp.costOpportunity !== "stable" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => handleExplainCost(e, comp)}
                        >
                          <Sparkles className="h-4 w-4 text-primary" />
                        </Button>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">{comp.moq.toLocaleString()}</TableCell>
                <TableCell
                  onMouseEnter={() => setHoveredLeadTime(comp.id)}
                  onMouseLeave={() => setHoveredLeadTime(null)}
                >
                  <div className="flex items-center gap-2">
                    {getLeadTimeTrendIcon(comp.leadTimeTrend)}
                    <span>{comp.leadTime}</span>
                    {hoveredLeadTime === comp.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => handleExplainLeadTime(e, comp)}
                      >
                        <Sparkles className="h-4 w-4 text-primary" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <Badge variant="secondary">{comp.category}</Badge>
                  {hoveredRow === comp.id && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => handleEditClick(e, comp)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="!max-w-[95vw] w-[95vw] h-[95vh] !max-h-[95vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Cost History - {selectedComponent?.componentName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 space-y-4 overflow-hidden flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Current Should Cost</Label>
                <p className="text-2xl font-bold">${selectedComponent?.projectedCost.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Current Actual Cost</Label>
                <p className="text-2xl font-bold">${selectedComponent?.actualCost.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex-1 rounded-lg border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Milestone</TableHead>
                    <TableHead className="text-right">Previous Cost</TableHead>
                    <TableHead className="text-right">New Cost</TableHead>
                    <TableHead>Change Reason</TableHead>
                    <TableHead>Changed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedComponent?.costHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.milestone}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.previousCost > 0 ? `$${entry.previousCost.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">${entry.newCost.toFixed(2)}</TableCell>
                      <TableCell>{entry.changeReason}</TableCell>
                      <TableCell>{entry.changedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Cost - {selectedComponent?.componentName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectedCost">Should Cost</Label>
              <Input
                id="projectedCost"
                type="number"
                step="0.01"
                value={editedProjectedCost}
                onChange={(e) => setEditedProjectedCost(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="actualCost">Actual Cost</Label>
              <Input
                id="actualCost"
                type="number"
                step="0.01"
                value={editedActualCost}
                onChange={(e) => setEditedActualCost(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
