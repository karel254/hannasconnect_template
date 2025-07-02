"use server"

import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate authentication
  if (email && password) {
    // In a real app, you would validate credentials here
    redirect("/dashboard")
  }

  return { error: "Invalid credentials" }
}

export async function registerAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  // Simulate registration
  if (email && password && firstName && lastName) {
    // In a real app, you would create the user account here
    redirect("/login")
  }

  return { error: "Registration failed" }
}

export async function sendMessageAction(formData: FormData) {
  const message = formData.get("message") as string
  const recipientId = formData.get("recipientId") as string

  // Simulate sending message
  if (message && recipientId) {
    return { success: true, message: "Message sent successfully" }
  }

  return { error: "Failed to send message" }
}
