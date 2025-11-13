import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "alert",
      message: "Low inventory alert for Smart Speaker Module A",
      time: "5 minutes ago",
      status: "warning",
    },
    {
      id: 2,
      type: "update",
      message: "Manufacturing order MO-2847 completed",
      time: "23 minutes ago",
      status: "success",
    },
    {
      id: 3,
      type: "shipment",
      message: "Shipment SH-9234 departed from Shenzhen facility",
      time: "1 hour ago",
      status: "info",
    },
    {
      id: 4,
      type: "supplier",
      message: "Supplier performance review completed for Q1",
      time: "2 hours ago",
      status: "info",
    },
    {
      id: 5,
      type: "quality",
      message: "Quality inspection passed for batch B-4521",
      time: "3 hours ago",
      status: "success",
    },
  ]

  const statusColors = {
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    success: "bg-green-100 text-green-800 border-green-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <Badge variant="outline" className={statusColors[activity.status as keyof typeof statusColors]}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
