"use client"

import { useState } from "react"
import { ProductQRCode } from "@/components/product-qr-code"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as mockQrData from "@/lib/mock-qr-data"
import { RefreshCw } from "lucide-react"

export default function QRDemoPage() {
  const [mockProducts, setMockProducts] = useState(() => {
    // Generate 3 mock products manually
    return [
      mockQrData.generateMockProduct(),
      mockQrData.generateMockProduct(),
      mockQrData.generateMockProduct()
    ]
  })
  
  // Generate new products on demand
  const refreshProducts = () => {
    setMockProducts([
      mockQrData.generateMockProduct(),
      mockQrData.generateMockProduct(),
      mockQrData.generateMockProduct()
    ])
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Code Demo</h1>
          <p className="text-muted-foreground">
            Generate and test product QR codes with mock data
          </p>
        </div>
        <Button onClick={refreshProducts} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Products
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="h-full">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.productType}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="font-medium">Status:</div>
                  <div>{product.status}</div>
                  
                  <div className="font-medium">Quantity:</div>
                  <div>{product.quantity}</div>
                  
                  <div className="font-medium">Weight:</div>
                  <div>{product.weight} kg</div>
                  
                  <div className="font-medium">Import Date:</div>
                  <div>{new Date(product.importDate || "").toLocaleDateString()}</div>
                  
                  <div className="font-medium">Expiry Date:</div>
                  <div>{new Date(product.expiryDate || "").toLocaleDateString()}</div>
                </div>
              </div>
              
              <ProductQRCode product={product} size={160} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
