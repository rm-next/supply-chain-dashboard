"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShieldCheck, TrendingDown, AlertTriangle, XCircle, Search, Sparkles } from 'lucide-react'
import { useState, useMemo } from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { ArrowUpDown } from 'lucide-react'

interface SupplierIssue {
  id: string
  supplier: string
  component: string
  partNumber: string
  issue: string
  severity: string
  quarantined: number
  lotNumber: string
  receivedDate: string
  status: string
}

export default function SupplierQualityPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const supplierIssues: SupplierIssue[] = [
    {
      id: "SQ-001",
      supplier: "Samsung Electro-Mechanics",
      component: "MLCC Capacitor",
      partNumber: "CL10B104KB8NNNC",
      issue: "Capacitance value drift outside tolerance (±10% → ±18%)",
      severity: "High",
      quarantined: 24000,
      lotNumber: "SEM-2024-W48-3847",
      receivedDate: "2025-01-14",
      status: "Supplier 8D",
    },
    {
      id: "SQ-002",
      supplier: "Micron Technology",
      component: "LPDDR5 Memory IC",
      partNumber: "MT53E512M32D2DS-046",
      issue: "3.2% failure rate in extended temperature testing (-20°C to 85°C)",
      severity: "High",
      quarantined: 8500,
      lotNumber: "MTRON-2025-0108",
      receivedDate: "2025-01-12",
      status: "Root Cause Investigation",
    },
    {
      id: "SQ-003",
      supplier: "BOE Technology",
      component: "LCD Display Panel",
      partNumber: "BOE-HV150UX1-100",
      issue: "Minor cosmetic defects - small bubbles in adhesive layer (<0.5mm)",
      severity: "Low",
      quarantined: 1200,
      lotNumber: "BOE-2501-A-0847",
      receivedDate: "2025-01-16",
      status: "Rework Approved",
    },
    {
      id: "SQ-004",
      supplier: "TDK Corporation",
      component: "Inductor",
      partNumber: "MLF2012A100KT",
      issue: "Saturation current below specification (2.8A measured vs 3.2A min)",
      severity: "High",
      quarantined: 15000,
      lotNumber: "TDK-2024-Q4-2291",
      receivedDate: "2025-01-10",
      status: "Return to Supplier",
    },
    {
      id: "SQ-005",
      supplier: "Murata Manufacturing",
      component: "Ceramic Resonator",
      partNumber: "CSTCE16M0V53-R0",
      issue: "Frequency tolerance exceeded (±0.5% vs ±0.3% spec)",
      severity: "Medium",
      quarantined: 5400,
      lotNumber: "MUR-2025-W02-1156",
      receivedDate: "2025-01-18",
      status: "Disposition Pending",
    },
  ]

  const handleExplain = (issue: SupplierIssue) => {
    const qualityAnalysisData: Record<string, any> = {
      "SQ-001": {
        rootCause: {
          title: "Root Cause Analysis - MLCC Capacitance Drift",
          findings: [
            "Manufacturing process parameter deviation at Samsung Electro-Mechanics Busan facility",
            "New ceramic powder supplier introduced November 2024 with wider particle size distribution (0.3-0.8μm vs 0.4-0.6μm)",
            "Screen printing process not optimized for new powder characteristics",
            "Quality control sampling rate inadequate (AQL 0.65 vs required 0.25 for critical components)"
          ]
        },
        impact: {
          title: "Impact Assessment",
          metrics: [
            { label: "Units Quarantined", value: "24,000 units (3 reels)", severity: "high" },
            { label: "Production Impact", value: "Zero - caught during incoming inspection", severity: "low" },
            { label: "Cost Impact", value: "$48K component cost + $12K testing", severity: "medium" },
            { label: "Customer Risk", value: "Zero - 100% screened before production", severity: "low" }
          ]
        },
        correctiveActions: {
          title: "Corrective Actions (8D Process)",
          actions: [
            { step: "D1-D2", description: "Team formed, problem described, root cause identified", status: "complete" },
            { step: "D3", description: "Interim containment: 100% electrical testing on all Samsung MLCC shipments", status: "complete" },
            { step: "D4-D5", description: "Root cause validation and permanent corrective action implementation", status: "in-progress" },
            { step: "D6-D8", description: "Process validation, prevention measures, and team recognition", status: "planned" }
          ]
        }
      },
      "SQ-002": {
        rootCause: {
          title: "Root Cause Analysis - Memory IC Temperature Failure",
          findings: [
            "3.2% failure rate in extended temperature testing (-20°C to 85°C) for Micron LPDDR5 Memory IC",
            "Die attach thermal interface degradation under thermal cycling stress",
            "Manufacturing lot MTRON-2025-0108 shows elevated die attach voiding (>5% vs <2% specification)",
            "Correlated with equipment calibration drift during December 2024 production period"
          ]
        },
        impact: {
          title: "Impact Assessment",
          metrics: [
            { label: "Units Quarantined", value: "8,500 units received Jan 12", severity: "high" },
            { label: "Production Impact", value: "2-day line hold pending alternate sourcing", severity: "high" },
            { label: "Cost Impact", value: "$127K replacement + $28K expedite fees", severity: "high" },
            { label: "Customer Risk", value: "Zero - detected in incoming quality control", severity: "low" }
          ]
        },
        correctiveActions: {
          title: "Corrective Actions",
          actions: [
            { step: "Immediate", description: "Quarantine all units from lot MTRON-2025-0108", status: "complete" },
            { step: "Alternate Source", description: "Source replacement from Samsung Semiconductor (5-day lead time)", status: "in-progress" },
            { step: "Supplier", description: "Micron conducting full root cause analysis and equipment recalibration", status: "in-progress" },
            { step: "Prevention", description: "Enhanced thermal cycling test requirements in incoming quality spec", status: "planned" }
          ]
        }
      },
      "SQ-003": {
        rootCause: {
          title: "Root Cause Analysis - LCD Panel Cosmetic Defects",
          findings: [
            "Minor cosmetic defects - small bubbles in adhesive layer (<0.5mm diameter)",
            "Adhesive application process variance at BOE Technology facility",
            "Environmental humidity control deviation during lamination process (55-60% vs 50-55% spec)",
            "Affects lot BOE-2501-A-0847, production date January 16, 2025"
          ]
        },
        impact: {
          title: "Impact Assessment",
          metrics: [
            { label: "Units Quarantined", value: "1,200 units", severity: "low" },
            { label: "Production Impact", value: "Minimal - rework approved for B-grade products", severity: "low" },
            { label: "Cost Impact", value: "$4.2K rework labor cost", severity: "low" },
            { label: "Functional Impact", value: "None - cosmetic only, no display performance degradation", severity: "low" }
          ]
        },
        correctiveActions: {
          title: "Corrective Actions",
          actions: [
            { step: "Disposition", description: "Approve rework for B-grade/internal use products", status: "complete" },
            { step: "Supplier", description: "BOE to improve humidity control and process monitoring", status: "in-progress" },
            { step: "Prevention", description: "Add visual inspection checkpoint post-lamination", status: "in-progress" },
            { step: "Monitoring", description: "Increase sampling rate for next 3 shipments", status: "planned" }
          ]
        }
      },
      "SQ-004": {
        rootCause: {
          title: "Root Cause Analysis - Inductor Saturation Current",
          findings: [
            "Saturation current below specification (2.8A measured vs 3.2A minimum required)",
            "Core material magnetic property variance in lot TDK-2024-Q4-2291",
            "Ferrite powder sintering temperature deviation during manufacturing",
            "Affects power supply circuit stability under peak load conditions"
          ]
        },
        impact: {
          title: "Impact Assessment",
          metrics: [
            { label: "Units Quarantined", value: "15,000 units", severity: "high" },
            { label: "Production Impact", value: "3-day production halt for Echo Dot power supplies", severity: "high" },
            { label: "Cost Impact", value: "$67K component replacement + $18K logistics", severity: "high" },
            { label: "Safety Risk", value: "High - potential power supply instability under load", severity: "high" }
          ]
        },
        correctiveActions: {
          title: "Corrective Actions",
          actions: [
            { step: "Immediate", description: "Return all 15,000 units to TDK Corporation", status: "complete" },
            { step: "Alternate Source", description: "Murata Manufacturing providing replacement units (7-day delivery)", status: "in-progress" },
            { step: "Supplier", description: "TDK implementing enhanced process controls and material testing", status: "in-progress" },
            { step: "Qualification", description: "Re-qualify TDK after 3 consecutive conforming lots", status: "planned" }
          ]
        }
      },
      "SQ-005": {
        rootCause: {
          title: "Root Cause Analysis - Ceramic Resonator Frequency",
          findings: [
            "Frequency tolerance exceeded: ±0.5% actual vs ±0.3% specification",
            "Ceramic material composition variance in Murata lot MUR-2025-W02-1156",
            "Temperature coefficient drift affects clock stability in temperature extremes",
            "Production equipment calibration deviation identified at Murata facility"
          ]
        },
        impact: {
          title: "Impact Assessment",
          metrics: [
            { label: "Units Quarantined", value: "5,400 units", severity: "medium" },
            { label: "Production Impact", value: "Pending disposition review - may be acceptable for use", severity: "medium" },
            { label: "Cost Impact", value: "$8.6K if rejected, $1.2K if accepted with deviation", severity: "medium" },
            { label: "Functional Risk", value: "Medium - may cause timing issues in extreme temperatures", severity: "medium" }
          ]
        },
        correctiveActions: {
          title: "Corrective Actions",
          actions: [
            { step: "Engineering Review", description: "System-level testing to determine acceptability for production use", status: "in-progress" },
            { step: "Disposition", description: "Pending engineering review - decision by Jan 22", status: "in-progress" },
            { step: "Supplier", description: "Murata recalibrating equipment and tightening process controls", status: "in-progress" },
            { step: "Prevention", description: "Update incoming inspection to verify frequency tolerance at temperature extremes", status: "planned" }
          ]
        }
      }
    }

    const analysis = qualityAnalysisData[issue.id]
    if (analysis) {
      // Dispatch event with structured data
      window.dispatchEvent(new CustomEvent("openAssistantWithMessage", {
        detail: { 
          message: `Analyzing quality issue ${issue.id} for ${issue.component} from ${issue.supplier}...`,
          qualityAnalysis: analysis
        }
      }))
    }
  }

  const columns = useMemo<ColumnDef<SupplierIssue>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Issue ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("id")}</div>,
      },
      {
        accessorKey: "supplier",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Supplier
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("supplier")}</div>,
      },
      {
        accessorKey: "component",
        header: "Component",
        cell: ({ row }) => <div className="text-sm">{row.getValue("component")}</div>,
      },
      {
        accessorKey: "partNumber",
        header: "Part Number",
        cell: ({ row }) => <div className="font-mono text-xs text-muted-foreground">{row.getValue("partNumber")}</div>,
      },
      {
        accessorKey: "issue",
        header: "Issue Description",
        cell: ({ row }) => <div className="max-w-md truncate text-sm text-muted-foreground">{row.getValue("issue")}</div>,
      },
      {
        accessorKey: "severity",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Severity
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const severity = row.getValue("severity") as string
          return (
            <Badge
              variant={
                severity === "High" ? "destructive" : severity === "Medium" ? "default" : "secondary"
              }
            >
              {severity}
            </Badge>
          )
        },
      },
      {
        accessorKey: "quarantined",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Quarantined
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{(row.getValue("quarantined") as number).toLocaleString()}</div>,
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
          return (
            <Badge
              variant={
                status === "Return to Supplier"
                  ? "destructive"
                  : status === "Root Cause Investigation" || status === "Supplier 8D"
                    ? "default"
                    : status === "Disposition Pending"
                      ? "secondary"
                      : "outline"
              }
            >
              {status}
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: "Explain",
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleExplain(row.original)
              }}
              className="h-9 w-9 p-0 hover:bg-primary/10"
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: supplierIssues,
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
        <h1 className="text-3xl font-bold text-foreground">Supplier Quality</h1>
        <p className="text-muted-foreground mt-2">Monitor supplier component quality and manage incoming defects</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Supplier Quality Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">96.2%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+1.3%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Incoming Defects</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-8</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quarantined Inventory</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">54,100</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">units</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Supplier Quality Issues</CardTitle>
              <CardDescription>Active quality issues with supplier components</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
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
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
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
