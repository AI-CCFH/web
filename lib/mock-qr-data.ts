// Mock data for QR code testing before backend integration
import { QRProductData } from "./qr-utils"
import { Product } from "./mock-data"

// Product types for mock data
const productTypes = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Clothing",
  "Food",
  "Beverages",
  "Medical",
  "Automotive",
  "Industrial",
  "Office Supplies"
]

// Generate a random date between two dates
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

/**
 * Generate mock import and expiry dates
 */
export function generateProductDates() {
  // Set import date between 1-6 months ago
  const today = new Date()
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(today.getMonth() - 6)
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(today.getMonth() - 1)
  
  const importDate = randomDate(sixMonthsAgo, oneMonthAgo)
  
  // Set expiry date between now and 2 years in the future
  // Some products will be expired or expiring soon for testing
  const twoYearsLater = new Date()
  twoYearsLater.setFullYear(today.getFullYear() + 2)
  
  // 20% chance of expired product, 30% chance of expiring soon
  let expiryDate
  const randomValue = Math.random()
  
  if (randomValue < 0.2) {
    // Expired product (date in the past)
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(today.getFullYear() - 1)
    expiryDate = randomDate(oneYearAgo, today)
  } else if (randomValue < 0.5) {
    // Expiring soon (within 30 days)
    const thirtyDaysLater = new Date()
    thirtyDaysLater.setDate(today.getDate() + 30)
    expiryDate = randomDate(today, thirtyDaysLater)
  } else {
    // Regular expiry date (in the future)
    expiryDate = randomDate(today, twoYearsLater)
  }
  
  return {
    importDate: importDate.toISOString(),
    expiryDate: expiryDate.toISOString()
  }
}

/**
 * Enhance existing products with QR code specific fields
 */
export function enhanceProductWithQRData(product: Product): Product {
  // Only enhance if not already enhanced
  if (product.productType && product.importDate && product.expiryDate) {
    return product
  }
  
  const { importDate, expiryDate } = generateProductDates()
  
  return {
    ...product,
    productType: product.productType || productTypes[Math.floor(Math.random() * productTypes.length)],
    importDate: product.importDate || importDate,
    expiryDate: product.expiryDate || expiryDate
  }
}

/**
 * Generate a completely new mock product with QR data
 */
export function generateMockProduct(): Product {
  const id = `prod-mock-${Math.floor(Math.random() * 10000)}`
  const { importDate, expiryDate } = generateProductDates()
  
  const productNames = [
    "Ultra Widget 3000",
    "Premium Gadget",
    "Deluxe Thingamajig",
    "Superior Doohickey",
    "Advanced Contraption",
    "Professional Tool",
    "Enterprise Solution",
    "Industrial Component",
    "Tactical Equipment",
    "Commercial Assembly"
  ]
  
  const randomName = productNames[Math.floor(Math.random() * productNames.length)]
  const randomType = productTypes[Math.floor(Math.random() * productTypes.length)]
  const locations = ["Central Warehouse", "East Warehouse", "West Warehouse", "North Distribution Center", "South Retail Hub"]
  
  return {
    id,
    name: randomName,
    sku: `MOCK-${Math.floor(Math.random() * 10000)}`,
    productType: randomType,
    quantity: Math.floor(Math.random() * 500) + 10,
    weight: parseFloat((Math.random() * 10).toFixed(1)),
    provider: "Mock Supplies Ltd.",
    location: locations[Math.floor(Math.random() * locations.length)],
    status: Math.random() > 0.2 ? "In Stock" : "Low Stock",
    lastUpdated: new Date().toISOString(),
    importDate,
    expiryDate
  }
}

/**
 * Convert Product to QRProductData (just the fields needed for QR codes)
 */
export function productToQRData(product: Product): QRProductData {
  const enhancedProduct = enhanceProductWithQRData(product)
  
  return {
    name: enhancedProduct.name,
    productType: enhancedProduct.productType,
    quantity: enhancedProduct.quantity,
    importDate: enhancedProduct.importDate,
    expiryDate: enhancedProduct.expiryDate
  }
}

/**
 * Generate multiple mock products for testing
 */
export function generateMockProducts(count: number): Product[] {
  return Array.from({ length: count }, () => generateMockProduct())
}
