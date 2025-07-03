"use server"

export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const occupation = formData.get("occupation") as string

  await sendVerificationEmail(email, username, name, password)

  return {
    success: true,
    message: "Registration successful! Please check your email for verification.",
  }
}

export async function sendVerificationEmail(email: string, username: string, name: string, password: string) {
  console.log(`
    To: ${email}
    From: info@hannasconnect.com
    Subject: Welcome to Hanna's Connect - Verify Your Email
    
    Hi ${username},
    
    You have successfully registered to Hanna's Connect! Click link below to verify your email address.
    
    [Verify My Account]
    
    Your password is ${password}.
    
    Welcome to Hanna's Connect! Congratulations! You have successfully registered. We're excited to have you as part of our exclusive community. At Hanna's Connect, we believe in meaningful connections.
    
    Your profile will be viewed by other members, and they have the option to accept or reject it—just as you have the right to accept or reject profiles that don't align with what you're looking for. This ensures that everyone connects with like-minded individuals in a space that values authenticity and personal choice. Take a moment to complete your profile and start exploring potential connections.
    
    We're thrilled to have you here!
    
    NOTE: This is an auto-generated email, please DO NOT REPLY.
    Thank you.
  `)

  return { success: true }
}

export async function sendConnectionRequest(formData: FormData) {
  const recipientEmail = formData.get("recipientEmail") as string
  const recipientName = formData.get("recipientName") as string
  const senderName = formData.get("senderName") as string

  console.log(`
    To: ${recipientEmail}
    From: info@hannasconnect.com
    Subject: New Connection Request on Hanna's Connect
    
    Hello ${recipientName},
    
    You have received a new connection request from ${senderName} on Hanna's Connect.
    
    To view this request and respond, please log in to your account.
    
    Thank you for being part of our community!
    
    NOTE: This is an auto-generated email, please DO NOT REPLY.
  `)

  return { success: true }
}

export async function acceptConnection(formData: FormData) {
  const recipientEmail = formData.get("recipientEmail") as string
  const recipientName = formData.get("recipientName") as string
  const acceptorName = formData.get("acceptorName") as string

  console.log(`
    To: ${recipientEmail}
    From: info@hannasconnect.com
    Subject: Your Connection Request was Accepted on Hanna's Connect
    
    Hello ${recipientName},
    
    Great news! ${acceptorName} has accepted your connection request on Hanna's Connect.
    
    You can now chat with each other through the platform. Log in to start your conversation!
    
    Thank you for being part of our community!
    
    NOTE: This is an auto-generated email, please DO NOT REPLY.
  `)

  return { success: true }
}

export async function rejectConnection(formData: FormData) {
  const recipientEmail = formData.get("recipientEmail") as string
  const recipientName = formData.get("recipientName") as string

  console.log(`
    To: ${recipientEmail}
    From: info@hannasconnect.com
    Subject: Update on Your Connection Request on Hanna's Connect
    
    Hello ${recipientName},
    
    We regret to inform you that your connection request was not accepted at this time.
    
    Don't be discouraged! There are many other members on Hanna's Connect who may be a better match for you.
    
    Thank you for being part of our community!
    
    NOTE: This is an auto-generated email, please DO NOT REPLY.
  `)

  return { success: true }
}
