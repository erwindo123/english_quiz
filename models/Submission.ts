import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  studentName: string;
  answers: (string | null)[];
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  submittedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    studentName: {
      type: String,
      required: true,
    },
    answers: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    timeSpent: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Submission = mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
