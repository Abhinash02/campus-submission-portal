// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';

// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     await connectDB();

//     const users = await User.find({})
//       .select('-password')
//       .sort({ createdAt: -1 })
//       .lean();

//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.error('GET USERS ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch users' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const name = String(body.name || '').trim();
//     const loginId = String(body.loginId || '').trim();
//     const password = String(body.password || '').trim();
//     const role = String(body.role || '').trim().toUpperCase();
//     const email = String(body.email || '').trim();
//     const course = String(body.course || '').trim();
//     const className = String(body.className || '').trim();
//     const section = String(body.section || '').trim();
//     const subject = String(body.subject || '').trim();
//     const createdBy = String(body.createdBy || '').trim();

//     if (!name || !loginId || !password || !role) {
//       return NextResponse.json(
//         { success: false, message: 'Name, loginId, password and role are required' },
//         { status: 400 }
//       );
//     }

//     if (role === 'STUDENT' && (!course || !className || !section)) {
//       return NextResponse.json(
//         { success: false, message: 'Course, className and section are required for students' },
//         { status: 400 }
//       );
//     }

//     if (role === 'TEACHER' && !subject) {
//       return NextResponse.json(
//         { success: false, message: 'Subject is required for teachers' },
//         { status: 400 }
//       );
//     }

//     const existingUser = await User.findOne({ loginId });
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: 'Login ID already exists' },
//         { status: 409 }
//       );
//     }

//     const user = await User.create({
//       name,
//       loginId,
//       password,
//       role,
//       email,
//       course,
//       className,
//       section,
//       subject,
//       createdBy,
//     });

//     const safeUser = await User.findById(user._id).select('-password').lean();

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'User created successfully',
//         user: safeUser,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('CREATE USER ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to create user' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';
import Student from '@/models/student';
import Teacher from '@/models/teacher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('GET USERS ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const name = String(body.name || '').trim();
    const loginId = String(body.loginId || '').trim();
    const password = String(body.password || '').trim();
    const role = String(body.role || '').trim().toUpperCase();
    const email = String(body.email || '').trim();
    const course = String(body.course || '').trim();
    const className = String(body.className || '').trim();
    const section = String(body.section || '').trim();
    const subject = String(body.subject || '').trim();
    const createdBy = String(body.createdBy || '').trim();

    if (!name || !loginId || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Name, loginId, password and role are required' },
        { status: 400 }
      );
    }

    if (role === 'STUDENT' && (!course || !className || !section)) {
      return NextResponse.json(
        { success: false, message: 'Course, className and section are required for students' },
        { status: 400 }
      );
    }

    if (role === 'TEACHER' && !subject) {
      return NextResponse.json(
        { success: false, message: 'Subject is required for teachers' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ loginId });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Login ID already exists' },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      loginId,
      password,
      role,
      email,
      course: role === 'STUDENT' ? course : '',
      className: role === 'STUDENT' ? className : '',
      section: role === 'STUDENT' ? section : '',
      subject: role === 'TEACHER' ? subject : '',
      createdBy,
    });

    if (role === 'STUDENT') {
      await Student.create({
        userId: user._id,
        studentName: name,
        course,
        className,
        section,
      });
    }

    if (role === 'TEACHER') {
      await Teacher.create({
        userId: user._id,
        teacherName: name,
        subject,
        course: '',
        className: '',
        section: '',
      });
    }

    const safeUser = await User.findById(user._id).select('-password').lean();

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: safeUser,
      },
      { status: 201 }
    );
} catch (error) {
  console.error('CREATE USER ERROR FULL:', error);
  return NextResponse.json(
    { success: false, message: error?.message || 'Failed to create user' },
    { status: 500 }
  );
}
}