"use client"

import { useState, useEffect } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QRProductData, generateQRCodeUrl } from "@/lib/qr-utils"
import { Download, Printer } from "lucide-react"

interface ProductQRCodeProps {
  product: {
    name: string
    productType?: string
    quantity: number
    importDate?: string
    expiryDate?: string
  }
  size?: number
  className?: string
}

export function ProductQRCode({ product, size = 200, className }: ProductQRCodeProps) {
  const [qrUrl, setQrUrl] = useState<string>("")
  const [showDetails, setShowDetails] = useState(false)

  // Generate QR URL when product data changes
  useEffect(() => {
    // Extract only the fields we need for the QR code
    const qrData: QRProductData = {
      name: product.name,
      productType: product.productType,
      quantity: product.quantity,
      importDate: product.importDate,
      expiryDate: product.expiryDate,
    }

    // Generate the URL
    setQrUrl(generateQRCodeUrl(qrData))
  }, [product])

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (e) {
      return "Invalid Date"
    }
  }

  // Handle QR code download
  const handleDownload = () => {
    const canvas = document.getElementById("product-qrcode") as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
      
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `${product.name.replace(/\s+/g, "-")}-qrcode.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }

  // Handle printing
  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      const canvas = document.getElementById("product-qrcode") as HTMLCanvasElement
      if (canvas) {
        const pngUrl = canvas.toDataURL("image/png")
        
        printWindow.document.write(`
          <html>
            <head>
              <title>Product QR Code: ${product.name}</title>
              <style>
                body { 
                  font-family: Arial, sans-serif;
                  text-align: center;
                  padding: 20px;
                }
                img { 
                  max-width: 100%;
                  height: auto;
                }
                .product-details {
                  margin-top: 20px;
                  text-align: left;
                  display: inline-block;
                }
                .product-details div {
                  margin-bottom: 5px;
                }
                h1 {
                  margin-bottom: 30px;
                }
              </style>
            </head>
            <body>
              <h1>Product QR Code</h1>
              <img src="${pngUrl}" alt="Product QR Code" />
              <div class="product-details">
                <div><strong>Name:</strong> ${product.name}</div>
                <div><strong>Type:</strong> ${product.productType || "N/A"}</div>
                <div><strong>Quantity:</strong> ${product.quantity}</div>
                <div><strong>Import Date:</strong> ${formatDate(product.importDate)}</div>
                <div><strong>Expiry Date:</strong> ${formatDate(product.expiryDate)}</div>
              </div>
            </body>
          </html>
        `)
        
        printWindow.document.close()
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 500)
      }
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Product QR Code</CardTitle>
        <CardDescription>
          Scan this code to access product information
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {qrUrl && (
          <div className="bg-white p-4 rounded-md shadow-sm">
            <QRCodeCanvas
              id="product-qrcode"
              value={qrUrl}
              size={size}
              marginSize={4}
              level="L"
            />
          </div>
        )}
        
        {showDetails && (
          <div className="mt-4 w-full text-sm">
            <div className="grid grid-cols-2 gap-2 border-t pt-2">
              <div className="font-medium">Name:</div>
              <div>{product.name}</div>
              
              <div className="font-medium">Type:</div>
              <div>{product.productType || "N/A"}</div>
              
              <div className="font-medium">Quantity:</div>
              <div>{product.quantity}</div>
              
              <div className="font-medium">Import Date:</div>
              <div>{formatDate(product.importDate)}</div>
              
              <div className="font-medium">Expiry Date:</div>
              <div>{formatDate(product.expiryDate)}</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <div className="space-x-2">
          <Button 
            size="sm" 
            variant="secondary"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button 
            size="sm"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
