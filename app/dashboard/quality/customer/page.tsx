"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserCheck, TrendingDown, AlertTriangle, CheckCircle, Search, Sparkles } from 'lucide-react'
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

interface CustomerIssue {
  id: string
  product: string
  issueType: string
  description: string
  severity: string
  affectedUnits: number
  reportedDate: string
  status: string
  region: string
}

export default function CustomerQualityPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const customerIssues: CustomerIssue[] = [
    {
      id: "CQ-001",
      product: "Echo Dot (5th Gen)",
      issueType: "Audio Quality",
      description: "Intermittent crackling sound at high volume",
      severity: "Medium",
      affectedUnits: 1247,
      reportedDate: "2025-01-15",
      status: "Investigating",
      region: "North America",
    },
    {
      id: "CQ-002",
      product: "Fire TV Stick 4K",
      issueType: "Connectivity",
      description: "WiFi 6 connection drops intermittently",
      severity: "High",
      affectedUnits: 3892,
      reportedDate: "2025-01-10",
      status: "Root Cause Identified",
      region: "Europe",
    },
    {
      id: "CQ-003",
      product: "Echo Show 15",
      issueType: "Display",
      description: "Touch response delayed in top-right corner",
      severity: "Low",
      affectedUnits: 542,
      reportedDate: "2025-01-18",
      status: "Monitoring",
      region: "Asia Pacific",
    },
    {
      id: "CQ-004",
      product: "Echo Smart Water Bottle",
      issueType: "Battery Life",
      description: "Battery drains faster than expected (3 days vs 7 days)",
      severity: "High",
      affectedUnits: 2156,
      reportedDate: "2025-01-12",
      status: "Corrective Action",
      region: "North America",
    },
    {
      id: "CQ-005",
      product: "Fire HD 10 Tablet",
      issueType: "Hardware",
      description: "Power button intermittently unresponsive",
      severity: "Medium",
      affectedUnits: 891,
      reportedDate: "2025-01-20",
      status: "Supplier Review",
      region: "Europe",
    },
  ]

  const handleExplain = (issue: CustomerIssue) => {
    const explanations: Record<string, string> = {
      "CQ-001": `**Root Cause Analysis - Audio Crackling Issue**\n\nAfter thorough investigation across 1,247 affected Echo Dot units, our Quality and PLM agents have identified the root cause:\n\n**Primary Issue**: Speaker driver component variance from supplier "AudioTech Solutions" (Shenzhen facility)\n- Batch #AT-2024-Q4-847 shows 15% higher impedance variance than specification\n- Quality inspection data shows the issue correlates with production date range Dec 15-22, 2024\n\n**Contributing Factors**:\n- Supplier changed adhesive compound for voice coil without notification\n- Environmental stress testing at high temperatures (>35°C) reveals premature adhesive degradation\n- This causes voice coil misalignment, producing crackling at 80%+ volume\n\n**Impact Scope**:\n- 1,247 units sold (0.23% of Q4 production)\n- Primarily affects North American market due to batch distribution\n\n**Recommended Actions**:\n1. Immediate supplier corrective action to revert adhesive specification\n2. Enhanced incoming quality inspection for speaker components\n3. Customer communication plan for voluntary replacement program\n4. Update manufacturing control plan to prevent recurrence`,
      
      "CQ-002": `**Root Cause Analysis - WiFi Connectivity Issue**\n\nComprehensive analysis of 3,892 affected Fire TV Stick 4K units reveals a firmware-hardware interaction issue:\n\n**Primary Issue**: WiFi 6 (802.11ax) chipset firmware incompatibility\n- Broadcom BCM4375 chipset revision B2 exhibits connection stability issues\n- Affects units manufactured between Nov 1-30, 2024\n- Problem manifests specifically with certain router brands (Netgear, TP-Link AX series)\n\n**Root Cause Details**:\n- Firmware version 7.145.241.2 has aggressive power-saving algorithm\n- When router implements certain WiFi 6 features (TWT - Target Wake Time), device enters low-power state prematurely\n- Recovery from low-power state fails 12% of the time, causing disconnection\n- Issue is NOT present on WiFi 5 (802.11ac) networks\n\n**Geographic Distribution**:\n- Highest concentration in Europe (68% of reports) due to router market preferences\n- Lower impact in North America (22%) and Asia Pacific (10%)\n\n**Resolution Strategy**:\n1. Emergency firmware update (v7.145.245.0) already in QA - fixes power-saving logic\n2. OTA rollout planned for Feb 1, 2025\n3. Customer support KB article published with temporary workaround\n4. No hardware replacement required - software fix resolves issue`,
      
      "CQ-003": `**Root Cause Analysis - Touch Response Issue**\n\nInvestigation of 542 Echo Show 15 units with delayed touch response:\n\n**Primary Issue**: Touch sensor calibration drift in specific environmental conditions\n- Affects top-right quadrant (coordinates X: 1850-1920, Y: 0-240)\n- Manufacturing Partner: Foxconn - Chengdu facility\n- Production dates: Jan 5-8, 2025\n\n**Technical Analysis**:\n- Touch controller (Goodix GT9886) calibration values within spec but at tolerance edge\n- Humidity exposure during shipping (>75% RH) causes slight ITO film expansion\n- Touch response delay averages 180ms vs normal 45ms\n- Issue improves after 48 hours in dry environment (<50% RH)\n\n**Investigation Findings**:\n- Packaging moisture barrier insufficient for sea freight to Asia Pacific\n- No electrical or mechanical defect found in components\n- Touch sensor physically sound, only calibration affected\n\n**Corrective Actions**:\n1. Enhanced moisture protection in packaging for Asia Pacific shipments\n2. Manufacturing partner implementing post-production bake cycle (60°C, 4 hours)\n3. Updated calibration algorithm in next firmware release\n4. Low severity - monitoring for pattern changes, no immediate action required\n\n**Customer Impact**: Minimal - issue self-corrects within 48 hours of use`,
      
      "CQ-004": `**Root Cause Analysis - Battery Life Degradation**\n\nDetailed analysis of 2,156 Echo Smart Water Bottle units with reduced battery life:\n\n**Primary Issue**: Battery cell chemistry deviation from supplier "EnergyCell Technologies"\n- Expected performance: 7 days active use\n- Actual performance: 3-4 days active use (57% reduction)\n- Lithium polymer cell batch #EC-2024-3847\n\n**Root Cause Investigation**:\n- Supplier shifted production to secondary facility (Dongguan vs primary Shenzhen)\n- Secondary facility uses different electrolyte formulation\n- Electrolyte has 18% lower ionic conductivity at operating temperature (15-35°C)\n- Results in higher internal resistance and accelerated capacity fade\n\n**Technical Details**:\n- Battery cells show 850mAh capacity vs specified 1200mAh\n- Self-discharge rate 15% higher than specification\n- BLE radio consumption identical (not a software issue)\n- Temperature sensor and hydration tracking features functioning normally\n\n**Supply Chain Context**:\n- PLM Agent identified supplier facility change was not properly communicated\n- Change control process bypassed due to "same supplier" assumption\n- Incoming quality inspection did not include full cycle testing\n\n**Resolution Plan**:\n1. Immediate halt on affected batch - 4,200 units quarantined\n2. Supplier corrective action: revert to primary facility or match electrolyte spec\n3. Enhanced battery testing protocol (full discharge cycle) in incoming inspection\n4. Customer replacement program for affected units\n5. Update PLM change control process to flag ANY facility changes`,
      
      "CQ-005": `**Root Cause Analysis - Power Button Unresponsive**\n\nAnalysis of 891 Fire HD 10 Tablet units with intermittent power button failure:\n\n**Primary Issue**: Tactile switch component premature wear\n- Component: Alps Alpine SKQG series switch\n- Expected lifetime: 200,000 actuations\n- Actual failure: 45,000-60,000 actuations (75% reduction)\n\n**Failure Mode Analysis**:\n- Switch contact plating degradation due to contamination\n- Manufacturing environment humidity spike during supplier's facility renovation\n- Moisture absorption in switch housing causes contact oxidation\n- Affects production lot manufactured Dec 10-18, 2024\n\n**Investigation Findings**:\n- Supplier "Alps Alpine Europe GmbH" conducted facility renovation\n- HVAC system offline during renovation caused humidity spike (65% vs normal 45%)\n- Components manufactured during this period show 8x higher failure rate\n- Issue NOT present in components from other Alps Alpine facilities\n\n**Component Testing Results**:\n- SEM analysis shows copper oxide formation on contacts\n- Contact resistance 12-25Ω vs specified <1Ω\n- Force-displacement curve shows increased actuation force\n\n**Corrective Actions**:\n1. Supplier implementing 100% automated contact resistance testing\n2. Enhanced environmental monitoring during production\n3. Component supplier committed to facility validation before renovation\n4. Incoming inspection updated with electrical contact resistance test\n5. Field replacement program for affected customers\n\n**Timeline**: Supplier corrective action complete Jan 25, issue resolved for new production`,
    }

    localStorage.setItem("assistantCollaboration", JSON.stringify({
      message: explanations[issue.id] || `Analyzing customer quality issue ${issue.id}...`,
      participants: [],
      type: "quality-explanation"
    }))

    window.dispatchEvent(new CustomEvent("openAssistantWithCollaboration"))
  }

  const columns = useMemo<ColumnDef<CustomerIssue>[]>(
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
        accessorKey: "product",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Product
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("product")}</div>,
      },
      {
        accessorKey: "issueType",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Issue Type
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("issueType")}</div>,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div className="max-w-md truncate text-sm text-muted-foreground">{row.getValue("description")}</div>,
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
        accessorKey: "affectedUnits",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Affected Units
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{(row.getValue("affectedUnits") as number).toLocaleString()}</div>,
      },
      {
        accessorKey: "region",
        header: "Region",
        cell: ({ row }) => <div className="text-sm">{row.getValue("region")}</div>,
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
                status === "Root Cause Identified" || status === "Corrective Action"
                  ? "default"
                  : status === "Investigating" || status === "Supplier Review"
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
    data: customerIssues,
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
        <h1 className="text-3xl font-bold text-foreground">Customer Quality</h1>
        <p className="text-muted-foreground mt-2">Monitor and manage customer-reported quality issues</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Return Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0.8%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-0.2%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-3</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisfaction</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.6/5.0</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+0.1</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Quality Issues</CardTitle>
              <CardDescription>Track and resolve customer-reported quality concerns</CardDescription>
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
