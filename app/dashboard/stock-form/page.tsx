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
  location: string
  urgency: string
  notes?: string
}

// Define a stock item structure that will be stored
interface StockItem extends StockFormData {
  id: string
}

// Define the initial form state
const initialFormState: StockFormData = {
  name: "",
  quantity: "",
  kg_per_quantity: "",
  location: "",
  urgency: "medium",
  notes: "",
}

export default function StockFormPage() {
  const [formData, setFormData] = useState<StockFormData>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [stockItems, setStockItems] = useState<StockItem[]>([])

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("stockFormData")
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData) as Partial<StockFormData>
        // Only load persistent fields
        setFormData((prevData) => ({
          ...prevData,
          location: parsedData.location || "",
          urgency: parsedData.urgency || "medium",
        }))
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }

    const savedItems = localStorage.getItem("stockItems")
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems) as StockItem[]
        setStockItems(parsedItems)
      } catch (error) {
        console.error("Error parsing saved stock items:", error)
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

    // Save persistent fields to localStorage
    const persistentData = {
      location: formData.location,
      urgency: formData.urgency,
    }
    localStorage.setItem("stockFormData", JSON.stringify(persistentData))

    // Add item to stock list
    const newItem: StockItem = {
      ...formData,
      id: Date.now().toString(), // Generate a simple unique ID
    }
    
    const updatedItems = [...stockItems, newItem]
    setStockItems(updatedItems)
    
    // Save items to localStorage
    localStorage.setItem("stockItems", JSON.stringify(updatedItems))

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Stock information has been added",
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

  const handleDeleteItem = (id: string) => {
    const updatedItems = stockItems.filter(item => item.id !== id)
    setStockItems(updatedItems)
    localStorage.setItem("stockItems", JSON.stringify(updatedItems))
    
    toast({
      title: "Item Deleted",
      description: "Stock item has been removed",
    })
  }

  const handleMarkAsDone = (id: string) => {
    const updatedItems = stockItems.filter(item => item.id !== id)
    setStockItems(updatedItems)
    localStorage.setItem("stockItems", JSON.stringify(updatedItems))
    
    toast({
      title: "Task Complete",
      description: "Stock item has been marked as done",
    })
  }

  return (
    <DashboardLayout>
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
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Item location"
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
                  
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes || ""}
                      onChange={handleChange}
                      placeholder="Additional notes or special instructions"
                    />
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
              {stockItems.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No stock items added yet.</p>
              ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Item Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Weight (kg)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Urgency</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockItems.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.kg_per_quantity}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.location || "N/A"}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          {item.urgency === "low" ? "Low" : 
                          item.urgency === "medium" ? "Medium" : 
                          item.urgency === "high" ? "High" : 
                          item.urgency === "critical" ? "Critical" : item.urgency}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex gap-2">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              Delete
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleMarkAsDone(item.id)}
                            >
                              Mark as Done
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
