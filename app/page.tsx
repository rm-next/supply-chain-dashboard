"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, TrendingUp, Truck, ShieldCheck, RotateCcw, Factory, Zap } from 'lucide-react'

export default function LandingPage() {
  const agents = [
    {
      icon: Package,
      title: "PLM Agent",
      description:
        "Orchestrates product development lifecycles, manages roadmaps, and ensures seamless transitions from concept to market launch.",
    },
    {
      icon: TrendingUp,
      title: "Supplier Management Agent",
      description:
        "Monitors supplier performance, manages relationships, and proactively identifies risks to maintain supply continuity.",
    },
    {
      icon: Factory,
      title: "Supply Planning Agent",
      description:
        "Forecasts demand with precision, optimizes inventory levels, and balances supply and demand across your network.",
    },
    {
      icon: Truck,
      title: "Logistics Agent",
      description:
        "Optimizes transportation routes, manages warehouse operations, and ensures efficient distribution across all channels.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Agent",
      description:
        "Maintains quality standards, ensures regulatory compliance, and implements continuous improvement across all processes.",
    },
    {
      icon: RotateCcw,
      title: "Returns Agent",
      description:
        "Streamlines returns processing, manages reverse logistics, and transforms returns data into actionable insights.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-foreground">Ops Advisor</span>
          </div>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            <span className="text-primary">Ops Advisor</span>
            <br />
            <span className="text-foreground">
              Your 24x7 AI companion optimizing Device Ops Supply Chain operations
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Powered by an agentic framework with domain-aware AI agents that autonomously orchestrate your entire supply
            chain—from supplier management, planning, and logistics to returns and beyond. Our intelligent companion
            works alongside your teams with seamless human-in-the-loop collaboration to achieve supply chain excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <Link href="/login">
                Start Your Transformation
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-950 dark:to-orange-950">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <Zap className="h-4 w-4" />
                24 x 7, Supply Chain Domain & Org Aware
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
                Agentic Supply Chain Framework
              </h2>
              <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
                Orchestrates domain specific business processes with human-in-the-loop workflows
              </p>
            </div>

            {/* Agent Network Diagram */}
            <div className="relative w-full max-w-6xl mx-auto p-8">
              {/* Orchestrator Agent */}
              <div className="flex justify-center mb-12 animate-slide-down">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse-slow"></div>
                  <div className="relative bg-gradient-to-r from-primary to-orange-600 text-white px-8 py-6 rounded-2xl shadow-2xl">
                    <div className="text-center">
                      <div className="font-bold text-2xl">Device Ops Supply Chain Agent</div>
                      <div className="text-sm text-orange-100 mt-1">Master Orchestrator</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E85D3F" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E85D3F" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="50%"
                    y1="100"
                    x2={`${15 + i * 14}%`}
                    y2="280"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    className="animate-draw-line"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </svg>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-12 relative" style={{ zIndex: 1 }}>
                {[
                  {
                    title: "PLM Domain Agent",
                    icon: Package,
                    delay: "0.2s",
                    agents: ["BOM Authoring", "Build Config", "BOM Change", "Test Control Doc", "Root Cause Analysis"],
                  },
                  {
                    title: "Supplier Management",
                    icon: TrendingUp,
                    delay: "0.3s",
                    agents: ["Should Cost", "Supplier Selection", "RFQ Management", "Contract Negotiation"],
                  },
                  {
                    title: "Planning Domain Agent",
                    icon: Factory,
                    delay: "0.4s",
                    agents: ["Clear to Build", "Demand Forecast", "Inventory Optimization", "Capacity Planning"],
                  },
                  {
                    title: "Logistics Domain Agent",
                    icon: Truck,
                    delay: "0.5s",
                    agents: ["HSN Code", "Country of Origin", "Route Optimization", "Warehouse Management"],
                  },
                  {
                    title: "Quality Domain Agent",
                    icon: ShieldCheck,
                    delay: "0.6s",
                    agents: ["Test Procedures", "Defect Analysis", "Compliance Check", "Audit Management"],
                  },
                  {
                    title: "Bring Your Own Agent",
                    icon: Zap,
                    delay: "0.7s",
                    agents: [],
                    isByoa: true,
                  },
                ].map((agent) => {
                  const Icon = agent.icon
                  return (
                    <div key={agent.title} className="animate-scale-in" style={{ animationDelay: agent.delay }}>
                      <div
                        className={`${
                          agent.isByoa
                            ? "border-2 border-dashed border-primary bg-primary/5"
                            : "bg-gradient-to-br from-primary to-orange-600"
                        } text-foreground ${
                          agent.isByoa ? "" : "text-white"
                        } rounded-xl p-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative h-full min-h-[280px] flex flex-col`}
                      >
                        {!agent.isByoa && (
                          <div className="absolute inset-0 bg-orange-400/20 blur-md animate-pulse-slow"></div>
                        )}
                        <div className="relative flex-1 flex flex-col">
                          <div className="flex justify-center mb-3">
                            <div
                              className={`w-10 h-10 rounded-lg ${
                                agent.isByoa ? "bg-primary/10" : "bg-white/20"
                              } flex items-center justify-center`}
                            >
                              <Icon className={`h-5 w-5 ${agent.isByoa ? "text-primary" : "text-white"}`} />
                            </div>
                          </div>
                          <div
                            className={`text-center text-sm font-bold mb-3 leading-tight ${
                              agent.isByoa ? "text-primary" : ""
                            }`}
                          >
                            {agent.title}
                          </div>
                          {agent.isByoa ? (
                            <div className="text-xs text-center text-muted-foreground">Extend with custom agents</div>
                          ) : (
                            <div className="space-y-1.5 flex-1">
                              <div className="text-xs font-semibold mb-2 opacity-90">Pre-built Agents:</div>
                              {agent.agents.map((subAgent) => (
                                <div key={subAgent} className="text-xs bg-white/20 rounded px-2 py-1 backdrop-blur-sm">
                                  {subAgent}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Human in Loop Badge */}
              <div className="flex justify-center animate-slide-up" style={{ animationDelay: "1.2s" }}>
                <div className="bg-gradient-to-r from-primary to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
                  <div className="font-bold text-center">Executes workflows with Human in the Loop</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                Illustrative Use Case
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Launching the Echo Smart Water Bottle</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From concept to Back-to-School 2026 launch - see how AI agents autonomously orchestrate a complex
                product launch with periodic cross-functional human inputs
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">The Challenge</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Launch an Echo smart water bottle that reminds users to hydrate via a display, shows current water
                      levels, and enables voice ordering. Target launch: end-August 2026.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded p-4">
                      <h4 className="font-bold text-foreground mb-2">Traditional Approach</h4>
                      <p className="text-sm text-muted-foreground">
                        Timeline: 2-3 months of manual coordination across teams to define milestones, identify CMs and
                        suppliers, and plan logistics.
                      </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 rounded p-4">
                      <h4 className="font-bold text-foreground mb-2">Agentic Approach</h4>
                      <p className="text-sm text-muted-foreground">
                        Timeline: Days with superior accuracy - AI agents work backwards from launch date with human
                        approvals at key milestones.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl animate-pulse-slow"></div>
                    <img
                      src="/images/image.png"
                      alt="Echo Smart Water Bottle"
                      className="relative max-w-sm h-auto rounded-2xl shadow-2xl animate-float"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Collaboration */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  number: "1",
                  title: "PLM Agent",
                  description:
                    "Recommends key xVT milestones based on past programs. Establishes BOM structure with critical components (displays, speaker, thermal materials) by analyzing historical data.",
                  icon: Package,
                },
                {
                  number: "2",
                  title: "Supplier Management",
                  description:
                    "Identifies optimal contract manufacturers and suppliers for critical components based on past performance, capacity, and regional capabilities.",
                  icon: TrendingUp,
                },
                {
                  number: "3",
                  title: "Planning Agent",
                  description:
                    "Uses lead times to establish when material buys are required. Balances inventory costs with supply risk to optimize working capital.",
                  icon: Factory,
                },
                {
                  number: "4",
                  title: "Logistics Agent",
                  description:
                    "Establishes handling and tariff expectations by researching water bottle manufacturers. Determines HSN codes for tariff implications.",
                  icon: Truck,
                },
                {
                  number: "5",
                  title: "Quality Agent",
                  description:
                    "Establishes electronics and thermal test procedures. Defines defect rate thresholds and inspection protocols based on similar products.",
                  icon: ShieldCheck,
                },
                {
                  number: "6",
                  title: "Sub-Agents",
                  description:
                    "Specialized sub-agents (BOM Change, Should Cost, Clear to Build, Country of Origin) handle granular tasks, coordinating seamlessly.",
                  icon: RotateCcw,
                },
              ].map((agent) => {
                const Icon = agent.icon
                return (
                  <div
                    key={agent.number}
                    className="bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 p-6"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {agent.number}
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{agent.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Logical Building Blocks to enable Agentic Supply Chain
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A layered architecture that transforms organizational knowledge and data into autonomous decision-making
              </p>
            </div>

            <div className="space-y-4">
              {/* Ops Advisor Agentic UX */}
              <div className="flex items-stretch gap-4 group">
                <div className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="font-semibold text-lg">Ops Advisor Agentic UX</div>
                </div>
                <div className="w-36 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl px-4 shadow-lg">
                  <span className="font-bold text-muted-foreground text-sm">UI</span>
                </div>
              </div>
              
              {/* Agent1, Agent2 ... Agent N + Workflows */}
              <div className="flex items-stretch gap-4 group">
                <div className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="font-semibold text-lg">Agent1, Agent2 ... Agent N + Workflows</div>
                </div>
                <div className="w-36 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl px-4 shadow-lg">
                  <span className="font-bold text-muted-foreground text-sm">Agent Builder</span>
                </div>
              </div>
              
              {/* Supply Chain Network / Transactions Ontology – Data Context */}
              <div className="flex items-stretch gap-4 group">
                <div className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="font-semibold text-lg">Supply Chain Network / Transactions Ontology – Data Context</div>
                </div>
                <div className="w-36 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl px-4 shadow-lg">
                  <span className="font-bold text-muted-foreground text-sm">Data Context</span>
                </div>
              </div>
              
              {/* MCP enabled Data Discovery */}
              <div className="flex items-stretch gap-4 group">
                <div className="flex-1 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="font-semibold text-lg">MCP enabled Data Discovery</div>
                </div>
                <div className="w-36 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl px-4 shadow-lg">
                  <span className="font-bold text-muted-foreground text-sm">Data Access</span>
                </div>
              </div>

              {/* Data Sources */}
              <div className="flex items-stretch gap-4">
                <div className="flex-1 flex gap-3">
                  {["PLM", "Costing", "Supplier Mgmt", "Inventory", "Spreadsheets", "Web"].map((source) => (
                    <div
                      key={source}
                      className="flex-1 bg-gradient-to-br from-orange-700 to-orange-800 text-white rounded-lg p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="text-sm font-medium">{source}</div>
                    </div>
                  ))}
                </div>
                <div className="w-36 flex items-center justify-center bg-white dark:bg-slate-900 rounded-xl px-4 shadow-lg">
                  <span className="font-bold text-muted-foreground text-sm">Data Sources</span>
                </div>
              </div>
            </div>

            {/* Key Insight */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary rounded-xl p-8 mt-12">
              <h3 className="text-xl font-bold text-foreground mb-3">The Power of This Approach</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Codifies organizational knowledge at every level - from strategic to tactical. Enables classification of
                opportunities into domains as combinations of agents, knowledge, and tools for automation.
              </p>
              <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-1">Days → Minutes</div>
                <div className="text-base">Unlocking insights, mitigating risks and lowering costs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Consumer Electronics Manufacturing
            </h2>
            <p className="text-lg text-muted-foreground text-balance leading-relaxed">
              Designed for OEMs manufacturing tablets, e-readers, smart speakers, wearables, and smart doorbell cameras.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Autonomous Operations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-muted-foreground">Specialized AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Supply Chain Visibility</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
            Join leading OEMs, contract manufacturers, and suppliers who trust Ops Advisor to power their operations.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-base">
            <Link href="/login">
              Get Started Today
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Ops Advisor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
