"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { shipments, type Shipment } from "@/lib/mock-data"
import { Search, Filter, Download, CheckCircle, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DeliveriesPage() {
  // Initialize all state hooks at the top level
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")
  const [filteredDeliveries, setFilteredDeliveries] = useState<Shipment[]>([])

  // Use useEffect to handle filtering logic
  useEffect(() => {
    let filtered: Shipment[] = []

    switch (activeTab) {
      case "upcoming":
        filtered = shipments.filter((s) => s.status === "In Transit" || s.status === "Pending")
        break
      case "received":
        filtered = shipments.filter((s) => s.status === "Delivered")
        break
      case "all":
      default:
        filtered = [...shipments]
        break
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (shipment) =>
          shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.shipper.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredDeliveries(filtered)
  }, [activeTab, searchTerm])

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
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
            <h1 className="text-2xl font-bold tracking-tight">Deliveries</h1>
            <p className="text-muted-foreground">Track and manage incoming deliveries.</p>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4" onValueChange={handleTabChange}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="all">All Deliveries</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                Schedule
              </Button>
              <Button className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Confirm Receipt
              </Button>
            </div>
          </div>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deliveries</CardTitle>
                <CardDescription>Track all incoming deliveries.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search deliveries..."
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
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Items</TableHead>
                          <TableHead className="text-right">Weight (kg)</TableHead>
                          <TableHead>Urgency</TableHead>
                          <TableHead>Expected Arrival</TableHead>
                          <TableHead>Shipper</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeliveries.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No deliveries found matching your criteria.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredDeliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                              <TableCell className="font-medium">{delivery.trackingNumber}</TableCell>
                              <TableCell>{delivery.origin}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    delivery.status === "Delivered"
                                      ? "bg-green-500 hover:bg-green-600"
                                      : delivery.status === "In Transit"
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                  }
                                >
                                  {delivery.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">{delivery.items}</TableCell>
                              <TableCell className="text-right">{delivery.totalWeight}</TableCell>
                              <TableCell>{getUrgencyBadge(delivery.urgency)}</TableCell>
                              <TableCell>
                                {delivery.estimatedArrival
                                  ? new Date(delivery.estimatedArrival).toLocaleDateString()
                                  : "Not scheduled"}
                              </TableCell>
                              <TableCell>{delivery.shipper}</TableCell>
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

          <TabsContent value="received">
            <Card>
              <CardHeader>
                <CardTitle>Received Deliveries</CardTitle>
                <CardDescription>View all received deliveries.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search deliveries..."
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
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Items</TableHead>
                          <TableHead className="text-right">Weight (kg)</TableHead>
                          <TableHead>Urgency</TableHead>
                          <TableHead>Received Date</TableHead>
                          <TableHead>Shipper</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeliveries.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No deliveries found matching your criteria.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredDeliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                              <TableCell className="font-medium">{delivery.trackingNumber}</TableCell>
                              <TableCell>{delivery.origin}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    delivery.status === "Delivered"
                                      ? "bg-green-500 hover:bg-green-600"
                                      : delivery.status === "In Transit"
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                  }
                                >
                                  {delivery.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">{delivery.items}</TableCell>
                              <TableCell className="text-right">{delivery.totalWeight}</TableCell>
                              <TableCell>{getUrgencyBadge(delivery.urgency)}</TableCell>
                              <TableCell>
                                {delivery.actualArrival
                                  ? new Date(delivery.actualArrival).toLocaleDateString()
                                  : "Not received"}
                              </TableCell>
                              <TableCell>{delivery.shipper}</TableCell>
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

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Deliveries</CardTitle>
                <CardDescription>View all deliveries in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search deliveries..."
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
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Items</TableHead>
                          <TableHead className="text-right">Weight (kg)</TableHead>
                          <TableHead>Urgency</TableHead>
                          <TableHead>Expected/Received Date</TableHead>
                          <TableHead>Shipper</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeliveries.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No deliveries found matching your criteria.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredDeliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                              <TableCell className="font-medium">{delivery.trackingNumber}</TableCell>
                              <TableCell>{delivery.origin}</TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    delivery.status === "Delivered"
                                      ? "bg-green-500 hover:bg-green-600"
                                      : delivery.status === "In Transit"
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                  }
                                >
                                  {delivery.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">{delivery.items}</TableCell>
                              <TableCell className="text-right">{delivery.totalWeight}</TableCell>
                              <TableCell>{getUrgencyBadge(delivery.urgency)}</TableCell>
                              <TableCell>
                                {delivery.status === "Delivered" && delivery.actualArrival
                                  ? new Date(delivery.actualArrival).toLocaleDateString()
                                  : delivery.estimatedArrival
                                    ? new Date(delivery.estimatedArrival).toLocaleDateString()
                                    : "Not scheduled"}
                              </TableCell>
                              <TableCell>{delivery.shipper}</TableCell>
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
