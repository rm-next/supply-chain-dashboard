import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DemandPlanPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Demand Plan</h1>
          <p className="text-muted-foreground mt-1">AI-powered demand forecasting and planning</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Month Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">24.5K</div>
              <p className="text-xs text-muted-foreground mt-1">units across all products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Seasonal Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+18%</div>
              <p className="text-xs text-muted-foreground mt-1">vs previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Confidence Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">94%</div>
              <p className="text-xs text-muted-foreground mt-1">forecast accuracy</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Demand Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { product: "Smart Speaker Gen 3", forecast: "8.2K", trend: "+12%" },
                { product: "E-Reader Pro", forecast: "5.8K", trend: "+8%" },
                { product: "Fitness Tracker X", forecast: "7.1K", trend: "+22%" },
                { product: "Smart Doorbell Plus", forecast: "3.4K", trend: "+15%" },
              ].map((item) => (
                <div
                  key={item.product}
                  className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                >
                  <span className="font-medium text-foreground">{item.product}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{item.forecast} units</span>
                    <span className="text-sm text-green-600 font-medium">{item.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
