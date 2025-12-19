'use server';

import type { Order, Shoe } from "@/lib/types";
import nodemailer from 'nodemailer';
import { shoes as defaultShoes } from '@/lib/data';

// Use environment variables for credentials
const SENDER_EMAIL = process.env.EMAIL_USER;
const SENDER_PASSWORD = process.env.EMAIL_PASSWORD;
const ADMIN_EMAIL = 'dezxleather@gmail.com';
const FROM_EMAIL = process.env.EMAIL_FROM;

// Ensure all required environment variables are set
if (!SENDER_EMAIL || !SENDER_PASSWORD || !FROM_EMAIL) {
  console.error("Missing required email environment variables.");
  // In a real app, you might want to throw an error or handle this differently
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

/**
 * Sends an order confirmation email to the admin.
 */
export async function processOrder(order: Order) {
  // Defensive check in case env variables are not set.
  if (!SENDER_EMAIL || !SENDER_PASSWORD || !FROM_EMAIL) {
    return { success: false, message: "Server email configuration is incomplete." };
  }

  try {
    // Note: In a real app, you would fetch/update from a database.
    // Here we simulate it with localStorage on the client and defaultShoes on the server.
    // This is a simplified approach for demonstration.
    // A robust implementation would use a proper database.

    // The stock update logic should ideally be in a transactional database operation.
    // Since we don't have a DB, we can't reliably update stock server-side for this demo.
    // A proper implementation would look something like this:
    //
    // const db = getDatabase();
    // await db.transaction(async (tx) => {
    //   for (const item of order.items) {
    //     const shoeRef = tx.collection('shoes').doc(item.shoe.id);
    //     const shoeDoc = await shoeRef.get();
    //     if (!shoeDoc.exists) throw new Error(`Shoe with ID ${item.shoe.id} not found.`);
    //     
    //     const currentStock = shoeDoc.data()?.stock ?? 0;
    //     if (currentStock < item.quantity) {
    //       throw new Error(`Not enough stock for ${item.shoe.name}.`);
    //     }
    //     await shoeRef.update({ stock: currentStock - item.quantity });
    //   }
    // });

    // For now, we will assume the stock check happened on the client
    // and just proceed with sending emails. The stock will be updated
    // via localStorage on the client-side in the success page.


    const adminEmailHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #1a1a1a;">New Order Received!</h1>
        <p><strong>Customer Name:</strong> ${order.customer.name}</p>
        <p><strong>Customer Email:</strong> ${order.customer.email}</p>
        <p><strong>Customer Phone:</strong> ${order.customer.phone}</p>
        <p><strong>Shipping Address:</strong> ${order.customer.address}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <h2 style="color: #1a1a1a;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border-bottom: 2px solid #eee; padding: 10px; text-align: left;">Product</th>
              <th style="border-bottom: 2px solid #eee; padding: 10px; text-align: left;">Customization</th>
              <th style="border-bottom: 2px solid #eee; padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.shoe.name} (x${item.quantity})</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;">
                  Size: ${item.customization.shoeSize}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">BDT ${item.shoe.price.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="text-align: right;"><strong>Subtotal:</strong> BDT ${order.subtotal.toFixed(2)}</p>
        <p style="text-align: right;"><strong>Shipping:</strong> BDT ${order.shipping.toFixed(2)}</p>
        <h3 style="text-align: right; color: #1a1a1a;">Total Due: BDT ${order.total.toFixed(2)}</h3>
        <p style="text-align: right; font-weight: bold; color: #D35400;">Payment Method: Cash on Delivery</p>
      </div>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Order Confirmation - ${order.customer.name}`,
      html: adminEmailHtml,
    });

    // Customer email sending is now disabled.

    return { success: true, message: "Order processed and admin notification sent successfully." };

  } catch (error) {
    console.error("Error processing order:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during email dispatch.";
    return { success: false, message: `Failed to process order. ${errorMessage}` };
  }
}