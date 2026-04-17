// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';
// import Student from '@/models/student';

// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     await connectDB();

//     const students = await User.find({ role: 'STUDENT' })
//       .select('-password')
//       .sort({ createdAt: -1 })
//       .lean();

//     return NextResponse.json(
//       {
//         success: true,
//         students,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('GET STUDENTS ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || 'Failed to fetch students',
//         students: [],
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();

//     const body = await request.json();

//     const name = String(body.name || '').trim();
//     const loginId = String(body.loginId || '').trim();
//     const password = String(body.password || '').trim();
//     const email = String(body.email || '').trim();
//     const course = String(body.course || '').trim();
//     const className = String(body.className || '').trim();
//     const section = String(body.section || '').trim();
//     const createdBy = String(body.createdBy || '').trim();

//     if (!name || !loginId || !password || !course || !className || !section) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Name, loginId, password, course, className and section are required',
//         },
//         { status: 400 }
//       );
//     }

//     const existingUser = await User.findOne({ loginId });

//     if (existingUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Login ID already exists',
//         },
//         { status: 409 }
//       );
//     }

//     const user = await User.create({
//       name,
//       loginId,
//       password,
//       role: 'STUDENT',
//       email,
//       course,
//       className,
//       section,
//       subject: '',
//       createdBy,
//     });

//     await Student.create({
//       userId: user._id,
//       studentName: name,
//       course,
//       className,
//       section,
//     });

//     const safeUser = await User.findById(user._id).select('-password').lean();

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Student created successfully',
//         student: safeUser,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('CREATE STUDENT ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || 'Failed to create student',
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connectDB();

//     const url = new URL(request.url);
//     const id = url.searchParams.get('id');

//     if (!id) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'Student id is required',
//         },
//         { status: 400 }
//       );
//     }

//     await Student.findOneAndDelete({ userId: id });
//     await User.findByIdAndDelete(id);

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Student deleted successfully',
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('DELETE STUDENT ERROR:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || 'Failed to delete student',
//       },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import User from '@/models/user';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const students = await User.find({ role: 'STUDENT' })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { success: true, students },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET STUDENTS ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to fetch students',
      },
      { status: 500 }
    );
  }
}