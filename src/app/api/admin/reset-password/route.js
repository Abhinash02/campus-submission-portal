// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const loginId = String(body.loginId || '').trim();
//     const newPassword = String(body.newPassword || '').trim();

//     if (!loginId || !newPassword) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Login ID and new password are required',
//         },
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({ loginId });

//     if (!user) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'User not found',
//         },
//         { status: 404 }
//       );
//     }

//     // ✅ assign plain password, let pre('save') hash it once
//     user.password = newPassword;
//     await user.save();

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Password reset successfully',
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('RESET PASSWORD ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || 'Something went wrong',
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const loginId = String(body.loginId || '').trim();
    const newPassword = String(body.newPassword || '').trim();

    if (!loginId || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Login ID and new password are required',
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ loginId });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('RESET PASSWORD ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Something went wrong',
      },
      { status: 500 }
    );
  }
}