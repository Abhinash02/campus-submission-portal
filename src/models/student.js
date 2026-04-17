// import mongoose from 'mongoose';

// const studentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     studentName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     rollNumber: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     course: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     className: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     section: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Student || mongoose.model('Student', studentSchema);



import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    // rollNumber: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    course: {
      type: String,
      default: '',
      trim: true,
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Student || mongoose.model('Student', studentSchema);