
import connectDB from '../../../../mongodb/db'
import User from '../../../../models/user'
import Student from '../../../../models/student'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectDB()
  const students = await Student.find().populate('userId', 'username')
  return NextResponse.json(students)
}

export async function POST(request) {
  try {
    await connectDB()
    const { name, rollNo, className, section, username, password } = await request.json()
    
    const user = new User({ username, password, role: 'student', name })
    await user.save()
    
    const student = new Student({ userId: user._id, rollNumber: rollNo, className, section })
    await student.save()
    
    return NextResponse.json({ success: true, student })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 })
  }
}

export async function DELETE(request) {
  try {
    await connectDB()
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    const student = await Student.findById(id).populate('userId')
    if (student && student.userId) {
      await User.findByIdAndDelete(student.userId._id)
      await Student.findByIdAndDelete(id)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}