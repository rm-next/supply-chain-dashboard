import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FGPOPage() {
  const orders = [
    { id: "FGPO-5012", product: "Smart Speaker Gen 3", customer: "RetailCorp", quantity: 2500, status: "shipped" },
    { id: "FGPO-5013", product: "E-Reader Pro", customer: "TechDistributors", quantity: 1800, status: "preparing" },
    { id: "FGPO-5014", product: "Fitness Tracker X", customer: "HealthChain", quantity: 5000, status: "confirmed" },
    { id: "FGPO-5015", product: "Smart Doorbell Plus", customer: "HomeSmart Inc", quantity: 1200, status: "shipped" },
  ]

  const statusColors = {
    shipped: "default",
    preparing: "secondary",
    confirmed: "outline",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ASIN PO</h1>
        <p className="text-muted-foreground mt-1">Manage customer orders for finished products</p>
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
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium text-foreground">{order.customer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium text-foreground">{order.quantity.toLocaleString()} units</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
