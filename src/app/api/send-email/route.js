import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Uniteclub <headofmarketing@unionliving.in>', 
      to: [email],
      subject: 'Welcome to Uniteclub!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 40px; border-radius: 8px;">
          <h1 style="color: #1a1a1a; margin-bottom: 24px;">You're on the list!</h1>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            Hi there,
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            Thank you for requesting an annual membership with Uniteclub! We have received your request and our team is currently reviewing it.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            We'll be in touch soon with the next steps. Get ready for a year of unforgettable experiences, creative workshops, and exclusive rewards.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 8px;">
            Best,
          </p>
          <p style="color: #1a1a1a; font-size: 16px; font-weight: bold; margin-top: 0;">
            The Uniteclub Team
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
