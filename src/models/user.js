// import mongoose from 'mongoose'
// import User from '@/models/user';
// import Assignment from '@/models/submission';

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
//   name: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// })

// export default mongoose.models.User || mongoose.model('User', userSchema)


// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema(
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
//     subject: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model('User', UserSchema);


// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema(
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
//       default: 'ADMIN',
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model('User', UserSchema);


// import mongoose from 'mongoose';

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
//       required: true,
//       enum: ['ADMIN', 'TEACHER', 'STUDENT'],
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
//       default: 'ADMIN',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.User || mongoose.model('User', userSchema);

// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';

// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     await connectDB();

//     const users = await User.find().sort({ createdAt: -1 });

//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.error('GET USERS ERROR:', error);
//     return NextResponse.json(
//       { message: 'Failed to fetch users', error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const existingUser = await User.findOne({ loginId: body.loginId });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: 'Login ID already exists' },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(String(body.password).trim(), 10);

//     const user = await User.create({
//       name: body.name,
//       loginId: body.loginId,
//       password: hashedPassword,
//       role: body.role,
//       email: body.email || '',
//       course: body.course || '',
//       className: body.className || '',
//       section: body.section || '',
//       subject: body.subject || '',
//       createdBy: body.createdBy || 'ADMIN',
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'User created successfully',
//         user,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('CREATE USER ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to create user',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//     },
//     loginId: {
//       type: String,
//       required: [true, 'Login ID is required'],
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       trim: true,
//     },
//     role: {
//       type: String,
//       required: [true, 'Role is required'],
//       enum: ['ADMIN', 'TEACHER', 'STUDENT'],
//       trim: true,
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
//       default: 'ADMIN',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function () {
//   if (!this.isModified('password')) return;
//   this.password = await bcrypt.hash(this.password, 10);
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;



// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//     },
//     loginId: {
//       type: String,
//       required: [true, 'Login ID is required'],
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       trim: true,
//     },
//     role: {
//       type: String,
//       required: [true, 'Role is required'],
//       enum: ['ADMIN', 'TEACHER', 'STUDENT'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       default: '',
//       trim: true,
//     },
//     createdBy: {
//       type: String,
//       default: 'ADMIN',
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;


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
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

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
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;