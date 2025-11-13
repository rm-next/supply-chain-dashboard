"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Sparkles,
  ArrowUpDown,
  Search,
  Filter,
  Settings2,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Pencil,
  Plus,
  Info,
  Check,
  Loader2,
} from "lucide-react"

interface Program {
  id: string
  name: string
  productFamily: string
  productTier: "Signature" | "Core" | "Entry"
  phase: string
  engagementModel: "High" | "Medium" | "Low" | "Ultra Light" | "ODM"
  asinCount: number
  ltv: string
  completion: number
  milestones: { name: string; status: "completed" | "in-progress" | "pending"; date: string }[]
  supplierPOR: string
  tasks: { name: string; assignee: string; status: "completed" | "in-progress" | "pending" }[]
  team: { name: string; role: string; responsibility: string }[]
}

interface SupplierCommodity {
  id: string
  commodity: string
  subCommodity: string
  suppliers: { name: string; status: "A" | "C" }[]
  status: "Recommended" | "Review" | "Accepted" | "User Created"
  explanation: string
  accepted: boolean
}

const programs: Program[] = [
  {
    id: "PRG-001",
    name: "Echo Show 15",
    productFamily: "Smart Home Audio",
    productTier: "Signature",
    phase: "Mass Production",
    engagementModel: "High",
    asinCount: 12,
    ltv: "$3.2M",
    completion: 92,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-06-15" },
      { name: "BRD", status: "completed", date: "2023-08-01" },
      { name: "EVT", status: "completed", date: "2023-11-15" },
      { name: "DVT", status: "completed", date: "2024-02-01" },
      { name: "PVT", status: "completed", date: "2024-04-15" },
      { name: "Mass Production", status: "in-progress", date: "2024-06-01" },
    ],
    supplierPOR: "Foxconn - Shenzhen",
    tasks: [
      { name: "Final QA Testing", assignee: "Sarah Chen", status: "in-progress" },
      { name: "Packaging Design", assignee: "Mike Johnson", status: "completed" },
      { name: "Regulatory Approval", assignee: "Lisa Wang", status: "completed" },
      { name: "Marketing Campaign", assignee: "Jennifer Brown", status: "in-progress" },
    ],
    team: [
      {
        name: "Sarah Chen",
        role: "GCM Reviewer",
        responsibility:
          "Confirm the supplier selection at the commodity level and sourcing strategy (A, C for each supplier)",
      },
      {
        name: "Michael Rodriguez",
        role: "SQM (A-vendor) Reviewer",
        responsibility:
          "Check if A-supplier has quality issues in past and if they have the technical capability to support the project",
      },
      {
        name: "Jennifer Liu",
        role: "Factory Mfg. QM (FMQM) Reviewer",
        responsibility:
          "Check if C-supplier has quality issues in past and if they have the technical capability to support the project",
      },
      {
        name: "David Kim",
        role: "EE Lead Reviewer",
        responsibility: "Check for supplier technical capability for electrical engineering components",
      },
      {
        name: "Emily Watson",
        role: "Display Lead Reviewer",
        responsibility: "Check for supplier technical capability for display components",
      },
      {
        name: "Robert Chen",
        role: "Wireless Lead Reviewer",
        responsibility: "Check for supplier technical capability for wireless components",
      },
    ],
  },
  {
    id: "PRG-002",
    name: "Kindle Paperwhite Signature",
    productFamily: "e-reader",
    productTier: "Signature",
    phase: "PVT",
    engagementModel: "Medium",
    asinCount: 8,
    ltv: "$2.1M",
    completion: 75,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-09-01" },
      { name: "BRD", status: "completed", date: "2023-10-15" },
      { name: "EVT", status: "completed", date: "2024-01-10" },
      { name: "DVT", status: "completed", date: "2024-03-20" },
      { name: "PVT", status: "in-progress", date: "2024-05-15" },
      { name: "Mass Production", status: "pending", date: "2024-07-01" },
    ],
    supplierPOR: "E Ink - Taiwan",
    tasks: [
      { name: "Display Testing", assignee: "John Smith", status: "in-progress" },
      { name: "Battery Life Validation", assignee: "Emma Davis", status: "in-progress" },
      { name: "Software Integration", assignee: "Alex Kumar", status: "completed" },
    ],
    team: [
      {
        name: "John Smith",
        role: "Hardware Engineer",
        responsibility: "Oversee display component selection and testing.",
      },
      {
        name: "Emma Davis",
        role: "Battery Engineer",
        responsibility: "Manage battery performance and safety testing.",
      },
      {
        name: "Alex Kumar",
        role: "Software Engineer",
        responsibility: "Ensure smooth software integration and functionality.",
      },
    ],
  },
  {
    id: "PRG-003",
    name: "Echo Frames Gen 2",
    productFamily: "eyewear",
    productTier: "Core",
    phase: "DVT",
    engagementModel: "High",
    asinCount: 6,
    ltv: "$1.8M",
    completion: 65,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-10-01" },
      { name: "BRD", status: "completed", date: "2023-11-15" },
      { name: "EVT", status: "completed", date: "2024-02-01" },
      { name: "DVT", status: "in-progress", date: "2024-04-15" },
      { name: "PVT", status: "pending", date: "2024-06-01" },
      { name: "Mass Production", status: "pending", date: "2024-08-01" },
    ],
    supplierPOR: "Luxottica - Italy",
    tasks: [
      { name: "Audio Quality Testing", assignee: "David Lee", status: "in-progress" },
      { name: "Frame Design Validation", assignee: "Sophie Martin", status: "completed" },
      { name: "Battery Optimization", assignee: "Chris Anderson", status: "in-progress" },
    ],
    team: [
      {
        name: "Sophie Martin",
        role: "Industrial Designer",
        responsibility: "Lead the aesthetic and ergonomic design of the frames.",
      },
      {
        name: "Chris Anderson",
        role: "Battery Engineer",
        responsibility: "Optimize battery life and charging performance.",
      },
      { name: "Jane Doe", role: "QA Tester", responsibility: "Conduct comprehensive quality assurance tests." },
    ],
  },
  {
    id: "PRG-004",
    name: "Fire TV Stick 4K Max",
    productFamily: "streaming media player",
    productTier: "Signature",
    phase: "Mass Production",
    engagementModel: "Medium",
    asinCount: 10,
    ltv: "$2.5M",
    completion: 88,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-07-01" },
      { name: "BRD", status: "completed", date: "2023-09-15" },
      { name: "EVT", status: "completed", date: "2023-12-01" },
      { name: "DVT", status: "completed", date: "2024-01-15" },
      { name: "PVT", status: "completed", date: "2024-03-01" },
      { name: "Mass Production", status: "in-progress", date: "2024-05-01" },
    ],
    supplierPOR: "Pegatron - China",
    tasks: [
      { name: "Remote Control Pairing", assignee: "Alice Green", status: "in-progress" },
      { name: "Streaming Performance Test", assignee: "Bob White", status: "completed" },
      { name: "User Interface Update", assignee: "Charlie Black", status: "in-progress" },
    ],
    team: [
      { name: "Alice Green", role: "Product Manager", responsibility: "Oversee overall product strategy and roadmap." },
      {
        name: "Bob White",
        role: "Lead Engineer",
        responsibility: "Manage the engineering team and technical development.",
      },
      {
        name: "Charlie Black",
        role: "Supply Chain Manager",
        responsibility: "Coordinate with suppliers and manage logistics.",
      },
    ],
  },
  {
    id: "PRG-005",
    name: "Fire TV Omni QLED",
    productFamily: "TV",
    productTier: "Signature",
    phase: "EVT",
    engagementModel: "High",
    asinCount: 15,
    ltv: "$5.0M",
    completion: 50,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-11-01" },
      { name: "BRD", status: "completed", date: "2023-12-15" },
      { name: "EVT", status: "in-progress", date: "2024-03-01" },
      { name: "DVT", status: "pending", date: "2024-05-15" },
      { name: "PVT", status: "pending", date: "2024-07-01" },
      { name: "Mass Production", status: "pending", date: "2024-09-01" },
    ],
    supplierPOR: "TCL - China",
    tasks: [
      { name: "Panel Quality Check", assignee: "Diana Prince", status: "in-progress" },
      { name: "Smart TV Features Dev", assignee: "Ethan Hunt", status: "in-progress" },
      { name: "Sound System Calibration", assignee: "Fiona Glenanne", status: "pending" },
    ],
    team: [
      {
        name: "Diana Prince",
        role: "Display Engineer",
        responsibility: "Ensure optimal panel performance and color accuracy.",
      },
      { name: "Ethan Hunt", role: "Software Developer", responsibility: "Develop and integrate smart TV features." },
      { name: "Fiona Glenanne", role: "Audio Engineer", responsibility: "Calibrate and optimize the sound system." },
    ],
  },
  {
    id: "PRG-006",
    name: "Fire HD 10 Plus",
    productFamily: "tablet",
    productTier: "Core",
    phase: "Mass Production",
    engagementModel: "Medium",
    asinCount: 7,
    ltv: "$1.9M",
    completion: 95,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-08-15" },
      { name: "BRD", status: "completed", date: "2023-10-01" },
      { name: "EVT", status: "completed", date: "2024-01-15" },
      { name: "DVT", status: "completed", date: "2024-03-15" },
      { name: "PVT", status: "completed", date: "2024-05-01" },
      { name: "Mass Production", status: "in-progress", date: "2024-06-15" },
    ],
    supplierPOR: "Compal - China",
    tasks: [
      { name: "Stylus Integration Test", assignee: "George Costanza", status: "in-progress" },
      { name: "Camera Module Verification", assignee: "Helen Troy", status: "completed" },
      { name: "App Compatibility Check", assignee: "Ian Malcolm", status: "completed" },
    ],
    team: [
      {
        name: "George Costanza",
        role: "Test Engineer",
        responsibility: "Verify stylus functionality and integration.",
      },
      {
        name: "Helen Troy",
        role: "Component Engineer",
        responsibility: "Ensure camera module performance and quality.",
      },
      { name: "Ian Malcolm", role: "App Developer", responsibility: "Certify app compatibility and performance." },
    ],
  },
  {
    id: "PRG-007",
    name: "Ring Video Doorbell Pro 2",
    productFamily: "Ring",
    productTier: "Signature",
    phase: "Mass Production",
    engagementModel: "High",
    asinCount: 4,
    ltv: "$1.5M",
    completion: 90,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-09-15" },
      { name: "BRD", status: "completed", date: "2023-11-01" },
      { name: "EVT", status: "completed", date: "2024-02-15" },
      { name: "DVT", status: "completed", date: "2024-04-01" },
      { name: "PVT", status: "completed", date: "2024-05-15" },
      { name: "Mass Production", status: "in-progress", date: "2024-07-01" },
    ],
    supplierPOR: "Wistron - Taiwan",
    tasks: [
      { name: "Motion Detection Tuning", assignee: "Jane Doe", status: "in-progress" },
      { name: "Night Vision Calibration", assignee: "John Smith", status: "completed" },
      { name: "Cloud Storage Setup", assignee: "Karen Page", status: "completed" },
    ],
    team: [
      { name: "Jane Doe", role: "QA Tester", responsibility: "Test and tune motion detection sensitivity." },
      { name: "John Smith", role: "Firmware Engineer", responsibility: "Calibrate night vision and image processing." },
      { name: "Karen Page", role: "Cloud Architect", responsibility: "Ensure seamless cloud storage integration." },
    ],
  },
  {
    id: "PRG-008",
    name: "Blink Outdoor 4",
    productFamily: "Blink",
    productTier: "Core",
    phase: "PVT",
    engagementModel: "Low",
    asinCount: 3,
    ltv: "$1.2M",
    completion: 70,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-10-15" },
      { name: "BRD", status: "completed", date: "2023-12-01" },
      { name: "EVT", status: "completed", date: "2024-03-01" },
      { name: "DVT", status: "completed", date: "2024-04-15" },
      { name: "PVT", status: "in-progress", date: "2024-06-01" },
      { name: "Mass Production", status: "pending", date: "2024-08-01" },
    ],
    supplierPOR: "Arris - USA",
    tasks: [
      { name: "Battery Efficiency Test", assignee: "Leo Fitz", status: "in-progress" },
      { name: "Weatherproofing Check", assignee: "Michael Scott", status: "in-progress" },
      { name: "App Connectivity Test", assignee: "Nancy Drew", status: "completed" },
    ],
    team: [
      { name: "Leo Fitz", role: "Battery Engineer", responsibility: "Optimize battery efficiency for extended use." },
      { name: "Michael Scott", role: "Mechanical Engineer", responsibility: "Ensure weatherproofing and durability." },
      { name: "Nancy Drew", role: "App Developer", responsibility: "Test and validate app connectivity." },
    ],
  },
  {
    id: "PRG-009",
    name: "eero Pro 6E",
    productFamily: "eero",
    productTier: "Signature",
    phase: "Mass Production",
    engagementModel: "Medium",
    asinCount: 5,
    ltv: "$2.8M",
    completion: 85,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-08-01" },
      { name: "BRD", status: "completed", date: "2023-09-15" },
      { name: "EVT", status: "completed", date: "2023-12-15" },
      { name: "DVT", status: "completed", date: "2024-02-01" },
      { name: "PVT", status: "completed", date: "2024-04-01" },
      { name: "Mass Production", status: "in-progress", date: "2024-05-15" },
    ],
    supplierPOR: "Netgear - USA",
    tasks: [
      { name: "Wi-Fi 6E Performance", assignee: "Oliver Queen", status: "in-progress" },
      { name: "Mesh Network Stability", assignee: "Phoebe Buffay", status: "completed" },
      { name: "Firmware Update Process", assignee: "Quentin Coldwater", status: "in-progress" },
    ],
    team: [
      { name: "Oliver Queen", role: "Network Engineer", responsibility: "Optimize Wi-Fi 6E performance and coverage." },
      { name: "Phoebe Buffay", role: "QA Engineer", responsibility: "Test mesh network stability and reliability." },
      {
        name: "Quentin Coldwater",
        role: "Firmware Developer",
        responsibility: "Develop and test firmware update processes.",
      },
    ],
  },
  {
    id: "PRG-010",
    name: "Echo Dot Kids",
    productFamily: "Smart Home Audio",
    productTier: "Entry",
    phase: "Mass Production",
    engagementModel: "Ultra Light",
    asinCount: 2,
    ltv: "$0.8M",
    completion: 98,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2024-01-01" },
      { name: "BRD", status: "completed", date: "2024-02-15" },
      { name: "EVT", status: "completed", date: "2024-04-15" },
      { name: "DVT", status: "completed", date: "2024-05-01" },
      { name: "PVT", status: "completed", date: "2024-06-01" },
      { name: "Mass Production", status: "in-progress", date: "2024-07-01" },
    ],
    supplierPOR: "Quanta - Taiwan",
    tasks: [
      { name: "Child-Safe Mode Testing", assignee: "Rachel Green", status: "in-progress" },
      { name: "Audio Quality for Kids", assignee: "Steve Rogers", status: "completed" },
      { name: "Parental Controls Setup", assignee: "Talia al Ghul", status: "completed" },
    ],
    team: [
      {
        name: "Rachel Green",
        role: "UX Designer",
        responsibility: "Design child-friendly user interface and experience.",
      },
      {
        name: "Steve Rogers",
        role: "Audio Engineer",
        responsibility: "Ensure clear and appropriate audio quality for children.",
      },
      {
        name: "Talia al Ghul",
        role: "Software Engineer",
        responsibility: "Implement and test parental control features.",
      },
    ],
  },
  {
    id: "PRG-011",
    name: "Kindle Basic",
    productFamily: "e-reader",
    productTier: "Entry",
    phase: "End of Life",
    engagementModel: "ODM",
    asinCount: 5,
    ltv: "$0.5M",
    completion: 100,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2022-01-01" },
      { name: "BRD", status: "completed", date: "2022-03-01" },
      { name: "EVT", status: "completed", date: "2022-06-01" },
      { name: "DVT", status: "completed", date: "2022-09-01" },
      { name: "PVT", status: "completed", date: "2022-12-01" },
      { name: "Mass Production", status: "completed", date: "2023-03-01" },
    ],
    supplierPOR: "E Ink - Taiwan",
    tasks: [
      { name: "Archival Data Migration", assignee: "Ulysses Klaue", status: "completed" },
      { name: "Customer Support Handover", assignee: "Victor Stone", status: "completed" },
    ],
    team: [
      { name: "Ulysses Klaue", role: "Data Engineer", responsibility: "Manage data archival and migration." },
      { name: "Victor Stone", role: "Support Lead", responsibility: "Oversee customer support handover." },
    ],
  },
  {
    id: "PRG-012",
    name: "Fire TV Stick Lite",
    productFamily: "streaming media player",
    productTier: "Entry",
    phase: "Mass Production",
    engagementModel: "Ultra Light",
    asinCount: 6,
    ltv: "$1.3M",
    completion: 96,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2024-01-15" },
      { name: "BRD", status: "completed", date: "2024-03-01" },
      { name: "EVT", status: "completed", date: "2024-05-15" },
      { name: "DVT", status: "completed", date: "2024-06-15" },
      { name: "PVT", status: "completed", date: "2024-07-15" },
      { name: "Mass Production", status: "in-progress", date: "2024-08-01" },
    ],
    supplierPOR: "Foxconn - China",
    tasks: [
      { name: "Remote Control Battery", assignee: "Wanda Maximoff", status: "in-progress" },
      { name: "HDMI Port Testing", assignee: "Xavier Gene", status: "completed" },
      { name: "Basic Functionality Check", assignee: "Yara Flor", status: "completed" },
    ],
    team: [
      {
        name: "Wanda Maximoff",
        role: "Hardware Engineer",
        responsibility: "Investigate remote control battery performance.",
      },
      { name: "Xavier Gene", role: "Test Engineer", responsibility: "Perform HDMI port functionality tests." },
      { name: "Yara Flor", role: "Junior Developer", responsibility: "Conduct basic functionality checks." },
    ],
  },
  {
    id: "PRG-013",
    name: "Fire HD 8",
    productFamily: "tablet",
    productTier: "Entry",
    phase: "Mass Production",
    engagementModel: "Low",
    asinCount: 6,
    ltv: "$1.7M",
    completion: 94,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-09-01" },
      { name: "BRD", status: "completed", date: "2023-10-15" },
      { name: "EVT", status: "completed", date: "2024-01-15" },
      { name: "DVT", status: "completed", date: "2024-03-01" },
      { name: "PVT", status: "completed", date: "2024-04-15" },
      { name: "Mass Production", status: "in-progress", date: "2024-06-01" },
    ],
    supplierPOR: "Lenovo - China",
    tasks: [
      { name: "Touchscreen Responsiveness", assignee: "Zatanna Zatara", status: "in-progress" },
      { name: "App Store Integration", assignee: "Arthur Curry", status: "completed" },
      { name: "Charging Speed Test", assignee: "Barbara Gordon", status: "completed" },
    ],
    team: [
      { name: "Zatanna Zatara", role: "Software Engineer", responsibility: "Improve touchscreen responsiveness." },
      { name: "Arthur Curry", role: "App Developer", responsibility: "Ensure smooth app store integration." },
      { name: "Barbara Gordon", role: "QA Tester", responsibility: "Test and optimize charging speed." },
    ],
  },
  {
    id: "PRG-014",
    name: "Ring Indoor Cam",
    productFamily: "Ring",
    productTier: "Entry",
    engagementModel: "Ultra Light",
    asinCount: 3,
    ltv: "$1.0M",
    completion: 97,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2024-02-01" },
      { name: "BRD", status: "completed", date: "2024-03-15" },
      { name: "EVT", status: "completed", date: "2024-05-15" },
      { name: "DVT", status: "completed", date: "2024-06-15" },
      { name: "PVT", status: "completed", date: "2024-07-15" },
      { name: "Mass Production", status: "in-progress", date: "2024-08-01" },
    ],
    phase: "Mass Production",
    supplierPOR: "Wistron - Taiwan",
    tasks: [
      { name: "Motion Detection Sensitivity", assignee: "Bruce Wayne", status: "in-progress" },
      { name: "Audio Recording Clarity", assignee: "Clark Kent", status: "completed" },
      { name: "Wi-Fi Connectivity Strength", assignee: "Diana Prince", status: "completed" },
    ],
    team: [
      {
        name: "Bruce Wayne",
        role: "Security Engineer",
        responsibility: "Enhance motion detection accuracy and sensitivity.",
      },
      {
        name: "Clark Kent",
        role: "Audio Engineer",
        responsibility: "Improve audio recording clarity and reduce noise.",
      },
      {
        name: "Diana Prince",
        role: "Network Engineer",
        responsibility: "Strengthen Wi-Fi connectivity and signal strength.",
      },
    ],
  },
  {
    id: "PRG-015",
    name: "Echo Power Adapter",
    productFamily: "Accessory",
    productTier: "Entry",
    phase: "Mass Production",
    engagementModel: "ODM",
    asinCount: 1,
    ltv: "$0.3M",
    completion: 100,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-05-01" },
      { name: "BRD", status: "completed", date: "2023-06-15" },
      { name: "EVT", status: "completed", date: "2023-09-01" },
      { name: "DVT", status: "completed", date: "2023-10-15" },
      { name: "PVT", status: "completed", date: "2023-11-15" },
      { name: "Mass Production", status: "completed", date: "2023-12-15" },
    ],
    supplierPOR: "Salcomp - China",
    tasks: [
      { name: "Safety Certification", assignee: "Diana Prince", status: "completed" },
      { name: "Power Output Test", assignee: "Ethan Hunt", status: "completed" },
    ],
    team: [
      {
        name: "Diana Prince",
        role: "Compliance Engineer",
        responsibility: "Ensure all safety certifications are met.",
      },
      { name: "Ethan Hunt", role: "Electrical Engineer", responsibility: "Verify power output and efficiency." },
    ],
  },
  {
    id: "PRG-016",
    name: "Blink Mini",
    productFamily: "Blink",
    productTier: "Entry",
    phase: "Mass Production",
    engagementModel: "Ultra Light",
    asinCount: 2,
    ltv: "$0.9M",
    completion: 98,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2024-03-01" },
      { name: "BRD", status: "completed", date: "2024-04-15" },
      { name: "EVT", status: "completed", date: "2024-06-15" },
      { name: "DVT", status: "completed", date: "2024-07-15" },
      { name: "PVT", status: "completed", date: "2024-08-15" },
      { name: "Mass Production", status: "in-progress", date: "2024-09-01" },
    ],
    supplierPOR: "Arris - USA",
    tasks: [
      { name: "Video Streaming Quality", assignee: "Fiona Glenanne", status: "in-progress" },
      { name: "Motion Detection Range", assignee: "George Costanza", status: "completed" },
      { name: "App Syncing Test", assignee: "Helen Troy", status: "completed" },
    ],
    team: [
      {
        name: "Fiona Glenanne",
        role: "QA Engineer",
        responsibility: "Assess video streaming quality and performance.",
      },
      { name: "George Costanza", role: "Test Engineer", responsibility: "Verify motion detection range and accuracy." },
      { name: "Helen Troy", role: "Software Engineer", responsibility: "Ensure reliable app syncing." },
    ],
  },
  {
    id: "PRG-017",
    name: "eero 6",
    productFamily: "eero",
    productTier: "Core",
    phase: "Mass Production",
    engagementModel: "Medium",
    asinCount: 4,
    ltv: "$2.0M",
    completion: 86,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-09-15" },
      { name: "BRD", status: "completed", date: "2023-11-01" },
      { name: "EVT", status: "completed", date: "2024-02-01" },
      { name: "DVT", status: "completed", date: "2024-03-15" },
      { name: "PVT", status: "completed", date: "2024-05-01" },
      { name: "Mass Production", status: "in-progress", date: "2024-06-15" },
    ],
    supplierPOR: "Netgear - USA",
    tasks: [
      { name: "Wi-Fi 6 Performance", assignee: "Ian Malcolm", status: "in-progress" },
      { name: "Network Configuration", assignee: "Jane Doe", status: "completed" },
      { name: "Firmware Stability", assignee: "John Smith", status: "in-progress" },
    ],
    team: [
      { name: "Ian Malcolm", role: "Network Engineer", responsibility: "Optimize Wi-Fi 6 performance and throughput." },
      { name: "Jane Doe", role: "QA Engineer", responsibility: "Test network configuration and setup." },
      { name: "John Smith", role: "Firmware Engineer", responsibility: "Ensure firmware stability and reliability." },
    ],
  },
  {
    id: "PRG-018",
    name: "Fire TV 4-Series",
    productFamily: "TV",
    productTier: "Core",
    phase: "PVT",
    engagementModel: "Medium",
    asinCount: 12,
    ltv: "$4.5M",
    completion: 60,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-12-01" },
      { name: "BRD", status: "completed", date: "2024-01-15" },
      { name: "EVT", status: "completed", date: "2024-04-01" },
      { name: "DVT", status: "completed", date: "2024-05-15" },
      { name: "PVT", status: "in-progress", date: "2024-07-01" },
      { name: "Mass Production", status: "pending", date: "2024-09-01" },
    ],
    supplierPOR: "TCL - China",
    tasks: [
      { name: "Picture Quality Adjustment", assignee: "Karen Page", status: "in-progress" },
      { name: "Remote Functionality", assignee: "Leo Fitz", status: "in-progress" },
      { name: "Smart Hub Integration", assignee: "Michael Scott", status: "pending" },
    ],
    team: [
      { name: "Karen Page", role: "Display Engineer", responsibility: "Adjust and optimize picture quality settings." },
      { name: "Leo Fitz", role: "QA Engineer", responsibility: "Test remote control functionality." },
      { name: "Michael Scott", role: "Software Engineer", responsibility: "Integrate smart hub features." },
    ],
  },
  {
    id: "PRG-019",
    name: "Echo Buds Gen 3",
    productFamily: "Accessory",
    productTier: "Core",
    phase: "BRD",
    engagementModel: "High",
    asinCount: 3,
    ltv: "$1.1M",
    completion: 25,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2024-04-01" },
      { name: "BRD", status: "in-progress", date: "2024-06-01" },
      { name: "EVT", status: "pending", date: "2024-09-01" },
      { name: "DVT", status: "pending", date: "2024-11-01" },
      { name: "PVT", status: "pending", date: "2025-01-01" },
      { name: "Mass Production", status: "pending", date: "2025-03-01" },
    ],
    supplierPOR: "Salcomp - China",
    tasks: [
      { name: "Audio Driver Development", assignee: "Nancy Drew", status: "in-progress" },
      { name: "Noise Cancellation Tuning", assignee: "Oliver Queen", status: "pending" },
      { name: "Battery Charging Circuit", assignee: "Phoebe Buffay", status: "pending" },
    ],
    team: [
      { name: "Nancy Drew", role: "Audio Engineer", responsibility: "Develop and refine audio drivers." },
      { name: "Oliver Queen", role: "Acoustic Engineer", responsibility: "Tune noise cancellation performance." },
      {
        name: "Phoebe Buffay",
        role: "Hardware Engineer",
        responsibility: "Design and test the battery charging circuit.",
      },
    ],
  },
  {
    id: "PRG-020",
    name: "Kindle Scribe",
    productFamily: "e-reader",
    productTier: "Signature",
    phase: "Mass Production",
    engagementModel: "High",
    asinCount: 9,
    ltv: "$2.9M",
    completion: 80,
    milestones: [
      { name: "Product Assessment", status: "completed", date: "2023-10-01" },
      { name: "BRD", status: "completed", date: "2023-11-15" },
      { name: "EVT", status: "completed", date: "2024-02-15" },
      { name: "DVT", status: "completed", date: "2024-04-01" },
      { name: "PVT", status: "completed", date: "2024-05-15" },
      { name: "Mass Production", status: "in-progress", date: "2024-07-01" },
    ],
    supplierPOR: "E Ink - Taiwan",
    tasks: [
      { name: "E-Ink Display Latency", assignee: "Quentin Coldwater", status: "in-progress" },
      { name: "Stylus Precision Test", assignee: "Rachel Green", status: "completed" },
      { name: "Note-taking Feature Integration", assignee: "Steve Rogers", status: "in-progress" },
    ],
    team: [
      { name: "Quentin Coldwater", role: "Firmware Engineer", responsibility: "Optimize E-Ink display latency." },
      { name: "Rachel Green", role: "UX Designer", responsibility: "Ensure stylus precision and user experience." },
      { name: "Steve Rogers", role: "Software Engineer", responsibility: "Integrate note-taking features." },
    ],
  },
]

const commodityOptions = [
  "Electronics",
  "Power",
  "Packaging",
  "Display",
  "Battery",
  "PCB",
  "Optics",
  "Audio",
  "Camera Module",
  "Wireless",
  "Housing",
]

const subCommodityOptions: Record<string, string[]> = {
  Electronics: ["Main PCB", "Flex PCB", "Control Board"],
  Power: ["Power Supply", "AC Adapter", "Battery Charger"],
  Packaging: ["Retail Box", "Inner Tray", "Protective Film"],
  Display: ["E-Ink Display", "LCD Panel", "OLED Screen"],
  Battery: ["Li-ion Battery", "Li-polymer Battery", "Battery Pack"],
  PCB: ["Main Board", "Daughter Board", "Interface Board"],
  Optics: ["Lens Assembly", "Optical Filter", "Prism"],
  Audio: ["Micro Speakers", "Audio Codec", "Amplifier"],
  "Camera Module": ["HD Camera", "IR Camera", "Wide Angle Lens"],
  Wireless: ["Wi-Fi Module", "Bluetooth Module", "NFC Chip"],
  Housing: ["Weatherproof Enclosure", "Plastic Housing", "Metal Frame"],
}

const supplierOptions = [
  "Foxconn",
  "Flex",
  "Jabil",
  "Pegatron",
  "Compal",
  "Wistron",
  "Quanta",
  "E Ink Holdings",
  "Plastic Logic",
  "ATL",
  "Samsung SDI",
  "Luxottica",
  "Essilor",
  "Knowles",
  "GoerTek",
  "Varta",
  "Panasonic",
  "Sony",
  "OmniVision",
  "Broadcom",
  "Qualcomm",
  "Delta Electronics",
  "Lite-On",
  "DS Smith",
  "Smurfit Kappa",
  "TCL",
  "Netgear",
  "Arris",
  "Salcomp",
  "Lenovo",
]

export default function ProgramPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [filters, setFilters] = useState({
    productFamily: [] as string[],
    productTier: [] as string[],
    phase: [] as string[],
    engagementModel: [] as string[],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [supplierCommodities, setSupplierCommodities] = useState<SupplierCommodity[]>([])
  const [isRecommending, setIsRecommending] = useState(false)
  const [recommendationStep, setRecommendationStep] = useState(0)
  const [editingRow, setEditingRow] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<SupplierCommodity>>({})

  useEffect(() => {
    const event = new CustomEvent("setModuleName", { detail: { moduleName: "Programs" } })
    window.dispatchEvent(event)
  }, [])

  const columns = useMemo<ColumnDef<Program>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Program Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "productFamily",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Product Family
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("productFamily")}</div>,
      },
      {
        accessorKey: "productTier",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Product Tier
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const tier = row.getValue("productTier") as string
          return (
            <Badge variant={tier === "Signature" ? "default" : tier === "Core" ? "secondary" : "outline"}>{tier}</Badge>
          )
        },
      },
      {
        accessorKey: "phase",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Phase
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("phase")}</div>,
      },
      {
        accessorKey: "engagementModel",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Engagement Model
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const model = row.getValue("engagementModel") as string
          return (
            <Badge variant={model === "High" ? "default" : model === "Medium" ? "secondary" : "outline"}>{model}</Badge>
          )
        },
      },
      // Add new columns for ASIN Count, LTV, Completion
      {
        accessorKey: "asinCount",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              ASIN Count
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("asinCount")}</div>,
      },
      {
        accessorKey: "ltv",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              LTV
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("ltv")}</div>,
      },
      {
        accessorKey: "completion",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              Completion
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${row.getValue("completion")}%` }}
              />
            </div>
            <span className="text-sm font-medium">{row.getValue("completion")}%</span>
          </div>
        ),
      },
    ],
    [],
  )

  const filteredData = useMemo(() => {
    return programs.filter((program) => {
      if (filters.productFamily.length > 0 && !filters.productFamily.includes(program.productFamily)) return false
      if (filters.productTier.length > 0 && !filters.productTier.includes(program.productTier)) return false
      if (filters.phase.length > 0 && !filters.phase.includes(program.phase)) return false
      if (filters.engagementModel.length > 0 && !filters.engagementModel.includes(program.engagementModel)) return false
      return true
    })
  }, [filters])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
  })

  const handleRowClick = (program: Program) => {
    setSelectedProgram(program)
    setActiveTab("overview")
    setIsModalOpen(true)
  }

  const productFamilies = Array.from(new Set(programs.map((p) => p.productFamily)))
  const productTiers = ["Signature", "Core", "Entry"]
  const phases = Array.from(new Set(programs.map((p) => p.phase)))
  const engagementModels = ["High", "Medium", "Low", "Ultra Light", "ODM"]

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      productFamily: [],
      productTier: [],
      phase: [],
      engagementModel: [],
    })
  }

  const activeFilterCount =
    filters.productFamily.length + filters.productTier.length + filters.phase.length + filters.engagementModel.length

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const handleRecommend = async () => {
    setIsRecommending(true)
    setRecommendationStep(0)

    const steps = [
      "Matching historical programs and commodities...",
      "Analyzing past supplier performance...",
      "Evaluating risks...",
    ]

    for (let i = 0; i < steps.length; i++) {
      setRecommendationStep(i)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Generate recommendations based on product family
    const recommendations: SupplierCommodity[] = generateRecommendations(selectedProgram?.productFamily || "")

    setSupplierCommodities(recommendations)
    setIsRecommending(false)
    setRecommendationStep(0)
  }

  const generateRecommendations = (productFamily: string): SupplierCommodity[] => {
    const baseRecommendations: Record<string, SupplierCommodity[]> = {
      "e-reader": [
        {
          id: "1",
          commodity: "Display",
          subCommodity: "E-Ink Display",
          suppliers: [
            { name: "E Ink Holdings", status: "A" },
            { name: "Plastic Logic", status: "A" },
          ],
          status: "Recommended",
          explanation:
            "E Ink Holdings selected based on 98% on-time delivery rate and proven track record with similar e-reader programs. Direct management recommended due to critical component nature.",
          accepted: false,
        },
        {
          id: "2",
          commodity: "Battery",
          subCommodity: "Li-ion Battery",
          suppliers: [
            { name: "ATL", status: "C" },
            { name: "Samsung SDI", status: "C" },
          ],
          status: "Recommended",
          explanation:
            "ATL recommended through EMS partner due to existing relationship and volume pricing. Historical data shows 95% quality pass rate.",
          accepted: false,
        },
        {
          id: "3",
          commodity: "PCB",
          subCommodity: "Main Board",
          suppliers: [
            { name: "Foxconn", status: "C" },
            { name: "Pegatron", status: "C" },
          ],
          status: "Recommended",
          explanation:
            "Foxconn managed by EMS partner with established supply chain. Low risk profile based on 3+ years of collaboration.",
          accepted: false,
        },
      ],
      eyewear: [
        {
          id: "1",
          commodity: "Optics",
          subCommodity: "Lens Assembly",
          suppliers: [
            { name: "Luxottica", status: "A" },
            { name: "Essilor", status: "A" },
          ],
          status: "Recommended",
          explanation:
            "Luxottica selected for premium quality and brand alignment. Direct management critical for design specifications and quality control.",
          accepted: false,
        },
        {
          id: "2",
          commodity: "Audio",
          subCommodity: "Micro Speakers",
          suppliers: [
            { name: "Knowles", status: "A" },
            { name: "GoerTek", status: "A" },
          ],
          status: "Recommended",
          explanation:
            "Knowles recommended based on superior audio quality metrics and 99% defect-free rate in similar wearable programs.",
          accepted: false,
        },
        {
          id: "3",
          commodity: "Battery",
          subCommodity: "Li-polymer Battery",
          suppliers: [
            { name: "Varta", status: "C" },
            { name: "Panasonic", status: "C" },
          ],
          status: "Recommended",
          explanation:
            "Varta through EMS partner for cost optimization. Historical performance shows 96% quality compliance.",
          accepted: false,
        },
      ],
      Ring: [
        {
          id: "1",
          commodity: "Camera Module",
          subCommodity: "HD Camera",
          suppliers: [
            { name: "Sony", status: "A" },
            { name: "OmniVision", status: "A" },
          ],
          status: "Recommended",
          explanation:
            "Sony selected for superior low-light performance and reliability. Direct management ensures quality standards for security applications.",
          accepted: false,
        },
        {
          id: "2",
          commodity: "Wireless",
          subCommodity: "Wi-Fi Module",
          suppliers: [
            { name: "Broadcom", status: "C" },
            { name: "Qualcomm", status: "C" },
          ],
          status: "Recommended",
          explanation:
            "Broadcom through EMS partner with proven connectivity performance. Risk assessment shows low supply chain disruption probability.",
          accepted: false,
        },
        {
          id: "3",
          commodity: "Housing",
          subCommodity: "Weatherproof Enclosure",
          suppliers: [
            { name: "Jabil", status: "C" },
            { name: "Flex", status: "C" },
          ],
          status: "Recommended",
          explanation:
            "Jabil managed by EMS with IP65 certification expertise. Historical data shows 97% first-pass yield.",
          accepted: false,
        },
      ],
      default: [
        {
          id: "1",
          commodity: "Electronics",
          subCommodity: "Main PCB",
          suppliers: [
            { name: "Foxconn", status: "C" },
            { name: "Flex", status: "C" },
          ],
          status: "Recommended",
          explanation:
            "Foxconn recommended through EMS partner based on capacity and cost efficiency. Historical performance shows 94% on-time delivery.",
          accepted: false,
        },
        {
          id: "2",
          commodity: "Power",
          subCommodity: "Power Supply",
          suppliers: [
            { name: "Delta Electronics", status: "C" },
            { name: "Lite-On", status: "C" },
          ],
          status: "Recommended",
          explanation: "Delta Electronics through EMS with strong efficiency ratings and compliance certifications.",
          accepted: false,
        },
        {
          id: "3",
          commodity: "Packaging",
          subCommodity: "Retail Box",
          suppliers: [
            { name: "DS Smith", status: "A" },
            { name: "Smurfit Kappa", status: "A" },
          ],
          status: "Recommended",
          explanation: "DS Smith for direct management of brand presentation and sustainability requirements.",
          accepted: false,
        },
      ],
    }

    return baseRecommendations[productFamily] || baseRecommendations["default"]
  }

  const startEditing = (row: SupplierCommodity) => {
    setEditingRow(row.id)
    setEditValues(row)
  }

  const saveEdit = () => {
    if (editingRow) {
      setSupplierCommodities((prev) => prev.map((item) => (item.id === editingRow ? { ...item, ...editValues } : item)))
      setEditingRow(null)
      setEditValues({})
    }
  }

  const cancelEdit = () => {
    setEditingRow(null)
    setEditValues({})
  }

  const acceptRow = (id: string) => {
    setSupplierCommodities((prev) =>
      prev.map((item) => (item.id === id ? { ...item, accepted: true, status: "Accepted" } : item)),
    )
  }

  const acceptAll = () => {
    setSupplierCommodities((prev) => prev.map((item) => ({ ...item, accepted: true, status: "Accepted" })))
  }

  const addNewRow = () => {
    const newRow: SupplierCommodity = {
      id: Date.now().toString(),
      commodity: "",
      subCommodity: "",
      suppliers: [],
      status: "User Created",
      explanation: "Manually added supplier-commodity entry",
      accepted: false,
    }
    setSupplierCommodities((prev) => [...prev, newRow])
    startEditing(newRow)
  }

  const addSupplier = (supplierName: string) => {
    const currentSuppliers = editValues.suppliers || []
    if (!currentSuppliers.find((s) => s.name === supplierName)) {
      setEditValues({
        ...editValues,
        suppliers: [...currentSuppliers, { name: supplierName, status: "A" }],
      })
    }
  }

  const removeSupplier = (supplierName: string) => {
    const currentSuppliers = editValues.suppliers || []
    setEditValues({
      ...editValues,
      suppliers: currentSuppliers.filter((s) => s.name !== supplierName),
    })
  }

  const toggleSupplierStatus = (supplierName: string) => {
    const currentSuppliers = editValues.suppliers || []
    setEditValues({
      ...editValues,
      suppliers: currentSuppliers.map((s) =>
        s.name === supplierName ? { ...s, status: s.status === "A" ? "C" : "A" } : s,
      ),
    })
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-[73px] z-20 bg-background pb-4 pt-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className="px-6 pt-6">
                  <SheetTitle>Filter Programs</SheetTitle>
                  <SheetDescription>Select filters to narrow down your program list</SheetDescription>
                </SheetHeader>
                <div className="px-6 py-6 space-y-6">
                  {activeFilterCount > 0 && (
                    <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full bg-transparent">
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Product Family</Label>
                      <div className="space-y-3">
                        {productFamilies.map((family) => (
                          <div key={family} className="flex items-center space-x-3">
                            <Checkbox
                              id={`family-${family}`}
                              checked={filters.productFamily.includes(family)}
                              onCheckedChange={() => toggleFilter("productFamily", family)}
                            />
                            <label
                              htmlFor={`family-${family}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {family}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Product Tier</Label>
                      <div className="space-y-3">
                        {productTiers.map((tier) => (
                          <div key={tier} className="flex items-center space-x-3">
                            <Checkbox
                              id={`tier-${tier}`}
                              checked={filters.productTier.includes(tier)}
                              onCheckedChange={() => toggleFilter("productTier", tier)}
                            />
                            <label
                              htmlFor={`tier-${tier}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {tier}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Phase</Label>
                      <div className="space-y-3">
                        {phases.map((phase) => (
                          <div key={phase} className="flex items-center space-x-3">
                            <Checkbox
                              id={`phase-${phase}`}
                              checked={filters.phase.includes(phase)}
                              onCheckedChange={() => toggleFilter("phase", phase)}
                            />
                            <label
                              htmlFor={`phase-${phase}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {phase}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Engagement Model</Label>
                      <div className="space-y-3">
                        {engagementModels.map((model) => (
                          <div key={model} className="flex items-center space-x-3">
                            <Checkbox
                              id={`model-${model}`}
                              checked={filters.engagementModel.includes(model)}
                              onCheckedChange={() => toggleFilter("engagementModel", model)}
                            />
                            <label
                              htmlFor={`model-${model}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {model}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Add New Program
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id === "name"
                          ? "Program Name"
                          : column.id === "productFamily"
                            ? "Product Family"
                            : column.id === "productTier"
                              ? "Product Tier"
                              : column.id === "engagementModel"
                                ? "Engagement Model"
                                : column.id === "asinCount"
                                  ? "ASIN Count"
                                  : column.id === "ltv"
                                    ? "LTV"
                                    : column.id === "completion"
                                      ? "Completion"
                                      : column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
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
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="!max-w-[95vw] w-[95vw] h-[95vh] !max-h-[95vh] p-0 gap-0 flex flex-col">
          {selectedProgram && (
            <div className="flex flex-col h-full w-full">
              <div className="border-b px-6 py-4">
                <h2 className="text-2xl font-bold">{selectedProgram.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedProgram.id}</p>
              </div>

              <div className="border-b px-6">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "overview"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("milestones")}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "milestones"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Milestones
                  </button>
                  <button
                    onClick={() => setActiveTab("supplier")}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "supplier"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Supplier-Commodity Plan
                  </button>
                  <button
                    onClick={() => setActiveTab("team")}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "team"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Team
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Product Family</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold">{selectedProgram.productFamily}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Number of ASINs</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold">{selectedProgram.asinCount}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">LTV</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold">{selectedProgram.ltv}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Product Tier</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge
                            variant={
                              selectedProgram.productTier === "Signature"
                                ? "default"
                                : selectedProgram.productTier === "Core"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {selectedProgram.productTier}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Phase</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold">{selectedProgram.phase}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Model</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge
                            variant={
                              selectedProgram.engagementModel === "High"
                                ? "default"
                                : selectedProgram.engagementModel === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {selectedProgram.engagementModel}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Completion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-3">
                            <div
                              className="bg-primary rounded-full h-3 transition-all"
                              style={{ width: `${selectedProgram.completion}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{selectedProgram.completion}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "milestones" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedProgram.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getMilestoneIcon(milestone.status)}
                              <div>
                                <p className="font-medium">{milestone.name}</p>
                                <p className="text-sm text-muted-foreground">{milestone.date}</p>
                              </div>
                            </div>
                            <Badge
                              variant={
                                milestone.status === "completed"
                                  ? "default"
                                  : milestone.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {milestone.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "supplier" && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Supplier-Commodity Plan</CardTitle>
                        {supplierCommodities.length > 0 && (
                          <div className="flex gap-2">
                            {!supplierCommodities.every((item) => item.accepted) && (
                              <Button onClick={acceptAll} variant="default" size="sm">
                                <Check className="h-4 w-4 mr-2" />
                                Accept All
                              </Button>
                            )}
                            <Button onClick={addNewRow} variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Row
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isRecommending && (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <div className="text-center space-y-2">
                            <p className="text-sm font-medium">
                              {recommendationStep === 0 && "Matching historical programs and commodities..."}
                              {recommendationStep === 1 && "Analyzing past supplier performance..."}
                              {recommendationStep === 2 && "Evaluating risks..."}
                            </p>
                            <div className="flex gap-2 justify-center">
                              <div
                                className={`h-2 w-2 rounded-full ${recommendationStep >= 0 ? "bg-primary" : "bg-muted"}`}
                              />
                              <div
                                className={`h-2 w-2 rounded-full ${recommendationStep >= 1 ? "bg-primary" : "bg-muted"}`}
                              />
                              <div
                                className={`h-2 w-2 rounded-full ${recommendationStep >= 2 ? "bg-primary" : "bg-muted"}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {!isRecommending && supplierCommodities.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                          <p className="text-muted-foreground">
                            No supplier-commodity plan yet. Click "Recommend" to generate recommendations.
                          </p>
                          <Button onClick={handleRecommend} className="gap-2">
                            <Sparkles className="h-4 w-4" />
                            Recommend
                          </Button>
                        </div>
                      )}

                      {!isRecommending && supplierCommodities.length > 0 && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Commodity</TableHead>
                              <TableHead>Sub-Commodity</TableHead>
                              <TableHead>Supplier List</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {supplierCommodities.map((item) => (
                              <TableRow key={item.id} className={item.accepted ? "bg-green-50" : ""}>
                                <TableCell>
                                  {editingRow === item.id ? (
                                    <Select
                                      value={editValues.commodity || ""}
                                      onValueChange={(value) =>
                                        setEditValues({ ...editValues, commodity: value, subCommodity: "" })
                                      }
                                    >
                                      <SelectTrigger className="h-8">
                                        <SelectValue placeholder="Select commodity" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {commodityOptions.map((option) => (
                                          <SelectItem key={option} value={option}>
                                            {option}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    item.commodity
                                  )}
                                </TableCell>
                                <TableCell>
                                  {editingRow === item.id ? (
                                    <Select
                                      value={editValues.subCommodity || ""}
                                      onValueChange={(value) => setEditValues({ ...editValues, subCommodity: value })}
                                      disabled={!editValues.commodity}
                                    >
                                      <SelectTrigger className="h-8">
                                        <SelectValue placeholder="Select sub-commodity" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {editValues.commodity &&
                                          subCommodityOptions[editValues.commodity]?.map((option) => (
                                            <SelectItem key={option} value={option}>
                                              {option}
                                            </SelectItem>
                                          ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    item.subCommodity
                                  )}
                                </TableCell>
                                <TableCell>
                                  {editingRow === item.id ? (
                                    <div className="space-y-2">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-full justify-start bg-transparent"
                                          >
                                            <Plus className="h-3 w-3 mr-2" />
                                            Add Supplier
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0" align="start">
                                          <Command>
                                            <CommandInput placeholder="Search suppliers..." />
                                            <CommandList>
                                              <CommandEmpty>No supplier found.</CommandEmpty>
                                              <CommandGroup>
                                                {supplierOptions.map((supplier) => (
                                                  <CommandItem key={supplier} onSelect={() => addSupplier(supplier)}>
                                                    {supplier}
                                                  </CommandItem>
                                                ))}
                                              </CommandGroup>
                                            </CommandList>
                                          </Command>
                                        </PopoverContent>
                                      </Popover>
                                      <div className="flex flex-wrap gap-1">
                                        {editValues.suppliers?.map((supplier, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-center gap-1 bg-muted rounded-md px-2 py-1"
                                          >
                                            <span className="text-sm">{supplier.name}</span>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-4 w-4 p-0"
                                              onClick={() => toggleSupplierStatus(supplier.name)}
                                            >
                                              <Badge
                                                variant={supplier.status === "A" ? "default" : "secondary"}
                                                className="h-4 px-1 text-[10px]"
                                              >
                                                {supplier.status}
                                              </Badge>
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-4 w-4 p-0"
                                              onClick={() => removeSupplier(supplier.name)}
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-wrap gap-1">
                                      {item.suppliers.map((supplier, idx) => (
                                        <div key={idx} className="flex items-center gap-1">
                                          <Badge variant="outline">{supplier.name}</Badge>
                                          <Badge
                                            variant={supplier.status === "A" ? "default" : "secondary"}
                                            className="h-5 px-1.5 text-[10px]"
                                          >
                                            {supplier.status}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {editingRow === item.id ? (
                                    <div className="text-sm text-muted-foreground">
                                      {editValues.suppliers?.every((s) => s.status === "A")
                                        ? "All Direct"
                                        : editValues.suppliers?.every((s) => s.status === "C")
                                          ? "All EMS Partner"
                                          : "Mixed"}
                                    </div>
                                  ) : (
                                    <Badge
                                      variant={
                                        item.status === "Accepted"
                                          ? "default"
                                          : item.status === "Recommended"
                                            ? "secondary"
                                            : "outline"
                                      }
                                    >
                                      {item.status}
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {editingRow === item.id ? (
                                      <>
                                        <Button size="icon" variant="ghost" onClick={saveEdit} className="h-8 w-8">
                                          <Check className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" onClick={cancelEdit} className="h-8 w-8">
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          size="icon"
                                          variant="ghost"
                                          onClick={() => startEditing(item)}
                                          className="h-8 w-8"
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button size="icon" variant="ghost" className="h-8 w-8">
                                              <Info className="h-4 w-4" />
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-80">
                                            <div className="space-y-2">
                                              <h4 className="font-semibold text-sm">Recommendation Explanation</h4>
                                              <p className="text-sm text-muted-foreground">{item.explanation}</p>
                                            </div>
                                          </PopoverContent>
                                        </Popover>
                                        {!item.accepted && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => acceptRow(item.id)}
                                            className="h-8"
                                          >
                                            Accept
                                          </Button>
                                        )}
                                        {item.accepted && (
                                          <Badge variant="default" className="h-8">
                                            <Check className="h-3 w-3 mr-1" />
                                            Accepted
                                          </Badge>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                )}

                {activeTab === "team" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Program Team & Reviewers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="w-[250px]">Role</TableHead>
                            <TableHead>Responsibility</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedProgram.team.map((member, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{member.role}</Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">{member.responsibility}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
