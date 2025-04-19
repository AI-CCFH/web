// Mock data for dashboard charts
// This will be replaced with actual backend data later

// Define interfaces for the data structures
export interface ShipmentOverview {
  name: string;
  delivered: number;
  inTransit: number;
  pending: number;
}

export interface ProductPerformance {
  name: string;
  sales: number;
  inventory: number;
  target: number;
}

export interface WarehouseCapacity {
  name: string;
  capacity: number;
  used: number;
  available: number;
}

export interface RouteLocation {
  lat: number;
  lng: number;
  name: string;
}

export interface ActiveRoute {
  id: string;
  origin: RouteLocation;
  destination: RouteLocation;
  status: string;
  progress: number;
  eta: string;
}

export interface DeliverySchedule {
  time: string;
  count: number;
  onTime: number;
  delayed: number;
}

export interface AnalyticsShipment {
  date: string;
  count: number;
  onTime: number;
  delayed: number;
}

export interface InventoryAnalytics {
  date: string;
  total: number;
  in: number;
  out: number;
}

export interface RegionalDistribution {
  name: string;
  value: number;
}

export interface MonthlyReport {
  name: string;
  shipments: number;
  revenue: number;
  expenses: number;
}

// Mock dates for timeline data
export const generateDates = (daysAgo: number) => {
  const dates = []
  for (let i = daysAgo; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
  }
  return dates
}

// Last 30 days for monthly charts
export const last30Days = generateDates(30)
export const last7Days = generateDates(7)
export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1)

// Mock data for shipment overview chart (Admin Dashboard)
export const shipmentOverviewData = [
  { name: 'Jan', delivered: 65, inTransit: 28, pending: 15 },
  { name: 'Feb', delivered: 59, inTransit: 32, pending: 20 },
  { name: 'Mar', delivered: 80, inTransit: 27, pending: 18 },
  { name: 'Apr', delivered: 81, inTransit: 30, pending: 25 },
  { name: 'May', delivered: 56, inTransit: 36, pending: 21 },
  { name: 'Jun', delivered: 55, inTransit: 42, pending: 19 },
  { name: 'Jul', delivered: 67, inTransit: 35, pending: 22 },
  { name: 'Aug', delivered: 75, inTransit: 28, pending: 18 },
  { name: 'Sep', delivered: 88, inTransit: 32, pending: 17 },
  { name: 'Oct', delivered: 95, inTransit: 34, pending: 23 },
  { name: 'Nov', delivered: 106, inTransit: 38, pending: 26 },
  { name: 'Dec', delivered: 115, inTransit: 42, pending: 30 },
]

// Mock data for product performance chart (Provider Dashboard)
export const productPerformanceData = [
  { name: 'Organic Apples', sales: 120, inventory: 85, target: 150 },
  { name: 'Cold Brew Coffee', sales: 350, inventory: 210, target: 300 },
  { name: 'Fresh Avocados', sales: 75, inventory: 45, target: 100 },
  { name: 'Sparkling Water', sales: 95, inventory: 65, target: 120 },
  { name: 'Mixed Salad Greens', sales: 210, inventory: 130, target: 200 },
]

// Mock data for warehouse capacity chart (Stock Dashboard)
export const warehouseCapacityData = [
  { name: 'Central Warehouse', capacity: 10000, used: 6800, available: 3200 },
  { name: 'East Warehouse', capacity: 8000, used: 5760, available: 2240 },
  { name: 'West Warehouse', capacity: 12000, used: 5400, available: 6600 },
  { name: 'North Distribution', capacity: 6000, used: 3600, available: 2400 },
  { name: 'South Retail Hub', capacity: 5000, used: 4250, available: 750 },
]

// Mock data for active routes map (Shipper Dashboard)
export const activeRoutesData = [
  {
    id: 'route-1',
    origin: { lat: 41.8781, lng: -87.6298, name: 'Chicago, IL' }, // Chicago
    destination: { lat: 40.7128, lng: -74.006, name: 'New York, NY' }, // New York
    status: 'In Transit',
    progress: 65,
    eta: '2 days',
  },
  {
    id: 'route-2',
    origin: { lat: 37.7749, lng: -122.4194, name: 'San Francisco, CA' }, // San Francisco
    destination: { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, CA' }, // Los Angeles
    status: 'In Transit',
    progress: 45,
    eta: '1 day',
  },
  {
    id: 'route-3',
    origin: { lat: 29.7604, lng: -95.3698, name: 'Houston, TX' }, // Houston
    destination: { lat: 32.7767, lng: -96.7970, name: 'Dallas, TX' }, // Dallas
    status: 'Departing',
    progress: 10,
    eta: '3 days',
  },
]

// Mock data for delivery schedule (Receiver Dashboard)
export const deliveryScheduleData = [
  { time: '08:00', count: 2, onTime: 2, delayed: 0 },
  { time: '09:00', count: 1, onTime: 1, delayed: 0 },
  { time: '10:00', count: 3, onTime: 2, delayed: 1 },
  { time: '11:00', count: 2, onTime: 2, delayed: 0 },
  { time: '12:00', count: 1, onTime: 1, delayed: 0 },
  { time: '13:00', count: 0, onTime: 0, delayed: 0 },
  { time: '14:00', count: 2, onTime: 1, delayed: 1 },
  { time: '15:00', count: 3, onTime: 3, delayed: 0 },
  { time: '16:00', count: 1, onTime: 0, delayed: 1 },
  { time: '17:00', count: 2, onTime: 2, delayed: 0 },
]

// Mock data for analytics page
export const analyticsShipmentData = last30Days.map((date, index) => {
  // Create some realistic patterns
  const base = 30 + Math.sin(index / 2) * 10
  const random = Math.random() * 10 - 5
  const trend = index / 10 // Slight upward trend
  
  return {
    date,
    count: Math.max(10, Math.round(base + random + trend)),
    onTime: Math.max(8, Math.round((base + random + trend) * 0.85)),
    delayed: Math.max(2, Math.round((base + random + trend) * 0.15))
  }
})

// Mock data for inventory analytics
export const inventoryAnalyticsData = last30Days.map((date, index) => {
  // Create some realistic patterns with occasional spikes for inventory restocking
  const restockDay = index % 7 === 0
  const baseInventory = 5000 + Math.sin(index / 5) * 200
  const random = Math.random() * 100 - 50
  const restock = restockDay ? 300 : 0
  const consumption = 50 + Math.random() * 30
  
  return {
    date,
    total: Math.round(baseInventory + random + restock),
    in: restockDay ? Math.round(300 + Math.random() * 100) : Math.round(20 + Math.random() * 30),
    out: Math.round(consumption)
  }
})

// Mock data for regional distribution
export const regionalDistributionData = [
  { name: 'North', value: 35 },
  { name: 'South', value: 25 },
  { name: 'East', value: 20 },
  { name: 'West', value: 15 },
  { name: 'Central', value: 5 },
]

// Mock data for transportation methods
export const transportationMethodsData = [
  { name: 'Truck', value: 65 },
  { name: 'Rail', value: 15 },
  { name: 'Air', value: 12 },
  { name: 'Sea', value: 8 },
]

// Mock data for monthly reports
export const monthlyReportsData = monthNames.map((month, index) => {
  const baseValue = 1000 + (index * 100) + (Math.random() * 200 - 100)
  const growth = index / 12 * 1000 // Yearly growth trend
  
  return {
    name: month,
    shipments: Math.round(baseValue + growth),
    revenue: Math.round((baseValue + growth) * 15.5),
    expenses: Math.round((baseValue + growth) * 12.3),
  }
})
