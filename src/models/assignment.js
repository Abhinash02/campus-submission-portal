import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema(
  {
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherName: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    subject: { type: String, default: '', trim: true },
    description: { type: String, default: '', trim: true },
    openAt: { type: Date, required: true },
    closeAt: { type: Date, required: true },
    course: { type: String, default: '' },
    className: { type: String, default: '' },
    section: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Assignment =
  mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);

export default Assignment;
