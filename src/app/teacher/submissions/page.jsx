// // import { auth } from '@/lib/auth';
// // import SubmissionTable from '@/components/SubmissionTable';

// // export default async function TeacherSubmissionsPage() {
// //   const session = await auth();
// //   const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });

// //   const submissions = await prisma.assignmentSubmission.findMany({
// //     where: { teacherId: teacher.id },
// //     orderBy: { createdAt: 'desc' },
// //     include: {
// //       student: { include: { user: true } },
// //       teacher: { include: { user: true } },
// //     },
// //   });

// //   return (
// //     <div className="space-y-6">
// //       <h1 className="text-3xl font-bold">Student Assignments</h1>
// //       <SubmissionTable submissions={submissions} role="teacher" />
// //     </div>
// //   );
// // }


// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();

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
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Teacher Submissions
//           </h1>

//           <button
//             onClick={() => router.push('/teacher')}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>

//         <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
//           <p className="text-slate-700">
//             Submission page is working now.
//           </p>
//           <p className="text-slate-500 mt-2">
//             You can connect assignment submission data here later.
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState({});

//   // Check teacher auth
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

//   // Fetch all submissions
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!teacher) return;

//       try {
//         setLoading(true);
//         // GET all submissions (no studentLoginId filter for teacher)
//         const res = await fetch('/api/submissions');
//         const data = await res.json();

//         if (res.ok && data.success) {
//           setSubmissions(data.submissions || []);
//         } else {
//           console.error('Failed to fetch submissions:', data.message);
//         }
//       } catch (error) {
//         console.error('FETCH ERROR:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [teacher]);

//   const updateSubmission = async (submissionId, updates) => {
//     try {
//       setUpdating(prev => ({ ...prev, [submissionId]: true }));

//       const res = await fetch(`/api/submissions/${submissionId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           status: updates.status,
//           marks: updates.marks,
//           feedback: updates.feedback,
//           reviewedBy: teacher.name,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         // Update local state
//         setSubmissions(prev =>
//           prev.map(sub =>
//             sub._id === submissionId
//               ? { ...sub, ...updates, reviewedBy: teacher.name }
//               : sub
//           )
//         );
//       } else {
//         alert(data.message || 'Failed to update submission');
//       }
//     } catch (error) {
//       console.error('UPDATE ERROR:', error);
//       alert('Something went wrong');
//     } finally {
//       setUpdating(prev => ({ ...prev, [submissionId]: false }));
//     }
//   };

//   if (!teacher) {
//     return <div className="p-10">Loading...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               All Student Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Teacher: {teacher.name} | Total: {submissions.length} submissions
//             </p>
//           </div>
//           <button
//             onClick={() => router.push('/teacher')}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <div className="text-center py-12">
//               <p className="text-slate-600 text-lg">Loading submissions...</p>
//             </div>
//           ) : submissions.length === 0 ? (
//             <div className="text-center py-12 bg-slate-50 rounded-xl">
//               <p className="text-slate-600 text-lg">No submissions yet.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-slate-900 text-white">
//                     <th className="p-4 text-left">#</th>
//                     <th className="p-4 text-left">Student</th>
//                     <th className="p-4 text-left">Title</th>
//                     <th className="p-4 text-left">Subject</th>
//                     <th className="p-4 text-left">File</th>
//                     <th className="p-4 text-left">Status</th>
//                     <th className="p-4 text-left">Marks</th>
//                     <th className="p-4 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {submissions.map((submission, index) => (
//                     <tr key={submission._id} className="border-b hover:bg-slate-50">
//                       <td className="p-4 font-medium">{index + 1}</td>
//                       <td className="p-4">
//                         <div>
//                           <div className="font-semibold">{submission.studentName}</div>
//                           <div className="text-sm text-slate-500">
//                             {submission.studentLoginId}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-4">{submission.title}</td>
//                       <td className="p-4">
//                         <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                           {submission.subject}
//                         </span>
//                       </td>
//                       <td className="p-4">
//                         {submission.fileName || submission.fileLink ? (
//                           <a
//                             href={submission.fileLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline text-sm"
//                           >
//                             {submission.fileName || 'View File'}
//                           </a>
//                         ) : (
//                           'No file'
//                         )}
//                       </td>
//                       <td className="p-4">
//                         <select
//                           value={submission.status || 'Submitted'}
//                           onChange={(e) =>
//                             updateSubmission(submission._id, {
//                               status: e.target.value,
//                               marks: submission.marks || 0,
//                               feedback: submission.feedback || '',
//                             })
//                           }
//                           className="border px-3 py-1 rounded-md text-sm"
//                           disabled={updating[submission._id]}
//                         >
//                           <option value="Submitted">Submitted</option>
//                           <option value="Under Review">Under Review</option>
//                           <option value="Checked">Checked</option>
//                         </select>
//                       </td>
//                       <td className="p-4">
//                         <input
//                           type="number"
//                           min="0"
//                           max="100"
//                           value={submission.marks || 0}
//                           onChange={(e) =>
//                             updateSubmission(submission._id, {
//                               status: submission.status || 'Submitted',
//                               marks: parseInt(e.target.value) || 0,
//                               feedback: submission.feedback || '',
//                             })
//                           }
//                           className="w-20 border px-2 py-1 rounded-md text-sm"
//                           disabled={updating[submission._id]}
//                         />
//                         /100
//                       </td>
//                       <td className="p-4">
//                         <div className="space-y-2">
//                           <textarea
//                             value={submission.feedback || ''}
//                             onChange={(e) =>
//                               updateSubmission(submission._id, {
//                                 status: submission.status || 'Submitted',
//                                 marks: submission.marks || 0,
//                                 feedback: e.target.value,
//                               })
//                             }
//                             placeholder="Add feedback..."
//                             className="w-48 h-16 border px-2 py-1 rounded-md text-sm resize-none"
//                             disabled={updating[submission._id]}
//                           />
//                           {updating[submission._id] && (
//                             <span className="text-xs text-blue-600">Saving...</span>
//                           )}
//                         </div>
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

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);

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

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
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

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);

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

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
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

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);

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

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
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

//   const handleDownloadFile = (fileLink, fileName) => {
//     if (fileLink) {
//       const link = document.createElement('a');
//       link.href = fileLink;
//       link.download = fileName || 'assignment.pdf';
//       link.target = '_blank';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

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
//                     <th className="p-3 border-b">File</th>
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
//                       <td className="p-3 border-b font-medium">{index + 1}</td>
//                       <td className="p-3 border-b font-semibold">{item.studentName}</td>
//                       <td className="p-3 border-b text-slate-600">{item.studentLoginId}</td>
//                       <td className="p-3 border-b">{item.title}</td>
//                       <td className="p-3 border-b">
//                         <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                           {item.subject}
//                         </span>
//                       </td>

//                       {/* NEW FILE COLUMN */}
//                       <td className="p-3 border-b">
//                         {item.fileLink ? (
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm font-medium text-slate-900 truncate max-w-32">
//                               📎 {item.fileName || 'File'}
//                             </span>
//                             <button
//                               onClick={() => handleDownloadFile(item.fileLink, item.fileName)}
//                               className="text-blue-600 hover:text-blue-800 font-medium text-sm p-1 hover:bg-blue-50 rounded"
//                               title="Download file"
//                             >
//                               ↓ Download
//                             </button>
//                           </div>
//                         ) : (
//                           <span className="text-slate-500 text-sm italic">No file</span>
//                         )}
//                       </td>

//                       <td className="p-3 border-b">
//                         <select
//                           value={editableData[item._id]?.status || 'Submitted'}
//                           onChange={(e) =>
//                             handleChange(item._id, 'status', e.target.value)
//                           }
//                           className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//                           className="border border-slate-300 rounded-lg px-3 py-2 w-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         <textarea
//                           value={editableData[item._id]?.feedback || ''}
//                           onChange={(e) =>
//                             handleChange(item._id, 'feedback', e.target.value)
//                           }
//                           rows={3}
//                           className="border border-slate-300 rounded-lg px-3 py-2 w-64 resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Write feedback here..."
//                         />
//                       </td>

//                       <td className="p-3 border-b">
//                         <span className="text-sm font-medium">
//                           {item.reviewedBy || <span className="text-slate-500">Not reviewed</span>}
//                         </span>
//                       </td>

//                       <td className="p-3 border-b">
//                         <button
//                           onClick={() => handleUpdate(item._id)}
//                           disabled={savingId === item._id}
//                           className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
//                             savingId === item._id
//                               ? 'bg-gray-400 cursor-not-allowed'
//                               : 'bg-green-600 hover:bg-green-700 hover:shadow-md active:scale-95'
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

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);
//   // Dashboard stats states
//   const [stats, setStats] = useState({
//     totalTeachers: 0,
//     totalStudents: 0,
//     totalSubmissions: 0,
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
//       console.log('USER DATA:', user); // Debug log

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

//   // Fetch submissions
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

//   // Fetch dashboard stats (class-wise)
//   // useEffect(() => {
//   //   const fetchDashboardStats = async () => {
//   //     if (!teacher?.className) {
//   //       setStatsLoading(false);
//   //       return;
//   //     }

//   //     try {
//   //       setStatsLoading(true);
//   //       console.log('Fetching stats for class:', teacher.className); // Debug
//   //       const res = await fetch(
//   //         `/api/teacher/dashboard?className=${encodeURIComponent(teacher.className)}`
//   //       );
//   //       const data = await res.json();
//   //       console.log('STATS RESPONSE:', data); // Debug

//   //       if (res.ok && data.success) {
//   //         setStats({
//   //           totalTeachers: data.totalTeachers || 0,
//   //           totalStudents: data.totalStudents || 0,
//   //           totalSubmissions: data.totalSubmissions || 0,
//   //         });
//   //       }
//   //     } catch (error) {
//   //       console.error('STATS FETCH ERROR:', error);
//   //     } finally {
//   //       setStatsLoading(false);
//   //     }
//   //   };

//   //   fetchDashboardStats();
//   // }, [teacher]);


//   // ... your existing imports and state ...

// // Updated stats useEffect with better error handling
// useEffect(() => {
//   const fetchDashboardStats = async () => {
//     if (!teacher?.className) {
//       console.log('No className, skipping stats');
//       setStatsLoading(false);
//       return;
//     }

//     try {
//       setStatsLoading(true);
//       console.log('Fetching stats for:', teacher.className);
      
//       const res = await fetch(
//         `/api/teacher/dashboard?className=${encodeURIComponent(teacher.className)}`
//       );
//       const data = await res.json();
//       console.log('API Response:', data);

//       if (res.ok && data.success) {
//         setStats(data);
//       } else {
//         console.error('API Error:', data.message);
//       }
//     } catch (error) {
//       console.error('Network Error:', error);
//     } finally {
//       setStatsLoading(false);
//     }
//   };

//   fetchDashboardStats();
// }, [teacher]);

// // Updated Dashboard JSX
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//   {/* Overview Card */}
//   <div className="bg-white rounded-2xl shadow p-6">
//     <h2 className="text-2xl font-bold text-slate-900 mb-6">
//       {teacher?.className ? `${teacher.className} Overview` : 'Overview'}
//     </h2>
//     {statsLoading ? (
//       <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
//         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//         Loading stats...
//       </div>
//     ) : teacher?.className ? (
//       <div className="grid grid-cols-2 gap-8">
//         <div>
//           <div className="text-sm font-medium text-slate-500 mb-2">Total Students</div>
//           <div className="text-4xl font-bold text-slate-900">{stats.totalStudents}</div>
//         </div>
//         <div>
//           <div className="text-sm font-medium text-slate-500 mb-2">Total Submissions</div>
//           <div className="text-4xl font-bold text-slate-900">{stats.totalSubmissions}</div>
//         </div>
//       </div>
//     ) : (
//       <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
//         <p>Class info missing in profile</p>
//         <p className="text-sm mt-1">Update your profile to see stats</p>
//       </div>
//     )}
//   </div>

//   {/* Class Breakdown */}
//   <div className="bg-white rounded-2xl shadow p-6">
//     <h3 className="text-xl font-bold text-slate-900 mb-4">Submissions by Class/Course</h3>
//     {statsLoading ? (
//       <p className="text-slate-600">Loading...</p>
//     ) : Object.keys(stats.submissionsByClass || {}).length === 0 ? (
//       <p className="text-slate-500 italic p-4 bg-slate-50 rounded-xl">No class-wise data</p>
//     ) : (
//       <div className="space-y-2 max-h-64 overflow-y-auto">
//         {Object.entries(stats.submissionsByClass).map(([className, count]) => (
//           <div key={className} className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg hover:bg-slate-100">
//             <span className="font-medium text-slate-900 truncate">{className}</span>
//             <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold min-w-[2.5rem] text-center">
//               {count}
//             </span>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// </div>

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (id, field, value) => {
//     setEditableData((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [field]: value,
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

//   const handleDownloadFile = (fileLink, fileName) => {
//     if (fileLink) {
//       const link = document.createElement('a');
//       link.href = fileLink;
//       link.download = fileName || 'assignment.pdf';
//       link.target = '_blank';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
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

//         {/* Dashboard Stats */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-2xl font-bold text-slate-900 mb-6">
//             Class: {teacher?.className || 'N/A'} Dashboard
//           </h2>
//           {statsLoading ? (
//             <div className="flex items-center gap-3 text-slate-600">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//               Loading stats...
//             </div>
//           ) : teacher?.className ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
//                 <h3 className="text-lg font-semibold opacity-90">Teachers</h3>
//                 <p className="text-4xl font-bold mt-2">{stats.totalTeachers}</p>
//               </div>
//               <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
//                 <h3 className="text-lg font-semibold opacity-90">Students</h3>
//                 <p className="text-4xl font-bold mt-2">{stats.totalStudents}</p>
//               </div>
//               <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
//                 <h3 className="text-lg font-semibold opacity-90">Submissions</h3>
//                 <p className="text-4xl font-bold mt-2">{stats.totalSubmissions}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl">
//               <p>Class information missing. Please update your profile.</p>
//             </div>
//           )}
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
//                     <th className="p-3 border-b font-semibold">#</th>
//                     <th className="p-3 border-b font-semibold">Student</th>
//                     <th className="p-3 border-b font-semibold">Login ID</th>
//                     <th className="p-3 border-b font-semibold">Title</th>
//                     <th className="p-3 border-b font-semibold">Subject</th>
//                     <th className="p-3 border-b font-semibold">File</th>
//                     <th className="p-3 border-b font-semibold">Status</th>
//                     <th className="p-3 border-b font-semibold">Marks</th>
//                     <th className="p-3 border-b font-semibold">Feedback</th>
//                     <th className="p-3 border-b font-semibold">Reviewed By</th>
//                     <th className="p-3 border-b font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {submissions.map((item, index) => (
//                     <tr key={item._id} className="hover:bg-slate-50 border-b">
//                       <td className="p-3 font-medium">{index + 1}</td>
//                       <td className="p-3 font-semibold text-slate-900">{item.studentName}</td>
//                       <td className="p-3 text-slate-600">{item.studentLoginId}</td>
//                       <td className="p-3">{item.title}</td>
//                       <td className="p-3">
//                         <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                           {item.subject}
//                         </span>
//                       </td>
//                       <td className="p-3">
//                         {item.fileLink ? (
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm font-medium text-slate-900 truncate max-w-32" title={item.fileName}>
//                               📎 {item.fileName || 'File'}
//                             </span>
//                             <button
//                               onClick={() => handleDownloadFile(item.fileLink, item.fileName)}
//                               className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded text-sm font-medium transition-all"
//                               title={`Download ${item.fileName || 'file'}`}
//                             >
//                               ↓
//                             </button>
//                           </div>
//                         ) : (
//                           <span className="text-slate-500 text-sm italic">No file</span>
//                         )}
//                       </td>
//                       <td className="p-3">
//                         <select
//                           value={editableData[item._id]?.status || 'Submitted'}
//                           onChange={(e) => handleChange(item._id, 'status', e.target.value)}
//                           className="border border-slate-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         >
//                           <option value="Submitted">Submitted</option>
//                           <option value="Under Review">Under Review</option>
//                           <option value="Checked">Checked</option>
//                         </select>
//                       </td>
//                       <td className="p-3">
//                         <input
//                           type="number"
//                           min="0"
//                           max="100"
//                           value={editableData[item._id]?.marks ?? 0}
//                           onChange={(e) => handleChange(item._id, 'marks', e.target.value)}
//                           className="border border-slate-300 rounded-lg px-3 py-2 w-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </td>
//                       <td className="p-3">
//                         <textarea
//                           value={editableData[item._id]?.feedback || ''}
//                           onChange={(e) => handleChange(item._id, 'feedback', e.target.value)}
//                           rows={3}
//                           className="border border-slate-300 rounded-lg px-3 py-2 w-64 resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Write feedback here..."
//                         />
//                       </td>
//                       <td className="p-3">
//                         <span className="text-sm font-medium">
//                           {item.reviewedBy || <span className="text-slate-500">Not reviewed</span>}
//                         </span>
//                       </td>
//                       <td className="p-3">
//                         <button
//                           onClick={() => handleUpdate(item._id)}
//                           disabled={savingId === item._id}
//                           className={`px-6 py-2 rounded-lg text-white font-medium transition-all ${
//                             savingId === item._id
//                               ? 'bg-gray-400 cursor-not-allowed'
//                               : 'bg-green-600 hover:bg-green-700 hover:shadow-md active:scale-95'
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
// import toast from 'react-hot-toast';

// export default function TeacherSubmissionsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [editableData, setEditableData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [savingId, setSavingId] = useState(null);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsed = JSON.parse(savedUser);

//       if (parsed.role !== 'TEACHER') {
//         router.push('/');
//         return;
//       }

//       setTeacher(parsed);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!teacher?._id) return;

//       try {
//         setLoading(true);

//         const res = await fetch(`/api/submissions?teacherId=${teacher._id}`);
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
//         toast.error('Failed to load submissions');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [teacher]);

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

//       const res = await fetch(`/api/submissions/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
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

//       setSubmissions((prev) =>
//         prev.map((item) =>
//           item._id === id
//             ? {
//                 ...item,
//                 status: rowData.status,
//                 marks: rowData.marks,
//                 feedback: rowData.feedback,
//                 reviewedBy: teacher.name,
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

//   if (!teacher) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               Teacher Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Review only your own assignments.
//             </p>
//           </div>

//           <button
//             onClick={() => router.push('/teacher')}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>

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
//                           {savingId === item._id ? 'Saving...' : 'Save'}
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

//   const [studentForm, setStudentForm] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     email: '',
//     courseName: '',
//     className: '',
//     section: '',
//     rollNo: '',
//   });

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

//   const fetchSubmissions = async () => {
//     if (!teacher?.id && !teacher?._id) return;

//     try {
//       setLoading(true);

//       const teacherId = teacher.id || teacher._id;
//       const params = new URLSearchParams({
//         teacherId,
//         page: String(filters.page),
//         limit: String(filters.limit),
//         search: filters.search,
//         course: filters.courseName,
//         status: filters.status,
//       });

//       const res = await fetch(`/api/submissions?${params.toString()}`);
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to fetch submissions');
//         return;
//       }

//       setSubmissions(data.submissions || []);
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
//       (data.submissions || []).forEach((item) => {
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
//     if (teacher) {
//       fetchSubmissions();
//     }
//   }, [teacher, filters.page, filters.limit, filters.course, filters.status]);

//   useEffect(() => {
//     if (!teacher) return;

//     const timer = setTimeout(() => {
//       fetchSubmissions();
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [filters.search]);

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

//   const handleStudentChange = (e) => {
//     const { name, value } = e.target;
//     setStudentForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreateStudent = async (e) => {
//     e.preventDefault();

//     try {
//       const teacherId = teacher?.id || teacher?._id;

//       const res = await fetch('/api/teachers/create-student', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...studentForm, teacherId }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to create student');
//         return;
//       }

//       toast.success('Student account created successfully');

//       setStudentForm({
//         name: '',
//         loginId: '',
//         password: '',
//         email: '',
//         course: '',
//         className: '',
//         section: '',
//         rollNo: '',
//       });
//     } catch (error) {
//       toast.error('Failed to create student');
//     }
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
//                 setFilters((prev) => ({ ...prev, course: e.target.value, page: 1 }))
//               }
//               className="border rounded-lg px-4 py-3"
//             >
//               <option value="">All Courses</option>
//               <option value="BSc">BSc</option>
//               <option value="MCA">MCA</option>
//               <option value="Checked">Checked</option>
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
//             <p className="text-slate-600">
//               No assignments were submitted to you yet.
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
//                         <td className="p-3 border-b">{item.courseName || '-'}</td>
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

// import { useCallback, useEffect, useMemo, useState } from 'react';
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

// export default function StudentSubmissionsPage() {
//   const router = useRouter();

//   const [student, setStudent] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsed = JSON.parse(savedUser);

//       if (parsed.role !== 'STUDENT') {
//         localStorage.removeItem('user');
//         router.push('/');
//         return;
//       }

//       setStudent(parsed);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   const fetchSubmissions = useCallback(async () => {
//     if (!student?.id && !student?._id) return;

//     try {
//       setLoading(true);

//       const studentId = student.id || student._id;
//       const params = new URLSearchParams({
//         studentId,
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

//       const res = await fetch(`/api/student-submissions?${params.toString()}`, {
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

//       setSubmissions(data.submissions || []);
//       setCourseOptions(data.courseOptions || []);
//       setPagination(
//         data.pagination || {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         }
//       );
//     } catch (error) {
//       console.error('FETCH STUDENT SUBMISSIONS ERROR:', error);
//       toast.error('Failed to load submissions');
//       setSubmissions([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [student, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

//   useEffect(() => {
//     if (!student) return;

//     const timer = setTimeout(() => {
//       fetchSubmissions();
//     }, filters.search ? 350 : 0);

//     return () => clearTimeout(timer);
//   }, [student, fetchSubmissions, filters.search]);

//   const stats = useMemo(() => {
//     const byCourse = {};
//     submissions.forEach((s) => {
//       const course = s.courseName || 'Not Specified';
//       byCourse[course] = (byCourse[course] || 0) + 1;
//     });

//     return {
//       totalSubmissions: pagination.total || submissions.length,
//       submissionsByCourse: byCourse,
//     };
//   }, [submissions, pagination.total]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   if (!student) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {student.name} - My Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               View your uploaded assignments, check status, marks, feedback, and file details.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={() => router.push('/student')}
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
//           <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Courses</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {courseOptions.length}
//               </div>
//             </div>
//           </div>

//           {courseOptions.length > 0 && (
//             <div>
//               <div className="text-sm font-medium text-slate-500 mb-2">
//                 Submitted Courses
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
//               placeholder="Search by title, subject, teacher..."
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
//             <p className="text-slate-600">No submissions found.</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-left">
//                       <th className="p-3 border-b">#</th>
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Subject</th>
//                       <th className="p-3 border-b">Teacher</th>
//                       <th className="p-3 border-b">Course</th>
//                       <th className="p-3 border-b">Class</th>
//                       <th className="p-3 border-b">File</th>
//                       <th className="p-3 border-b">Status</th>
//                       <th className="p-3 border-b">Marks</th>
//                       <th className="p-3 border-b">Feedback</th>
//                       <th className="p-3 border-b">Submitted</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submissions.map((item, index) => (
//                       <tr key={item._id} className="hover:bg-slate-50 align-top">
//                         <td className="p-3 border-b">
//                           {(pagination.currentPage - 1) * filters.limit + index + 1}
//                         </td>
//                         <td className="p-3 border-b">{item.title || '-'}</td>
//                         <td className="p-3 border-b">{item.subject || '-'}</td>
//                         <td className="p-3 border-b">{item.teacherName || '-'}</td>
//                         <td className="p-3 border-b">{item.courseName || 'Not Specified'}</td>
//                         <td className="p-3 border-b">{item.className || '-'}</td>

//                         <td className="p-3 border-b">
//                           <div className="flex flex-col gap-2 min-w-[170px]">
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
//                         </td>

//                         <td className="p-3 border-b">
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               item.status === 'Checked'
//                                 ? 'bg-green-100 text-green-700'
//                                 : item.status === 'Under Review'
//                                 ? 'bg-yellow-100 text-yellow-700'
//                                 : 'bg-blue-100 text-blue-700'
//                             }`}
//                           >
//                             {item.status || 'Submitted'}
//                           </span>
//                         </td>
//                         <td className="p-3 border-b">{item.marks ?? '-'}</td>
//                         <td className="p-3 border-b">{item.feedback || '-'}</td>
//                         <td className="p-3 border-b">
//                           {item.createdAt
//                             ? new Date(item.createdAt).toLocaleDateString()
//                             : '-'}
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

// import { useCallback, useEffect, useMemo, useState } from 'react';
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

//   const [authChecked, setAuthChecked] = useState(false);
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
//     if (typeof window === 'undefined') return;

//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.replace('/');
//         setAuthChecked(true);
//         return;
//       }

//       const parsed = JSON.parse(savedUser);

//       if (parsed.role !== 'TEACHER') {
//         localStorage.removeItem('user');
//         router.replace('/');
//         setAuthChecked(true);
//         return;
//       }

//       setTeacher(parsed);
//       setAuthChecked(true);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.replace('/');
//       setAuthChecked(true);
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
//         setTeacherInfo(null);
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

//     const timer = setTimeout(() => {
//       fetchSubmissions();
//     }, filters.search ? 350 : 0);

//     return () => clearTimeout(timer);
//   }, [teacher, fetchSubmissions, filters.search]);

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
//     router.replace('/');
//   };

//   if (!authChecked) {
//     return <div className="min-h-screen bg-slate-100 p-6">Checking login...</div>;
//   }

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
//           <h2 className="text-xl font-bold text-slate-900 mb-4">Your Submissions Overview</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Students</div>
//               <div className="text-3xl font-bold text-slate-900">{stats.totalStudents}</div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">{stats.totalSubmissions}</div>
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
//             <p className="text-slate-600">No assignments found for the current filters.</p>
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

//                         <td className="p-3 border-b">
//                           <div className="flex flex-col gap-2 min-w-[170px]">
//                             <span
//                               className="text-sm text-slate-700 break-all"
//                               title={item.fileName || ''}
//                             >
//                               {item.fileName ? shortenFileName(item.fileName, 16) : 'No File'}
//                             </span>

//                             {item.fileName ? (
//                               <a
//                                 href={item.fileName}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 download={item.shortenFileName || true}
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
//                         </td>

//                         <td className="p-3 border-b">
//                           <select
//                             value={editableData[item._id]?.status || 'Submitted'}
//                             onChange={(e) => handleChange(item._id, 'status', e.target.value)}
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
//                             onChange={(e) => handleChange(item._id, 'marks', e.target.value)}
//                             className="border rounded-lg px-3 py-2 w-24"
//                           />
//                         </td>
//                         <td className="p-3 border-b">
//                           <textarea
//                             value={editableData[item._id]?.feedback || ''}
//                             onChange={(e) => handleChange(item._id, 'feedback', e.target.value)}
//                             rows={3}
//                             className="border rounded-lg px-3 py-2 w-64"
//                             placeholder="Write feedback"
//                           />
//                         </td>
//                         <td className="p-3 border-b">{item.reviewedBy || 'Not reviewed'}</td>
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

// export default function StudentSubmissionsPage() {
//   const router = useRouter();
//   const debounceRef = useRef(null);

//   const [student, setStudent] = useState(null);
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//         const parsedUser = JSON.parse(savedUser);


//         if (!parsedUser || typeof parsedUser !== 'object') {
//         localStorage.removeItem('user');
//         router.replace('/');
//         return;
//       }

//          if ((parsedUser.role || '').toUpperCase() !== 'STUDENT') {
//         localStorage.removeItem('user');
//         router.replace('/');
//         return;
//       }

//       if (!parsedUser.id && !parsedUser._id) {
//         localStorage.removeItem('user');
//         router.replace('/');
//         return;
//       }
//       setStudent(parsed);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.replace('/');
//     } finally {
//       setCheckingAuth(false)
//     }
//   }, [router]);

//   const fetchSubmissions = useCallback(async () => {
//     if (!student?.id && !student?._id) return;

//     try {
//       setLoading(true);

//       const studentId = student.id || student._id;
//       const params = new URLSearchParams({
//         studentId,
//         page: String(filters.page),
//         limit: String(filters.limit),
//       });

//       if (filters.search.trim()) params.set('search', filters.search.trim());
//       if (filters.courseName) params.set('courseName', filters.courseName);
//       if (filters.status) params.set('status', filters.status);

//       const res = await fetch(`/api/student-submissions?${params.toString()}`, {
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
//         setCourseOptions([]);
//         return;
//       }

//       setSubmissions(data.submissions || []);
//       setCourseOptions(data.courseOptions || []);
//       setPagination(
//         data.pagination || {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         }
//       );
//     } catch (error) {
//       toast.error('Failed to load submissions');
//     } finally {
//       setLoading(false);
//     }
//   }, [student, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

//   useEffect(() => {
//     if (!student) return;

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
//   }, [student, fetchSubmissions]);

//   const stats = useMemo(() => {
//     const byCourse = {};
//     submissions.forEach((s) => {
//       const course = s.courseName || 'Unknown';
//       byCourse[course] = (byCourse[course] || 0) + 1;
//     });

//     return {
//       totalSubmissions: pagination.total || submissions.length,
//       submissionsByCourse: byCourse,
//     };
//   }, [submissions, pagination.total]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   if (!student) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {student.name} - My Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               Track assignment files, review status, marks, and feedback.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={() => router.push('/student')}
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
//           <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Courses</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {courseOptions.length}
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
//               placeholder="Search by title, subject, teacher..."
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
//             <p className="text-slate-600">No submissions found.</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-left">
//                       <th className="p-3 border-b">#</th>
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Subject</th>
//                       <th className="p-3 border-b">Teacher</th>
//                       <th className="p-3 border-b">Course</th>
//                       <th className="p-3 border-b">Class</th>
//                       <th className="p-3 border-b">File</th>
//                       <th className="p-3 border-b">Status</th>
//                       <th className="p-3 border-b">Marks</th>
//                       <th className="p-3 border-b">Feedback</th>
//                       <th className="p-3 border-b">Submitted</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submissions.map((item, index) => (
//                       <tr key={item._id} className="hover:bg-slate-50 align-top">
//                         <td className="p-3 border-b">
//                           {(pagination.currentPage - 1) * filters.limit + index + 1}
//                         </td>
//                         <td className="p-3 border-b">{item.title || '-'}</td>
//                         <td className="p-3 border-b">{item.subject || '-'}</td>
//                         <td className="p-3 border-b">{item.teacherName || '-'}</td>
//                         <td className="p-3 border-b">{item.courseName || '-'}</td>
//                         <td className="p-3 border-b">{item.className || '-'}</td>

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

//                             {item.fileUrl ? (
//                               <a
//                                 href={item.fileUrl}
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

//                         <td className="p-3 border-b">
//   <div className="flex flex-col gap-2 min-w-[170px]">
//     <span
//       className="text-sm text-slate-700 break-all"
//       title={item.fileName || ''}
//     >
//       {item.fileName ? shortenFileName(item.fileName, 16) : 'No File'}
//     </span>

//     {(item.fileUrl || item.fileName) ? (
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
//       >
//         No File
//       </button>
//     )}
//   </div>
// </td>

//                         <td className="p-3 border-b">{item.status || 'Submitted'}</td>
//                         <td className="p-3 border-b">{item.marks ?? '-'}</td>
//                         <td className="p-3 border-b">{item.feedback || '-'}</td>
//                         <td className="p-3 border-b">
//                           {item.createdAt
//                             ? new Date(item.createdAt).toLocaleDateString()
//                             : '-'}
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

// import { useEffect, useState, useCallback, useMemo } from 'react';
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
// export default function StudentSubmissionsPage() {
//   const router = useRouter();

//   const [student, setStudent] = useState(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(false);

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

//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.replace('/');
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (!parsedUser || typeof parsedUser !== 'object') {
//         localStorage.removeItem('user');
//         router.replace('/');
//         return;
//       }

//       if ((parsedUser.role || '').toUpperCase() !== 'STUDENT') {
//         localStorage.removeItem('user');
//         router.replace('/');
//         return;
//       }

//       if (!parsedUser.id && !parsedUser._id) {
//         localStorage.removeItem('user');
//         router.replace('/');
//         return;
//       }

//       setStudent(parsedUser);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.replace('/');
//     } finally {
//       setCheckingAuth(false);
//     }
//   }, [router]);

//   const fetchSubmissions = useCallback(async () => {
//     if (!student?.id && !student?._id) return;

//     try {
//       setLoading(true);

//       const studentId = student.id || student._id;

//       const params = new URLSearchParams({
//         studentId,
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

//       const res = await fetch(`/api/student-submissions?${params.toString()}`, {
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
//         setCourseOptions([]);
//         return;
//       }

//       setSubmissions(data.submissions || []);
//       setPagination(
//         data.pagination || {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         }
//       );
//       setCourseOptions(data.courseOptions || []);
//     } catch (error) {
//       toast.error('Failed to load submissions');
//       setSubmissions([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [student, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

//   useEffect(() => {
//     if (!student) return;

//     const timer = setTimeout(() => {
//       fetchSubmissions();
//     }, filters.search ? 400 : 0);

//     return () => clearTimeout(timer);
//   }, [student, fetchSubmissions, filters.search]);

//   const stats = useMemo(() => {
//     const byCourse = {};
//     submissions.forEach((s) => {
//       const course = s.courseName || 'Not Specified';
//       byCourse[course] = (byCourse[course] || 0) + 1;
//     });

//     return {
//       totalSubmissions: pagination.total || submissions.length,
//       submissionsByCourse: byCourse,
//     };
//   }, [submissions, pagination.total]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//     router.replace('/');
//   };

//   if (checkingAuth) {
//     return (
//       <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow px-6 py-4 text-slate-700">
//           Checking login...
//         </div>
//       </main>
//     );
//   }

//   if (!student) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {student.name} - My Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               View your submitted assignments, status, marks, feedback, and files.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={() => router.push('/student')}
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
//           <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Courses</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {courseOptions.length}
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
//               placeholder="Search by title, subject, teacher..."
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

//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : submissions.length === 0 ? (
//             <p className="text-slate-600">No submissions found.</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-left">
//                       <th className="p-3 border-b">#</th>
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Subject</th>
//                       <th className="p-3 border-b">Teacher</th>
//                       <th className="p-3 border-b">Course</th>
//                       <th className="p-3 border-b">Class</th>
//                       <th className="p-3 border-b">File</th>
//                       <th className="p-3 border-b">Status</th>
//                       <th className="p-3 border-b">Marks</th>
//                       <th className="p-3 border-b">Feedback</th>
//                       <th className="p-3 border-b">Submitted</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submissions.map((item, index) => (
//                       <tr key={item._id} className="hover:bg-slate-50 align-top">
//                         <td className="p-3 border-b">
//                           {(pagination.currentPage - 1) * filters.limit + index + 1}
//                         </td>
//                         <td className="p-3 border-b">{item.title || '-'}</td>
//                         <td className="p-3 border-b">{item.subject || '-'}</td>
//                         <td className="p-3 border-b">{item.teacherName || '-'}</td>
//                         <td className="p-3 border-b">{item.courseName || '-'}</td>
//                         <td className="p-3 border-b">{item.className || '-'}</td>
                        
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

//                             {(item.fileUrl || item.fileName) ? (
//                               <a
//                                 href={item.fileUrl || `/uploads/${item.fileName}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 download={item.fileName || 'submission.pdf'}
//                                 className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                               >
//                                 Download PDF
//                               </a>
//                             ) : (
//                               <button
//                                 type="button"
//                                 disabled
//                                 className="inline-flex w-fit items-center justify-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-medium text-slate-500 cursor-not-allowed"
//                               >
//                                 No File
//                               </button>
//                             )}
//                           </div>
//                         </td> */}

//                         <td className="p-3 border-b">
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
//         title="File not available"
//       >
//         No File
//       </button>
//     )}
//   </div>
// </td>
//                         <td className="p-3 border-b">{item.status || '-'}</td>
//                         <td className="p-3 border-b">{item.marks ?? '-'}</td>
//                         <td className="p-3 border-b">{item.feedback || '-'}</td>
//                         <td className="p-3 border-b">
//                           {item.createdAt
//                             ? new Date(item.createdAt).toLocaleDateString()
//                             : '-'}
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

// import { useEffect, useState, useCallback, useMemo } from 'react';
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

// export default function StudentSubmissionsPage() {
//   const router = useRouter();

//   const [student, setStudent] = useState(null);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(false);

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

//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         setCheckingAuth(false);
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (!parsedUser || typeof parsedUser !== 'object') {
//         localStorage.removeItem('user');
//         setCheckingAuth(false);
//         return;
//       }

//       const role = String(
//         parsedUser.role ||
//           parsedUser.userRole ||
//           parsedUser.type ||
//           ''
//       ).toUpperCase();

//       const userId =
//         parsedUser.id ||
//         parsedUser._id ||
//         parsedUser.userId ||
//         parsedUser.studentId;

//       if (role !== 'STUDENT' || !userId) {
//         setCheckingAuth(false);
//         return;
//       }

//       setStudent({
//         ...parsedUser,
//         _resolvedId: userId,
//       });
//     } catch (error) {
//       console.error('AUTH CHECK ERROR:', error);
//       localStorage.removeItem('user');
//     } finally {
//       setCheckingAuth(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!checkingAuth && !student) {
//       toast.error('Please login first');
//       router.replace('/');
//     }
//   }, [checkingAuth, student, router]);

//   const fetchSubmissions = useCallback(async () => {
//     if (!student?._resolvedId) return;

//     try {
//       setLoading(true);

//       const params = new URLSearchParams({
//         studentId: String(student._resolvedId),
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

//       const res = await fetch(`/api/student-submissions?${params.toString()}`, {
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
//         setCourseOptions([]);
//         return;
//       }

//       setSubmissions(data.submissions || []);
//       setPagination(
//         data.pagination || {
//           total: 0,
//           totalPages: 1,
//           currentPage: 1,
//         }
//       );
//       setCourseOptions(data.courseOptions || []);
//     } catch (error) {
//       console.error('FETCH SUBMISSIONS ERROR:', error);
//       toast.error('Failed to load submissions');
//       setSubmissions([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [student, filters.page, filters.limit, filters.search, filters.courseName, filters.status]);

//   useEffect(() => {
//     if (!student) return;

//     const timer = setTimeout(() => {
//       fetchSubmissions();
//     }, filters.search ? 400 : 0);

//     return () => clearTimeout(timer);
//   }, [student, fetchSubmissions, filters.search]);

//   const stats = useMemo(() => {
//     const byCourse = {};
//     submissions.forEach((s) => {
//       const course = s.courseName || 'Not Specified';
//       byCourse[course] = (byCourse[course] || 0) + 1;
//     });

//     return {
//       totalSubmissions: pagination.total || submissions.length,
//       submissionsByCourse: byCourse,
//     };
//   }, [submissions, pagination.total]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//     router.replace('/');
//   };

//   if (checkingAuth) {
//     return (
//       <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow px-6 py-4 text-slate-700">
//           Checking login...
//         </div>
//       </main>
//     );
//   }

//   if (!student) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">
//               {student.name || 'Student'} - My Submissions
//             </h1>
//             <p className="text-slate-600 mt-1">
//               View your submitted assignments, status, marks, feedback, and files.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               onClick={() => router.push('/student')}
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
//           <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <div>
//               <div className="text-sm font-medium text-slate-500">Total Submissions</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {stats.totalSubmissions}
//               </div>
//             </div>
//             <div>
//               <div className="text-sm font-medium text-slate-500">Courses</div>
//               <div className="text-3xl font-bold text-slate-900">
//                 {courseOptions.length}
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
//               placeholder="Search by title, subject, teacher..."
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

//         <div className="bg-white rounded-2xl shadow p-6">
//           {loading ? (
//             <p className="text-slate-600">Loading submissions...</p>
//           ) : submissions.length === 0 ? (
//             <p className="text-slate-600">No submissions found.</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-slate-100 text-left">
//                       <th className="p-3 border-b">#</th>
//                       <th className="p-3 border-b">Title</th>
//                       <th className="p-3 border-b">Subject</th>
//                       <th className="p-3 border-b">Teacher</th>
//                       <th className="p-3 border-b">Course</th>
//                       <th className="p-3 border-b">Class</th>
//                       <th className="p-3 border-b">File</th>
//                       <th className="p-3 border-b">Status</th>
//                       <th className="p-3 border-b">Marks</th>
//                       <th className="p-3 border-b">Feedback</th>
//                       <th className="p-3 border-b">Submitted</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submissions.map((item, index) => (
//                       <tr key={item._id} className="hover:bg-slate-50 align-top">
//                         <td className="p-3 border-b">
//                           {(pagination.currentPage - 1) * filters.limit + index + 1}
//                         </td>
//                         <td className="p-3 border-b">{item.title || '-'}</td>
//                         <td className="p-3 border-b">{item.subject || '-'}</td>
//                         <td className="p-3 border-b">{item.teacherName || '-'}</td>
//                         <td className="p-3 border-b">{item.courseName || '-'}</td>
//                         <td className="p-3 border-b">{item.className || '-'}</td>

//                         <td className="p-3 border-b">
//                           <div className="flex flex-col gap-2 min-w-[170px]">
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
//                                 download={item.fileName || 'submission.pdf'}
//                                 className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                               >
//                                 Download PDF
//                               </a>
//                             ) : item.fileName ? (
//                               <a
//                                 href={`/uploads/${item.fileName}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 download={item.fileName}
//                                 className="inline-flex w-fit items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                               >
//                                 Download PDF
//                               </a>
//                             ) : (
//                               <button
//                                 type="button"
//                                 disabled
//                                 className="inline-flex w-fit items-center justify-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-medium text-slate-500 cursor-not-allowed"
//                                 title="File not available"
//                               >
//                                 No File
//                               </button>
//                             )}
//                           </div>
//                         </td>

//                         <td className="p-3 border-b">{item.status || '-'}</td>
//                         <td className="p-3 border-b">{item.marks ?? '-'}</td>
//                         <td className="p-3 border-b">{item.feedback || '-'}</td>
//                         <td className="p-3 border-b">
//                           {item.createdAt
//                             ? new Date(item.createdAt).toLocaleDateString()
//                             : '-'}
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