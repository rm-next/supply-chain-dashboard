"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react"
import { LayoutDashboard, Package, FileText, Box, Component, Users, Network, ShoppingCart, PackageCheck, Factory, Truck, TrendingUp, BarChart3, Archive, Layers, Settings, ShieldCheck, UserCheck, Building2, Warehouse, Bell, DollarSign, Coins, Wrench, ClipboardList, ChevronDown, ChevronRight, Plus } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const menuSections = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }],
  },
  {
    label: "Network",
    items: [
      { title: "Program", icon: FileText, href: "/dashboard/program" },
      { title: "Bill of Material", icon: FileText, href: "/dashboard/bom" },
      { title: "ASIN", icon: Box, href: "/dashboard/finished-goods" },
      { title: "Commodities", icon: Component, href: "/dashboard/commodities" },
      { title: "Suppliers", icon: Users, href: "/dashboard/suppliers" },
      { title: "Manufacturers", icon: Building2, href: "/dashboard/manufacturers" },
      { title: "Distribution", icon: Network, href: "/dashboard/distribution" },
    ],
  },
  {
    label: "Cost",
    items: [
      { title: "BOM Cost", icon: DollarSign, href: "/dashboard/cost/bom-cost" },
      { title: "Component Cost", icon: Coins, href: "/dashboard/cost/component-cost" },
      { title: "Tooling Cost", icon: Wrench, href: "/dashboard/cost/tooling-cost" },
      { title: "Quotes", icon: ClipboardList, href: "/dashboard/cost/quotes" },
    ],
  },
  {
    label: "Transactions",
    items: [
      { title: "Component PO", icon: ShoppingCart, href: "/dashboard/component-po" },
      { title: "ASIN PO", icon: PackageCheck, href: "/dashboard/fg-po" },
      { title: "Manufacturing Orders", icon: Factory, href: "/dashboard/manufacturing" },
      { title: "Inventory", icon: Warehouse, href: "/dashboard/inventory" },
      { title: "Shipments", icon: Truck, href: "/dashboard/shipments" },
    ],
  },
  {
    label: "Planning",
    items: [
      { title: "Supply Plan", icon: TrendingUp, href: "/dashboard/supply-plan" },
      { title: "Demand Plan", icon: BarChart3, href: "/dashboard/demand-plan" },
      { title: "Capacity Plan", icon: Layers, href: "/dashboard/capacity-plan" },
    ],
  },
  {
    label: "Quality",
    items: [
      { title: "Customer", icon: UserCheck, href: "/dashboard/quality/customer" },
      { title: "Manufacturing", icon: Building2, href: "/dashboard/quality/manufacturing" },
      { title: "Supplier", icon: ShieldCheck, href: "/dashboard/quality/supplier" },
    ],
  },
  {
    label: "My Flow",
    items: [
      { title: "Part Change Notifications", icon: Bell, href: "/dashboard/custom-apps/part-change-notifications" },
    ],
  },
  {
    label: "Configuration",
    items: [{ title: "Settings", icon: Settings, href: "/dashboard/settings" }],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    menuSections.reduce((acc, section) => ({ ...acc, [section.label]: true }), {}),
  )
  const [showActivity, setShowActivity] = useState(false)
  const [activityMessages, setActivityMessages] = useState<Array<{ id: number; message: string; timestamp: string }>>([])
  const [showAddNewModal, setShowAddNewModal] = useState(false)
  const [newFlowName, setNewFlowName] = useState("")
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedDataSource, setSelectedDataSource] = useState("")
  const [selectedViewFields, setSelectedViewFields] = useState<string[]>([])

  const tools = [
    "Semantic Part Match",
    "BOM Impact",
    "Program Impact",
    "Change Impact Analyzer",
    "Supplier Risk Monitor",
    "Quality Trend Analyzer",
    "BOM Version Tracker",
    "Cost Variance Detector",
    "Lead Time Forecaster",
    "Capacity Planner",
    "Inventory Optimizer",
    "Demand Signal Processor",
    "Defect Root Cause Analyzer"
  ]

  const dataSources = [
    "Incoming emails to opsadvisor",
    "PLM System (Windchill)",
    "ERP System (SAP)",
    "Quality Management (TrackWise)",
    "Supplier Portal",
    "Manufacturing Execution System",
    "Warehouse Management System",
    "Transportation Management System",
    "Product Lifecycle Data",
    "Supplier Performance Database",
    "Quality Inspection Records",
    "Inventory Transactions",
    "Component Specifications"
  ]

  const viewFields = [
    "Notification Date",
    "Supplier",
    "Source",
    "Document",
    "Impacted Manufacturer Parts",
    "Impact Type",
    "Impacted Programs",
    "Status",
    "Part Number",
    "Component ID",
    "Change Description",
    "Effective Date",
    "Risk Level",
    "Approval Status"
  ]

  useEffect(() => {
    if (!showActivity) return

    const messages = [
      "Monitoring supplier capacity changes for Echo program...",
      "Detecting BOM update for Fire TV Stick 4K Max...",
      "Analyzing lead time increase from BOE Technology...",
      "Tracking quality alert for IC chips from Supplier ABC...",
      "Identifying inventory shortage risk for Q2 demand...",
      "Processing PCN notification from Innolux Corporation...",
      "Evaluating cost increase for thermal materials...",
      "Detecting shipment delay from Vietnam DC...",
      "Analyzing demand spike for Echo Show 8...",
      "Monitoring production capacity at CM Foxconn...",
      "Tracking logistics constraints in Southeast Asia...",
      "Identifying alternative suppliers for LCD displays...",
      "Processing RFQ responses for Echo Water Bottle components...",
      "Analyzing quality metrics from inspection reports...",
      "Detecting potential stockout for critical components...",
    ]

    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const newMessage = {
        id: Date.now(),
        message: randomMessage,
        timestamp: new Date().toLocaleTimeString(),
      }
      
      setActivityMessages((prev) => [newMessage, ...prev.slice(0, 19)]) // Keep last 20 messages
    }, 1000)

    return () => clearInterval(interval)
  }, [showActivity])

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool)
        ? prev.filter((t) => t !== tool)
        : [...prev, tool]
    )
  }

  const toggleViewField = (field: string) => {
    setSelectedViewFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    )
  }

  const handleCreateFlow = () => {
    console.log("[v0] Creating new flow:", { newFlowName, selectedTools, selectedDataSource, selectedViewFields })
    setNewFlowName("")
    setSelectedTools([])
    setSelectedDataSource("")
    setSelectedViewFields([])
    setShowAddNewModal(false)
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="relative">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('.activity-trigger')) {
                e.preventDefault()
                setShowActivity(!showActivity)
              }
            }}
          >
            <Package className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-sidebar-foreground activity-trigger cursor-pointer">
              Ops Advisor
            </span>
            <span className="relative flex h-2 w-2 activity-trigger cursor-pointer">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Link>

          {showActivity && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowActivity(false)}
              />
              <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden flex flex-col">
                <div className="p-3 border-b border-border bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <h3 className="font-semibold text-sm">24x7 Agent Activity</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monitoring supply chain events and filtering for your role
                  </p>
                </div>
                <div className="overflow-y-auto p-2 space-y-1 flex-1">
                  {activityMessages.length === 0 ? (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      Listening for supply chain events...
                    </div>
                  ) : (
                    activityMessages.map((msg) => (
                      <div 
                        key={msg.id}
                        className="p-2 bg-muted/30 rounded text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-300"
                      >
                        <p className="text-foreground">{msg.message}</p>
                        <p className="text-muted-foreground text-[10px]">{msg.timestamp}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuSections.map((section) => (
          <Collapsible
            key={section.label}
            open={openSections[section.label]}
            onOpenChange={() => toggleSection(section.label)}
          >
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-sidebar-accent rounded-md px-2 py-1.5">
                  <span>{section.label}</span>
                  <div className="flex items-center gap-1">
                    {section.label === "My Flow" && (
                      <Dialog open={showAddNewModal} onOpenChange={setShowAddNewModal}>
                        <DialogTrigger asChild>
                          <div
                            className="p-0.5 hover:bg-sidebar-accent/50 rounded cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowAddNewModal(true)
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Create New Flow</DialogTitle>
                            <DialogDescription>
                              Configure a custom workflow by selecting tools, data sources, and view fields
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="flow-name">Flow Name</Label>
                              <Input
                                id="flow-name"
                                placeholder="e.g., Quality Alert Monitor"
                                value={newFlowName}
                                onChange={(e) => setNewFlowName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Tools (select multiple)</Label>
                              <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
                                {tools.map((tool) => (
                                  <label
                                    key={tool}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedTools.includes(tool)}
                                      onChange={() => toggleTool(tool)}
                                      className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <span className="text-sm">{tool}</span>
                                  </label>
                                ))}
                              </div>
                              {selectedTools.length > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  {selectedTools.length} tool{selectedTools.length > 1 ? 's' : ''} selected
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="datasources">Data Sources</Label>
                              <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                                <SelectTrigger id="datasources">
                                  <SelectValue placeholder="Select a data source" />
                                </SelectTrigger>
                                <SelectContent>
                                  {dataSources.map((source) => (
                                    <SelectItem key={source} value={source}>
                                      {source}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Views (select fields for tabular display)</Label>
                              <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
                                {viewFields.map((field) => (
                                  <label
                                    key={field}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedViewFields.includes(field)}
                                      onChange={() => toggleViewField(field)}
                                      className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <span className="text-sm">{field}</span>
                                  </label>
                                ))}
                              </div>
                              {selectedViewFields.length > 0 && (
                                <p className="text-xs text-muted-foreground">
                                  {selectedViewFields.length} field{selectedViewFields.length > 1 ? 's' : ''} selected
                                </p>
                              )}
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowAddNewModal(false)}>
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleCreateFlow}
                              disabled={!newFlowName || selectedTools.length === 0 || !selectedDataSource}
                            >
                              Create Flow
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    {openSections[section.label] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={item.href}>
                              <Icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
