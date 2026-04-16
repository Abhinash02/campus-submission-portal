// import mongoose from 'mongoose'

// const teacherSchema = new mongoose.Schema({
//   className: {
//   type: String,
//   required: true,
//   trim: true
// },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   teacherName: { type: String, required: true },
//   subject: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// })

// export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema)


// import mongoose from 'mongoose';

// const teacherSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     teacherName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     course: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     className: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     section: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);




import mongoose from 'mongoose';


const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      default: '',
      trim: true,
    },
    className: {
      type: String,
      default: '',
      trim: true,
    },
    section: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);