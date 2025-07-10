import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // For demo purposes, we'll use hardcoded admin credentials
    // In production, you should store hashed passwords in your database
    const ADMIN_EMAIL = "admin@bestcargo.com"
    const ADMIN_PASSWORD = "admin123" // Change this in production!

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = {
        id: "1",
        email: ADMIN_EMAIL,
        role: "admin" as const,
        name: "Admin User",
        created_at: new Date().toISOString(),
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "24h" })

      return NextResponse.json({
        success: true,
        user,
        token,
        message: "Login successful",
      })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
