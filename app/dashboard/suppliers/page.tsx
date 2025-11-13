import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SuppliersPage() {
  const suppliers = [
    { id: "SUP-001", name: "TechComponents Ltd", category: "Electronics", rating: 4.8, status: "active" },
    { id: "SUP-002", name: "Global Plastics Inc", category: "Materials", rating: 4.5, status: "active" },
    { id: "SUP-003", name: "Display Solutions Co", category: "Displays", rating: 4.9, status: "active" },
    { id: "SUP-004", name: "Battery Systems", category: "Power", rating: 4.2, status: "review" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Suppliers</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage supplier relationships</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {suppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{supplier.id}</p>
                </div>
                <Badge variant={supplier.status === "active" ? "default" : "secondary"}>{supplier.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium text-foreground">{supplier.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Performance Rating:</span>
                  <span className="font-medium text-foreground">{supplier.rating}/5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
