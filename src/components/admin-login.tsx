"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const success = await login(email, password)

    if (!success) {
      setError("Invalid email or password. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-teal-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {/* Company Logo */}
          <div className="mb-6">
            <Image
              src="/images/logo.jpg"
              alt="Best Air Cargo"
              width={180}
              height={60}
              className="h-12 w-auto mx-auto mb-4"
              priority
            />

            {/* Flag Route Indicator */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src="/images/china-flag.png"
                    alt="China Flag"
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">China</span>
              </div>
              <div className="text-orange-500 text-sm">✈</div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                  <Image
                    src="/images/tanzania-flag.png"
                    alt="Tanzania Flag"
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">Tanzania</span>
              </div>
            </div>
          </div>

          {/* Admin Icon and Title */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-gray-600">Access the Best Air Cargo admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bestcargo.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-2">🔒 Secure Access</p>
            <p className="text-xs text-blue-600">
              This is a secure admin panel. Only authorized personnel with valid credentials can access this system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
