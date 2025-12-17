import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email, name, message } = await request.json();
    
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact from ${name}`,
      html: `
        <h1>New Message</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}