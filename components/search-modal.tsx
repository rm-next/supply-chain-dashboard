"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialQuery: string
}

export function SearchModal({ open, onOpenChange, initialQuery }: SearchModalProps) {
  const [response, setResponse] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)

  useEffect(() => {
    if (open && initialQuery) {
      // Simulate streaming response
      setIsStreaming(true)
      setResponse("")

      const fullResponse = `Based on your query "${initialQuery}", here's what I found:\n\nYour current supply chain shows strong performance across most metrics. However, I've identified a few areas that need attention:\n\n1. Component inventory levels for smart speaker modules are running 15% below optimal levels. I recommend increasing orders from Supplier A by 2,000 units.\n\n2. Manufacturing lead times at the Shenzhen facility have increased by 3 days over the past week. This appears to be related to a quality inspection bottleneck.\n\n3. Your tablet shipments to the European distribution center are on track, with 95% on-time delivery rate.\n\nWould you like me to create action items for the inventory and manufacturing issues?`

      let index = 0
      const interval = setInterval(() => {
        if (index < fullResponse.length) {
          setResponse(fullResponse.slice(0, index + 1))
          index++
        } else {
          setIsStreaming(false)
          clearInterval(interval)
        }
      }, 20)

      return () => clearInterval(interval)
    }
  }, [open, initialQuery])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{initialQuery}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {response}
              {isStreaming && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />}
            </div>
          </div>

          {!isStreaming && response && (
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm">
                Create Action Items
              </Button>
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="outline" size="sm">
                Export Report
              </Button>
            </div>
          )}

          {isStreaming && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>AI is analyzing your supply chain data...</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
