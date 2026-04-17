import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentLoginId: {
      type: String,
      required: true,
      trim: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    teacherName: {
      type: String,
      default: '',
      trim: true,
    },
    teacherLoginId: {
      type: String,
      default: '',
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    fileName: {
      type: String,
      default: '',
      trim: true,
    },
    fileUrl: {
      type: String,
      default: '',
      trim: true,
    },
    className: {
      type: String,
      default: '',
      trim: true,
    },
    courseName: {
      type: String,
      default: 'Not Specified',
      trim: true,
    },
    section: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Checked'],
      default: 'Submitted',
    },
    marks: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    feedback: {
      type: String,
      default: '',
      trim: true,
    },
    reviewedBy: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

const Submission =
  mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);

export default Submission;