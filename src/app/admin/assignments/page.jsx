// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminAssignmentsPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');
//       if (!savedUser || JSON.parse(savedUser).role !== 'ADMIN') {
//         router.push('/');
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       router.push('/');
//     }
//   }, [router]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold">Assignments (Coming Soon)</h1>
//           <button
//             onClick={() => router.push('/admin')}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//           >
//             ← Back to Admin
//           </button>
//         </div>
//         <div className="text-center py-16">
//           <h2 className="text-2xl font-semibold text-slate-600 mb-4">
//             Assignment management will be added here
//           </h2>
//           <p className="text-slate-500">
//             User management is now working with MongoDB + Mongoose ✅
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminAssignmentsPage() {
//   const router = useRouter();
//   const [submissions, setSubmissions] = useState([]);
//   const [filteredSubmissions, setFilteredSubmissions] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterTeacher, setFilterTeacher] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, []);

//   useEffect(() => {
//     filterSubmissions();
//   }, [submissions, filterTeacher, searchTerm]);

//   const checkAuthAndLoad = async () => {
//     try {
//       const savedUser = localStorage.getItem('user');
//       if (!savedUser || JSON.parse(savedUser).role !== 'ADMIN') {
//         router.push('/');
//         return;
//       }
//       await loadData();
//     } catch (error) {
//       router.push('/');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadData = async () => {
//     try {
//       const [subsRes, teachersRes] = await Promise.all([
//         fetch('/api/submissions'),
//         fetch('/api/users?role=TEACHER')
//       ]);
      
//       const submissions = await subsRes.json();
//       const teachersData = await teachersRes.json();
      
//       setSubmissions(submissions);
//       setTeachers(teachersData);
//     } catch (error) {
//       console.error('Load error:', error);
//     }
//   };

//   const filterSubmissions = useCallback(() => {
//     let filtered = submissions.filter(submission =>
//       submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       submission.studentName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (filterTeacher) {
//       filtered = filtered.filter(sub => sub.teacherLoginId === filterTeacher);
//     }

//     setFilteredSubmissions(filtered);
//   }, [submissions, searchTerm, filterTeacher]);

//   if (loading) return <div className="p-6 text-lg">Loading assignments...</div>;

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">All Submissions</h1>
//           <button
//             onClick={() => router.push('/admin')}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             ← Back to Dashboard
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
//           <input
//             type="text"
//             placeholder="Search by title, student name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={filterTeacher}
//             onChange={(e) => setFilterTeacher(e.target.value)}
//             className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Teachers</option>
//             {teachers.map(teacher => (
//               <option key={teacher._id} value={teacher.loginId}>
//                 {teacher.name} ({teacher.subject})
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={() => {
//               setSearchTerm('');
//               setFilterTeacher('');
//             }}
//             className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
//           >
//             Clear Filters
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-slate-50">
//                 <th className="border p-3 text-left">Student</th>
//                 <th className="border p-3 text-left">Title</th>
//                 <th className="border p-3 text-left">Teacher</th>
//                 <th className="border p-3 text-left">Status</th>
//                 <th className="border p-3 text-left">Marks</th>
//                 <th className="border p-3 text-left">Submitted</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSubmissions.slice(0, 50).map((submission) => (
//                 <tr key={submission._id} className="hover:bg-slate-50">
//                   <td className="border p-3">{submission.studentName}</td>
//                   <td className="border p-3">{submission.title}</td>
//                   <td className="border p-3">{submission.teacherName || 'Pending'}</td>
//                   <td className="border p-3">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       submission.status === 'Checked' ? 'bg-green-100 text-green-800' :
//                       submission.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {submission.status}
//                     </span>
//                   </td>
//                   <td className="border p-3">{submission.marks || '-'}</td>
//                   <td className="border p-3">
//                     {new Date(submission.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredSubmissions.length === 0 && (
//           <p className="text-slate-600 text-center py-12">No submissions found matching your criteria.</p>
//         )}
//       </div>
//     </div>
//   );
// }


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
//   const [filterClass, setFilterClass] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterTeacher, filterClass]);

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
//         fetch('/api/submissions', {
//           method: 'GET',
//           cache: 'no-store',
//         }),
//         fetch('/api/users?role=TEACHER', {
//           method: 'GET',
//           cache: 'no-store',
//         }),
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

//       if (!subsRes.ok) {
//         setError(subsData?.message || 'Failed to load submissions');
//       }

//       if (!teachersRes.ok) {
//         setError((prev) => prev || teachersData?.message || 'Failed to load teachers');
//       }
//     } catch (err) {
//       console.error('LOAD ERROR:', err);
//       setSubmissions([]);
//       setTeachers([]);
//       setError('Something went wrong while loading assignments');
//     }
//   };

//   const classOptions = useMemo(() => {
//     const classes = submissions
//       .map((item) => item.className || item.class || '')
//       .filter(Boolean);

//     return [...new Set(classes)].sort();
//   }, [submissions]);

//   const filteredSubmissions = useMemo(() => {
//     const query = searchTerm.trim().toLowerCase();

//     return submissions.filter((submission) => {
//       const title = (submission?.title || '').toLowerCase();
//       const studentName = (submission?.studentName || '').toLowerCase();
//       const teacherName = (submission?.teacherName || '').toLowerCase();
//       const teacherLoginId = submission?.teacherLoginId || '';
//       const className = submission?.className || submission?.class || '';

//       const matchesSearch =
//         !query ||
//         title.includes(query) ||
//         studentName.includes(query) ||
//         teacherName.includes(query);

//       const matchesTeacher =
//         !filterTeacher || teacherLoginId === filterTeacher;

//       const matchesClass =
//         !filterClass || className === filterClass;

//       return matchesSearch && matchesTeacher && matchesClass;
//     });
//   }, [submissions, searchTerm, filterTeacher, filterClass]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)
//   );

//   const safeCurrentPage = Math.min(currentPage, totalPages);
//   const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
//   const paginatedSubmissions = filteredSubmissions.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   const goToPage = (page) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//   };

//   const renderPageButtons = () => {
//     const pages = [];

//     for (let i = 1; i <= totalPages; i++) {
//       const shouldShow =
//         i === 1 ||
//         i === totalPages ||
//         (i >= safeCurrentPage - 1 && i <= safeCurrentPage + 1);

//       if (shouldShow) {
//         pages.push(
//           <button
//             key={i}
//             onClick={() => goToPage(i)}
//             className={`h-10 min-w-[40px] rounded-lg px-3 text-sm font-medium border transition ${
//               safeCurrentPage === i
//                 ? 'bg-slate-900 text-white border-slate-900'
//                 : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
//             }`}
//           >
//             {i}
//           </button>
//         );
//       } else {
//         const lastItem = pages[pages.length - 1];
//         if (lastItem?.key !== `ellipsis-${i}` && lastItem?.type !== 'span') {
//           pages.push(
//             <span
//               key={`ellipsis-${i}`}
//               className="px-1 text-slate-400"
//             >
//               ...
//             </span>
//           );
//         }
//       }
//     }

//     return pages;
//   };

//   const getStatusClasses = (status) => {
//     if (status === 'Checked') {
//       return 'bg-green-100 text-green-700 border border-green-200';
//     }
//     if (status === 'Under Review') {
//       return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
//     }
//     return 'bg-blue-100 text-blue-700 border border-blue-200';
//   };

//   if (loading) {
//     return <div className="text-lg">Loading assignments...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">All Assignments</h1>
//             <p className="text-slate-600 mt-1">
//               View submissions by teacher, class, and search term.
//             </p>
//           </div>

//           <button
//             onClick={() => router.push('/admin')}
//             className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700"
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

//       <div className="grid lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Total Submissions</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {submissions.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Filtered Results</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {filteredSubmissions.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Teachers</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {teachers.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Page</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {safeCurrentPage}/{totalPages}
//           </h2>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
//         <div>
//           <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
//           <p className="text-sm text-slate-600 mt-1">
//             Search by title, student name, or teacher name.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Search
//             </label>
//             <input
//               type="text"
//               placeholder="Search assignments..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Teacher
//             </label>
//             <select
//               value={filterTeacher}
//               onChange={(e) => setFilterTeacher(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Teachers</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher.loginId}>
//                   {teacher.name} {teacher.subject ? `(${teacher.subject})` : ''}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Class
//             </label>
//             <select
//               value={filterClass}
//               onChange={(e) => setFilterClass(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Classes</option>
//               {classOptions.map((className) => (
//                 <option key={className} value={className}>
//                   {className}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-end">
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setFilterTeacher('');
//                 setFilterClass('');
//                 setCurrentPage(1);
//               }}
//               className="w-full rounded-xl bg-slate-100 text-slate-700 px-4 py-3 font-medium hover:bg-slate-200"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
//           <div>
//             <h2 className="text-xl font-semibold text-slate-900">Assignments List</h2>
//             <p className="text-sm text-slate-600 mt-1">
//               Showing {paginatedSubmissions.length} of {filteredSubmissions.length} results
//             </p>
//           </div>
//         </div>

//         {/* Desktop table */}
//         <div className="hidden lg:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Student</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Teacher</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Class</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Marks</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Submitted</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedSubmissions.map((submission) => (
//                 <tr key={submission._id} className="border-t border-slate-200 hover:bg-slate-50">
//                   <td className="px-5 py-4 text-slate-800 font-medium">
//                     {submission.studentName || 'N/A'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.title || 'Untitled'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.teacherName || submission.teacherLoginId || 'Pending'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.className || submission.class || '-'}
//                   </td>
//                   <td className="px-5 py-4">
//                     <span
//                       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                         submission.status
//                       )}`}
//                     >
//                       {submission.status || 'Submitted'}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.marks ?? '-'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.createdAt
//                       ? new Date(submission.createdAt).toLocaleDateString()
//                       : '-'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile cards */}
//         <div className="lg:hidden p-4 space-y-4">
//           {paginatedSubmissions.map((submission) => (
//             <div
//               key={submission._id}
//               className="border border-slate-200 rounded-2xl p-4 bg-slate-50"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <h3 className="font-semibold text-slate-900">
//                     {submission.title || 'Untitled'}
//                   </h3>
//                   <p className="text-sm text-slate-600 mt-1">
//                     Student: {submission.studentName || 'N/A'}
//                   </p>
//                 </div>

//                 <span
//                   className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${getStatusClasses(
//                     submission.status
//                   )}`}
//                 >
//                   {submission.status || 'Submitted'}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
//                 <div>
//                   <p className="text-slate-500">Teacher</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.teacherName || submission.teacherLoginId || 'Pending'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500">Class</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.className || submission.class || '-'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500">Marks</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.marks ?? '-'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500">Submitted</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.createdAt
//                       ? new Date(submission.createdAt).toLocaleDateString()
//                       : '-'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredSubmissions.length === 0 && (
//           <div className="px-6 py-14 text-center">
//             <p className="text-slate-700 font-medium">No assignments found.</p>
//             <p className="text-slate-500 text-sm mt-1">
//               Try changing teacher, class, or search filters.
//             </p>
//           </div>
//         )}

//         {filteredSubmissions.length > 0 && (
//           <div className="border-t border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
//             <p className="text-sm text-slate-600">
//               Page {safeCurrentPage} of {totalPages} • {filteredSubmissions.length} total results
//             </p>

//             <div className="flex items-center gap-2 flex-wrap justify-center">
//               <button
//                 onClick={() => goToPage(safeCurrentPage - 1)}
//                 disabled={safeCurrentPage === 1}
//                 className="h-10 rounded-lg px-4 border border-slate-300 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
//               >
//                 Previous
//               </button>

//               {renderPageButtons()}

//               <button
//                 onClick={() => goToPage(safeCurrentPage + 1)}
//                 disabled={safeCurrentPage === totalPages}
//                 className="h-10 rounded-lg px-4 border border-slate-300 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
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
//   const [filterSection, setFilterSection] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterTeacher, filterCourse, filterSection]);

//   useEffect(() => {
//     setFilterSection('');
//   }, [filterCourse]);

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
//         fetch('/api/users?role=TEACHER', { cache: 'no-store' }),
//       ]);

//       const subsJson = await subsRes.json();
//       const teachersJson = await teachersRes.json();

//       const normalizedSubmissions = Array.isArray(subsJson)
//         ? subsJson
//         : Array.isArray(subsJson?.submissions)
//         ? subsJson.submissions
//         : Array.isArray(subsJson?.data)
//         ? subsJson.data
//         : [];

//       const teacherSource = Array.isArray(teachersJson)
//         ? teachersJson
//         : Array.isArray(teachersJson?.users)
//         ? teachersJson.users
//         : Array.isArray(teachersJson?.data)
//         ? teachersJson.data
//         : [];

//       const normalizedTeachers = teacherSource.filter(
//         (user) => user?.role === 'TEACHER'
//       );

//       setSubmissions(normalizedSubmissions);
//       setTeachers(normalizedTeachers);

//       if (!subsRes.ok) {
//         setError(subsJson?.message || 'Failed to load assignments');
//       }

//       if (!teachersRes.ok) {
//         setError((prev) => prev || teachersJson?.message || 'Failed to load teachers');
//       }
//     } catch (err) {
//       console.error('LOAD ERROR:', err);
//       setError('Something went wrong while loading data');
//       setSubmissions([]);
//       setTeachers([]);
//     }
//   };

//   const courseOptions = useMemo(() => {
//     const courses = submissions
//       .map((item) => item?.course || item?.courseName || '')
//       .filter(Boolean);

//     return [...new Set(courses)].sort();
//   }, [submissions]);

//   const sectionOptions = useMemo(() => {
//     const sectionSource = submissions.filter((item) => {
//       const course = item?.course || item?.courseName || '';
//       return !filterCourse || course === filterCourse;
//     });

//     const sections = sectionSource
//       .map((item) => item?.section || '')
//       .filter(Boolean);

//     return [...new Set(sections)].sort();
//   }, [submissions, filterCourse]);

//   const filteredSubmissions = useMemo(() => {
//     const query = searchTerm.trim().toLowerCase();

//     return submissions.filter((submission) => {
//       const title = (submission?.title || '').toLowerCase();
//       const studentName = (submission?.studentName || '').toLowerCase();
//       const teacherLoginId = submission?.teacherLoginId || '';
//       const course = submission?.course || submission?.courseName || '';
//       const section = submission?.section || '';

//       const matchesSearch =
//         !query || title.includes(query) || studentName.includes(query);

//       const matchesTeacher =
//         !filterTeacher || teacherLoginId === filterTeacher;

//       const matchesCourse =
//         !filterCourse || course === filterCourse;

//       const matchesSection =
//         !filterSection || section === filterSection;

//       return (
//         matchesSearch &&
//         matchesTeacher &&
//         matchesCourse &&
//         matchesSection
//       );
//     });
//   }, [submissions, searchTerm, filterTeacher, filterCourse, filterSection]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)
//   );

//   const safeCurrentPage = Math.min(currentPage, totalPages);

//   const paginatedSubmissions = useMemo(() => {
//     const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
//     return filteredSubmissions.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredSubmissions, safeCurrentPage]);

//   const goToPage = (page) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//   };

//   const getStatusClasses = (status) => {
//     if (status === 'Checked') {
//       return 'bg-green-100 text-green-700 border border-green-200';
//     }
//     if (status === 'Under Review') {
//       return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
//     }
//     return 'bg-blue-100 text-blue-700 border border-blue-200';
//   };

//   if (loading) {
//     return <div className="text-lg">Loading assignments...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">All Assignments</h1>
//             <p className="text-slate-600 mt-1">
//               Browse all assignments by teacher, course, and section.
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
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//           <p className="text-sm text-slate-500">Total Assignments</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {submissions.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//           <p className="text-sm text-slate-500">Filtered Results</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {filteredSubmissions.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//           <p className="text-sm text-slate-500">Teachers</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {teachers.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
//           <p className="text-sm text-slate-500">Page</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {safeCurrentPage}/{totalPages}
//           </h2>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//         <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
//           <div className="xl:col-span-2">
//             <label className="block text-sm font-medium mb-1">Search</label>
//             <input
//               type="text"
//               placeholder="Search by student name or assignment title"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Teacher</label>
//             <select
//               value={filterTeacher}
//               onChange={(e) => setFilterTeacher(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Teachers</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher.loginId}>
//                   {teacher.name} {teacher.subject ? `(${teacher.subject})` : ''}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Course</label>
//             <select
//               value={filterCourse}
//               onChange={(e) => setFilterCourse(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Courses</option>
//               {courseOptions.map((course) => (
//                 <option key={course} value={course}>
//                   {course}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Section</label>
//             <select
//               value={filterSection}
//               onChange={(e) => setFilterSection(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Sections</option>
//               {sectionOptions.map((section) => (
//                 <option key={section} value={section}>
//                   {section}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={() => {
//               setSearchTerm('');
//               setFilterTeacher('');
//               setFilterCourse('');
//               setFilterSection('');
//               setCurrentPage(1);
//             }}
//             className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//           <div>
//             <h2 className="text-xl font-semibold text-slate-900">Assignments List</h2>
//             <p className="text-sm text-slate-600 mt-1">
//               Showing {paginatedSubmissions.length} of {filteredSubmissions.length} assignments
//             </p>
//           </div>
//         </div>

//         <div className="hidden lg:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Student</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Assignment</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Teacher</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Section</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Marks</th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedSubmissions.map((submission) => (
//                 <tr key={submission._id} className="border-t border-slate-200 hover:bg-slate-50">
//                   <td className="px-5 py-4 font-medium text-slate-900">
//                     {submission.studentName || '-'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.title || '-'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.teacherName || submission.teacherLoginId || '-'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.course || submission.courseName || '-'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.section || '-'}
//                   </td>
//                   <td className="px-5 py-4">
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(submission.status)}`}>
//                       {submission.status || 'Submitted'}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.marks ?? '-'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
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
//             <div key={submission._id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <h3 className="font-semibold text-slate-900">
//                     {submission.title || '-'}
//                   </h3>
//                   <p className="text-sm text-slate-600 mt-1">
//                     {submission.studentName || '-'}
//                   </p>
//                 </div>
//                 <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(submission.status)}`}>
//                   {submission.status || 'Submitted'}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
//                 <div>
//                   <p className="text-slate-500">Teacher</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.teacherName || submission.teacherLoginId || '-'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500">Course</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.course || submission.courseName || '-'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500">Section</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.section || '-'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-slate-500">Marks</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.marks ?? '-'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredSubmissions.length === 0 && (
//           <div className="px-6 py-14 text-center">
//             <p className="text-slate-700 font-medium">No assignments found.</p>
//             <p className="text-slate-500 text-sm mt-1">
//               Try another search term or change filters.
//             </p>
//           </div>
//         )}

//         {filteredSubmissions.length > 0 && (
//           <div className="border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <p className="text-sm text-slate-600">
//               Page {safeCurrentPage} of {totalPages}
//             </p>

//             <div className="flex items-center gap-2 flex-wrap justify-center">
//               <button
//                 onClick={() => goToPage(safeCurrentPage - 1)}
//                 disabled={safeCurrentPage === 1}
//                 className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50"
//               >
//                 Previous
//               </button>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => goToPage(page)}
//                   className={`min-w-[40px] h-10 px-3 rounded-lg border ${
//                     safeCurrentPage === page
//                       ? 'bg-slate-900 text-white border-slate-900'
//                       : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}

//               <button
//                 onClick={() => goToPage(safeCurrentPage + 1)}
//                 disabled={safeCurrentPage === totalPages}
//                 className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-50"
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
//   const [filterClass, setFilterClass] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterTeacher, filterClass]);

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
//         fetch('/api/submissions', {
//           method: 'GET',
//           cache: 'no-store',
//         }),
//         fetch('/api/users?role=TEACHER', {
//           method: 'GET',
//           cache: 'no-store',
//         }),
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

//       if (!subsRes.ok) {
//         setError(subsData?.message || 'Failed to load submissions');
//       }

//       if (!teachersRes.ok) {
//         setError((prev) => prev || teachersData?.message || 'Failed to load teachers');
//       }
//     } catch (err) {
//       console.error('LOAD ERROR:', err);
//       setSubmissions([]);
//       setTeachers([]);
//       setError('Something went wrong while loading assignments');
//     }
//   };

//   const classOptions = useMemo(() => {
//     const classes = submissions
//       .map((item) => item.className || item.class || '')
//       .filter(Boolean);

//     return [...new Set(classes)].sort();
//   }, [submissions]);

//   const filteredSubmissions = useMemo(() => {
//     const query = searchTerm.trim().toLowerCase();

//     return submissions.filter((submission) => {
//       const title = (submission?.title || '').toLowerCase();
//       const studentName = (submission?.studentName || '').toLowerCase();
//       const teacherName = (submission?.teacherName || '').toLowerCase();
//       const teacherLoginId = submission?.teacherLoginId || '';
//       const className = submission?.className || submission?.class || '';

//       const matchesSearch =
//         !query ||
//         title.includes(query) ||
//         studentName.includes(query) ||
//         teacherName.includes(query);

//       const matchesTeacher = !filterTeacher || teacherLoginId === filterTeacher;
//       const matchesClass = !filterClass || className === filterClass;

//       return matchesSearch && matchesTeacher && matchesClass;
//     });
//   }, [submissions, searchTerm, filterTeacher, filterClass]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE)
//   );

//   const safeCurrentPage = Math.min(currentPage, totalPages);
//   const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

//   const paginatedSubmissions = filteredSubmissions.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   const goToPage = (page) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//   };

//   const getStatusClasses = (status) => {
//     if (status === 'Checked') {
//       return 'bg-green-100 text-green-700 border border-green-200';
//     }
//     if (status === 'Under Review') {
//       return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
//     }
//     return 'bg-blue-100 text-blue-700 border border-blue-200';
//   };

//   const renderPageButtons = () => {
//     const buttons = [];

//     for (let i = 1; i <= totalPages; i++) {
//       const shouldShow =
//         i === 1 ||
//         i === totalPages ||
//         (i >= safeCurrentPage - 1 && i <= safeCurrentPage + 1);

//       if (shouldShow) {
//         buttons.push(
//           <button
//             key={i}
//             onClick={() => goToPage(i)}
//             className={`h-10 min-w-[40px] rounded-lg px-3 text-sm font-medium border ${
//               safeCurrentPage === i
//                 ? 'bg-slate-900 text-white border-slate-900'
//                 : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
//             }`}
//           >
//             {i}
//           </button>
//         );
//       } else {
//         const last = buttons[buttons.length - 1];
//         if (!last || last.type !== 'span') {
//           buttons.push(
//             <span key={`ellipsis-${i}`} className="px-1 text-slate-400">
//               ...
//             </span>
//           );
//         }
//       }
//     }

//     return buttons;
//   };

//   if (loading) {
//     return <div className="text-lg">Loading assignments...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto space-y-6">
//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">All Assignments</h1>
//             <p className="text-slate-600 mt-1">
//               View all submissions by teacher and class with smart filters.
//             </p>
//           </div>

//           <button
//             onClick={() => router.push('/admin')}
//             className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700"
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
//           <p className="text-sm text-slate-500">Total Submissions</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {submissions.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Filtered Results</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {filteredSubmissions.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Teachers</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {teachers.length}
//           </h2>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
//           <p className="text-sm text-slate-500">Current Page</p>
//           <h2 className="text-3xl font-bold text-slate-900 mt-2">
//             {safeCurrentPage}/{totalPages}
//           </h2>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
//         <div>
//           <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
//           <p className="text-sm text-slate-600 mt-1">
//             Search assignments and filter by teacher or class.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Search
//             </label>
//             <input
//               type="text"
//               placeholder="Search title, student, teacher..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Teacher
//             </label>
//             <select
//               value={filterTeacher}
//               onChange={(e) => setFilterTeacher(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Teachers</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher.loginId}>
//                   {teacher.name} {teacher.subject ? `(${teacher.subject})` : ''}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Class
//             </label>
//             <select
//               value={filterClass}
//               onChange={(e) => setFilterClass(e.target.value)}
//               className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Classes</option>
//               {classOptions.map((className) => (
//                 <option key={className} value={className}>
//                   {className}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-end">
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setFilterTeacher('');
//                 setFilterClass('');
//                 setCurrentPage(1);
//               }}
//               className="w-full rounded-xl bg-slate-100 text-slate-700 px-4 py-3 font-medium hover:bg-slate-200"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//         <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
//           <div>
//             <h2 className="text-xl font-semibold text-slate-900">Assignments List</h2>
//             <p className="text-sm text-slate-600 mt-1">
//               Showing {paginatedSubmissions.length} of {filteredSubmissions.length} results
//             </p>
//           </div>
//         </div>

//         <div className="hidden lg:block overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
//                   Student
//                 </th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
//                   Title
//                 </th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
//                   Teacher
//                 </th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
//                   Class
//                 </th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
//                   Status
//                 </th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
//                   Marks
//                 </th>
//                 <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
//                   Submitted
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedSubmissions.map((submission) => (
//                 <tr
//                   key={submission._id}
//                   className="border-t border-slate-200 hover:bg-slate-50"
//                 >
//                   <td className="px-5 py-4 text-slate-800 font-medium">
//                     {submission.studentName || 'N/A'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.title || 'Untitled'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.teacherName || submission.teacherLoginId || 'Pending'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.className || submission.class || '-'}
//                   </td>
//                   <td className="px-5 py-4">
//                     <span
//                       className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                         submission.status
//                       )}`}
//                     >
//                       {submission.status || 'Submitted'}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
//                     {submission.marks ?? '-'}
//                   </td>
//                   <td className="px-5 py-4 text-slate-700">
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
//             <div
//               key={submission._id}
//               className="border border-slate-200 rounded-2xl p-4 bg-slate-50"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <h3 className="font-semibold text-slate-900">
//                     {submission.title || 'Untitled'}
//                   </h3>
//                   <p className="text-sm text-slate-600 mt-1">
//                     Student: {submission.studentName || 'N/A'}
//                   </p>
//                 </div>

//                 <span
//                   className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${getStatusClasses(
//                     submission.status
//                   )}`}
//                 >
//                   {submission.status || 'Submitted'}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
//                 <div>
//                   <p className="text-slate-500">Teacher</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.teacherName || submission.teacherLoginId || 'Pending'}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-slate-500">Class</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.className || submission.class || '-'}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-slate-500">Marks</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.marks ?? '-'}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-slate-500">Submitted</p>
//                   <p className="font-medium text-slate-800">
//                     {submission.createdAt
//                       ? new Date(submission.createdAt).toLocaleDateString()
//                       : '-'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredSubmissions.length === 0 && (
//           <div className="px-6 py-14 text-center">
//             <p className="text-slate-700 font-medium">No assignments found.</p>
//             <p className="text-slate-500 text-sm mt-1">
//               Try changing teacher, class, or search filters.
//             </p>
//           </div>
//         )}

//         {filteredSubmissions.length > 0 && (
//           <div className="border-t border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
//             <p className="text-sm text-slate-600">
//               Page {safeCurrentPage} of {totalPages} • {filteredSubmissions.length} total results
//             </p>

//             <div className="flex items-center gap-2 flex-wrap justify-center">
//               <button
//                 onClick={() => goToPage(safeCurrentPage - 1)}
//                 disabled={safeCurrentPage === 1}
//                 className="h-10 rounded-lg px-4 border border-slate-300 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
//               >
//                 Previous
//               </button>

//               {renderPageButtons()}

//               <button
//                 onClick={() => goToPage(safeCurrentPage + 1)}
//                 disabled={safeCurrentPage === totalPages}
//                 className="h-10 rounded-lg px-4 border border-slate-300 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
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
        fetch('/api/submissions', { cache: 'no-store' }),
        fetch('/api/users?role=TEACHER', { cache: 'no-store' }),
      ]);

      const subsData = await subsRes.json();
      const teachersData = await teachersRes.json();

      console.log('SUBMISSIONS API:', subsData);
      console.log('TEACHERS API:', teachersData);

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
      setError('Failed to load submissions');
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
      .map((item) => item.course || '')
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
      const course = submission?.course || '';

      const matchesSearch =
        !query ||
        title.includes(query) ||
        studentName.includes(query) ||
        teacherName.includes(query) ||
        course.toLowerCase().includes(query);

      const matchesTeacher =
        !filterTeacher || teacherLoginId === filterTeacher;

      const matchesCourse =
        !filterCourse || course === filterCourse;

      return matchesSearch && matchesTeacher && matchesCourse;
    });
  }, [submissions, searchTerm, filterTeacher, filterCourse]);

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE));
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
    return <div className="text-lg">Loading assignments...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
                  <td className="px-5 py-4">{submission.teacherName || submission.teacherLoginId || '-'}</td>
                  <td className="px-5 py-4">{submission.course || '-'}</td>
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
                <p><span className="font-medium">Course:</span> {submission.course || '-'}</p>
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