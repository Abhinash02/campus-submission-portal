'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params?.id) {
      checkAdminAndLoadStudent();
    }
  }, [params?.id]);

  const checkAdminAndLoadStudent = async () => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const user = JSON.parse(savedUser);

      if (!user || user.role !== 'ADMIN') {
        router.push('/');
        return;
      }

      const res = await fetch(`/api/user/${params.id}`, {
        cache: 'no-store',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.user?.role !== 'STUDENT') {
          setError('This user is not a student');
          return;
        }

        setStudent(data.user);
      } else {
        setError(data.message || 'Failed to load student details');
      }
    } catch (error) {
      console.error('STUDENT DETAIL ERROR:', error);
      setError('Failed to load student details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-lg">Loading student details...</div>;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => router.push('/admin/students')}
            className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
          <p className="text-slate-600">Student not found.</p>
          <button
            onClick={() => router.push('/admin/students')}
            className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Student Details</h1>
          <button
            onClick={() => router.push('/admin/students')}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            Back
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="text-lg font-medium text-slate-900">{student.name}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Login ID</p>
            <p className="text-lg font-medium text-slate-900">{student.loginId}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-lg font-medium text-slate-900">{student.email || 'N/A'}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Role</p>
            <p className="text-lg font-medium text-slate-900">{student.role}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Course</p>
            <p className="text-lg font-medium text-slate-900">{student.course || 'N/A'}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Class</p>
            <p className="text-lg font-medium text-slate-900">{student.className || 'N/A'}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Section</p>
            <p className="text-lg font-medium text-slate-900">{student.section || 'N/A'}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Created By</p>
            <p className="text-lg font-medium text-slate-900">{student.createdBy || 'N/A'}</p>
          </div>
        </div>
      </div>
    </main>
  );
}