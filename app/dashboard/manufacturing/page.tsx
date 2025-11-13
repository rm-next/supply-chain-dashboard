import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ManufacturingPage() {
  const orders = [
    { id: "MO-2847", product: "Smart Speaker Gen 3", quantity: 5000, status: "completed", progress: 100 },
    { id: "MO-2848", product: "E-Reader Pro", quantity: 3000, status: "in-progress", progress: 68 },
    { id: "MO-2849", product: "Fitness Tracker X", quantity: 8000, status: "in-progress", progress: 42 },
    { id: "MO-2850", product: "Smart Doorbell Plus", quantity: 2500, status: "scheduled", progress: 0 },
  ]

  const statusColors = {
    completed: "default",
    "in-progress": "secondary",
    scheduled: "outline",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manufacturing Orders</h1>
        <p className="text-muted-foreground mt-1">Track production orders and manufacturing progress</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{order.product}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{order.id}</p>
                </div>
                <Badge variant={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium text-foreground">{order.quantity.toLocaleString()} units</span>
                </div>
                {order.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium text-foreground">{order.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
