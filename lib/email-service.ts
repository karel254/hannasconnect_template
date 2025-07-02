// Email service for sending notifications and verification emails
export class EmailService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.EMAIL_API_KEY || ""
    this.baseUrl = process.env.EMAIL_SERVICE_URL || "https://api.emailservice.com"
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          to: email,
          subject: "Verify your Hanna's Connect account",
          template: "verification",
          data: {
            verificationToken,
            verificationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${verificationToken}`,
          },
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Failed to send verification email:", error)
      return false
    }
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          to: email,
          subject: "Welcome to Hanna's Connect!",
          template: "welcome",
          data: {
            firstName,
            dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          },
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Failed to send welcome email:", error)
      return false
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          to: email,
          subject: "Reset your Hanna's Connect password",
          template: "password-reset",
          data: {
            resetToken,
            resetUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`,
          },
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Failed to send password reset email:", error)
      return false
    }
  }

  async sendMatchNotification(email: string, matchName: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          to: email,
          subject: "You have a new match!",
          template: "new-match",
          data: {
            matchName,
            messagesUrl: `${process.env.NEXT_PUBLIC_APP_URL}/messages`,
          },
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Failed to send match notification:", error)
      return false
    }
  }
}

export const emailService = new EmailService()
