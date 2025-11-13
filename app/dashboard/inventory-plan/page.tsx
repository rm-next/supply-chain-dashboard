import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InventoryPlanPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Plan</h1>
          <p className="text-muted-foreground mt-1">Optimize inventory levels across the supply chain</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$8.4M</div>
              <p className="text-xs text-muted-foreground mt-1">across all locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Days of Supply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">42</div>
              <p className="text-xs text-muted-foreground mt-1">average across products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Stockout Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">Low</div>
              <p className="text-xs text-muted-foreground mt-1">3 items need attention</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-medium text-foreground">Rebalance Smart Speaker inventory</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Transfer 500 units from LA hub to Europe hub to meet regional demand spike.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-medium text-foreground">Reduce excess Battery Pack stock</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Current levels exceed 60 days of supply. Consider reducing next order by 30%.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium text-foreground">Optimal inventory levels maintained</p>
                <p className="text-sm text-muted-foreground mt-1">
                  E-Reader Pro and Fitness Tracker X are at optimal inventory levels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
