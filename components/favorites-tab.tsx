"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Package, FileText, Truck, Users, TrendingUp } from "lucide-react"

interface Favorite {
  id: string
  title: string
  type: string
  module: string
  lastViewed: string
  icon: React.ReactNode
}

const favorites: Favorite[] = [
  {
    id: "1",
    title: "Tablet Pro 12 - BOM",
    type: "Bill of Material",
    module: "BOM",
    lastViewed: "2 hours ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "2",
    title: "Q2 Production Plan - Smart Speakers",
    type: "Supply Plan",
    module: "Planning",
    lastViewed: "5 hours ago",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    id: "3",
    title: "Capacitor Supplier - TechComponents Inc",
    type: "Supplier",
    module: "Suppliers",
    lastViewed: "1 day ago",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "4",
    title: "PO-2024-1847 - Display Panels",
    type: "Component Purchase Order",
    module: "Orders",
    lastViewed: "1 day ago",
    icon: <Package className="h-4 w-4" />,
  },
  {
    id: "5",
    title: "Shipment SH-8472 - EU Distribution",
    type: "Shipment",
    module: "Logistics",
    lastViewed: "2 days ago",
    icon: <Truck className="h-4 w-4" />,
  },
]

export function FavoritesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Your Favorites</h2>
        </div>
        <p className="text-sm text-muted-foreground">{favorites.length} items</p>
      </div>

      <div className="grid gap-4">
        {favorites.map((favorite) => (
          <Card key={favorite.id} className="hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">{favorite.icon}</div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{favorite.title}</CardTitle>
                    <CardDescription>
                      {favorite.type} • {favorite.module}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Last viewed {favorite.lastViewed}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {favorites.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No favorites yet</p>
            <p className="text-sm text-muted-foreground mt-1">Star items from any module to quickly access them here</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
