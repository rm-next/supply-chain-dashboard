"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Download, History, Pencil } from "lucide-react"

interface Quote {
  id: string
  supplier: string
  component: string
  quantity: number
  projectedUnitPrice: number
  actualUnitPrice: number
  projectedTotalPrice: number
  actualTotalPrice: number
  validUntil: string
  status: "pending" | "approved" | "rejected" | "expired"
  quotedDate: string
  priceHistory: PriceHistoryEntry[]
}

interface PriceHistoryEntry {
  date: string
  milestone: string
  previousPrice: number
  newPrice: number
  changeReason: string
  changedBy: string
}

const quotes: Quote[] = [
  {
    id: "QT-2024-001",
    supplier: "Foxconn",
    component: "Main PCB Assembly",
    quantity: 10000,
    projectedUnitPrice: 12.5,
    actualUnitPrice: 12.8,
    projectedTotalPrice: 125000,
    actualTotalPrice: 128000,
    validUntil: "2024-03-15",
    status: "pending",
    quotedDate: "2024-01-15",
    priceHistory: [
      {
        date: "2023-12-01",
        milestone: "RFQ",
        previousPrice: 0,
        newPrice: 13.5,
        changeReason: "Initial quote",
        changedBy: "Supplier",
      },
      {
        date: "2024-01-10",
        milestone: "Negotiation",
        previousPrice: 13.5,
        newPrice: 12.5,
        changeReason: "Volume discount",
        changedBy: "John Smith",
      },
      {
        date: "2024-01-20",
        milestone: "Final",
        previousPrice: 12.5,
        newPrice: 12.8,
        changeReason: "Component cost increase",
        changedBy: "Supplier",
      },
    ],
  },
  {
    id: "QT-2024-002",
    supplier: "Delta Electronics",
    component: "Power Supply Unit",
    quantity: 5000,
    projectedUnitPrice: 3.8,
    actualUnitPrice: 3.8,
    projectedTotalPrice: 19000,
    actualTotalPrice: 19000,
    validUntil: "2024-02-28",
    status: "approved",
    quotedDate: "2024-01-10",
    priceHistory: [
      {
        date: "2023-11-15",
        milestone: "RFQ",
        previousPrice: 0,
        newPrice: 4.2,
        changeReason: "Initial quote",
        changedBy: "Supplier",
      },
      {
        date: "2023-12-20",
        milestone: "Negotiation",
        previousPrice: 4.2,
        newPrice: 3.9,
        changeReason: "Competitive bid",
        changedBy: "Sarah Lee",
      },
      {
        date: "2024-01-05",
        milestone: "Final",
        previousPrice: 3.9,
        newPrice: 3.8,
        changeReason: "Long-term commitment",
        changedBy: "Sarah Lee",
      },
    ],
  },
  {
    id: "QT-2024-003",
    supplier: "Samsung SDI",
    component: "Li-Ion Battery Pack",
    quantity: 15000,
    projectedUnitPrice: 4.2,
    actualUnitPrice: 4.5,
    projectedTotalPrice: 63000,
    actualTotalPrice: 67500,
    validUntil: "2024-04-01",
    status: "pending",
    quotedDate: "2024-01-18",
    priceHistory: [
      {
        date: "2023-12-10",
        milestone: "RFQ",
        previousPrice: 0,
        newPrice: 4.8,
        changeReason: "Initial quote",
        changedBy: "Supplier",
      },
      {
        date: "2024-01-08",
        milestone: "Negotiation",
        previousPrice: 4.8,
        newPrice: 4.2,
        changeReason: "Volume pricing",
        changedBy: "Mike Chen",
      },
      {
        date: "2024-01-22",
        milestone: "Revision",
        previousPrice: 4.2,
        newPrice: 4.5,
        changeReason: "Raw material surcharge",
        changedBy: "Supplier",
      },
    ],
  },
  {
    id: "QT-2024-004",
    supplier: "Lite-On",
    component: "LED Indicator Module",
    quantity: 20000,
    projectedUnitPrice: 0.85,
    actualUnitPrice: 0.85,
    projectedTotalPrice: 17000,
    actualTotalPrice: 17000,
    validUntil: "2024-01-20",
    status: "expired",
    quotedDate: "2023-12-20",
    priceHistory: [
      {
        date: "2023-11-25",
        milestone: "RFQ",
        previousPrice: 0,
        newPrice: 0.95,
        changeReason: "Initial quote",
        changedBy: "Supplier",
      },
      {
        date: "2023-12-15",
        milestone: "Final",
        previousPrice: 0.95,
        newPrice: 0.85,
        changeReason: "High volume discount",
        changedBy: "Emily Wang",
      },
    ],
  },
  {
    id: "QT-2024-005",
    supplier: "Flex",
    component: "Plastic Housing",
    quantity: 8000,
    projectedUnitPrice: 2.3,
    actualUnitPrice: 2.2,
    projectedTotalPrice: 18400,
    actualTotalPrice: 17600,
    validUntil: "2024-03-10",
    status: "approved",
    quotedDate: "2024-01-12",
    priceHistory: [
      {
        date: "2023-12-05",
        milestone: "RFQ",
        previousPrice: 0,
        newPrice: 2.6,
        changeReason: "Initial quote",
        changedBy: "Supplier",
      },
      {
        date: "2024-01-05",
        milestone: "Negotiation",
        previousPrice: 2.6,
        newPrice: 2.3,
        changeReason: "Tooling amortization",
        changedBy: "David Park",
      },
      {
        date: "2024-01-15",
        milestone: "Final",
        previousPrice: 2.3,
        newPrice: 2.2,
        changeReason: "Process efficiency",
        changedBy: "Supplier",
      },
    ],
  },
  {
    id: "QT-2024-006",
    supplier: "Jabil",
    component: "Display Assembly",
    quantity: 6000,
    projectedUnitPrice: 15.75,
    actualUnitPrice: 15.75,
    projectedTotalPrice: 94500,
    actualTotalPrice: 94500,
    validUntil: "2024-02-15",
    status: "rejected",
    quotedDate: "2024-01-08",
    priceHistory: [
      {
        date: "2023-12-15",
        milestone: "RFQ",
        previousPrice: 0,
        newPrice: 17.0,
        changeReason: "Initial quote",
        changedBy: "Supplier",
      },
      {
        date: "2024-01-05",
        milestone: "Final",
        previousPrice: 17.0,
        newPrice: 15.75,
        changeReason: "Best and final offer",
        changedBy: "Supplier",
      },
    ],
  },
]

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [showHistoryDialog, setShowHistoryDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editedProjectedPrice, setEditedProjectedPrice] = useState("")
  const [editedActualPrice, setEditedActualPrice] = useState("")

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRowClick = (quote: Quote) => {
    setSelectedQuote(quote)
    setShowHistoryDialog(true)
  }

  const handleEditClick = (e: React.MouseEvent, quote: Quote) => {
    e.stopPropagation()
    setSelectedQuote(quote)
    setEditedProjectedPrice(quote.projectedUnitPrice.toString())
    setEditedActualPrice(quote.actualUnitPrice.toString())
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    console.log("[v0] Saving price update:", {
      quoteId: selectedQuote?.id,
      projectedPrice: editedProjectedPrice,
      actualPrice: editedActualPrice,
    })
    setShowEditDialog(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
        <p className="text-muted-foreground">Review and manage supplier quotes and pricing proposals</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by quote ID, supplier, or component..."
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
              <TableHead>Quote ID</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Component</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Projected Unit Price</TableHead>
              <TableHead className="text-right">Actual Unit Price</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
              <TableHead>Quoted Date</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.map((quote) => (
              <TableRow
                key={quote.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(quote)}
              >
                <TableCell className="font-medium">{quote.id}</TableCell>
                <TableCell>{quote.supplier}</TableCell>
                <TableCell>{quote.component}</TableCell>
                <TableCell className="text-right">{quote.quantity.toLocaleString()}</TableCell>
                <TableCell className="text-right font-semibold">${quote.projectedUnitPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">${quote.actualUnitPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">${quote.actualTotalPrice.toLocaleString()}</TableCell>
                <TableCell>{new Date(quote.quotedDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(quote.validUntil).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(quote.status)}>
                    {quote.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={(e) => handleEditClick(e, quote)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
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
              Price History - {selectedQuote?.component}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 space-y-4 overflow-hidden flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Current Projected Unit Price</Label>
                <p className="text-2xl font-bold">${selectedQuote?.projectedUnitPrice.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Current Actual Unit Price</Label>
                <p className="text-2xl font-bold">${selectedQuote?.actualUnitPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex-1 rounded-lg border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Milestone</TableHead>
                    <TableHead className="text-right">Previous Price</TableHead>
                    <TableHead className="text-right">New Price</TableHead>
                    <TableHead>Change Reason</TableHead>
                    <TableHead>Changed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedQuote?.priceHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.milestone}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.previousPrice > 0 ? `$${entry.previousPrice.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">${entry.newPrice.toFixed(2)}</TableCell>
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
            <DialogTitle>Edit Price - {selectedQuote?.component}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectedPrice">Projected Unit Price</Label>
              <Input
                id="projectedPrice"
                type="number"
                step="0.01"
                value={editedProjectedPrice}
                onChange={(e) => setEditedProjectedPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="actualPrice">Actual Unit Price</Label>
              <Input
                id="actualPrice"
                type="number"
                step="0.01"
                value={editedActualPrice}
                onChange={(e) => setEditedActualPrice(e.target.value)}
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
