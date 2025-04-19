import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Package2, Shield, Truck, Warehouse, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Package2 className="h-6 w-6" />
              <span className="font-bold">LogiTrack</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Streamline Your Shipping Logistics
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Manage your entire logistics operation in one place. Track shipments, manage inventory, and coordinate
                  with partners seamlessly.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">
                      Log In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                    <Shield className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-bold">Admin</h3>
                    <p className="text-center text-sm text-muted-foreground">Manage users and oversee all operations</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                    <User className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-bold">Provider</h3>
                    <p className="text-center text-sm text-muted-foreground">Supply goods and manage inventory</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                    <Warehouse className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-bold">Stock</h3>
                    <p className="text-center text-sm text-muted-foreground">Track and manage inventory levels</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                    <Truck className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-bold">Shipper</h3>
                    <p className="text-center text-sm text-muted-foreground">Coordinate and track shipments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
                Features Designed for Every Role
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our platform provides specialized tools for each role in your logistics chain, ensuring everyone has
                what they need to succeed.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 xl:gap-10 mt-8">
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Admin Dashboard</h3>
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
