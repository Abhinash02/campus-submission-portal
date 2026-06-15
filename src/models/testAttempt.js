import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema(
  {
    questionIndex: { type: Number, required: true },
    selectedIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, default: false },
    marksAwarded: { type: Number, default: 0 },
  },
  { _id: false }
);

const TestAttemptSchema = new mongoose.Schema(
  {
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studentName: { type: String, default: '' },
    studentLoginId: { type: String, default: '' },
    testTitle: { type: String, default: '' },
    subject: { type: String, default: '' },
    answers: { type: [AnswerSchema], default: [] },
    marksObtained: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

TestAttemptSchema.index({ testId: 1, studentId: 1 }, { unique: true });

const TestAttempt =
  mongoose.models.TestAttempt || mongoose.model('TestAttempt', TestAttemptSchema);

export default TestAttempt;
