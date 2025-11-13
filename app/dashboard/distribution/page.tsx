import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DistributionPage() {
  const centers = [
    { id: "DC-001", name: "North America Hub", location: "Los Angeles, CA", capacity: "85%", throughput: "12.5K" },
    { id: "DC-002", name: "Europe Hub", location: "Rotterdam, NL", capacity: "72%", throughput: "8.2K" },
    { id: "DC-003", name: "Asia Pacific Hub", location: "Singapore", capacity: "91%", throughput: "15.8K" },
    { id: "DC-004", name: "Latin America Hub", location: "São Paulo, BR", capacity: "68%", throughput: "5.4K" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Distribution</h1>
        <p className="text-muted-foreground mt-1">Monitor distribution centers and logistics hubs</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {centers.map((center) => (
          <Card key={center.id}>
            <CardHeader>
              <CardTitle className="text-lg">{center.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{center.location}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity Utilization:</span>
                    <span className="font-medium text-foreground">{center.capacity}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary rounded-full h-2 transition-all" style={{ width: center.capacity }} />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Throughput:</span>
                  <span className="font-medium text-foreground">{center.throughput} units</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
