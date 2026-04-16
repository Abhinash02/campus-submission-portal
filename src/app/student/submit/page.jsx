'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function StudentSubmitPage() {
  const router = useRouter();

  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    teacherId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const parsed = JSON.parse(savedUser);

      if (parsed.role !== 'STUDENT') {
        router.push('/');
        return;
      }

      setStudent(parsed);
    } catch (error) {
      localStorage.removeItem('user');
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teachers');
        const data = await res.json();

        if (res.ok && data.success) {
          setTeachers(data.teachers || []);
        } else {
          toast.error(data.message || 'Failed to fetch teachers');
        }
      } catch (error) {
        toast.error('Failed to load teachers');
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student || !student.id) {
      toast.error('Student data missing');
      return;
    }

    if (!student.loginId) {
      toast.error('Student login ID missing');
      return;
    }

    const selectedTeacher = teachers.find((t) => t._id === formData.teacherId);
    if (!selectedTeacher) {
      toast.error('Please select a teacher');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.subject.trim()) {
      toast.error('Subject is required');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        studentId: student.id,
        studentName: student.name,
        studentLoginId: student.loginId,
        teacherId: selectedTeacher._id,
        teacherName: selectedTeacher.name,
        teacherLoginId: selectedTeacher.loginId,
        title: formData.title,
        subject: formData.subject,
        description: formData.description,
        className: student.className || '',
        courseName: student.course || '',
      };

      if (selectedFile) {
        payload.fileName = selectedFile.name;
        payload.fileUrl = '';
      }

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to submit assignment');
        return;
      }

      toast.success('Assignment submitted successfully');

      setFormData({
        title: '',
        subject: '',
        description: '',
        teacherId: '',
      });
      setSelectedFile(null);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Submit Assignment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Teacher</label>
            <select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name} ({teacher.subject || 'No subject'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Attach document (optional)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
              onChange={handleFileChange}
              className="w-full border rounded-lg px-4 py-2"
            />
            {selectedFile && (
              <p className="text-sm text-slate-600 mt-2">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Assignment'}
          </button>
        </form>
      </div>
    </main>
  );
}