import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return { success: true, user: decoded }
  } catch (error) {
    return { success: false, error: "Invalid token" }
  }
}
