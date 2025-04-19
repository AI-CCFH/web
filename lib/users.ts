// Hard-coded example users for each role
// This will be replaced with actual backend data later

export interface User {
  id: string
  username: string
  password: string // In a real app, this would be hashed
  role: number // 0: Admin, 1: Provider, 2: Stock, 3: Shipper, 4: Receiver
  name: string
  email: string
  avatar?: string
  company?: string
  lastActive?: string
}

export const users: User[] = [
  {
    id: "admin-1",
    username: "admin",
    password: "password",
    role: 0,
    name: "Alex Johnson",
    email: "alex@logitrack.com",
    lastActive: "2023-04-18T10:30:00Z",
    company: "LogiTrack HQ",
  },
  {
    id: "provider-1",
    username: "provider",
    password: "password",
    role: 1,
    name: "Sam Williams",
    email: "sam@supplier.com",
    lastActive: "2023-04-18T09:15:00Z",
    company: "Global Supplies Inc.",
  },
  {
    id: "stock-1",
    username: "stock",
    password: "password",
    role: 2,
    name: "Jamie Chen",
    email: "jamie@warehouse.com",
    lastActive: "2023-04-18T11:45:00Z",
    company: "Central Warehouse",
  },
  {
    id: "shipper-1",
    username: "shipper",
    password: "password",
    role: 3,
    name: "Taylor Rodriguez",
    email: "taylor@shipping.com",
    lastActive: "2023-04-18T08:20:00Z",
    company: "Fast Freight Logistics",
  },
  {
    id: "receiver-1",
    username: "receiver",
    password: "password",
    role: 4,
    name: "Morgan Smith",
    email: "morgan@retailer.com",
    lastActive: "2023-04-18T14:10:00Z",
    company: "Retail Chain Corp.",
  },
]

// Mock function to authenticate a user
export function authenticateUser(username: string, password: string): User | null {
  const user = users.find((u) => u.username === username && u.password === password)
  return user || null
}

// Get user by ID
export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) || null
}

// Get role name
export function getRoleName(roleId: number): string {
  const roles = ["Admin", "Provider", "Stock", "Shipper", "Receiver"]
  return roles[roleId] || "User"
}
