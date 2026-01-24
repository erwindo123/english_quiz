import { connectDB } from '@/lib/db';
import { Submission } from '@/models/Submission';
import { verifyAdminToken, createUnauthorizedResponse } from '@/app/api/auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  const auth = verifyAdminToken(request);
  if (!auth.valid) {
    return createUnauthorizedResponse();
  }

  try {
    await connectDB();

    const submissions = await Submission.find()
      .sort({ submittedAt: -1 })
      .select('-answers -__v');

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
