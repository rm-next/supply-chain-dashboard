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

interface BOMCost {
  id: string
  program: string
  product: string
  projectedCost: number
  actualCost: number
  componentCount: number
  lastUpdated: string
  status: "current" | "outdated" | "pending"
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

const bomCosts: BOMCost[] = [
  {
    id: "BOM-001",
    program: "Smart Speaker Gen 3",
    product: "Echo Dot",
    projectedCost: 24.5,
    actualCost: 26.2,
    componentCount: 87,
    lastUpdated: "2024-01-15",
    status: "current",
    costHistory: [
      {
        date: "2023-06-15",
        milestone: "EVT",
        previousCost: 0,
        newCost: 28.5,
        changeReason: "Initial estimate",
        changedBy: "John Smith",
      },
      {
        date: "2023-09-20",
        milestone: "DVT",
        previousCost: 28.5,
        newCost: 26.8,
        changeReason: "Component cost reduction",
        changedBy: "Sarah Lee",
      },
      {
        date: "2023-12-10",
        milestone: "PVT",
        previousCost: 26.8,
        newCost: 25.2,
        changeReason: "Volume pricing negotiated",
        changedBy: "Mike Chen",
      },
      {
        date: "2024-01-15",
        milestone: "Production",
        previousCost: 25.2,
        newCost: 26.2,
        changeReason: "Material cost increase",
        changedBy: "Sarah Lee",
      },
    ],
  },
  {
    id: "BOM-002",
    program: "E-Reader Refresh",
    product: "Kindle Paperwhite",
    projectedCost: 45.8,
    actualCost: 44.5,
    componentCount: 124,
    lastUpdated: "2024-01-10",
    status: "current",
    costHistory: [
      {
        date: "2023-05-10",
        milestone: "EVT",
        previousCost: 0,
        newCost: 52.0,
        changeReason: "Initial estimate",
        changedBy: "Emily Wang",
      },
      {
        date: "2023-08-15",
        milestone: "DVT",
        previousCost: 52.0,
        newCost: 48.5,
        changeReason: "Display supplier change",
        changedBy: "David Park",
      },
      {
        date: "2023-11-20",
        milestone: "PVT",
        previousCost: 48.5,
        newCost: 45.8,
        changeReason: "PCB optimization",
        changedBy: "Emily Wang",
      },
      {
        date: "2024-01-10",
        milestone: "Production",
        previousCost: 45.8,
        newCost: 44.5,
        changeReason: "Better volume pricing",
        changedBy: "David Park",
      },
    ],
  },
  {
    id: "BOM-003",
    program: "Fitness Tracker Pro",
    product: "Halo Band 2",
    projectedCost: 18.3,
    actualCost: 19.8,
    componentCount: 65,
    lastUpdated: "2023-12-20",
    status: "outdated",
    costHistory: [
      {
        date: "2023-04-05",
        milestone: "EVT",
        previousCost: 0,
        newCost: 22.0,
        changeReason: "Initial estimate",
        changedBy: "Lisa Brown",
      },
      {
        date: "2023-07-12",
        milestone: "DVT",
        previousCost: 22.0,
        newCost: 19.5,
        changeReason: "Sensor cost reduction",
        changedBy: "Tom Wilson",
      },
      {
        date: "2023-10-18",
        milestone: "PVT",
        previousCost: 19.5,
        newCost: 18.3,
        changeReason: "Battery supplier change",
        changedBy: "Lisa Brown",
      },
      {
        date: "2023-12-20",
        milestone: "Production",
        previousCost: 18.3,
        newCost: 19.8,
        changeReason: "Component shortage impact",
        changedBy: "Tom Wilson",
      },
    ],
  },
  {
    id: "BOM-004",
    program: "Smart Display 2024",
    product: "Echo Show 10",
    projectedCost: 78.9,
    actualCost: 78.9,
    componentCount: 156,
    lastUpdated: "2024-01-18",
    status: "current",
    costHistory: [
      {
        date: "2023-07-20",
        milestone: "EVT",
        previousCost: 0,
        newCost: 85.0,
        changeReason: "Initial estimate",
        changedBy: "Alex Kim",
      },
      {
        date: "2023-10-25",
        milestone: "DVT",
        previousCost: 85.0,
        newCost: 82.5,
        changeReason: "Motor assembly optimization",
        changedBy: "Rachel Green",
      },
      {
        date: "2024-01-18",
        milestone: "PVT",
        previousCost: 82.5,
        newCost: 78.9,
        changeReason: "Display panel cost reduction",
        changedBy: "Alex Kim",
      },
    ],
  },
  {
    id: "BOM-005",
    program: "Streaming Stick 4K",
    product: "Fire TV Stick 4K Max",
    projectedCost: 15.2,
    actualCost: 15.2,
    componentCount: 42,
    lastUpdated: "2024-01-12",
    status: "pending",
    costHistory: [
      {
        date: "2023-08-10",
        milestone: "EVT",
        previousCost: 0,
        newCost: 17.5,
        changeReason: "Initial estimate",
        changedBy: "Chris Taylor",
      },
      {
        date: "2023-11-15",
        milestone: "DVT",
        previousCost: 17.5,
        newCost: 16.0,
        changeReason: "SoC cost negotiation",
        changedBy: "Nina Patel",
      },
      {
        date: "2024-01-12",
        milestone: "PVT",
        previousCost: 16.0,
        newCost: 15.2,
        changeReason: "Memory cost reduction",
        changedBy: "Chris Taylor",
      },
    ],
  },
]

export default function BOMCostPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBOM, setSelectedBOM] = useState<BOMCost | null>(null)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editedProjectedCost, setEditedProjectedCost] = useState("")
  const [editedActualCost, setEditedActualCost] = useState("")

  const filteredBOMs = bomCosts.filter(
    (bom) =>
      bom.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bom.product.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800"
      case "outdated":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRowClick = (bom: BOMCost) => {
    setSelectedBOM(bom)
    setShowHistoryDialog(true)
  }

  const handleEditClick = (e: React.MouseEvent, bom: BOMCost) => {
    e.stopPropagation()
    setSelectedBOM(bom)
    setEditedProjectedCost(bom.projectedCost.toString())
    setEditedActualCost(bom.actualCost.toString())
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    console.log("[v0] Saving cost update:", {
      bomId: selectedBOM?.id,
      projectedCost: editedProjectedCost,
      actualCost: editedActualCost,
    })
    setShowEditDialog(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">BOM Cost</h1>
        <p className="text-muted-foreground">Manage and analyze bill of materials costs across programs</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by program or product..."
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
              <TableHead>BOM ID</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Projected Cost</TableHead>
              <TableHead className="text-right">Actual Cost</TableHead>
              <TableHead className="text-right">Components</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBOMs.map((bom) => (
              <TableRow key={bom.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleRowClick(bom)}>
                <TableCell className="font-medium">{bom.id}</TableCell>
                <TableCell>{bom.program}</TableCell>
                <TableCell>{bom.product}</TableCell>
                <TableCell className="text-right font-semibold">${bom.projectedCost.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">${bom.actualCost.toFixed(2)}</TableCell>
                <TableCell className="text-right">{bom.componentCount}</TableCell>
                <TableCell>{new Date(bom.lastUpdated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(bom.status)}>
                    {bom.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={(e) => handleEditClick(e, bom)}>
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
              Cost History - {selectedBOM?.product}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 space-y-4 overflow-hidden flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Current Projected Cost</Label>
                <p className="text-2xl font-bold">${selectedBOM?.projectedCost.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Current Actual Cost</Label>
                <p className="text-2xl font-bold">${selectedBOM?.actualCost.toFixed(2)}</p>
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
                  {selectedBOM?.costHistory.map((entry, index) => (
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
            <DialogTitle>Edit Cost - {selectedBOM?.product}</DialogTitle>
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
