import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT ?? 8787);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/orders", async (request, response) => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL ?? gmailUser;

  if (!gmailUser || !gmailAppPassword || !notificationEmail) {
    response.status(500).json({
      message:
        "Email server is not configured. Set GMAIL_USER, GMAIL_APP_PASSWORD, and ORDER_NOTIFICATION_EMAIL.",
    });
    return;
  }

  const { customer, items, subtotal } = request.body ?? {};

  if (!customer || !Array.isArray(items) || items.length === 0 || typeof subtotal !== "number") {
    response.status(400).json({
      message: "Missing customer details or ordered products.",
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const orderLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} (${item.category}) - Qty: ${item.quantity} - Rs ${Number(item.total).toLocaleString()}`,
    )
    .join("\n");

  const textBody = `
New order received

Customer Details
First Name: ${customer.firstName}
Last Name: ${customer.lastName}
Email: ${customer.email}
Contact Number: ${customer.contactNumber}
Alternate Contact: ${customer.alternateContact || "N/A"}
Country: ${customer.country}
Province: ${customer.province}
City: ${customer.city}
Area / Street Address: ${customer.area}
Postal Code: ${customer.postalCode || "N/A"}
Landmark: ${customer.landmark || "N/A"}

Ordered Products
${orderLines}

Subtotal: Rs ${Number(subtotal).toLocaleString()}
`.trim();

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
      <h2 style="margin-bottom: 8px;">New order received</h2>
      <h3 style="margin-bottom: 8px;">Customer Details</h3>
      <table style="border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 4px 12px 4px 0;"><strong>First Name</strong></td><td>${customer.firstName}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Last Name</strong></td><td>${customer.lastName}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Email</strong></td><td>${customer.email}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Contact Number</strong></td><td>${customer.contactNumber}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Alternate Contact</strong></td><td>${customer.alternateContact || "N/A"}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Country</strong></td><td>${customer.country}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Province</strong></td><td>${customer.province}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>City</strong></td><td>${customer.city}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Area / Street Address</strong></td><td>${customer.area}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Postal Code</strong></td><td>${customer.postalCode || "N/A"}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Landmark</strong></td><td>${customer.landmark || "N/A"}</td></tr>
      </table>

      <h3 style="margin-bottom: 8px;">Ordered Products</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr>
            <th style="text-align: left; border-bottom: 1px solid #d1d5db; padding: 8px 0;">Product</th>
            <th style="text-align: left; border-bottom: 1px solid #d1d5db; padding: 8px 0;">Category</th>
            <th style="text-align: left; border-bottom: 1px solid #d1d5db; padding: 8px 0;">Qty</th>
            <th style="text-align: left; border-bottom: 1px solid #d1d5db; padding: 8px 0;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
                <tr>
                  <td style="padding: 8px 0;">${item.name}</td>
                  <td style="padding: 8px 0;">${item.category}</td>
                  <td style="padding: 8px 0;">${item.quantity}</td>
                  <td style="padding: 8px 0;">Rs ${Number(item.total).toLocaleString()}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>

      <p style="font-size: 18px;"><strong>Subtotal: Rs ${Number(subtotal).toLocaleString()}</strong></p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: gmailUser,
      to: notificationEmail,
      subject: `New order from ${customer.firstName} ${customer.lastName}`,
      text: textBody,
      html: htmlBody,
    });

    response.json({ ok: true });
  } catch (error) {
    console.error("Order email failed:", error);
    response.status(500).json({
      message: "Failed to send order email. Check Gmail app password and SMTP settings.",
    });
  }
});

app.listen(port, () => {
  console.log(`Order mail server running on http://localhost:${port}`);
});
