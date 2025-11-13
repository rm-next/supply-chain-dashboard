"use client"
import { ChevronDown, User, LogOut, Package, Sparkles, X, Send, Bot, RotateCcw } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { useRole } from "@/hooks/use-role"
import { useUser } from "@/hooks/use-user"

interface DashboardHeaderProps {
  moduleName?: string
}

export function DashboardHeader({ moduleName }: DashboardHeaderProps) {
  const router = useRouter()
  const { role, setRole, roles } = useRole()
  const { user, clearUser } = useUser()
  const { state } = useSidebar()
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleLogout = () => {
    clearUser()
    router.push("/login")
  }

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background">
        <div className="flex items-center gap-4 p-4">
          <SidebarTrigger />

          {state === "collapsed" && (
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">Ops Advisor</span>
            </div>
          )}

          {moduleName && (
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{moduleName}</h2>
            </div>
          )}

          {!moduleName && <div className="flex-1" />}

          <div className="flex items-center gap-2 ml-auto">
            <Button className="gap-2" onClick={() => setIsChatOpen(true)}>
              <Sparkles className="h-4 w-4" />
              Assistant
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {role}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {roles.map((r) => (
                  <DropdownMenuItem key={r} onClick={() => setRole(r)}>
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.role || "Admin"}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <AssistantChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}

function AssistantChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string; agent?: string; subAgent?: string; recommendations?: any[] }>
  >([{ role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" }])
  const [input, setInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([])
  const recommendationsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleClearChat = () => {
    setMessages([{ role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" }])
    setInput("")
    setIsAnalyzing(false)
    setAnalysisSteps([])
  }

  const isCostQuery = (query: string) => {
    const lowerQuery = query.toLowerCase()
    const hasCostKeyword = /\b(cost|price|pricing|quote)\b/.test(lowerQuery)
    const hasDisplayKeyword = /\b(display|lcd|screen|panel|monitor)\b/.test(lowerQuery)
    const hasSize = /\b\d+(\.\d+)?\s*(inch|"|in|')\b/.test(lowerQuery)

    return (hasCostKeyword || hasDisplayKeyword) && (hasDisplayKeyword || hasSize)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    if (isCostQuery(userMessage)) {
      setIsAnalyzing(true)
      setAnalysisSteps([])

      const steps = [
        "Analyzing historical programs with LCD displays...",
        'Comparing 2.5" to 3.5" LCD screen suppliers...',
        "Evaluating supplier performance for Echo products...",
        "Calculating should-cost estimates...",
        "Generating recommendations...",
      ]

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setAnalysisSteps((prev) => [...prev, steps[i]])
      }

      const recommendations = [
        {
          supplier: "BOE Technology",
          partNumber: "BOE-LCD-3.0-TFT",
          size: '3.0" TFT LCD',
          unitCost: "$4.25",
          moq: "1,000 units",
          leadTime: "8 weeks",
          confidence: "High",
          pastPrograms: ["Echo Show 5", "Echo Dot with Clock"],
          qualityScore: "A",
          notes: "Proven supplier for Echo products, excellent quality track record",
        },
        {
          supplier: "Tianma Microelectronics",
          partNumber: "TM-LCD-3.0-IPS",
          size: '3.0" IPS LCD',
          unitCost: "$4.50",
          moq: "500 units",
          leadTime: "6 weeks",
          confidence: "High",
          pastPrograms: ["Echo Show 8"],
          qualityScore: "A",
          notes: "Premium IPS display, better viewing angles",
        },
        {
          supplier: "Innolux Corporation",
          partNumber: "INX-LCD-2.8-TN",
          size: '2.8" TN LCD',
          unitCost: "$3.80",
          moq: "2,000 units",
          leadTime: "10 weeks",
          confidence: "Medium",
          pastPrograms: ["Echo Dot Gen 3"],
          qualityScore: "B+",
          notes: "Slightly smaller, cost-effective alternative",
        },
      ]

      setIsAnalyzing(false)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I've analyzed suppliers from past Echo programs and found 3 recommended options for a 3\" LCD display:",
          agent: "Supplier Management Agent",
          subAgent: "Should Cost sub-Agent",
          recommendations,
        },
      ])

      setTimeout(() => {
        recommendationsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I can help you with cost analysis, supplier recommendations, and supply chain insights. Try asking about component costs or supplier information!",
        },
      ])
    }
  }

  const handleRequestQuote = (recommendation: any) => {
    const quoteRequest = {
      id: `QR-${Date.now()}`,
      date: new Date().toISOString(),
      supplier: recommendation.supplier,
      partNumber: recommendation.partNumber,
      description: recommendation.size,
      estimatedCost: recommendation.unitCost,
      moq: recommendation.moq,
      leadTime: recommendation.leadTime,
      status: "Pending",
      source: "AI Assistant",
      agent: "Supplier Management Agent",
      subAgent: "Should Cost sub-Agent",
      requestedBy: "Current User",
      notes: recommendation.notes,
    }

    const existingRequests = JSON.parse(localStorage.getItem("quoteRequests") || "[]")
    localStorage.setItem("quoteRequests", JSON.stringify([...existingRequests, quoteRequest]))

    onClose()
    router.push("/dashboard")

    // Trigger storage event for same-window updates
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-background border-l shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">AI Assistant</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleClearChat} title="New conversation">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground ml-8" : "bg-muted"}`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {message.recommendations && (
                    <div className="mt-4 space-y-4" ref={recommendationsRef}>
                      <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <Bot className="h-5 w-5 text-primary" />
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-primary text-primary-foreground font-medium">{message.agent}</Badge>
                            {message.subAgent && (
                              <>
                                <span className="text-muted-foreground">→</span>
                                <Badge variant="secondary" className="font-medium">
                                  {message.subAgent}
                                </Badge>
                              </>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">AI-powered analysis complete</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {message.recommendations.map((rec, recIndex) => (
                          <Card key={recIndex} className="border-2">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-base">{rec.supplier}</CardTitle>
                                  <CardDescription className="text-sm">{rec.partNumber}</CardDescription>
                                </div>
                                <Badge variant={rec.confidence === "High" ? "default" : "secondary"}>
                                  {rec.confidence} Confidence
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Size:</span>
                                  <p className="font-medium">{rec.size}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Unit Cost:</span>
                                  <p className="font-medium text-primary">{rec.unitCost}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">MOQ:</span>
                                  <p className="font-medium">{rec.moq}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Lead Time:</span>
                                  <p className="font-medium">{rec.leadTime}</p>
                                </div>
                              </div>

                              <div className="text-sm">
                                <span className="text-muted-foreground">Quality Score:</span>
                                <Badge variant="outline" className="ml-2">
                                  {rec.qualityScore}
                                </Badge>
                              </div>

                              <div className="text-sm">
                                <span className="text-muted-foreground">Past Programs:</span>
                                <p className="text-xs mt-1">{rec.pastPrograms.join(", ")}</p>
                              </div>

                              <p className="text-xs text-muted-foreground">{rec.notes}</p>

                              <div className="flex gap-2 pt-2">
                                <Button size="sm" className="flex-1" onClick={() => handleRequestQuote(rec)}>
                                  Request Quote
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAnalyzing && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    <p className="text-sm font-medium">Analyzing...</p>
                  </div>
                  <div className="space-y-1">
                    {analysisSteps.map((step, index) => (
                      <p key={index} className="text-xs text-muted-foreground">
                        ✓ {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                className="flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isAnalyzing}
              />
              <Button size="icon" onClick={handleSend} disabled={isAnalyzing}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
