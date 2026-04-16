// import { NextResponse } from 'next/server';
// import connectDB from '@/mongodb/db';
// import User from '@/models/user';

// export const dynamic = 'force-dynamic';

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const user = await User.findById(params.id).select('-password').lean();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, user }, { status: 200 });
//   } catch (error) {
//     console.error('GET USER ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch user' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const updateData = {
//       name: String(body.name || '').trim(),
//       loginId: String(body.loginId || '').trim(),
//       email: String(body.email || '').trim(),
//       course: String(body.course || '').trim(),
//       className: String(body.className || '').trim(),
//       section: String(body.section || '').trim(),
//       subject: String(body.subject || '').trim(),
//     };

//     const existingUser = await User.findOne({
//       loginId: updateData.loginId,
//       _id: { $ne: params.id },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: 'Login ID already exists' },
//         { status: 409 }
//       );
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       params.id,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-password').lean();

//     if (!updatedUser) {
//       return NextResponse.json(
//         { success: false, message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'User updated successfully',
//         user: updatedUser,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('UPDATE USER ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to update user' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();

//     const deletedUser = await User.findByIdAndDelete(params.id);

//     if (!deletedUser) {
//       return NextResponse.json(
//         { success: false, message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: 'User deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('DELETE USER ERROR:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to delete user' },
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

export async function GET(req, { params }) {
  try {
    await connectDB();

    const user = await User.findById(params.id).select('-password').lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error('GET USER ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const body = await req.json();

    const name = String(body.name || '').trim();
    const loginId = String(body.loginId || '').trim();
    const email = String(body.email || '').trim();
    const course = String(body.course || '').trim();
    const className = String(body.className || '').trim();
    const section = String(body.section || '').trim();
    const subject = String(body.subject || '').trim();

    if (!name || !loginId) {
      return NextResponse.json(
        { success: false, message: 'Name and loginId are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      loginId,
      _id: { $ne: params.id },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Login ID already exists' },
        { status: 409 }
      );
    }

    const currentUser = await User.findById(params.id);

    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (currentUser.role === 'STUDENT' && (!course || !className || !section)) {
      return NextResponse.json(
        { success: false, message: 'Course, className and section are required for students' },
        { status: 400 }
      );
    }

    if (currentUser.role === 'TEACHER' && !subject) {
      return NextResponse.json(
        { success: false, message: 'Subject is required for teachers' },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      {
        name,
        loginId,
        email,
        course: currentUser.role === 'STUDENT' ? course : '',
        className: currentUser.role === 'STUDENT' ? className : '',
        section: currentUser.role === 'STUDENT' ? section : '',
        subject: currentUser.role === 'TEACHER' ? subject : '',
      },
      { new: true, runValidators: true }
    ).select('-password').lean();

    if (currentUser.role === 'STUDENT') {
      await Student.findOneAndUpdate(
        { userId: params.id },
        {
          studentName: name,
          course,
          className,
          section,
        }
      );
    }

    if (currentUser.role === 'TEACHER') {
      await Teacher.findOneAndUpdate(
        { userId: params.id },
        {
          teacherName: name,
          subject,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'User updated successfully',
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('UPDATE USER ERROR:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedUser = await User.findById(params.id);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (deletedUser.role === 'STUDENT') {
      await Student.findOneAndDelete({ userId: params.id });
    }

    if (deletedUser.role === 'TEACHER') {
      await Teacher.findOneAndDelete({ userId: params.id });
    }

    await User.findByIdAndDelete(params.id);

    return NextResponse.json(
      { success: true, message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE USER ERROR:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to delete user' },
      { status: 500 }
    );
  }
}