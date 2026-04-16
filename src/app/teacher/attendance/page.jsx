'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AttendancePage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (parsedUser.role !== 'TEACHER') {
        router.push('/');
        return;
      }

      setTeacher(parsedUser);
    } catch (error) {
      localStorage.removeItem('user');
      router.push('/');
    }
  }, [router]);

  const sampleStudents = [
    { id: 1, name: 'Rahul Kumar', className: 'BCA 1st Year', status: 'Present' },
    { id: 2, name: 'Simran Kaur', className: 'BCA 1st Year', status: 'Absent' },
    { id: 3, name: 'Amanpreet Singh', className: 'BCA 1st Year', status: 'Present' },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Attendance</h1>
            <p className="text-slate-600 mt-1">
              Welcome, {teacher?.name || 'Teacher'}
            </p>
          </div>

          <button
            onClick={() => router.push('/teacher')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Student Attendance List</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Student Name</th>
                  <th className="p-3 border-b">Class</th>
                  <th className="p-3 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {sampleStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b">{student.name}</td>
                    <td className="p-3 border-b">{student.className}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          student.status === 'Present'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-500 text-sm mt-4">
            This is a working attendance page. Later you can connect it to MongoDB.
          </p>
        </div>
      </div>
    </main>
  );
}