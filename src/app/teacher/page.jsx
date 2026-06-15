'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TeacherDashboard() {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);
  const [stats, setStats] = useState({ submissions: 0, assignments: 0, tests: 0, pending: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) { router.replace('/'); return; }
    const user = JSON.parse(saved);
    if (user.role !== 'TEACHER') { router.replace('/'); return; }
    setTeacher(user);

    const id = user._id || user.id;
    Promise.all([
      fetch(`/api/submissions?teacherId=${id}&limit=1`).then((r) => r.json()),
      fetch(`/api/assignments?teacherId=${id}`).then((r) => r.json()),
      fetch(`/api/tests?teacherId=${id}`).then((r) => r.json()),
    ]).then(([subRes, assignRes, testRes]) => {
      const subs = subRes.pagination?.total || 0;
      const pending = (subRes.submissions || []).filter((s) => s.status === 'Submitted').length;
      setStats({
        submissions: subs,
        assignments: assignRes.assignments?.length || 0,
        tests: testRes.tests?.length || 0,
        pending,
      });
    });
  }, [router]);

  if (!teacher) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hi, {teacher.name}</h1>
        <p className="text-slate-600 mt-1">{teacher.subject || 'Teacher'} — manage your class from here.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Submissions', value: stats.submissions, color: 'bg-blue-500' },
          { label: 'Open Assignments', value: stats.assignments, color: 'bg-emerald-500' },
          { label: 'Active Tests', value: stats.tests, color: 'bg-violet-500' },
          { label: 'Pending Review', value: stats.pending, color: 'bg-amber-500' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-2 h-8 rounded-full ${card.color} mb-3`} />
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/teacher/assignments" className="bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-400 hover:shadow-md transition">
          <h3 className="font-semibold text-slate-900">Create Assignment</h3>
          <p className="text-sm text-slate-500 mt-1">Set title, subject and submission time window.</p>
        </Link>
        <Link href="/teacher/tests" className="bg-white border border-slate-200 rounded-xl p-5 hover:border-violet-400 hover:shadow-md transition">
          <h3 className="font-semibold text-slate-900">Create MCQ Test</h3>
          <p className="text-sm text-slate-500 mt-1">Add questions with auto-grading.</p>
        </Link>
        <Link href="/teacher/submissions" className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition">
          <h3 className="font-semibold text-slate-900">Review Submissions</h3>
          <p className="text-sm text-slate-500 mt-1">Grade work and view uploaded files.</p>
        </Link>
      </div>
    </div>
  );
}
