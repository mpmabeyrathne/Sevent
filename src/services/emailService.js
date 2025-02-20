// services/emailService.js
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Configure your email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Generates a QR code for a ticket
 * @param {Object} ticketData - Data to encode in QR code
 * @returns {Promise<string>} - Path to generated QR code image
 */
const generateTicketQR = async (ticketData) => {
  try {
    // Create directory if it doesn't exist
    const qrDir = path.join(__dirname, '../public/qrcodes');
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // Generate unique filename
    const fileName = `ticket_${ticketData.bookingId}_${Date.now()}.png`;
    const filePath = path.join(qrDir, fileName);

    // Convert ticket data to JSON string
    const qrData = JSON.stringify({
      eventName: ticketData.eventName,
      ticketCount: ticketData.ticketCount,
      bookingId: ticketData.bookingId,
      userId: ticketData.userId,
    });

    // Generate QR code
    await QRCode.toFile(filePath, qrData, {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 8,
    });

    return filePath;
  } catch (error) {
    console.error('QR generation error:', error);
    throw new Error('Failed to generate QR code');
  }
};

/**
 * Sends ticket confirmation email with QR code
 * @param {Object} options - Email options
 * @returns {Promise<boolean>} - True if email sent successfully
 */
const sendTicketEmail = async (options) => {
  try {
    const {
      userEmail,
      userName,
      eventName,
      ticketCount,
      bookingId,
      userId,
      eventDate,
      eventLocation,
    } = options;

    // Generate QR code
    const qrCodePath = await generateTicketQR({
      eventName,
      ticketCount,
      bookingId,
      userId,
    });

    // Prepare email
    const mailOptions = {
      from: `"Event Tickets" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Your Tickets for ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2c3e50; text-align: center;">Ticket Confirmation</h2>
          <p>Hello ${userName},</p>
          <p>Thank you for booking tickets for <strong>${eventName}</strong>.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2980b9;">Booking Details:</h3>
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Number of Tickets:</strong> ${ticketCount}</p>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Event Date:</strong> ${eventDate}</p>
            <p><strong>Location:</strong> ${eventLocation}</p>
          </div>
          
          <p>Please present the QR code below at the event entrance:</p>
          <div style="text-align: center; margin: 25px 0;">
            <img src="cid:ticketQR" alt="Ticket QR Code" style="max-width: 250px; height: auto;">
          </div>
          
          <p style="font-size: 14px; color: #7f8c8d; text-align: center; margin-top: 30px;">
            This is an automated email. Please do not reply.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'ticket-qr.png',
          path: qrCodePath,
          cid: 'ticketQR', // Same as in the image tag above
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    // Delete temporary QR file after sending
    fs.unlinkSync(qrCodePath);

    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = {
  sendTicketEmail,
};
