import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinishedGoodsPage() {
  const products = [
    { id: "FG-001", name: "Smart Speaker Gen 3", sku: "SS-G3-BLK", stock: 12450, status: "in-stock" },
    { id: "FG-002", name: "E-Reader Pro", sku: "ER-PRO-WHT", stock: 8320, status: "in-stock" },
    { id: "FG-003", name: "Fitness Tracker X", sku: "FT-X-BLU", stock: 1200, status: "low-stock" },
    { id: "FG-004", name: "Smart Doorbell Plus", sku: "SD-PLUS-SLV", stock: 5670, status: "in-stock" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ASIN</h1>
        <p className="text-muted-foreground mt-1">Track ASIN inventory and availability</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Stock:</span>
                  <span className="font-medium text-foreground">{product.stock.toLocaleString()} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={`font-medium ${product.status === "low-stock" ? "text-yellow-600" : "text-green-600"}`}
                  >
                    {product.status === "low-stock" ? "Low Stock" : "In Stock"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
