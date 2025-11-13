"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Sparkles, History, Plus } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  agents?: string[]
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

const pastSessions: ChatSession[] = [
  {
    id: "1",
    title: "Component shortage analysis",
    lastMessage: "Based on supplier lead times...",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Q2 production capacity planning",
    lastMessage: "I recommend increasing allocation...",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Supplier performance review",
    lastMessage: "Here's the analysis of top 10 suppliers...",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
]

export function AssistantWorkspace() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant for supply chain operations. I can help you with planning, supplier management, logistics, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const detectAgents = (message: string): string[] => {
    const agents: string[] = []
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("supplier") || lowerMessage.includes("vendor")) {
      agents.push("Supplier Management")
    }
    if (lowerMessage.includes("plan") || lowerMessage.includes("forecast") || lowerMessage.includes("demand")) {
      agents.push("Supply Planning")
    }
    if (lowerMessage.includes("ship") || lowerMessage.includes("logistics") || lowerMessage.includes("freight")) {
      agents.push("Logistics")
    }
    if (lowerMessage.includes("bom") || lowerMessage.includes("product") || lowerMessage.includes("lifecycle")) {
      agents.push("PLM")
    }
    if (lowerMessage.includes("quality") || lowerMessage.includes("defect")) {
      agents.push("Quality")
    }
    if (lowerMessage.includes("return") || lowerMessage.includes("rma")) {
      agents.push("Returns")
    }

    return agents.length > 0 ? agents : ["General Assistant"]
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    const agents = detectAgents(input)

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I've analyzed your query using the ${agents.join(", ")} agent${agents.length > 1 ? "s" : ""}. Based on current supply chain data, I can provide insights on this topic. How would you like me to proceed?`,
        agents,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Chat History Sidebar */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Chat History</CardTitle>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {pastSessions.map((session) => (
                <button key={session.id} className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-start gap-2">
                    <History className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{session.timestamp.toLocaleDateString()}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main Chat Area */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>Assistant Workspace</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Messages */}
            <ScrollArea className="h-[450px] pr-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`flex flex-col gap-2 max-w-[80%] ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.agents && message.agents.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {message.agents.map((agent) => (
                            <Badge key={agent} variant="secondary" className="text-xs">
                              {agent}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask about supply chain operations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
