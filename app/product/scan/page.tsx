"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { decryptProductData, QRProductData } from "@/lib/qr-utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Calendar, Package2 } from "lucide-react"

// Loading component for Suspense fallback
function ProductScanLoading() {
  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading product data...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main component content that uses useSearchParams
function ProductScanContent() {
  const searchParams = useSearchParams()
  const [productData, setProductData] = useState<QRProductData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    
    try {
      const data = searchParams.get("data")
      
      if (!data) {
        setError("No product data found in QR code")
        setIsLoading(false)
        return
      }
      
      const decodedData = decryptProductData(data)
      
      if (!decodedData) {
        setError("Could not decode product data")
        setIsLoading(false)
        return
      }
      
      setProductData(decodedData)
    } catch (err) {
      setError("Error processing QR code data")
      console.error("QR code processing error:", err)
    }
    
    setIsLoading(false)
  }, [searchParams])

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not available"
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return "Invalid date"
    }
  }
  
  // Check if product is expired
  const isExpired = (expiryDate?: string): boolean => {
    if (!expiryDate) return false
    try {
      const expiry = new Date(expiryDate)
      return expiry < new Date()
    } catch (e) {
      return false
    }
  }

  // Days until expiry
  const daysUntilExpiry = (expiryDate?: string): number | null => {
    if (!expiryDate) return null
    try {
      const expiry = new Date(expiryDate)
      const today = new Date()
      const diffTime = expiry.getTime() - today.getTime()
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    } catch (e) {
      return null
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-sm text-muted-foreground">Loading product data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-md mx-auto py-12">
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-destructive mr-2" />
              <CardTitle>Error Scanning QR Code</CardTitle>
            </div>
            <CardDescription>
              There was a problem processing the QR code data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Calculate expiry status
  const expired = productData?.expiryDate ? isExpired(productData.expiryDate) : false
  const daysToExpiry = productData?.expiryDate ? daysUntilExpiry(productData.expiryDate) : null
  const nearExpiry = daysToExpiry !== null && daysToExpiry > 0 && daysToExpiry <= 30

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Package2 className="h-5 w-5 text-primary mr-2" />
            <CardTitle>Product Information</CardTitle>
          </div>
          <CardDescription>
            QR code scan result
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productData && (
              <>
                <div>
                  <h3 className="text-lg font-bold">{productData.name}</h3>
                  {productData.productType && (
                    <p className="text-sm text-muted-foreground">{productData.productType}</p>
                  )}
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Quantity:</div>
                  <div className="text-sm">{productData.quantity}</div>
                  
                  {productData.importDate && (
                    <>
                      <div className="text-sm font-medium">Import Date:</div>
                      <div className="text-sm flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        {formatDate(productData.importDate)}
                      </div>
                    </>
                  )}
                  
                  {productData.expiryDate && (
                    <>
                      <div className="text-sm font-medium">Expiry Date:</div>
                      <div className={`text-sm flex items-center ${expired ? 'text-destructive' : nearExpiry ? 'text-amber-500' : ''}`}>
                        <Calendar className={`h-3 w-3 mr-1 ${expired ? 'text-destructive' : nearExpiry ? 'text-amber-500' : 'text-muted-foreground'}`} />
                        {formatDate(productData.expiryDate)}
                      </div>
                    </>
                  )}
                </div>
                
                {productData.expiryDate && (
                  <div className={`mt-4 p-2 rounded-md ${expired ? 'bg-destructive/10 text-destructive' : nearExpiry ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'} text-sm flex items-start`}>
                    {expired ? (
                      <>
                        <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>
                          <strong>Product expired</strong>
                          <div className="text-xs mt-1">This product has passed its expiration date.</div>
                        </span>
                      </>
                    ) : nearExpiry ? (
                      <>
                        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>
                          <strong>Expiring soon</strong>
                          <div className="text-xs mt-1">This product will expire in {daysToExpiry} {daysToExpiry === 1 ? 'day' : 'days'}.</div>
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>
                          <strong>Product in date</strong>
                          <div className="text-xs mt-1">This product is within its expiry period.</div>
                        </span>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full">
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            
            {productData && (
              <Link href={`/dashboard/inventory?search=${encodeURIComponent(productData.name)}`}>
                <Button>View in Inventory</Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

// Main page component that wraps content in Suspense
export default function ScanProductPage() {
  return (
    <Suspense fallback={<ProductScanLoading />}>
      <ProductScanContent />
    </Suspense>
  )
}
