import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Contact from '@/lib/models/Contact';
import { contactSchema } from '@/lib/validations';
import { sendDispatchAlert } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // VALIDATE INTAKE
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        message: 'Validation Error: Invalid Data Format.',
        errors: result.error.issues.map(e => e.message)
      }, { status: 400 });
    }

    const contact = await Contact.create(result.data);

    // DISPATCH TO ADMIN INBOX
    await sendDispatchAlert('INQUIRY', result.data);

    return NextResponse.json({ message: 'Project inquiry received. Our team will review your request shortly.' }, { status: 201 });
  } catch (error: any) {
    console.error('CONTACT_ERROR:', error);
    return NextResponse.json({ message: 'Operational Interruption. Please try again later.' }, { status: 500 });
  }
}
