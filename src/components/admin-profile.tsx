"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Lock, Save, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface AdminProfile {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
  last_login: string | null
  created_at: string
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { user } = useAuth()

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setProfileData({
          name: data.name,
          email: data.email,
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(profileData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Profile updated successfully")
        setProfile(data)
        setProfileData({
          name: data.name,
          email: data.email,
        })
        // Update auth context if email changed
        if (data.email !== user?.email) {
          const updatedUser = { ...user, name: data.name, email: data.email }
          localStorage.setItem("admin_user", JSON.stringify(updatedUser))
        }

        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000)
      } else {
        setError(data.error || "Failed to update profile")
      }
    } catch (error) {
      setError("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setMessage("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      setSaving(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long")
      setSaving(false)
      return
    }

    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Password changed successfully")
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })

        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000)
      } else {
        setError(data.error || "Failed to change password")
      }
    } catch (error) {
      setError("Failed to change password")
    } finally {
      setSaving(false)
    }
  }

  const hasProfileChanges = () => {
    if (!profile) return false
    return profileData.name !== profile.name || profileData.email !== profile.email
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
            </TabsList>

            {/* Profile Information Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Form */}
                <div>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={saving || !hasProfileChanges()}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </div>

                {/* Profile Info Display */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Role:</span>
                        <span className="font-medium capitalize">{profile?.role}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${profile?.is_active ? "text-green-600" : "text-red-600"}`}>
                          {profile?.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Last Login:</span>
                        <span className="font-medium">
                          {profile?.last_login ? new Date(profile.last_login).toLocaleDateString() : "Never"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Member Since:</span>
                        <span className="font-medium">
                          {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="password" className="space-y-6">
              <div className="max-w-md mx-auto">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" disabled={saving} className="w-full bg-teal-500 hover:bg-teal-600">
                      <Lock className="w-4 h-4 mr-2" />
                      {saving ? "Changing..." : "Change Password"}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• At least 6 characters long</li>
                    <li>• Use a strong, unique password</li>
                    <li>• Don't reuse old passwords</li>
                    <li>• Consider using a password manager</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
