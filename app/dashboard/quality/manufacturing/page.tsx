import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Factory, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export default function ManufacturingQualityPage() {
  const qualityIncidents = [
    {
      id: "MQ-001",
      line: "Assembly Line 3",
      issue: "PCB solder joint defects",
      severity: "high",
      yield: "96.2%",
      status: "root-cause-analysis",
    },
    {
      id: "MQ-002",
      line: "Assembly Line 1",
      issue: "Camera module alignment variance",
      severity: "medium",
      yield: "98.1%",
      status: "corrective-action",
    },
    {
      id: "MQ-003",
      line: "Final Test Station",
      issue: "Intermittent test failures",
      severity: "low",
      yield: "99.4%",
      status: "monitoring",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manufacturing Quality</h1>
        <p className="text-muted-foreground mt-2">Monitor production quality and resolve manufacturing issues</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Yield</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">98.4%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+0.6%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quality Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-red-600" />
              <span className="text-xs text-red-600">+2</span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Process Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">99.1%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+0.3%</span>
              <span className="text-xs text-muted-foreground ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manufacturing Quality Incidents</CardTitle>
          <CardDescription>Active quality issues on production lines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {qualityIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-muted-foreground">{incident.id}</span>
                    <Badge
                      variant={
                        incident.severity === "high"
                          ? "destructive"
                          : incident.severity === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                  <p className="font-medium">{incident.line}</p>
                  <p className="text-sm text-muted-foreground">{incident.issue}</p>
                  <p className="text-xs text-muted-foreground">Current yield: {incident.yield}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{incident.status}</Badge>
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
