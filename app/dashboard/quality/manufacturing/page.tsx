"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Factory, TrendingUp, AlertTriangle, CheckCircle, Search, Sparkles } from 'lucide-react'
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

interface ManufacturingIncident {
  id: string
  product: string
  line: string
  issue: string
  severity: string
  yield: string
  defectRate: string
  detectedDate: string
  status: string
  manufacturer: string
}

export default function ManufacturingQualityPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const qualityIncidents: ManufacturingIncident[] = [
    {
      id: "MQ-001",
      product: "Echo Dot (5th Gen)",
      line: "SMT Line 3",
      issue: "PCB solder joint cold solder defects",
      severity: "High",
      yield: "96.2%",
      defectRate: "3.8%",
      detectedDate: "2025-01-18",
      status: "Root Cause Analysis",
      manufacturer: "Foxconn - Shenzhen",
    },
    {
      id: "MQ-002",
      product: "Fire TV Stick 4K",
      line: "Assembly Line 1",
      issue: "Camera module alignment variance beyond tolerance",
      severity: "Medium",
      yield: "98.1%",
      defectRate: "1.9%",
      detectedDate: "2025-01-16",
      status: "Corrective Action",
      manufacturer: "Pegatron - Shanghai",
    },
    {
      id: "MQ-003",
      product: "Echo Show 15",
      line: "Final Test Station B",
      issue: "Display backlight uniformity test intermittent failures",
      severity: "Low",
      yield: "99.4%",
      defectRate: "0.6%",
      detectedDate: "2025-01-20",
      status: "Monitoring",
      manufacturer: "Compal - Kunshan",
    },
    {
      id: "MQ-004",
      product: "Echo Smart Water Bottle",
      line: "Assembly Line 2",
      issue: "Bluetooth antenna impedance mismatch",
      severity: "High",
      yield: "94.5%",
      defectRate: "5.5%",
      detectedDate: "2025-01-15",
      status: "Production Hold",
      manufacturer: "Flex - Zhuhai",
    },
    {
      id: "MQ-005",
      product: "Fire HD 10 Tablet",
      line: "SMT Line 1",
      issue: "Component tombstoning on passive components",
      severity: "Medium",
      yield: "97.8%",
      defectRate: "2.2%",
      detectedDate: "2025-01-19",
      status: "Process Adjustment",
      manufacturer: "Foxconn - Chengdu",
    },
  ]

  const handleExplain = (incident: ManufacturingIncident) => {
    const explanations: Record<string, string> = {
      "MQ-001": `**Manufacturing Quality Root Cause Analysis - Cold Solder Joints**\n\n**Incident Summary**: 3.8% defect rate detected on SMT Line 3 at Foxconn Shenzhen facility for Echo Dot 5th Gen production.\n\n**Root Cause Identified**:\n\n**Primary Issue**: Reflow oven temperature profile deviation\n- Zone 5 (peak temperature zone) running 8°C below target (240°C vs 248°C)\n- Temperature variance detected through SPC monitoring on Jan 18, 2025\n- Affects SAC305 lead-free solder paste reflow characteristics\n\n**Technical Analysis**:\n- Cold solder joints appearing on high-density QFN packages (WiFi module, power management IC)\n- X-ray inspection reveals insufficient solder wetting on thermal pads\n- Pull test strength 40% below specification (18N vs 30N minimum)\n- Issue correlates with oven maintenance performed Jan 15 - heating element calibration error\n\n**Process Investigation**:\n- Manufacturing partner's preventive maintenance accidentally reset temperature calibration\n- SPC alert triggered after 847 boards processed\n- Affected boards immediately quarantined (currently 2,847 units in holding)\n\n**Impact Assessment**:\n- Yield dropped from baseline 99.2% to 96.2%\n- 3.8% defect rate (323 boards out of 8,500 processed)\n- No units shipped to customers - caught in-line by AOI and X-ray inspection\n- Estimated 2-day production delay for rework\n\n**Corrective Actions**:\n1. Oven temperature profile re-calibrated and validated with thermal profiler\n2. Enhanced post-maintenance verification protocol implemented\n3. 100% X-ray inspection on all boards until process stability confirmed\n4. Affected boards routed to rework station - all recoverable\n5. SPC monitoring limits tightened from ±10°C to ±5°C\n\n**Status**: Oven recalibrated Jan 19. First-pass yield returned to 99.1%. Production resumed with enhanced monitoring.`,
      
      "MQ-002": `**Manufacturing Quality Root Cause Analysis - Camera Module Alignment**\n\n**Incident Summary**: 1.9% defect rate on Assembly Line 1 at Pegatron Shanghai for Fire TV Stick 4K camera module placement.\n\n**Root Cause Identified**:\n\n**Primary Issue**: Vision system calibration drift on pick-and-place equipment\n- Yamaha YSM20R pick-and-place machine showing gradual calibration degradation\n- Camera recognition algorithm mis-identifying fiducial marks by average 0.15mm\n- Results in camera module placement outside ±0.1mm tolerance specification\n\n**Technical Details**:\n- Camera module requires precise placement for optical axis alignment\n- Misalignment causes autofocus failure in functional test (detectable, caught before ship)\n- Vision system camera lens showing dust accumulation reducing contrast\n- Last calibration performed Dec 10, 2024 (40 days vs recommended 30 days)\n\n**Manufacturing Context**:\n- Issue gradual onset - defect rate increased from 0.3% (baseline) to 1.9% over 3 weeks\n- SPC trend showed gradual drift but remained within warning limits until Jan 15\n- 1,615 units produced with alignment variance (all caught in functional test, none shipped)\n\n**Component & Process Analysis**:\n- Camera module supplier (Sunny Optical) components within specification\n- Pick-and-place equipment running within normal speed parameters\n- No mechanical wear detected on placement head\n- Vision system lens contamination from facility environmental factors\n\n**Corrective Actions**:\n1. Vision system comprehensive cleaning and recalibration completed\n2. Reduced calibration interval to 21 days (vs previous 30 days)\n3. Added daily vision system verification with golden reference board\n4. Installed protective enclosure around vision cameras to reduce dust exposure\n5. Updated SPC control limits to trigger investigation at 1.0% defect rate\n6. Affected units reworked - manual camera module replacement with 100% re-test\n\n**Prevention Measures**:\n- Facility air filtration upgraded from ISO Class 7 to Class 6\n- Vision system maintenance added to critical equipment monitoring\n\n**Status**: Line 1 recalibrated Jan 17. Yield returned to 98.9%. All affected units reworked and shipped.`,
      
      "MQ-003": `**Manufacturing Quality Root Cause Analysis - Display Backlight Test Failures**\n\n**Incident Summary**: 0.6% intermittent failure rate on Final Test Station B at Compal Kunshan for Echo Show 15 display uniformity testing.\n\n**Root Cause Identified**:\n\n**Primary Issue**: Test equipment stability rather than product defect\n- Colorimeter sensor in test fixture showing intermittent communication errors\n- USB connection instability causing test aborts (false failures)\n- Display panels themselves meeting all uniformity specifications\n\n**Investigation Details**:\n- Pattern analysis reveals failures NOT correlated with:\n  - Production time\n  - Display supplier lot\n  - Assembly operator\n  - Environmental conditions\n- 100% of "failed" units pass retest on Station A equipment\n- Issue isolated to Station B specifically\n\n**Root Cause Validation**:\n- Test equipment diagnostic logs show USB packet loss during test execution\n- Colorimeter sensor (Konica Minolta CA-410) USB cable showing intermittent continuity\n- Cable stress from repeated test cycles (>50,000 test cycles) causing internal wire fracture\n- When communication drops, test software reports "FAIL" vs "ERROR" (software logic issue)\n\n**Impact Assessment**:\n- 342 units incorrectly marked as failures\n- All units verified as good through alternate test station\n- No actual product quality issue - test equipment failure only\n- Production throughput impacted by retests (15% capacity reduction on Station B)\n- No units shipped with actual defects\n\n**Corrective Actions**:\n1. USB cable replaced on Station B colorimeter - immediate fix\n2. Test software updated to distinguish equipment errors from product failures\n3. Added daily test equipment verification with known-good calibration display\n4. Implemented cable strain relief to prevent future wire fatigue\n5. All affected units retested and cleared for shipment\n\n**Process Improvements**:\n- Test equipment health monitoring added to manufacturing dashboard\n- Preventive maintenance schedule updated for test fixtures (monthly cable inspection)\n- Golden unit testing added to shift start routine\n\n**Status**: Low severity issue - no product defects. Test equipment repaired Jan 20. Station B back to full capacity.`,
      
      "MQ-004": `**Manufacturing Quality Root Cause Analysis - Bluetooth Antenna Impedance**\n\n**Incident Summary**: 5.5% defect rate on Assembly Line 2 at Flex Zhuhai for Echo Smart Water Bottle Bluetooth connectivity testing. **PRODUCTION HOLD ACTIVE**.\n\n**Root Cause Identified**:\n\n**Primary Issue**: Antenna PCB substrate material change by supplier without notification\n- Antenna module supplier (Amphenol) changed Rogers 4350B substrate to Rogers 4003C\n- Material dielectric constant difference (3.48 vs 3.38) affects antenna tuning\n- Results in impedance mismatch: 58Ω vs specified 50Ω (±5Ω tolerance)\n\n**Technical Impact**:\n- Bluetooth transmit power reduced by 2.3dB due to impedance mismatch\n- Effective range reduced from >10m to ~6m (40% reduction)\n- BLE connection stability affected - higher packet error rate (3.2% vs <1% target)\n- All units fail RF performance test in production\n\n**Supply Chain Investigation**:\n- Supplier implemented substrate change on Jan 10, 2025 without ECN notification\n- Change driven by Rogers 4350B supply shortage (lead time increased 16→24 weeks)\n- Supplier incorrectly assessed substrates as "equivalent" without RF validation\n- Material change not communicated through PLM system\n\n**Manufacturing Detection**:\n- Issue caught at 100% RF functional test - no defective units shipped to customers\n- 4,680 antenna modules received from supplier (2,574 already assembled into products)\n- All affected units currently in production hold quarantine\n\n**Impact Severity**: HIGH\n- Production line stopped since Jan 15 (day 3 of hold)\n- Daily production capacity: 1,200 units\n- Estimated customer impact: 0 units (caught before shipment)\n- Business impact: Potential street date risk if hold exceeds 7 days\n\n**Corrective Actions**:\n1. **Immediate**: Supplier reverting to Rogers 4350B material - expedited production\n2. **Short-term**: Engineering team developing matching network modification (2-day solution)\n3. **Component**: Supplier implementing enhanced change control process\n4. **Incoming Quality**: 100% RF parameter validation added to antenna module incoming inspection\n5. **Supply Chain**: PLM Agent flagged for enhanced supplier change monitoring\n\n**Recovery Plan**:\n- New antenna modules with correct substrate shipping via air freight (arrival Jan 23)\n- Affected assembled units: antenna replacement rework planned (est. 3 days)\n- Production resume target: Jan 24, 2025\n- Alternative: Impedance matching network modification allows use of existing inventory (backup plan)\n\n**Status**: Production hold active. Engineering evaluation of rework vs matching network modification in progress. Decision expected Jan 22.`,
      
      "MQ-005": `**Manufacturing Quality Root Cause Analysis - Component Tombstoning**\n\n**Incident Summary**: 2.2% defect rate on SMT Line 1 at Foxconn Chengdu for Fire HD 10 Tablet passive component placement.\n\n**Root Cause Identified**:\n\n**Primary Issue**: Solder paste stencil aperture design interaction with component package size\n- Tombstoning occurring on 0201 size resistors and capacitors (0.6mm x 0.3mm)\n- Unequal solder volume on component pads causing lift during reflow\n- Affects high-density routing areas on main system board\n\n**Technical Analysis**:\n- Tombstoning: One end of component lifts off pad, standing vertically during reflow\n- Root cause: Differential wetting force due to solder volume imbalance\n- Stencil aperture design: Pad 1 opening 15% larger than Pad 2 (design error)\n- Larger aperture → more solder paste → higher wetting force → component rotation\n\n**Process Investigation**:\n- New stencil received Jan 15 for product revision B (minor board update)\n- Stencil design review missed aperture asymmetry\n- Issue not present on revision A boards (correct aperture design)\n- Solder paste (Senju M705) application within specification\n- Reflow profile validated - temperature and time parameters correct\n\n**Manufacturing Context**:\n- 1,870 boards processed before issue detected by AOI inspection\n- Defect clustering on 47Ω series resistors in USB power delivery circuit\n- Some tombstoned components causing electrical opens (caught in functional test)\n- No customer impact - all defects caught in-line\n\n**Defect Mechanism**:\n1. Solder paste printing deposits unequal volumes on pads\n2. Component placed on unequal solder deposits\n3. During reflow, larger solder volume melts first, creating wetting force\n4. Surface tension pulls component toward larger solder volume\n5. Component rotates on one end, breaking contact with smaller pad\n6. Result: Component standing vertical (tombstone) or missing contact\n\n**Corrective Actions**:\n1. **Immediate**: Stencil apertures corrected to equal size (0.35mm x 0.20mm both pads)\n2. New stencil manufactured and validated with solder paste print inspection\n3. First article inspection protocol updated to include aperture measurement verification\n4. Stencil design review checklist enhanced with specific 0201 component checks\n5. Affected boards: Rework completed using manual placement and touch-up reflow\n\n**Process Improvements**:\n- Automated stencil aperture measurement added to incoming stencil inspection\n- Design for manufacturability (DFM) review process updated\n- SPC monitoring added for tombstone defect rates (alert threshold: >0.5%)\n\n**Status**: New stencil in production Jan 19. First-pass yield returned to 99.3%. All affected boards reworked and cleared.`,
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem("assistantCollaboration", JSON.stringify({
        message: explanations[incident.id] || `Analyzing manufacturing quality issue ${incident.id}...`,
        participants: [],
        type: "quality-explanation"
      }))
    }

    window.dispatchEvent(new CustomEvent("openAssistantWithCollaboration"))
  }

  const columns = useMemo<ColumnDef<ManufacturingIncident>[]>(
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
              Incident ID
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
        accessorKey: "manufacturer",
        header: "Manufacturer",
        cell: ({ row }) => <div className="text-sm">{row.getValue("manufacturer")}</div>,
      },
      {
        accessorKey: "line",
        header: "Production Line",
        cell: ({ row }) => <div className="text-sm">{row.getValue("line")}</div>,
      },
      {
        accessorKey: "issue",
        header: "Issue",
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
        accessorKey: "yield",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Current Yield
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("yield")}</div>,
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
                status === "Production Hold"
                  ? "destructive"
                  : status === "Root Cause Analysis" || status === "Corrective Action"
                    ? "default"
                    : status === "Process Adjustment"
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
    data: qualityIncidents,
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
        <h1 className="text-3xl font-bold text-foreground">Manufacturing Quality</h1>
        <p className="text-muted-foreground mt-2">Monitor production quality and resolve manufacturing issues</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Yield</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">98.4%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+0.6%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quality Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-red-600" />
              <span className="text-xs text-red-600">+2</span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Process Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">99.1%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+0.3%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manufacturing Quality Incidents</CardTitle>
              <CardDescription>Active quality issues on production lines</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search incidents..."
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
