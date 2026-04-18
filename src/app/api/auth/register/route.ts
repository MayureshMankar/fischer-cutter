import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { registerSchema } from '@/lib/validations';

const JWT_SECRET = process.env.JWT_SECRET!;

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const body = await req.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        message: 'Invalid Data Format.', 
        errors: result.error.issues.map(e => e.message) 
      }, { status: 400 });
    }

    const { name, email, phone, password, termsAndConditions } = result.data;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: 'Email address already registered.' }, { status: 400 });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      termsAndConditions,
      role: 'user'
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '30d',
    });

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ 
      message: 'System Error.', 
      error: error.message 
    }, { status: 500 });
  }
};
