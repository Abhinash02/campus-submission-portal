
import connectDB from '../../../../mongodb/db'
import User from '../../../../models/user'
import Teacher from '../../../../models/teacher'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  const teachers = await Teacher.find().populate('userId', 'username')
  return NextResponse.json(teachers)
}

export async function POST(request) {
  try {
    await connectDB()
    const { name, subject, username, password } = await request.json()
    
    // Create user first
    const user = new User({ username, password, role: 'teacher', name })
    await user.save()
    
    // Create teacher profile
    const teacher = new Teacher({ userId: user._id, teacherName: name, subject })
    await teacher.save()
    
    return NextResponse.json({ success: true, teacher })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

export async function DELETE(request) {
  try {
    await connectDB()
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    const teacher = await Teacher.findById(id).populate('userId')
    if (teacher && teacher.userId) {
      await User.findByIdAndDelete(teacher.userId._id)
      await Teacher.findByIdAndDelete(id)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}