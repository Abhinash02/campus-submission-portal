// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     loginId: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ['ADMIN', 'TEACHER', 'STUDENT'],
//       required: true,
//     },
//     email: {
//       type: String,
//       default: '',
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
//     subject: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     createdBy: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// export default mongoose.models.User || mongoose.model('User', userSchema);


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     loginId: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ['ADMIN', 'TEACHER', 'STUDENT'],
//       required: true,
//     },
//     email: {
//       type: String,
//       default: '',
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
//     subject: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     createdBy: {
//       type: String,
//       default: '',
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.comparePassword = async function (plainPassword) {
//   return bcrypt.compare(plainPassword, this.password);
// };

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    loginId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'TEACHER', 'STUDENT'],
      required: true,
    },
    email: {
      type: String,
      default: '',
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
    subject: {
      type: String,
      default: '',
      trim: true,
    },
    createdBy: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(String(this.password), 10);
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(String(plainPassword), this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;