'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatDateTime } from '@/lib/timeWindow';

export default function StudentSubmitPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    assignmentId: '',
    title: '',
    subject: '',
    description: '',
    teacherId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) { router.push('/'); return; }
      const parsed = JSON.parse(savedUser);
      if (parsed.role !== 'STUDENT') { router.push('/'); return; }
      setStudent(parsed);

      fetch(`/api/assignments?forStudent=true&studentId=${parsed._id || parsed.id}`)
        .then((r) => r.json())
        .then((d) => { if (d.success) setAssignments(d.assignments || []); });
    } catch {
      localStorage.removeItem('user');
      router.push('/');
    }
  }, [router]);

  const handleAssignmentChange = (e) => {
    const id = e.target.value;
    const picked = assignments.find((a) => a._id === id);
    setFormData({
      ...formData,
      assignmentId: id,
      title: picked?.title || '',
      subject: picked?.subject || '',
      teacherId: picked?.teacherId || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student) return;

    const assignment = assignments.find((a) => a._id === formData.assignmentId);
    if (!assignment) {
      toast.error('Select an assignment');
      return;
    }
    if (!assignment.window?.open) {
      toast.error(assignment.window?.message || 'Submission window is closed');
      return;
    }

    try {
      setLoading(true);
      let fileUrl = '';
      let fileName = '';

      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadData });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
          toast.error(uploadJson.message || 'File upload failed');
          return;
        }
        fileUrl = uploadJson.fileUrl;
        fileName = uploadJson.fileName || selectedFile.name;
      }

      const payload = {
        studentId: student._id || student.id,
        studentName: student.name || '',
        studentLoginId: student.loginId || '',
        teacherId: assignment.teacherId,
        teacherName: assignment.teacherName || '',
        title: formData.title.trim(),
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        className: student.className || '',
        courseName: student.course || '',
        section: student.section || '',
        fileName,
        fileUrl,
        assignmentId: formData.assignmentId,
      };

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to submit');
        return;
      }

      toast.success('Assignment submitted!');
      setFormData({ assignmentId: '', title: '', subject: '', description: '', teacherId: '' });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  const openAssignments = assignments.filter((a) => a.window?.open);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Submit Assignment</h1>
        <p className="text-slate-600 mt-1">Pick an open assignment and upload your PDF or image.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Assignment</label>
          <select
            value={formData.assignmentId}
            onChange={handleAssignmentChange}
            className="w-full border rounded-lg px-4 py-2.5"
            required
          >
            <option value="">Select assignment</option>
            {assignments.map((a) => (
              <option key={a._id} value={a._id} disabled={!a.window?.open}>
                {a.title} — {a.window?.open ? 'Open' : a.window?.reason === 'not_started' ? 'Not started' : 'Closed'}
              </option>
            ))}
          </select>
          {openAssignments.length === 0 && (
            <p className="text-sm text-amber-600 mt-2">No assignments are open for submission right now.</p>
          )}
        </div>

        {formData.assignmentId && (() => {
          const a = assignments.find((x) => x._id === formData.assignmentId);
          if (!a) return null;
          return (
            <div className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
              <p>Subject: <strong>{a.subject}</strong></p>
              <p>Teacher: <strong>{a.teacherName}</strong></p>
              <p>Window: {formatDateTime(a.openAt)} — {formatDateTime(a.closeAt)}</p>
              {a.description && <p className="mt-1">{a.description}</p>}
            </div>
          );
        })()}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes (optional)</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded-lg px-4 py-2.5"
            rows={3}
            placeholder="Any comments for your teacher..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Upload PDF or Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full border rounded-lg px-4 py-2"
          />
          {selectedFile && (
            <p className="text-sm text-slate-500 mt-1">{selectedFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || openAssignments.length === 0}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
