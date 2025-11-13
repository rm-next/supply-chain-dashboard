import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CapacityPlanPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Capacity Plan</h1>
          <p className="text-muted-foreground mt-1">Monitor and optimize manufacturing capacity</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">78%</div>
              <p className="text-xs text-muted-foreground mt-1">across all facilities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">22K</div>
              <p className="text-xs text-muted-foreground mt-1">units per day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Bottleneck Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">1</div>
              <p className="text-xs text-muted-foreground mt-1">facility needs attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Facility Capacity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { facility: "Shenzhen Manufacturing", utilization: 92, capacity: "15K/day", status: "high" },
                { facility: "Vietnam Assembly", utilization: 68, capacity: "8K/day", status: "optimal" },
                { facility: "Mexico Production", utilization: 75, capacity: "10K/day", status: "optimal" },
                { facility: "India Manufacturing", utilization: 54, capacity: "6K/day", status: "low" },
              ].map((facility) => (
                <div key={facility.facility} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{facility.facility}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{facility.capacity}</span>
                      <span className="text-sm font-medium text-foreground">{facility.utilization}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`rounded-full h-2 transition-all ${
                        facility.status === "high" ? "bg-yellow-500" : "bg-primary"
                      }`}
                      style={{ width: `${facility.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
