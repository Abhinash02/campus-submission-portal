

// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';

// // export async function POST(req) {
// //   try {
// //     await connectDB();

// //     const body = await req.json();
// //     const loginId = String(body.loginId || '').trim();
// //     const password = String(body.password || '').trim();

// //     if (!loginId || !password) {
// //       return NextResponse.json(
// //         { success: false, message: 'Login ID and password are required' },
// //         { status: 400 }
// //       );
// //     }

// //     const user = await User.findOne({ loginId });

// //     if (!user) {
// //       return NextResponse.json(
// //         { success: false, message: 'Invalid credentials' },
// //         { status: 401 }
// //       );
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return NextResponse.json(
// //         { success: false, message: 'Invalid credentials' },
// //         { status: 401 }
// //       );
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         loginId: user.loginId,
// //         role: user.role,
// //         className: user.className || '',
// //         section: user.section || '',
// //       },
// //     });
// //   } catch (error) {
// //     return NextResponse.json(
// //       { success: false, message: 'Server error during login' },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const loginId = String(body.loginId || '').trim();
//     const password = String(body.password || '').trim();

//     if (!loginId || !password) {
//       return NextResponse.json(
//         { success: false, message: 'Login ID and password are required' },
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({ loginId });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         loginId: user.loginId,
//         role: user.role,
//         email: user.email || '',
//         course: user.course || '',
//         className: user.className || '',
//         section: user.section || '',
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Server error during login' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/mongodb/db';
import User from '@/models/user';
import Teacher from '@/models/teacher';
import Student from '@/models/student';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const loginId = String(body.loginId || '').trim();
    const password = String(body.password || '').trim();

    if (!loginId || !password) {
      return NextResponse.json(
        { success: false, message: 'Login ID and password are required' },
        { status: 400 }
      );
    }

    // const user = await User.findOne({ loginId });
    const user = await User.findOne({ loginId }).select('+password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    let profile = null;

    if (user.role === 'TEACHER') {
      profile = await Teacher.findOne({ userId: user._id }).lean();
    }

    if (user.role === 'STUDENT') {
      profile = await Student.findOne({ userId: user._id }).lean();
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        loginId: user.loginId,
        role: user.role,
        email: user.email || '',
        profileId: profile?._id?.toString() || '',
        teacherProfileId: profile?._id || '',
        studentProfileId: profile?._id || '',
        // course: profile?.course || '',
        course: profile?.course || user.course || '',
        // className: profile?.className || '',
        className: profile?.className || user.className || '',
        // section: profile?.section || '',
        section: profile?.section || user.section || '',
        // subject: profile?.subject || '',
        subject: profile?.subject || user.subject || '',
      },
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during login' },
      { status: 500 }
    );
  }
}