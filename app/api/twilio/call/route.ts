import { NextRequest, NextResponse } from 'next/server'

// You need to install twilio: pnpm add twilio
// Then add these to your .env.local file:
// TWILIO_ACCOUNT_SID=your_account_sid
// TWILIO_AUTH_TOKEN=your_auth_token
// TWILIO_PHONE_NUMBER=your_twilio_phone_number

export async function POST(request: NextRequest) {
  try {
    const { to } = await request.json()

    // Validate phone number
    if (!to) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    const twilio = require('twilio')
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )

    const call = await client.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER
    })

    return NextResponse.json({ 
      success: true, 
      callSid: call.sid,
      message: 'Call initiated successfully' 
    })

  } catch (error) {
    console.error('Twilio API error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    )
  }
}
