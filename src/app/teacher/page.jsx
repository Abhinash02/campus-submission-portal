
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [stats, setStats] = useState({
//     totalTeachers: 0,
//     totalStudents: 0,
//     totalSubmissions: 0,
//     submissionsByClass: {}, // New: { "Class 10A": 5, "Class 10B": 3 }
//   });
//   const [statsLoading, setStatsLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const user = JSON.parse(savedUser);

//       if (user.role !== 'TEACHER') {
//         router.push('/');
//         return;
//       }

//       setTeacher(user);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!teacher) return;

//       try {
//         setLoading(true);

//         const res = await fetch('/api/submissions');
//         const data = await res.json();

//         if (!res.ok || !data.success) {
//           console.error(data.message || 'Failed to fetch submissions');
//           return;
//         }

//         const fetchedSubmissions = data.submissions || [];
//         setSubmissions(fetchedSubmissions);

//         const initialEditableData = {};
//         fetchedSubmissions.forEach((item) => {
//           initialEditableData[item._id] = {
//             status: item.status || 'Submitted',
//             marks: item.marks ?? 0,
//             feedback: item.feedback || '',
//           };
//         });

//         setEditableData(initialEditableData);
//       } catch (error) {
//         console.error('FETCH ERROR:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [teacher]);

//   // Fetch comprehensive dashboard stats
//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       if (!teacher?.className) return;

//       try {
//         setStatsLoading(true);
//         const res = await fetch(
//           `/api/teacher/dashboard?className=${encodeURIComponent(teacher.className)}`
//         );
//         const data = await res.json();

//         if (res.ok && data.success) {
//           setStats({
//             totalTeachers: data.totalTeachers || 0,
//             totalStudents: data.totalStudents || 0,
//             totalSubmissions: data.totalSubmissions || 0,
//             submissionsByClass: data.submissionsByClass || {},
//           });
//         }
//       } catch (error) {
//         console.error('STATS FETCH ERROR:', error);
//       } finally {
//         setStatsLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, [teacher]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: field === 'marks' ? value : value,
//       },
//     }));
//   };

//   const handleUpdate = async (id) => {
//     try {
//       setSavingId(id);

//       const rowData = editableData[id];

//       const res = await fetch(`/api/submissions/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status: rowData.status,
//           marks: Number(rowData.marks) || 0,
//           feedback: rowData.feedback,
//           reviewedBy: teacher?.name || '',
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || 'Failed to update submission');
//         return;
//       }

//       setSubmissions((prev) =>
//         prev.map((item) =>
//           item._id === id
//             ? {
//                 ...item,
//                 status: rowData.status,
//                 marks: Number(rowData.marks) || 0,
//                 feedback: rowData.feedback,
//                 reviewedBy: teacher?.name || '',
//               }
//             : item
//         )
//       );

//       alert('Submission updated successfully');
//     } catch (error) {
//       console.error('UPDATE ERROR:', error);
//       alert('Something went wrong');
//     } finally {
//       setSavingId(null);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header with Logout */}
//         <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               Teacher Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Review student assignments and update marks, status, and feedback.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.push('/teacher')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Enhanced Dashboard Stats */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Main Stats */}
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-bold text-slate-900 mb-6">
//               {teacher?.className || 'N/A'} Overview
//             </h2>
//             {statsLoading ? (
//               <p className="text-slate-600">Loading stats...</p>
//             ) : (
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <div className="text-sm font-medium text-slate-500 mb-1">Total Students</div>
//                   <div className="text-4xl font-bold text-slate-900">{stats.totalStudents}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-slate-500 mb-1">Total Submissions</div>
//                   <div className="text-4xl font-bold text-slate-900">{stats.totalSubmissions}</div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Submissions by Class/Course */}
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h3 className="text-xl font-bold text-slate-900 mb-4">
//               Submissions by Class/Course
//             </h3>
//             {statsLoading ? (
//               <p className="text-slate-600">Loading...</p>
//             ) : Object.keys(stats.submissionsByClass).length === 0 ? (
//               <p className="text-slate-500 italic">No class-wise data available</p>
//             ) : (
//               <div className="space-y-3">
//                 {Object.entries(stats.submissionsByClass).map(([className, count]) => (
//                   <div key={className} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
//                     <span className="font-medium text-slate-900">{className}</span>
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
//                       {count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Submissions Table */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : submissions.length === 0 ? (
//             <p className="text-slate-600">No submissions found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-slate-100 text-left">
//                     <th className="p-3 border-b">#</th>
//                     <th className="p-3 border-b">Student</th>
//                     <th className="p-3 border-b">Login ID</th>
//                     <th className="p-3 border-b">Title</th>
//                     <th className="p-3 border-b">Subject</th>
//                     <th className="p-3 border-b">Status</th>
//                     <th className="p-3 border-b">Marks</th>
//                     <th className="p-3 border-b">Feedback</th>
//                     <th className="p-3 border-b">Reviewed By</th>
//                     <th className="p-3 border-b">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {submissions.map((item, index) => (
//                     <tr key={item._id} className="hover:bg-slate-50 align-top">
//                       <td className="p-3 border-b">{index + 1}</td>
//                       <td className="p-3 border-b">{item.studentName}</td>
//                       <td className="p-3 border-b">{item.studentLoginId}</td>
//                       <td className="p-3 border-b">{item.title}</td>
//                       <td className="p-3 border-b">{item.subject}</td>

//                       <td className="p-3 border-b">
//                         <select
//                           value={editableData[item._id]?.status || 'Submitted'}
//                           onChange={(e) =>
//                             handleChange(item._id, 'status', e.target.value)
//                           }
//                           className="border rounded-lg px-3 py-2 w-full"
//                         >
//                           <option value="Submitted">Submitted</option>
//                           <option value="Under Review">Under Review</option>
//                           <option value="Checked">Checked</option>
//                         </select>
//                       </td>

//                       <td className="p-3 border-b">
//                         <input
//                           type="number"
//                           min="0"
//                           max="100"
//                           value={editableData[item._id]?.marks ?? 0}
//                           onChange={(e) =>
//                             handleChange(item._id, 'marks', e.target.value)
//                           }
//                           className="border rounded-lg px-3 py-2 w-24"
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         <textarea
//                           value={editableData[item._id]?.feedback || ''}
//                           onChange={(e) =>
//                             handleChange(item._id, 'feedback', e.target.value)
//                           }
//                           rows={3}
//                           className="border rounded-lg px-3 py-2 w-64"
//                           placeholder="Write feedback"
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         {item.reviewedBy || 'Not reviewed'}
//                       </td>

//                       <td className="p-3 border-b">
//                         <button
//                           onClick={() => handleUpdate(item._id)}
//                           disabled={savingId === item._id}
//                           className={`px-4 py-2 rounded-lg text-white ${
//                             savingId === item._id
//                               ? 'bg-gray-400 cursor-not-allowed'
//                               : 'bg-green-600 hover:bg-green-700'
//                           }`}
//                         >
//                           {savingId === item._id ? 'Saving...' : 'Submit'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalSubmissions: 0,
//     submissionsByClass: {},
//   });

//   // 1. Read auth + role guard
//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');
//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const user = JSON.parse(savedUser);
//       if (user.role !== 'TEACHER') {
//         localStorage.removeItem('user');
//         router.push('/');
//         return;
//       }

//       setTeacher(user);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   // 2. Fetch teacher-only submissions
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!teacher) return;

//       try {
//         setLoading(true);

//         const res = await fetch('/api/submissions', {
//           headers: {
//             Authorization: `Bearer ${teacher.loginId}`,
//           },
//         });

//         const data = await res.json();

//         if (!res.ok || !data.success) {
//           toast.error(data.message || 'Failed to fetch submissions');
//           return;
//         }

//         const fetched = data.submissions || [];
//         setSubmissions(fetched);

//         const initialEditable = {};
//         fetched.forEach((item) => {
//           initialEditable[item._id] = {
//             status: item.status || 'Submitted',
//             marks: item.marks ?? 0,
//             feedback: item.feedback || '',
//           };
//         });

//         setEditableData(initialEditable);
//       } catch (error) {
//         toast.error('Network error. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [teacher]);

//   // 3. Simple stats block (can be extended later)
//   useEffect(() => {
//     if (!submissions.length) return;

//     const totalStudents = new Set(
//       submissions.map((s) => s.studentId?._id || s.studentId)
//     ).size;

//     const byClass = {};
//     submissions.forEach((s) => {
//       if (!s.className) return;
//       byClass[s.className] = (byClass[s.className] || 0) + 1;
//     });

//     setStats({
//       totalStudents,
//       totalSubmissions: submissions.length,
//       submissionsByClass: byClass,
//     });
//   }, [submissions]);

//   // 4. Handle changes
//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: field === 'marks' ? Number(value) || 0 : value,
//       },
//     }));
//   };

//   // 5. Save to DB and update UI with toast
//   const handleUpdate = async (id) => {
//     const rowData = editableData[id];
//     if (!rowData) return;

//     try {
//       const res = await fetch(`/api/submissions/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${teacher.loginId}`,
//         },
//         body: JSON.stringify({
//           status: rowData.status,
//           marks: rowData.marks,
//           feedback: rowData.feedback,
//           reviewedBy: teacher.name,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to update submission');
//         return;
//       }

//       // Optimistically update UI
//       setSubmissions((prev) =>
//         prev.map((s) =>
//           s._id === id
//             ? {
//                 ...s,
//                 status: data.assignment.status,
//                 marks: data.assignment.marks,
//                 feedback: data.assignment.feedback,
//                 reviewedBy: data.assignment.reviewedBy,
//               }
//             : s
//         )
//       );

//       toast.success('✅ Submission updated successfully');
//     } catch (error) {
//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out');
//     router.push('/');
//   };

//   if (!teacher) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header + Back + Logout */}
//         <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {teacher.name} – Submissions
//             </h1>
//             <p className="text-slate-600">
//               Review only assignments assigned to you.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.push('/teacher')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Teacher Stats */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-bold text-slate-900 mb-4">
//             Your Submissions Overview
//           </h2>

//           <div className="grid grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Students</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalStudents}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//           </div>

//           {Object.keys(stats.submissionsByClass).length > 0 && (
//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-2">
//                 Submissions by Class
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {Object.entries(stats.submissionsByClass).map(([cls, cnt]) => (
//                   <span
//                     key={cls}
//                     className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {cls}: {cnt}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Submissions Table */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : submissions.length === 0 ? (
//             <p className="text-slate-600">
//               No assignments were submitted to you yet.
//             </p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-slate-100 text-left">
//                     <th className="p-3 border-b">#</th>
//                     <th className="p-3 border-b">Student</th>
//                     <th className="p-3 border-b">Login ID</th>
//                     <th className="p-3 border-b">Title</th>
//                     <th className="p-3 border-b">Class</th>
//                     <th className="p-3 border-b">Subject</th>
//                     <th className="p-3 border-b">Status</th>
//                     <th className="p-3 border-b">Marks</th>
//                     <th className="p-3 border-b">Feedback</th>
//                     <th className="p-3 border-b">Reviewed By</th>
//                     <th className="p-3 border-b">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {submissions.map((s, i) => (
//                     <tr key={s._id} className="hover:bg-slate-50 align-top">
//                       <td className="p-3 border-b">{i + 1}</td>
//                       <td className="p-3 border-b">{s.studentName || 'Unknown'}</td>
//                       <td className="p-3 border-b">{s.studentLoginId}</td>
//                       <td className="p-3 border-b">{s.title}</td>
//                       <td className="p-3 border-b">{s.className || 'N/A'}</td>
//                       <td className="p-3 border-b">{s.subject || 'N/A'}</td>

//                       <td className="p-3 border-b">
//                         <select
//                           value={editableData[s._id]?.status || s.status}
//                           onChange={(e) =>
//                             handleChange(s._id, 'status', e.target.value)
//                           }
//                           className="border rounded-lg px-3 py-2 w-full"
//                         >
//                           <option value="Submitted">Submitted</option>
//                           <option value="Under Review">Under Review</option>
//                           <option value="Checked">Checked</option>
//                         </select>
//                       </td>

//                       <td className="p-3 border-b">
//                         <input
//                           type="number"
//                           min="0"
//                           max="100"
//                           value={editableData[s._id]?.marks ?? 0}
//                           onChange={(e) =>
//                             handleChange(s._id, 'marks', e.target.value)
//                           }
//                           className="border rounded-lg px-3 py-2 w-20"
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         <textarea
//                           value={editableData[s._id]?.feedback || ''}
//                           onChange={(e) =>
//                             handleChange(s._id, 'feedback', e.target.value)
//                           }
//                           rows={3}
//                           className="border rounded-lg px-3 py-2 w-64"
//                           placeholder="Write feedback"
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         {s.reviewedBy || 'Not reviewed'}
//                       </td>

//                       <td className="p-3 border-b">
//                         <button
//                           onClick={() => handleUpdate(s._id)}
//                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                         >
//                           Save
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();

//   const [teacher, setTeacher] = useState(null);
//   const [teacherInfo, setTeacherInfo] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);

//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalSubmissions: 0,
//     submissionsByCourse: {},
//   });

//   const [filters, setFilters] = useState({
//     search: '',
//     course: '',
//     status: '',
//     page: 1,
//     limit: 5,
//   });

//   const [pagination, setPagination] = useState({
//     total: 0,
//     totalPages: 1,
//     currentPage: 1,
//     limit: 5,
//   });

//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (parsedUser?.role !== 'TEACHER') {
//         localStorage.removeItem('user');
//         router.push('/');
//         return;
//       }

//       setTeacher(parsedUser);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   const teacherId = teacher?.id || teacher?._id;

//   const fetchDashboardStats = async () => {
//     if (!teacherId) return;

//     try {
//       const res = await fetch(`/api/teacher/dashboard?teacherId=${teacherId}`);
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to load dashboard stats');
//         return;
//       }

//       setTeacherInfo(data.teacher || null);
//       setStats({
//         totalStudents: data.totalStudents || 0,
//         totalSubmissions: data.totalSubmissions || 0,
//         submissionsByCourse: data.submissionsByCourse || {},
//       });
//     } catch (error) {
//       toast.error('Failed to load dashboard stats');
//     }
//   };

//   const fetchSubmissions = async () => {
//     if (!teacherId) return;

//     try {
//       setLoading(true);

//       const params = new URLSearchParams({
//         teacherId: String(teacherId),
//         page: String(filters.page),
//         limit: String(filters.limit),
//         search: filters.search,
//         course: filters.course,
//         status: filters.status,
//       });

//       const res = await fetch(`/api/submissions?${params.toString()}`);
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to fetch submissions');
//         return;
//       }

//       const fetched = data.submissions || [];
//       setSubmissions(fetched);
//       setCourseOptions(data.courseOptions || []);
//       setPagination(
//         data.pagination || {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//           limit: 5,
//         }
//       );

//       const initialEditable = {};
//       fetched.forEach((item) => {
//         initialEditable[item._id] = {
//           status: item.status || 'Submitted',
//           marks: item.marks ?? 0,
//           feedback: item.feedback || '',
//         };
//       });

//       setEditableData(initialEditable);
//     } catch (error) {
//       toast.error('Failed to load submissions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!teacherId) return;
//     fetchDashboardStats();
//   }, [teacherId]);

//   useEffect(() => {
//     if (!teacherId) return;
//     fetchSubmissions();
//   }, [teacherId, filters.page, filters.limit, filters.course, filters.status]);

//   useEffect(() => {
//     if (!teacherId) return;

//     const delay = setTimeout(() => {
//       fetchSubmissions();
//     }, 400);

//     return () => clearTimeout(delay);
//   }, [filters.search, teacherId]);

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: field === 'marks' ? Number(value) || 0 : value,
//       },
//     }));
//   };

//   const handleUpdate = async (id) => {
//     const rowData = editableData[id];
//     if (!rowData) return;

//     try {
//       setSavingId(id);

//       const res = await fetch(`/api/submissions/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           teacherId: String(teacherId),
//           status: rowData.status,
//           marks: rowData.marks,
//           feedback: rowData.feedback,
//           reviewedBy: teacher?.name || '',
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to update submission');
//         return;
//       }

//       setSubmissions((prev) =>
//         prev.map((item) =>
//           item._id === id
//             ? {
//                 ...item,
//                 status: data.assignment.status,
//                 marks: data.assignment.marks,
//                 feedback: data.assignment.feedback,
//                 reviewedBy: data.assignment.reviewedBy,
//               }
//             : item
//         )
//       );

//       toast.success('Submission updated successfully');
//       fetchDashboardStats();
//     } catch (error) {
//       toast.error('Something went wrong');
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out');
//     router.push('/');
//   };

//   const resetFilters = () => {
//     setFilters({
//       search: '',
//       course: '',
//       status: '',
//       page: 1,
//       limit: 5,
//     });
//   };

//   if (!teacher) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {teacher?.name} - Teacher Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Review assignments, filter by course, search students, and update marks.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/teacher')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-2xl font-bold text-slate-900 mb-6">Teacher Details</h2>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-1">Name</div>
//               <div className="text-xl font-bold text-slate-900">
//                 {teacherInfo?.name || teacher?.name || '-'}
//               </div>
//             </div>

//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-1">Login ID</div>
//               <div className="text-xl font-bold text-slate-900">
//                 {teacherInfo?.loginId || teacher?.loginId || '-'}
//               </div>
//             </div>

//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-1">Subject</div>
//               <div className="text-xl font-bold text-slate-900">
//                 {teacherInfo?.subject || teacher?.subject || '-'}
//               </div>
//             </div>

//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-1">Course</div>
//               <div className="text-xl font-bold text-slate-900">
//                 {teacherInfo?.course || teacher?.course || '-'}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-2xl font-bold text-slate-900 mb-6">
//             Your Submissions Overview
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-1">Total Students</div>
//               <div className="text-4xl font-bold text-slate-900">
//                 {stats.totalStudents}
//               </div>
//             </div>

//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-1">Total Submissions</div>
//               <div className="text-4xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//           </div>

//           {Object.keys(stats.submissionsByCourse).length > 0 && (
//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-2">
//                 Submissions by Course
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 {Object.entries(stats.submissionsByCourse).map(([course, count]) => (
//                   <span
//                     key={course}
//                     className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
//                   >
//                     {course}: {count}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-2xl font-bold text-slate-900 mb-4">Filters</h2>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input
//               type="text"
//               placeholder="Search by student, login ID, title"
//               value={filters.search}
//               onChange={(e) =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   search: e.target.value,
//                   page: 1,
//                 }))
//               }
//               className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <select
//               value={filters.course}
//               onChange={(e) =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   course: e.target.value,
//                   page: 1,
//                 }))
//               }
//               className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Courses</option>
//               {courseOptions.map((course) => (
//                 <option key={course} value={course}>
//                   {course}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.status}
//               onChange={(e) =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   status: e.target.value,
//                   page: 1,
//                 }))
//               }
//               className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Status</option>
//               <option value="Submitted">Submitted</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Checked">Checked</option>
//             </select>

//             <button
//               onClick={resetFilters}
//               className="bg-slate-800 text-white px-4 py-3 rounded-lg hover:bg-slate-900"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : submissions.length === 0 ? (
//             <p className="text-slate-600">No assignments were submitted to you yet.</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-left">
//                       <th className="p-3 border-b">#</th>
//                       <th className="p-3 border-b">Student</th>
//                       <th className="p-3 border-b">Login ID</th>
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Course</th>
//                       <th className="p-3 border-b">Class</th>
//                       <th className="p-3 border-b">Subject</th>
//                       <th className="p-3 border-b">File</th>
//                       <th className="p-3 border-b">Status</th>
//                       <th className="p-3 border-b">Marks</th>
//                       <th className="p-3 border-b">Feedback</th>
//                       <th className="p-3 border-b">Reviewed By</th>
//                       <th className="p-3 border-b">Action</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {submissions.map((item, index) => (
//                       <tr key={item._id} className="hover:bg-slate-50 align-top">
//                         <td className="p-3 border-b">
//                           {(pagination.currentPage - 1) * pagination.limit + index + 1}
//                         </td>
//                         <td className="p-3 border-b">{item.studentName || 'Unknown'}</td>
//                         <td className="p-3 border-b">{item.studentLoginId || '-'}</td>
//                         <td className="p-3 border-b">{item.title || '-'}</td>
//                         <td className="p-3 border-b">{item.course || '-'}</td>
//                         <td className="p-3 border-b">{item.className || '-'}</td>
//                         <td className="p-3 border-b">{item.subject || '-'}</td>

//                         <td className="p-3 border-b">
//                           {item.fileUrl ? (
//                             <a
//                               href={item.fileUrl}
//                               download
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-600 underline"
//                             >
//                               Download File
//                             </a>
//                           ) : (
//                             'No File'
//                           )}
//                         </td>

//                         <td className="p-3 border-b">
//                           <select
//                             value={editableData[item._id]?.status || 'Submitted'}
//                             onChange={(e) =>
//                               handleChange(item._id, 'status', e.target.value)
//                             }
//                             className="border rounded-lg px-3 py-2 w-full"
//                           >
//                             <option value="Submitted">Submitted</option>
//                             <option value="Under Review">Under Review</option>
//                             <option value="Checked">Checked</option>
//                           </select>
//                         </td>

//                         <td className="p-3 border-b">
//                           <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             value={editableData[item._id]?.marks ?? 0}
//                             onChange={(e) =>
//                               handleChange(item._id, 'marks', e.target.value)
//                             }
//                             className="border rounded-lg px-3 py-2 w-24"
//                           />
//                         </td>

//                         <td className="p-3 border-b">
//                           <textarea
//                             value={editableData[item._id]?.feedback || ''}
//                             onChange={(e) =>
//                               handleChange(item._id, 'feedback', e.target.value)
//                             }
//                             rows={3}
//                             className="border rounded-lg px-3 py-2 w-64"
//                             placeholder="Write feedback"
//                           />
//                         </td>

//                         <td className="p-3 border-b">
//                           {item.reviewedBy || 'Not reviewed'}
//                         </td>

//                         <td className="p-3 border-b">
//                           <button
//                             onClick={() => handleUpdate(item._id)}
//                             disabled={savingId === item._id}
//                             className={`px-4 py-2 rounded-lg text-white ${
//                               savingId === item._id
//                                 ? 'bg-gray-400 cursor-not-allowed'
//                                 : 'bg-green-600 hover:bg-green-700'
//                             }`}
//                           >
//                             {savingId === item._id ? 'Saving...' : 'Save'}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex items-center justify-between mt-6">
//                 <p className="text-sm text-slate-600">
//                   Page {pagination.currentPage} of {pagination.totalPages}
//                 </p>

//                 <div className="flex gap-2">
//                   <button
//                     disabled={pagination.currentPage <= 1}
//                     onClick={() =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         page: Math.max(prev.page - 1, 1),
//                       }))
//                     }
//                     className="px-4 py-2 rounded-lg bg-slate-200 disabled:opacity-50"
//                   >
//                     Previous
//                   </button>

//                   <button
//                     disabled={pagination.currentPage >= pagination.totalPages}
//                     onClick={() =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         page: Math.min(prev.page + 1, pagination.totalPages),
//                       }))
//                     }
//                     className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }



// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   const [stats, setStats] = useState({
//     totalTeachers: 0,
//     totalStudents: 0,
//     totalSubmissions: 0,
//     submissionsByClass: {},
//   });
//   const [statsLoading, setStatsLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const user = JSON.parse(savedUser);

//       if (user.role !== 'TEACHER') {
//         router.push('/');
//         return;
//       }

//       setTeacher(user);
//     } catch (error) {
//       console.error('TEACHER AUTH ERROR:', error);
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!teacher) return;

//       try {
//         setLoading(true);

//         const query = new URLSearchParams({
//           className: teacher.className || '',
//           subject: teacher.subject || '',
//         });

//         const res = await fetch(`/api/submissions?${query.toString()}`, {
//           cache: 'no-store',
//         });

//         const data = await res.json();

//         if (!res.ok || !data.success) {
//           console.error(data.message || 'Failed to fetch submissions');
//           setSubmissions([]);
//           setEditableData({});
//           return;
//         }

//         const fetchedSubmissions = data.submissions || [];
//         setSubmissions(fetchedSubmissions);

//         const initialEditableData = {};
//         fetchedSubmissions.forEach((item) => {
//           initialEditableData[item._id] = {
//             status: item.status || 'Submitted',
//             marks: item.marks ?? 0,
//             feedback: item.feedback || '',
//           };
//         });

//         setEditableData(initialEditableData);
//       } catch (error) {
//         console.error('FETCH SUBMISSIONS ERROR:', error);
//         setSubmissions([]);
//         setEditableData({});
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [teacher]);

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       if (!teacher?.className) return;

//       try {
//         setStatsLoading(true);
//         const res = await fetch(
//           `/api/teacher/dashboard?className=${encodeURIComponent(teacher.className)}`,
//           { cache: 'no-store' }
//         );

//         const data = await res.json();

//         if (res.ok && data.success) {
//           setStats({
//             totalTeachers: data.totalTeachers || 0,
//             totalStudents: data.totalStudents || 0,
//             totalSubmissions: data.totalSubmissions || 0,
//             submissionsByClass: data.submissionsByClass || {},
//           });
//         } else {
//           setStats({
//             totalTeachers: 0,
//             totalStudents: 0,
//             totalSubmissions: 0,
//             submissionsByClass: {},
//           });
//         }
//       } catch (error) {
//         console.error('STATS FETCH ERROR:', error);
//         setStats({
//           totalTeachers: 0,
//           totalStudents: 0,
//           totalSubmissions: 0,
//           submissionsByClass: {},
//         });
//       } finally {
//         setStatsLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, [teacher]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...(prev[id] || {}),
//         [field]: value,
//       },
//     }));
//   };

//   const handleUpdate = async (id) => {
//     try {
//       setSavingId(id);

//       const rowData = editableData[id] || {};

//       const res = await fetch(`/api/submissions/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status: rowData.status || 'Submitted',
//           marks: Number(rowData.marks) || 0,
//           feedback: rowData.feedback || '',
//           reviewedBy: teacher?.name || '',
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || 'Failed to update submission');
//         return;
//       }

//       const updatedAssignment = data.assignment;

//       setSubmissions((prev) =>
//         prev.map((item) =>
//           item._id === id
//             ? {
//                 ...item,
//                 status: updatedAssignment?.status || item.status,
//                 marks: updatedAssignment?.marks ?? item.marks,
//                 feedback: updatedAssignment?.feedback || item.feedback,
//                 reviewedBy: updatedAssignment?.reviewedBy || teacher?.name || item.reviewedBy,
//               }
//             : item
//         )
//       );

//       setEditableData((prev) => ({
//         ...prev,
//         [id]: {
//           status: updatedAssignment?.status || rowData.status || 'Submitted',
//           marks: updatedAssignment?.marks ?? rowData.marks ?? 0,
//           feedback: updatedAssignment?.feedback || rowData.feedback || '',
//         },
//       }));

//       alert('Submission updated successfully');
//     } catch (error) {
//       console.error('UPDATE ERROR:', error);
//       alert('Something went wrong');
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const filteredSubmissions = useMemo(() => {
//     return submissions.filter((item) => {
//       const classMatch = teacher?.className
//         ? item.className === teacher.className
//         : true;

//       const subjectMatch = teacher?.subject
//         ? item.subject === teacher.subject
//         : true;

//       return classMatch && subjectMatch;
//     });
//   }, [submissions, teacher]);

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               Teacher Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Review student assignments and update marks, status, and feedback.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.push('/teacher')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-bold text-slate-900 mb-6">
//               {teacher?.className || 'N/A'} Overview
//             </h2>
//             {statsLoading ? (
//               <p className="text-slate-600">Loading stats...</p>
//             ) : (
//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <div className="text-sm font-medium text-slate-500 mb-1">Total Students</div>
//                   <div className="text-4xl font-bold text-slate-900">{stats.totalStudents}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-slate-500 mb-1">Total Submissions</div>
//                   <div className="text-4xl font-bold text-slate-900">{stats.totalSubmissions}</div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h3 className="text-xl font-bold text-slate-900 mb-4">
//               Submissions by Class
//             </h3>
//             {statsLoading ? (
//               <p className="text-slate-600">Loading...</p>
//             ) : Object.keys(stats.submissionsByClass).length === 0 ? (
//               <p className="text-slate-500 italic">No class-wise data available</p>
//             ) : (
//               <div className="space-y-3">
//                 {Object.entries(stats.submissionsByClass).map(([className, count]) => (
//                   <div
//                     key={className}
//                     className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
//                   >
//                     <span className="font-medium text-slate-900">{className}</span>
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
//                       {count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : filteredSubmissions.length === 0 ? (
//             <p className="text-slate-600">No submissions found for your class.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-slate-100 text-left">
//                     <th className="p-3 border-b">#</th>
//                     <th className="p-3 border-b">Student</th>
//                     <th className="p-3 border-b">Login ID</th>
//                     <th className="p-3 border-b">Course</th>
//                     <th className="p-3 border-b">Class</th>
//                     <th className="p-3 border-b">Title</th>
//                     <th className="p-3 border-b">Subject</th>
//                     <th className="p-3 border-b">File</th>
//                     <th className="p-3 border-b">Status</th>
//                     <th className="p-3 border-b">Marks</th>
//                     <th className="p-3 border-b">Feedback</th>
//                     <th className="p-3 border-b">Reviewed By</th>
//                     <th className="p-3 border-b">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredSubmissions.map((item, index) => (
//                     <tr key={item._id} className="hover:bg-slate-50 align-top">
//                       <td className="p-3 border-b">{index + 1}</td>
//                       <td className="p-3 border-b">{item.studentName}</td>
//                       <td className="p-3 border-b">{item.studentLoginId}</td>
//                       <td className="p-3 border-b">
//                         {item.courseName || item.course || 'Not Specified'}
//                       </td>
//                       <td className="p-3 border-b">{item.className || 'N/A'}</td>
//                       <td className="p-3 border-b">{item.title}</td>
//                       <td className="p-3 border-b">{item.subject}</td>

//                       <td className="p-3 border-b">
//                         {item.fileUrl ? (
//                           <a
//                             href={item.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                           >
//                             {item.fileName || 'View File'}
//                           </a>
//                         ) : item.fileName ? (
//                           <span className="text-slate-700">{item.fileName}</span>
//                         ) : (
//                           <span className="text-slate-500">No file uploaded</span>
//                         )}
//                       </td>

//                       <td className="p-3 border-b">
//                         <select
//                           value={editableData[item._id]?.status || 'Submitted'}
//                           onChange={(e) =>
//                             handleChange(item._id, 'status', e.target.value)
//                           }
//                           className="border rounded-lg px-3 py-2 w-full"
//                         >
//                           <option value="Submitted">Submitted</option>
//                           <option value="Under Review">Under Review</option>
//                           <option value="Checked">Checked</option>
//                         </select>
//                       </td>

//                       <td className="p-3 border-b">
//                         <input
//                           type="number"
//                           min="0"
//                           max="100"
//                           value={editableData[item._id]?.marks ?? 0}
//                           onChange={(e) =>
//                             handleChange(item._id, 'marks', e.target.value)
//                           }
//                           className="border rounded-lg px-3 py-2 w-24"
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         <textarea
//                           value={editableData[item._id]?.feedback || ''}
//                           onChange={(e) =>
//                             handleChange(item._id, 'feedback', e.target.value)
//                           }
//                           rows={3}
//                           className="border rounded-lg px-3 py-2 w-64"
//                           placeholder="Write feedback"
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         {item.reviewedBy || 'Not reviewed'}
//                       </td>

//                       <td className="p-3 border-b">
//                         <button
//                           onClick={() => handleUpdate(item._id)}
//                           disabled={savingId === item._id}
//                           className={`px-4 py-2 rounded-lg text-white ${
//                             savingId === item._id
//                               ? 'bg-gray-400 cursor-not-allowed'
//                               : 'bg-green-600 hover:bg-green-700'
//                           }`}
//                         >
//                           {savingId === item._id ? 'Saving...' : 'Submit'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// // function shortenFileName(name = '', maxBaseLength = 18) {
// //   if (!name) return '';

// //   const lastDotIndex = name.lastIndexOf('.');
// //   const hasExtension = lastDotIndex > 0;

// //   const base = hasExtension ? name.slice(0, lastDotIndex) : name;
// //   const ext = hasExtension ? name.slice(lastDotIndex) : '';

// //   if (base.length <= maxBaseLength) return name;

// //   return `${base.slice(0, maxBaseLength)}...${ext}`;
// // }

// function shortenFileName(name = '', maxBaseLength = 18) {
//   if (!name) return '';

//   const lastDotIndex = name.lastIndexOf('.');
//   const hasExtension = lastDotIndex > 0;

//   const base = hasExtension ? name.slice(0, lastDotIndex) : name;
//   const ext = hasExtension ? name.slice(lastDotIndex) : '';

//   if (base.length <= maxBaseLength) return name;

//   return `${base.slice(0, maxBaseLength)}...${ext}`;
// }

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();

//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);

//   const [filters, setFilters] = useState({
//     search: '',
//     courseName: '',
//     status: '',
//     page: 1,
//     limit: 5,
//   });

//   const [pagination, setPagination] = useState({
//     total: 0,
//     totalPages: 1,
//     currentPage: 1,
//   });

//   const [teacherInfo, setTeacherInfo] = useState(null);
//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsed = JSON.parse(savedUser);

//       if (parsed.role !== 'TEACHER') {
//         localStorage.removeItem('user');
//         router.push('/');
//         return;
//       }

//       setTeacher(parsed);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   const fetchSubmissions = useCallback(async () => {
//     if (!teacher?.id && !teacher?._id) return;

//     try {
//       setLoading(true);

//       const teacherId = teacher.id || teacher._id;

//       const params = new URLSearchParams({
//         teacherId,
//         page: String(filters.page),
//         limit: String(filters.limit),
//       });

//       if (filters.search.trim()) {
//         params.set('search', filters.search.trim());
//       }

//       if (filters.courseName) {
//         params.set('courseName', filters.courseName);
//       }

//       if (filters.status) {
//         params.set('status', filters.status);
//       }

//       const res = await fetch(`/api/submissions?${params.toString()}`, {
//         cache: 'no-store',
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to fetch submissions');
//         setSubmissions([]);
//         setCourseOptions([]);
//         setPagination({
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         });
//         return;
//       }

//       const fetchedSubmissions = data.submissions || [];

//       setSubmissions(fetchedSubmissions);
//       setTeacherInfo(data.teacher || null);
//       setCourseOptions(data.courseOptions || []);
//       setPagination(
//         data.pagination || {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         }
//       );

//       const initialEditable = {};
//       fetchedSubmissions.forEach((item) => {
//         initialEditable[item._id] = {
//           status: item.status || 'Submitted',
//           marks: item.marks ?? 0,
//           feedback: item.feedback || '',
//         };
//       });

//       setEditableData(initialEditable);
//     } catch (error) {
//       console.error('FETCH SUBMISSIONS ERROR:', error);
//       toast.error('Failed to load submissions');
//       setSubmissions([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [teacher, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

//   useEffect(() => {
//     if (!teacher) return;

//     const delay = setTimeout(() => {
//       fetchSubmissions();
//     }, filters.search ? 350 : 0);

//     return () => clearTimeout(delay);
//   }, [teacher, fetchSubmissions, filters.search]);

//   const stats = useMemo(() => {
//     const totalStudents = new Set(
//       submissions.map((s) => s.studentId?._id || s.studentId).filter(Boolean)
//     ).size;

//     const byCourse = {};
//     submissions.forEach((s) => {
//       const course = s.courseName || 'Not Specified';
//       byCourse[course] = (byCourse[course] || 0) + 1;
//     });

//     return {
//       totalStudents,
//       totalSubmissions: pagination.total || submissions.length,
//       submissionsByCourse: byCourse,
//     };
//   }, [submissions, pagination.total]);

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...(prev[id] || {}),
//         [field]: field === 'marks' ? Number(value) || 0 : value,
//       },
//     }));
//   };

//   const handleUpdate = async (id) => {
//     try {
//       setSavingId(id);

//       const rowData = editableData[id] || {};
//       const teacherId = teacher?.id || teacher?._id;

//       const res = await fetch(`/api/submissions/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           teacherId,
//           status: rowData.status || 'Submitted',
//           marks: rowData.marks ?? 0,
//           feedback: rowData.feedback || '',
//           reviewedBy: teacher?.name || '',
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to update submission');
//         return;
//       }

//       setSubmissions((prev) =>
//         prev.map((item) =>
//           item._id === id
//             ? {
//                 ...item,
//                 ...data.assignment,
//               }
//             : item
//         )
//       );

//       setEditableData((prev) => ({
//         ...prev,
//         [id]: {
//           status: data.assignment?.status || rowData.status || 'Submitted',
//           marks: data.assignment?.marks ?? rowData.marks ?? 0,
//           feedback: data.assignment?.feedback || rowData.feedback || '',
//         },
//       }));

//       toast.success('Submission updated successfully');
//     } catch (error) {
//       console.error('UPDATE ERROR:', error);
//       toast.error('Something went wrong');
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   if (!teacher) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {teacher.name} - Teacher Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Review assignments, filter by course, search students, and update marks.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={() => router.push('/teacher')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {teacherInfo && (
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-xl font-bold text-slate-900 mb-4">Teacher Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//               <div>
//                 <p className="text-slate-500">Name</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.name || '-'}</p>
//               </div>
//               <div>
//                 <p className="text-slate-500">Login ID</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.loginId || '-'}</p>
//               </div>
//               <div>
//                 <p className="text-slate-500">Subject</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.subject || '-'}</p>
//               </div>
//               <div>
//                 <p className="text-slate-500">Course</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.course || '-'}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-bold text-slate-900 mb-4">
//             Your Submissions Overview
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Students</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalStudents}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//           </div>

//           {courseOptions.length > 0 && (
//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-2">
//                 All Submitted Courses
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {courseOptions.map((course) => (
//                   <span
//                     key={course}
//                     className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {course}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-bold text-slate-900 mb-4">Filters</h2>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input
//               type="text"
//               placeholder="Search by student, login ID, title..."
//               value={filters.search}
//               onChange={(e) =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   search: e.target.value,
//                   page: 1,
//                 }))
//               }
//               className="border rounded-lg px-4 py-3"
//             />

//             <select
//               value={filters.courseName}
//               onChange={(e) =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   courseName: e.target.value,
//                   page: 1,
//                 }))
//               }
//               className="border rounded-lg px-4 py-3"
//             >
//               <option value="">All Courses</option>
//               {courseOptions.map((course) => (
//                 <option key={course} value={course}>
//                   {course}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.status}
//               onChange={(e) =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   status: e.target.value,
//                   page: 1,
//                 }))
//               }
//               className="border rounded-lg px-4 py-3"
//             >
//               <option value="">All Status</option>
//               <option value="Submitted">Submitted</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Checked">Checked</option>
//             </select>

//             <button
//               onClick={() =>
//                 setFilters({
//                   search: '',
//                   courseName: '',
//                   status: '',
//                   page: 1,
//                   limit: 5,
//                 })
//               }
//               className="bg-slate-800 text-white rounded-lg px-4 py-3 hover:bg-slate-900"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>

//         {filters.search.trim() && (
//           <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
//             <p className="text-sm text-blue-700 font-medium">
//               Showing search results for: <span className="font-bold">{filters.search}</span>
//             </p>
//           </div>
//         )}

//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : submissions.length === 0 ? (
//             <p className="text-slate-600">
//               No assignments found for the current filters.
//             </p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-left">
//                       <th className="p-3 border-b">#</th>
//                       <th className="p-3 border-b">Student</th>
//                       <th className="p-3 border-b">Login ID</th>
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Course</th>
//                       <th className="p-3 border-b">Class</th>
//                       <th className="p-3 border-b">Subject</th>
//                       <th className="p-3 border-b">File</th>
//                       <th className="p-3 border-b">Status</th>
//                       <th className="p-3 border-b">Marks</th>
//                       <th className="p-3 border-b">Feedback</th>
//                       <th className="p-3 border-b">Reviewed By</th>
//                       <th className="p-3 border-b">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submissions.map((item, index) => (
//                       <tr key={item._id} className="hover:bg-slate-50 align-top">
//                         <td className="p-3 border-b">
//                           {(pagination.currentPage - 1) * filters.limit + index + 1}
//                         </td>
//                         <td className="p-3 border-b">{item.studentName || 'Unknown'}</td>
//                         <td className="p-3 border-b">{item.studentLoginId || '-'}</td>
//                         <td className="p-3 border-b">{item.title || '-'}</td>
//                         <td className="p-3 border-b">{item.courseName || 'Not Specified'}</td>
//                         <td className="p-3 border-b">{item.className || '-'}</td>
//                         <td className="p-3 border-b">{item.subject || '-'}</td>

//                         <td className="p-3 border-b">
//                           <div className="flex flex-col gap-2 min-w-[180px]">
//                             <span
//                               className="text-sm text-slate-700 break-all"
//                               title={item.fileName || ''}
//                             >
//                               {item.fileName
//                                 ? shortenFileName(item.fileName, 16)
//                                 : 'No File'}
//                             </span>

//                             {item.fileUrl ? (
//                               <a
//                                 href={item.fileUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 download
//                                 className="inline-flex w-fit items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                               >
//                                 Download
//                               </a>
//                             ) : (
//                               <button
//                                 type="button"
//                                 disabled
//                                 className="inline-flex w-fit items-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-medium text-slate-600 cursor-not-allowed"
//                               >
//                                 Download
//                               </button>
//                             )}
//                           </div>
//                         </td>

//                         <td className="p-3 border-b">
//                           <select
//                             value={editableData[item._id]?.status || 'Submitted'}
//                             onChange={(e) =>
//                               handleChange(item._id, 'status', e.target.value)
//                             }
//                             className="border rounded-lg px-3 py-2 w-full"
//                           >
//                             <option value="Submitted">Submitted</option>
//                             <option value="Under Review">Under Review</option>
//                             <option value="Checked">Checked</option>
//                           </select>
//                         </td>

//                         <td className="p-3 border-b">
//                           <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             value={editableData[item._id]?.marks ?? 0}
//                             onChange={(e) =>
//                               handleChange(item._id, 'marks', e.target.value)
//                             }
//                             className="border rounded-lg px-3 py-2 w-24"
//                           />
//                         </td>

//                         <td className="p-3 border-b">
//                           <textarea
//                             value={editableData[item._id]?.feedback || ''}
//                             onChange={(e) =>
//                               handleChange(item._id, 'feedback', e.target.value)
//                             }
//                             rows={3}
//                             className="border rounded-lg px-3 py-2 w-64"
//                             placeholder="Write feedback"
//                           />
//                         </td>

//                         <td className="p-3 border-b">
//                           {item.reviewedBy || 'Not reviewed'}
//                         </td>

//                         <td className="p-3 border-b">
//                           <button
//                             onClick={() => handleUpdate(item._id)}
//                             disabled={savingId === item._id}
//                             className={`px-4 py-2 rounded-lg text-white ${
//                               savingId === item._id
//                                 ? 'bg-gray-400 cursor-not-allowed'
//                                 : 'bg-green-600 hover:bg-green-700'
//                             }`}
//                           >
//                             {savingId === item._id ? 'Saving...' : 'Save'}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
//                 <p className="text-sm text-slate-600">
//                   Showing {(pagination.currentPage - 1) * filters.limit + 1} to{' '}
//                   {Math.min(pagination.currentPage * filters.limit, pagination.total)} of{' '}
//                   {pagination.total} results
//                 </p>

//                 <div className="flex items-center gap-2">
//                   <button
//                     disabled={pagination.currentPage <= 1}
//                     onClick={() =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         page: Math.max(prev.page - 1, 1),
//                       }))
//                     }
//                     className="px-4 py-2 rounded-lg bg-slate-200 disabled:opacity-50"
//                   >
//                     Previous
//                   </button>

//                   <span className="px-3 py-2 text-sm text-slate-700">
//                     Page {pagination.currentPage} of {pagination.totalPages}
//                   </span>

//                   <button
//                     disabled={pagination.currentPage >= pagination.totalPages}
//                     onClick={() =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         page: Math.min(prev.page + 1, pagination.totalPages),
//                       }))
//                     }
//                     className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }




// 'use client';

// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// function shortenFileName(name = '', maxBaseLength = 18) {
//   if (!name) return '';

//   const lastDotIndex = name.lastIndexOf('.');
//   const hasExtension = lastDotIndex > 0;

//   const base = hasExtension ? name.slice(0, lastDotIndex) : name;
//   const ext = hasExtension ? name.slice(lastDotIndex) : '';

//   if (base.length <= maxBaseLength) return name;

//   return `${base.slice(0, maxBaseLength)}...${ext}`;
// }

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const debounceRef = useRef(null);

//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);

//   const [filters, setFilters] = useState({
//     search: '',
//     courseName: '',
//     status: '',
//     page: 1,
//     limit: 5,
//   });

//   const [pagination, setPagination] = useState({
//     total: 0,
//     totalPages: 1,
//     currentPage: 1,
//   });

//   const [teacherInfo, setTeacherInfo] = useState(null);
//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsed = JSON.parse(savedUser);

//       if (parsed.role !== 'TEACHER') {
//         localStorage.removeItem('user');
//         router.push('/');
//         return;
//       }

//       setTeacher(parsed);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   const fetchSubmissions = useCallback(async () => {
//     if (!teacher?.id && !teacher?._id) return;

//     try {
//       setLoading(true);

//       const teacherId = teacher.id || teacher._id;

//       const params = new URLSearchParams({
//         teacherId,
//         page: String(filters.page),
//         limit: String(filters.limit),
//       });

//       if (filters.search.trim()) params.set('search', filters.search.trim());
//       if (filters.courseName) params.set('courseName', filters.courseName);
//       if (filters.status) params.set('status', filters.status);

//       const res = await fetch(`/api/submissions?${params.toString()}`, {
//         cache: 'no-store',
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to fetch submissions');
//         setSubmissions([]);
//         setPagination({
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         });
//         return;
//       }

//       const fetchedSubmissions = data.submissions || [];

//       setSubmissions(fetchedSubmissions);
//       setPagination(
//         data.pagination || {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         }
//       );

//       setTeacherInfo(data.teacher || null);
//       setCourseOptions(data.courseOptions || []);

//       const initialEditable = {};
//       fetchedSubmissions.forEach((item) => {
//         initialEditable[item._id] = {
//           status: item.status || 'Submitted',
//           marks: item.marks ?? 0,
//           feedback: item.feedback || '',
//         };
//       });

//       setEditableData(initialEditable);
//     } catch (error) {
//       toast.error('Failed to load submissions');
//     } finally {
//       setLoading(false);
//     }
//   }, [teacher, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

//   useEffect(() => {
//     if (!teacher) return;

//     const hasSearch = filters.search.trim().length > 0;

//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     if (hasSearch) {
//       debounceRef.current = setTimeout(() => {
//         fetchSubmissions();
//       }, 400);
//     } else {
//       fetchSubmissions();
//     }

//     return () => {
//       if (debounceRef.current) clearTimeout(debounceRef.current);
//     };
//   }, [teacher, fetchSubmissions]);

//   const stats = useMemo(() => {
//     const totalStudents = new Set(
//       submissions.map((s) => s.studentId?._id || s.studentId).filter(Boolean)
//     ).size;

//     const byCourse = {};
//     submissions.forEach((s) => {
//       const course = s.courseName || 'Unknown';
//       byCourse[course] = (byCourse[course] || 0) + 1;
//     });

//     return {
//       totalStudents,
//       totalSubmissions: pagination.total || submissions.length,
//       submissionsByCourse: byCourse,
//     };
//   }, [submissions, pagination.total]);

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: field === 'marks' ? Number(value) || 0 : value,
//       },
//     }));
//   };

//   const handleUpdate = async (id) => {
//     try {
//       setSavingId(id);

//       const rowData = editableData[id];
//       const teacherId = teacher?.id || teacher?._id;

//       const res = await fetch(`/api/submissions/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           teacherId,
//           status: rowData.status,
//           marks: rowData.marks,
//           feedback: rowData.feedback,
//           reviewedBy: teacher?.name || '',
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to update submission');
//         return;
//       }

//       setSubmissions((prev) =>
//         prev.map((item) =>
//           item._id === id
//             ? {
//                 ...item,
//                 ...data.assignment,
//               }
//             : item
//         )
//       );

//       toast.success('Submission updated successfully');
//     } catch (error) {
//       toast.error('Something went wrong');
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   if (!teacher) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {teacher.name} - Teacher Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Review assignments, filter by course, search students, and update marks.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={() => router.push('/teacher')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {teacherInfo && (
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-xl font-bold text-slate-900 mb-4">Teacher Details</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//               <div>
//                 <p className="text-slate-500">Name</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.name || '-'}</p>
//               </div>
//               <div>
//                 <p className="text-slate-500">Login ID</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.loginId || '-'}</p>
//               </div>
//               <div>
//                 <p className="text-slate-500">Subject</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.subject || '-'}</p>
//               </div>
//               <div>
//                 <p className="text-slate-500">Role</p>
//                 <p className="font-semibold text-slate-900">{teacherInfo.role || '-'}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-bold text-slate-900 mb-4">
//             Your Submissions Overview
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Students</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalStudents}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//           </div>

//           {Object.keys(stats.submissionsByCourse).length > 0 && (
//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-2">
//                 Submissions by Course
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {Object.entries(stats.submissionsByCourse).map(([course, count]) => (
//                   <span
//                     key={course}
//                     className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {course}: {count}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-bold text-slate-900 mb-4">Filters</h2>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <input
//               type="text"
//               placeholder="Search by student, login ID, title..."
//               value={filters.search}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
//               }
//               className="border rounded-lg px-4 py-3"
//             />

//             <select
//               value={filters.courseName}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, courseName: e.target.value, page: 1 }))
//               }
//               className="border rounded-lg px-4 py-3"
//             >
//               <option value="">All Courses</option>
//               {courseOptions.map((course) => (
//                 <option key={course} value={course}>
//                   {course}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.status}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))
//               }
//               className="border rounded-lg px-4 py-3"
//             >
//               <option value="">All Status</option>
//               <option value="Submitted">Submitted</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Checked">Checked</option>
//             </select>

//             <button
//               onClick={() =>
//                 setFilters({
//                   search: '',
//                   courseName: '',
//                   status: '',
//                   page: 1,
//                   limit: 5,
//                 })
//               }
//               className="bg-slate-800 text-white rounded-lg px-4 py-3 hover:bg-slate-900"
//             >
//               Reset Filters
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : submissions.length === 0 ? (
//             <p className="text-slate-600">No assignments were submitted to you yet.</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-left">
//                       <th className="p-3 border-b">#</th>
//                       <th className="p-3 border-b">Student</th>
//                       <th className="p-3 border-b">Login ID</th>
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Course</th>
//                       <th className="p-3 border-b">Class</th>
//                       <th className="p-3 border-b">Subject</th>
//                       <th className="p-3 border-b">File</th>
//                       <th className="p-3 border-b">Status</th>
//                       <th className="p-3 border-b">Marks</th>
//                       <th className="p-3 border-b">Feedback</th>
//                       <th className="p-3 border-b">Reviewed By</th>
//                       <th className="p-3 border-b">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submissions.map((item, index) => (
//                       <tr key={item._id} className="hover:bg-slate-50 align-top">
//                         <td className="p-3 border-b">
//                           {(pagination.currentPage - 1) * filters.limit + index + 1}
//                         </td>
//                         <td className="p-3 border-b">{item.studentName || 'Unknown'}</td>
//                         <td className="p-3 border-b">{item.studentLoginId || '-'}</td>
//                         <td className="p-3 border-b">{item.title || '-'}</td>
//                         <td className="p-3 border-b">{item.courseName || '-'}</td>
//                         <td className="p-3 border-b">{item.className || '-'}</td>
//                         <td className="p-3 border-b">{item.subject || '-'}</td>

//                         {/* <td className="p-3 border-b">
//                           <div className="flex flex-col gap-2 min-w-[170px]">
//                             <span
//                               className="text-sm text-slate-700 break-all"
//                               title={item.fileName || ''}
//                             >
//                               {item.fileName
//                                 ? shortenFileName(item.fileName, 16)
//                                 : 'No File'}
//                             </span>

//                             {item.fileName ? (
//                               <a
//                                 href={item.fileName}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 download={item.fileName || true}
//                                 className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                               >
//                                 Download
//                               </a>
//                             ) : (
//                               <button
//                                 type="button"
//                                 disabled
//                                 className="inline-flex w-fit items-center justify-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-medium text-slate-500 cursor-not-allowed"
//                                 title="File URL not available"
//                               >
//                                 No File URL
//                               </button>
//                             )}
//                           </div>
//                         </td> */}

//                         {/* <td className="p-3 border-b">
//   <div className="flex flex-col gap-2 min-w-[170px]">
//     <span
//       className="text-sm text-slate-700 break-all"
//       title={item.fileName || ''}
//     >
//       {item.fileName
//         ? shortenFileName(item.fileName, 16)
//         : 'No File'}
//     </span>

//     {(item.fileName || item.fileName) ? (
//       <a
//         href={item.fileUrl || `/uploads/${item.fileName}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         download={item.fileName || 'submission.pdf'}
//         className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//       >
//         Download PDF
//       </a>
//     ) : (
//       <button
//         type="button"
//         disabled
//         className="inline-flex w-fit items-center justify-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-medium text-slate-500 cursor-not-allowed"
//         title="File not available"
//       >
//         No File
//       </button>
//     )}
//   </div>
// </td> */}


// <td className="p-3 border-b">
//   <div className="flex flex-col gap-2 min-w-[170px]">
//     <span
//       className="text-sm text-slate-700 break-all"
//       title={item.fileName || ''}
//     >
//       {item.fileName ? shortenFileName(item.fileName, 16) : 'No File'}
//     </span>

//     {item.fileUrl ? (
//       <a
//         href={item.fileUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         download={item.fileName || 'submission.pdf'}
//         className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//       >
//         Download PDF
//       </a>
//     ) : item.fileName ? (
//       <a
//         href={`/uploads/${item.fileName}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         download={item.fileName}
//         className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//       >
//         Download PDF
//       </a>
//     ) : (
//       <button
//         type="button"
//         disabled
//         className="inline-flex w-fit items-center justify-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-medium text-slate-500 cursor-not-allowed"
//       >
//         No File
//       </button>
//     )}
//   </div>
// </td>

//                         <td className="p-3 border-b">
//                           <select
//                             value={editableData[item._id]?.status || 'Submitted'}
//                             onChange={(e) =>
//                               handleChange(item._id, 'status', e.target.value)
//                             }
//                             className="border rounded-lg px-3 py-2 w-full"
//                           >
//                             <option value="Submitted">Submitted</option>
//                             <option value="Under Review">Under Review</option>
//                             <option value="Checked">Checked</option>
//                           </select>
//                         </td>
//                         <td className="p-3 border-b">
//                           <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             value={editableData[item._id]?.marks ?? 0}
//                             onChange={(e) =>
//                               handleChange(item._id, 'marks', e.target.value)
//                             }
//                             className="border rounded-lg px-3 py-2 w-24"
//                           />
//                         </td>
//                         <td className="p-3 border-b">
//                           <textarea
//                             value={editableData[item._id]?.feedback || ''}
//                             onChange={(e) =>
//                               handleChange(item._id, 'feedback', e.target.value)
//                             }
//                             rows={3}
//                             className="border rounded-lg px-3 py-2 w-64"
//                             placeholder="Write feedback"
//                           />
//                         </td>
//                         <td className="p-3 border-b">
//                           {item.reviewedBy || 'Not reviewed'}
//                         </td>
//                         <td className="p-3 border-b">
//                           <button
//                             onClick={() => handleUpdate(item._id)}
//                             disabled={savingId === item._id}
//                             className={`px-4 py-2 rounded-lg text-white ${
//                               savingId === item._id
//                                 ? 'bg-gray-400 cursor-not-allowed'
//                                 : 'bg-green-600 hover:bg-green-700'
//                             }`}
//                           >
//                             {savingId === item._id ? 'Saving...' : 'Save'}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex items-center justify-between mt-6">
//                 <p className="text-sm text-slate-600">
//                   Page {pagination.currentPage} of {pagination.totalPages}
//                 </p>

//                 <div className="flex gap-2">
//                   <button
//                     disabled={pagination.currentPage <= 1}
//                     onClick={() =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         page: Math.max(prev.page - 1, 1),
//                       }))
//                     }
//                     className="px-4 py-2 rounded-lg bg-slate-200 disabled:opacity-50"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     disabled={pagination.currentPage >= pagination.totalPages}
//                     onClick={() =>
//                       setFilters((prev) => ({
//                         ...prev,
//                         page: Math.min(prev.page + 1, pagination.totalPages),
//                       }))
//                     }
//                     className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:opacity-50"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }



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

  // 1. UNIFIED AUTH STATE (Fixes the race condition)
  const [auth, setAuth] = useState({
    loading: true,
    teacher: null,
  });
  
  // Create a convenient reference so we don't have to rewrite the rest of the code
  const teacher = auth.teacher;

  // Data State
  const [submissions, setSubmissions] = useState([]);
  const [editableData, setEditableData] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);

  // Filtering & Pagination State
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

  // 2. SINGLE AUTHENTICATION USE-EFFECT
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const performAuthCheck = () => {
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

        // SUCCESS: Update both states simultaneously
        setAuth({
          loading: false,
          teacher: parsed,
        });

      } catch (error) {
        console.error('Auth Check Error:', error);
        localStorage.removeItem('user');
        router.replace('/');
      }
    };

    performAuthCheck();
  }, [router]);

  // 3. FETCH SUBMISSIONS LOGIC
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
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, [teacher, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

  // 4. DEBOUNCE SEARCH LOGIC
  useEffect(() => {
    if (!teacher) return;

    const hasSearch = filters.search.trim().length > 0;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (hasSearch) {
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

  // 5. CALCULATE STATS
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

  // 6. EVENT HANDLERS
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

      setSubmissions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...data.assignment } : item
        )
      );

      toast.success('Submission updated successfully');
    } catch (error) {
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

  // 7. RENDER LOGIC
  
  // Show loading screen while reading local storage
  if (auth.loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow px-6 py-4 text-slate-700 animate-pulse">
          Authenticating Teacher Profile...
        </div>
      </main>
    );
  }

  // Prevent flash of empty dashboard if kicking user back to login
  if (!teacher) return null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
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

        {/* Teacher Info Card */}
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

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Your Submissions Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-sm font-medium text-slate-500">Total Students</div>
              <div className="text-3xl font-bold text-slate-900">
                {stats.totalStudents}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500">Total Submissions</div>
              <div className="text-3xl font-bold text-slate-900">
                {stats.totalSubmissions}
              </div>
            </div>
          </div>

          {Object.keys(stats.submissionsByCourse).length > 0 && (
            <div>
              <div className="text-sm font-medium text-slate-500 mb-2">
                Submissions by Course
              </div>
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

        {/* Filters */}
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

        {/* Table */}
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
                      <th className="p-12 border-b">Status</th>
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
                            ) : item.fileName ? (
                              <a
                                href={`/uploads/${item.fileName}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={item.fileName}
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
                            onChange={(e) =>
                              handleChange(item._id, 'status', e.target.value)
                            }
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
                            onChange={(e) =>
                              handleChange(item._id, 'marks', e.target.value)
                            }
                            className="border rounded-lg px-3 py-2 w-24"
                          />
                        </td>
                        <td className="p-3 border-b">
                          <textarea
                            value={editableData[item._id]?.feedback || ''}
                            onChange={(e) =>
                              handleChange(item._id, 'feedback', e.target.value)
                            }
                            rows={3}
                            className="border rounded-lg px-3 py-2 w-64"
                            placeholder="Write feedback"
                          />
                        </td>
                        <td className="p-3 border-b">
                          {item.reviewedBy || 'Not reviewed'}
                        </td>
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

              {/* Pagination controls */}
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
      </div>
    </main>
  );
}