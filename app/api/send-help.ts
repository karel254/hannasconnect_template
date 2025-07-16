// API endpoint: POST /api/send-help
// This is a template for backend developers to implement email sending for Hanna's Help requests.
// Accepts JSON body: { username, email, message }
// Sends an email to support@hannasconnect.com and assist@hannasconnect.com
// Returns: { success: true } or { success: false, error }

// Example for Next.js API route or Express handler

// Uncomment the following lines and install nodemailer if using Node.js/Express/Next.js
// import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { username, email, message } = req.body;

  // Basic validation
  if (!username || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  // TODO: Implement email sending logic here
  // Example using nodemailer (backend dev should configure SMTP credentials):
  /*
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    auth: {
      user: 'your_smtp_user',
      pass: 'your_smtp_pass',
    },
  });

  const mailOptions = {
    from: 'no-reply@hannasconnect.com',
    to: 'support@hannasconnect.com,assist@hannasconnect.com',
    subject: "Hanna's Help Issue",
    text: `User: ${username}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
  */

  // For now, just simulate success for frontend testing
  return res.status(200).json({ success: true });
} 