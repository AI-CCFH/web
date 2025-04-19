// Mock data for dashboards and other pages
// This will be replaced with actual backend data later

export interface Product {
  id: string
  name: string
  sku: string
  quantity: number
  weight: number // kg per unit
  provider: string
  location: string
  status: string
  lastUpdated: string
}

export interface Shipment {
  id: string
  trackingNumber: string
  origin: string
  destination: string
  status: string
  items: number
  totalWeight: number
  shipper: string
  departureDate?: string
  estimatedArrival?: string
  actualArrival?: string
  urgency: "low" | "medium" | "high" | "critical"
}

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  utilization: number
  manager: string
}

export interface Activity {
  id: string
  action: string
  description: string
  user: string
  timestamp: string
  relatedId?: string
}

// Products data
export const products: Product[] = [
  {
    id: "prod-1",
    name: "Premium Laptop",
    sku: "TECH-001",
    quantity: 120,
    weight: 2.5,
    provider: "Global Supplies Inc.",
    location: "Central Warehouse",
    status: "In Stock",
    lastUpdated: "2023-04-17T14:30:00Z",
  },
  {
    id: "prod-2",
    name: "Wireless Headphones",
    sku: "TECH-002",
    quantity: 350,
    weight: 0.3,
    provider: "Global Supplies Inc.",
    location: "Central Warehouse",
    status: "In Stock",
    lastUpdated: "2023-04-17T15:45:00Z",
  },
  {
    id: "prod-3",
    name: "Smart Watch",
    sku: "TECH-003",
    quantity: 75,
    weight: 0.1,
    provider: "Global Supplies Inc.",
    location: "East Warehouse",
    status: "Low Stock",
    lastUpdated: "2023-04-16T11:20:00Z",
  },
  {
    id: "prod-4",
    name: "Tablet",
    sku: "TECH-004",
    quantity: 95,
    weight: 0.8,
    provider: "Tech Innovations LLC",
    location: "Central Warehouse",
    status: "In Stock",
    lastUpdated: "2023-04-18T09:10:00Z",
  },
  {
    id: "prod-5",
    name: "Bluetooth Speaker",
    sku: "TECH-005",
    quantity: 210,
    weight: 0.5,
    provider: "Tech Innovations LLC",
    location: "West Warehouse",
    status: "In Stock",
    lastUpdated: "2023-04-17T16:30:00Z",
  },
]

// Shipments data
export const shipments: Shipment[] = [
  {
    id: "ship-1",
    trackingNumber: "SHP-10045",
    origin: "Central Warehouse",
    destination: "North Distribution Center",
    status: "In Transit",
    items: 45,
    totalWeight: 120,
    shipper: "Fast Freight Logistics",
    departureDate: "2023-04-16T08:00:00Z",
    estimatedArrival: "2023-04-19T14:00:00Z",
    urgency: "medium",
  },
  {
    id: "ship-2",
    trackingNumber: "SHP-10046",
    origin: "East Warehouse",
    destination: "South Retail Hub",
    status: "Delivered",
    items: 32,
    totalWeight: 85,
    shipper: "Fast Freight Logistics",
    departureDate: "2023-04-15T09:30:00Z",
    estimatedArrival: "2023-04-17T11:00:00Z",
    actualArrival: "2023-04-17T10:45:00Z",
    urgency: "low",
  },
  {
    id: "ship-3",
    trackingNumber: "SHP-10047",
    origin: "Global Supplies Inc.",
    destination: "Central Warehouse",
    status: "Pending",
    items: 120,
    totalWeight: 350,
    shipper: "Express Shipping Co.",
    estimatedArrival: "2023-04-22T16:00:00Z",
    urgency: "high",
  },
  {
    id: "ship-4",
    trackingNumber: "SHP-10048",
    origin: "West Warehouse",
    destination: "East Coast Distribution",
    status: "Processing",
    items: 78,
    totalWeight: 210,
    shipper: "Fast Freight Logistics",
    urgency: "medium",
  },
  {
    id: "ship-5",
    trackingNumber: "SHP-10049",
    origin: "Central Warehouse",
    destination: "Retail Chain Corp.",
    status: "In Transit",
    items: 25,
    totalWeight: 60,
    shipper: "Express Shipping Co.",
    departureDate: "2023-04-18T07:15:00Z",
    estimatedArrival: "2023-04-19T09:00:00Z",
    urgency: "critical",
  },
]

// Warehouses data
export const warehouses: Warehouse[] = [
  {
    id: "wh-1",
    name: "Central Warehouse",
    location: "Chicago, IL",
    capacity: 10000,
    utilization: 68,
    manager: "Jamie Chen",
  },
  {
    id: "wh-2",
    name: "East Warehouse",
    location: "New York, NY",
    capacity: 8000,
    utilization: 72,
    manager: "Riley Johnson",
  },
  {
    id: "wh-3",
    name: "West Warehouse",
    location: "Los Angeles, CA",
    capacity: 12000,
    utilization: 45,
    manager: "Casey Williams",
  },
  {
    id: "wh-4",
    name: "North Distribution Center",
    location: "Minneapolis, MN",
    capacity: 6000,
    utilization: 60,
    manager: "Jordan Smith",
  },
  {
    id: "wh-5",
    name: "South Retail Hub",
    location: "Atlanta, GA",
    capacity: 5000,
    utilization: 85,
    manager: "Taylor Davis",
  },
]

// Recent activities
export const activities: Activity[] = [
  {
    id: "act-1",
    action: "Shipment Created",
    description: "New shipment SHP-10049 created",
    user: "Taylor Rodriguez",
    timestamp: "2023-04-18T07:10:00Z",
    relatedId: "ship-5",
  },
  {
    id: "act-2",
    action: "Inventory Updated",
    description: "Bluetooth Speaker stock updated to 210 units",
    user: "Jamie Chen",
    timestamp: "2023-04-17T16:30:00Z",
    relatedId: "prod-5",
  },
  {
    id: "act-3",
    action: "Shipment Delivered",
    description: "Shipment SHP-10046 delivered to South Retail Hub",
    user: "Morgan Smith",
    timestamp: "2023-04-17T10:45:00Z",
    relatedId: "ship-2",
  },
  {
    id: "act-4",
    action: "New Product Added",
    description: "Tablet added to inventory with 95 units",
    user: "Sam Williams",
    timestamp: "2023-04-18T09:10:00Z",
    relatedId: "prod-4",
  },
  {
    id: "act-5",
    action: "Shipment In Transit",
    description: "Shipment SHP-10045 is now in transit",
    user: "Taylor Rodriguez",
    timestamp: "2023-04-16T08:15:00Z",
    relatedId: "ship-1",
  },
  {
    id: "act-6",
    action: "User Login",
    description: "Admin user logged in",
    user: "Alex Johnson",
    timestamp: "2023-04-18T10:30:00Z",
  },
  {
    id: "act-7",
    action: "Warehouse Capacity Updated",
    description: "West Warehouse capacity updated to 12000 units",
    user: "Alex Johnson",
    timestamp: "2023-04-16T14:20:00Z",
    relatedId: "wh-3",
  },
]

// Get activities sorted by timestamp (most recent first)
export function getRecentActivities(limit = 5): Activity[] {
  return [...activities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

// Get products by location
export function getProductsByLocation(location: string): Product[] {
  return products.filter((product) => product.location === location)
}

// Get shipments by status
export function getShipmentsByStatus(status: string): Shipment[] {
  return shipments.filter((shipment) => shipment.status === status)
}

// Get warehouse by ID
export function getWarehouseById(id: string): Warehouse | undefined {
  return warehouses.find((warehouse) => warehouse.id === id)
}

// Get shipment by ID
export function getShipmentById(id: string): Shipment | undefined {
  return shipments.find((shipment) => shipment.id === id)
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
