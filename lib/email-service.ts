// This is a mock email service. In a real application, you would use a service like SendGrid, Mailgun, etc.

export interface EmailOptions {
  to: string
  subject: string
  body: string
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  // In a real app, this would send an actual email
  console.log("Sending email:", options)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return true
}

export const sendVerificationEmail = async (email: string, username: string, password: string): Promise<boolean> => {
  const subject = "Welcome to Hanna's Connect - Verify Your Email"
  const verificationLink = `https://hannasconnect.com/verify?token=mock-token-${Date.now()}`

  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #B22222;">Hi ${username},</h2>
      
      <p>You have successfully registered to Hanna's Connect! Click link below to verify your email address.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="background-color: #B22222; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify My Account</a>
      </div>
      
      <p>Your password is <strong>${password}</strong>.</p>
      
      <p>Welcome to Hanna's Connect! Congratulations! You have successfully registered. We're excited to have you as part of our exclusive community. At Hanna's Connect, we believe in meaningful connections.</p>
      
      <p>Your profile will be viewed by other members, and they have the option to accept or reject it—just as you have the right to accept or reject profiles that don't align with what you're looking for. This ensures that everyone connects with like-minded individuals in a space that values authenticity and personal choice. Take a moment to complete your profile and start exploring potential connections.</p>
      
      <p>We're thrilled to have you here!</p>
      
      <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        NOTE: This is an auto-generated email, please DO NOT REPLY.<br>
        Thank you.
      </p>
    </div>
  `

  return sendEmail({
    to: email,
    subject,
    body,
  })
}

export const sendConnectionRequestEmail = async (
  recipientEmail: string,
  recipientName: string,
  senderName: string,
): Promise<boolean> => {
  const subject = "New Connection Request on Hanna's Connect"

  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #B22222;">Hi ${recipientName},</h2>
      
      <p>You have received a new connection request from <strong>${senderName}</strong> on Hanna's Connect!</p>
      
      <p>They are interested in connecting with you. You can either accept or decline this request by logging into your account.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://hannasconnect.com/dashboard" style="background-color: #B22222; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Request</a>
      </div>
      
      <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        NOTE: This is an auto-generated email, please DO NOT REPLY.<br>
        Thank you.
      </p>
    </div>
  `

  return sendEmail({
    to: recipientEmail,
    subject,
    body,
  })
}

export const sendConnectionAcceptedEmail = async (
  recipientEmail: string,
  recipientName: string,
  acceptorName: string,
): Promise<boolean> => {
  const subject = "Your Connection Request was Accepted on Hanna's Connect"

  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #B22222;">Good news, ${recipientName}!</h2>
      
      <p><strong>${acceptorName}</strong> has accepted your connection request on Hanna's Connect!</p>
      
      <p>You can now start chatting with them through our platform.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://hannasconnect.com/dashboard" style="background-color: #B22222; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Start Chatting</a>
      </div>
      
      <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        NOTE: This is an auto-generated email, please DO NOT REPLY.<br>
        Thank you.
      </p>
    </div>
  `

  return sendEmail({
    to: recipientEmail,
    subject,
    body,
  })
}

export const sendConnectionRejectedEmail = async (recipientEmail: string, recipientName: string): Promise<boolean> => {
  const subject = "Update on Your Connection Request on Hanna's Connect"

  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #B22222;">Hi ${recipientName},</h2>
      
      <p>We wanted to let you know that your recent connection request on Hanna's Connect was not accepted.</p>
      
      <p>Don't worry! There are many other potential matches waiting to connect with you. Keep exploring and finding meaningful connections.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://hannasconnect.com/dashboard" style="background-color: #B22222; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Explore More Matches</a>
      </div>
      
      <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        NOTE: This is an auto-generated email, please DO NOT REPLY.<br>
        Thank you.
      </p>
    </div>
  `

  return sendEmail({
    to: recipientEmail,
    subject,
    body,
  })
}
