"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

const programsData = {
  "PRG-001": {
    id: "PRG-001",
    name: "Echo Show 15",
    productFamily: "Smart Home Audio",
    productTier: "Signature" as const,
    phase: "Mass Production",
    engagementModel: "High" as const,
    asinCount: 12,
    ltv: "$3.2M",
    completion: 92,
  },
  "PRG-002": {
    id: "PRG-002",
    name: "Kindle Paperwhite Signature",
    productFamily: "e-reader",
    productTier: "Signature" as const,
    phase: "PVT",
    engagementModel: "Medium" as const,
    asinCount: 8,
    ltv: "$2.1M",
    completion: 75,
  },
}

export default function ProgramDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const program = programsData[id as keyof typeof programsData]

  if (!program) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Programs
        </Button>
        <Card>
          <CardContent className="p-12 text-center">
            <p>Program not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{program.name}</h1>
          <p className="text-muted-foreground">{program.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Family</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{program.productFamily}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ASINs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{program.asinCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>LTV</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{program.ltv}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
