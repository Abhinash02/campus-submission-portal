'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatDateTime } from '@/lib/timeWindow';

const emptyForm = {
  title: '',
  description: '',
  openAt: '',
  closeAt: '',
  course: '',
  className: '',
  section: '',
};

export default function TeacherAssignmentsPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async (id) => {
    const res = await fetch(`/api/assignments?teacherId=${id}`);
    const data = await res.json();
    if (data.success) setAssignments(data.assignments || []);
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) { router.replace('/'); return; }
    const user = JSON.parse(saved);
    if (user.role !== 'TEACHER') { router.replace('/'); return; }
    setTeacher(user);
    load(user._id || user.id);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacher) return;
    setSaving(true);
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: teacher._id || teacher.id,
          subject: teacher.subject,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message); return; }
      toast.success('Assignment created');
      setForm(emptyForm);
      load(teacher._id || teacher.id);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this assignment?')) return;
    await fetch(`/api/assignments/${id}`, { method: 'DELETE' });
    toast.success('Removed');
    load(teacher._id || teacher.id);
  };

  if (!teacher) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Assignments</h1>
        <p className="text-slate-600 mt-1">Students can only submit during the open window.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-lg">New Assignment</h2>
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Description (optional)"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600 block mb-1">Opens at</label>
            <input
              type="datetime-local"
              className="w-full border rounded-lg px-4 py-2"
              value={form.openAt}
              onChange={(e) => setForm({ ...form, openAt: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 block mb-1">Closes at</label>
            <input
              type="datetime-local"
              className="w-full border rounded-lg px-4 py-2"
              value={form.closeAt}
              onChange={(e) => setForm({ ...form, closeAt: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <input className="border rounded-lg px-4 py-2" placeholder="Course (optional)" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
          <input className="border rounded-lg px-4 py-2" placeholder="Class (optional)" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} />
          <input className="border rounded-lg px-4 py-2" placeholder="Section (optional)" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} />
        </div>
        <button type="submit" disabled={saving} className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Create Assignment'}
        </button>
      </form>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Window</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr><td colSpan={4} className="p-6 text-slate-500 text-center">No assignments yet</td></tr>
            ) : assignments.map((a) => (
              <tr key={a._id} className="border-t">
                <td className="p-3 font-medium">{a.title}</td>
                <td className="p-3 text-slate-600">
                  {formatDateTime(a.openAt)} — {formatDateTime(a.closeAt)}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    a.window?.open ? 'bg-green-100 text-green-700' :
                    a.window?.reason === 'not_started' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {a.window?.open ? 'Open' : a.window?.reason === 'not_started' ? 'Upcoming' : 'Closed'}
                  </span>
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(a._id)} className="text-red-600 hover:underline text-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
