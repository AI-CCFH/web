"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

// Define the form data structure
interface StockFormData {
  name: string
  quantity: string
  kg_per_quantity: string
  current_location: string
  from_location: string
  to_location: string
  urgency: string
  notes?: string
}

// Define the initial form state
const initialFormState: StockFormData = {
  name: "",
  quantity: "",
  kg_per_quantity: "",
  current_location: "",
  from_location: "",
  to_location: "",
  urgency: "medium",
  notes: "",
}

export default function StockFormPage() {
  const [formData, setFormData] = useState<StockFormData>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("stockFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as StockFormData
        // Only load persistent fields, not the ones that should be reset
        setFormData((prevData) => ({
          ...prevData,
          current_location: parsedData.current_location || "",
          from_location: parsedData.from_location || "",
          to_location: parsedData.to_location || "",
          urgency: parsedData.urgency || "medium",
        }))
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.quantity || !formData.kg_per_quantity) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Convert form data to JSON
    const jsonData = JSON.stringify(formData)
    console.log("Form submitted:", jsonData)

    // Save persistent fields to localStorage
    const persistentData = {
      current_location: formData.current_location,
      from_location: formData.from_location,
      to_location: formData.to_location,
      urgency: formData.urgency,
    }
    localStorage.setItem("stockFormData", JSON.stringify(persistentData))

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Stock information has been submitted",
      })

      // Reset non-persistent fields
      setFormData((prev) => ({
        ...prev,
        name: "",
        quantity: "",
        kg_per_quantity: "",
        notes: "",
      }))

      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <DashboardLayout userRole={2}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Stock Management Form</h1>
        <p className="text-muted-foreground">Use this form to add or update stock information.</p>

        <div className="flex flex-col lg:flex-row gap-4">
          <Card className="max-w-2xl flex-grow">
            <CardHeader>
              <CardTitle>Stock Details</CardTitle>
              <CardDescription>Enter the details of the stock item. Fields marked with * are required.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kg_per_quantity">Weight per Unit (kg) *</Label>
              <Input
                id="kg_per_quantity"
                name="kg_per_quantity"
                type="number"
                step="0.01"
                value={formData.kg_per_quantity}
                onChange={handleChange}
                placeholder="Enter weight per unit"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleSelectChange("urgency", value)}>
                <SelectTrigger id="urgency">
            <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
              </CardContent>
              <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setFormData(initialFormState)}>
            Reset Form
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="lg:w-1/3">
            <Card className="sticky top-4">
              <CardHeader>
          <CardTitle>Tips</CardTitle>
          <CardDescription>Helpful tips for filling out the form</CardDescription>
              </CardHeader>
              <CardContent>
          <ul className="list-disc pl-4 space-y-2">
            <li>Ensure all required fields are filled out.</li>
            <li>Use accurate measurements for weight and quantity.</li>
            <li>Select the appropriate urgency level for your stock.</li>
          </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Stock Summary</CardTitle>
              <CardDescription>Manage your stock items below</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Item Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Weight (kg)</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Urgency</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">{formData.name}</td>
              <td className="border border-gray-300 px-4 py-2">{formData.quantity || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">{formData.kg_per_quantity || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">{formData.urgency || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Update
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
            <Button variant="success" size="sm">
              Mark as Done
            </Button>
                </div>
              </td>
            </tr>
          </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
