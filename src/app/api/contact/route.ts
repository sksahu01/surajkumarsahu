import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { CONTACT_INFO } from '@/lib/constants';

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER || 'your-email@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'your-app-password';
const TO_EMAIL = CONTACT_INFO.email;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        // Email template
        const htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>New Contact Form Message</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #8e44ad, #9b59b6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                    .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #8e44ad; }
                    .value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #8e44ad; }
                    .message-box { background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>New Contact Form Message</h2>
                        <p>You have received a new message from your portfolio website.</p>
                    </div>
                    
                    <div class="content">
                        <div class="field">
                            <div class="label">From:</div>
                            <div class="value">${name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value">${email}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Subject:</div>
                            <div class="value">${subject}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>This message was sent from your portfolio contact form.</p>
                        <p>Reply directly to this email to respond to ${name}.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send email
        const mailOptions = {
            from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
            to: TO_EMAIL,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: htmlTemplate,
            text: `
New Contact Form Message

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
