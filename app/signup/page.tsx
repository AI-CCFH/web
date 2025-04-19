"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const roles = [
  { id: 0, name: "Admin", description: "Full system access and user management" },
  { id: 1, name: "Provider", description: "Supply goods and manage inventory" },
  { id: 2, name: "Stock", description: "Track and manage inventory levels" },
  { id: 3, name: "Shipper", description: "Coordinate and track shipments" },
  { id: 4, name: "Receiver", description: "Receive and confirm deliveries" },
]

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    role: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({
    role: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const validateStep = (currentStep: number) => {
    let isValid = true
    const newErrors = { ...errors }

    if (currentStep === 1) {
      if (!formData.role) {
        newErrors.role = "Please select a role"
        isValid = false
      } else {
        newErrors.role = ""
      }
    } else if (currentStep === 2) {
      if (!formData.username) {
        newErrors.username = "Username is required"
        isValid = false
      } else {
        newErrors.username = ""
      }

      if (!formData.password) {
        newErrors.password = "Password is required"
        isValid = false
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
        isValid = false
      } else {
        newErrors.password = ""
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
        isValid = false
      } else {
        newErrors.confirmPassword = ""
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(step)) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)

      // For now, we'll just simulate a successful signup
      // In a real app, you would handle the API response
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    })
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            {step === 1 && "Step 1: Select your role in the system"}
            {step === 2 && "Step 2: Create your account credentials"}
            {step === 3 && "Step 3: Completing registration"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="space-y-3">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-start space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value={role.id.toString()} id={`role-${role.id}`} />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor={`role-${role.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {role.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            )}

            {errors.role && <p className="text-sm text-destructive mt-2">{errors.role}</p>}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Registration Complete</h3>
                  <p className="text-muted-foreground">
                    Your account has been created successfully. You can now log in with your credentials.
                  </p>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && step < 3 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step === 1 && (
            <Button onClick={handleNext} className="ml-auto">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 2 && <Button onClick={handleSubmit}>Create Account</Button>}
          {step === 3 && (
            <Button asChild className="w-full">
              <Link href="/login">Go to Login</Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Log in
        </Link>
      </p>
    </div>
  )
}
