import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, TrendingUp, Warehouse } from "lucide-react"

export default function InventoryPage() {
  const inventoryLocations = [
    {
      location: "Shenzhen Warehouse",
      type: "Component",
      onHand: "2.4M units",
      reserved: "1.8M units",
      available: "600K units",
      status: "healthy",
    },
    {
      location: "Memphis Distribution Center",
      type: "Finished Goods",
      onHand: "145K units",
      reserved: "98K units",
      available: "47K units",
      status: "low",
    },
    {
      location: "Singapore Hub",
      type: "Component",
      onHand: "890K units",
      reserved: "750K units",
      available: "140K units",
      status: "healthy",
    },
    {
      location: "Frankfurt Fulfillment",
      type: "Finished Goods",
      onHand: "67K units",
      reserved: "45K units",
      available: "22K units",
      status: "critical",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">Monitor inventory levels across warehouses and distribution centers</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total On Hand</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5M units</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">809K units</div>
            <p className="text-xs text-muted-foreground">Ready for allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.7M units</div>
            <p className="text-xs text-muted-foreground">Allocated to orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory by Location</CardTitle>
          <CardDescription>Current stock levels across warehouses and distribution centers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{location.location}</p>
                    <Badge variant="outline" className="text-xs">
                      {location.type}
                    </Badge>
                    <Badge
                      variant={
                        location.status === "healthy"
                          ? "default"
                          : location.status === "low"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {location.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>On Hand: {location.onHand}</span>
                    <span>Reserved: {location.reserved}</span>
                    <span>Available: {location.available}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
