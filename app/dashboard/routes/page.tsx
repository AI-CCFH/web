"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { shipments, type Shipment } from "@/lib/mock-data"
import { Search, Filter, Download, Plus, MapPin } from "lucide-react"
import { MapPicker } from "@/components/map-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RoutesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>(
    shipments.filter((s) => s.status === "In Transit" || s.status === "Pending"),
  )
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 }) // NYC default

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    const baseShipments = shipments.filter((s) => s.status === "In Transit" || s.status === "Pending")

    if (term === "") {
      setFilteredShipments(baseShipments)
    } else {
      const filtered = baseShipments.filter(
        (shipment) =>
          shipment.trackingNumber.toLowerCase().includes(term) ||
          shipment.origin.toLowerCase().includes(term) ||
          shipment.destination.toLowerCase().includes(term) ||
          shipment.shipper.toLowerCase().includes(term),
      )
      setFilteredShipments(filtered)
    }
  }

  // Handle map location change (dummy function for now)
  const handleLocationChange = (lat: number, lng: number) => {
    setMapCenter({ lat, lng })
  }

  // Get urgency badge color
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "low":
        return (
          <Badge variant="outline" className="bg-slate-100 hover:bg-slate-200 text-slate-500">
            {urgency}
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-blue-100 hover:bg-blue-200 text-blue-500">
            {urgency}
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-orange-100 hover:bg-orange-200 text-orange-500">
            {urgency}
          </Badge>
        )
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-100 hover:bg-red-200 text-red-500">
            {urgency}
          </Badge>
        )
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Route Planning</h1>
            <p className="text-muted-foreground">Plan and optimize delivery routes for shipments.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Route
          </Button>
        </div>

        <Tabs defaultValue="map" className="space-y-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Route Map</CardTitle>
                  <CardDescription>View and plan delivery routes on the map.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MapPicker
                    latitude={mapCenter.lat}
                    longitude={mapCenter.lng}
                    onLocationChange={handleLocationChange}
                    className="h-[500px]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Shipments</CardTitle>
                  <CardDescription>Shipments that need to be routed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search shipments..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>

                    <div className="space-y-2">
                      {filteredShipments.length === 0 ? (
                        <p className="text-center py-4 text-muted-foreground">No shipments found.</p>
                      ) : (
                        filteredShipments.map((shipment) => (
                          <div
                            key={shipment.id}
                            className="flex items-center justify-between rounded-md border p-3 text-sm"
                          >
                            <div className="space-y-1">
                              <div className="font-medium">{shipment.trackingNumber}</div>
                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {shipment.destination}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getUrgencyBadge(shipment.urgency)}
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Routes</CardTitle>
                <CardDescription>A list of all shipments with their route information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search routes..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tracking #</TableHead>
                          <TableHead>Origin</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Urgency</TableHead>
                          <TableHead>Estimated Arrival</TableHead>
                          <TableHead>Distance (km)</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredShipments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No shipments found matching your criteria.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredShipments.map((shipment) => (
                            <TableRow key={shipment.id}>
                              <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                              <TableCell>{shipment.origin}</TableCell>
                              <TableCell>{shipment.destination}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    shipment.status === "In Transit"
                                      ? "bg-blue-500 hover:bg-blue-600"
                                      : "bg-yellow-500 hover:bg-yellow-600"
                                  }
                                >
                                  {shipment.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{getUrgencyBadge(shipment.urgency)}</TableCell>
                              <TableCell>
                                {shipment.estimatedArrival
                                  ? new Date(shipment.estimatedArrival).toLocaleDateString()
                                  : "Not scheduled"}
                              </TableCell>
                              <TableCell>{Math.floor(Math.random() * 100) + 50}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MapPin className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
