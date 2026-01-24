import { connectDB } from '@/lib/db';
import { Submission } from '@/models/Submission';
import { Question } from '@/models/Question';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { studentName, answers, timeSpent } = await request.json();

    if (!studentName || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const questions = await Question.find();
    let score = 0;

    answers.forEach((answer: string | null, index: number) => {
      if (answer === questions[index]?.jawaban) {
        score++;
      }
    });

    const submission = new Submission({
      studentName,
      answers,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      timeSpent,
      submittedAt: new Date(),
    });

    await submission.save();

    return NextResponse.json(
      {
        message: 'Submission saved successfully',
        submission: {
          id: submission._id,
          studentName: submission.studentName,
          score: submission.score,
          totalQuestions: submission.totalQuestions,
          percentage: submission.percentage,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

export async function GET() {
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
