"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, History, Pencil } from "lucide-react"

interface ComponentCost {
  id: string
  componentName: string
  mpn: string
  supplier: string
  projectedCost: number
  actualCost: number
  moq: number
  leadTime: string
  category: string
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
    category: "Electronics",
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
    category: "Display",
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
    category: "Power",
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
    category: "Wireless",
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
    category: "Connectors",
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
    category: "Mechanical",
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
]

export default function ComponentCostPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComponent, setSelectedComponent] = useState<ComponentCost | null>(null)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editedProjectedCost, setEditedProjectedCost] = useState("")
  const [editedActualCost, setEditedActualCost] = useState("")

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
              <TableHead className="text-right">Projected Cost</TableHead>
              <TableHead className="text-right">Actual Cost</TableHead>
              <TableHead className="text-right">MOQ</TableHead>
              <TableHead>Lead Time</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComponents.map((comp) => (
              <TableRow key={comp.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleRowClick(comp)}>
                <TableCell className="font-medium">{comp.id}</TableCell>
                <TableCell>{comp.componentName}</TableCell>
                <TableCell className="font-mono text-sm">{comp.mpn}</TableCell>
                <TableCell>{comp.supplier}</TableCell>
                <TableCell className="text-right font-semibold">${comp.projectedCost.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">${comp.actualCost.toFixed(2)}</TableCell>
                <TableCell className="text-right">{comp.moq.toLocaleString()}</TableCell>
                <TableCell>{comp.leadTime}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{comp.category}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={(e) => handleEditClick(e, comp)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
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
                <Label className="text-sm text-muted-foreground">Current Projected Cost</Label>
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
              <Label htmlFor="projectedCost">Projected Cost</Label>
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
