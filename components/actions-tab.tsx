"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRole } from "@/hooks/use-role"
import { AlertCircle, CheckCircle2, Clock, Check, Pencil, HelpCircle, Bot, User, Database, GitBranch } from 'lucide-react'
import { useEffect, useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Action {
  id: string
  title: string
  description: string
  status: "recommendation" | "approved" | "in-progress" | "complete"
  priority: "high" | "medium" | "low"
  agent: string
  contributingAgents?: string[]
  roles: string[]
  timestamp?: string // Added timestamp interface
  approvedTimestamp?: string // Added approvedTimestamp field
  program?: {
    name: string
    streetDate: string
    features?: string
    image?: string
  }
}

interface TimelineStep {
  type: "agent" | "human" | "data" | "decision"
  timestamp: string
  actor: string
  action: string
  details: string
  icon?: "bot" | "user" | "database" | "branch"
}

interface ExplainabilityData {
  actionId: string
  timeline: TimelineStep[]
}

const actions: Action[] = [
  {
    id: "34",
    title: "Create Supplier Plan of Record for Fire SMP Horizon streaming media player", // Renamed from Echo Horizon to Fire SMP Horizon
    description:
      "New product launch requires comprehensive supplier qualification and capacity planning. Recommend creating SPOR covering 18 suppliers across electronics, mechanical components, and packaging for Aug 2026 production ramp.",
    status: "recommendation",
    priority: "high",
    agent: "Program Agent", // Changed primary agent to Program Agent
    contributingAgents: ["Supplier Management Agent", "Commodity Agent"], // Added contributing agents
    roles: ["Material Program Mgr"],
    timestamp: "2025-01-14 09:30 AM", // Added timestamp to recommendations
  },
  {
    id: "1",
    title: "Approve alternate supplier for capacitor shortage",
    description:
      "Component C2847 is facing 4-week delay. Recommend qualifying alternate supplier with 1-week lead time.",
    status: "recommendation",
    priority: "high",
    agent: "Supplier Management Agent",
    roles: ["Material Manager", "Material Program Mgr"],
    timestamp: "2025-01-15 12:00 PM",
  },
  {
    id: "2",
    title: "Adjust production plan for Q2 tablet demand spike",
    description: "Demand forecast shows 25% increase. Recommend increasing CM capacity allocation by 15K units/week.",
    status: "recommendation",
    priority: "high",
    agent: "Supply Planning Agent",
    roles: ["Supply Planner", "Sustaining Ops Program Mgr"],
    timestamp: "2025-01-10 04:00 PM",
  },
  {
    id: "3",
    title: "Optimize shipping route for EU fulfillment",
    description: "Current route has 3-day delay. Alternative route saves 2 days and $12K in freight costs.",
    status: "recommendation",
    priority: "medium",
    agent: "Logistics Agent",
    roles: ["Logistics Planner"],
    timestamp: "2025-01-13 02:15 PM",
  },
  {
    id: "4",
    title: "Review BOM cost reduction opportunities",
    description: "Identified 8 components with 15% cost reduction potential through supplier consolidation.",
    status: "recommendation",
    priority: "medium",
    agent: "PLM Agent",
    roles: ["Material Program Mgr", "Global Commodity Manager"],
    timestamp: "2025-01-12 11:45 AM",
  },
  {
    id: "5",
    title: "Expedite shipment for critical component shortage",
    description: "Arranging air freight for IC chips to prevent production line stoppage.",
    status: "in-progress",
    priority: "high",
    agent: "Logistics Agent",
    roles: ["Supply Planner", "Material Manager"],
    timestamp: "2025-01-11 08:30 AM", // Added timestamp to in-progress items
  },
  {
    id: "6",
    title: "Negotiate Q3 pricing with display panel supplier",
    description: "Working with supplier to lock in 8% volume discount for next quarter.",
    status: "in-progress",
    priority: "medium",
    agent: "Supplier Management Agent",
    roles: ["Global Commodity Manager", "Material Program Mgr"],
    timestamp: "2025-01-09 10:00 AM",
  },
  {
    id: "7",
    title: "Qualified secondary PCB manufacturer",
    description: "Successfully completed qualification process. Ready for production allocation.",
    status: "complete",
    priority: "medium",
    agent: "Quality Agent",
    roles: ["NPI Ops Program Mgr", "Material Manager"],
    timestamp: "2025-01-08 03:45 PM",
  },
  {
    id: "8",
    title: "Optimized inventory levels for smart speaker components",
    description: "Reduced excess inventory by 22% while maintaining 99.5% service level.",
    status: "complete",
    priority: "low",
    agent: "Supply Planning Agent",
    roles: ["Supply Planner", "Material Program Mgr"],
    timestamp: "2025-01-07 01:20 PM",
  },
  {
    id: "9",
    title: "Quarantine defective capacitor batch from Supplier A",
    description:
      "Quality Agent identified 2,400 units with voltage tolerance issues. Recommend quarantine and supplier investigation.",
    status: "recommendation",
    priority: "high",
    agent: "Quality Agent",
    roles: ["Supplier Quality Manager", "Material Manager"],
    timestamp: "2025-01-18 11:15 AM",
  },
  {
    id: "10",
    title: "Pause Component PO for IC chips pending quality review",
    description: "Recent shipment showed 3.2% defect rate. Recommend pausing orders until root cause identified.",
    status: "recommendation",
    priority: "high",
    agent: "Quality Agent",
    roles: ["Supplier Quality Manager", "Supply Planner"],
    timestamp: "2025-01-19 09:00 AM",
  },
  {
    id: "11",
    title: "Stop Manufacturing Order MO-2847 due to assembly defects",
    description:
      "Quality Agent detected systematic assembly issue affecting 12% of units. Recommend immediate production halt.",
    status: "recommendation",
    priority: "high",
    agent: "Quality Agent",
    roles: ["Manufacturing Technical Engineer", "Sustaining Ops Program Mgr"],
    timestamp: "2025-01-20 10:30 AM",
  },
  {
    id: "12",
    title: "Qualify alternate supplier for display panels",
    description:
      "Current supplier has recurring quality issues. Recommend qualifying Supplier B with better quality track record.",
    status: "recommendation",
    priority: "medium",
    agent: "Quality Agent",
    roles: ["Supplier Quality Manager", "Material Program Mgr"],
    timestamp: "2025-01-21 11:00 AM",
  },
  {
    id: "13",
    title: "Investigating root cause of PCB solder defects",
    description: "Working with CM to analyze temperature profile and solder paste quality. 3 batches affected.",
    status: "in-progress",
    priority: "high",
    agent: "Quality Agent",
    roles: ["Manufacturing Technical Engineer", "Supplier Quality Manager"],
    timestamp: "2025-01-17 09:30 AM",
  },
  {
    id: "14",
    title: "Conducting supplier audit for battery manufacturer",
    description: "On-site audit to verify quality processes and compliance with safety standards.",
    status: "in-progress",
    priority: "medium",
    agent: "Quality Agent",
    roles: ["Supplier Quality Manager"],
    timestamp: "2025-01-16 02:00 PM",
  },
  {
    id: "15",
    title: "Resolved camera module focus issue",
    description: "Root cause identified as calibration drift. Updated manufacturing process and retrained operators.",
    status: "complete",
    priority: "high",
    agent: "Quality Agent",
    roles: ["Manufacturing Technical Engineer"],
    timestamp: "2025-01-15 04:00 PM",
  },
  {
    id: "16",
    title: "Consolidate freight carriers for APAC region",
    description:
      "Analysis shows 18% cost savings by consolidating from 4 carriers to 2 preferred partners with better rates.",
    status: "recommendation",
    priority: "medium",
    agent: "Logistics Agent",
    roles: ["Logistics Planner"],
    timestamp: "2025-01-22 08:00 AM",
  },
  {
    id: "17",
    title: "Implement cross-dock strategy for high-velocity SKUs",
    description:
      "Recommend bypassing warehouse storage for top 20 SKUs to reduce handling time by 3 days and cut costs by $8K/month.",
    status: "recommendation",
    priority: "medium",
    agent: "Logistics Agent",
    roles: ["Logistics Planner", "Material Manager"],
    timestamp: "2025-01-23 09:15 AM",
  },
  {
    id: "18",
    title: "Approve NPI build plan for new tablet program",
    description: "EVT build scheduled for Week 12 with 500 units. All critical components secured with 2-week buffer.",
    status: "recommendation",
    priority: "high",
    agent: "Supply Planning Agent",
    roles: ["NPI Ops Program Mgr"],
    timestamp: "2025-01-12 04:30 PM",
  },
  {
    id: "19",
    title: "Review component obsolescence risk for legacy products",
    description:
      "Identified 6 components at end-of-life. Recommend last-time-buy or design refresh for 3 sustaining products.",
    status: "recommendation",
    priority: "high",
    agent: "PLM Agent",
    roles: ["Sustaining Ops Program Mgr", "Material Program Mgr"],
    timestamp: "2025-01-24 10:00 AM",
  },
  {
    id: "20",
    title: "Negotiate long-term agreement for memory components",
    description:
      "Market analysis shows 12% price increase trend. Recommend locking in 2-year pricing with current supplier.",
    status: "recommendation",
    priority: "high",
    agent: "Supplier Management Agent",
    roles: ["Global Commodity Manager"],
    timestamp: "2025-01-08 04:45 PM",
  },
  {
    id: "21",
    title: "Dual-source strategy for critical power management ICs",
    description:
      "Single-source risk identified for PMIC components. Recommend qualifying second supplier to mitigate supply risk.",
    status: "recommendation",
    priority: "medium",
    agent: "Supplier Management Agent",
    roles: ["Global Commodity Manager", "NPI Ops Program Mgr"],
    timestamp: "2025-01-25 11:30 AM",
  },
  {
    id: "22",
    title: "Optimize safety stock levels for seasonal products",
    description:
      "Historical data shows 40% demand variance. Recommend adjusting safety stock from 4 to 6 weeks for Q4 peak.",
    status: "recommendation",
    priority: "medium",
    agent: "Supply Planning Agent",
    roles: ["Supply Planner", "Material Manager"],
    timestamp: "2025-01-26 01:00 PM",
  },
  {
    id: "23",
    title: "Implement vendor-managed inventory for fasteners",
    description:
      "Supplier proposes VMI program for screws and brackets. Estimated 25% inventory reduction with no service impact.",
    status: "recommendation",
    priority: "low",
    agent: "Supplier Management Agent",
    roles: ["Material Manager", "Supply Planner"],
    timestamp: "2025-01-27 02:15 PM",
  },
  {
    id: "24",
    title: "Transition production from CM-A to CM-B for cost savings",
    description:
      "CM-B offers 12% lower manufacturing cost with equivalent quality. Recommend phased transition over 8 weeks.",
    status: "recommendation",
    priority: "medium",
    agent: "Supply Planning Agent",
    roles: ["Sustaining Ops Program Mgr", "Material Program Mgr"],
    timestamp: "2025-01-28 03:30 PM",
  },
  {
    id: "25",
    title: "Establish backup logistics plan for port congestion",
    description:
      "West Coast port delays averaging 10 days. Recommend activating East Coast routing with 5-day improvement.",
    status: "recommendation",
    priority: "high",
    agent: "Logistics Agent",
    roles: ["Logistics Planner", "Supply Planner"],
    timestamp: "2025-01-29 04:00 PM",
  },
  {
    id: "26",
    title: "Strategic sourcing initiative for memory components",
    description:
      "Market analysis shows consolidation opportunity across 8 programs. Recommend strategic sourcing initiative to reduce memory component costs by 12% ($340K annual savings).",
    status: "recommendation",
    priority: "high",
    agent: "Supplier Management Agent",
    roles: ["Product Ops Leader", "Global Commodity Manager"],
    timestamp: "2025-01-30 08:00 AM",
  },
  {
    id: "27",
    title: "NPI program portfolio health review",
    description:
      "6 of 8 active NPI programs on track. Tablet Gen 5 has 2-week schedule risk due to display panel qualification delay. Smart Home Hub has component obsolescence issue requiring design refresh.",
    status: "recommendation",
    priority: "high",
    agent: "PLM Agent",
    roles: ["Product Ops Leader", "NPI Ops Program Mgr"],
    timestamp: "2025-01-31 09:15 AM",
  },
  {
    id: "28",
    title: "Supply chain resilience improvement plan",
    description:
      "Risk assessment identified 12 single-source components across portfolio. Recommend dual-sourcing strategy for critical components to improve supply chain resilience by 35%.",
    status: "recommendation",
    priority: "high",
    agent: "Supply Planning Agent",
    roles: ["Product Ops Leader", "Material Program Mgr"],
    timestamp: "2025-02-01 10:00 AM",
  },
  {
    id: "29",
    title: "Cross-program BOM standardization opportunity",
    description:
      "Analysis identified 47 common components across 5 product families. Standardization initiative could reduce unique SKUs by 28% and improve purchasing power.",
    status: "recommendation",
    priority: "medium",
    agent: "PLM Agent",
    roles: ["Product Ops Leader", "Material Program Mgr"],
    timestamp: "2025-02-02 11:30 AM",
  },
  {
    id: "30",
    title: "Supplier performance scorecard review",
    description:
      "Q1 supplier performance data shows 3 suppliers below target (quality <95%). Recommend supplier improvement plans and alternate qualification for at-risk components.",
    status: "recommendation",
    priority: "medium",
    agent: "Quality Agent",
    roles: ["Product Ops Leader", "Supplier Quality Manager"],
    timestamp: "2025-02-03 01:00 PM",
  },
  {
    id: "31",
    title: "Manufacturing capacity planning for H2",
    description:
      "Demand forecast shows 40% volume increase in Q3-Q4. Current CM capacity at 85% utilization. Recommend securing additional manufacturing capacity by end of Q2.",
    status: "recommendation",
    priority: "high",
    agent: "Supply Planning Agent",
    roles: ["Product Ops Leader", "Sustaining Ops Program Mgr"],
    timestamp: "2025-02-04 02:15 PM",
  },
  {
    id: "32",
    title: "Supply chain cost optimization roadmap",
    description:
      "Identified $1.2M additional cost reduction opportunities across logistics (18%), component consolidation (22%), and supplier negotiations (60%). Recommend 6-month execution plan.",
    status: "recommendation",
    priority: "medium",
    agent: "Supplier Management Agent",
    roles: ["Product Ops Leader", "Global Commodity Manager"],
    timestamp: "2025-02-05 03:30 PM",
  },
  {
    id: "33",
    title: "NPI-to-production transition excellence review",
    description:
      "Last 3 NPI programs averaged 2.3 weeks delay in production ramp. Root cause analysis points to supplier readiness and test equipment availability. Recommend process improvements.",
    status: "recommendation",
    priority: "medium",
    agent: "PLM Agent",
    roles: ["Product Ops Leader", "NPI Ops Program Mgr"],
    timestamp: "2025-02-06 04:00 PM",
  },
]

const explainabilityData: Record<string, TimelineStep[]> = {
  "1": [
    {
      type: "data",
      timestamp: "2024-01-15 08:00 AM",
      actor: "Supply Chain Data Lake",
      action: "Component shortage detected",
      details:
        "C2847 capacitor lead time extended from 2 weeks to 6 weeks due to supplier production issues",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-15 08:15 AM",
      actor: "Device Ops Supply Chain Agent",
      action: "Risk orchestration initiated",
      details:
        "Orchestrated cross-domain analysis involving Supply Planning, Supplier Management, and Logistics agents",
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: "2024-01-15 08:30 AM",
      actor: "Planning Domain Agent → Supply Planning sub-Agent",
      action: "Demand impact analysis",
      details:
        "Analyzed impact on 3 active programs: Echo Water Bottle (2.5K units/week), Smart Thermostat (1.8K units/week), Tablet Gen 4 (5K units/week)",
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: "2024-01-15 09:30 AM",
      actor: "Supplier Management Domain Agent",
      action: "Alternate supplier search",
      details: "Identified 2 qualified alternate suppliers with C2847 equivalent components from AVL database",
      icon: "bot",
    },
    {
      type: "data",
      timestamp: "2024-01-15 10:00 AM",
      actor: "Quality Domain Data Warehouse",
      action: "Quality history review",
      details:
        "Supplier B (Murata Corp) has 99.2% quality pass rate on similar capacitor components from past 12 months. DPPM: 800",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-15 10:45 AM",
      actor: "Supplier Management Domain Agent → Should Cost Agent",
      action: "Cost comparison analysis",
      details:
        "Alternate supplier pricing: $0.12 vs current $0.15 per unit. Estimated annual savings: $18,000 across all programs",
      icon: "bot",
    },
    {
      type: "human",
      timestamp: "2024-01-15 11:30 AM",
      actor: "Sarah Chen (Material Manager)",
      action: "Technical review and approval",
      details:
        "Reviewed component specs and confirmed electrical compatibility (16V, 10μF tolerance ±10%). Approved for qualification testing",
      icon: "user",
    },
    {
      type: "agent",
      timestamp: "2024-01-15 11:45 AM",
      actor: "Quality Domain Agent → Test Control Doc Agent",
      action: "Qualification test plan generated",
      details:
        "Created test plan including voltage stress, temperature cycling, and reliability testing per AEC-Q200 standard",
      icon: "bot",
    },
    {
      type: "decision",
      timestamp: "2024-01-15 12:00 PM",
      actor: "Supplier Management Domain Agent",
      action: "Recommendation generated",
      details:
        "High priority: Qualify alternate supplier with 1-week lead time to prevent production delays",
      icon: "branch",
    },
  ],
  "2": [
    {
      type: "data",
      timestamp: "2024-01-10 09:00 AM",
      actor: "Demand Forecasting System",
      action: "Forecast updated",
      details:
        "Q2 tablet demand increased by 25% (from 60K to 75K units/week) based on pre-order data and market analysis",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-10 09:30 AM",
      actor: "Device Ops Supply Chain Agent",
      action: "Multi-domain orchestration",
      details: "Coordinated analysis across Planning, Logistics, and PLM domains to assess capacity requirements",
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: "2024-01-10 10:15 AM",
      actor: "Planning Domain Agent → Supply Planning sub-Agent",
      action: "Capacity gap analysis",
      details:
        "Current CM allocation: 60K units/week at CM-A (Foxconn Shenzhen). New demand requires 75K units/week capacity",
      icon: "bot",
    },
    {
      type: "data",
      timestamp: "2024-01-10 11:00 AM",
      actor: "Manufacturing Capacity Database",
      action: "CM capacity check",
      details:
        "CM-A has available SMT lines and final assembly capacity. Can increase allocation by 15K units/week starting Week 8",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-10 01:00 PM",
      actor: "PLM Domain Agent → BOM Authoring Agent",
      action: "Component availability check",
      details:
        "Validated material availability for 287 BOM components. All critical ICs and long-lead items available with 3+ week buffer",
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: "2024-01-10 02:30 PM",
      actor: "Logistics Domain Agent",
      action: "Freight impact analysis",
      details:
        "25% volume increase requires 2 additional air freight shipments per week from Shenzhen to US. Cost impact: $18K/week",
      icon: "bot",
    },
    {
      type: "human",
      timestamp: "2024-01-10 03:45 PM",
      actor: "Mike Torres (Supply Planner)",
      action: "Cross-functional review",
      details:
        "Confirmed all critical components available. Coordinated with CM for line allocation. No manufacturing constraints identified",
      icon: "user",
    },
    {
      type: "human",
      timestamp: "2024-01-10 03:50 PM",
      actor: "Jennifer Park (Sustaining Ops Program Mgr)",
      action: "Business approval",
      details:
        "Reviewed margin impact and freight costs. Approved capacity increase to meet customer demand commitments",
      icon: "user",
    },
    {
      type: "decision",
      timestamp: "2024-01-10 04:00 PM",
      actor: "Planning Domain Agent",
      action: "Recommendation generated",
      details: "High priority: Increase CM capacity allocation by 15K units/week to meet Q2 demand spike",
      icon: "branch",
    },
  ],
  "9": [
    {
      type: "data",
      timestamp: "2024-01-18 07:30 AM",
      actor: "Quality Inspection System",
      action: "Defect detection",
      details:
        "Incoming quality inspection detected voltage tolerance issues in capacitor batch CX-2847-LOT456 from Supplier A",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-18 08:00 AM",
      actor: "Quality Domain Agent",
      action: "Statistical analysis",
      details:
        "Analyzed sample of 200 units. Found 2.8% failure rate at rated voltage (16V). Specification requires <0.5% failure rate",
      icon: "bot",
    },
    {
      type: "data",
      timestamp: "2024-01-18 08:30 AM",
      actor: "Inventory Management System",
      action: "Inventory trace",
      details:
        "Identified 2,400 units from affected lot in incoming warehouse. Additional 800 units already consumed in WIP",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-18 09:00 AM",
      actor: "Quality Domain Agent → Root Cause Analysis sub-Agent",
      action: "Failure mode analysis",
      details:
        "X-ray and cross-section analysis indicates dielectric layer defect. Likely manufacturing process deviation at supplier",
      icon: "bot",
    },
    {
      type: "human",
      timestamp: "2024-01-18 10:00 AM",
      actor: "David Kim (Supplier Quality Manager)",
      action: "Quality assessment",
      details:
        "Reviewed test data and failure analysis. Confirmed defect is systematic to this lot. Recommended quarantine and 8D investigation",
      icon: "user",
    },
    {
      type: "agent",
      timestamp: "2024-01-18 10:30 AM",
      actor: "Planning Domain Agent",
      action: "Production impact assessment",
      details:
        "2,400 unit quarantine will impact Echo Water Bottle build for 3 days. Alternate inventory available from Supplier B",
      icon: "bot",
    },
    {
      type: "human",
      timestamp: "2024-01-18 11:00 AM",
      actor: "Sarah Chen (Material Manager)",
      action: "Containment action approval",
      details:
        "Approved quarantine action and alternate material usage. Initiated supplier corrective action request (SCAR)",
      icon: "user",
    },
    {
      type: "decision",
      timestamp: "2024-01-18 11:15 AM",
      actor: "Quality Domain Agent",
      action: "Recommendation generated",
      details:
        "High priority: Quarantine 2,400 units and launch supplier 8D investigation to prevent future quality escapes",
      icon: "branch",
    },
  ],
  "18": [
    {
      type: "data",
      timestamp: "2024-01-12 10:00 AM",
      actor: "Program Management System",
      action: "NPI milestone trigger",
      details: "Tablet Gen 5 program entered EVT phase. EVT build requirement: 500 units for Week 12",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-12 10:30 AM",
      actor: "PLM Domain Agent",
      action: "NPI workflow orchestration",
      details:
        "Initiated cross-functional NPI build plan including BOM validation, component procurement, and CM readiness",
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: "2024-01-12 11:00 AM",
      actor: "PLM Domain Agent → BOM Authoring Agent",
      action: "BOM validation",
      details: "Validated EVT BOM v1.3 with 312 components. All components approved and available in PLM system",
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: "2024-01-12 01:00 PM",
      actor: "Planning Domain Agent → Clear to Build Agent",
      action: "Material availability check",
      details:
        "All 312 components available. 18 long-lead components secured with 2-week buffer. Critical ICs allocated from strategic inventory",
      icon: "bot",
    },
    {
      type: "data",
      timestamp: "2024-01-12 02:00 PM",
      actor: "Manufacturing Capacity System",
      action: "CM capacity confirmation",
      details:
        "CM-A (Foxconn Shenzhen) confirmed line allocation for Week 12. SMT and assembly lines reserved for 500-unit pilot build",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-12 03:00 PM",
      actor: "PLM Domain Agent → Build Config Agent",
      action: "Build configuration",
      details:
        "Generated manufacturing traveler and test plan for EVT build. Includes 15 functional tests and 8 mechanical inspections",
      icon: "bot",
    },
    {
      type: "human",
      timestamp: "2024-01-12 04:00 PM",
      actor: "Alex Rivera (NPI Ops Program Mgr)",
      action: "Build plan review",
      details:
        "Reviewed material availability, CM capacity, and test plan. All prerequisites met for Week 12 EVT build execution",
      icon: "user",
    },
    {
      type: "human",
      timestamp: "2024-01-12 04:15 PM",
      actor: "Sarah Chen (Material Manager)",
      action: "Material release approval",
      details: "Approved material release for 500 EVT units. Coordinated kitting and shipping to CM by Week 11",
      icon: "user",
    },
    {
      type: "decision",
      timestamp: "2024-01-12 04:30 PM",
      actor: "PLM Domain Agent",
      action: "Recommendation generated",
      details: "High priority: Approve EVT build plan for Week 12 with 500 units. All prerequisites validated",
      icon: "branch",
    },
  ],
  "20": [
    {
      type: "data",
      timestamp: "2024-01-08 09:00 AM",
      actor: "Market Intelligence System",
      action: "Price trend alert",
      details:
        "DRAM memory spot prices increased 12% over past 4 weeks. Industry forecasts project continued upward trend through Q3",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-08 10:00 AM",
      actor: "Supplier Management Domain Agent → Should Cost Agent",
      action: "Cost impact analysis",
      details: "Current memory spend: $2.4M/quarter across 4 programs. 12% increase equals $288K quarterly cost impact",
      icon: "bot",
    },
    {
      type: "data",
      timestamp: "2024-01-08 11:00 AM",
      actor: "Supplier Contract Database",
      action: "Contract review",
      details: "Current supplier (Micron Technology) contract expires in 6 weeks. Volume commitment: 2.5M units/year",
      icon: "database",
    },
    {
      type: "agent",
      timestamp: "2024-01-08 01:30 PM",
      actor: "Supplier Management Domain Agent",
      action: "Negotiation scenario modeling",
      details:
        "Modeled 3 scenarios: spot pricing (high risk), 1-year fixed (moderate), 2-year fixed (best value). 2-year locks savings of $576K",
      icon: "bot",
    },
    {
      type: "data",
      timestamp: "2024-01-08 02:00 PM",
      actor: "Quality Performance Database",
      action: "Supplier performance review",
      details:
        "Micron quality metrics: 99.7% pass rate, 0.3% DPPM. Delivery performance: 98.5% on-time. Strong supplier relationship",
      icon: "database",
    },
    {
      type: "human",
      timestamp: "2024-01-08 03:30 PM",
      actor: "Rachel Martinez (Global Commodity Manager)",
      action: "Strategic sourcing review",
      details:
        "Reviewed market analysis and supplier performance. Recommended 2-year agreement to mitigate price volatility",
      icon: "user",
    },
    {
      type: "agent",
      timestamp: "2024-01-08 04:00 PM",
      actor: "Planning Domain Agent",
      action: "Demand forecast validation",
      details:
        "Confirmed 2-year volume commitment feasible based on product roadmap. Memory requirements stable across 5 active programs",
      icon: "bot",
    },
    {
      type: "human",
      timestamp: "2024-01-08 04:30 PM",
      actor: "Jennifer Park (Material Program Mgr)",
      action: "Business case approval",
      details: "Approved long-term pricing strategy. Authorized negotiation for 2-year fixed pricing with Micron",
      icon: "user",
    },
    {
      type: "decision",
      timestamp: "2024-01-08 04:45 PM",
      actor: "Supplier Management Domain Agent",
      action: "Recommendation generated",
      details:
        "High priority: Negotiate 2-year fixed pricing agreement to lock in $576K savings and mitigate market volatility",
      icon: "branch",
    },
  ],
}

const getDefaultTimeline = (action: Action): TimelineStep[] => {
  const agentMap: Record<string, string> = {
    "Supply Planning Agent": "Planning Domain Agent → Supply Planning sub-Agent",
    "Supplier Management Agent": "Supplier Management Domain Agent",
    "Logistics Agent": "Logistics Domain Agent",
    "Quality Agent": "Quality Domain Agent",
    "PLM Agent": "PLM Domain Agent",
    "Program Agent": "Program Domain Agent", // Added for Program Agent
  }

  const mappedAgent = agentMap[action.agent] || action.agent

  return [
    {
      type: "data",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toLocaleString(),
      actor: "Operations Data Platform",
      action: "Data collection initiated",
      details: `Aggregated data from supply chain, quality, and logistics systems related to: ${action.title}`,
      icon: "database",
    },
    {
      type: "agent",
      timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toLocaleString(),
      actor: "Device Ops Supply Chain Agent",
      action: "Orchestration initiated",
      details: `Orchestrated cross-domain analysis and coordinated relevant domain agents to address the issue`,
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toLocaleString(),
      actor: mappedAgent,
      action: "Analysis performed",
      details: `Evaluated current situation using ML models and business rules. Identified opportunity for optimization.`,
      icon: "bot",
    },
    {
      type: "agent",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
      actor: mappedAgent,
      action: "Impact assessment",
      details: `Analyzed potential impact on cost, quality, and delivery timelines. Calculated risk vs. benefit ratio.`,
      icon: "bot",
    },
    {
      type: "decision",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toLocaleString(),
      actor: mappedAgent,
      action: "Recommendation generated",
      details: `${action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} priority recommendation created based on analysis`,
      icon: "branch",
    },
  ]
}

interface ActionsTabProps {
  activeTab?: string
}

export function ActionsTab({ activeTab = "recommendations" }: ActionsTabProps) {
  const { role } = useRole()
  const [quoteRequests, setQuoteRequests] = useState<any[]>([])
  const [approvedActionIds, setApprovedActionIds] = useState<Set<string>>(new Set())
  const [editingAction, setEditingAction] = useState<Action | null>(null)
  const [editStatus, setEditStatus] = useState<string>("")
  const [editNotes, setEditNotes] = useState<string>("")
  const [actionNotes, setActionNotes] = useState<Record<string, string>>({})
  const [actionStatuses, setActionStatuses] = useState<Record<string, string>>({})
  const [explainabilityAction, setExplainabilityAction] = useState<Action | null>(null)
  const [programActions, setProgramActions] = useState<Action[]>([])
  // Removed internal activeTab state as it's now a prop

  const approvedSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadApprovedActions = () => {
      const approved = JSON.parse(localStorage.getItem("approvedActions") || "[]")
      setApprovedActionIds(new Set(approved))
    }

    const loadQuoteRequests = () => {
      const requests = JSON.parse(localStorage.getItem("quoteRequests") || "[]")
      const uniqueRequests = Array.from(
        new Map(requests.map((req: any) => [`${req.supplier}-${req.partNumber}-${req.description}`, req])).values(),
      )
      setQuoteRequests(uniqueRequests)
    }

    const loadNotesAndStatuses = () => {
      const notes = JSON.parse(localStorage.getItem("actionNotes") || "{}")
      const statuses = JSON.parse(localStorage.getItem("actionStatuses") || "{}")
      setActionNotes(notes)
      setActionStatuses(statuses)
    }

    const loadProgramActions = () => {
      const programs = JSON.parse(localStorage.getItem("programActions") || "[]")
      setProgramActions(programs)
    }

    loadApprovedActions()
    loadQuoteRequests()
    loadNotesAndStatuses()
    loadProgramActions()

    const handleStorageChange = () => {
      loadQuoteRequests()
      loadProgramActions()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("scrollTo") === "approved") { // Modified to handle approved tab scrolling
      // setActiveTab("approved") // Removed as activeTab is now a prop
      setTimeout(() => {
        approvedSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 300)
    }
  }, [])

  const handleActionClick = (action: Action) => {
    if (action.id === "34") {
      const params = new URLSearchParams()
      params.set("program", "PRG-008")
      params.set("tab", "supplier")
      window.location.replace(`/dashboard/program?${params.toString()}`)
    }
  }

  const handleExplainQuality = (actionId: string) => {
    const qualityMessage = "I'm analyzing the IC chip quality issue. Recent shipment from ABC Semiconductors showed a 3.2% defect rate, which exceeds our 1% threshold. Let me explain what happened and our response plan."
    
    window.dispatchEvent(
      new CustomEvent("openAssistantWithMessage", {
        detail: { message: qualityMessage }
      })
    )
  }

  const getEffectiveStatus = (action: Action): Action["status"] => {
    if (actionStatuses[action.id]) {
      return actionStatuses[action.id] as Action["status"]
    }
    if (approvedActionIds.has(action.id)) {
      return "approved"
    }
    return action.status
  }

  const getPriorityColor = (priority: Action["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
    }
  }

  const getStatusIcon = (status: Action["status"]) => {
    switch (status) {
      case "recommendation":
        return <AlertCircle className="h-4 w-4" />
      case "approved":
        return <Check className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "complete":
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  const getTimeline = (action: Action): TimelineStep[] => {
    return explainabilityData[action.id] || getDefaultTimeline(action)
  }

  const getTimelineIcon = (iconType?: "bot" | "user" | "database" | "branch") => {
    switch (iconType) {
      case "bot":
        return <Bot className="h-5 w-5" />
      case "user":
        return <User className="h-5 w-5" />
      case "database":
        return <Database className="h-5 w-5" />
      case "branch":
        return <GitBranch className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const getTimelineColor = (type: string) => {
    switch (type) {
      case "agent":
        return "bg-blue-500"
      case "human":
        return "bg-green-500"
      case "data":
        return "bg-purple-500"
      case "decision":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredActions = actions.filter((action) => action.roles.includes(role))

  const quoteRequestActions = quoteRequests.map((req) => ({
    id: req.id,
    title: `Quote request for ${req.description}`,
    description: `${req.supplier} - ${req.partNumber}. Estimated cost: ${req.estimatedCost}, MOQ: ${req.moq}, Lead time: ${req.leadTime}`,
    status: "recommendation" as const,
    priority: "high" as const,
    agent: `${req.agent} → ${req.subAgent}`,
    roles: [role],
  }))

  const allActions = [...quoteRequestActions, ...programActions, ...filteredActions]

  const allRecommendations = allActions.filter((a) => {
    const status = getEffectiveStatus(a)
    return status === "recommendation"
  })
  const recommendations = allRecommendations

  const approved = allActions.filter((a) => {
    const status = getEffectiveStatus(a)
    return status === "approved"
  }).sort((a, b) => { // Sort approved items by timestamp (most recent first)
    const approvedTimestamps = JSON.parse(localStorage.getItem("approvedTimestamps") || "{}")
    const timeA = approvedTimestamps[a.id] ? new Date(approvedTimestamps[a.id]).getTime() : 0
    const timeB = approvedTimestamps[b.id] ? new Date(approvedTimestamps[b.id]).getTime() : 0
    return timeB - timeA // Most recent first
  })

  const inProgressAndCompleted = allActions.filter((a) => {
    const status = getEffectiveStatus(a)
    return status === "in-progress" || status === "complete"
  })


  const handleApprove = (actionId: string) => {
    const newApprovedIds = new Set(approvedActionIds)
    newApprovedIds.add(actionId)
    setApprovedActionIds(newApprovedIds)

    const timestamp = new Date().toISOString()
    const approvedTimestamps = JSON.parse(localStorage.getItem("approvedTimestamps") || "{}")
    approvedTimestamps[actionId] = timestamp
    localStorage.setItem("approvedTimestamps", JSON.stringify(approvedTimestamps))

    localStorage.setItem("approvedActions", JSON.stringify(Array.from(newApprovedIds)))

    const quoteRequest = quoteRequests.find((req) => req.id === actionId)
    if (quoteRequest) {
      const updatedRequests = quoteRequests.map((req) => (req.id === actionId ? { ...req, status: "Approved" } : req))
      localStorage.setItem("quoteRequests", JSON.stringify(updatedRequests))
      setQuoteRequests(updatedRequests)
    }
  }

  const handleDismiss = (actionId: string) => {
    const quoteRequest = quoteRequests.find((req) => req.id === actionId)
    if (quoteRequest) {
      const updatedRequests = quoteRequests.filter((req) => req.id !== actionId)
      localStorage.setItem("quoteRequests", JSON.JSON.stringify(updatedRequests))
      setQuoteRequests(updatedRequests)
    }
  }

  const handleEdit = (action: Action) => {
    setEditingAction(action)
    setEditStatus(getEffectiveStatus(action))
    setEditNotes(actionNotes[action.id] || "")
  }

  const handleSaveEdit = () => {
    if (!editingAction) return

    const newStatuses = { ...actionStatuses, [editingAction.id]: editStatus }
    setActionStatuses(newStatuses)
    localStorage.setItem("actionStatuses", JSON.stringify(newStatuses))

    const newNotes = { ...actionNotes, [editingAction.id]: editNotes }
    setActionNotes(newNotes)
    localStorage.setItem("actionNotes", JSON.stringify(newNotes))

    if (editStatus === "approved" && !approvedActionIds.has(editingAction.id)) {
      const newApprovedIds = new Set(approvedActionIds)
      newApprovedIds.add(editingAction.id)
      setApprovedActionIds(newApprovedIds)
      localStorage.setItem("approvedActions", JSON.JSON.stringify(Array.from(newApprovedIds)))
    }

    setEditingAction(null)
  }

  const handleCancelEdit = () => {
    setEditingAction(null)
    setEditStatus("")
    setEditNotes("")
  }

  const ActionCard = ({
    action,
    showActions = false,
    showEdit = false,
  }: { action: Action; showActions?: boolean; showEdit?: boolean }) => {
    const approvedTimestamps = JSON.parse(localStorage.getItem("approvedTimestamps") || "{}")
    const approvedTimestamp = approvedTimestamps[action.id]
    const displayTimestamp = approvedTimestamp || action.timestamp
    const timestampLabel = approvedTimestamp ? "Approved" : "Created"

    const getAgentColor = (agentName: string) => {
      if (agentName.includes("Supply Chain") || agentName.includes("Device Ops")) {
        return "bg-blue-100 text-blue-800 border-blue-200"
      }
      if (agentName.includes("PLM")) {
        return "bg-purple-100 text-purple-800 border-purple-200"
      }
      if (agentName.includes("Supplier Management")) {
        return "bg-green-100 text-green-800 border-green-200"
      }
      if (agentName.includes("Planning")) {
        return "bg-amber-100 text-amber-800 border-amber-200"
      }
      if (agentName.includes("Quality")) {
        return "bg-red-100 text-red-800 border-red-200"
      }
      if (agentName.includes("Logistics")) {
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      }
      if (agentName.includes("Program")) { // Added color for Program Agent
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      }
      return "bg-gray-100 text-gray-800 border-gray-200"
    }

    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  {getStatusIcon(getEffectiveStatus(action))}
                  <CardTitle
                    className={`text-base ${action.id === "34" ? "cursor-pointer hover:text-primary hover:underline" : ""}`}
                    onClick={() => action.id === "34" && handleActionClick(action)}
                  >
                    {action.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm">{action.description}</CardDescription>

                {displayTimestamp && (
                  <p className="text-xs text-muted-foreground">
                    {timestampLabel}: {new Date(displayTimestamp).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    if (action.id === "10") {
                      handleExplainQuality(action.id)
                    } else {
                      setExplainabilityAction(action)
                    }
                    // </CHANGE>
                  }}
                  title="View decision explanation"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Button>
                <Badge variant={getPriorityColor(action.priority)}>{action.priority}</Badge>
              </div>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Agents:</p>
                <div className="flex flex-wrap gap-1.5">
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${getAgentColor(action.agent)}`}>
                    <Bot className="h-3 w-3" />
                    <span>{action.agent}</span>
                  </div>
                  {action.contributingAgents && action.contributingAgents.map((agent, idx) => (
                    <div
                      key={idx}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${getAgentColor(agent)}`}
                    >
                      <Bot className="h-3 w-3" />
                      <span>{agent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(showActions || showEdit) && (
                <div className="flex items-start gap-2 flex-shrink-0">
                  {showActions && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleDismiss(action.id)}>
                        Dismiss
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(action.id)}>
                        Approve
                      </Button>
                    </>
                  )}
                  {showEdit && (
                    <Button size="sm" variant="outline" onClick={() => handleEdit(action)}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              )}
            </div>
            {/* </CHANGE> */}

            {actionNotes[action.id] && (
              <div className="p-2 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Notes:</span> {actionNotes[action.id]}
                </p>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {activeTab === "recommendations" && (
        <div className="grid gap-4">
          {recommendations.length > 0 ? (
            recommendations.map((action) => <ActionCard key={action.id} action={action} showActions={true} />)
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No recommendations at this time
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "approved" && (
        <div ref={approvedSectionRef} className="grid gap-4">
          {approved.length > 0 ? (
            approved.map((action) => <ActionCard key={action.id} action={action} showEdit={true} />)
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No approved actions yet
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "in-progress" && (
        <div className="grid gap-4">
          {inProgressAndCompleted.length > 0 ? (
            inProgressAndCompleted.map((action) => <ActionCard key={action.id} action={action} showEdit={true} />)
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No actions in progress or completed
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingAction} onOpenChange={(open) => !open && handleCancelEdit()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Action</DialogTitle>
            <DialogDescription>Update the status and add notes for this action.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="complete">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about this action..."
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Explainability Modal */}
      <Dialog open={!!explainabilityAction} onOpenChange={(open) => !open && setExplainabilityAction(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Decision Explainability</DialogTitle>
            <DialogDescription>{explainabilityAction?.title}</DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4">
            {/* Timeline View */}
            <div className="relative space-y-6">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              {explainabilityAction &&
                getTimeline(explainabilityAction).map((step, index) => (
                  <div key={index} className="relative flex gap-4">
                    {/* Timeline dot and icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${getTimelineColor(step.type)} text-white`}
                      >
                        {getTimelineIcon(step.icon)}
                      </div>
                    </div>

                    {/* Timeline content */}
                    <div className="flex-1 pb-6">
                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{step.actor}</h4>
                            <p className="text-sm text-primary font-medium">{step.action}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {step.timestamp}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{step.details}</p>

                        {/* Type badge */}
                        <div className="mt-3">
                          <Badge variant="secondary" className="text-xs">
                            {step.type === "agent" && "AI Agent"}
                            {step.type === "human" && "Human Review"}
                            {step.type === "data" && "Data Input"}
                            {step.type === "decision" && "Decision Point"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setExplainabilityAction(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
