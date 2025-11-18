"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sparkles, ArrowUpDown } from 'lucide-react'
import { useState } from "react"

export default function ShipmentsPage() {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  const shipments = [
    { 
      id: "SHIP-001",
      program: "Fire SMP Horizon",
      asin: "B0DFGH1234",
      trackingNumber: "1Z999AA10123456784",
      shipFrom: "Foxconn Shenzhen Facility",
      shipTo: "PHX7 - Phoenix FC",
      quantity: 8500,
      carrier: "UPS",
      deliveryStatus: "delayed",
      delayReason: "Port congestion at LA",
      expectedDelay: "3 days"
    },
    { 
      id: "SHIP-002",
      program: "Echo Show 15",
      asin: "B0BCXY5678",
      trackingNumber: "1Z999AA10123456785",
      shipFrom: "Pegatron Chennai",
      shipTo: "JFK8 - Staten Island FC",
      quantity: 12000,
      carrier: "FedEx",
      deliveryStatus: "in-transit",
      eta: "2 days"
    },
    { 
      id: "SHIP-003",
      program: "Fire TV Stick 4K Max",
      asin: "B0MNOP9012",
      trackingNumber: "1Z999AA10123456786",
      shipFrom: "Foxconn Shenzhen Facility",
      shipTo: "LGB3 - Eastvale FC",
      quantity: 15000,
      carrier: "DHL",
      deliveryStatus: "delivered",
      eta: "Delivered"
    },
    { 
      id: "SHIP-004",
      program: "Echo Dot 5th Gen",
      asin: "B0PQRS3456",
      trackingNumber: "1Z999AA10123456787",
      shipFrom: "Luxshare Vietnam",
      shipTo: "BFI4 - Kent FC",
      quantity: 9500,
      carrier: "Maersk",
      deliveryStatus: "preparing",
      eta: "7 days"
    },
    { 
      id: "SHIP-005",
      program: "Fire SMP Horizon",
      asin: "B0DFGH1234",
      trackingNumber: "1Z999AA10123456788",
      shipFrom: "Foxconn Shenzhen Facility",
      shipTo: "IND9 - Plainfield FC",
      quantity: 6800,
      carrier: "XPO Logistics",
      deliveryStatus: "at-risk",
      riskReason: "Weather conditions",
      expectedDelay: "1-2 days"
    },
  ]

  const statusColors = {
    delivered: "default",
    "in-transit": "secondary",
    preparing: "outline",
    delayed: "destructive",
    "at-risk": "warning" as any,
  }

  const handleExplain = (shipment: any) => {
    const message = `**Shipment Delay Analysis - ${shipment.trackingNumber}**\n\n${shipment.program} (${shipment.asin}) shipment from ${shipment.shipFrom} to ${shipment.shipTo} is experiencing delays.`
    
    const shipmentAnalysis = {
      rootCause: {
        title: "Port Congestion at LA",
        findings: [
          `Shipment ${shipment.trackingNumber} is currently held at Long Beach port due to severe congestion`,
          "Peak season volume surge: 40% increase in container arrivals compared to Q3 average",
          "Limited dock space availability: Only 3 of 8 berths operational due to maintenance",
          "Drayage shortage: 25% reduction in available trucks for last-mile delivery"
        ]
      },
      impact: {
        title: "Delivery Impact",
        metrics: [
          { label: "Expected Delay", value: shipment.expectedDelay || "3 days", severity: "high" },
          { label: "Units Affected", value: shipment.quantity.toLocaleString(), severity: "medium" },
          { label: "Programs Impacted", value: shipment.program, severity: "medium" },
          { label: "FC Destination", value: shipment.shipTo, severity: "low" },
          { label: "Customer Orders at Risk", value: "342 orders", severity: "high" },
          { label: "Retailer POs Impacted", value: "Best Buy (120), Target (98), Walmart (84), Amazon.com (40)", severity: "high" }
        ]
      },
      recommendations: {
        title: "Recommended Actions",
        actions: [
          {
            step: "Air Freight Alternative",
            description: "Expedite 30% of shipment via air freight to meet FC requirements. Cost: $12K premium, Arrival: 48 hours",
            priority: "high"
          },
          {
            step: "Reroute to Oakland Port",
            description: "Redirect remaining containers to Oakland port with available berth capacity. Additional cost: $3K, Saves 2 days",
            priority: "medium"
          },
          {
            step: "Adjust FC Allocation",
            description: "Temporarily redirect to PHX5 (Phoenix) FC with available capacity instead of PHX7. No additional cost",
            priority: "low"
          }
        ]
      }
    }

    // Dispatch event to open assistant with structured data
    window.dispatchEvent(
      new CustomEvent("openAssistantWithMessage", {
        detail: {
          message,
          type: "shipment-explanation",
          shipmentAnalysis
        }
      })
    )
  }

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shipments</h1>
        <p className="text-muted-foreground mt-1">Track shipments and logistics in real-time</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shipment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("program")}>
                    <div className="flex items-center gap-1">
                      Program
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>ASIN</TableHead>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Ship From</TableHead>
                  <TableHead>Ship To</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Delivery Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.program}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{shipment.asin}</TableCell>
                    <TableCell className="font-mono text-sm">{shipment.trackingNumber}</TableCell>
                    <TableCell className="text-sm">{shipment.shipFrom}</TableCell>
                    <TableCell className="text-sm">{shipment.shipTo}</TableCell>
                    <TableCell className="text-sm font-medium">{shipment.quantity.toLocaleString()} units</TableCell>
                    <TableCell className="text-sm">{shipment.carrier}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={statusColors[shipment.deliveryStatus as keyof typeof statusColors]}>
                          {shipment.deliveryStatus}
                        </Badge>
                        {shipment.deliveryStatus === "delayed" && shipment.expectedDelay && (
                          <p className="text-xs text-muted-foreground mt-1">+{shipment.expectedDelay}</p>
                        )}
                        {shipment.deliveryStatus === "at-risk" && shipment.expectedDelay && (
                          <p className="text-xs text-muted-foreground mt-1">{shipment.expectedDelay}</p>
                        )}
                        {(shipment.deliveryStatus === "in-transit" || shipment.deliveryStatus === "preparing") && shipment.eta && (
                          <p className="text-xs text-muted-foreground mt-1">ETA: {shipment.eta}</p>
                        )}
                        {(shipment.deliveryStatus === "delayed" || shipment.deliveryStatus === "at-risk") && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleExplain(shipment)}
                          >
                            <Sparkles className="h-4 w-4 text-primary" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
