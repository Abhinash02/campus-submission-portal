// import { prisma } from '@/lib/prisma';

// export default async function StudentsPage() {
//   const students = await prisma.student.findMany({ include: { user: true } });

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Manage Students</h1>
//       <form action="/api/admin/students" method="POST" className="grid md:grid-cols-5 gap-4 bg-white p-5 rounded-2xl shadow">
//         <input name="name" placeholder="Student Name" className="border rounded-lg px-4 py-3" />
//         <input name="rollNo" placeholder="Roll Number" className="border rounded-lg px-4 py-3" />
//         <input name="className" placeholder="Class" className="border rounded-lg px-4 py-3" />
//         <input name="section" placeholder="Section" className="border rounded-lg px-4 py-3" />
//         <input name="password" placeholder="Password" className="border rounded-lg px-4 py-3" />
//         <button className="md:col-span-5 bg-blue-600 text-white py-3 rounded-lg">Add Student</button>
//       </form>

//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Roll No</th>
//               <th className="p-3 text-left">Class</th>
//               <th className="p-3 text-left">Section</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id} className="border-t">
//                 <td className="p-3">{student.user.name}</td>
//                 <td className="p-3">{student.user.rollNo}</td>
//                 <td className="p-3">{student.className}</td>
//                 <td className="p-3">{student.section}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function StudentsPage() {
//   const router = useRouter();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadStudents = async () => {
//     try {
//       const res = await fetch('/api/users', { cache: 'no-store' });
//       const data = await res.json();

//       if (res.ok) {
//         const filteredStudents = data.filter(
//           (user) => user.role === 'STUDENT'
//         );
//         setStudents(filteredStudents);
//       }
//     } catch (error) {
//       console.error('Failed to load students:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (parsedUser.role !== 'ADMIN') {
//         router.push('/');
//         return;
//       }

//       loadStudents();
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`/api/users/${id}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || 'Failed to delete student');
//         return;
//       }

//       loadStudents();
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading students...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Manage Students</h1>
//           <button
//             onClick={() => router.push('/admin')}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//           >
//             Back to Admin
//           </button>
//         </div>

//         {students.length === 0 ? (
//           <p className="text-slate-600">No students found.</p>
//         ) : (
//           <div className="grid gap-4">
//             {students.map((student) => (
//               <div
//                 key={student._id}
//                 className="border rounded-xl p-4 flex items-center justify-between"
//               >
//                 <div>
//                   <p className="font-semibold">{student.name}</p>
//                   <p className="text-sm text-slate-600">
//                     Login ID: {student.loginId}
//                   </p>
//                   <p className="text-sm text-slate-600">
//                     Email: {student.email || '-'}
//                   </p>
//                   <p className="text-sm text-slate-600">
//                     Course: {student.course || '-'}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => handleDelete(student._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function StudentsPage() {
//   const router = useRouter();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, [router]);

//   const checkAuthAndLoad = async () => {
//     try {
//       const savedUser = localStorage.getItem('user');
//       if (!savedUser || JSON.parse(savedUser).role !== 'ADMIN') {
//         router.push('/');
//         return;
//       }
//       await loadStudents();
//     } catch (error) {
//       router.push('/');
//     }
//   };

//   const loadStudents = async () => {
//     try {
//       const res = await fetch('/api/users');
//       const data = await res.json();
//       if (res.ok) {
//         setStudents(data.filter(user => user.role === 'STUDENT'));
//       }
//     } catch (error) {
//       console.error('Failed to load students:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (student) => {
//     setEditingId(student._id);
//     setEditForm({
//       name: student.name,
//       loginId: student.loginId, // This is your username
//       email: student.email,
//       course: student.course,
//     });
//   };

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const res = await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editForm),
//       });
      
//       if (res.ok) {
//         setEditingId(null);
//         await loadStudents();
//       } else {
//         alert('Failed to update student');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this student?')) return;
    
//     try {
//       const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         await loadStudents();
//       } else {
//         alert('Failed to delete student');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   if (loading) return <div className="p-6 text-lg">Loading students...</div>;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold">Manage Students</h1>
//             <button
//               onClick={() => router.push('/admin')}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               ← Back to Admin
//             </button>
//           </div>

//           {students.length === 0 ? (
//             <p className="text-slate-600 text-center py-12">No students found.</p>
//           ) : (
//             <div className="space-y-4">
//               {students.map((student) => (
//                 <div key={student._id} className="border rounded-xl p-6 hover:shadow-md">
//                   {editingId === student._id ? (
//                     // Edit Form
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Name</label>
//                         <input
//                           name="name"
//                           value={editForm.name}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Login ID (Username)</label>
//                         <input
//                           name="loginId"
//                           value={editForm.loginId}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Email</label>
//                         <input
//                           name="email"
//                           value={editForm.email}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Course</label>
//                         <input
//                           name="course"
//                           value={editForm.course}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleUpdate(student._id)}
//                           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                         >
//                           Save Changes
//                         </button>
//                         <button
//                           onClick={() => setEditingId(null)}
//                           className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     // View Mode
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold">{student.name}</h3>
//                         <p className="text-slate-600">
//                           Login ID (Username): <strong>{student.loginId}</strong>
//                         </p>
//                         <p className="text-slate-600">Email: {student.email || 'Not set'}</p>
//                         <p className="text-slate-600">Course: {student.course || 'Not set'}</p>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(student)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(student._id)}
//                           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Quick Actions — moved to bottom */}
//         {/* <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>
//           <div className="grid md:grid-cols-2 gap-4">
//             <button
//               onClick={() => router.push('/admin')}
//               className="w-full border border-slate-200 rounded-xl p-6 hover:bg-slate-50"
//             >
//               <p className="font-semibold text-slate-900">← Back to Admin</p>
//               <p className="text-sm text-slate-600 mt-1">
//                 Create new students and teachers
//               </p>
//             </button>
//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="w-full border border-slate-200 rounded-xl p-6 hover:bg-slate-50"
//             >
//               <p className="font-semibold text-slate-900">👨‍🏫 Manage Teachers</p>
//               <p className="text-sm text-slate-600 mt-1">
//                 View, edit, and delete teacher accounts
//               </p>
//             </button>
//           </div>
//         </div> */}
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function StudentsPage() {
//   const router = useRouter();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: '',
//     loginId: '',
//     email: '',
//     role: 'STUDENT',
//     course: '',
//     className: '',
//     section: '',
//     subject: '',
//   });

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, []);

//   const checkAuthAndLoad = async () => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (parsedUser.role !== 'ADMIN') {
//         router.push('/');
//         return;
//       }

//       await loadStudents();
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   };

//   const loadStudents = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('/api/users', { cache: 'no-store' });
//       const data = await res.json();

//       if (res.ok) {
//         const studentUsers = data.filter((user) => user.role === 'STUDENT');
//         setStudents(studentUsers);
//       }
//     } catch (error) {
//       console.error('Failed to load students:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (student) => {
//     setEditingId(student._id);
//     setEditForm({
//       name: student.name || '',
//       loginId: student.loginId || '',
//       email: student.email || '',
//       role: 'STUDENT',
//       course: student.course || '',
//       className: student.className || '',
//       section: student.section || '',
//       subject: '',
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const res = await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editForm),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || 'Failed to update student');
//         return;
//       }

//       setEditingId(null);
//       await loadStudents();
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this student?')) return;

//     try {
//       const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || 'Failed to delete student');
//         return;
//       }

//       await loadStudents();
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   if (loading) return <div className="p-6 text-lg">Loading students...</div>;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-bold">Manage Students</h1>
//             <button
//               onClick={() => router.push('/admin')}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               ← Back to Admin
//             </button>
//           </div>

//           {students.length === 0 ? (
//             <p className="text-slate-600 text-center py-12">No students found.</p>
//           ) : (
//             <div className="space-y-4">
//               {students.map((student) => (
//                 <div key={student._id} className="border rounded-xl p-6 hover:shadow-md">
//                   {editingId === student._id ? (
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Name</label>
//                         <input
//                           name="name"
//                           value={editForm.name}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Login ID</label>
//                         <input
//                           name="loginId"
//                           value={editForm.loginId}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Email</label>
//                         <input
//                           name="email"
//                           value={editForm.email}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Course</label>
//                         <input
//                           name="course"
//                           value={editForm.course}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Class</label>
//                         <input
//                           name="className"
//                           value={editForm.className}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">Section</label>
//                         <input
//                           name="section"
//                           value={editForm.section}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleUpdate(student._id)}
//                           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                         >
//                           Save Changes
//                         </button>
//                         <button
//                           onClick={() => setEditingId(null)}
//                           className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold">{student.name}</h3>
//                         <p className="text-slate-600">Login ID: <strong>{student.loginId}</strong></p>
//                         <p className="text-slate-600">Email: {student.email || 'Not set'}</p>
//                         <p className="text-slate-600">Role: {student.role}</p>
//                         <p className="text-slate-600">Course: {student.course || 'Not set'}</p>
//                         <p className="text-slate-600">Class: {student.className || 'Not set'}</p>
//                         <p className="text-slate-600">Section: {student.section || 'Not set'}</p>
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(student)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(student._id)}
//                           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function StudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    loginId: '',
    email: '',
    role: 'STUDENT',
    course: '',
    className: '',
    section: '',
    subject: '',
  });

  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 3;

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (parsedUser.role !== 'ADMIN') {
        router.push('/');
        return;
      }

      await loadStudents();
    } catch (error) {
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users', { cache: 'no-store' });
      const data = await res.json();

      if (Array.isArray(data)) {
        const studentUsers = data.filter((user) => user.role === 'STUDENT');
        setStudents(studentUsers);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Failed to load students:', error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setEditForm({
      name: student.name || '',
      loginId: student.loginId || '',
      email: student.email || '',
      role: 'STUDENT',
      course: student.course || '',
      className: student.className || '',
      section: student.section || '',
      subject: '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || 'Failed to update student');
        return;
      }

      setEditingId(null);
      await loadStudents();
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || 'Failed to delete student');
        return;
      }

      await loadStudents();
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  // Filter and search
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.loginId.toLowerCase().includes(search.toLowerCase()) ||
      (s.email || '').toLowerCase().includes(search.toLowerCase());

    const matchesCourse = !filterCourse || s.course === filterCourse;

    return matchesSearch && matchesCourse;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / perPage));
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const courses = Array.from(
    new Set(students.map((s) => s.course).filter(Boolean))
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <DotLottieReact
            src="/animations/loading-student.lottie"
            loop
            autoplay
            style={{ width: 120, height: 120, margin: '0 auto' }}
          />
          <p className="text-lg text-slate-700 mt-4">Loading students...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-bold">Manage Students</h1>

            <button
              onClick={() => router.push('/admin')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              ← Back to Admin
            </button>
          </div>

          {/* Controls: search, filter, pagination */}
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Name, Login ID, or Email"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Course</label>
              <select
                value={filterCourse}
                onChange={(e) => {
                  setFilterCourse(e.target.value);
                  setPage(1);
                }}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
              >
                <option value="">All courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Page</label>
              <select
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <option key={p} value={p}>
                    {p} / {totalPages}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <p className="text-sm text-slate-600">
                Showing{' '}
                <span className="text-slate-900 font-semibold">
                  {paginatedStudents.length}
                </span>{' '}
                of {filteredStudents.length} students
              </p>
            </div>
          </div>

          {paginatedStudents.length === 0 ? (
            <p className="text-slate-600 text-center py-12">
              No students found matching your search or filter.
            </p>
          ) : (
            <div className="space-y-4 mt-6">
              {paginatedStudents.map((student) => (
                <div
                  key={student._id}
                  className="border rounded-xl p-6 hover:shadow-md"
                >
                  {editingId === student._id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Login ID
                        </label>
                        <input
                          name="loginId"
                          value={editForm.loginId}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Course
                        </label>
                        <input
                          name="course"
                          value={editForm.course}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                          placeholder="Enter course (e.g., BCA, MCA)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Class
                        </label>
                        <input
                          name="className"
                          value={editForm.className}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Section
                        </label>
                        <input
                          name="section"
                          value={editForm.section}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdate(student._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{student.name}</h3>
                        <p className="text-slate-600">
                          Login ID: <strong>{student.loginId}</strong>
                        </p>
                        <p className="text-slate-600">
                          Email: {student.email || 'Not set'}
                        </p>
                        <p className="text-slate-600">Role: {student.role}</p>

                        <p className="text-slate-600">
                          Course: {student.course || 'Not set'}
                        </p>
                        <p className="text-slate-600">
                          Class: {student.className || 'Not set'}
                        </p>
                        <p className="text-slate-600">
                          Section: {student.section || 'Not set'}
                        </p>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleEdit(student)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}