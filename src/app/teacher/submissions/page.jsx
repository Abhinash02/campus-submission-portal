
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function shortenFileName(name = '', maxBaseLength = 18) {
  if (!name) return '';

  const lastDotIndex = name.lastIndexOf('.');
  const hasExtension = lastDotIndex > 0;

  const base = hasExtension ? name.slice(0, lastDotIndex) : name;
  const ext = hasExtension ? name.slice(lastDotIndex) : '';

  if (base.length <= maxBaseLength) return name;

  return `${base.slice(0, maxBaseLength)}...${ext}`;
}

export default function TeacherSubmissionsPage() {
  const router = useRouter();
  const debounceRef = useRef(null);

  const [auth, setAuth] = useState({
    loading: true,
    teacher: null,
  });

  const teacher = auth.teacher;

  const [submissions, setSubmissions] = useState([]);
  const [editableData, setEditableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    courseName: '',
    status: '',
    page: 1,
    limit: 5,
  });

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        toast.error('Please login first');
        router.replace('/');
        return;
      }

      const parsed = JSON.parse(savedUser);
      const role = String(parsed?.role || '').toUpperCase();

      if (role !== 'TEACHER') {
        localStorage.removeItem('user');
        toast.error('Access denied. Teachers only.');
        router.replace('/');
        return;
      }

      setAuth({
        loading: false,
        teacher: parsed,
      });
    } catch (error) {
      console.error('Auth Check Error:', error);
      localStorage.removeItem('user');
      router.replace('/');
    }
  }, [router]);

  const fetchSubmissions = useCallback(async () => {
    if (!teacher?.id && !teacher?._id) return;

    try {
      setLoading(true);

      const teacherId = teacher.id || teacher._id;

      const params = new URLSearchParams({
        teacherId,
        page: String(filters.page),
        limit: String(filters.limit),
      });

      if (filters.search.trim()) params.set('search', filters.search.trim());
      if (filters.courseName) params.set('courseName', filters.courseName);
      if (filters.status) params.set('status', filters.status);

      const res = await fetch(`/api/submissions?${params.toString()}`, {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to fetch submissions');
        setSubmissions([]);
        setPagination({ total: 0, totalPages: 1, currentPage: 1 });
        return;
      }

      const fetchedSubmissions = data.submissions || [];

      setSubmissions(fetchedSubmissions);
      setPagination(data.pagination || { total: 0, totalPages: 1, currentPage: 1 });
      setTeacherInfo(data.teacher || null);
      setCourseOptions(data.courseOptions || []);

      const initialEditable = {};
      fetchedSubmissions.forEach((item) => {
        initialEditable[item._id] = {
          status: item.status || 'Submitted',
          marks: item.marks ?? 0,
          feedback: item.feedback || '',
        };
      });

      setEditableData(initialEditable);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, [teacher, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

  useEffect(() => {
    if (!teacher) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (filters.search.trim()) {
      debounceRef.current = setTimeout(() => {
        fetchSubmissions();
      }, 400);
    } else {
      fetchSubmissions();
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [teacher, fetchSubmissions, filters.search]);

  const stats = useMemo(() => {
    const totalStudents = new Set(
      submissions.map((s) => s.studentId?._id || s.studentId).filter(Boolean)
    ).size;

    const byCourse = {};
    submissions.forEach((s) => {
      const course = s.courseName || 'Unknown';
      byCourse[course] = (byCourse[course] || 0) + 1;
    });

    return {
      totalStudents,
      totalSubmissions: pagination.total || submissions.length,
      submissionsByCourse: byCourse,
    };
  }, [submissions, pagination.total]);

  const handleChange = (id, field, value) => {
    setEditableData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === 'marks' ? Number(value) || 0 : value,
      },
    }));
  };

  const handleUpdate = async (id) => {
    try {
      setSavingId(id);

      const rowData = editableData[id];
      const teacherId = teacher?.id || teacher?._id;

      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teacherId,
          status: rowData.status,
          marks: rowData.marks,
          feedback: rowData.feedback,
          reviewedBy: teacher?.name || '',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to update submission');
        return;
      }

      toast.success('Submission updated successfully');
      await fetchSubmissions();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setSavingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.replace('/');
  };

  if (auth.loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow px-6 py-4 text-slate-700 animate-pulse">
          Authenticating Teacher Profile...
        </div>
      </main>
    );
  }

  if (!teacher) return null;

  return (
    <main className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {teacher.name} - Teacher Submissions
          </h1>
          <p className="text-slate-600 mt-1">
            Review assignments, filter by course, search students, and update marks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => router.push('/teacher')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {teacherInfo && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Teacher Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Name</p>
              <p className="font-semibold text-slate-900">{teacherInfo.name || '-'}</p>
            </div>
            <div>
              <p className="text-slate-500">Login ID</p>
              <p className="font-semibold text-slate-900">{teacherInfo.loginId || '-'}</p>
            </div>
            <div>
              <p className="text-slate-500">Subject</p>
              <p className="font-semibold text-slate-900">{teacherInfo.subject || '-'}</p>
            </div>
            <div>
              <p className="text-slate-500">Role</p>
              <p className="font-semibold text-slate-900">{teacherInfo.role || '-'}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Submissions Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <div className="text-sm font-medium text-slate-500">Total Students</div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalStudents}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500">Total Submissions</div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalSubmissions}</div>
          </div>
        </div>

        {Object.keys(stats.submissionsByCourse).length > 0 && (
          <div>
            <div className="text-sm font-medium text-slate-500 mb-2">Submissions by Course</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.submissionsByCourse).map(([course, count]) => (
                <span
                  key={course}
                  className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
                >
                  {course}: {count}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by student, login ID, title..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
            }
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={filters.courseName}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, courseName: e.target.value, page: 1 }))
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="">All Courses</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="">All Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Checked">Checked</option>
          </select>

          <button
            onClick={() =>
              setFilters({
                search: '',
                courseName: '',
                status: '',
                page: 1,
                limit: 5,
              })
            }
            className="bg-slate-800 text-white rounded-lg px-4 py-3 hover:bg-slate-900"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        {loading ? (
          <p className="text-slate-600">Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p className="text-slate-600">No assignments were submitted to you yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="p-3 border-b">#</th>
                    <th className="p-3 border-b">Student</th>
                    <th className="p-3 border-b">Login ID</th>
                    <th className="p-3 border-b">Title</th>
                    <th className="p-3 border-b">Course</th>
                    <th className="p-3 border-b">Class</th>
                    <th className="p-3 border-b">Subject</th>
                    <th className="p-3 border-b">File</th>
                    <th className="p-3 border-b">Status</th>
                    <th className="p-3 border-b">Marks</th>
                    <th className="p-3 border-b">Feedback</th>
                    <th className="p-3 border-b">Reviewed By</th>
                    <th className="p-3 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((item, index) => (
                    <tr key={item._id} className="hover:bg-slate-50 align-top">
                      <td className="p-3 border-b">
                        {(pagination.currentPage - 1) * filters.limit + index + 1}
                      </td>
                      <td className="p-3 border-b">{item.studentName || 'Unknown'}</td>
                      <td className="p-3 border-b">{item.studentLoginId || '-'}</td>
                      <td className="p-3 border-b">{item.title || '-'}</td>
                      <td className="p-3 border-b">{item.courseName || '-'}</td>
                      <td className="p-3 border-b">{item.className || '-'}</td>
                      <td className="p-3 border-b">{item.subject || '-'}</td>
                      <td className="p-3 border-b">
                        <div className="flex flex-col gap-2 min-w-[170px]">
                          <span
                            className="text-sm text-slate-700 break-all"
                            title={item.fileName || ''}
                          >
                            {item.fileName ? shortenFileName(item.fileName, 16) : 'No File'}
                          </span>

                          {item.fileUrl ? (
                            <a
                              href={item.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={item.fileName || 'submission.pdf'}
                              className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                              Download PDF
                            </a>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="inline-flex w-fit items-center justify-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-medium text-slate-500 cursor-not-allowed"
                            >
                              No File
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-3 border-b">
                        <select
                          value={editableData[item._id]?.status || 'Submitted'}
                          onChange={(e) => handleChange(item._id, 'status', e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Checked">Checked</option>
                        </select>
                      </td>
                      <td className="p-3 border-b">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editableData[item._id]?.marks ?? 0}
                          onChange={(e) => handleChange(item._id, 'marks', e.target.value)}
                          className="border rounded-lg px-3 py-2 w-24"
                        />
                      </td>
                      <td className="p-3 border-b">
                        <textarea
                          value={editableData[item._id]?.feedback || ''}
                          onChange={(e) => handleChange(item._id, 'feedback', e.target.value)}
                          rows={3}
                          className="border rounded-lg px-3 py-2 w-64"
                          placeholder="Write feedback"
                        />
                      </td>
                      <td className="p-3 border-b">{item.reviewedBy || 'Not reviewed'}</td>
                      <td className="p-3 border-b">
                        <button
                          onClick={() => handleUpdate(item._id)}
                          disabled={savingId === item._id}
                          className={`px-4 py-2 rounded-lg text-white ${
                            savingId === item._id
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                        >
                          {savingId === item._id ? 'Saving...' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-slate-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={pagination.currentPage <= 1}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.max(prev.page - 1, 1),
                    }))
                  }
                  className="px-4 py-2 rounded-lg bg-slate-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.min(prev.page + 1, pagination.totalPages),
                    }))
                  }
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}