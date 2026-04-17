// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// export default function TeachersPage() {
//   const router = useRouter();

//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: '',
//     loginId: '',
//     email: '',
//     subject: '',
//     password: '',
//   });

//   const [searchTerm, setSearchTerm] = useState('');
//   const [subjectFilter, setSubjectFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 5;

//   useEffect(() => {
//     checkAuthAndLoad();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, subjectFilter]);

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

//       await loadTeachers();
//     } catch (error) {
//       console.error('Admin auth error:', error);
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   };

//   const loadTeachers = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('/api/teachers', { cache: 'no-store' });
//       const data = await res.json();

//       if (res.ok && data.success && Array.isArray(data.teachers)) {
//         setTeachers(data.teachers);
//       } else {
//         setTeachers([]);
//       }
//     } catch (error) {
//       console.error('Failed to load teachers:', error);
//       setTeachers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (teacher) => {
//     setEditingId(teacher._id);
//     setEditForm({
//       name: teacher.name || '',
//       loginId: teacher.loginId || '',
//       email: teacher.email || '',
//       subject: teacher.subject || '',
//       password: '',
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const body = {
//         name: editForm.name?.trim() || '',
//         loginId: editForm.loginId?.trim() || '',
//         email: editForm.email?.trim() || '',
//         subject: editForm.subject?.trim() || '',
//       };

//       if (editForm.password?.trim()) {
//         body.password = editForm.password.trim();
//       }

//       const res = await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || 'Failed to update teacher');
//         return;
//       }

//       setEditingId(null);
//       await loadTeachers();
//     } catch (error) {
//       console.error('Update teacher error:', error);
//       alert('Something went wrong while updating the teacher');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this teacher?')) return;

//     try {
//       const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || 'Failed to delete teacher');
//         return;
//       }

//       await loadTeachers();
//     } catch (error) {
//       console.error('Delete teacher error:', error);
//       alert('Something went wrong while deleting the teacher');
//     }
//   };

//   const uniqueSubjects = useMemo(() => {
//     const subs = teachers
//       .map((t) => t.subject)
//       .filter(Boolean);
//     return [...new Set(subs)];
//   }, [teachers]);

//   const filteredTeachers = useMemo(() => {
//     return teachers.filter((t) => {
//       const matchesSearch =
//         !searchTerm ||
//         t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         t.loginId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (t.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (t.subject || '').toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesSubject = subjectFilter
//         ? t.subject === subjectFilter
//         : true;

//       return matchesSearch && matchesSubject;
//     });
//   }, [teachers, searchTerm, subjectFilter]);

//   const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1;
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedTeachers = filteredTeachers.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div style={{ width: 120, height: 120, margin: '0 auto' }}>
//             <DotLottieReact
//               src="https://lottie.host/46c45159-7099-4955-8f9a-a466b342f9a1/9GPovZ7IOK.lottie"
//               loop
//               autoplay
//             />
//           </div>
//           <p className="text-lg text-slate-700 mt-4">Loading teachers...</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//             <h1 className="text-3xl font-bold text-slate-900">
//               Manage Teachers
//             </h1>
//             <button
//               onClick={() => router.push('/admin')}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               ← Back to Admin
//             </button>
//           </div>

//           <div className="grid md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">Search</label>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search by name, login ID, email, subject"
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Filter by Subject
//               </label>
//               <select
//                 value={subjectFilter}
//                 onChange={(e) => setSubjectFilter(e.target.value)}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">All Subjects</option>
//                 {uniqueSubjects.map((subject) => (
//                   <option key={subject} value={subject}>
//                     {subject}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-end">
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setSubjectFilter('');
//                   setCurrentPage(1);
//                 }}
//                 className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg hover:bg-slate-800"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>

//           <div className="mb-4 text-sm text-slate-600">
//             Showing{' '}
//             {filteredTeachers.length === 0
//               ? 0
//               : startIndex + 1}{' '}
//             to{' '}
//             {Math.min(startIndex + itemsPerPage, filteredTeachers.length)} of{' '}
//             {filteredTeachers.length} teachers
//           </div>

//           {paginatedTeachers.length === 0 ? (
//             <p className="text-slate-600 text-center py-12">
//               No teachers found.
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {paginatedTeachers.map((teacher) => (
//                 <div
//                   key={teacher._id}
//                   className="border rounded-xl p-6 hover:shadow-md transition"
//                 >
//                   {editingId === teacher._id ? (
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Name
//                         </label>
//                         <input
//                           name="name"
//                           value={editForm.name}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Login ID (Username)
//                         </label>
//                         <input
//                           name="loginId"
//                           value={editForm.loginId}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Email
//                         </label>
//                         <input
//                           name="email"
//                           value={editForm.email}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Subject
//                         </label>
//                         <input
//                           name="subject"
//                           value={editForm.subject}
//                           onChange={handleEditChange}
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           New Password (Optional)
//                         </label>
//                         <input
//                           type="password"
//                           name="password"
//                           value={editForm.password}
//                           onChange={handleEditChange}
//                           placeholder="Leave blank if no change"
//                           className="w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => handleUpdate(teacher._id)}
//                           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditingId(null);
//                             setEditForm({
//                               name: '',
//                               loginId: '',
//                               email: '',
//                               subject: '',
//                               password: '',
//                             });
//                           }}
//                           className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold">{teacher.name}</h3>
//                         <p className="text-slate-600">
//                           Login ID (Username): <strong>{teacher.loginId}</strong>
//                         </p>
//                         <p className="text-slate-600">
//                           Email: {teacher.email || 'Not set'}
//                         </p>
//                         <p className="text-slate-600">
//                           Subject: {teacher.subject || 'Not set'}
//                         </p>
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(teacher)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(teacher._id)}
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

//           {filteredTeachers.length > itemsPerPage && (
//             <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
//               >
//                 Prev
//               </button>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-4 py-2 rounded-lg border ${
//                     currentPage === page
//                       ? 'bg-blue-600 text-white border-blue-600'
//                       : 'bg-white hover:bg-slate-50'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}

//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }


'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function TeachersPage() {
  const router = useRouter();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    loginId: '',
    email: '',
    subject: '',
    password: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3; // Changed from 5 to 3

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subjectFilter]);

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

      await loadTeachers();
    } catch (error) {
      console.error('Admin auth error:', error);
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/teachers', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.teachers)) {
        setTeachers(data.teachers);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error('Failed to load teachers:', error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);
    setEditForm({
      name: teacher.name || '',
      loginId: teacher.loginId || '',
      email: teacher.email || '',
      subject: teacher.subject || '',
      password: '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      const body = {
        name: editForm.name?.trim() || '',
        loginId: editForm.loginId?.trim() || '',
        email: editForm.email?.trim() || '',
        subject: editForm.subject?.trim() || '',
      };

      if (editForm.password?.trim()) {
        body.password = editForm.password.trim();
      }

      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || 'Failed to update teacher');
        return;
      }

      setEditingId(null);
      await loadTeachers();
    } catch (error) {
      console.error('Update teacher error:', error);
      alert('Something went wrong while updating the teacher');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || 'Failed to delete teacher');
        return;
      }

      await loadTeachers();
    } catch (error) {
      console.error('Delete teacher error:', error);
      alert('Something went wrong while deleting the teacher');
    }
  };

  const uniqueSubjects = useMemo(() => {
    const subs = teachers
      .map((t) => t.subject)
      .filter(Boolean);
    return [...new Set(subs)];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch =
        !searchTerm ||
        t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.loginId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.subject || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = subjectFilter
        ? t.subject === subjectFilter
        : true;

      return matchesSearch && matchesSubject;
    });
  }, [teachers, searchTerm, subjectFilter]);

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div style={{ width: 120, height: 120, margin: '0 auto' }}>
            <DotLottieReact
              src="https://lottie.host/46c45159-7099-4955-8f9a-a466b342f9a1/9GPovZ7IOK.lottie"
              loop
              autoplay
            />
          </div>
          <p className="text-lg text-slate-700 mt-4">Loading teachers...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-slate-900">
              Manage Teachers
            </h1>
            <button
              onClick={() => router.push('/admin')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              ← Back to Admin
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, login ID, email, subject"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Filter by Subject
              </label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSubjectFilter('');
                  setCurrentPage(1);
                }}
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg hover:bg-slate-800"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="mb-4 text-sm text-slate-600">
            Showing{' '}
            {filteredTeachers.length === 0
              ? 0
              : startIndex + 1}{' '}
            to{' '}
            {Math.min(startIndex + itemsPerPage, filteredTeachers.length)} of{' '}
            {filteredTeachers.length} teachers
          </div>

          {paginatedTeachers.length === 0 ? (
            <p className="text-slate-600 text-center py-12">
              No teachers found.
            </p>
          ) : (
            <div className="space-y-4">
              {paginatedTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  className="border rounded-xl p-6 hover:shadow-md transition"
                >
                  {editingId === teacher._id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Login ID (Username)
                        </label>
                        <input
                          name="loginId"
                          value={editForm.loginId}
                          onChange={handleEditChange}
                          className="w-full border rounded-lg px-4 py-2"
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
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <input
                          name="subject"
                          value={editForm.subject}
                          onChange={handleEditChange}
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          New Password (Optional)
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={editForm.password}
                          onChange={handleEditChange}
                          placeholder="Leave blank if no change"
                          className="w-full border rounded-lg px-4 py-2"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdate(teacher._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm({
                              name: '',
                              loginId: '',
                              email: '',
                              subject: '',
                              password: '',
                            });
                          }}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{teacher.name}</h3>
                        <p className="text-slate-600">
                          Login ID (Username): <strong>{teacher.loginId}</strong>
                        </p>
                        <p className="text-slate-600">
                          Email: {teacher.email || 'Not set'}
                        </p>
                        <p className="text-slate-600">
                          Subject: {teacher.subject || 'Not set'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(teacher)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(teacher._id)}
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

          {filteredTeachers.length > itemsPerPage && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}