"use client"

import { useState } from "react"
import { Search, FileText, Pencil, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PartChangeNotification {
  id: string
  notificationDate: string
  source: string
  supplier: string
  documentName: string
  documentUrl: string
  impactedParts: string[]
  impactType: "Phase Out" | "Site Change" | "Packaging Change" | "Material Change" | "Process Change"
  impactedPrograms: string[]
  status: "pending" | "accepted" | "rejected" | "edited"
}

const sampleNotifications: PartChangeNotification[] = [
  {
    id: "PCN-001",
    notificationDate: "2025-01-15",
    source: "Email",
    supplier: "Texas Instruments",
    documentName: "PCN_TI_2025_Q1_PowerIC.pdf",
    documentUrl: "#",
    impactedParts: ["TPS65987DDK", "TPS65988DH", "BQ25703A"],
    impactType: "Phase Out",
    impactedPrograms: ["Kindle Paperwhite Signature", "Fire TV Stick 4K Max", "Echo Show 15"],
    status: "pending",
  },
  {
    id: "PCN-002",
    notificationDate: "2025-01-12",
    source: "Email",
    supplier: "Samsung Electronics",
    documentName: "Samsung_Display_EOL_Notice_Jan2025.pdf",
    documentUrl: "#",
    impactedParts: ["S6E3HA8", "S6E3FA9", "AMOLED-7.6-QHD"],
    impactType: "Phase Out",
    impactedPrograms: ["Fire HD 10 Plus", "Kindle Scribe"],
    status: "accepted",
  },
  {
    id: "PCN-003",
    notificationDate: "2025-01-10",
    source: "Email",
    supplier: "Qualcomm",
    documentName: "Qualcomm_SoC_Transition_Notice.pdf",
    documentUrl: "#",
    impactedParts: ["QCS605", "QCS610", "SDM660"],
    impactType: "Site Change",
    impactedPrograms: ["Fire TV Omni QLED", "Echo Show 8"],
    status: "edited",
  },
  {
    id: "PCN-004",
    notificationDate: "2025-01-08",
    source: "Email",
    supplier: "Broadcom",
    documentName: "Broadcom_WiFi_Chip_PCN_2025.pdf",
    documentUrl: "#",
    impactedParts: ["BCM43455", "BCM4356", "BCM43752"],
    impactType: "Packaging Change",
    impactedPrograms: ["eero Pro 6E", "Ring Video Doorbell Pro 2", "Blink Outdoor 4"],
    status: "pending",
  },
  {
    id: "PCN-005",
    notificationDate: "2025-01-05",
    source: "Email",
    supplier: "Micron Technology",
    documentName: "Micron_DRAM_EOL_Notification.pdf",
    documentUrl: "#",
    impactedParts: ["MT53E1G32D4NQ-046", "MT53E2G32D4NQ-046", "MT53E512M32D2NP-046"],
    impactType: "Material Change",
    impactedPrograms: ["Fire TV Stick Lite", "Echo Dot 5th Gen", "Kindle Basic"],
    status: "accepted",
  },
]

export default function PartChangeNotificationsPage() {
  const [notifications, setNotifications] = useState<PartChangeNotification[]>(sampleNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedNotification, setSelectedNotification] = useState<PartChangeNotification | null>(null)
  const [editedParts, setEditedParts] = useState<string>("")

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.impactedParts.some((part) => part.toLowerCase().includes(searchQuery.toLowerCase())) ||
      notification.impactedPrograms.some((program) => program.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAccept = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, status: "accepted" as const } : n)))
  }

  const handleReject = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, status: "rejected" as const } : n)))
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
    const notification = notifications.find((n) => n.id === id)
    if (notification) {
      setSelectedNotification(notification)
      setEditedParts(notification.impactedParts.join(", "))
    }
  }

  const handleSaveChanges = () => {
    if (selectedNotification) {
      const partsArray = editedParts
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0)

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === selectedNotification.id ? { ...n, impactedParts: partsArray, status: "edited" as const } : n,
        ),
      )
      setSelectedNotification(null)
      setEditedParts("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "edited":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactTypeColor = (impactType: string) => {
    switch (impactType) {
      case "Phase Out":
        return "bg-red-100 text-red-800"
      case "Site Change":
        return "bg-blue-100 text-blue-800"
      case "Packaging Change":
        return "bg-purple-100 text-purple-800"
      case "Material Change":
        return "bg-orange-100 text-orange-800"
      case "Process Change":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Part Change Notifications</h1>
        <p className="text-muted-foreground">
          Track and manage supplier part change notifications and their impact on programs
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-background sticky top-16 z-10 py-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by supplier, document, parts, or programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Notification Date</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Impacted Manufacturer Parts</TableHead>
              <TableHead>Impact Type</TableHead>
              <TableHead>Impacted Programs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  No part change notifications found
                </TableCell>
              </TableRow>
            ) : (
              filteredNotifications.map((notification) => (
                <TableRow key={notification.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {new Date(notification.notificationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{notification.supplier}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{notification.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={() => window.open(notification.documentUrl, "_blank")}
                    >
                      <FileText className="h-4 w-4" />
                      {notification.documentName}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {notification.impactedParts.slice(0, 2).map((part) => (
                        <Badge key={part} variant="secondary" className="text-xs">
                          {part}
                        </Badge>
                      ))}
                      {notification.impactedParts.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{notification.impactedParts.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getImpactTypeColor(notification.impactType)}>{notification.impactType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {notification.impactedPrograms.slice(0, 2).map((program) => (
                        <Badge key={program} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {notification.impactedPrograms.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{notification.impactedPrograms.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {notification.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAccept(notification.id)}
                            className="h-8 w-8 p-0"
                            title="Accept"
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReject(notification.id)}
                            className="h-8 w-8 p-0"
                            title="Reject"
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(notification.id)}
                        className="h-8 w-8 p-0"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!selectedNotification}
        onOpenChange={() => {
          setSelectedNotification(null)
          setEditedParts("")
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Part Change Notification</DialogTitle>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Supplier</label>
                <Input value={selectedNotification.supplier} readOnly className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Impact Type</label>
                <Badge className={`mt-1 ${getImpactTypeColor(selectedNotification.impactType)}`}>
                  {selectedNotification.impactType}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Impacted Manufacturer Parts</label>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Enter part numbers separated by commas</p>
                <textarea
                  value={editedParts}
                  onChange={(e) => setEditedParts(e.target.value)}
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="e.g., TPS65987DDK, TPS65988DH, BQ25703A"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Impacted Programs</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedNotification.impactedPrograms.map((program) => (
                    <Badge key={program} variant="outline">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedNotification(null)
                    setEditedParts("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
