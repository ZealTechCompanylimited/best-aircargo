import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

interface DecodedToken {
  [key: string]: unknown
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
    return { success: true, user: decoded }
  } catch {
    return { success: false, error: "Invalid token" }
  }
}