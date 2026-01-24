// models/Question.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  pertanyaan: string;
  pilihan: string[];
  jawaban: string;
  penjelasan?: string;
  category?: string;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    pertanyaan: {
      type: String,
      required: true,
    },
    pilihan: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length === 4,
        message: 'Must have exactly 4 options',
      },
    },
    jawaban: {
      type: String,
      required: true,
    },
    penjelasan: {
      type: String,
    },
    category: {
      type: String,
      default: 'general',
    },
  },
  { timestamps: true },
);

// Hapus model yang sudah ada sebelum membuat yang baru (untuk development)
export const Question = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
