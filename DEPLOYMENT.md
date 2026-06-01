# Deployment & Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)
- M-Pesa developer account

## Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/franklinemose19-alt/comrade-hustle.git
cd comrade-hustle
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# M-Pesa (Daraja API)
NEXT_PUBLIC_MPESA_CONSUMER_KEY=your_consumer_key
NEXT_PUBLIC_MPESA_CONSUMER_SECRET=your_consumer_secret
NEXT_PUBLIC_MPESA_SHORTCODE=your_shortcode
NEXT_PUBLIC_MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ComradeHustle
NODE_ENV=development
```

### 4. Database Setup

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. In the SQL Editor, run all SQL commands from `SUPABASE_SCHEMA.md`
4. Copy your API URL and keys to `.env.local`

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings

### 3. Add Environment Variables
In Vercel project settings → Environment Variables, add all from `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_MPESA_CONSUMER_KEY
NEXT_PUBLIC_MPESA_CONSUMER_SECRET
NEXT_PUBLIC_MPESA_SHORTCODE
NEXT_PUBLIC_MPESA_PASSKEY
MPESA_CALLBACK_URL
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_APP_NAME
```

### 4. Deploy
Click "Deploy" - Vercel will automatically build and deploy your app.

## M-Pesa Integration

### Setup Daraja API

1. Register at [M-Pesa Daraja](https://developer.safaricom.co.ke)
2. Create an app and get:
   - Consumer Key
   - Consumer Secret
   - Shortcode
   - Passkey
3. Add to environment variables

### Implement STK Push

```typescript
// Example: src/lib/mpesa.ts
export const initiateMPesaSTK = async (phoneNumber: string, amount: number, reference: string) => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
  const password = Buffer.from(
    `${process.env.NEXT_PUBLIC_MPESA_SHORTCODE}${process.env.NEXT_PUBLIC_MPESA_PASSKEY}${timestamp}`
  ).toString('base64')

  const response = await fetch('https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await getMPesaToken()}`,
    },
    body: JSON.stringify({
      BusinessShortCode: process.env.NEXT_PUBLIC_MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: process.env.NEXT_PUBLIC_MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: reference,
      TransactionDesc: 'ComradeHustle Payment',
    }),
  })

  return response.json()
}
```

## Build & Testing

### Build Production Bundle
```bash
npm run build
```

### Run Production Server Locally
```bash
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Supabase Connection Issues
- Verify API URL and keys in `.env.local`
- Check network connectivity
- Ensure Supabase project is active

### M-Pesa Payment Failing
- Verify Daraja API credentials
- Check M-Pesa account balance
- Ensure phone number format is correct (2547XXXXXXXX)
- Check callback URL is publicly accessible

## Monitoring & Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Supabase Monitoring**: Real-time database analytics
- **Error Tracking**: Integrate Sentry or LogRocket for production errors

## Next Steps

1. **Real-time Features**: Implement Supabase Realtime for chat and notifications
2. **Image Storage**: Set up Supabase Storage for product images
3. **Email Notifications**: Integrate SendGrid or Resend for email alerts
4. **Advanced Analytics**: Add Mixpanel or Segment for user behavior tracking
5. **AI Features**: Implement Claude API for smart job/product recommendations

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/franklinemose19-alt/comrade-hustle/issues)
- Email: support@comradehustle.com