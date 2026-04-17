// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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

//   const [search, setSearch] = useState('');
//   const [filterCourse, setFilterCourse] = useState('');
//   const [page, setPage] = useState(1);
//   const perPage = 3;

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
//       console.error(error);
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   };

//   const loadStudents = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('/api/students', { cache: 'no-store' });
//       const data = await res.json();

//       if (res.ok && data.success && Array.isArray(data.students)) {
//         setStudents(data.students);
//       } else {
//         setStudents([]);
//       }
//     } catch (error) {
//       console.error('Failed to load students:', error);
//       setStudents([]);
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
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (id) => {
//     try {
//       const body = {
//         name: editForm.name?.trim() || '',
//         loginId: editForm.loginId?.trim() || '',
//         email: editForm.email?.trim() || '',
//         course: editForm.course?.trim() || '',
//         className: editForm.className?.trim() || '',
//         section: editForm.section?.trim() || '',
//         // role not allowed to change here
//       };

//       const res = await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
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

//   const filteredStudents = students.filter((s) => {
//     const matchesSearch =
//       !search ||
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.loginId.toLowerCase().includes(search.toLowerCase()) ||
//       (s.email || '').toLowerCase().includes(search.toLowerCase());

//     const matchesCourse = !filterCourse || s.course === filterCourse;

//     return matchesSearch && matchesCourse;
//   });

//   const totalPages = Math.max(1, Math.ceil(filteredStudents.length / perPage));
//   const paginatedStudents = filteredStudents.slice(
//     (page - 1) * perPage,
//     page * perPage
//   );

//   const courses = Array.from(
//     new Set(students.map((s) => s.course).filter(Boolean))
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
//           <p className="text-lg text-slate-700 mt-4">Loading students...</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <h1 className="text-3xl font-bold">Manage Students</h1>
//             <button
//               onClick={() => router.push('/admin')}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               ← Back to Admin
//             </button>
//           </div>

//           <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Search</label>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 placeholder="Name, Login ID, or Email"
//                 className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Course</label>
//               <select
//                 value={filterCourse}
//                 onChange={(e) => {
//                   setFilterCourse(e.target.value);
//                   setPage(1);
//                 }}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
//               >
//                 <option value="">All courses</option>
//                 {courses.map((course) => (
//                   <option key={course} value={course}>
//                     {course}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Page</label>
//               <select
//                 value={page}
//                 onChange={(e) => setPage(Number(e.target.value))}
//                 className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
//               >
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <option key={p} value={p}>
//                     {p} / {totalPages}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-end">
//               <p className="text-sm text-slate-600">
//                 Showing{' '}
//                 <span className="text-slate-900 font-semibold">
//                   {paginatedStudents.length}
//                 </span>{' '}
//                 of {filteredStudents.length} students
//               </p>
//             </div>
//           </div>

//           {paginatedStudents.length === 0 ? (
//             <p className="text-slate-600 text-center py-12">
//               No students found matching your search or filter.
//             </p>
//           ) : (
//             <div className="space-y-4 mt-6">
//               {paginatedStudents.map((student) => (
//                 <div
//                   key={student._id}
//                   className="border rounded-xl p-6 hover:shadow-md"
//                 >
//                   {editingId === student._id ? (
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Name
//                         </label>
//                         <input
//                           name="name"
//                           value={editForm.name}
//                           onChange={handleEditChange}
//                           className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Login ID
//                         </label>
//                         <input
//                           name="loginId"
//                           value={editForm.loginId}
//                           onChange={handleEditChange}
//                           className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
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
//                           className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Course
//                         </label>
//                         <input
//                           name="course"
//                           value={editForm.course}
//                           onChange={handleEditChange}
//                           className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
//                           placeholder="Enter course (e.g., BCA, MCA)"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Class
//                         </label>
//                         <input
//                           name="className"
//                           value={editForm.className}
//                           onChange={handleEditChange}
//                           className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Section
//                         </label>
//                         <input
//                           name="section"
//                           value={editForm.section}
//                           onChange={handleEditChange}
//                           className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
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
//                         <p className="text-slate-600">
//                           Login ID: <strong>{student.loginId}</strong>
//                         </p>
//                         <p className="text-slate-600">
//                           Email: {student.email || 'Not set'}
//                         </p>
//                         <p className="text-slate-600">Role: {student.role}</p>

//                         <p className="text-slate-600">
//                           Course: {student.course || 'Not set'}
//                         </p>
//                         <p className="text-slate-600">
//                           Class: {student.className || 'Not set'}
//                         </p>
//                         <p className="text-slate-600">
//                           Section: {student.section || 'Not set'}
//                         </p>
//                       </div>

//                       <div className="flex gap-2 flex-wrap">
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

  useEffect(() => {
    setPage(1);
  }, [search, filterCourse]);

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
      console.error('AUTH CHECK ERROR:', error);
      localStorage.removeItem('user');
      router.push('/');
    }
  };

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/student', { cache: 'no-store' });
      const data = await res.json();

      console.log('STUDENTS API RESPONSE:', data);

      if (res.ok && data.success && Array.isArray(data.students)) {
        setStudents(data.students);
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
      const payload = {
        name: editForm.name?.trim() || '',
        loginId: editForm.loginId?.trim() || '',
        email: editForm.email?.trim() || '',
        course: editForm.course?.trim() || '',
        className: editForm.className?.trim() || '',
        section: editForm.section?.trim() || '',
      };

      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !search ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.loginId?.toLowerCase().includes(search.toLowerCase()) ||
      (s.email || '').toLowerCase().includes(search.toLowerCase());

    const matchesCourse = !filterCourse || s.course === filterCourse;

    return matchesSearch && matchesCourse;
  });

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / perPage));
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const courses = Array.from(new Set(students.map((s) => s.course).filter(Boolean)));

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

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, Login ID, or Email"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Course</label>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
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
                Showing <span className="text-slate-900 font-semibold">{paginatedStudents.length}</span> of {filteredStudents.length} students
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
                <div key={student._id} className="border rounded-xl p-6 hover:shadow-md">
                  {editingId === student._id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Login ID</label>
                        <input
                          name="loginId"
                          value={editForm.loginId}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Course</label>
                        <input
                          name="course"
                          value={editForm.course}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Class</label>
                        <input
                          name="className"
                          value={editForm.className}
                          onChange={handleEditChange}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Section</label>
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
                        <p className="text-slate-600">Email: {student.email || 'Not set'}</p>
                        <p className="text-slate-600">Role: {student.role}</p>
                        <p className="text-slate-600">Course: {student.course || 'Not set'}</p>
                        <p className="text-slate-600">Class: {student.className || 'Not set'}</p>
                        <p className="text-slate-600">Section: {student.section || 'Not set'}</p>
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