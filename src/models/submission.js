// // import mongoose from 'mongoose'

// // const submissionSchema = new mongoose.Schema({
// //   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
// //   teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
// //   description: { type: String, required: true },
// //   fileUrl: { type: String },
// //   marks: { type: Number },
// //   status: { type: String, enum: ['PENDING', 'REVIEWED'], default: 'PENDING' },
// //   feedback: { type: String },
// //   createdAt: { type: Date, default: Date.now }
// // })

// // export default mongoose.models.Submission || mongoose.model('Submission', submissionSchema)



// import mongoose from 'mongoose';

// const SubmissionSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: '',
//     },
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     teacherId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['PENDING', 'SUBMITTED', 'REVIEWED'],
//       default: 'PENDING',
//     },
//     marks: {
//       type: Number,
//       default: 0,
//     },
//     submissionText: {
//       type: String,
//       default: '',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Submission ||
//   mongoose.model('Submission', SubmissionSchema);


// import mongoose from 'mongoose';

// const SubmissionSchema = new mongoose.Schema(
  
//   {
//     className: {
//   type: String,
//   required: true,
//   trim: true
// },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     fileLink: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     fileName: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     studentName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     studentLoginId: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     status: {
//       type: String,
//       enum: ['Submitted', 'Under Review', 'Checked'],
//       default: 'Submitted',
//     },
//     marks: {
//       type: Number,
//       default: 0,
//     },
//     feedback: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     reviewedBy: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Submission ||
//   mongoose.model('Submission', SubmissionSchema);


// import mongoose from 'mongoose';

// const submissionSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, 'Title is required'],
//     trim: true
//   },
//   subject: {
//     type: String,
//     required: [true, 'Subject is required'],
//     trim: true
//   },
//   description: {
//     type: String,
//     default: ''
//   },
//   fileLink: {
//     type: String,
//     default: ''
//   },
//   fileName: {
//     type: String,
//     default: ''
//   },
//   studentName: {
//     type: String,
//     required: [true, 'Student name is required'],
//     trim: true
//   },
//   studentLoginId: {
//     type: String,
//     required: [true, 'Student login ID is required'],
//     trim: true
//   },
//   // ✅ FIXED: Optional with meaningful defaults for teacher
//   className: {
//     type: String,
//     default: 'Not Specified'
//   },
//   courseName: {
//     type: String,
//     default: 'Not Specified'
//   },
//   status: {
//     type: String,
//     enum: ['Submitted', 'Under Review', 'Checked'],
//     default: 'Submitted'
//   },
//   marks: {
//     type: Number,
//     default: 0
//   },
//   feedback: {
//     type: String,
//     default: ''
//   },
//   reviewedBy: {
//     type: String,
//     default: ''
//   }
// }, {
//   timestamps: true
// });

// export default mongoose.models.Submission || mongoose.model('Submission', submissionSchema);





// import mongoose from 'mongoose';

// const submissionSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Title is required'],
//       trim: true,
//     },
//     subject: {
//       type: String,
//       required: [true, 'Subject is required'],
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: '',
//     },
//     fileLink: {
//       type: String,
//       default: '',
//     },
//     fileName: {
//       type: String,
//       default: '',
//     },
//     studentName: {
//       type: String,
//       required: [true, 'Student name is required'],
//       trim: true,
//     },
//     studentLoginId: {
//       type: String,
//       required: [true, 'Student login ID is required'],
//       trim: true,
//     },

//     teacherName: {
//       type: String,
//       required: [true, 'Teacher name is required'],
//       trim: true,
//     },
//     teacherLoginId: {
//       type: String,
//       required: [true, 'Teacher login ID is required'],
//       trim: true,
//     },

//     className: {
//       type: String,
//       default: 'Not Specified',
//     },
//     courseName: {
//       type: String,
//       default: 'Not Specified',
//     },
//     status: {
//       type: String,
//       enum: ['Submitted', 'Under Review', 'Checked'],
//       default: 'Submitted',
//     },
//     marks: {
//       type: Number,
//       default: 0,
//     },
//     feedback: {
//       type: String,
//       default: '',
//     },
//     reviewedBy: {
//       type: String,
//       default: '',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.models.Submission ||
//   mongoose.model('Submission', submissionSchema);


// import mongoose from 'mongoose';

// const submissionSchema = new mongoose.Schema(
//   {
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     studentName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     studentLoginId: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     teacherId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     teacherName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     teacherLoginId: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     fileUrl: {
//       type: String,
//       default: '',
//     },
//     fileName: {
//       type: String,
//       default: '',
//     },

//     className: {
//       type: String,
//       default: 'Not Specified',
//       trim: true,
//     },
//     courseName: {
//       type: String,
//       default: 'Not Specified',
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: ['Submitted', 'Under Review', 'Checked'],
//       default: 'Submitted',
//     },

//     marks: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 100,
//     },
//     feedback: {
//       type: String,
//       default: '',
//     },
//     reviewedBy: {
//       type: String,
//       default: '',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Submission ||
//   mongoose.model('Submission', submissionSchema);


// import mongoose from 'mongoose';

// const submissionSchema = new mongoose.Schema(
//   {
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     studentName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     studentLoginId: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     teacherId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     teacherName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     teacherLoginId: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     fileUrl: {
//       type: String,
//       default: '',
//     },
//     fileName: {
//       type: String,
//       default: '',
//     },
//     className: {
//       type: String,
//       default: 'Not Specified',
//       trim: true,
//     },
//     courseName: {
//       type: String,
//       default: 'Not Specified',
//       trim: true,
//     },
//     status: {
//       type: String,
//       enum: ['Submitted', 'Under Review', 'Checked'],
//       default: 'Submitted',
//     },
//     marks: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 100,
//     },
//     feedback: {
//       type: String,
//       default: '',
//     },
//     reviewedBy: {
//       type: String,
//       default: '',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Submission ||
//   mongoose.model('Submission', submissionSchema);


// import mongoose from 'mongoose';

// const submissionSchema = new mongoose.Schema(
//   {
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     studentName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     studentLoginId: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     teacherId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     teacherName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     teacherLoginId: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
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
//     fileUrl: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     fileName: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     status: {
//       type: String,
//       enum: ['Submitted', 'Under Review', 'Checked'],
//       default: 'Submitted',
//     },
//     marks: {
//       type: Number,
//       default: 0,
//     },
//     feedback: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     reviewedBy: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Submission ||
//   mongoose.model('Submission', submissionSchema);


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
    // fileUrl: {
    //   type: String,
    //   default: '',
    //   trim: true,
    // },
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

export default mongoose.models.Submission ||
  mongoose.model('Submission', SubmissionSchema);