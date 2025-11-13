import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldCheck, TrendingDown, AlertTriangle, XCircle } from "lucide-react"

export default function SupplierQualityPage() {
  const supplierIssues = [
    {
      id: "SQ-001",
      supplier: "Capacitor Corp",
      component: "Ceramic Capacitor C2847",
      issue: "Voltage tolerance out of spec",
      severity: "high",
      quarantined: "2,400 units",
      status: "investigation",
    },
    {
      id: "SQ-002",
      supplier: "IC Solutions Ltd",
      component: "Memory IC M4512",
      issue: "3.2% defect rate in recent shipment",
      severity: "high",
      quarantined: "1,850 units",
      status: "supplier-action",
    },
    {
      id: "SQ-003",
      supplier: "Display Tech Inc",
      component: 'LCD Panel 7.2"',
      issue: "Minor cosmetic defects",
      severity: "low",
      quarantined: "340 units",
      status: "rework",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Supplier Quality</h1>
        <p className="text-muted-foreground mt-2">Monitor supplier component quality and manage incoming defects</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Supplier Quality Score</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">96.2%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+1.3%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Incoming Defects</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-8</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quarantined Inventory</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4,590</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-342</span>
              <span className="text-xs text-muted-foreground ml-1">units vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Quality Issues</CardTitle>
          <CardDescription>Active quality issues with supplier components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supplierIssues.map((issue) => (
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
                  <p className="font-medium">{issue.supplier}</p>
                  <p className="text-sm text-muted-foreground">{issue.component}</p>
                  <p className="text-sm text-muted-foreground">{issue.issue}</p>
                  <p className="text-xs text-muted-foreground">Quarantined: {issue.quarantined}</p>
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
