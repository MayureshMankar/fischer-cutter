import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { loginSchema } from '@/lib/validations';

const JWT_SECRET = process.env.JWT_SECRET!;

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const body = await req.json();

    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ 
        message: 'Invalid Data Format.', 
        errors: result.error.issues.map(e => e.message) 
      }, { status: 400 });
    }

    const { email, password } = result.data;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: '30d',
      });

      return NextResponse.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      });
    } else {
      return NextResponse.json({ message: 'Access Denied: Invalid Account Credentials.' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal System Error.' }, { status: 500 });
  }
};
