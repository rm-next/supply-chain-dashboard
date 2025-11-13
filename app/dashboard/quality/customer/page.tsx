import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserCheck, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

export default function CustomerQualityPage() {
  const customerIssues = [
    {
      id: "CQ-001",
      product: "Tablet Pro 10",
      issue: "Screen flickering reported by 0.3% of customers",
      severity: "medium",
      units: "1,247",
      status: "investigating",
    },
    {
      id: "CQ-002",
      product: "Smart Speaker Mini",
      issue: "Intermittent WiFi connectivity",
      severity: "high",
      units: "3,892",
      status: "root-cause-identified",
    },
    {
      id: "CQ-003",
      product: "E-Reader Lite",
      issue: "Battery drain faster than expected",
      severity: "low",
      units: "542",
      status: "monitoring",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Customer Quality</h1>
        <p className="text-muted-foreground mt-2">Monitor and manage customer-reported quality issues</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Return Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0.8%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-0.2%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-3</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisfaction</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.6/5.0</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+0.1</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Quality Issues</CardTitle>
          <CardDescription>Track and resolve customer-reported quality concerns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-muted-foreground">{issue.id}</span>
                    <Badge
                      variant={
                        issue.severity === "high"
                          ? "destructive"
                          : issue.severity === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="font-medium">{issue.product}</p>
                  <p className="text-sm text-muted-foreground">{issue.issue}</p>
                  <p className="text-xs text-muted-foreground">Affected units: {issue.units}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{issue.status}</Badge>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
