import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CommoditiesPage() {
  const commodities = [
    { id: "COM-001", name: 'Display Panel 7.8"', category: "Display", stock: 15200, status: "in-stock" },
    { id: "COM-002", name: "Bluetooth Module 5.2", category: "Connectivity", stock: 8900, status: "in-stock" },
    { id: "COM-003", name: "Battery Pack 3000mAh", category: "Power", stock: 2100, status: "low-stock" },
    { id: "COM-004", name: "Camera Module 1080p", category: "Imaging", stock: 11500, status: "in-stock" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Commodities</h1>
          <p className="text-muted-foreground mt-1">Manage commodity inventory and specifications</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {commodities.map((commodity) => (
            <Card key={commodity.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{commodity.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{commodity.id}</p>
                  </div>
                  <Badge variant="outline">{commodity.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stock Level:</span>
                    <span className="font-medium text-foreground">{commodity.stock.toLocaleString()} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`font-medium ${commodity.status === "low-stock" ? "text-yellow-600" : "text-green-600"}`}
                    >
                      {commodity.status === "low-stock" ? "Low Stock" : "In Stock"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
