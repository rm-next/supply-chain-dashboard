"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"

interface ProgramDetailProps {
  params: Promise<{ id: string }>
}

interface ProgramData {
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
}

// Mock data - in a real app, this would come from an API
const programsData: Record<string, ProgramData> = {
  "PRG-001": {
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
  },
  "PRG-002": {
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
  },
}

export default function ProgramDetailPage({ params }: ProgramDetailProps) {
  const router = useRouter()
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState("overview")

  const program = programsData[id]

  if (!program) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Programs
        </Button>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Program not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{program.name}</h1>
            <p className="text-muted-foreground mt-1">{program.id}</p>
          </div>
        </div>
      </div>

      <div className="border-b">
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
            Supplier Plan of Record
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "tasks"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Tasks
          </button>
        </div>
      </div>

      <div>
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Product Family</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{program.productFamily}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Number of ASINs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{program.asinCount}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">LTV</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{program.ltv}</p>
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
                      program.productTier === "Signature"
                        ? "default"
                        : program.productTier === "Core"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {program.productTier}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{program.phase}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant={
                      program.engagementModel === "High"
                        ? "default"
                        : program.engagementModel === "Medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {program.engagementModel}
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
                      style={{ width: `${program.completion}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{program.completion}%</span>
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
                {program.milestones.map((milestone, index) => (
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
              <CardTitle>Supplier Plan of Record</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Primary Supplier</p>
                  <p className="text-xl font-semibold">{program.supplierPOR}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Contract Status</p>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Lead Time</p>
                    <p className="font-semibold">8-10 weeks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "tasks" && (
          <Card>
            <CardHeader>
              <CardTitle>Program Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {program.tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{task.name}</p>
                      <p className="text-sm text-muted-foreground">Assigned to: {task.assignee}</p>
                    </div>
                    <Badge
                      variant={
                        task.status === "completed"
                          ? "default"
                          : task.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
