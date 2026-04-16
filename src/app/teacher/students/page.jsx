'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function TeacherStudentsPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    loginId: '',
    password: '',
    email: '',
    rollNo: '',
    course: '',
    className: '',
    section: '',
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const parsed = JSON.parse(savedUser);
      if (parsed.role !== 'TEACHER') {
        localStorage.removeItem('user');
        router.push('/');
        return;
      }

      setTeacher(parsed);
    } catch (error) {
      localStorage.removeItem('user');
      router.push('/');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleCreate = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/teachers/create-student', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        teacherId: teacher?.id || teacher?._id,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      console.error('CREATE STUDENT FAILED:', data);
      toast.error(data.message || 'Failed to create student');
      return;
    }

    toast.success('Student account created successfully');
    setFormData({
      name: '',
      loginId: '',
      password: '',
      email: '',
      rollNo: '',
      course: '',
      className: '',
      section: '',
    });
  } catch (error) {
    console.error('CREATE STUDENT ERROR:', error);
    toast.error('Something went wrong');
  }
};

  if (!teacher) return null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Students</h1>
            <p className="text-slate-600 mt-1">
              Create student accounts like admin panel.
            </p>
          </div>

          <button
            onClick={() => router.push('/teacher')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>

        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Student Name"
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
            placeholder="Login ID"
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="Roll Number"
            className="border rounded-lg px-4 py-3"
            required
          />

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          >
            <option value="">Select Course</option>
            <option value="BCA">BCA</option>
            <option value="BSc">BSc</option>
            <option value="BA">BA</option>
            <option value="MCA">MCA</option>
          </select>

          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          >
            <option value="">Select Class</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>

          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <div className="md:col-span-2">
            <button className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700">
              Create Student Account
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}