// scripts/seed-db.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in environment variables");
  process.exit(1);
}

// Define schemas
const QuestionSchema = new mongoose.Schema(
  {
    pertanyaan: { type: String, required: true },
    pilihan: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length === 4,
        message: "Must have exactly 4 options",
      },
    },
    jawaban: { type: String, required: true },
    penjelasan: { type: String },
    category: { type: String, default: "general" },
  },
  { timestamps: true }
);

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);

const SubmissionSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    email: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: [
      {
        pertanyaan: String,
        userAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const questions = [
  {
    pertanyaan: 'What is the opposite of "hot"?',
    pilihan: ["Cold", "Warm", "Heat", "Temperature"],
    jawaban: "Cold",
    penjelasan:
      'The opposite of "hot" is "cold" (adjective describing low temperature).',
    category: "vocabulary",
  },
  {
    pertanyaan: "Which sentence is grammatically correct?",
    pilihan: [
      "She go to school every day",
      "She goes to school every day",
      "She going to school every day",
      "She gone to school every day",
    ],
    jawaban: "She goes to school every day",
    penjelasan:
      'In present tense with third person singular (she), we add "s" to the verb.',
    category: "grammar",
  },
  {
    pertanyaan: 'What does "procrastinate" mean?',
    pilihan: [
      "To work hard",
      "To postpone or delay something",
      "To complete a task",
      "To make a decision quickly",
    ],
    jawaban: "To postpone or delay something",
    penjelasan:
      '"Procrastinate" means to delay or postpone something unnecessarily.',
    category: "vocabulary",
  },
  {
    pertanyaan: 'Which word is a synonym for "happy"?',
    pilihan: ["Sad", "Joyful", "Angry", "Tired"],
    jawaban: "Joyful",
    penjelasan: '"Joyful" is a synonym (similar meaning) to "happy".',
    category: "vocabulary",
  },
  {
    pertanyaan: 'Correct the sentence: "She don\'t like pizza"',
    pilihan: [
      "She do not like pizza",
      "She does not like pizza",
      "She don't not like pizza",
      "She did not like pizza",
    ],
    jawaban: "She does not like pizza",
    penjelasan:
      'With third person singular (she), use "does not" instead of "do not".',
    category: "grammar",
  },
  {
    pertanyaan: 'What is the past tense of "run"?',
    pilihan: ["Runs", "Ran", "Running", "Runned"],
    jawaban: "Ran",
    penjelasan: '"Ran" is the past tense of the irregular verb "run".',
    category: "grammar",
  },
  {
    pertanyaan: "Which is the correct spelling?",
    pilihan: ["Occured", "Occurred", "Ocured", "Occured"],
    jawaban: "Occurred",
    penjelasan:
      '"Occurred" is the correct spelling (doubled consonant before suffix).',
    category: "spelling",
  },
  {
    pertanyaan: 'What does "albeit" mean?',
    pilihan: [
      "Also known as",
      "Although, even though",
      "A type of food",
      "Before that",
    ],
    jawaban: "Although, even though",
    penjelasan:
      '"Albeit" is a formal word meaning "although" or "even though".',
    category: "vocabulary",
  },
  {
    pertanyaan: "Which sentence uses the correct word order?",
    pilihan: [
      "I yesterday went to the store",
      "Yesterday I went to the store",
      "I went yesterday to the store",
      "Went I yesterday to the store",
    ],
    jawaban: "Yesterday I went to the store",
    penjelasan:
      "In English, adverbs of time usually come at the beginning or end of the sentence.",
    category: "grammar",
  },
  {
    pertanyaan: 'What is a "metaphor"?',
    pilihan: [
      'A direct comparison using "like" or "as"',
      'An indirect comparison without "like" or "as"',
      "A word that imitates a sound",
      "An exaggeration for effect",
    ],
    jawaban: 'An indirect comparison without "like" or "as"',
    penjelasan:
      'A metaphor compares two things directly without using "like" or "as".',
    category: "vocabulary",
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get or create models
    const Question =
      mongoose.models.Question || mongoose.model("Question", QuestionSchema);
    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
    const Submission =
      mongoose.models.Submission ||
      mongoose.model("Submission", SubmissionSchema);

    // Clear existing data
    await Question.deleteMany({});
    await Admin.deleteMany({});
    await Submission.deleteMany({});
    console.log("🗑️  Cleared existing collections");

    // Insert questions
    const insertedQuestions = await Question.insertMany(questions);
    console.log(`✅ Inserted ${insertedQuestions.length} questions`);

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await Admin.create({
      email: "admin@example.com",
      password: hashedPassword,
      name: "Administrator",
    });
    console.log(`✅ Created admin user: ${admin.email}`);

    console.log("\n✨ Database seeding completed successfully!\n");
    console.log("📝 Login credentials:");
    console.log("   Email: admin@example.com");
    console.log("   Password: admin123\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    if (error.code === "ENOTFOUND") {
      console.error(
        "💡 Make sure MongoDB is running and MONGODB_URI is correct"
      );
    }
    process.exit(1);
  }
}

seedDatabase();
