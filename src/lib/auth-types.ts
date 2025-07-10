export interface User {
  id: string
  email: string
  role: "admin" | "user"
  name: string
  created_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
  token?: string
}
