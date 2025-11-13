"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  FileText,
  Box,
  Component,
  Users,
  Network,
  ShoppingCart,
  PackageCheck,
  Factory,
  Truck,
  TrendingUp,
  BarChart3,
  Archive,
  Layers,
  Settings,
  ShieldCheck,
  UserCheck,
  Building2,
  Warehouse,
  Bell,
  DollarSign,
  Coins,
  Wrench,
  ClipboardList,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
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
      { title: "Inventory Plan", icon: Archive, href: "/dashboard/inventory-plan" },
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
    label: "Custom Apps",
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

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">Ops Advisor</span>
        </Link>
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
                  {openSections[section.label] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
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
