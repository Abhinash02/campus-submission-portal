'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatDateTime } from '@/lib/timeWindow';

const blankQuestion = () => ({
  text: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  marks: 1,
});

export default function TeacherTestsPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);
  const [tests, setTests] = useState([]);
  const [title, setTitle] = useState('');
  const [openAt, setOpenAt] = useState('');
  const [closeAt, setCloseAt] = useState('');
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [saving, setSaving] = useState(false);

  const load = async (id) => {
    const res = await fetch(`/api/tests?teacherId=${id}`);
    const data = await res.json();
    if (data.success) setTests(data.tests || []);
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) { router.replace('/'); return; }
    const user = JSON.parse(saved);
    if (user.role !== 'TEACHER') { router.replace('/'); return; }
    setTeacher(user);
    load(user._id || user.id);
  }, [router]);

  const updateQuestion = (idx, field, value) => {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q)));
  };

  const updateOption = (qIdx, oIdx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx ? { ...q, options: q.options.map((o, j) => (j === oIdx ? value : o)) } : q
      )
    );
  };

  const addQuestion = () => setQuestions((prev) => [...prev, blankQuestion()]);

  const removeQuestion = (idx) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacher) return;
    setSaving(true);
    try {
      const res = await fetch('/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: teacher._id || teacher.id,
          subject: teacher.subject,
          title,
          openAt,
          closeAt,
          questions,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message); return; }
      toast.success('Test created');
      setTitle('');
      setOpenAt('');
      setCloseAt('');
      setQuestions([blankQuestion()]);
      load(teacher._id || teacher.id);
    } catch {
      toast.error('Failed to save test');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this test?')) return;
    await fetch(`/api/tests/${id}`, { method: 'DELETE' });
    toast.success('Removed');
    load(teacher._id || teacher.id);
  };

  if (!teacher) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">MCQ Tests</h1>
        <p className="text-slate-600 mt-1">Questions are auto-graded when students submit.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Test title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600 block mb-1">Opens at</label>
            <input type="datetime-local" className="w-full border rounded-lg px-4 py-2" value={openAt} onChange={(e) => setOpenAt(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-slate-600 block mb-1">Closes at</label>
            <input type="datetime-local" className="w-full border rounded-lg px-4 py-2" value={closeAt} onChange={(e) => setCloseAt(e.target.value)} required />
          </div>
        </div>

        {questions.map((q, qIdx) => (
          <div key={qIdx} className="border border-slate-200 rounded-lg p-4 space-y-3 bg-slate-50">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm text-slate-700">Question {qIdx + 1}</span>
              {questions.length > 1 && (
                <button type="button" onClick={() => removeQuestion(qIdx)} className="text-red-500 text-sm">Remove</button>
              )}
            </div>
            <input
              className="w-full border rounded-lg px-3 py-2 bg-white"
              placeholder="Question text"
              value={q.text}
              onChange={(e) => updateQuestion(qIdx, 'text', e.target.value)}
              required
            />
            {q.options.map((opt, oIdx) => (
              <div key={oIdx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${qIdx}`}
                  checked={q.correctIndex === oIdx}
                  onChange={() => updateQuestion(qIdx, 'correctIndex', oIdx)}
                />
                <input
                  className="flex-1 border rounded-lg px-3 py-2 bg-white"
                  placeholder={`Option ${oIdx + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                  required
                />
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm">
              <label>Marks:</label>
              <input
                type="number"
                min={1}
                className="w-20 border rounded px-2 py-1"
                value={q.marks}
                onChange={(e) => updateQuestion(qIdx, 'marks', Number(e.target.value))}
              />
              <span className="text-slate-500">Select the radio for the correct answer</span>
            </div>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="text-violet-600 text-sm font-medium hover:underline">
          + Add another question
        </button>

        <button type="submit" disabled={saving} className="bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Publish Test'}
        </button>
      </form>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Questions</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Window</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-slate-500">No tests yet</td></tr>
            ) : tests.map((t) => (
              <tr key={t._id} className="border-t">
                <td className="p-3 font-medium">{t.title}</td>
                <td className="p-3">{t.questionCount}</td>
                <td className="p-3">{t.totalMarks}</td>
                <td className="p-3 text-slate-600 text-xs">
                  {formatDateTime(t.openAt)} — {formatDateTime(t.closeAt)}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    t.window?.open ? 'bg-green-100 text-green-700' :
                    t.window?.reason === 'not_started' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {t.window?.open ? 'Open' : t.window?.reason === 'not_started' ? 'Upcoming' : 'Closed'}
                  </span>
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(t._id)} className="text-red-600 text-sm hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
