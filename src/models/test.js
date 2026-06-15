import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    options: [{ type: String, required: true, trim: true }],
    correctIndex: { type: Number, required: true, min: 0 },
    marks: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const TestSchema = new mongoose.Schema(
  {
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherName: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    subject: { type: String, default: '', trim: true },
    questions: { type: [QuestionSchema], default: [] },
    totalMarks: { type: Number, default: 0 },
    openAt: { type: Date, required: true },
    closeAt: { type: Date, required: true },
    course: { type: String, default: '' },
    className: { type: String, default: '' },
    section: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);

export default Test;
