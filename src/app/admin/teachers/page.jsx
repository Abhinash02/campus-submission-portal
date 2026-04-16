// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function TeachersPage() {
//   const router = useRouter();
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadTeachers = async () => {
//     try {
//       const res = await fetch('/api/users', { cache: 'no-store' });
//       const data = await res.json();

//       if (res.ok) {
//         setTeachers(data.filter((user) => user.role === 'TEACHER'));
//       }
//     } catch (error) {
//       console.error('Failed to load teachers:', error);
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

//       loadTeachers();
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
//         alert(data.message || 'Failed to delete teacher');
//         return;
//       }

//       loadTeachers();
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   if (loading) return <div className="p-6">Loading teachers...</div>;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Manage Teachers</h1>
//           <button
//             onClick={() => router.push('/admin')}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//           >
//             Back to Admin
//           </button>
//         </div>

//         {teachers.length === 0 ? (
//           <p className="text-slate-600">No teachers found.</p>
//         ) : (
//           <div className="grid gap-4">
//             {teachers.map((teacher) => (
//               <div
//                 key={teacher._id}
//                 className="border rounded-xl p-4 flex items-center justify-between"
//               >
//                 <div>
//                   <p className="font-semibold">{teacher.name}</p>
//                   <p className="text-sm text-slate-600">Login ID: {teacher.loginId}</p>
//                   <p className="text-sm text-slate-600">Email: {teacher.email || '-'}</p>
//                   <p className="text-sm text-slate-600">Subject: {teacher.subject || '-'}</p>
//                 </div>

//                 <button
//                   onClick={() => handleDelete(teacher._id)}
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

// export default function TeachersPage() {
//   const router = useRouter();
//   const [teachers, setTeachers] = useState([]);
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
//       await loadTeachers();
//     } catch (error) {
//       router.push('/');
//     }
//   };

//   const loadTeachers = async () => {
//     try {
//       const res = await fetch('/api/users');
//       const data = await res.json();
//       if (res.ok) {
//         setTeachers(data.filter(user => user.role === 'TEACHER'));
//       }
//     } catch (error) {
//       console.error('Failed to load teachers:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (teacher) => {
//     setEditingId(teacher._id);
//     setEditForm({
//       name: teacher.name,
//       loginId: teacher.loginId, // This is your username
//       email: teacher.email,
//       subject: teacher.subject,
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
//         await loadTeachers();
//       } else {
//         alert('Failed to update teacher');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this teacher?')) return;
    
//     try {
//       const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         await loadTeachers();
//       } else {
//         alert('Failed to delete teacher');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Something went wrong');
//     }
//   };

//   if (loading) return <div className="p-6 text-lg">Loading teachers...</div>;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-3xl font-bold">Manage Teachers</h1>
//           <button
//             onClick={() => router.push('/admin')}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             ← Back to Admin
//           </button>
//         </div>

//         {teachers.length === 0 ? (
//           <p className="text-slate-600 text-center py-12">No teachers found.</p>
//         ) : (
//           <div className="space-y-4">
//             {teachers.map((teacher) => (
//               <div key={teacher._id} className="border rounded-xl p-6 hover:shadow-md">
//                 {editingId === teacher._id ? (
//                   // Edit Form
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Name</label>
//                       <input
//                         name="name"
//                         value={editForm.name}
//                         onChange={handleEditChange}
//                         className="w-full border rounded-lg px-4 py-2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Login ID (Username)</label>
//                       <input
//                         name="loginId"
//                         value={editForm.loginId}
//                         onChange={handleEditChange}
//                         className="w-full border rounded-lg px-4 py-2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Email</label>
//                       <input
//                         name="email"
//                         value={editForm.email}
//                         onChange={handleEditChange}
//                         className="w-full border rounded-lg px-4 py-2"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Subject</label>
//                       <input
//                         name="subject"
//                         value={editForm.subject}
//                         onChange={handleEditChange}
//                         className="w-full border rounded-lg px-4 py-2"
//                       />
//                     </div>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => handleUpdate(teacher._id)}
//                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div className="flex-1">
//                       <h3 className="text-xl font-semibold">{teacher.name}</h3>
//                       <p className="text-slate-600">Login ID (Username): <strong>{teacher.loginId}</strong></p>
//                       <p className="text-slate-600">Email: {teacher.email || 'Not set'}</p>
//                       <p className="text-slate-600">Subject: {teacher.subject || 'Not set'}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(teacher)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(teacher._id)}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }


'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  const itemsPerPage = 5;

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
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok) {
        const teacherUsers = data.filter((user) => user.role === 'TEACHER');
        setTeachers(teacherUsers);
      }
    } catch (error) {
      console.error('Failed to load teachers:', error);
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
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const payload = {
        name: editForm.name?.trim() || '',
        loginId: editForm.loginId?.trim() || '',
        email: editForm.email?.trim() || '',
        subject: editForm.subject?.trim() || '',
      };

      if (editForm.password?.trim()) {
        payload.password = editForm.password.trim();
      }

      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || 'Failed to update teacher');
        return;
      }

      setEditingId(null);
      setEditForm({
        name: '',
        loginId: '',
        email: '',
        subject: '',
        password: '',
      });

      await loadTeachers();
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
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

      if (paginatedTeachers.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      await loadTeachers();
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  const uniqueSubjects = useMemo(() => {
    return [...new Set(teachers.map((teacher) => teacher.subject).filter(Boolean))];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch =
        teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.loginId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = subjectFilter
        ? teacher.subject === subjectFilter
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

  if (loading) return <div className="p-6 text-lg">Loading teachers...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Manage Teachers</h1>
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
              placeholder="Search by name, login ID, email, subject"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Filter by Subject</label>
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
          Showing {filteredTeachers.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, filteredTeachers.length)} of{' '}
          {filteredTeachers.length} teachers
        </div>

        {paginatedTeachers.length === 0 ? (
          <p className="text-slate-600 text-center py-12">No teachers found.</p>
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
                      <label className="block text-sm font-medium mb-2">Name</label>
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
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="w-full border rounded-lg px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
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
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
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
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}