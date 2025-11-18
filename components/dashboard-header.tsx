"use client"
import { ChevronDown, User, LogOut, Package, Sparkles, X, Send, Bot, RotateCcw, Plus, CheckCircle2, Clock, Users, AlertCircle, Check, UploadCloud } from 'lucide-react'
import { useState, useRef, useEffect } from "react"
import { useRouter } from 'next/navigation'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Fixed typo in textarea import
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { useRole } from "@/hooks/use-role"
import { useUser } from "@/hooks/use-user"

interface DashboardHeaderProps {
  moduleName?: string
}

interface ConversationShortcut {
  id: string
  name: string
  prompt: string
}

export function DashboardHeader({ moduleName }: DashboardHeaderProps) {
  const router = useRouter()
  const { role, setRole, roles } = useRole()
  const { user, clearUser } = useUser()
  const { state } = useSidebar()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showActivity, setShowActivity] = useState(false)
  const [activityMessages, setActivityMessages] = useState<Array<{ id: number; message: string; timestamp: string }>>([])

  useEffect(() => {
    if (!showActivity) return

    const messages = [
      "Monitoring supplier capacity changes for Echo program...",
      "Detecting BOM update for Fire TV Stick 4K Max...",
      "Analyzing lead time increase from BOE Technology...",
      "Tracking quality alert for IC chips from Supplier ABC...",
      "Identifying inventory shortage risk for Q2 demand...",
      "Processing PCN notification from Innolux Corporation...",
      "Evaluating cost increase for thermal materials...",
      "Detecting shipment delay from Vietnam DC...",
      "Analyzing demand spike for Echo Show 8...",
      "Monitoring production capacity at CM Foxconn...",
      "Tracking logistics constraints in Southeast Asia...",
      "Identifying alternative suppliers for LCD displays...",
      "Processing RFQ responses for Echo Water Bottle components...",
      "Analyzing quality metrics from inspection reports...",
      "Detecting potential stockout for critical components...",
    ]

    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const newMessage = {
        id: Date.now(),
        message: randomMessage,
        timestamp: new Date().toLocaleTimeString(),
      }
      
      setActivityMessages((prev) => [newMessage, ...prev.slice(0, 19)]) // Keep last 20 messages
    }, 1000)

    return () => clearInterval(interval)
  }, [showActivity])

  // Helper function to stream messages
  const streamMessage = async (content: string, appendToLast: boolean = false) => {
    // Implementation would go here, assuming it's available in the scope or imported
    // For now, let's assume it exists and does its job
  }


  useEffect(() => {
    const handleCollaboration = () => {
      setIsChatOpen(true)
    }
    window.addEventListener("openAssistantWithCollaboration", handleCollaboration)
    
    const handleQualityExplainability = ((event: CustomEvent) => {
      setIsChatOpen(true)
      const { message, qualityAnalysis, shipmentAnalysis, costAnalysis, shouldCostData, toolingCostData } = event.detail
      
      // Save to localStorage so it can be picked up when chat opens
      localStorage.setItem("assistantCollaboration", JSON.stringify({
        message,
        type: event.detail.type || "quality-explanation",
        qualityAnalysis,
        shipmentAnalysis,
        costAnalysis,
        shouldCostData,
        toolingCostData // Added toolingCostData to localStorage
      }))
    }) as EventListener
    
    window.addEventListener("openAssistantWithMessage", handleQualityExplainability)
    
    return () => {
      window.removeEventListener("openAssistantWithCollaboration", handleCollaboration)
      window.removeEventListener("openAssistantWithMessage", handleQualityExplainability)
    }
  }, [])

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
            <div className="flex items-center gap-2 relative">
              <Package className="h-5 w-5 text-primary" />
              <span 
                className="text-lg font-semibold cursor-pointer"
                onClick={() => setShowActivity(!showActivity)}
              >
                Ops Advisor
              </span>
              <span 
                className="relative flex h-2 w-2 cursor-pointer"
                onClick={() => setShowActivity(!showActivity)}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>

              {showActivity && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowActivity(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-border bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <h3 className="font-semibold text-sm">24x7 Agent Activity</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitoring supply chain events and filtering for your role
                      </p>
                    </div>
                    <div className="overflow-y-auto p-2 space-y-1 flex-1">
                      {activityMessages.length === 0 ? (
                        <div className="text-center py-8 text-sm text-muted-foreground">
                          Listening for supply chain events...
                        </div>
                      ) : (
                        activityMessages.map((msg) => (
                          <div 
                            key={msg.id}
                            className="p-2 bg-muted/30 rounded text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-300"
                          >
                            <p className="text-foreground">{msg.message}</p>
                            <p className="text-muted-foreground text-[10px]">{msg.timestamp}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
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

interface Message {
  role: string
  content: string
  agent?: string
  subAgent?: string
  recommendations?: any[]
  image?: string
  milestone?: any
  isStreaming?: boolean
  isFactoryOps?: boolean
  resolutionOptions?: any[]
  poData?: { poNumber: string; productName: string; asinNumber: string }
  qualityAnalysis?: {
    rootCause: { title: string; findings: string[] }
    impact: { title: string; metrics: Array<{ label: string; value: string; severity: string }> }
    correctiveActions: { title: string; actions: Array<{ step: string; description: string; status: string }> }
  }
  shipmentAnalysis?: {
    rootCause: { title: string; findings: string[] }
    impact: { title: string; metrics: Array<{ label: string; value: string; severity: string }> }
    recommendations: { title: string; actions: Array<{ step: string; description: string; priority: string }> }
  }
  costAnalysis?: {
    component: string
    mpn: string
    supplier: string
    currentCost: number
    commodityType: string
    opportunity: string
    marketDynamics: { title: string; trends: string[]; forecast: string }
    demandAnalysis: { title: string; programs: Array<{ name: string; demand: string; timeline: string }> }
    recommendation: { title: string; action: string; reasoning: string[]; impact: string; timeline: string; recommendedCost?: string }
  }
  shouldCostData?: {
    component: string
    mpn: string
    supplier: string
    shouldCost: number
    actualCost: number
    calculation: {
      title: string
      methodology: string
      factors: Array<{ name: string; value: string; weight: string; impact: string }>
      comparableParts: Array<{ mpn: string; supplier: string; cost: string }>
    }
    conclusion: string
  }
  toolingCostData?: {
    toolName: string
    toolId: string
    toolType: string
    supplier: string
    site: string
    shouldCost: number
    actualCost: number
    calculation: {
      title: string
      methodology: string
      factors: Array<{ name: string; value: string; weight: string; impact: string }>
      comparableTooling: Array<{ type: string; supplier: string; cost: string; site: string }>
    }
    conclusion: string
  }
  programPlan?: { // Added programPlan to Message interface
    productName: string;
    streetDate: string;
    features?: string;
    image?: string;
    milestones: Array<{ name: string; date: string; status: "complete" | "in-progress" | "upcoming" }>;
  }
}

function AssistantChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today!" }
  ])
  const [input, setInput] = useState("")
  const [participants, setParticipants] = useState<string[]>([])
  const [isCapacityCollaboration, setIsCapacityCollaboration] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([])
  const [pdpStep, setPdpStep] = useState<"idle" | "product-name" | "features" | "street-date" | "processing" | "complete">("idle")
  const [pdpData, setPdpData] = useState<{ productName?: string; features?: string; streetDate?: string; image?: string }>({})
  const [customShortcuts, setCustomShortcuts] = useState<ConversationShortcut[]>([])
  const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false)
  const [newShortcutName, setNewShortcutName] = useState("")
  const [newShortcutPrompt, setNewShortcutPrompt] = useState("")
  const recommendationsRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)

  // Dummy streamMessage function for this component's scope if not globally available
  const streamMessage = async (content: string, appendToLast: boolean = false) => {
    const words = content.split(' ')
    
    if (appendToLast) {
      // Continue streaming to last message
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1]
          const currentContent = lastMsg.content
          const newContent = currentContent + (i === 0 ? '' : ' ') + words[i]
          return [...prev.slice(0, -1), { ...lastMsg, content: newContent, isStreaming: i < words.length - 1 }]
        })
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Create new streaming message
      setMessages(prev => [...prev, { role: "assistant", content: "", isStreaming: true }])
      
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1]
          const newContent = lastMsg.content + (i === 0 ? '' : ' ') + words[i]
          return [...prev.slice(0, -1), { ...lastMsg, content: newContent, isStreaming: i < words.length - 1 }]
        })
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      
      // Mark as complete
      setMessages(prev => {
        const lastMsg = prev[prev.length - 1]
        return [...prev.slice(0, -1), { ...lastMsg, isStreaming: false }]
      })
    }
  }


  useEffect(() => {
    const saved = localStorage.getItem("customShortcuts")
    if (saved) {
      setCustomShortcuts(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      const collabData = localStorage.getItem("assistantCollaboration")
      if (collabData) {
        console.log("[v0] Collaboration data found:", collabData)
        const { message, participants: collabParticipants, type, resolutionOptions, poNumber, productName, asinNumber, qualityAnalysis, shipmentAnalysis, costAnalysis, shouldCostData, toolingCostData } = JSON.parse(collabData)
        
        console.log("[v0] Parsed collaboration data - type:", type)
        
        setMessages([
          { role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today!" }
        ])
        
        if (type === "tooling-cost-explanation" && toolingCostData) {
          console.log("[v0] Tooling cost explanation detected, starting stream...")
          
          // Create the full explanation text
          const fullExplanation = `Let me explain how I calculated the should cost of $${toolingCostData.shouldCost.toLocaleString()} for ${toolingCostData.toolName} (${toolingCostData.toolType}).

I analyzed this tooling investment using a comprehensive four-factor approach weighted by industry standards and historical data.

**Tool Complexity & Type (35% weight)**: I evaluated the specific requirements for ${toolingCostData.toolType.toLowerCase()}. ${toolingCostData.calculation.factors[0].impact}

**Supplier Historical Performance (30% weight)**: Reviewing ${toolingCostData.supplier}'s track record at ${toolingCostData.site}. ${toolingCostData.calculation.factors[1].impact}

**Market Benchmarks (25% weight)**: Comparing against industry standard pricing for similar ${toolingCostData.toolType.toLowerCase()} tools. ${toolingCostData.calculation.factors[2].impact}

**Amortization Optimization (10% weight)**: Analyzing the cost-per-unit impact across ${toolingCostData.calculation.factors[3].value}. ${toolingCostData.calculation.factors[3].impact}

${toolingCostData.conclusion}`
          
          // Split into words for streaming
          const words = fullExplanation.split(' ')
          console.log("[v0] Total words to stream:", words.length)
          
          // Add initial empty message
          setMessages(prev => [...prev, { role: "assistant", content: "", isStreaming: true }])
          
          // Stream word by word
          let currentIndex = 0
          const streamInterval = setInterval(() => {
            if (currentIndex < words.length) {
              setMessages(prev => {
                const lastMsg = prev[prev.length - 1]
                const currentContent = lastMsg.content
                const nextWord = words[currentIndex]
                const newContent = currentContent + (currentIndex === 0 ? '' : ' ') + nextWord
                console.log("[v0] Streaming word", currentIndex + 1, "of", words.length)
                return [...prev.slice(0, -1), { ...lastMsg, content: newContent, isStreaming: true }]
              })
              currentIndex++
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            } else {
              console.log("[v0] Streaming complete, showing cards...")
              clearInterval(streamInterval)
              
              // Mark streaming as complete
              setMessages(prev => {
                const lastMsg = prev[prev.length - 1]
                return [...prev.slice(0, -1), { ...lastMsg, isStreaming: false }]
              })
              
              // Show the detailed breakdown cards
              setTimeout(() => {
                console.log("[v0] Adding tooling cost cards to messages")
                setMessages(prev => [...prev, {
                  role: "assistant",
                  content: "Here's the detailed tooling cost analysis breakdown:",
                  toolingCostData
                }])
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
              }, 800)
            }
          }, 30) // 30ms per word
          
        } else if (type === "should-cost-explanation" && shouldCostData) {
          console.log("[v0] Should cost explanation detected, starting stream...")
          
          // Create the full explanation text
          const fullExplanation = `Let me explain how I calculated the should cost of $${shouldCostData.shouldCost.toFixed(2)} for ${shouldCostData.component} (${shouldCostData.mpn}) from ${shouldCostData.supplier}.

I analyzed this component using a comprehensive three-factor approach weighted by market relevance and data reliability.

**Market Conditions Analysis (40% weight)**: I reviewed current ${shouldCostData.commodityType || "Electronics"} commodity pricing trends. Recent RFQs from Q4 2024 show similar components ranging from $${(shouldCostData.shouldCost * 0.85).toFixed(2)} to $${(shouldCostData.shouldCost * 1.15).toFixed(2)}. Industry reports from Gartner and IDC indicate stable pricing trends.

**Historical Program Pricing (35% weight)**: Examining ${shouldCostData.calculation.factors[1].value.toLowerCase()} reveals consistent pricing patterns. ${shouldCostData.calculation.factors[1].impact}

**Look-alike Parts Comparison (25% weight)**: Analyzing ${shouldCostData.calculation.comparableParts.length} comparable components from suppliers including ${shouldCostData.calculation.comparableParts.map((p: any) => p.supplier).join(', ')}, with prices ranging from $${Math.min(...shouldCostData.calculation.comparableParts.map((p: any) => parseFloat(p.cost))).toFixed(2)} to $${Math.max(...shouldCostData.calculation.comparableParts.map((p: any) => parseFloat(p.cost))).toFixed(2)}.

${shouldCostData.conclusion}`
          
          // Split into words for streaming
          const words = fullExplanation.split(' ')
          console.log("[v0] Total words to stream:", words.length)
          
          // Add initial empty message
          setMessages(prev => [...prev, { role: "assistant", content: "", isStreaming: true }])
          
          // Stream word by word
          let currentIndex = 0
          const streamInterval = setInterval(() => {
            if (currentIndex < words.length) {
              setMessages(prev => {
                const lastMsg = prev[prev.length - 1]
                const currentContent = lastMsg.content
                const nextWord = words[currentIndex]
                const newContent = currentContent + (currentIndex === 0 ? '' : ' ') + nextWord
                console.log("[v0] Streaming word", currentIndex + 1, "of", words.length)
                return [...prev.slice(0, -1), { ...lastMsg, content: newContent, isStreaming: true }]
              })
              currentIndex++
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            } else {
              console.log("[v0] Streaming complete, showing cards...")
              clearInterval(streamInterval)
              
              // Mark streaming as complete
              setMessages(prev => {
                const lastMsg = prev[prev.length - 1]
                return [...prev.slice(0, -1), { ...lastMsg, isStreaming: false }]
              })
              
              // Show the detailed breakdown cards
              setTimeout(() => {
                console.log("[v0] Adding should cost cards to messages")
                setMessages(prev => [...prev, {
                  role: "assistant",
                  content: "Here's the detailed cost calculation breakdown:",
                  shouldCostData
                }])
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
              }, 800)
            }
          }, 30) // 30ms per word
          
        } else if (type === "cost-analysis" && costAnalysis) {
          console.log("[v0] Cost analysis detected")
          const messageToStream = message || `Analyzing cost opportunity for ${costAnalysis.component}...`
          streamMessage(messageToStream).then(() => {
            setTimeout(() => {
              setMessages(prev => [...prev, {
                role: "assistant",
                content: "Let me analyze the cost opportunity and market dynamics:",
                costAnalysis
              }])
            }, 500)
          })
        } else if (type === "shipment-explanation" && shipmentAnalysis) {
          console.log("[v0] Shipment explanation detected")
          const messageToStream = message || `Analyzing shipment delay for tracking ${shipmentAnalysis.trackingNumber}...`
          streamMessage(messageToStream).then(() => {
            setTimeout(() => {
              setMessages(prev => [...prev, {
                role: "assistant",
                content: "Let me break down the shipment delay analysis and provide recommendations:",
                shipmentAnalysis
              }])
            }, 500)
          })
        } else if (type === "quality-explanation" && qualityAnalysis) {
          console.log("[v0] Quality explanation detected")
          const messageToStream = message || `Analyzing quality issue ${qualityAnalysis.issueId}...`
          streamMessage(messageToStream).then(() => {
            setTimeout(() => {
              setMessages(prev => [...prev, {
                role: "assistant",
                content: "Let me break down the quality analysis for you:",
                qualityAnalysis
              }])
            }, 500)
          })
        } else if (type === "delay-explanation" && resolutionOptions) {
          console.log("[v0] Delay explanation detected")
          const messageToStream = message || "Analyzing delay and resolution options..."
          streamMessage(messageToStream).then(() => {
            setTimeout(() => {
              setMessages(prev => [...prev, {
                role: "assistant",
                content: "**Recommended Actions:**\n\nI've analyzed several options to mitigate this delay. Please select the approach that best fits your timeline and budget:",
                resolutionOptions,
                poData: { poNumber, productName, asinNumber }
              }])
            }, 500)
          })
        } else {
          console.log("[v0] Default message streaming")
          streamMessage(message)
        }
        
        setParticipants(collabParticipants || [])
        
        localStorage.removeItem("assistantCollaboration")
      }
    }
  }, [isOpen])

  const defaultShortcuts = [
    { id: "pdp", name: "Product Development Plan", prompt: "PRODUCT_DEVELOPMENT_PLAN" },
    { id: "collaborate-cm", name: "Collaborate with CM", prompt: "I need to collaborate with my Contract Manufacturer to discuss production capacity and planning" },
    { id: "factory", name: "Factory Operations", prompt: "Analyze factory operations and capacity planning" },
    { id: "program", name: "Program", prompt: "Show me program status and milestones" },
    { id: "procurement", name: "Procurement", prompt: "Help me with procurement and supplier management" },
    { id: "logistics", name: "Logistics", prompt: "Analyze logistics and shipment planning" },
    { id: "bom", name: "Bill of Material", prompt: "Help me with BOM analysis and cost optimization" },
    { id: "insights", name: "Insights", prompt: "Generate supply chain insights and recommendations" },
  ]

  const allShortcuts = [...defaultShortcuts, ...customShortcuts]

  const handleShortcutClick = (prompt: string) => {
    if (prompt === "PRODUCT_DEVELOPMENT_PLAN") {
      setMessages(prev => [...prev, { role: "user", content: "Help me create a product development plan for a new device launch" }])
      setTimeout(async () => {
        await streamMessage("I'd be happy to help you create a product development plan! What product do you want to build?")
        setPdpStep("product-name")
      }, 500)
    } else if (prompt === "I need to collaborate with my Contract Manufacturer to discuss production capacity and planning") {
      setMessages(prev => [...prev, { role: "user", content: prompt }])
      
      setTimeout(async () => {
        await streamMessage("I'm adding your Contract Manufacturer (Foxconn) to this conversation to discuss capacity expansion options.")
        setParticipants(["Foxconn - Contract Manufacturer"])
        
        setTimeout(async () => {
          await streamMessage("Foxconn has joined the conversation. I've shared the capacity analysis with them. They're reviewing their production line availability and will propose solutions for the shortfall.\n\n**Next steps:**\n• Review current production line utilization\n• Explore night shift or weekend production options\n• Consider reallocating capacity from other programs\n• Evaluate external capacity partnerships\n\nHow would you like to proceed?")
        }, 1500)
      }, 800)
    } else {
      setMessages(prev => [...prev, { role: "user", content: prompt }])
      setTimeout(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await streamMessage("I can help you with cost analysis, supplier recommendations, and supply chain insights. Try asking about component costs or supplier information!")
      }, 500)
    }
  }

  const handleAddShortcut = () => {
    if (!newShortcutName.trim() || !newShortcutPrompt.trim()) return

    const newShortcut: ConversationShortcut = {
      id: `custom-${Date.now()}`,
      name: newShortcutName.trim(),
      prompt: newShortcutPrompt.trim(),
    }

    const updated = [...customShortcuts, newShortcut]
    setCustomShortcuts(updated)
    localStorage.setItem("customShortcuts", JSON.stringify(updated))

    setNewShortcutName("")
    setNewShortcutPrompt("")
    setIsAddShortcutOpen(false)
  }

  const handleClearChat = () => {
    setMessages([{ role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today!" }])
    setInput("")
    setIsAnalyzing(false)
    setAnalysisSteps([])
    setPdpStep("idle")
    setPdpData({})
    setParticipants([])
    setIsCapacityCollaboration(false) // Reset collaboration state
  }

  const isCostQuery = (query: string) => {
    const lowerQuery = query.toLowerCase()
    const hasCostKeyword = /\b(cost|price|pricing|quote)\b/.test(lowerQuery)
    const hasDisplayKeyword = /\b(display|lcd|screen|panel|monitor)\b/.test(lowerQuery)
    const hasSize = /\b\d+(\.\d+)?\s*(inch|"|in|')\b/.test(lowerQuery)

    return (hasCostKeyword || hasDisplayKeyword) && (hasDisplayKeyword || hasSize)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setPdpData(prev => ({ ...prev, image: imageUrl }))
        setMessages(prev => [...prev, { role: "user", content: "Product image uploaded", image: imageUrl }])
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Perfect! I can see the Echo smart water bottle with display. Now, what's your target street date for this product?"
          }])
          setPdpStep("street-date")
        }, 800)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    
    const lastMessage = messages[messages.length - 1]; // Get last message for checking resolutionOptions

    if (pdpStep === "product-name") {
      setMessages(prev => [...prev, { role: "user", content: userMessage }])
      setPdpData(prev => ({ ...prev, productName: userMessage }))
      
      setTimeout(async () => {
        await streamMessage(`Great! Let's build a product development plan for "${userMessage}". What are the key features and specifications for this product?`)
        setPdpStep("features")
      }, 800)
      return
    }

    if (pdpStep === "features") {
      setMessages(prev => [...prev, { role: "user", content: userMessage }])
      setPdpData(prev => ({ ...prev, features: userMessage }))
      
      setTimeout(async () => {
        await streamMessage("Perfect! Now, please upload an image of the product concept or design. You can drag and drop an image here or click to browse.")
        // Trigger the file input click
        fileInputRef.current?.click()
      }, 800)
      return
    }

    if (pdpStep === "street-date") {
      setMessages(prev => [...prev, { role: "user", content: userMessage }])
      setPdpData(prev => ({ ...prev, streetDate: userMessage }))
      setPdpStep("processing")
      
      setTimeout(async () => {
        setIsAnalyzing(true)
        setAnalysisSteps([])
        
        const steps = [
          "Coordinating with PLM Domain Agent for product requirements...",
          "Consulting Supplier Management Agent for component sourcing...",
          "Engaging Planning Agent for production timeline...",
          "Reviewing with Quality Agent for testing requirements...",
          "Coordinating with Logistics Agent for distribution planning...",
          "Compiling comprehensive milestone plan..."
        ]
        
        for (let i = 0; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 1200))
          setAnalysisSteps(prev => [...prev, steps[i]])
        }
        
        setIsAnalyzing(false)
        
        // Prepare the programPlan data for the message
        const programPlanData = {
          productName: pdpData.productName || userMessage,
          streetDate: userMessage,
          features: pdpData.features,
          image: pdpData.image,
          milestones: [
            { name: "Working Backward", date: "Sep 2025", status: "complete" },
            { name: "Product Assessment", date: "Nov 2025", status: "in-progress" },
            { name: "BRD", date: "Jan 2026", status: "upcoming" },
            { name: "Dev Commit", date: "Feb 2026", status: "upcoming" },
            { name: "HVT", date: "Mar 2026", status: "upcoming" },
            { name: "EVT", date: "Apr 2026", status: "upcoming" },
            { name: "DVT", date: "May 2026", status: "upcoming" },
            { name: "PVT", date: "Jun 2026", status: "upcoming" },
            { name: "Ok2Ship", date: "Aug 2026", status: "upcoming" }
          ]
        };

        await streamMessage(`I've created a comprehensive product development plan for ${programPlanData.productName} with your target street date of ${programPlanData.streetDate}.`)
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Here's the detailed plan overview:", // Content for the programPlan message
            programPlan: programPlanData
          }]);
          setPdpStep("complete")
        }, 1000);
      }, 1000)
      return
    }

    if (pdpStep === "complete") {
      if (userMessage.toLowerCase().includes("yes") || userMessage.toLowerCase().includes("save") || userMessage.toLowerCase().includes("approve")) {
        setMessages(prev => [...prev, { role: "user", content: userMessage }])
        handleCreateProgram()
        return
      }
    }
    
    // Check if the last message had resolution options and the user is selecting one
    if (lastMessage && lastMessage.resolutionOptions && lastMessage.poData && /option [1-4]|i('d| would) like (to proceed with |option)|select option/i.test(userMessage.toLowerCase())) {
      const optionNum = parseInt(userMessage.match(/[1-4]/)?.[0] || "0")
      if (optionNum >= 1 && optionNum <= lastMessage.resolutionOptions.length) {
        setMessages(prev => [...prev, { role: "user", content: userMessage }])
        
        const selectedOption = lastMessage.resolutionOptions[optionNum - 1]
        const poData = lastMessage.poData
        
        setTimeout(async () => {
          await streamMessage(`Excellent choice! I'll implement "${selectedOption.title}" for ${poData.productName} (${poData.poNumber}).`)
          
          setTimeout(async () => {
            await streamMessage("\n\nI've created an action item to track this resolution. You can find it in your dashboard under the Actions tab.")
            
            const delayResolutionAction = {
              id: `PO-${Date.now()}`,
              title: `${poData.productName}: ${selectedOption.title}`,
              description: `${poData.productName}: ${selectedOption.title}. ${poData.poNumber} (${poData.asinNumber}). Impact: ${selectedOption.impact}. Cost: ${selectedOption.cost}. Timeline: ${selectedOption.timeline}`,
              status: "approved",
              priority: "high",
              agent: "Supply Planning Agent",
              contributingAgents: ["Logistics Agent", "Supplier Management Agent"],
              roles: ["Supply Planner", "Logistics Coordinator"],
              timestamp: new Date().toISOString()
            }
            
            const existingApproved = JSON.parse(localStorage.getItem("approvedActions") || "[]")
            localStorage.setItem("approvedActions", JSON.stringify([...existingApproved, delayResolutionAction.id]))
            
            const approvedTimestamps = JSON.parse(localStorage.getItem("approvedTimestamps") || "{}")
            approvedTimestamps[delayResolutionAction.id] = new Date().toISOString()
            localStorage.setItem("approvedTimestamps", JSON.stringify(approvedTimestamps))
            
            const existingStatuses = JSON.parse(localStorage.getItem("actionStatuses") || "{}")
            localStorage.setItem("actionStatuses", JSON.stringify({ ...existingStatuses, [delayResolutionAction.id]: "approved" }))
            
            const existingPrograms = JSON.parse(localStorage.getItem("programActions") || "[]")
            localStorage.setItem("programActions", JSON.stringify([...existingPrograms, delayResolutionAction]))
            
            window.dispatchEvent(new Event("storage"))
          }, 2000)
        }, 800)
        return
      }
    }
    
    if (userMessage.toLowerCase().includes("start collaboration")) {
      setMessages(prev => [...prev, { role: "user", content: userMessage }])
      
      setTimeout(async () => {
        await streamMessage("I'm adding the Contract Manufacturer Factory Operations team to this conversation to discuss capacity expansion options for the Fire SMP Horizon program.")
        setParticipants(["Foxconn - Factory Ops Manager"])
        setIsCapacityCollaboration(true)
        
        setTimeout(async () => {
          await streamMessage("Foxconn has joined the conversation. I've shared the capacity analysis with them. They're reviewing their production line availability and will propose solutions for the shortfall.\n\n**Next steps:**\n• Review current production line utilization\n• Explore night shift or weekend production options\n• Consider reallocating capacity from other programs\n• Evaluate external capacity partnerships\n\nHow would you like to proceed?")
        }, 1500)
      }, 800)
      return
    }

    if (isCapacityCollaboration && /option [1-4]|i('d| would) like (to proceed with |option)|select option/i.test(userMessage.toLowerCase())) {
      const optionNum = parseInt(userMessage.match(/[1-4]/)?.[0] || "0")
      if (optionNum >= 1 && optionNum <= 4) {
        setMessages(prev => [...prev, { role: "user", content: userMessage }])
        
        const optionDetails = [
          { title: "Add Night Shift Capacity", description: "Run 2nd shift production (6 PM - 2 AM) on Line 3. Impact: +15K units/week, Cost: $45K/week, Timeline: 2 weeks setup" },
          { title: "Weekend Production", description: "Saturday/Sunday production on existing lines. Impact: +8K units/week, Cost: $28K/week, Timeline: 1 week setup" },
          { title: "Reallocate Line Capacity", description: "Shift Echo Dot production to partner facility. Impact: +20K units/week, Cost: $15K transition, Timeline: 3 weeks" },
          { title: "Temporary External Partnership", description: "Partner with Pegatron Chennai. Impact: +12K units/week, Cost: $0.35/unit premium, Timeline: 4 weeks" }
        ]
        
        const selectedOption = optionDetails[optionNum - 1]
        
        setTimeout(async () => {
          await streamMessage("Excellent choice! I'll coordinate the implementation of this capacity expansion plan.")
          
          setTimeout(async () => {
            await streamMessage("\n\nI've created an action item to track this capacity expansion initiative. You can find it in your dashboard under the Actions tab.")
            
            const capacityAction = {
              id: `CAP-${Date.now()}`,
              title: `Fire SMP Horizon: ${selectedOption.title}`,
              description: selectedOption.description,
              status: "approved",
              priority: "high",
              agent: "Supply Planning Agent",
              contributingAgents: ["Manufacturing Agent", "Program Agent"],
              roles: ["Supply Planner", "Sustaining Ops Program Mgr", "Material Program Mgr"],
              timestamp: new Date().toISOString()
            }
            
            // Save to localStorage
            const existingApproved = JSON.parse(localStorage.getItem("approvedActions") || "[]")
            localStorage.setItem("approvedActions", JSON.stringify([...existingApproved, capacityAction.id]))
            
            const approvedTimestamps = JSON.parse(localStorage.getItem("approvedTimestamps") || "{}")
            approvedTimestamps[capacityAction.id] = new Date().toISOString()
            localStorage.setItem("approvedTimestamps", JSON.stringify(approvedTimestamps))
            
            const existingStatuses = JSON.parse(localStorage.getItem("actionStatuses") || "{}")
            localStorage.setItem("actionStatuses", JSON.stringify({ ...existingStatuses, [capacityAction.id]: "approved" }))
            
            const existingPrograms = JSON.parse(localStorage.getItem("programActions") || "[]")
            localStorage.setItem("programActions", JSON.stringify([...existingPrograms, capacityAction]))
            
            // Trigger storage event to update UI
            window.dispatchEvent(new Event("storage"))
            
            setIsCapacityCollaboration(false)
          }, 2000)
        }, 800)
        return
      }
    }
    
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    // Placeholder for actual API call or logic
    if (isCostQuery(userMessage)) {
      // Mocking a response for cost queries
      setTimeout(async () => {
        await streamMessage("I'm looking up the cost information for the components you mentioned. Please wait a moment...")
        // In a real application, this would involve an API call to fetch pricing data.
        // For this example, we'll simulate a response.
        await streamMessage("\n\nI found that the average cost for a 5-inch LCD panel from our preferred supplier is $12.50, with a lead time of 4 weeks. Would you like me to explore alternative suppliers or bulk discounts?")
      }, 1000)
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await streamMessage("I can help you with cost analysis, supplier recommendations, and supply chain insights. Try asking about component costs or supplier information!")
    }
  }

  const handleCreateProgram = () => {
    if (!pdpData.productName || !pdpData.streetDate) return

    const contributingAgents = [
      "Device Ops Supply Chain Agent",
      "PLM Domain Agent",
      "Supplier Management Domain Agent", 
      "Planning Domain Agent",
      "Quality Domain Agent",
      "Logistics Domain Agent"
    ]

    const programAction = {
      id: `PROG-${Date.now()}`,
      title: `Launch ${pdpData.productName} Program`,
      description: `Complete product development plan for ${pdpData.productName} with street date ${pdpData.streetDate}. All milestones defined from Working Backward through Ok2Ship.`,
      status: "approved",
      priority: "high",
      agent: "PLM Domain Agent",
      contributingAgents: contributingAgents,
      roles: ["Product Ops Leader", "NPI Ops Program Mgr", "Material Program Mgr"],
      program: {
        name: pdpData.productName,
        streetDate: pdpData.streetDate,
        features: pdpData.features,
        image: pdpData.image
      }
    }

    const existingApproved = JSON.parse(localStorage.getItem("approvedActions") || "[]")
    localStorage.setItem("approvedActions", JSON.stringify([...existingApproved, programAction.id]))

    const existingStatuses = JSON.parse(localStorage.getItem("actionStatuses") || "{}")
    localStorage.setItem("actionStatuses", JSON.stringify({ ...existingStatuses, [programAction.id]: "approved" }))

    try {
      const existingPrograms = JSON.parse(localStorage.getItem("programActions") || "[]")
      // Keep only the last 50 items to prevent quota issues
      const limitedPrograms = existingPrograms.slice(-49)
      localStorage.setItem("programActions", JSON.stringify([...limitedPrograms, programAction]))
    } catch (error) {
      console.warn("Failed to save to localStorage, clearing old data:", error)
      // If still failing, keep only the new item
      localStorage.setItem("programActions", JSON.stringify([programAction]))
    }

    onClose()
    
    router.push("/dashboard?tab=actions&scrollTo=approved")
    window.dispatchEvent(new Event("storage"))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/") && pdpStep === "features") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setPdpData(prev => ({ ...prev, image: imageUrl }))
        setMessages(prev => [...prev, { role: "user", content: "Product image uploaded", image: imageUrl }])
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Perfect! I can see the Echo smart water bottle with display. Now, what's your target street date for this product?"
          }])
          setPdpStep("street-date")
        }, 800)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

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
              {participants.length > 0 && (
                <div className="flex items-center gap-1 ml-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">+{participants.length}</span>
                </div>
              )}
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

          {participants.length > 0 && (
            <div className="px-4 py-2 bg-muted/50 border-b">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-muted-foreground">Participants:</span>
                {participants.map((participant, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {participant}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="border-b bg-muted/30">
            <div className="flex gap-2 p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {allShortcuts.map((shortcut) => (
                <Button
                  key={shortcut.id}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap flex-shrink-0 bg-background hover:bg-accent"
                  onClick={() => handleShortcutClick(shortcut.prompt)}
                >
                  {shortcut.name}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap flex-shrink-0 bg-background hover:bg-accent gap-1"
                onClick={() => setIsAddShortcutOpen(true)}
              >
                <Plus className="h-3 w-3" />
                Add new
              </Button>
            </div>
          </div>

          <div 
            className="flex-1 overflow-y-auto p-4"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user" 
                        ? "bg-primary text-primary-foreground ml-8" 
                        : message.isFactoryOps
                        ? "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    {message.image && (
                      <img src={message.image || "/placeholder.svg"} alt="Product" className="mt-3 rounded-lg max-w-full h-auto" />
                    )}
                  </div>

                  {message.resolutionOptions && message.resolutionOptions.length > 0 && (
                    <Card className="mt-3">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Resolution Options</CardTitle>
                        <CardDescription className="text-xs">Select an option to proceed</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {message.resolutionOptions.map((option: any) => (
                          <div 
                            key={option.id}
                            className="p-3 border rounded-lg cursor-pointer hover:border-primary hover:bg-accent/50 transition-colors"
                            onClick={() => {
                              // Pre-fill input with the selected option to make sending easier
                              setInput(`I'd like to proceed with Option ${option.id}: ${option.title}`)
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-semibold text-sm">Option {option.id}: {option.title}</div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <span className="text-muted-foreground">Impact:</span>
                                <p className="font-medium text-green-600">{option.impact}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cost:</span>
                                <p className="font-medium">{option.cost}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Timeline:</span>
                                <p className="font-medium">{option.timeline}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Cost Analysis Cards */}
                  {message.costAnalysis && (
                    <div className="space-y-3 mt-3">
                      {/* Market Dynamics Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{message.costAnalysis.marketDynamics.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">{message.costAnalysis.commodityType}</Badge>
                              </div>
                              <CardDescription className="text-xs mt-1">{message.costAnalysis.component} ({message.costAnalysis.mpn})</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="bg-muted/50 rounded-lg p-3">
                            <div className="text-sm font-semibold mb-2">Current Market Trends:</div>
                            <div className="space-y-1.5">
                              {message.costAnalysis.marketDynamics.trends.map((trend: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                                  <span>{trend}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                            <div className="text-sm font-semibold text-blue-900 dark:text-blue-400 mb-1">Price Forecast:</div>
                            <p className="text-sm text-foreground">{message.costAnalysis.marketDynamics.forecast}</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Demand Analysis Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
                                <Package className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{message.costAnalysis.demandAnalysis.title}</CardTitle>
                                <Badge variant="outline" className="text-xs">Multi-Program</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                          {message.costAnalysis.demandAnalysis.programs.map((program: any, idx: number) => (
                            <div key={idx} className="bg-muted/50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-sm">{program.name}</div>
                                <Badge variant="secondary" className="text-xs">{program.timeline}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{program.demand}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Recommendation Card */}
                      <Card 
                        className={`border-l-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                          message.costAnalysis.opportunity === 'proactive-buy' ? 'border-l-orange-500' : 'border-l-green-500'
                        }`}
                        onClick={() => {
                          const costAction = {
                            id: `COST-${Date.now()}`,
                            title: `${message.costAnalysis.component}: ${message.costAnalysis.recommendation.action}`,
                            description: `${message.costAnalysis.recommendation.action} for ${message.costAnalysis.component} (${message.costAnalysis.mpn}) from ${message.costAnalysis.supplier}. ${message.costAnalysis.recommendation.reasoning.join(' ')} Impact: ${message.costAnalysis.recommendation.impact}. Timeline: ${message.costAnalysis.recommendation.timeline}.${message.costAnalysis.recommendation.recommendedCost ? ` Recommended cost: ${message.costAnalysis.recommendation.recommendedCost}` : ''}`,
                            status: "approved",
                            priority: message.costAnalysis.opportunity === 'proactive-buy' ? 'high' : 'medium',
                            agent: "Commodity Agent",
                            contributingAgents: ["Supplier Management Agent", "Supply Planning Agent"],
                            roles: ["Global Commodity Manager", "Material Program Mgr"],
                            timestamp: new Date().toISOString()
                          }
                          
                          const existingApproved = JSON.parse(localStorage.getItem("approvedActions") || "[]")
                          localStorage.setItem("approvedActions", JSON.stringify([...existingApproved, costAction.id]))
                          
                          const approvedTimestamps = JSON.parse(localStorage.getItem("approvedTimestamps") || "{}")
                          approvedTimestamps[costAction.id] = new Date().toISOString()
                          localStorage.setItem("approvedTimestamps", JSON.stringify(approvedTimestamps))
                          
                          const existingStatuses = JSON.parse(localStorage.getItem("actionStatuses") || "{}")
                          localStorage.setItem("actionStatuses", JSON.stringify({ ...existingStatuses, [costAction.id]: "approved" }))
                          
                          const existingPrograms = JSON.parse(localStorage.getItem("programActions") || "[]")
                          localStorage.setItem("programActions", JSON.stringify([...existingPrograms, costAction]))
                          
                          window.dispatchEvent(new Event("storage"))
                          
                          setMessages(prev => [...prev, { 
                            role: "assistant", 
                            content: `Action created: "${message.costAnalysis.recommendation.action}" has been added to your dashboard. You can track its progress in the Actions tab.` 
                          }])
                        }}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className={`${
                                message.costAnalysis.opportunity === 'proactive-buy' 
                                  ? 'bg-orange-100 dark:bg-orange-950' 
                                  : 'bg-green-100 dark:bg-green-950'
                              }`}>
                                <CheckCircle2 className={`h-5 w-5 ${
                                  message.costAnalysis.opportunity === 'proactive-buy' 
                                    ? 'text-orange-600 dark:text-orange-500' 
                                    : 'text-green-600 dark:text-green-500'
                                }`} />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{message.costAnalysis.recommendation.title}</CardTitle>
                                <Badge 
                                  variant={message.costAnalysis.opportunity === 'proactive-buy' ? 'default' : 'secondary'}
                                  className={message.costAnalysis.opportunity === 'proactive-buy' ? 'bg-orange-500' : 'bg-green-500'}
                                >
                                  {message.costAnalysis.recommendation.action}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <div className="text-sm font-semibold mb-2">Reasoning:</div>
                            <div className="space-y-1.5">
                              {message.costAnalysis.recommendation.reasoning.map((reason: string, idx: number) => (
                                <div key={idx} className="flex items-start gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                                  <span>{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="bg-muted/50 rounded p-2">
                              <span className="text-muted-foreground">Impact:</span>
                              <p className="font-medium text-sm mt-0.5">{message.costAnalysis.recommendation.impact}</p>
                            </div>
                            <div className="bg-muted/50 rounded p-2">
                              <span className="text-muted-foreground">Timeline:</span>
                              <p className="font-medium text-sm mt-0.5">{message.costAnalysis.recommendation.timeline}</p>
                            </div>
                            {message.costAnalysis.recommendation.recommendedCost && (
                              <div className="bg-muted/50 rounded p-2">
                                <span className="text-muted-foreground">Target Cost:</span>
                                <p className="font-medium text-sm mt-0.5">{message.costAnalysis.recommendation.recommendedCost}</p>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                            Click to save as action
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {message.qualityAnalysis && (
                    <div className="space-y-3 mt-3">
                      {/* Root Cause Analysis Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950">
                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Root Cause Analysis</CardTitle>
                                <Badge variant="destructive" className="text-xs">Critical</Badge>
                              </div>
                              <CardDescription className="text-xs mt-1">Audio Crackling Issue</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">After thorough investigation across 1,247 affected Echo Dot units, our Quality and PLM agents have identified the root cause:</p>
                            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                              <p className="text-sm font-semibold text-foreground">Primary Issue: Speaker driver component variance from supplier "AudioTech Solutions" (Shenzhen facility)</p>
                              <div className="space-y-1.5 text-xs text-muted-foreground">
                                <div className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                                  <span>Batch #AT-2024-Q4-847 shows 15% higher impedance variance than specification</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                                  <span>Quality inspection data shows the issue correlates with production date range Dec 15-22, 2024</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-2">Contributing Factors:</p>
                            <div className="space-y-1.5 text-xs text-muted-foreground">
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                                <span>Supplier changed adhesive compound for voice coil without notification</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                                <span>Environmental stress testing at high temperatures ({'>'}35°C) reveals premature adhesive degradation</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                                <span>This causes voice coil misalignment, producing crackling at 80%+ volume</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Impact Assessment Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950">
                                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Impact Assessment</CardTitle>
                                <Badge variant="secondary" className="text-xs">High Priority</Badge>
                              </div>
                              <CardDescription className="text-xs mt-1">Scope and severity analysis</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            {message.qualityAnalysis.impact.metrics.slice(0, 4).map((metric: any, idx: number) => (
                              <div key={idx} className="bg-muted/50 rounded-lg p-3">
                                <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                                <div className="text-xl font-bold text-foreground">{metric.value}</div>
                                {metric.severity && (
                                  <Badge 
                                    variant={metric.severity === 'high' ? 'destructive' : metric.severity === 'medium' ? 'secondary' : 'outline'}
                                    className="text-xs mt-1"
                                  >
                                    {metric.severity}
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Customer Order Impact Section */}
                          {message.qualityAnalysis.impact.metrics.length > 4 && (
                            <div className="mt-3 space-y-3">
                              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                  <p className="text-sm font-semibold text-red-900 dark:text-red-400">Customer Order Impact</p>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-0.5">{message.qualityAnalysis.impact.metrics[4].label}</div>
                                    <div className="text-lg font-bold text-foreground">{message.qualityAnalysis.impact.metrics[4].value}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">{message.qualityAnalysis.impact.metrics[5].label}</div>
                                    <div className="text-sm text-foreground space-y-1">
                                      {message.qualityAnalysis.impact.metrics[5].value.split(', ').map((retailer: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                                          <span>{retailer}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Corrective Actions Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">Corrective Actions</CardTitle>
                                <Badge variant="outline" className="text-xs">In Progress</Badge>
                              </div>
                              <CardDescription className="text-xs mt-1">Recommended action plan</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                          {message.qualityAnalysis.correctiveActions.actions.map((action: any) => (
                            <Card 
                              key={action.step} 
                              className={`border-l-4 ${
                                action.status === 'Complete' ? 'border-l-green-500' :
                                action.status === 'In Progress' ? 'border-l-blue-500' :
                                'border-l-gray-300'
                              }`}
                            >
                              <CardContent className="pt-3 pb-3">
                                <div className="flex items-start gap-3">
                                  {action.status === 'Complete' ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  ) : action.status === 'In Progress' ? (
                                    <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="font-medium text-sm">{action.step}</p>
                                      <Badge 
                                        variant={action.status === 'Complete' ? 'default' : action.status === 'In Progress' ? 'outline' : 'secondary'}
                                        className={`${action.status === 'Complete' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400' : ''} ${action.status === 'In Progress' ? 'text-blue-800 dark:text-blue-400' : ''}`}
                                      >
                                        {action.status}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{action.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Shipment Analysis Card */}
                  {message.shipmentAnalysis && (
                    <div className="space-y-3 mt-3">
                      {/* Root Cause Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950">
                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{message.shipmentAnalysis.rootCause.title}</CardTitle>
                                <Badge variant="destructive" className="text-xs">Critical</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {message.shipmentAnalysis.rootCause.findings.map((finding: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                              <span>{finding}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Impact Assessment Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950">
                                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{message.shipmentAnalysis.impact.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">High Priority</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            {message.shipmentAnalysis.impact.metrics.slice(0, 4).map((metric: any, idx: number) => (
                              <div key={idx} className="bg-muted/50 rounded-lg p-3">
                                <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                                <div className="text-xl font-bold text-foreground">{metric.value}</div>
                                {metric.severity && (
                                  <Badge 
                                    variant={metric.severity === 'high' ? 'destructive' : metric.severity === 'medium' ? 'secondary' : 'outline'}
                                    className="text-xs mt-1"
                                  >
                                    {metric.severity}
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Customer Order Impact Section */}
                          {message.shipmentAnalysis.impact.metrics.length > 4 && (
                            <div className="mt-3 space-y-3">
                              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertCircle className="h-4 w-4 text-red-600" />
                                  <p className="text-sm font-semibold text-red-900 dark:text-red-400">Customer Order Impact</p>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-0.5">{message.shipmentAnalysis.impact.metrics[4].label}</div>
                                    <div className="text-lg font-bold text-foreground">{message.shipmentAnalysis.impact.metrics[4].value}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground mb-1">{message.shipmentAnalysis.impact.metrics[5].label}</div>
                                    <div className="text-sm text-foreground space-y-1">
                                      {message.shipmentAnalysis.impact.metrics[5].value.split(', ').map((retailer: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                                          <span>{retailer}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Recommendations Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                                <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{message.shipmentAnalysis.recommendations.title}</CardTitle>
                                <Badge variant="outline" className="text-xs">Actionable</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                          {message.shipmentAnalysis.recommendations.actions && message.shipmentAnalysis.recommendations.actions.map((action: any, idx: number) => (
                            <Card 
                              key={idx} 
                              className={`border-l-4 cursor-pointer hover:bg-accent/50 transition-colors ${
                                action.priority === 'high' ? 'border-l-red-500' : 
                                action.priority === 'medium' ? 'border-l-orange-500' : 
                                'border-l-blue-500'
                              }`}
                              onClick={() => {
                                const shipmentAction = {
                                  id: `SHIP-${Date.now()}`,
                                  title: `${action.step}`,
                                  description: action.description,
                                  status: "approved",
                                  priority: action.priority,
                                  agent: "Logistics Agent",
                                  contributingAgents: ["Supply Planning Agent", "Supplier Management Agent"],
                                  roles: ["Logistics Coordinator", "Supply Planner"],
                                  timestamp: new Date().toISOString()
                                }
                                
                                const existingApproved = JSON.parse(localStorage.getItem("approvedActions") || "[]")
                                localStorage.setItem("approvedActions", JSON.stringify([...existingApproved, shipmentAction.id]))
                                
                                const approvedTimestamps = JSON.parse(localStorage.getItem("approvedTimestamps") || "{}")
                                approvedTimestamps[shipmentAction.id] = new Date().toISOString()
                                localStorage.setItem("approvedTimestamps", JSON.stringify(approvedTimestamps))
                                
                                const existingStatuses = JSON.parse(localStorage.getItem("actionStatuses") || "{}")
                                localStorage.setItem("actionStatuses", JSON.stringify({ ...existingStatuses, [shipmentAction.id]: "approved" }))
                                
                                const existingPrograms = JSON.parse(localStorage.getItem("programActions") || "[]")
                                localStorage.setItem("programActions", JSON.stringify([...existingPrograms, shipmentAction]))
                                
                                window.dispatchEvent(new Event("storage"))
                                
                                setMessages(prev => [...prev, { 
                                  role: "assistant", 
                                  content: `Action created: "${action.step}" has been added to your dashboard. You can track its progress in the Actions tab.` 
                                }])
                              }}
                            >
                              <CardContent className="pt-3 pb-3">
                                <div className="flex items-start gap-3">
                                  <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                                    action.priority === 'high' ? 'text-red-600' : 
                                    action.priority === 'medium' ? 'text-orange-600' : 
                                    'text-blue-600'
                                  }`} />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <p className="font-medium text-sm">{action.step}</p>
                                      <Badge 
                                        variant={action.priority === 'high' ? 'destructive' : action.priority === 'medium' ? 'secondary' : 'outline'}
                                        className="text-xs"
                                      >
                                        {action.priority}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{action.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {message.shouldCostData && (
                    <div className="space-y-3 mt-3">
                      {/* Should Cost Overview Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
                                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">{message.shouldCostData.calculation.title}</CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {message.shouldCostData.component} ({message.shouldCostData.mpn})
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-muted/50 rounded-lg p-3">
                              <div className="text-xs text-muted-foreground mb-1">Should Cost</div>
                              <div className="text-2xl font-bold text-primary">${message.shouldCostData.shouldCost.toFixed(2)}</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3">
                              <div className="text-xs text-muted-foreground mb-1">Actual Cost</div>
                              <div className="text-2xl font-bold text-foreground">${message.shouldCostData.actualCost.toFixed(2)}</div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                            <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 mb-1">Methodology</div>
                            <p className="text-xs text-foreground">{message.shouldCostData.calculation.methodology}</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Cost Factors Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">Cost Calculation Factors</CardTitle>
                              <CardDescription className="text-xs mt-1">Weighted analysis components</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                          {message.shouldCostData.calculation.factors.map((factor: any, idx: number) => (
                            <div key={idx} className="bg-muted/50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold text-sm">{factor.name}</div>
                                <Badge variant="secondary" className="text-xs">{factor.weight}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1.5">{factor.value}</p>
                              <div className="bg-background rounded px-2 py-1.5">
                                <p className="text-xs text-foreground">{factor.impact}</p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Comparable Parts Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950">
                                <Package className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">Look-alike Parts Comparison</CardTitle>
                              <CardDescription className="text-xs mt-1">Similar components from alternative suppliers</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {message.shouldCostData.calculation.comparableParts.map((part: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between bg-muted/50 rounded-lg p-2.5">
                              <div>
                                <div className="font-medium text-sm">{part.mpn}</div>
                                <div className="text-xs text-muted-foreground">{part.supplier}</div>
                              </div>
                              <div className="text-sm font-semibold">${part.cost}</div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Conclusion Card */}
                      <Card className="border-l-4 border-l-purple-500">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold mb-2">Conclusion</p>
                              <p className="text-sm text-muted-foreground">{message.shouldCostData.conclusion}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Tooling Cost Data Card */}
                  {message.toolingCostData && (
                    <div className="space-y-3 mt-3">
                      {/* Tooling Should Cost Overview Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950">
                                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">{message.toolingCostData.calculation.title}</CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {message.toolingCostData.toolName} ({message.toolingCostData.toolType})
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-muted/50 rounded-lg p-3">
                              <div className="text-xs text-muted-foreground mb-1">Should Cost</div>
                              <div className="text-2xl font-bold text-primary">${message.toolingCostData.shouldCost.toLocaleString()}</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3">
                              <div className="text-xs text-muted-foreground mb-1">Actual Cost</div>
                              <div className="text-2xl font-bold text-foreground">${message.toolingCostData.actualCost.toLocaleString()}</div>
                            </div>
                          </div>
                          
                          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-lg p-3">
                            <div className="text-xs font-semibold text-indigo-900 dark:text-indigo-400 mb-1">Methodology</div>
                            <p className="text-xs text-foreground">{message.toolingCostData.calculation.methodology}</p>
                          </div>

                          <div className="bg-muted/50 rounded-lg p-3">
                            <div className="text-xs text-muted-foreground mb-1">Supplier & Location</div>
                            <div className="font-semibold text-sm">{message.toolingCostData.supplier}</div>
                            <div className="text-xs text-muted-foreground">{message.toolingCostData.site}</div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Tooling Cost Factors Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">Tooling Cost Factors</CardTitle>
                              <CardDescription className="text-xs mt-1">Weighted analysis components</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                          {message.toolingCostData.calculation.factors.map((factor: any, idx: number) => (
                            <div key={idx} className="bg-muted/50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold text-sm">{factor.name}</div>
                                <Badge variant="secondary" className="text-xs">{factor.weight}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1.5">{factor.value}</p>
                              <div className="bg-background rounded px-2 py-1.5">
                                <p className="text-xs text-foreground">{factor.impact}</p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Comparable Tooling Card */}
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950">
                                <Package className="h-5 w-5 text-orange-600 dark:text-orange-500" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">Comparable Tooling Benchmarks</CardTitle>
                              <CardDescription className="text-xs mt-1">Similar tools from alternative suppliers</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {message.toolingCostData.calculation.comparableTooling.map((tool: any, idx: number) => (
                            <div key={idx} className="bg-muted/50 rounded-lg p-2.5">
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-medium text-sm">{tool.type}</div>
                                <div className="text-sm font-semibold">${tool.cost}</div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{tool.supplier}</span>
                                <span>{tool.site}</span>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Tooling Conclusion Card */}
                      <Card className="border-l-4 border-l-indigo-500">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold mb-2">Investment Assessment</p>
                              <p className="text-sm text-muted-foreground">{message.toolingCostData.conclusion}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Milestone Card added here */}
                  {message.programPlan && pdpStep === "complete" && (
                    <Card className="mt-3 p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">{pdpData.productName} Development Plan</h3>
                          <p className="text-muted-foreground">Street Date: {pdpData.streetDate}</p>
                        </div>

                        <div className="space-y-1">
                          {[
                            { name: "Working Backward", date: "Sep 2025", status: "complete" },
                            { name: "Product Assessment", date: "Nov 2025", status: "in-progress" },
                            { name: "BRD", date: "Jan 2026", status: "upcoming" },
                            { name: "Dev Commit", date: "Feb 2026", status: "upcoming" },
                            { name: "HVT", date: "Mar 2026", status: "upcoming" },
                            { name: "EVT", date: "Apr 2026", status: "upcoming" },
                            { name: "DVT", date: "May 2026", status: "upcoming" },
                            { name: "PVT", date: "Jun 2026", status: "upcoming" },
                            { name: "Ok2Ship", date: "Aug 2026", status: "upcoming" }
                          ].map((milestone, index, array) => (
                            <div key={milestone.name} className="relative flex items-center justify-between py-3">
                              {/* Timeline line */}
                              {index < array.length - 1 && (
                                <div className="absolute left-[13px] top-[40px] bottom-[-16px] w-[2px] bg-border" />
                              )}
                              
                              {/* Status indicator */}
                              <div className="flex items-center gap-3 flex-1">
                                {milestone.status === "complete" && (
                                  <div className="relative z-10 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                )}
                                {milestone.status === "in-progress" && (
                                  <div className="relative z-10 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-white" />
                                  </div>
                                )}
                                {milestone.status === "upcoming" && (
                                  <div className="relative z-10 w-7 h-7 rounded-full border-2 border-gray-300 bg-white dark:bg-gray-900" />
                                )}
                                
                                <span className={`font-medium ${
                                  milestone.status === "complete" ? "text-green-600" :
                                  milestone.status === "in-progress" ? "text-orange-600" :
                                  "text-muted-foreground"
                                }`}>
                                  {milestone.name}
                                </span>
                              </div>
                              
                              {/* Date */}
                              <span className="text-sm text-muted-foreground">{milestone.date}</span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          onClick={handleCreateProgram}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg"
                        >
                          Approve Program
                        </Button>
                      </div>
                    </Card>
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

              {/* Dropzone UI for image upload */}
              {pdpStep === "features" && !messages.some(msg => msg.role === 'user' && msg.image) && (
                <div 
                  className={`mt-4 p-6 border-2 border-dashed rounded-lg text-center ${isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 bg-muted/20'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <label htmlFor="dropzone-file" className="cursor-pointer flex flex-col items-center justify-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Drag and drop an image here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                    <input 
                      id="dropzone-file" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              )}

              <div ref={messagesEndRef} />
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

      <Dialog open={isAddShortcutOpen} onOpenChange={setIsAddShortcutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Conversation Shortcut</DialogTitle>
            <DialogDescription>
              Create a personalized shortcut for frequently used prompts
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="shortcut-name">Shortcut Name</Label>
              <Input
                id="shortcut-name"
                placeholder="e.g., Quality Analysis"
                value={newShortcutName}
                onChange={(e) => setNewShortcutName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortcut-prompt">Prompt</Label>
              <Textarea
                id="shortcut-prompt"
                placeholder="Enter the prompt that will be used when clicking this shortcut..."
                value={newShortcutPrompt}
                onChange={(e) => setNewShortcutPrompt(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddShortcutOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddShortcut}>
              Add Shortcut
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
