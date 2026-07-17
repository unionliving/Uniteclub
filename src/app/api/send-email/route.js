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
      subject: 'Something Exciting Awaits.',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 40px; border-radius: 8px;">
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            Heyy!<br/>
            Thank you for your interest in becoming a Unite Member.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            We've successfully received your membership request. Our team will review your application and get in touch with you shortly regarding the next steps.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 8px;">
            As a Unite Member, you'll enjoy access to:
          </p>
          <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px; padding-left: 24px;">
            <li>Curated members-only experiences</li>
            <li>Creative workshops and cultural events</li>
            <li>Wellness and lifestyle experiences</li>
            <li>Exclusive partner offers and rewards</li>
            <li>Experiences across Mumbai, Pune, Gurugram, Ahmedabad, and future Unite cities</li>
          </ul>
          
          <h3 style="color: #1a1a1a; font-size: 18px; margin-bottom: 12px; margin-top: 32px;">Already a Union Resident?</h3>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            If you're currently residing at a Union property, your Unite Membership is complimentary.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 8px;">
            Simply reply to this email with the following details:
          </p>
          <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px; padding-left: 24px;">
            <li>Full Name</li>
            <li>Mobile Number</li>
            <li>Union Property Name</li>
          </ul>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            Our team will verify your residency and confirm your membership at the earliest.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            If you have any questions, feel free to reply to this email. We're always happy to help.<br/>
            We look forward to welcoming you to the Unite community.
          </p>
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.5; margin-bottom: 4px;">
            Warm regards,
          </p>
          <p style="color: #1a1a1a; font-size: 16px; font-weight: bold; margin-top: 0;">
            Team Unite
          </p>
          <div style="text-align: left; margin-bottom: 32px;">
            <img src="https://www.uniteclub.in/Unite-logo.png" alt="Unite Logo" style="height: 60px; width: auto;" />
          </div>
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
