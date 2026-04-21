// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';

// export async function GET() {
//   try {
//     await connectDB();

//     await User.deleteOne({ loginId: 'admin' });

//     const hashedPassword = await bcrypt.hash('123456', 10);

//     const admin = await User.create({
//       name: 'Admin',
//       loginId: 'admin',
//       password: 123456,
//       role: 'ADMIN',
//       email: 'admin@gmail.com',
//     });

//     return NextResponse.json({
//       message: 'Admin created successfully',
//       admin: {
//         id: admin._id,
//         loginId: admin.loginId,
//         role: admin.role,
//       },
//     });
//   } catch (error) {
//     console.error('SEED ADMIN ERROR:', error);
//     return NextResponse.json(
//       { message: 'Failed to seed admin', error: error.message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';

// export async function GET() {
//   try {
//     await connectDB();
    
//     console.log('🗑️  Deleting existing admin...');
//     await User.deleteOne({ loginId: 'admin' });
    
//     console.log('🔐 Hashing password...');
//     const hashedPassword = await bcrypt.hash('123456', 10);
//     console.log('✅ Hashed password ready:', hashedPassword.substring(0, 20) + '...');
    
//     const admin = await User.create({
//       name: 'Admin',
//       loginId: 'admin',
//       password: hashedPassword,  // ✅ Pre-hashed!
//       role: 'ADMIN',
//       email: 'admin@gmail.com',
//     });

//     console.log('✅ Admin created:', admin.loginId);
    
//     return NextResponse.json({
//       message: 'Admin created successfully',
//       admin: {
//         id: admin._id,
//         loginId: admin.loginId,
//         role: admin.role,
//         passwordPreview: admin.password.substring(0, 20) + '...'  // For debugging
//       },
//     });
//   } catch (error) {
//     console.error('SEED ADMIN ERROR:', error);
//     return NextResponse.json(
//       { message: 'Failed to seed admin', error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/mongodb/db';
import User from '@/models/user';

export async function GET() {
  try {
    await connectDB();

    console.log('DB NAME:', mongoose.connection.name);
    console.log('DB HOST:', mongoose.connection.host);

    const before = await User.find({ loginId: 'admin' }).select('+password').lean();
    console.log('ADMINS BEFORE DELETE:', before);

    const delResult = await User.deleteMany({ loginId: 'admin' });
    console.log('DELETE RESULT:', delResult);

    const admin = await User.create({
      name: 'Admin',
      loginId: 'admin',
      password: '123456',
      role: 'ADMIN',
      email: 'admin@gmail.com',
    });

    const after = await User.find({ loginId: 'admin' }).select('+password').lean();
    console.log('ADMINS AFTER CREATE:', after);

    return NextResponse.json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        loginId: admin.loginId,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('SEED ADMIN ERROR:', error);
    return NextResponse.json(
      { message: 'Failed to seed admin', error: error.message },
      { status: 500 }
    );
  }
}