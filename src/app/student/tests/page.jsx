'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatDateTime } from '@/lib/timeWindow';

export default function StudentTestsPage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) { router.replace('/'); return; }
    const user = JSON.parse(saved);
    if (user.role !== 'STUDENT') { router.replace('/'); return; }
    setStudent(user);
    fetch(`/api/tests?forStudent=true&studentId=${user._id || user.id}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setTests(d.tests || []); });
  }, [router]);

  const openTest = async (testId) => {
    const res = await fetch(`/api/tests/${testId}`);
    const data = await res.json();
    if (!res.ok) { toast.error(data.message); return; }
    if (!data.test.window?.open) {
      toast.error(data.test.window?.message || 'Test is not open');
      return;
    }
    setActiveTest(data.test);
    setAnswers({});
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!student || !activeTest) return;
    const payload = Object.entries(answers).map(([questionIndex, selectedIndex]) => ({
      questionIndex: Number(questionIndex),
      selectedIndex: Number(selectedIndex),
    }));
    setSubmitting(true);
    try {
      const res = await fetch(`/api/tests/${activeTest._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: student._id || student.id, answers: payload }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message); return; }
      setResult(data.result);
      toast.success('Test submitted!');
    } catch {
      toast.error('Submit failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!student) return null;

  if (result) {
    return (
      <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Test Complete</h2>
        <p className="text-5xl font-bold text-blue-600">{result.marksObtained} / {result.totalMarks}</p>
        <p className="text-slate-600">
          You scored {result.totalMarks ? Math.round((result.marksObtained / result.totalMarks) * 100) : 0}%
        </p>
        <button
          onClick={() => { setActiveTest(null); setResult(null); }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to tests
        </button>
      </div>
    );
  }

  if (activeTest) {
    return (
      <div className="max-w-2xl space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{activeTest.title}</h1>
          <button onClick={() => setActiveTest(null)} className="text-sm text-slate-500 hover:underline">Cancel</button>
        </div>
        {activeTest.questions.map((q, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-medium mb-3">{idx + 1}. {q.text} <span className="text-slate-400 text-sm">({q.marks} mark{q.marks > 1 ? 's' : ''})</span></p>
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => (
                <label key={oIdx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    checked={answers[idx] === oIdx}
                    onChange={() => setAnswers({ ...answers, [idx]: oIdx })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          disabled={submitting || Object.keys(answers).length < activeTest.questions.length}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Available Tests</h1>
        <p className="text-slate-600 mt-1">Complete tests within the time window. Marks are calculated automatically.</p>
      </div>
      <div className="grid gap-4">
        {tests.length === 0 ? (
          <p className="text-slate-500">No tests available right now.</p>
        ) : tests.map((t) => (
          <div key={t._id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">{t.title}</h3>
              <p className="text-sm text-slate-500">{t.subject} · {t.questionCount} questions · {t.totalMarks} marks</p>
              <p className="text-xs text-slate-400 mt-1">{formatDateTime(t.openAt)} — {formatDateTime(t.closeAt)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                t.window?.open ? 'bg-green-100 text-green-700' :
                t.window?.reason === 'not_started' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {t.window?.open ? 'Open' : t.window?.reason === 'not_started' ? 'Upcoming' : 'Closed'}
              </span>
              <button
                onClick={() => openTest(t._id)}
                disabled={!t.window?.open}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-40"
              >
                Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
