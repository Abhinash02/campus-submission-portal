// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const ITEMS_PER_PAGE = 5;

// export default function AdminAssignmentsPage() {
//   const router = useRouter();

//   const [submissions, setSubmissions] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterTeacher, setFilterTeacher] = useState('');
//   const [filterCourse, setFilterCourse] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterTeacher, filterCourse]);

//   const checkAuthAndLoad = async () => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const user = JSON.parse(savedUser);

//       if (user.role !== 'ADMIN') {
//         router.push('/');
//         return;
//       }

//       await loadData();
//     } catch (err) {
//       console.error('AUTH ERROR:', err);
//       localStorage.removeItem('user');
//       router.push('/');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadData = async () => {
//     try {
//       setError('');

//       const [subsRes, teachersRes] = await Promise.all([
//         fetch('/api/submissions', { cache: 'no-store' }),
//         fetch('/api/users', { cache: 'no-store' }),
//       ]);

//       const subsData = await subsRes.json();
//       const teachersData = await teachersRes.json();

//       const normalizedSubmissions = Array.isArray(subsData)
//         ? subsData
//         : Array.isArray(subsData?.submissions)
//         ? subsData.submissions
//         : Array.isArray(subsData?.data)
//         ? subsData.data
//         : [];

//       const normalizedTeachers = Array.isArray(teachersData)
//         ? teachersData
//         : Array.isArray(teachersData?.users)
//         ? teachersData.users
//         : Array.isArray(teachersData?.data)
//         ? teachersData.data
//         : [];

//       setSubmissions(normalizedSubmissions);
//       setTeachers(normalizedTeachers);
//     } catch (err) {
//       console.error('LOAD ERROR:', err);
//       setError('Failed to load submissions');
//       setSubmissions([]);
//       setTeachers([]);
//     }
//   };

//   const teacherOptions = useMemo(() => {
//     return teachers
//       .filter((teacher) => teacher?.role === 'TEACHER' || teacher?.subject)
//       .map((teacher) => ({
//         _id: teacher._id,
//         loginId: teacher.loginId || '',
//         name: teacher.name || '',
//         subject: teacher.subject || '',
//       }))
//       .filter((teacher) => teacher.loginId && teacher.name);
//   }, [teachers]);

//   const courseOptions = useMemo(() => {
//     const courses = submissions
//       .map((item) => item.courseName || '')
//       .filter(Boolean);

//     return [...new Set(courses)].sort();
//   }, [submissions]);

//   const filteredSubmissions = useMemo(() => {
//     const query = searchTerm.trim().toLowerCase();

//     return submissions.filter((submission) => {
//       const title = (submission?.title || '').toLowerCase();
//       const studentName = (submission?.studentName || '').toLowerCase();
//       const teacherName = (submission?.teacherName || '').toLowerCase();
//       const teacherLoginId = submission?.teacherLoginId || '';
//       const course = (submission?.courseName || '').toLowerCase();

//       const matchesSearch =
//         !query ||
//         title.includes(query) ||
//         studentName.includes(query) ||
//         teacherName.includes(query) ||
//         course.includes(query);

//       const matchesTeacher =
//         !filterTeacher || teacherLoginId === filterTeacher;

//       const matchesCourse =
//         !filterCourse || submission?.courseName === filterCourse;

//       return matchesSearch && matchesTeacher && matchesCourse;
//     });
//   }, [submissions, searchTerm, filterTeacher, filterCourse]);

//   const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE));
//   const currentSafePage = Math.min(currentPage, totalPages);
//   const startIndex = (currentSafePage - 1) * ITEMS_PER_PAGE;
//   const paginatedSubmissions = filteredSubmissions.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   const goToPage = (page) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//   };

//   if (loading) {
//     return <div className="text-lg p-6">Loading assignments...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-6 p-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">All Assignments</h1>
//             <p className="text-slate-600 mt-1">
//               Filter assignments by teacher, course, and search.
//             </p>
//           </div>

//           <button
//             onClick={() => router.push('/admin')}
//             className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
//           >
//             ← Back to Dashboard
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
//           {error}
//         </div>
//       )}

//       <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">All Submissions</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">{submissions.length}</h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Filtered</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">{filteredSubmissions.length}</h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Teachers</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">{teacherOptions.length}</h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Page</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {currentSafePage}/{totalPages}
//           </h2>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//         <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search title, student, teacher, course..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <select
//             value={filterTeacher}
//             onChange={(e) => setFilterTeacher(e.target.value)}
//             className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Teachers</option>
//             {teacherOptions.map((teacher) => (
//               <option key={teacher._id} value={teacher.loginId}>
//                 {teacher.name} {teacher.subject ? `(${teacher.subject})` : ''}
//               </option>
//             ))}
//           </select>

//           <select
//             value={filterCourse}
//             onChange={(e) => setFilterCourse(e.target.value)}
//             className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Courses</option>
//             {courseOptions.map((course) => (
//               <option key={course} value={course}>
//                 {course}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={() => {
//               setSearchTerm('');
//               setFilterTeacher('');
//               setFilterCourse('');
//               setCurrentPage(1);
//             }}
//             className="bg-slate-100 text-slate-700 rounded-xl px-4 py-3 hover:bg-slate-200"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="hidden lg:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Student</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Teacher</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Marks</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Submitted</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedSubmissions.map((submission) => (
//                 <tr key={submission._id} className="border-t border-slate-200 hover:bg-slate-50">
//                   <td className="px-5 py-4">{submission.studentName || '-'}</td>
//                   <td className="px-5 py-4">{submission.title || '-'}</td>
//                   <td className="px-5 py-4">
//                     {submission.teacherName || submission.teacherLoginId || '-'}
//                   </td>
//                   <td className="px-5 py-4">{submission.courseName || '-'}</td>
//                   <td className="px-5 py-4">{submission.status || 'Submitted'}</td>
//                   <td className="px-5 py-4">{submission.marks ?? '-'}</td>
//                   <td className="px-5 py-4">
//                     {submission.createdAt
//                       ? new Date(submission.createdAt).toLocaleDateString()
//                       : '-'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="lg:hidden p-4 space-y-4">
//           {paginatedSubmissions.map((submission) => (
//             <div key={submission._id} className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
//               <h3 className="font-semibold text-slate-900">{submission.title || '-'}</h3>
//               <div className="mt-3 space-y-1 text-sm text-slate-700">
//                 <p><span className="font-medium">Student:</span> {submission.studentName || '-'}</p>
//                 <p><span className="font-medium">Teacher:</span> {submission.teacherName || submission.teacherLoginId || '-'}</p>
//                 <p><span className="font-medium">Course:</span> {submission.courseName || '-'}</p>
//                 <p><span className="font-medium">Status:</span> {submission.status || 'Submitted'}</p>
//                 <p><span className="font-medium">Marks:</span> {submission.marks ?? '-'}</p>
//                 <p><span className="font-medium">Submitted:</span> {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : '-'}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredSubmissions.length === 0 && (
//           <div className="text-center py-14">
//             <p className="text-slate-700 font-medium">No assignments found.</p>
//             <p className="text-slate-500 text-sm mt-1">
//               Check API data or clear filters.
//             </p>
//           </div>
//         )}

//         {filteredSubmissions.length > 0 && (
//           <div className="border-t border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
//             <p className="text-sm text-slate-600">
//               Showing {startIndex + 1} to{' '}
//               {Math.min(startIndex + ITEMS_PER_PAGE, filteredSubmissions.length)} of{' '}
//               {filteredSubmissions.length}
//             </p>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => goToPage(currentSafePage - 1)}
//                 disabled={currentSafePage === 1}
//                 className="px-4 py-2 rounded-lg border border-slate-300 bg-white disabled:opacity-50"
//               >
//                 Previous
//               </button>

//               <span className="text-sm font-medium text-slate-700 px-2">
//                 {currentSafePage} / {totalPages}
//               </span>

//               <button
//                 onClick={() => goToPage(currentSafePage + 1)}
//                 disabled={currentSafePage === totalPages}
//                 className="px-4 py-2 rounded-lg border border-slate-300 bg-white disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 5;

export default function AdminAssignmentsPage() {
  const router = useRouter();

  const [submissions, setSubmissions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterTeacher, filterCourse]);

  const checkAuthAndLoad = async () => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const user = JSON.parse(savedUser);

      if (user.role !== 'ADMIN') {
        router.push('/');
        return;
      }

      await loadData();
    } catch (err) {
      console.error('AUTH ERROR:', err);
      localStorage.removeItem('user');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setError('');

      const [subsRes, teachersRes] = await Promise.all([
        fetch('/api/submissions?limit=100', { cache: 'no-store' }),
        fetch('/api/users', { cache: 'no-store' }),
      ]);

      if (!subsRes.ok) {
        throw new Error(`Failed to load submissions (${subsRes.status})`);
      }

      if (!teachersRes.ok) {
        throw new Error(`Failed to load users (${teachersRes.status})`);
      }

      const subsData = await subsRes.json();
      const teachersData = await teachersRes.json();

      const normalizedSubmissions = Array.isArray(subsData)
        ? subsData
        : Array.isArray(subsData?.submissions)
        ? subsData.submissions
        : Array.isArray(subsData?.data)
        ? subsData.data
        : [];

      const normalizedTeachers = Array.isArray(teachersData)
        ? teachersData
        : Array.isArray(teachersData?.users)
        ? teachersData.users
        : Array.isArray(teachersData?.data)
        ? teachersData.data
        : [];

      setSubmissions(normalizedSubmissions);
      setTeachers(normalizedTeachers);
    } catch (err) {
      console.error('LOAD ERROR:', err);
      setError(err.message || 'Failed to load submissions');
      setSubmissions([]);
      setTeachers([]);
    }
  };

  const teacherOptions = useMemo(() => {
    return teachers
      .filter((teacher) => teacher?.role === 'TEACHER' || teacher?.subject)
      .map((teacher) => ({
        _id: teacher._id,
        loginId: teacher.loginId || '',
        name: teacher.name || '',
        subject: teacher.subject || '',
      }))
      .filter((teacher) => teacher.loginId && teacher.name);
  }, [teachers]);

  const courseOptions = useMemo(() => {
    const courses = submissions
      .map((item) => item.courseName || '')
      .filter(Boolean);

    return [...new Set(courses)].sort();
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return submissions.filter((submission) => {
      const title = (submission?.title || '').toLowerCase();
      const studentName = (submission?.studentName || '').toLowerCase();
      const teacherName = (submission?.teacherName || '').toLowerCase();
      const teacherLoginId = submission?.teacherLoginId || '';
      const course = (submission?.courseName || '').toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        studentName.includes(query) ||
        teacherName.includes(query) ||
        course.includes(query);

      const matchesTeacher =
        !filterTeacher || teacherLoginId === filterTeacher;

      const matchesCourse =
        !filterCourse || submission?.courseName === filterCourse;

      return matchesSearch && matchesTeacher && matchesCourse;
    });
  }, [submissions, searchTerm, filterTeacher, filterCourse]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)
  );

  const currentSafePage = Math.min(currentPage, totalPages);
  const startIndex = (currentSafePage - 1) * ITEMS_PER_PAGE;

  const paginatedSubmissions = filteredSubmissions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (loading) {
    return <div className="text-lg p-6">Loading assignments...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">All Assignments</h1>
            <p className="text-slate-600 mt-1">
              Filter assignments by teacher, course, and search.
            </p>
          </div>

          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">All Submissions</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">{submissions.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Filtered</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">{filteredSubmissions.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Teachers</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">{teacherOptions.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Page</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {currentSafePage}/{totalPages}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search title, student, teacher, course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterTeacher}
            onChange={(e) => setFilterTeacher(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Teachers</option>
            {teacherOptions.map((teacher) => (
              <option key={teacher._id} value={teacher.loginId}>
                {teacher.name} {teacher.subject ? `(${teacher.subject})` : ''}
              </option>
            ))}
          </select>

          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Courses</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setFilterTeacher('');
              setFilterCourse('');
              setCurrentPage(1);
            }}
            className="bg-slate-100 text-slate-700 rounded-xl px-4 py-3 hover:bg-slate-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Student</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Teacher</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Marks</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubmissions.map((submission) => (
                <tr key={submission._id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-5 py-4">{submission.studentName || '-'}</td>
                  <td className="px-5 py-4">{submission.title || '-'}</td>
                  <td className="px-5 py-4">
                    {submission.teacherName || submission.teacherLoginId || '-'}
                  </td>
                  <td className="px-5 py-4">{submission.courseName || '-'}</td>
                  <td className="px-5 py-4">{submission.status || 'Submitted'}</td>
                  <td className="px-5 py-4">{submission.marks ?? '-'}</td>
                  <td className="px-5 py-4">
                    {submission.createdAt
                      ? new Date(submission.createdAt).toLocaleDateString()
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden p-4 space-y-4">
          {paginatedSubmissions.map((submission) => (
            <div key={submission._id} className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
              <h3 className="font-semibold text-slate-900">{submission.title || '-'}</h3>
              <div className="mt-3 space-y-1 text-sm text-slate-700">
                <p><span className="font-medium">Student:</span> {submission.studentName || '-'}</p>
                <p><span className="font-medium">Teacher:</span> {submission.teacherName || submission.teacherLoginId || '-'}</p>
                <p><span className="font-medium">Course:</span> {submission.courseName || '-'}</p>
                <p><span className="font-medium">Status:</span> {submission.status || 'Submitted'}</p>
                <p><span className="font-medium">Marks:</span> {submission.marks ?? '-'}</p>
                <p><span className="font-medium">Submitted:</span> {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-14">
            <p className="text-slate-700 font-medium">No assignments found.</p>
            <p className="text-slate-500 text-sm mt-1">
              Check API data or clear filters.
            </p>
          </div>
        )}

        {filteredSubmissions.length > 0 && (
          <div className="border-t border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
            <p className="text-sm text-slate-600">
              Showing {startIndex + 1} to{' '}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredSubmissions.length)} of{' '}
              {filteredSubmissions.length}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentSafePage - 1)}
                disabled={currentSafePage === 1}
                className="px-4 py-2 rounded-lg border border-slate-300 bg-white disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm font-medium text-slate-700 px-2">
                {currentSafePage} / {totalPages}
              </span>

              <button
                onClick={() => goToPage(currentSafePage + 1)}
                disabled={currentSafePage === totalPages}
                className="px-4 py-2 rounded-lg border border-slate-300 bg-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}