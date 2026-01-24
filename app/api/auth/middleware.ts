import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyAdminToken(request: NextRequest): { valid: boolean; adminId?: string } {
  const token = request.cookies.get('adminToken')?.value;

  if (!token) {
    return { valid: false };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { adminId: string };
    return { valid: true, adminId: decoded.adminId };
  } catch (error) {
    return { valid: false };
  }
}

export function createUnauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}
