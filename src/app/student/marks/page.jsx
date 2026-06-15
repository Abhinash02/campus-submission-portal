'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentMarksPage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) { router.replace('/'); return; }
    const user = JSON.parse(saved);
    if (user.role !== 'STUDENT') { router.replace('/'); return; }

    const params = new URLSearchParams({
      studentId: user._id || user.id,
      studentLoginId: user.loginId,
    });
    fetch(`/api/student/marks?${params}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d); });
  }, [router]);

  if (!data) {
    return <div className="text-slate-500">Loading marks...</div>;
  }

  const { summary, growth, bySubject } = data;
  const maxPct = Math.max(...(growth.map((g) => g.percentage) || [0]), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Marks Dashboard</h1>
        <p className="text-slate-600 mt-1">Track your progress across assignments and tests.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Assignments Graded" value={summary.assignmentsChecked} />
        <StatCard label="Tests Taken" value={summary.testsTaken} />
        <StatCard label="Assignment Marks" value={summary.totalAssignmentMarks} />
        <StatCard label="Test Marks" value={summary.totalTestMarks} />
      </div>

      {Object.keys(bySubject).length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">By Subject</h2>
          <div className="space-y-3">
            {Object.entries(bySubject).map(([subject, info]) => (
              <div key={subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{subject}</span>
                  <span className="text-slate-500">{info.marks}/{info.maxMarks} ({info.total}%)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${info.total}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {growth.length > 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Marks Growth</h2>
          <div className="flex items-end gap-2 h-48 border-b border-slate-200 pb-2">
            {growth.map((g, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <span className="text-xs text-slate-500">{g.percentage}%</span>
                <div
                  className={`w-full rounded-t ${g.type === 'test' ? 'bg-violet-400' : 'bg-blue-400'}`}
                  style={{ height: `${(g.percentage / maxPct) * 100}%`, minHeight: '4px' }}
                  title={`${g.title}: ${g.marks}/${g.total}`}
                />
                <span className="text-[10px] text-slate-400 truncate w-full text-center">{g.type === 'test' ? 'T' : 'A'}{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">A = Assignment, T = Test (in chronological order)</p>
        </div>
      ) : (
        <p className="text-slate-500">No graded work yet. Submit assignments or take tests to see your growth here.</p>
      )}

      {growth.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Title</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Score</th>
                <th className="p-3">Running Avg</th>
              </tr>
            </thead>
            <tbody>
              {growth.map((g, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 capitalize">{g.type}</td>
                  <td className="p-3">{g.title}</td>
                  <td className="p-3">{g.subject}</td>
                  <td className="p-3 font-medium">{g.marks}/{g.total}</td>
                  <td className="p-3 text-blue-600">{g.cumulativeAvg}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}
