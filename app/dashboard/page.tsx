"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, Users, Warehouse, AlertTriangle } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { formatDistanceToNow } from "date-fns"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { getRecentActivities } from "@/lib/api/services/activity-service"
import { 
  getShipmentOverview,
  getProductPerformance, 
  getWarehouseCapacity,
  getActiveRoutes,
  getDeliverySchedule,
  getShipmentAnalytics,
  getInventoryAnalytics,
  getRegionalDistribution,
  getTransportationMethods,
  getMonthlyReports
} from "@/lib/api/services/analytics-service"
import type { Activity } from "@/lib/api/services/activity-service"
import type { 
  ShipmentOverview,
  ProductPerformance,
  WarehouseCapacity,
  RouteInfo,
  DeliverySchedule,
  ShipmentAnalytics,
  InventoryAnalytics,
  RegionalDistribution,
  TransportationMethod,
  MonthlyReport
} from "@/lib/api/services/analytics-service"

export default function DashboardPage() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  
  // Chart data states
  const [shipmentOverviewData, setShipmentOverviewData] = useState<ShipmentOverview[]>([])
  const [productPerformanceData, setProductPerformanceData] = useState<ProductPerformance[]>([])
  const [warehouseCapacityData, setWarehouseCapacityData] = useState<WarehouseCapacity[]>([])
  const [activeRoutesData, setActiveRoutesData] = useState<RouteInfo[]>([])
  const [deliveryScheduleData, setDeliveryScheduleData] = useState<DeliverySchedule[]>([])
  const [shipmentAnalyticsData, setShipmentAnalyticsData] = useState<ShipmentAnalytics[]>([])
  const [inventoryAnalyticsData, setInventoryAnalyticsData] = useState<InventoryAnalytics[]>([])
  const [regionalDistributionData, setRegionalDistributionData] = useState<RegionalDistribution[]>([])
  const [transportationMethodsData, setTransportationMethodsData] = useState<TransportationMethod[]>([])
  const [monthlyReportsData, setMonthlyReportsData] = useState<MonthlyReport[]>([])

  // Fetch activities data
  const fetchActivities = async () => {
    try {
      const response = await getRecentActivities(7)
      if (response.success && response.data) {
        setActivities(response.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching activities:", error)
      setLoading(false)
    }
  }
  
  // Fetch chart data based on user role
  const fetchChartData = async () => {
    try {
      // Data for Admin dashboard
      const shipmentOverview = await getShipmentOverview()
      if (shipmentOverview.success && shipmentOverview.data) {
        setShipmentOverviewData(shipmentOverview.data)
      }
      
      // Data for Provider dashboard
      const productPerformance = await getProductPerformance()
      if (productPerformance.success && productPerformance.data) {
        setProductPerformanceData(productPerformance.data)
      }
      
      // Data for Stock dashboard
      const warehouseCapacity = await getWarehouseCapacity()
      if (warehouseCapacity.success && warehouseCapacity.data) {
        setWarehouseCapacityData(warehouseCapacity.data)
      }
      
      // Data for Shipper dashboard
      const activeRoutes = await getActiveRoutes()
      if (activeRoutes.success && activeRoutes.data) {
        setActiveRoutesData(activeRoutes.data)
      }
      
      // Data for Receiver dashboard
      const deliverySchedule = await getDeliverySchedule()
      if (deliverySchedule.success && deliverySchedule.data) {
        setDeliveryScheduleData(deliverySchedule.data)
      }
      
      // Data for Analytics tab
      const shipmentAnalytics = await getShipmentAnalytics()
      if (shipmentAnalytics.success && shipmentAnalytics.data) {
        setShipmentAnalyticsData(shipmentAnalytics.data)
      }
      
      const inventoryAnalytics = await getInventoryAnalytics()
      if (inventoryAnalytics.success && inventoryAnalytics.data) {
        setInventoryAnalyticsData(inventoryAnalytics.data)
      }
      
      const regionalDistribution = await getRegionalDistribution()
      if (regionalDistribution.success && regionalDistribution.data) {
        setRegionalDistributionData(regionalDistribution.data)
      }
      
      const transportationMethods = await getTransportationMethods()
      if (transportationMethods.success && transportationMethods.data) {
        setTransportationMethodsData(transportationMethods.data)
      }
      
      // Data for Reports tab
      const monthlyReports = await getMonthlyReports()
      if (monthlyReports.success && monthlyReports.data) {
        setMonthlyReportsData(monthlyReports.data)
      }
    } catch (error) {
      console.error("Error fetching chart data:", error)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchActivities();
    fetchChartData();
  }, [])

  // Refresh activities periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchActivities();
    }, 60000) // Refresh every minute

    return () => clearInterval(interval);
  }, [])

  // Format timestamp to relative time
  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
    } catch (error) {
      return "recently"
    }
  }

  // Role-specific dashboard content
  const renderRoleSpecificContent = () => {
    if (!user) return null

    switch (user.role) {
      case 0: // Admin
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Inventory</CardTitle>
                  <Warehouse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,732</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">-4% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Shipment Overview</CardTitle>
                  <CardDescription>Shipment volume and status over time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={shipmentOverviewData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="delivered" fill="#10B981" name="Delivered" />
                        <Bar dataKey="inTransit" fill="#3B82F6" name="In Transit" />
                        <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest logistics operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{formatTimestamp(activity.timestamp)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case 1: // Provider
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">17</div>
                  <p className="text-xs text-muted-foreground">-2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Sales and inventory levels by product</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={productPerformanceData}
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#3B82F6" name="Sales" />
                        <Bar dataKey="inventory" fill="#10B981" name="Inventory" />
                        <Bar dataKey="target" fill="#F59E0B" name="Target" stackId="a" fillOpacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 5).map((activity, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">Order #{1000 + i}</p>
                          <p className="text-sm text-muted-foreground">15 items - $1,{240 + i * 50}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{i + 1}h ago</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case 2: // Stock
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
                  <Warehouse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,732</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Incoming Shipments</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Outgoing Shipments</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">-2 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Warehouse Capacity</CardTitle>
                  <CardDescription>Current utilization by warehouse</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={warehouseCapacityData}
                        layout="vertical" 
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="used" fill="#3B82F6" name="Used Space" stackId="a" />
                        <Bar dataKey="available" fill="#D1D5DB" name="Available Space" stackId="a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Stock Updates</CardTitle>
                  <CardDescription>Latest inventory changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities
                      .filter((a) => a.action.includes("Inventory") || a.action.includes("Product"))
                      .map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                          <div className="text-sm text-muted-foreground">{formatTimestamp(activity.timestamp)}</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case 3: // Shipper
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+5 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Pickups</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">-2 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Delayed Shipments</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">-1 from yesterday</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Active Routes</CardTitle>
                  <CardDescription>Current shipment routes and status</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <div className="grid grid-cols-1 gap-4 h-full">
                      {activeRoutesData.map((route) => (
                        <div key={route.id} className="flex items-center bg-muted/20 rounded-md p-3 relative overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-blue-500/20" 
                            style={{ width: `${route.progress}%` }}
                          />
                          <div className="z-10 flex-1 grid grid-cols-5 w-full">
                            <div className="col-span-2">
                              <div className="font-medium">{route.origin.name}</div>
                              <div className="text-xs text-muted-foreground">Origin</div>
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                              <div className="w-full h-1 bg-gray-200 relative">
                                <div 
                                  className="absolute top-0 left-0 h-1 bg-blue-500"
                                  style={{ width: `${route.progress}%` }} 
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="font-medium">{route.destination.name}</div>
                              <div className="text-xs text-muted-foreground">Destination</div>
                            </div>
                          </div>
                          <div className="z-10 flex flex-col items-end min-w-[100px]">
                            <div className="text-sm font-medium">{route.status}</div>
                            <div className="text-xs text-muted-foreground">ETA: {route.eta}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Deliveries</CardTitle>
                  <CardDescription>Deliveries scheduled for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities
                      .filter((a) => a.action.includes("Shipment"))
                      .map((activity, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Delivery #{1000 + i}</p>
                            <p className="text-sm text-muted-foreground">Estimated: {new Date().getHours() + i}:00</p>
                          </div>
                          <div className="text-sm text-muted-foreground">In {i + 1}h</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )

      case 4: // Receiver
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expected Deliveries</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Received Today</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">+1 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Inspection</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">No change</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Issues Reported</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">-1 from yesterday</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Delivery Schedule</CardTitle>
                  <CardDescription>Upcoming deliveries by time</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={deliveryScheduleData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="onTime" name="On Time" fill="#10B981" />
                        <Bar dataKey="delayed" name="Delayed" fill="#EF4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Deliveries</CardTitle>
                  <CardDescription>Latest received shipments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities
                      .filter((a) => a.action.includes("Shipment") || a.action.includes("Delivered"))
                      .map((activity, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Shipment #{1000 + i}</p>
                            <p className="text-sm text-muted-foreground">
                              Received: {new Date(Date.now() - i * 3600000).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">{i + 1}h ago</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here's an overview of your logistics operations.
        </p>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {renderRoleSpecificContent()}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Trends</CardTitle>
                  <CardDescription>Daily shipment performance over the last month</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={shipmentAnalyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tickFormatter={(value) => value.split('-').slice(1).join('-')} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCount)" />
                      <Area type="monotone" dataKey="onTime" stroke="#10B981" fillOpacity={0.5} fill="#10B98133" />
                      <Area type="monotone" dataKey="delayed" stroke="#EF4444" fillOpacity={0.5} fill="#EF444433" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Movement</CardTitle>
                  <CardDescription>Daily inventory changes with inflows and outflows</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={inventoryAnalyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => value.split('-').slice(1).join('-')} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="total" stroke="#3B82F6" name="Total Inventory" />
                      <Line yAxisId="right" type="monotone" dataKey="in" stroke="#10B981" name="Items In" />
                      <Line yAxisId="right" type="monotone" dataKey="out" stroke="#EF4444" name="Items Out" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                  <CardDescription>Shipment distribution by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={regionalDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {regionalDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transportation Methods</CardTitle>
                  <CardDescription>Shipment distribution by transport type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={transportationMethodsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {transportationMethodsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index % 4]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Report</CardTitle>
                <CardDescription>Key metrics by month</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyReportsData}
                    margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="shipments" name="Shipments" fill="#3B82F6" />
                    <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="#10B981" />
                    <Bar yAxisId="right" dataKey="expenses" name="Expenses ($)" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
