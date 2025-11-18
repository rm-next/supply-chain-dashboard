"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, History, Pencil, Sparkles } from 'lucide-react'

interface ToolingCost {
  id: string
  toolName: string
  type: string
  supplier: string
  site: string
  projectedCost: number
  actualCost: number
  amortizationPeriod: string
  programsUsing: string[]
  status: "active" | "deprecated" | "planned"
  costHistory: CostHistoryEntry[]
}

interface CostHistoryEntry {
  date: string
  milestone: string
  previousCost: number
  newCost: number
  changeReason: string
  changedBy: string
}

const toolingCosts: ToolingCost[] = [
  {
    id: "TOOL-001",
    toolName: "Injection Mold - Housing",
    type: "Plastic Injection",
    supplier: "Foxconn",
    site: "Shenzhen, China",
    projectedCost: 45000,
    actualCost: 47500,
    amortizationPeriod: "24 months",
    programsUsing: ["Smart Speaker Gen 3", "Echo Dot"],
    status: "active",
    costHistory: [
      {
        date: "2023-03-15",
        milestone: "Design",
        previousCost: 0,
        newCost: 50000,
        changeReason: "Initial quote",
        changedBy: "John Smith",
      },
      {
        date: "2023-05-20",
        milestone: "Prototype",
        previousCost: 50000,
        newCost: 48000,
        changeReason: "Design simplification",
        changedBy: "Sarah Lee",
      },
      {
        date: "2023-07-10",
        milestone: "Production",
        previousCost: 48000,
        newCost: 47500,
        changeReason: "Final negotiation",
        changedBy: "Mike Chen",
      },
    ],
  },
  {
    id: "TOOL-002",
    toolName: "Die Cast - Aluminum Frame",
    type: "Die Casting",
    supplier: "Flex",
    site: "Guadalajara, Mexico",
    projectedCost: 78000,
    actualCost: 78000,
    amortizationPeriod: "36 months",
    programsUsing: ["Kindle Paperwhite", "Kindle Oasis"],
    status: "active",
    costHistory: [
      {
        date: "2023-02-10",
        milestone: "Design",
        previousCost: 0,
        newCost: 85000,
        changeReason: "Initial quote",
        changedBy: "Emily Wang",
      },
      {
        date: "2023-04-15",
        milestone: "Prototype",
        previousCost: 85000,
        newCost: 80000,
        changeReason: "Tooling optimization",
        changedBy: "David Park",
      },
      {
        date: "2023-06-20",
        milestone: "Production",
        previousCost: 80000,
        newCost: 78000,
        changeReason: "Volume commitment discount",
        changedBy: "Emily Wang",
      },
    ],
  },
  {
    id: "TOOL-003",
    toolName: "PCB Test Fixture",
    type: "Testing Equipment",
    supplier: "Jabil",
    site: "Penang, Malaysia",
    projectedCost: 12000,
    actualCost: 13200,
    amortizationPeriod: "18 months",
    programsUsing: ["Fire TV Stick 4K Max"],
    status: "active",
    costHistory: [
      {
        date: "2023-05-01",
        milestone: "Design",
        previousCost: 0,
        newCost: 12000,
        changeReason: "Initial quote",
        changedBy: "Lisa Brown",
      },
      {
        date: "2023-07-15",
        milestone: "Production",
        previousCost: 12000,
        newCost: 13200,
        changeReason: "Additional test points required",
        changedBy: "Tom Wilson",
      },
    ],
  },
  {
    id: "TOOL-004",
    toolName: "Assembly Jig - Display",
    type: "Assembly Tooling",
    supplier: "Pegatron",
    site: "Shanghai, China",
    projectedCost: 8500,
    actualCost: 8200,
    amortizationPeriod: "12 months",
    programsUsing: ["Echo Show 10", "Echo Show 8"],
    status: "active",
    costHistory: [
      {
        date: "2023-06-10",
        milestone: "Design",
        previousCost: 0,
        newCost: 9000,
        changeReason: "Initial quote",
        changedBy: "Alex Kim",
      },
      {
        date: "2023-08-05",
        milestone: "Prototype",
        previousCost: 9000,
        newCost: 8500,
        changeReason: "Simplified design",
        changedBy: "Rachel Green",
      },
      {
        date: "2023-09-20",
        milestone: "Production",
        previousCost: 8500,
        newCost: 8200,
        changeReason: "Local supplier found",
        changedBy: "Alex Kim",
      },
    ],
  },
  {
    id: "TOOL-005",
    toolName: "Stamping Die - Metal Parts",
    type: "Metal Stamping",
    supplier: "Compal",
    site: "Kunshan, China",
    projectedCost: 32000,
    actualCost: 32000,
    amortizationPeriod: "24 months",
    programsUsing: ["Ring Doorbell Pro 2"],
    status: "planned",
    costHistory: [
      {
        date: "2024-01-05",
        milestone: "Design",
        previousCost: 0,
        newCost: 35000,
        changeReason: "Initial quote",
        changedBy: "Chris Taylor",
      },
      {
        date: "2024-01-20",
        milestone: "Negotiation",
        previousCost: 35000,
        newCost: 32000,
        changeReason: "Multi-tool discount",
        changedBy: "Nina Patel",
      },
    ],
  },
  {
    id: "TOOL-006",
    toolName: "Legacy Housing Mold",
    type: "Plastic Injection",
    supplier: "Foxconn",
    site: "Chennai, India",
    projectedCost: 38000,
    actualCost: 38000,
    amortizationPeriod: "24 months",
    programsUsing: ["Echo Gen 2"],
    status: "deprecated",
    costHistory: [
      {
        date: "2022-01-15",
        milestone: "Design",
        previousCost: 0,
        newCost: 40000,
        changeReason: "Initial quote",
        changedBy: "Mark Johnson",
      },
      {
        date: "2022-03-20",
        milestone: "Production",
        previousCost: 40000,
        newCost: 38000,
        changeReason: "Final negotiation",
        changedBy: "Anna Lee",
      },
    ],
  },
]

export default function ToolingCostPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTool, setSelectedTool] = useState<ToolingCost | null>(null)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editedProjectedCost, setEditedProjectedCost] = useState("")
  const [editedActualCost, setEditedActualCost] = useState("")
  const [hoveredCostCell, setHoveredCostCell] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const filteredTooling = toolingCosts.filter(
    (tool) =>
      tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "deprecated":
        return "bg-red-100 text-red-800"
      case "planned":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRowClick = (tool: ToolingCost) => {
    setSelectedTool(tool)
    setShowHistoryDialog(true)
  }

  const handleEditClick = (e: React.MouseEvent, tool: ToolingCost) => {
    e.stopPropagation()
    setSelectedTool(tool)
    setEditedProjectedCost(tool.projectedCost.toString())
    setEditedActualCost(tool.actualCost.toString())
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    console.log("[v0] Saving cost update:", {
      toolId: selectedTool?.id,
      projectedCost: editedProjectedCost,
      actualCost: editedActualCost,
    })
    setShowEditDialog(false)
  }

  const handleShouldCostExplain = (e: React.MouseEvent, tool: ToolingCost) => {
    e.stopPropagation()
    
    const shouldCostAnalysis = {
      toolName: tool.toolName,
      toolId: tool.id,
      toolType: tool.type,
      supplier: tool.supplier,
      site: tool.site,
      shouldCost: tool.projectedCost,
      actualCost: tool.actualCost,
      calculation: {
        title: "Tooling Should Cost Analysis",
        methodology: "Based on historical tooling costs, supplier benchmarks, and complexity factors",
        factors: [
          {
            name: "Tool Complexity & Type",
            value: `${tool.type} - ${tool.toolName}`,
            weight: "35%",
            impact: `Similar ${tool.type.toLowerCase()} tools range from $${(tool.projectedCost * 0.85).toLocaleString()} to $${(tool.projectedCost * 1.15).toLocaleString()}`
          },
          {
            name: "Supplier Historical Performance",
            value: `${tool.supplier} - ${tool.site}`,
            weight: "30%",
            impact: tool.costHistory.length > 0 
              ? `Historical average: $${(tool.costHistory.reduce((acc, h) => acc + h.newCost, 0) / tool.costHistory.length).toLocaleString()}`
              : "First-time supplier engagement"
          },
          {
            name: "Market Benchmarks",
            value: "Industry standard pricing for similar tooling",
            weight: "25%",
            impact: `Market benchmark range: $${(tool.projectedCost * 0.90).toLocaleString()}-$${(tool.projectedCost * 1.10).toLocaleString()}`
          },
          {
            name: "Amortization Impact",
            value: `${tool.amortizationPeriod} across ${tool.programsUsing.length} programs`,
            weight: "10%",
            impact: `Per-unit impact optimized across ${tool.programsUsing.join(", ")}`
          }
        ],
        comparableTooling: [
          { 
            type: tool.type, 
            supplier: "Benchmark Supplier A", 
            cost: (tool.projectedCost * 0.93).toFixed(0),
            site: "Similar region"
          },
          { 
            type: tool.type, 
            supplier: "Benchmark Supplier B", 
            cost: (tool.projectedCost * 1.05).toFixed(0),
            site: "Alternative location"
          },
          { 
            type: tool.type, 
            supplier: "Benchmark Supplier C", 
            cost: (tool.projectedCost * 0.98).toFixed(0),
            site: "Domestic option"
          }
        ]
      },
      conclusion: `The should cost of $${tool.projectedCost.toLocaleString()} represents a competitive investment for this ${tool.type.toLowerCase()} tool based on weighted analysis of tool complexity (35%), supplier performance (30%), market benchmarks (25%), and amortization optimization (10%). The pricing aligns with industry standards and historical data.`
    }

    window.dispatchEvent(
      new CustomEvent("openAssistantWithMessage", {
        detail: {
          message: `Analyzing tooling should cost for ${tool.toolName}...`,
          type: "tooling-cost-explanation",
          toolingCostData: shouldCostAnalysis,
        },
      })
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tooling Cost</h1>
        <p className="text-muted-foreground">Manage tooling investments and amortization</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by tool name or type..."
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
              <TableHead>Tool ID</TableHead>
              <TableHead>Tool Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Supplier & Site</TableHead>
              <TableHead className="text-right">Should Cost</TableHead>
              <TableHead className="text-right">Actual Cost</TableHead>
              <TableHead>Amortization</TableHead>
              <TableHead>Programs Using</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTooling.map((tool) => (
              <TableRow 
                key={tool.id} 
                className="cursor-pointer hover:bg-muted/50 relative" 
                onClick={() => handleRowClick(tool)}
                onMouseEnter={() => setHoveredRow(tool.id)} 
                onMouseLeave={() => setHoveredRow(null)}
              >
                <TableCell className="font-medium">{tool.id}</TableCell>
                <TableCell>{tool.toolName}</TableCell>
                <TableCell>{tool.type}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{tool.supplier}</span>
                    <span className="text-xs text-muted-foreground">{tool.site}</span>
                  </div>
                </TableCell>
                <TableCell 
                  className="text-right"
                  onMouseEnter={() => setHoveredCostCell(tool.id)}
                  onMouseLeave={() => setHoveredCostCell(null)}
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-semibold">${tool.projectedCost.toLocaleString()}</span>
                    {hoveredCostCell === tool.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => handleShouldCostExplain(e, tool)}
                      >
                        <Sparkles className="h-4 w-4 text-primary" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">${tool.actualCost.toLocaleString()}</TableCell>
                <TableCell>{tool.amortizationPeriod}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {tool.programsUsing.map((program) => (
                      <Badge key={program} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <Badge variant="secondary" className={getStatusColor(tool.status)}>
                    {tool.status}
                  </Badge>
                  {hoveredRow === tool.id && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => handleEditClick(e, tool)}
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
              Cost History - {selectedTool?.toolName}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 space-y-4 overflow-hidden flex flex-col">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Supplier & Site</Label>
                <p className="text-lg font-semibold">{selectedTool?.supplier}</p>
                <p className="text-sm text-muted-foreground">{selectedTool?.site}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Current Should Cost</Label>
                <p className="text-2xl font-bold">${selectedTool?.projectedCost.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Current Actual Cost</Label>
                <p className="text-2xl font-bold">${selectedTool?.actualCost.toLocaleString()}</p>
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
                  {selectedTool?.costHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.milestone}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.previousCost > 0 ? `$${entry.previousCost.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">${entry.newCost.toLocaleString()}</TableCell>
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
            <DialogTitle>Edit Cost - {selectedTool?.toolName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectedCost">Should Cost</Label>
              <Input
                id="projectedCost"
                type="number"
                step="1"
                value={editedProjectedCost}
                onChange={(e) => setEditedProjectedCost(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="actualCost">Actual Cost</Label>
              <Input
                id="actualCost"
                type="number"
                step="1"
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
