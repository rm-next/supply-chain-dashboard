"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreVertical, Plus } from "lucide-react"
import { AssistantWorkspace } from "@/components/assistant-workspace"

export default function BOMPage() {
  const [activeTab, setActiveTab] = useState("program-commodity")
  const [commodityFilter, setCommodityFilter] = useState("all")
  const [assemblyFilter, setAssemblyFilter] = useState("all")
  const [changeFilter, setChangeFilter] = useState("all")

  // Sample data for Program-Commodity tab
  const programCommodityData = [
    {
      id: "PC-001",
      program: "Smart Speaker Gen 3",
      commodity: "Display",
      supplier: "Samsung Display",
      cost: "$12.50",
      status: "active",
    },
    {
      id: "PC-002",
      program: "Smart Speaker Gen 3",
      commodity: "Memory",
      supplier: "Micron",
      cost: "$8.20",
      status: "active",
    },
    {
      id: "PC-003",
      program: "E-Reader Pro",
      commodity: "Battery",
      supplier: "LG Chem",
      cost: "$15.30",
      status: "active",
    },
    {
      id: "PC-004",
      program: "Fitness Tracker X",
      commodity: "Sensors",
      supplier: "Bosch",
      cost: "$6.75",
      status: "pending",
    },
  ]

  // Sample data for Part tab
  const partData = [
    {
      id: "PART-001",
      partNumber: "LCD-5.5-AMOLED",
      description: '5.5" AMOLED Display',
      commodity: "Display",
      supplier: "Samsung",
      leadTime: "8 weeks",
      moq: "1000",
    },
    {
      id: "PART-002",
      partNumber: "MEM-DDR4-8GB",
      description: "8GB DDR4 Memory Module",
      commodity: "Memory",
      supplier: "Micron",
      leadTime: "6 weeks",
      moq: "500",
    },
    {
      id: "PART-003",
      partNumber: "BAT-3000MAH",
      description: "3000mAh Li-ion Battery",
      commodity: "Battery",
      supplier: "LG Chem",
      leadTime: "10 weeks",
      moq: "2000",
    },
    {
      id: "PART-004",
      partNumber: "SENS-ACCEL-6DOF",
      description: "6-DOF Accelerometer",
      commodity: "Sensors",
      supplier: "Bosch",
      leadTime: "4 weeks",
      moq: "1000",
    },
  ]

  // Sample data for Sub-Assembly tab
  const subAssemblyData = [
    {
      id: "SA-001",
      assembly: "Main PCB Assembly",
      type: "Device",
      components: 47,
      status: "approved",
      version: "v2.1",
    },
    { id: "SA-002", assembly: "Retail Box", type: "Packaging", components: 8, status: "approved", version: "v1.0" },
    { id: "SA-003", assembly: "USB-C Cable", type: "Accessory", components: 3, status: "approved", version: "v1.2" },
    { id: "SA-004", assembly: "Protective Case", type: "Packout", components: 2, status: "draft", version: "v1.0" },
  ]

  // Sample data for Change tab
  const changeData = [
    {
      id: "CHG-001",
      title: "Update display supplier",
      type: "Supplier Change",
      status: "in-progress",
      requestedBy: "John Doe",
      date: "2025-01-10",
    },
    {
      id: "CHG-002",
      title: "Add new memory module",
      type: "Component Addition",
      status: "completed",
      requestedBy: "Jane Smith",
      date: "2025-01-08",
    },
    {
      id: "CHG-003",
      title: "Remove legacy connector",
      type: "Component Removal",
      status: "created",
      requestedBy: "Mike Johnson",
      date: "2025-01-12",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bill of Materials</h1>
        <p className="text-muted-foreground mt-1">Manage product BOMs and component specifications</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 space-x-6">
          <TabsTrigger
            value="program-commodity"
            className="bg-transparent border-0 border-b-2 border-b-transparent rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
          >
            Program-Commodity
          </TabsTrigger>
          <TabsTrigger
            value="part"
            className="bg-transparent border-0 border-b-2 border-b-transparent rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
          >
            Part
          </TabsTrigger>
          <TabsTrigger
            value="sub-assembly"
            className="bg-transparent border-0 border-b-2 border-b-transparent rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
          >
            Sub-Assembly
          </TabsTrigger>
          <TabsTrigger
            value="change"
            className="bg-transparent border-0 border-b-2 border-b-transparent rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
          >
            Change
          </TabsTrigger>
          <TabsTrigger
            value="assistant"
            className="bg-transparent border-0 border-b-2 border-b-transparent rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
          >
            Assistant Workspace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="program-commodity" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search programs or commodities..." className="pl-9" />
                </div>
                <Select value={commodityFilter} onValueChange={setCommodityFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Commodities</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                    <SelectItem value="memory">Memory</SelectItem>
                    <SelectItem value="battery">Battery</SelectItem>
                    <SelectItem value="sensors">Sensors</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Commodity</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programCommodityData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.program}</TableCell>
                      <TableCell>{item.commodity}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.cost}</TableCell>
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
                            <DropdownMenuItem>Change Supplier</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="part" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search part numbers or descriptions..." className="pl-9" />
                </div>
                <Select value={commodityFilter} onValueChange={setCommodityFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Commodities</SelectItem>
                    <SelectItem value="display">Display</SelectItem>
                    <SelectItem value="memory">Memory</SelectItem>
                    <SelectItem value="battery">Battery</SelectItem>
                    <SelectItem value="sensors">Sensors</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Number</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Commodity</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead>MOQ</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.partNumber}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.commodity}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.leadTime}</TableCell>
                      <TableCell>{item.moq}</TableCell>
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
                            <DropdownMenuItem>View Suppliers</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sub-assembly" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assemblies..." className="pl-9" />
                </div>
                <Select value={assemblyFilter} onValueChange={setAssemblyFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="packout">Packout</SelectItem>
                    <SelectItem value="device">Device</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                    <SelectItem value="accessory">Accessory</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Assembly Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Components</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subAssemblyData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.assembly}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.components}</TableCell>
                      <TableCell>{item.version}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "approved" ? "default" : "secondary"}>{item.status}</Badge>
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
                            <DropdownMenuItem>View BOM</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="change" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search changes..." className="pl-9" />
                </div>
                <Select value={changeFilter} onValueChange={setChangeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Changes</SelectItem>
                    <SelectItem value="created">Created</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Change
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {changeData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : item.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.requestedBy}</TableCell>
                      <TableCell>{item.date}</TableCell>
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
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistant" className="space-y-4">
          <AssistantWorkspace />
        </TabsContent>
      </Tabs>
    </div>
  )
}
