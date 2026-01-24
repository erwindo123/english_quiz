// app/api/questions/route.ts
import { connectDB } from '@/lib/db';
import { Question } from '@/models/Question';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const questions = await Question.find().select('-__v').lean();

    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: 'No questions found', message: 'Database might be empty' }, { status: 404 });
    }

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching questions:', error);

    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const question = await Question.create(body);

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating question:', error);
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
