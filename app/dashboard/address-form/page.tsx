"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { MapPicker } from "@/components/map-picker"
import { useAuth } from "@/lib/auth"

interface AddressFormData {
  name: string
  latitude: number
  longitude: number
}

export default function AddressFormPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState<AddressFormData>({
    name: "",
    latitude: 40.7128,
    longitude: -74.006, // Default to New York City coordinates
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("addressFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as AddressFormData
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    } else if (user) {
      // If no saved data, but we have user info, pre-fill the name
      setFormData((prev) => ({
        ...prev,
        name: user.company || user.name,
      }))
    }
  }, [user])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle coordinate changes
  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseFloat(value)

    if (!isNaN(numValue)) {
      setFormData((prev) => ({ ...prev, [name]: numValue }))
    }
  }

  // Handle map location change
  const handleLocationChange = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: Number.parseFloat(lat.toFixed(6)),
      longitude: Number.parseFloat(lng.toFixed(6)),
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || isNaN(formData.latitude) || isNaN(formData.longitude)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid values",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Save to localStorage
    localStorage.setItem("addressFormData", JSON.stringify(formData))

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Address information has been saved",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Address Information</h1>
        <p className="text-muted-foreground">Set your business location to help with logistics planning and routing.</p>

        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>
              Enter your business name and location coordinates. You can also set your location by clicking on the map.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Business/User Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter business or user name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude *</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="0.000001"
                    value={formData.latitude}
                    onChange={handleCoordinateChange}
                    placeholder="Enter latitude"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude *</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="0.000001"
                    value={formData.longitude}
                    onChange={handleCoordinateChange}
                    placeholder="Enter longitude"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Map Location</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Click on the map to set your location or drag the marker to adjust.
                  </p>
                  <MapPicker
                    latitude={formData.latitude}
                    longitude={formData.longitude}
                    onLocationChange={handleLocationChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    name: user?.company || user?.name || "",
                    latitude: 40.7128,
                    longitude: -74.006,
                  })
                }
              >
                Reset Form
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Location"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
