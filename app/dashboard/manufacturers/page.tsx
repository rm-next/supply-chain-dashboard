"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical } from "lucide-react"

export default function ManufacturersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const manufacturersData = [
    {
      id: "MFG-001",
      manufacturer: "Foxconn (Hon Hai)",
      site: "Shenzhen, China",
      productFamilies: ["Smartphones", "Tablets", "Laptops"],
      capabilities: ["SMT Assembly", "Final Assembly", "Testing", "Packaging"],
      status: "active",
    },
    {
      id: "MFG-002",
      manufacturer: "Foxconn (Hon Hai)",
      site: "Zhengzhou, China",
      productFamilies: ["Smartphones", "Wearables"],
      capabilities: ["SMT Assembly", "Final Assembly", "Testing"],
      status: "active",
    },
    {
      id: "MFG-003",
      manufacturer: "Flex Ltd",
      site: "Austin, Texas, USA",
      productFamilies: ["Automotive Electronics", "Industrial Equipment"],
      capabilities: ["PCB Assembly", "Box Build", "Testing", "Supply Chain"],
      status: "active",
    },
    {
      id: "MFG-004",
      manufacturer: "Flex Ltd",
      site: "Guadalajara, Mexico",
      productFamilies: ["Servers", "Networking Equipment", "Storage"],
      capabilities: ["SMT Assembly", "System Integration", "Testing", "Logistics"],
      status: "active",
    },
    {
      id: "MFG-005",
      manufacturer: "Jabil Inc",
      site: "St. Petersburg, Florida, USA",
      productFamilies: ["Medical Devices", "Healthcare Equipment"],
      capabilities: ["Precision Assembly", "Clean Room", "Testing", "Sterilization"],
      status: "active",
    },
    {
      id: "MFG-006",
      manufacturer: "Jabil Inc",
      site: "Penang, Malaysia",
      productFamilies: ["Consumer Electronics", "IoT Devices"],
      capabilities: ["SMT Assembly", "Injection Molding", "Testing", "Packaging"],
      status: "active",
    },
    {
      id: "MFG-007",
      manufacturer: "Sanmina Corporation",
      site: "San Jose, California, USA",
      productFamilies: ["Aerospace Systems", "Defense Electronics"],
      capabilities: ["PCB Fabrication", "Complex Assembly", "Testing", "Certification"],
      status: "active",
    },
    {
      id: "MFG-008",
      manufacturer: "Sanmina Corporation",
      site: "Suzhou, China",
      productFamilies: ["Optical Modules", "Networking Equipment"],
      capabilities: ["SMT Assembly", "Optical Assembly", "Testing", "Calibration"],
      status: "active",
    },
    {
      id: "MFG-009",
      manufacturer: "Pegatron Corporation",
      site: "Shanghai, China",
      productFamilies: ["Laptops", "Desktops", "Gaming Consoles"],
      capabilities: ["SMT Assembly", "Final Assembly", "Testing", "Packaging"],
      status: "active",
    },
    {
      id: "MFG-010",
      manufacturer: "Pegatron Corporation",
      site: "Taipei, Taiwan",
      productFamilies: ["Motherboards", "Graphics Cards"],
      capabilities: ["PCB Assembly", "Testing", "Quality Control"],
      status: "active",
    },
    {
      id: "MFG-011",
      manufacturer: "Wistron Corporation",
      site: "Kunshan, China",
      productFamilies: ["Laptops", "Tablets", "Smartphones"],
      capabilities: ["SMT Assembly", "Final Assembly", "Testing", "Logistics"],
      status: "active",
    },
    {
      id: "MFG-012",
      manufacturer: "Wistron Corporation",
      site: "Bangalore, India",
      productFamilies: ["Smartphones", "IoT Devices"],
      capabilities: ["SMT Assembly", "Final Assembly", "Testing"],
      status: "active",
    },
    {
      id: "MFG-013",
      manufacturer: "Celestica Inc",
      site: "Toronto, Canada",
      productFamilies: ["Telecom Equipment", "Enterprise Hardware"],
      capabilities: ["PCB Assembly", "System Integration", "Testing", "Repair"],
      status: "active",
    },
    {
      id: "MFG-014",
      manufacturer: "Celestica Inc",
      site: "Valencia, Spain",
      productFamilies: ["Aerospace Electronics", "Industrial Controls"],
      capabilities: ["Complex Assembly", "Testing", "Certification", "Logistics"],
      status: "active",
    },
    {
      id: "MFG-015",
      manufacturer: "Benchmark Electronics",
      site: "Tempe, Arizona, USA",
      productFamilies: ["Aerospace Systems", "Defense Electronics"],
      capabilities: ["PCB Assembly", "Box Build", "Testing", "AS9100 Certified"],
      status: "active",
    },
    {
      id: "MFG-016",
      manufacturer: "Benchmark Electronics",
      site: "Bangkok, Thailand",
      productFamilies: ["Medical Devices", "Industrial Equipment"],
      capabilities: ["SMT Assembly", "Clean Room", "Testing", "Packaging"],
      status: "active",
    },
    {
      id: "MFG-017",
      manufacturer: "Plexus Corp",
      site: "Neenah, Wisconsin, USA",
      productFamilies: ["Medical Devices", "Healthcare Equipment"],
      capabilities: ["Precision Assembly", "Clean Room", "Testing", "FDA Compliance"],
      status: "active",
    },
    {
      id: "MFG-018",
      manufacturer: "Plexus Corp",
      site: "Penang, Malaysia",
      productFamilies: ["Industrial Controls", "Test Equipment"],
      capabilities: ["PCB Assembly", "Box Build", "Testing", "Calibration"],
      status: "active",
    },
  ]

  const filteredData = manufacturersData.filter((item) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      item.manufacturer.toLowerCase().includes(query) ||
      item.site.toLowerCase().includes(query) ||
      item.productFamilies.some((pf) => pf.toLowerCase().includes(query)) ||
      item.capabilities.some((cap) => cap.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manufacturers</h1>
        <p className="text-muted-foreground mt-1">EMS manufacturers and their manufacturing sites</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search manufacturers, sites, products, or capabilities..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Manufacturing Site</TableHead>
                <TableHead>Product Families</TableHead>
                <TableHead>Manufacturing Capabilities</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.manufacturer}</TableCell>
                  <TableCell>{item.site}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.productFamilies.map((product, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.capabilities.map((capability, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Products</DropdownMenuItem>
                        <DropdownMenuItem>Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
