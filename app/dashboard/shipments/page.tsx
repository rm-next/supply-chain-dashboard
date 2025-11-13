import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ShipmentsPage() {
  const shipments = [
    { id: "SH-9234", origin: "Shenzhen, CN", destination: "Los Angeles, CA", status: "in-transit", eta: "2 days" },
    { id: "SH-9235", origin: "Los Angeles, CA", destination: "Rotterdam, NL", status: "in-transit", eta: "5 days" },
    { id: "SH-9236", origin: "Singapore, SG", destination: "Sydney, AU", status: "delivered", eta: "Delivered" },
    { id: "SH-9237", origin: "Shenzhen, CN", destination: "Singapore, SG", status: "preparing", eta: "7 days" },
  ]

  const statusColors = {
    delivered: "default",
    "in-transit": "secondary",
    preparing: "outline",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Shipments</h1>
        <p className="text-muted-foreground mt-1">Track shipments and logistics in real-time</p>
      </div>

      <div className="grid gap-4">
        {shipments.map((shipment) => (
          <Card key={shipment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{shipment.id}</CardTitle>
                <Badge variant={statusColors[shipment.status as keyof typeof statusColors]}>{shipment.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="font-medium text-foreground">{shipment.origin}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="font-medium text-foreground">{shipment.destination}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="font-medium text-foreground">{shipment.eta}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
