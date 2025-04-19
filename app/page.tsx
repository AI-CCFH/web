import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, Package2, Shield, Truck, Warehouse, User, BarChart3, 
  CheckCircle, QrCode, RefreshCw
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Package2 className="h-7 w-7" />
              <span className="font-bold text-xl">LogiTrack</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="#features" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Client Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Request a Demo</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-r from-background to-background/80">
          <div className="container px-4 md:px-6 relative">
            {/* Decorative background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/5 blur-2xl"></div>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <Badge className="mb-2" variant="outline">
                    April 2025 - New QR Code Tracking System
                  </Badge>
                    <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4 pb-1.5 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                    Intelligent Logistics Management Platform
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed mt-[-0.5rem]">
                    Take control of your entire supply chain. LogiTrack helps you track shipments, manage inventory, optimize routes, and coordinate with partners in real-time.
                    </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm md:text-base">Real-time tracking</span>
                    
                    <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
                    <span className="text-sm md:text-base">QR code verification</span>
                    
                    <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
                    <span className="text-sm md:text-base">Inventory management</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm md:text-base">Route optimization</span>
                    
                    <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
                    <span className="text-sm md:text-base">Warehouse management</span>
                    
                    <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
                    <span className="text-sm md:text-base">Analytics dashboard</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1.5 w-full sm:w-auto">
                      Request a Demo
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Client Login
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative lg:ml-auto w-full h-full">
                <div className="bg-background shadow-xl rounded-xl border overflow-hidden w-full h-full">
                  <div className="p-3 bg-muted">
                    <div className="flex space-x-2 items-center px-2">
                      <div className="h-3.5 w-3.5 rounded-full bg-red-500"></div>
                      <div className="h-3.5 w-3.5 rounded-full bg-yellow-500"></div>
                      <div className="h-3.5 w-3.5 rounded-full bg-green-500"></div>
                      <div className="text-sm text-muted-foreground ml-2">LogiTrack Dashboard</div>
                    </div>
                  </div>
                  <div className="aspect-video w-full relative rounded-b-lg overflow-hidden border-t">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 p-4" style={{ width: '100%', height: '100%' }}>
                      <div className="grid grid-cols-3 h-full gap-4">
                        <div className="col-span-2 bg-background/80 backdrop-blur-sm rounded-lg p-3 border flex flex-col">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Shipment Status</h4>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <div className="w-full flex flex-col gap-2">
                              {[
                                { label: "In Transit", value: 45, color: "bg-blue-500" },
                                { label: "Delivered", value: 30, color: "bg-green-500" },
                                { label: "Processing", value: 15, color: "bg-yellow-500" },
                                { label: "Pending", value: 10, color: "bg-gray-300" }
                              ].map((item) => (
                                <div key={item.label} className="w-full">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{item.label}</span>
                                    <span>{item.value}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 border">
                            <h4 className="font-medium text-sm mb-2">Shipments Today</h4>
                            <div className="text-2xl font-bold">24</div>
                            <div className="text-xs text-green-500 flex items-center">
                              <ArrowRight className="h-3 w-3 rotate-45" />
                              <span>+8% from yesterday</span>
                            </div>
                          </div>
                          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 border flex-1">
                            <h4 className="font-medium text-sm mb-2">Active Routes</h4>
                            <div className="text-2xl font-bold">12</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Role Cards Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 border-t">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl mb-3">Tailored For Every Team Member</h2>
              <p className="text-muted-foreground max-w-[800px] mx-auto">
                LogiTrack provides specialized tools for every role in your logistics operation, ensuring everyone has exactly what they need to succeed.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-3 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <Shield className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Admin Dashboard</h3>
                <p className="text-muted-foreground">Comprehensive oversight of all operations, user management, and system configuration.</p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>User permission control</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Global performance metrics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>System-wide alerts</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <User className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Provider Portal</h3>
                <p className="text-muted-foreground">Efficiently manage product catalogs, inventory levels, and fulfillment operations.</p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Inventory forecasting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>QR code generation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Order management</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <Warehouse className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Warehouse Management</h3>
                <p className="text-muted-foreground">Optimize storage, track inventory levels, and manage warehouse operations.</p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Space optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Batch processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Stock alerts</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                <Truck className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Shipping Operations</h3>
                <p className="text-muted-foreground">Plan routes, manage deliveries, and track shipments in real-time.</p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Route optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Real-time tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Delivery confirmation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Key Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[58rem] flex flex-col items-center justify-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Modern Logistics
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                LogiTrack delivers advanced tools to optimize every aspect of your supply chain management, 
                from warehouse to delivery and everything in between.
              </p>
            </div>
            
            {/* Feature rows with alternating layout */}
            <div className="space-y-20 mt-12">
              {/* Feature 1: QR Code Tracking */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                    New Feature
                  </div>
                  <h3 className="text-2xl font-bold mb-4">QR Code Product Tracking System</h3>
                  <p className="text-muted-foreground mb-6">
                    Generate secure, encrypted QR codes for all your products. Track important information like 
                    product name, type, quantity, import date, and expiry date - all accessible with a quick scan.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Instant product verification and authentication</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Encrypted data for security and privacy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Expiration tracking with visual alerts</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 bg-background rounded-xl shadow-md border p-6">
                  <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6">
                    <div className="bg-background rounded-lg border-[0.5px] shadow-sm p-4 w-full max-w-[280px] mx-auto">
                      <div className="flex justify-center mb-4">
                        <QrCode className="h-12 w-12 text-primary" />
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Premium Laptop</p>
                          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                            <div className="h-full w-1/2 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Type: Electronics</span>
                            <span>Quantity: 120</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs border-t pt-2">
                          <span>Import: 03/15/2023</span>
                          <span className="text-green-500">Expires: 03/15/2026</span>
                        </div>
                        <div className="flex justify-center mt-4">
                          <div className="h-32 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg grid place-items-center">
                            <div className="h-28 w-28 bg-white rounded-md grid place-items-center">
                              <div className="h-24 w-24 bg-black rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature 2: Real-time Tracking */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="bg-background rounded-xl shadow-md border overflow-hidden">
                  <div className="aspect-video relative rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-2">
                    <div className="bg-background rounded-lg border shadow-sm p-4 h-full">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Active Shipments Map</h4>
                        <RefreshCw className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="h-[280px] bg-muted rounded-md relative overflow-hidden">
                        {/* Simplified map visualization */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                          {/* Primary dot - In Transit */}
                          <div className="absolute top-[20%] left-[30%] h-4 w-4 rounded-full bg-primary/50 flex items-center justify-center z-10">
                            <div className="h-2 w-2 rounded-full bg-primary animate-ping"></div>
                          </div>
                          
                          {/* Yellow dot - Delayed */}
                          <div className="absolute top-[40%] left-[60%] h-4 w-4 rounded-full bg-yellow-500/50 flex items-center justify-center z-10">
                            <div className="h-2 w-2 rounded-full bg-yellow-500 animate-ping"></div>
                          </div>
                          
                          {/* Green dot - Delivered */}
                          <div className="absolute top-[70%] left-[20%] h-4 w-4 rounded-full bg-green-500/50 flex items-center justify-center z-10">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                          </div>
                          
                          {/* Blue dot - Processing */}
                          <div className="absolute top-[55%] left-[75%] h-4 w-4 rounded-full bg-blue-500/50 flex items-center justify-center z-10">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></div>
                          </div>
                          
                          {/* Map path lines - connecting the dots */}
                          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            {/* Primary route - In Transit */}
                            <path d="M200 68 L360 115" stroke="rgba(79, 70, 229, 0.3)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                            
                            {/* Yellow route - Delayed */}
                            <path d="M378 123 L453 158" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                            
                            {/* Green route - Delivered */}
                            <path d="M453 165 L136 203" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                            
                            {/* Blue route - Processing */}
                            <path d="M128 201 L185 68" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-block rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-600 dark:text-green-400 mb-4">
                    Real-time Updates
                  </div>
                  <h3 className="text-2xl font-bold mb-4">GPS-Powered Shipment Tracking</h3>
                  <p className="text-muted-foreground mb-6">
                    Monitor your shipments in real-time with precise GPS location data. Get instant alerts for delays, 
                    route changes, and successful deliveries, all visualized on an interactive map.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Real-time location updates every 30 seconds</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Automated delay detection and notifications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Customizable geofencing for arrival alerts</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Feature 3: Analytics */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-block rounded-lg bg-indigo-500/10 px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 mb-4">
                    Data Insights
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Advanced Analytics & Reporting</h3>
                  <p className="text-muted-foreground mb-6">
                    Transform raw logistics data into actionable insights. Our customizable dashboards and reports 
                    help you identify trends, optimize operations, and make data-driven decisions.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Custom report generation with 20+ templates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Interactive data visualization tools</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                      <span>Predictive analytics for inventory planning</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2 bg-background rounded-xl shadow-md border overflow-hidden">
                  <div className="relative rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-2">
                    <div className="bg-background rounded-lg border shadow-sm p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Performance Summary</h4>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>On-time Delivery Rate</span>
                            <span className="font-medium">94.8%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{width: "94.8%"}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Warehouse Utilization</span>
                            <span className="font-medium">72.5%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{width: "72.5%"}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Order Accuracy</span>
                            <span className="font-medium">99.2%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{width: "99.2%"}}></div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <p className="text-sm font-medium mb-4">Monthly Performance</p>
                          <div className="h-[100px] flex items-end justify-between gap-1">
                            {[35, 45, 30, 60, 75, 90, 80, 65, 70, 85, 95, 70].map((height, i) => (
                              <div key={i} className="flex-1 bg-primary/10 hover:bg-primary/20 rounded-t transition-all" style={{height: `${height}%`}}></div>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Jan</span>
                            <span>Jun</span>
                            <span>Dec</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Global Clients</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1.2M+</div>
                <p className="text-muted-foreground">Shipments Tracked</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98.7%</div>
                <p className="text-muted-foreground">On-time Delivery</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Customer Support</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Industry Leaders
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Hear what our customers have to say about how LogiTrack transformed their logistics operations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-muted/50 border rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Logistics Director, TechSupply Inc.</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "LogiTrack's QR code system has revolutionized our inventory management. We've reduced errors by 75% and 
                  can now track product freshness with unparalleled accuracy."
                </p>
                <div className="flex text-amber-500">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-muted/50 border rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
                  <div>
                    <h4 className="font-medium">Marcus Lee</h4>
                    <p className="text-sm text-muted-foreground">Operations Manager, Global Express</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "The real-time tracking feature has been a game changer for our clients. They love being able to see exactly 
                  where their shipments are at any moment. Customer satisfaction is at an all-time high."
                </p>
                <div className="flex text-amber-500">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-muted/50 border rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500"></div>
                  <div>
                    <h4 className="font-medium">Elena Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">CEO, FastFreight Logistics</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  "We've cut operational costs by 30% since implementing LogiTrack. The analytics dashboards help us identify 
                  bottlenecks and optimize routes in ways we never could before."
                </p>
                <div className="flex text-amber-500">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Admin Controls</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Complete oversight of all operations, user management, and system configuration
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Provider Tools</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Manage your product catalog, track orders, and coordinate with warehouses
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Warehouse className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Stock Management</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Inventory tracking, stock alerts, and shipment preparation tools
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Shipping Controls</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Route optimization, delivery tracking, and logistics coordination
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to try LogiTrack?</h2>
                <p className="text-muted-foreground text-lg">
                  Join 500+ companies that are streamlining their logistics operations with our platform. 
                  Get started today with a free 14-day trial.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="gap-1.5 w-full sm:w-auto px-8">
                    Request a Demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">
                Enterprise-grade logistics solution for businesses
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 LogiTrack. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
