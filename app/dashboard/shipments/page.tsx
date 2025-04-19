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
import { Search, Download, Plus, ArrowUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>(shipments)

  // Handle search and filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    applyFilters(term, statusFilter)
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    applyFilters(searchTerm, value)
  }

  const applyFilters = (term: string, status: string) => {
    let filtered = [...shipments]

    // Apply search term filter
    if (term) {
      filtered = filtered.filter(
        (shipment) =>
          shipment.trackingNumber.toLowerCase().includes(term) ||
          shipment.origin.toLowerCase().includes(term) ||
          shipment.destination.toLowerCase().includes(term) ||
          shipment.shipper.toLowerCase().includes(term),
      )
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((shipment) => shipment.status.toLowerCase() === status.toLowerCase())
    }

    setFilteredShipments(filtered)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "in transit":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">{status}</Badge>
      case "processing":
        return <Badge variant="outline">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
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
            <h1 className="text-2xl font-bold tracking-tight">Shipment Management</h1>
            <p className="text-muted-foreground">Track and manage all shipments in the system.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Shipment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
            <CardDescription>A list of all shipments with their current status and details.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search shipments..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select value={statusFilter} onValueChange={handleStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="in transit">In Transit</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="gap-2 hidden sm:flex">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Tracking #
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Weight (kg)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Shipper</TableHead>
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
                          <TableCell className="text-right">{shipment.items}</TableCell>
                          <TableCell className="text-right">{shipment.totalWeight}</TableCell>
                          <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                          <TableCell>{getUrgencyBadge(shipment.urgency)}</TableCell>
                          <TableCell>{shipment.shipper}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
