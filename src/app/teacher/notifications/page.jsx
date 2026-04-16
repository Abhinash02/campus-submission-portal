
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
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

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Teacher Notifications
            </h1>
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
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>

          <div className="space-y-4">
            <div className="border border-slate-200 rounded-xl p-4">
              <p className="font-medium text-slate-900">
                No new notifications right now
              </p>
              <p className="text-sm text-slate-600 mt-1">
                Assignment, submission, and student alerts can be added here later.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <p className="font-medium text-slate-900">
                Notification module is ready
              </p>
              <p className="text-sm text-slate-600 mt-1">
                This page is now working without auth/prisma dependency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}