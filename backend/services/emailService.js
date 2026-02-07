const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderConfirmation = async (order) => {
  try {
    // Skip email if API key is not configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      console.log('📧 Email sending skipped - Resend API key not configured');
      console.log('💡 To enable emails, add RESEND_API_KEY to your .env file');
      return { success: true, message: 'Email skipped (no API key)', skipped: true };
    }

    const itemsList = order.items.map(item => 
      `<tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800;">🛍️ Vibe Commerce</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Order Confirmation</p>
            </div>

            <!-- Success Message -->
            <div style="padding: 40px 20px; text-align: center; border-bottom: 2px solid #f1f5f9;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white;">✓</div>
              <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 24px;">Thank You for Your Order!</h2>
              <p style="color: #64748b; margin: 0; font-size: 16px;">We've received your order and will process it shortly.</p>
            </div>

            <!-- Order Details -->
            <div style="padding: 30px 20px;">
              <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Order Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Order Number:</td>
                    <td style="padding: 8px 0; text-align: right; color: #1e293b; font-weight: 600;">${order.orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Customer Name:</td>
                    <td style="padding: 8px 0; text-align: right; color: #1e293b; font-weight: 600;">${order.customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Order Date:</td>
                    <td style="padding: 8px 0; text-align: right; color: #1e293b; font-weight: 600;">${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Status:</td>
                    <td style="padding: 8px 0; text-align: right;">
                      <span style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase;">Confirmed</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Order Items -->
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Order Items</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background: #f1f5f9;">
                    <th style="padding: 12px; text-align: left; color: #475569; font-size: 14px; font-weight: 600;">Product</th>
                    <th style="padding: 12px; text-align: center; color: #475569; font-size: 14px; font-weight: 600;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: #475569; font-size: 14px; font-weight: 600;">Price</th>
                    <th style="padding: 12px; text-align: right; color: #475569; font-size: 14px; font-weight: 600;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList}
                </tbody>
              </table>

              <!-- Order Total -->
              <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 20px; border-radius: 12px; border: 2px solid #93c5fd;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af;">Subtotal:</td>
                    <td style="padding: 8px 0; text-align: right; color: #1e40af; font-weight: 600;">$${order.total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af;">Shipping:</td>
                    <td style="padding: 8px 0; text-align: right; color: #10b981; font-weight: 600;">FREE</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #1e40af;">Tax:</td>
                    <td style="padding: 8px 0; text-align: right; color: #1e40af; font-weight: 600;">$0.00</td>
                  </tr>
                  <tr style="border-top: 2px solid #93c5fd;">
                    <td style="padding: 12px 0 0 0; font-size: 18px; color: #1e293b; font-weight: 700;">Total:</td>
                    <td style="padding: 12px 0 0 0; text-align: right; font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">$${order.total.toFixed(2)}</td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Support Section -->
            <div style="background: #f8fafc; padding: 30px 20px; text-align: center; border-top: 2px solid #e5e7eb;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Need Help?</h3>
              <p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px;">If you have any questions about your order, feel free to contact us.</p>
              <div style="display: inline-flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                <div style="text-align: center;">
                  <div style="color: #3b82f6; font-size: 24px; margin-bottom: 8px;">📧</div>
                  <p style="margin: 0; color: #64748b; font-size: 12px;">Email Support</p>
                  <p style="margin: 4px 0 0 0; color: #1e293b; font-weight: 600; font-size: 14px;">support@vibecommerce.com</p>
                </div>
                <div style="text-align: center;">
                  <div style="color: #3b82f6; font-size: 24px; margin-bottom: 8px;">🔒</div>
                  <p style="margin: 0; color: #64748b; font-size: 12px;">Secure Payment</p>
                  <p style="margin: 4px 0 0 0; color: #1e293b; font-weight: 600; font-size: 14px;">SSL Encrypted</p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px 20px; text-align: center;">
              <p style="color: rgba(255, 255, 255, 0.8); margin: 0 0 10px 0; font-size: 14px;">© 2025 Vibe Commerce. All rights reserved.</p>
              <p style="color: rgba(255, 255, 255, 0.6); margin: 0; font-size: 12px;">This email was sent to ${order.customerEmail}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [order.customerEmail],
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: emailHtml,
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      return { success: false, error: error.message || 'Email delivery failed' };
    }

    console.log('✅ Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error in sendOrderConfirmation:', error.message || error);
    // Don't fail the order if email fails
    return { success: false, error: error.message || 'Email service unavailable', skipped: true };
  }
};

module.exports = {
  sendOrderConfirmation
};
