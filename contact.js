// Vercel Serverless Function — sends contact form via SendGrid
// Required environment variables:
// SENDGRID_API_KEY - your SendGrid API key
// SENDGRID_TO_EMAIL - email address to receive contacts
// SENDGRID_FROM_EMAIL - verified from address (optional)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name = "", email = "", message = "" } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const TO_EMAIL = process.env.SENDGRID_TO_EMAIL;
  const FROM_EMAIL =
    process.env.SENDGRID_FROM_EMAIL ||
    `no-reply@${process.env.VERCEL_URL || "example.com"}`;

  if (!SENDGRID_API_KEY || !TO_EMAIL) {
    return res
      .status(500)
      .json({ message: "Email service not configured on server" });
  }

  const payload = {
    personalizations: [
      {
        to: [{ email: TO_EMAIL }],
        subject: `Website message from ${name || email}`,
      },
    ],
    from: { email: FROM_EMAIL, name: "Website Contact" },
    content: [
      {
        type: "text/plain",
        value: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      },
    ],
  };

  try {
    const resp = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("SendGrid error:", resp.status, text);
      return res.status(502).json({ message: "Failed to send email" });
    }

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact function error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
