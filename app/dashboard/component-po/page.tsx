import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ComponentPOPage() {
  const orders = [
    {
      id: "CPO-1024",
      component: 'Display Panel 7.8"',
      supplier: "Display Solutions Co",
      quantity: 5000,
      status: "delivered",
    },
    {
      id: "CPO-1025",
      component: "Bluetooth Module 5.2",
      supplier: "TechComponents Ltd",
      quantity: 3000,
      status: "in-transit",
    },
    {
      id: "CPO-1026",
      component: "Battery Pack 3000mAh",
      supplier: "Battery Systems",
      quantity: 8000,
      status: "processing",
    },
    {
      id: "CPO-1027",
      component: "Camera Module 1080p",
      supplier: "TechComponents Ltd",
      quantity: 2500,
      status: "in-transit",
    },
  ]

  const statusColors = {
    delivered: "default",
    "in-transit": "secondary",
    processing: "outline",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Component PO</h1>
        <p className="text-muted-foreground mt-1">Track component orders from suppliers</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{order.component}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{order.id}</p>
                </div>
                <Badge variant={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Supplier:</span>
                  <span className="font-medium text-foreground">{order.supplier}</span>
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
