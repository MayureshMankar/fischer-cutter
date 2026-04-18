import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyAuth = async (req: Request) => {
  try {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { authenticated: false, error: 'Authorization token missing' };
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);

    return { 
      authenticated: true, 
      id: decoded.id, 
      role: decoded.role 
    };
  } catch (error) {
    return { authenticated: false, error: 'Invalid or expired token' };
  }
};
