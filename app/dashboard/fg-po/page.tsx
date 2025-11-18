"use client"

import { useMemo, useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table"
import { ArrowUpDown, Search, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type ASINPO = {
  poNumber: string // Added PO number field
  asinNumber: string
  productName: string
  contractManufacturer: string
  quantity: number
  requestedDate: string
  shipDate: string
  status: "shipped" | "in-production" | "confirmed" | "delayed"
}

export default function FGPOPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const data: ASINPO[] = useMemo(
    () => [
      {
        poNumber: "PO-2025-1001", // Added PO numbers for all entries
        asinNumber: "B09X7K2M4P",
        productName: "Echo Dot (5th Gen)",
        contractManufacturer: "Foxconn",
        quantity: 50000,
        requestedDate: "2025-12-15",
        shipDate: "2025-12-20",
        status: "in-production",
      },
      {
        poNumber: "PO-2026-0110",
        asinNumber: "B0B8H3NW1Q",
        productName: "Fire TV Stick 4K Max",
        contractManufacturer: "Pegatron",
        quantity: 75000,
        requestedDate: "2026-01-10",
        shipDate: "2026-01-15",
        status: "confirmed",
      },
      {
        poNumber: "PO-2025-1128",
        asinNumber: "B0B7X5MR8F",
        productName: "Echo Show 15",
        contractManufacturer: "Foxconn",
        quantity: 30000,
        requestedDate: "2025-11-28",
        shipDate: "2025-12-05",
        status: "shipped",
      },
      {
        poNumber: "PO-2026-0201",
        asinNumber: "B09B8V1LZ3",
        productName: "Kindle Paperwhite (11th Gen)",
        contractManufacturer: "Compal",
        quantity: 100000,
        requestedDate: "2026-02-01",
        shipDate: "2026-02-08",
        status: "confirmed",
      },
      {
        poNumber: "PO-2025-1220",
        asinNumber: "B0BDKM2KW9",
        productName: "Ring Video Doorbell Pro 2",
        contractManufacturer: "Jabil",
        quantity: 40000,
        requestedDate: "2025-12-20",
        shipDate: "2025-12-18",
        status: "delayed",
      },
      {
        poNumber: "PO-2026-0105",
        asinNumber: "B0C3J8H5M2",
        productName: "Echo Hub",
        contractManufacturer: "Foxconn",
        quantity: 25000,
        requestedDate: "2026-01-05",
        shipDate: "2026-01-10",
        status: "confirmed",
      },
      {
        poNumber: "PO-2025-1125",
        asinNumber: "B09WX9V4KL",
        productName: "Fire HD 10 (13th Gen)",
        contractManufacturer: "Pegatron",
        quantity: 60000,
        requestedDate: "2025-11-25",
        shipDate: "2025-11-30",
        status: "shipped",
      },
      {
        poNumber: "PO-2026-0415",
        asinNumber: "B0CFQR5T8Y",
        productName: "Fire SMP Horizon",
        contractManufacturer: "Foxconn",
        quantity: 35000,
        requestedDate: "2026-04-15",
        shipDate: "2026-04-20",
        status: "confirmed",
      },
      {
        poNumber: "PO-2026-0801",
        asinNumber: "B08KGW42Z5",
        productName: "Echo Smart Water Bottle",
        contractManufacturer: "Foxconn",
        quantity: 45000,
        requestedDate: "2026-08-01",
        shipDate: "2026-08-05",
        status: "confirmed",
      },
      {
        poNumber: "PO-2025-1210",
        asinNumber: "B09B93ZDG4",
        productName: "Blink Outdoor Camera (4th Gen)",
        contractManufacturer: "Jabil",
        quantity: 55000,
        requestedDate: "2025-12-10",
        shipDate: "2025-12-15",
        status: "in-production",
      },
    ],
    []
  )

  const handleExplainDelay = (po: ASINPO) => {
    const delayExplanation = `**Delay Analysis for ${po.productName} (${po.asinNumber})**

I've analyzed the supply chain for this purchase order and identified the root causes of the shipment delay:

**Primary Issue:**
Component shipment delays from upstream suppliers are impacting the production schedule at ${po.contractManufacturer}.

**Detailed Breakdown:**

1. **Camera Module Shortage** - The HD camera component from Omnivision Technologies is delayed by 2 weeks due to increased demand from other programs.

2. **PCB Assembly Delay** - PCB supplier (Zhen Ding Tech) experienced quality issues requiring rework, adding 5 days to the lead time.

3. **Battery Cell Constraint** - Lithium-ion battery cells from LG Chem faced customs clearance delays at the port, adding 3 days.

4. **Production Line Reallocation** - ${po.contractManufacturer} had to temporarily reallocate production capacity to a higher priority program, resulting in a 4-day delay.

**Impact:**
- Original ship date: Dec 18, 2025
- Current estimated ship date: Dec 28, 2025 (10-day delay)
- Requested delivery date: Dec 20, 2025 (will miss by 8 days)`

    const resolutionOptions = [
      {
        id: 1,
        title: "Expedite Camera Module with Premium Freight",
        description: "Use air freight to expedite camera module shipment from Omnivision",
        impact: "Reduce delay by 5 days",
        cost: "+$2,500",
        timeline: "2-3 days"
      },
      {
        id: 2,
        title: "Weekend Production Shift",
        description: "Schedule weekend production at manufacturer to recover lost time",
        impact: "Reduce delay by 3 days",
        cost: "+$4,200 overtime",
        timeline: "Immediate"
      },
      {
        id: 3,
        title: "Air Freight Final Delivery",
        description: "Switch from sea freight to air freight for final delivery to reduce transit",
        impact: "Reduce delay by 4 days",
        cost: "+$8,500 shipping",
        timeline: "1 week"
      },
      {
        id: 4,
        title: "Accept Delay & Communicate",
        description: "Accept the delay and communicate revised timeline to stakeholders",
        impact: "8-day delay to delivery",
        cost: "$0",
        timeline: "Immediate"
      }
    ]

    localStorage.setItem("assistantCollaboration", JSON.stringify({
      message: delayExplanation,
      participants: [],
      type: "delay-explanation",
      resolutionOptions,
      poNumber: po.poNumber,
      productName: po.productName,
      asinNumber: po.asinNumber
    }))

    window.dispatchEvent(new CustomEvent("openAssistantWithCollaboration"))
  }

  const columns = useMemo<ColumnDef<ASINPO>[]>(
    () => [
      {
        accessorKey: "poNumber", // Added PO Number column
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              PO #
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium font-mono text-xs">{row.getValue("poNumber")}</div>,
      },
      {
        accessorKey: "asinNumber",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              ASIN #
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium font-mono text-xs">{row.getValue("asinNumber")}</div>,
      },
      {
        accessorKey: "productName",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Product Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("productName")}</div>,
      },
      {
        accessorKey: "contractManufacturer",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Contract Manufacturer
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("contractManufacturer")}</div>,
      },
      {
        accessorKey: "quantity",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Quantity
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const quantity = row.getValue("quantity") as number
          return <div className="font-medium">{quantity.toLocaleString()} units</div>
        },
      },
      {
        accessorKey: "requestedDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Requested Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const date = new Date(row.getValue("requestedDate"))
          return <div>{date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
        },
      },
      {
        accessorKey: "shipDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Ship Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const date = new Date(row.getValue("shipDate"))
          return <div>{date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          const variant =
            status === "shipped"
              ? "default"
              : status === "in-production"
                ? "secondary"
                : status === "delayed"
                  ? "destructive"
                  : "outline"
          return (
            <div className="flex items-center gap-2">
              <Badge variant={variant}>{status}</Badge>
              {status === "delayed" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleExplainDelay(row.original)}
                  title="Explain delay"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </Button>
              )}
            </div>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ASIN Purchase Orders</h1>
        <p className="text-muted-foreground mt-1">Track and manage purchase orders for finished goods</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ASIN, product, or manufacturer..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="cursor-pointer hover:bg-muted/50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No ASIN purchase orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
