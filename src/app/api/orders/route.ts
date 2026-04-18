import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import { orderSchema } from '@/lib/validations';
import { verifyAuth } from '@/lib/auth-middleware';
import { sendDispatchAlert } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // IDENTITY VERIFICATION
    const auth = await verifyAuth(req);
    let userId = null;
    let userData = null;

    if (auth.authenticated) {
      userId = auth.id;
      userData = await User.findById(userId).select('name email');
    }

    // VALIDATE OPERATIONAL DATA
    const result = orderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        message: 'Validation Error: Invalid Specifications.',
        errors: result.error.issues.map(e => e.message)
      }, { status: 400 });
    }

    // OPTIMIZE DATA FOR STORAGE (Avoid 16MB MongoDB BSON Limit)
    const { files, ...otherData } = result.data;
    const dbFiles = files?.map((f: any) => ({ filename: f.filename })) || [];

    const order = await Order.create({
      user: userId,
      ...otherData,
      files: dbFiles
    });



    // DISPATCH TO ADMIN INBOX WITH FULL ATTACHMENTS
    const dispatch = await sendDispatchAlert('ORDER', {
      ...result.data,
      user: userData
    });

    if (!dispatch.success) {
      console.error('CRITICAL: Dispatch Failed but data saved:', dispatch.error);
      return NextResponse.json({ 
        message: 'Order recorded in system, but email notification failed. Our team will contact you.',
        warning: 'Dispatch Failure'
      }, { status: 201 }); // Still 201 because DB saved, but with warning
    }

    return NextResponse.json({ message: 'Order request submitted successfully. Our engineering team will review your details shortly.' }, { status: 201 });
  } catch (error: any) {
    console.error('ORDER_ERROR:', error);
    return NextResponse.json({ message: 'Operational Interruption. Please try again later.' }, { status: 500 });
  }
}
