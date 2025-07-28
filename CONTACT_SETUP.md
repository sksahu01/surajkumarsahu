# Contact Form Email Setup

This contact form is configured to send emails to `surajsahu96685@gmail.com` using Gmail SMTP.

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
EMAIL_USER=surajsahu96685@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 2. Get Gmail App Password

To send emails through Gmail, you need to create an App Password:

1. **Enable 2-Factor Authentication**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**:
   - Go to Security > 2-Step Verification > App passwords
   - Select "Mail" as the app
   - Generate a 16-character password
   - Use this password in your `.env.local` file (remove spaces)

3. **Update .env.local**:
   ```env
   EMAIL_USER=surajsahu96685@gmail.com
   EMAIL_PASS=abcdefghijklmnop
   ```

### 3. Test the Contact Form

1. Start the development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check the Gmail inbox for the received message

## Email Template Features

- **Professional HTML email template** with purple branding
- **Responsive design** that works on all devices
- **Reply-to functionality** - replies go directly to the sender
- **Form validation** with proper error handling
- **Loading states** during email sending

## Deployment Notes

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables to your deployment platform
2. Use the same `EMAIL_USER` and `EMAIL_PASS` values
3. The API route will automatically work in production

## Security Features

- Server-side email sending (credentials not exposed to client)
- Input validation and sanitization
- Rate limiting (can be added if needed)
- Proper error handling

## Troubleshooting

If emails aren't sending:

1. **Check Gmail App Password**: Make sure it's correct and 2FA is enabled
2. **Check Environment Variables**: Ensure `.env.local` is properly configured
3. **Check Console**: Look for error messages in browser/server console
4. **Test Gmail Login**: Try logging into Gmail with the same credentials

## Alternative Email Services

The code can be easily modified to use other email services:

- **SendGrid**: Replace nodemailer configuration
- **Mailgun**: Update transporter settings
- **AWS SES**: Configure AWS credentials
- **Resend**: Modern email API alternative
