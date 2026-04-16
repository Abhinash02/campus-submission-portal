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
//         const filteredTeachers = data.filter(
//           (user) => user.role === 'TEACHER'
//         );
//         setTeachers(filteredTeachers);
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

//   if (loading) {
//     return <div className="p-6">Loading teachers...</div>;
//   }

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
//                   <p className="text-sm text-slate-600">
//                     Login ID: {teacher.loginId}
//                   </p>
//                   <p className="text-sm text-slate-600">
//                     Email: {teacher.email || '-'}
//                   </p>
//                   <p className="text-sm text-slate-600">
//                     Subject: {teacher.subject || '-'}
//                   </p>
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

// export default function AdminPage() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     role: 'STUDENT',
//     email: '',
//     course: '',
//     subject: '',
//   });

//   useEffect(() => {
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

//       setLoading(false);
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
//       ...(name === 'role' && value === 'TEACHER' ? { course: '' } : {}),
//     }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setSubmitting(true);
//   //   setMessage('');
//   //   setError('');

//   //   try {
//   //     const payload = {
//   //       ...formData,
//   //       role: formData.role.toUpperCase(),
//   //     };

//   //     const res = await fetch('/api/users', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(payload),
//   //     });

//   //     const data = await res.json();

//   //     if (!res.ok) {
//   //       setError(data.message || 'Failed to create user');
//   //       return;
//   //     }

//   //     setMessage(data.message || 'User created successfully');

//   //     setFormData({
//   //       name: '',
//   //       loginId: '',
//   //       password: '',
//   //       role: 'STUDENT',
//   //       email: '',
//   //       course: '',
//   //       subject: '',
//   //     });
//   //   } catch (error) {
//   //     console.error('CREATE USER ERROR:', error);
//   //     setError('Something went wrong');
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.loginId || !formData.loginId.trim()) {
//     setError('Login ID is required');
//     return;
//   }

//   const payload = {
//     name: formData.name.trim(),
//     loginId: formData.loginId.trim(),
//     password: formData.password,
//     role: formData.role,
//     email: formData.email.trim(),
//     course: formData.course,
//     subject: formData.subject,
//   };

//   // ... send payload
// };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading admin dashboard...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create student and teacher accounts, then manage them from here.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/admin/students')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Students
//             </button>

//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Teachers
//             </button>

//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Login ID</label>
//                <input
//   name="loginId"
//   value={formData.loginId}
//   onChange={handleChange}
//   placeholder="Login ID / Roll Number"
//   required
// />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="STUDENT">Student</option>
//                   <option value="TEACHER">Teacher</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {formData.role === 'STUDENT' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Course</label>
//                   <input
//                     type="text"
//                     name="course"
//                     value={formData.course}
//                     onChange={handleChange}
//                     placeholder="Enter course"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {formData.role === 'TEACHER' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {message && (
//                 <p className="text-green-600 text-sm font-medium">{message}</p>
//               )}

//               {error && (
//                 <p className="text-red-600 text-sm font-medium">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
//               >
//                 {submitting ? 'Creating user...' : 'Create User'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//             <div className="space-y-4">
//               <button
//                 onClick={() => router.push('/admin/students')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Students</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View all students and delete student accounts.
//                 </p>
//               </button>

//               <button
//                 onClick={() => router.push('/admin/teachers')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Teachers</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View all teachers and delete teacher accounts.
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     role: 'STUDENT',
//     email: '',
//     course: '',
//     subject: '',
//   });

//   useEffect(() => {
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

//       setLoading(false);
//     } catch (err) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       // clear course/subject when switching role
//       ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
//       ...(name === 'role' && value === 'TEACHER' ? { course: '' } : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');
//     setError('');

//     const trimmedLoginId = formData.loginId.trim();

//     if (!trimmedLoginId) {
//       setError('Login ID is required');
//       setSubmitting(false);
//       return;
//     }

//     if (!formData.name || !formData.password) {
//       setError('Name and password are required');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         loginId: trimmedLoginId,
//         role: formData.role.toUpperCase(),
//       };

//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to create user');
//         return;
//       }

//       setMessage('User created successfully');

//       setFormData({
//         name: '',
//         loginId: '',
//         password: '',
//         role: 'STUDENT',
//         email: '',
//         course: '',
//         subject: '',
//       });
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading admin dashboard...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create students and teachers, then manage them from here.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/admin/students')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Students
//             </button>
//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Teachers
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               {/* Login ID */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Login ID</label>
//                 <input
//                   type="text"
//                   name="loginId"
//                   value={formData.loginId}
//                   onChange={handleChange}
//                   placeholder="Enter login ID (unique)"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               {/* Role */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="STUDENT">Student</option>
//                   <option value="TEACHER">Teacher</option>
//                 </select>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {/* Student course */}
//               {formData.role === 'STUDENT' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Course</label>
//                   <input
//                     type="text"
//                     name="course"
//                     value={formData.course}
//                     onChange={handleChange}
//                     placeholder="Enter course"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {/* Teacher subject */}
//               {formData.role === 'TEACHER' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {message && (
//                 <p className="text-green-600 text-sm font-medium">{message}</p>
//               )}
//               {error && (
//                 <p className="text-red-600 text-sm font-medium">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
//               >
//                 {submitting ? 'Creating user...' : 'Create User'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//             <div className="space-y-4">
//               <button
//                 onClick={() => router.push('/admin/students')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Students</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View all students and delete student accounts.
//                 </p>
//               </button>

//               <button
//                 onClick={() => router.push('/admin/teachers')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Teachers</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View all teachers and delete teacher accounts.
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalTeachers: 0,
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     role: 'STUDENT',
//     email: '',
//     course: 'MCA',
//     className: '1st Year',
//     section: 'A',
//     subject: '',
//   });

//   useEffect(() => {
//     checkAdmin();
//   }, []);

//   const checkAdmin = async () => {
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

//       await loadDashboardStats();
//       setLoading(false);
//     } catch (err) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   };

//   const loadDashboardStats = async () => {
//     try {
//       const res = await fetch('/api/users');
//       const data = await res.json();

//       if (res.ok && Array.isArray(data)) {
//         const totalStudents = data.filter((user) => user.role === 'STUDENT').length;
//         const totalTeachers = data.filter((user) => user.role === 'TEACHER').length;

//         setStats({
//           totalStudents,
//           totalTeachers,
//         });
//       }
//     } catch (err) {
//       console.error('Failed to load dashboard stats:', err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
//       ...(name === 'role' && value === 'TEACHER'
//         ? { course: 'MCA', className: '1st Year', section: 'A' }
//         : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');
//     setError('');

//     const trimmedLoginId = formData.loginId.trim();

//     if (!trimmedLoginId) {
//       setError('Login ID (Username) is required');
//       setSubmitting(false);
//       return;
//     }

//     if (!formData.name || !formData.password) {
//       setError('Name and password are required');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         ...formData,
//         loginId: trimmedLoginId,
//         role: formData.role.toUpperCase(),
//       };

//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to create user');
//         return;
//       }

//       setMessage('User created successfully');

//       setFormData({
//         name: '',
//         loginId: '',
//         password: '',
//         role: 'STUDENT',
//         email: '',
//         course: 'MCA',
//         className: '1st Year',
//         section: 'A',
//         subject: '',
//       });

//       await loadDashboardStats();
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading admin dashboard...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create students and teachers, then manage them from here.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/admin/students')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Students
//             </button>
//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Teachers
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-blue-600 text-white rounded-2xl shadow p-6">
//             <p className="text-sm opacity-90">Total Students</p>
//             <h2 className="text-4xl font-bold mt-2">{stats.totalStudents}</h2>
//           </div>

//           <div className="bg-green-600 text-white rounded-2xl shadow p-6">
//             <p className="text-sm opacity-90">Total Teachers</p>
//             <h2 className="text-4xl font-bold mt-2">{stats.totalTeachers}</h2>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Login ID (Username)
//                 </label>
//                 <input
//                   type="text"
//                   name="loginId"
//                   value={formData.loginId}
//                   onChange={handleChange}
//                   placeholder="Enter unique username"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="STUDENT">Student</option>
//                   <option value="TEACHER">Teacher</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {formData.role === 'STUDENT' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Course</label>
//                     <select
//                       name="course"
//                       value={formData.course}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="MCA">MCA</option>
//                       <option value="BCA">BCA</option>
//                       <option value="BSc">BSc</option>
//                       <option value="BTech">BTech</option>
//                       <option value="MTech">MTech</option>
//                       <option value="BA">BA</option>
//                       <option value="BCom">BCom</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Class</label>
//                     <select
//                       name="className"
//                       value={formData.className}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="1st Year">1st Year</option>
//                       <option value="2nd Year">2nd Year</option>
//                       <option value="3rd Year">3rd Year</option>
//                       <option value="4th Year">4th Year</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Section</label>
//                     <select
//                       name="section"
//                       value={formData.section}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="A">A</option>
//                       <option value="B">B</option>
//                       <option value="C">C</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {formData.role === 'TEACHER' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {message && (
//                 <p className="text-green-600 text-sm font-medium">{message}</p>
//               )}

//               {error && (
//                 <p className="text-red-600 text-sm font-medium">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
//               >
//                 {submitting ? 'Creating user...' : 'Create User'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//             <div className="space-y-4">
//               <button
//                 onClick={() => router.push('/admin/students')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Students</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete student accounts.
//                 </p>
//               </button>

//               <button
//                 onClick={() => router.push('/admin/teachers')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Teachers</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete teacher accounts.
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalTeachers: 0,
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     role: 'STUDENT',
//     email: '',
//     course: '',
//     className: '',
//     section: '',
//     subject: '',
//   });

//   useEffect(() => {
//     checkAdmin();
//   }, []);

//   const checkAdmin = async () => {
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

//       await loadDashboardStats();
//       setLoading(false);
//     } catch (err) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   };

//   const loadDashboardStats = async () => {
//     try {
//       const res = await fetch('/api/users');
//       const data = await res.json();

//       if (res.ok && Array.isArray(data)) {
//         const totalStudents = data.filter((user) => user.role === 'STUDENT').length;
//         const totalTeachers = data.filter((user) => user.role === 'TEACHER').length;

//         setStats({
//           totalStudents,
//           totalTeachers,
//         });
//       }
//     } catch (err) {
//       console.error('Failed to load dashboard stats:', err);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
//       ...(name === 'role' && value === 'TEACHER'
//         ? { course: '', className: '', section: '' }
//         : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');
//     setError('');

//     const trimmedLoginId = formData.loginId.trim();

//     if (!trimmedLoginId) {
//       setError('Login ID (Username) is required');
//       setSubmitting(false);
//       return;
//     }

//     if (!formData.name || !formData.password) {
//       setError('Name and password are required');
//       setSubmitting(false);
//       return;
//     }

//     // ✅ CRITICAL FIX: Validate required fields for students
//     if (formData.role === 'STUDENT' && (!formData.course || !formData.className || !formData.section)) {
//       setError('Course, Class, and Section are required for students');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         name: formData.name.trim(),
//         loginId: trimmedLoginId,
//         password: formData.password,
//         role: formData.role.toUpperCase(),
//         email: formData.email?.trim() || '',
//         course: formData.course?.trim() || '',
//         className: formData.className?.trim() || '',  // ✅ This sends the value
//         section: formData.section?.trim() || '',      // ✅ This sends the value
//         subject: formData.subject?.trim() || '',
//         createdBy: 'ADMIN',
//       };

//       console.log('🔍 SENDING PAYLOAD:', payload); // Debug log

//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to create user');
//         return;
//       }

//       setMessage('✅ User created successfully');

//       // Reset form completely
//       setFormData({
//         name: '',
//         loginId: '',
//         password: '',
//         role: 'STUDENT',
//         email: '',
//         course: '',
//         className: '',
//         section: '',
//         subject: '',
//       });

//       await loadDashboardStats();
//     } catch (err) {
//       console.error('CREATE USER ERROR:', err);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading admin dashboard...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create students and teachers, then manage them from here.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/admin/students')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Students
//             </button>
//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Teachers
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-blue-600 text-white rounded-2xl shadow p-6">
//             <p className="text-sm opacity-90">Total Students</p>
//             <h2 className="text-4xl font-bold mt-2">{stats.totalStudents}</h2>
//           </div>

//           <div className="bg-green-600 text-white rounded-2xl shadow p-6">
//             <p className="text-sm opacity-90">Total Teachers</p>
//             <h2 className="text-4xl font-bold mt-2">{stats.totalTeachers}</h2>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Login ID (Username)
//                 </label>
//                 <input
//                   type="text"
//                   name="loginId"
//                   value={formData.loginId}
//                   onChange={handleChange}
//                   placeholder="Enter unique username"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="STUDENT">Student</option>
//                   <option value="TEACHER">Teacher</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {formData.role === 'STUDENT' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Course *</label>
//                     <select
//                       name="course"
//                       value={formData.course}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Course</option>
//                       <option value="MCA">MCA</option>
//                       <option value="BCA">BCA</option>
//                       <option value="BSc">BSc</option>
//                       <option value="BTech">BTech</option>
//                       <option value="MTech">MTech</option>
//                       <option value="BA">BA</option>
//                       <option value="BCom">BCom</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Class *</label>
//                     <select
//                       name="className"
//                       value={formData.className}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Class</option>
//                       <option value="1st Year">1st Year</option>
//                       <option value="2nd Year">2nd Year</option>
//                       <option value="3rd Year">3rd Year</option>
//                       <option value="4th Year">4th Year</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Section *</label>
//                     <select
//                       name="section"
//                       value={formData.section}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Section</option>
//                       <option value="A">A</option>
//                       <option value="B">B</option>
//                       <option value="C">C</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {formData.role === 'TEACHER' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {message && (
//                 <p className="text-green-600 text-sm font-medium">{message}</p>
//               )}

//               {error && (
//                 <p className="text-red-600 text-sm font-medium">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
//               >
//                 {submitting ? 'Creating user...' : 'Create User'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//             <div className="space-y-4">
//               <button
//                 onClick={() => router.push('/admin/students')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Students</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete student accounts.
//                 </p>
//               </button>

//               <button
//                 onClick={() => router.push('/admin/teachers')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Teachers</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete teacher accounts.
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalTeachers: 0,
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     role: 'STUDENT',
//     email: '',
//     course: '',
//     className: '',
//     section: '',
//     subject: '',
//   });

//   useEffect(() => {
//     checkAdmin();
//   }, []);

//   const checkAdmin = async () => {
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

//       await loadDashboardStats();
//       setLoading(false);
//     } catch (err) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   };

//   const loadDashboardStats = async () => {
//     try {
//       const res = await fetch('/api/admin/stats', {
//         method: 'GET',
//         cache: 'no-store',
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setStats({
//           totalStudents: data.totalStudents || 0,
//           totalTeachers: data.totalTeachers || 0,
//         });
//       } else {
//         setStats({
//           totalStudents: 0,
//           totalTeachers: 0,
//         });
//       }
//     } catch (err) {
//       console.error('Failed to load dashboard stats:', err);
//       setStats({
//         totalStudents: 0,
//         totalTeachers: 0,
//       });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
//       ...(name === 'role' && value === 'TEACHER'
//         ? { course: '', className: '', section: '' }
//         : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');
//     setError('');

//     const trimmedLoginId = formData.loginId.trim();

//     if (!trimmedLoginId) {
//       setError('Login ID (Username) is required');
//       setSubmitting(false);
//       return;
//     }

//     if (!formData.name || !formData.password) {
//       setError('Name and password are required');
//       setSubmitting(false);
//       return;
//     }

//     if (
//       formData.role === 'STUDENT' &&
//       (!formData.course || !formData.className || !formData.section)
//     ) {
//       setError('Course, Class, and Section are required for students');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         name: formData.name.trim(),
//         loginId: trimmedLoginId,
//         password: formData.password,
//         role: formData.role.toUpperCase(),
//         email: formData.email?.trim() || '',
//         course: formData.course?.trim() || '',
//         className: formData.className?.trim() || '',
//         section: formData.section?.trim() || '',
//         subject: formData.subject?.trim() || '',
//         createdBy: 'ADMIN',
//       };

//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to create user');
//         return;
//       }

//       setMessage('✅ User created successfully');

//       setFormData({
//         name: '',
//         loginId: '',
//         password: '',
//         role: 'STUDENT',
//         email: '',
//         course: '',
//         className: '',
//         section: '',
//         subject: '',
//       });

//       await loadDashboardStats();
//     } catch (err) {
//       console.error('CREATE USER ERROR:', err);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading admin dashboard...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create students and teachers, then manage them from here.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/admin/students')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Students
//             </button>
//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Teachers
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-blue-600 text-white rounded-2xl shadow p-6">
//             <p className="text-sm opacity-90">Total Students</p>
//             <h2 className="text-4xl font-bold mt-2">{stats.totalStudents}</h2>
//           </div>

//           <div className="bg-green-600 text-white rounded-2xl shadow p-6">
//             <p className="text-sm opacity-90">Total Teachers</p>
//             <h2 className="text-4xl font-bold mt-2">{stats.totalTeachers}</h2>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Login ID (Username)
//                 </label>
//                 <input
//                   type="text"
//                   name="loginId"
//                   value={formData.loginId}
//                   onChange={handleChange}
//                   placeholder="Enter unique username"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="STUDENT">Student</option>
//                   <option value="TEACHER">Teacher</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {formData.role === 'STUDENT' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Course *</label>
//                     <select
//                       name="course"
//                       value={formData.course}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Course</option>
//                       <option value="MCA">MCA</option>
//                       <option value="BCA">BCA</option>
//                       <option value="BSc">BSc</option>
//                       <option value="BTech">BTech</option>
//                       <option value="MTech">MTech</option>
//                       <option value="BA">BA</option>
//                       <option value="BCom">BCom</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Class *</label>
//                     <select
//                       name="className"
//                       value={formData.className}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Class</option>
//                       <option value="1st Year">1st Year</option>
//                       <option value="2nd Year">2nd Year</option>
//                       <option value="3rd Year">3rd Year</option>
//                       <option value="4th Year">4th Year</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Section *</label>
//                     <select
//                       name="section"
//                       value={formData.section}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Section</option>
//                       <option value="A">A</option>
//                       <option value="B">B</option>
//                       <option value="C">C</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {formData.role === 'TEACHER' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {message && (
//                 <p className="text-green-600 text-sm font-medium">{message}</p>
//               )}

//               {error && (
//                 <p className="text-red-600 text-sm font-medium">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
//               >
//                 {submitting ? 'Creating user...' : 'Create User'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//             <div className="space-y-4">
//               <button
//                 onClick={() => router.push('/admin/students')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Students</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete student accounts.
//                 </p>
//               </button>

//               <button
//                 onClick={() => router.push('/admin/teachers')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Teachers</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete teacher accounts.
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     studentsByCourse: {},
//     totalTeachers: 0,
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     role: 'STUDENT',
//     email: '',
//     course: '',
//     className: '',
//     section: '',
//     subject: '',
//   });

//   useEffect(() => {
//     checkAdmin();
//   }, []);

//   const checkAdmin = async () => {
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

//       await loadDashboardStats();
//       setLoading(false);
//     } catch (err) {
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   };

//   const loadDashboardStats = async () => {
//     try {
//       const res = await fetch('/api/admin/stats', {
//         method: 'GET',
//         cache: 'no-store',
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setStats({
//           studentsByCourse: data.studentsByCourse || {},
//           totalTeachers: data.totalTeachers || 0,
//         });
//       } else {
//         setStats({
//           studentsByCourse: {},
//           totalTeachers: 0,
//         });
//       }
//     } catch (err) {
//       console.error('Failed to load dashboard stats:', err);
//       setStats({
//         studentsByCourse: {},
//         totalTeachers: 0,
//       });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
//       ...(name === 'role' && value === 'TEACHER'
//         ? { course: '', className: '', section: '' }
//         : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');
//     setError('');

//     const trimmedLoginId = formData.loginId.trim();

//     if (!trimmedLoginId) {
//       setError('Login ID (Username) is required');
//       setSubmitting(false);
//       return;
//     }

//     if (!formData.name || !formData.password) {
//       setError('Name and password are required');
//       setSubmitting(false);
//       return;
//     }

//     if (
//       formData.role === 'STUDENT' &&
//       (!formData.course || !formData.className || !formData.section)
//     ) {
//       setError('Course, Class, and Section are required for students');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         name: formData.name.trim(),
//         loginId: trimmedLoginId,
//         password: formData.password,
//         role: formData.role.toUpperCase(),
//         email: formData.email?.trim() || '',
//         course: formData.course?.trim() || '',
//         className: formData.className?.trim() || '',
//         section: formData.section?.trim() || '',
//         subject: formData.subject?.trim() || '',
//         createdBy: 'ADMIN',
//       };

//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Failed to create user');
//         return;
//       }

//       setMessage('✅ User created successfully');

//       setFormData({
//         name: '',
//         loginId: '',
//         password: '',
//         role: 'STUDENT',
//         email: '',
//         course: '',
//         className: '',
//         section: '',
//         subject: '',
//       });

//       await loadDashboardStats();
//     } catch (err) {
//       console.error('CREATE USER ERROR:', err);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading admin dashboard...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create students and teachers, then manage them from here.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/admin/students')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Students
//             </button>
//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Teachers
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Object.entries(stats.studentsByCourse).map(([courseName, count]) => (
//             <div
//               key={courseName}
//               className="bg-blue-600 text-white rounded-2xl shadow p-6"
//             >
//               <p className="text-sm opacity-90">{courseName}</p>
//               <h2 className="text-4xl font-bold mt-2">{count}</h2>
//               <p className="text-sm opacity-90 mt-1">Students</p>
//             </div>
//           ))}

//           {Object.keys(stats.studentsByCourse).length === 0 && (
//             <div className="bg-blue-600 text-white rounded-2xl shadow p-6">
//               <p className="text-sm opacity-90">No Courses</p>
//               <h2 className="text-4xl font-bold mt-2">0</h2>
//               <p className="text-sm opacity-90 mt-1">Students</p>
//             </div>
//           )}

//           <div className="bg-green-600 text-white rounded-2xl shadow p-6">
//             <p className="text-sm opacity-90">Total Teachers</p>
//             <h2 className="text-4xl font-bold mt-2">{stats.totalTeachers}</h2>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Login ID (Username)
//                 </label>
//                 <input
//                   type="text"
//                   name="loginId"
//                   value={formData.loginId}
//                   onChange={handleChange}
//                   placeholder="Enter unique username"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="STUDENT">Student</option>
//                   <option value="TEACHER">Teacher</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {formData.role === 'STUDENT' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Course *</label>
//                     <select
//                       name="course"
//                       value={formData.course}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Course</option>
//                       <option value="MCA">MCA</option>
//                       <option value="BCA">BCA</option>
//                       <option value="BSc">BSc</option>
//                       <option value="BTech">BTech</option>
//                       <option value="MTech">MTech</option>
//                       <option value="BA">BA</option>
//                       <option value="BCom">BCom</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Class *</label>
//                     <select
//                       name="className"
//                       value={formData.className}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Class</option>
//                       <option value="1st Year">1st Year</option>
//                       <option value="2nd Year">2nd Year</option>
//                       <option value="3rd Year">3rd Year</option>
//                       <option value="4th Year">4th Year</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Section *</label>
//                     <select
//                       name="section"
//                       value={formData.section}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Section</option>
//                       <option value="A">A</option>
//                       <option value="B">B</option>
//                       <option value="C">C</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {formData.role === 'TEACHER' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               {message && (
//                 <p className="text-green-600 text-sm font-medium">{message}</p>
//               )}

//               {error && (
//                 <p className="text-red-600 text-sm font-medium">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
//               >
//                 {submitting ? 'Creating user...' : 'Create User'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//             <div className="space-y-4">
//               <button
//                 onClick={() => router.push('/admin/students')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Students</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete student accounts.
//                 </p>
//               </button>

//               <button
//                 onClick={() => router.push('/admin/teachers')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Teachers</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete teacher accounts.
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [stats, setStats] = useState({
//     studentsByCourse: {},
//     totalTeachers: 0,
//     totalStudents: 0,
//     totalSubmissions: 0,
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     role: 'STUDENT',
//     email: '',
//     course: '',
//     className: '',
//     section: '',
//     subject: '',
//   });

//   useEffect(() => {
//     checkAdmin();
//   }, []);

//   const checkAdmin = async () => {
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

//       await loadDashboardStats();
//     } catch (err) {
//       console.error('ADMIN CHECK ERROR:', err);
//       localStorage.removeItem('user');
//       router.push('/');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadDashboardStats = async () => {
//     try {
//       const res = await fetch('/api/admin/stats', {
//         method: 'GET',
//         cache: 'no-store',
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         setStats({
//           studentsByCourse: data.studentsByCourse || {},
//           totalTeachers: data.totalTeachers || 0,
//           totalStudents: data.totalStudents || 0,
//           totalSubmissions: data.totalSubmissions || 0,
//         });
//       } else {
//         setError(data.message || 'Failed to load dashboard stats');
//         setStats({
//           studentsByCourse: {},
//           totalTeachers: 0,
//           totalStudents: 0,
//           totalSubmissions: 0,
//         });
//       }
//     } catch (err) {
//       console.error('Failed to load dashboard stats:', err);
//       setError('Failed to load dashboard stats');
//       setStats({
//         studentsByCourse: {},
//         totalTeachers: 0,
//         totalStudents: 0,
//         totalSubmissions: 0,
//       });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
//       ...(name === 'role' && value === 'TEACHER'
//         ? { course: '', className: '', section: '' }
//         : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');
//     setError('');

//     const trimmedLoginId = formData.loginId.trim();

//     if (!trimmedLoginId) {
//       setError('Login ID is required');
//       setSubmitting(false);
//       return;
//     }

//     if (!formData.name.trim() || !formData.password.trim()) {
//       setError('Name and password are required');
//       setSubmitting(false);
//       return;
//     }

//     if (
//       formData.role === 'STUDENT' &&
//       (!formData.course || !formData.className || !formData.section)
//     ) {
//       setError('Course, Class, and Section are required for students');
//       setSubmitting(false);
//       return;
//     }

//     if (formData.role === 'TEACHER' && !formData.subject.trim()) {
//       setError('Subject is required for teacher');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const payload = {
//         name: formData.name.trim(),
//         loginId: trimmedLoginId,
//         password: formData.password,
//         role: formData.role.toUpperCase(),
//         email: formData.email?.trim() || '',
//         course: formData.course?.trim() || '',
//         className: formData.className?.trim() || '',
//         section: formData.section?.trim() || '',
//         subject: formData.subject?.trim() || '',
//       };

//       const res = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         setError(data.message || 'Failed to create user');
//         return;
//       }

//       setMessage('✅ User created successfully');

//       setFormData({
//         name: '',
//         loginId: '',
//         password: '',
//         role: 'STUDENT',
//         email: '',
//         course: '',
//         className: '',
//         section: '',
//         subject: '',
//       });

//       await loadDashboardStats();
//     } catch (err) {
//       console.error('CREATE USER ERROR:', err);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-lg">Loading admin dashboard...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create students and teachers, then manage them from here.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => router.push('/admin/students')}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Students
//             </button>
//             <button
//               onClick={() => router.push('/admin/teachers')}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Teachers
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
//             {error}
//           </div>
//         )}

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <p className="text-sm text-slate-500">Total Students</p>
//             <h2 className="text-4xl font-bold text-slate-900 mt-2">{stats.totalStudents}</h2>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <p className="text-sm text-slate-500">Total Teachers</p>
//             <h2 className="text-4xl font-bold text-slate-900 mt-2">{stats.totalTeachers}</h2>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <p className="text-sm text-slate-500">Total Submissions</p>
//             <h2 className="text-4xl font-bold text-slate-900 mt-2">{stats.totalSubmissions}</h2>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <p className="text-sm text-slate-500">Courses</p>
//             <h2 className="text-4xl font-bold text-slate-900 mt-2">
//               {Object.keys(stats.studentsByCourse || {}).length}
//             </h2>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Object.entries(stats.studentsByCourse || {}).map(([courseName, count]) => (
//             <div
//               key={courseName}
//               className="bg-blue-600 text-white rounded-2xl shadow p-6"
//             >
//               <p className="text-sm opacity-90">{courseName}</p>
//               <h2 className="text-4xl font-bold mt-2">{count}</h2>
//               <p className="text-sm opacity-90 mt-1">Students</p>
//             </div>
//           ))}

//           {Object.keys(stats.studentsByCourse || {}).length === 0 && (
//             <div className="bg-blue-600 text-white rounded-2xl shadow p-6">
//               <p className="text-sm opacity-90">No Courses</p>
//               <h2 className="text-4xl font-bold mt-2">0</h2>
//               <p className="text-sm opacity-90 mt-1">Students</p>
//             </div>
//           )}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Login ID</label>
//                 <input
//                   type="text"
//                   name="loginId"
//                   value={formData.loginId}
//                   onChange={handleChange}
//                   placeholder="Enter unique username"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="STUDENT">Student</option>
//                   <option value="TEACHER">Teacher</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {formData.role === 'STUDENT' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-1">Course *</label>
//                     <select
//                       name="course"
//                       value={formData.course}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Course</option>
//                       <option value="MCA">MCA</option>
//                       <option value="BCA">BCA</option>
//                       <option value="BSc">BSc</option>
//                       <option value="BTech">BTech</option>
//                       <option value="MTech">MTech</option>
//                       <option value="BA">BA</option>
//                       <option value="BCom">BCom</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Class *</label>
//                     <select
//                       name="className"
//                       value={formData.className}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Class</option>
//                       <option value="1st Year">1st Year</option>
//                       <option value="2nd Year">2nd Year</option>
//                       <option value="3rd Year">3rd Year</option>
//                       <option value="4th Year">4th Year</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">Section *</label>
//                     <select
//                       name="section"
//                       value={formData.section}
//                       onChange={handleChange}
//                       className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     >
//                       <option value="">Select Section</option>
//                       <option value="A">A</option>
//                       <option value="B">B</option>
//                       <option value="C">C</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {formData.role === 'TEACHER' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Subject *</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Enter subject"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                     required
//                   />
//                 </div>
//               )}

//               {message && (
//                 <p className="text-green-600 text-sm font-medium">{message}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
//               >
//                 {submitting ? 'Creating user...' : 'Create User'}
//               </button>
//             </form>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//             <div className="space-y-4">
//               <button
//                 onClick={() => router.push('/admin/students')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Students</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete student accounts.
//                 </p>
//               </button>

//               <button
//                 onClick={() => router.push('/admin/teachers')}
//                 className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//               >
//                 <p className="font-semibold text-slate-900">Manage Teachers</p>
//                 <p className="text-sm text-slate-600 mt-1">
//                   View, edit, and delete teacher accounts.
//                 </p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  const [stats, setStats] = useState({
    studentsByCourse: {},
    totalTeachers: 0,
    totalStudents: 0,
    totalSubmissions: 0,
  });

  const [formData, setFormData] = useState({
    name: '',
    loginId: '',
    password: '',
    role: 'STUDENT',
    email: '',
    course: '',
    className: '',
    section: '',
    subject: '',
  });

  const [resetForm, setResetForm] = useState({
    loginId: '',
    newPassword: '',
  });

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
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

      await loadDashboardStats();
    } catch (err) {
      console.error('ADMIN CHECK ERROR:', err);
      localStorage.removeItem('user');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        method: 'GET',
        cache: 'no-store',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStats({
          studentsByCourse: data.studentsByCourse || {},
          totalTeachers: data.totalTeachers || 0,
          totalStudents: data.totalStudents || 0,
          totalSubmissions: data.totalSubmissions || 0,
        });
      } else {
        setError(data.message || 'Failed to load dashboard stats');
        setStats({
          studentsByCourse: {},
          totalTeachers: 0,
          totalStudents: 0,
          totalSubmissions: 0,
        });
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
      setError('Failed to load dashboard stats');
      setStats({
        studentsByCourse: {},
        totalTeachers: 0,
        totalStudents: 0,
        totalSubmissions: 0,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'role' && value === 'STUDENT' ? { subject: '' } : {}),
      ...(name === 'role' && value === 'TEACHER'
        ? { course: '', className: '', section: '' }
        : {}),
    }));
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    const trimmedLoginId = formData.loginId.trim();

    if (!trimmedLoginId) {
      setError('Login ID is required');
      setSubmitting(false);
      return;
    }

    if (!formData.name.trim() || !formData.password.trim()) {
      setError('Name and password are required');
      setSubmitting(false);
      return;
    }

    if (
      formData.role === 'STUDENT' &&
      (!formData.course || !formData.className || !formData.section)
    ) {
      setError('Course, Class, and Section are required for students');
      setSubmitting(false);
      return;
    }

    if (formData.role === 'TEACHER' && !formData.subject.trim()) {
      setError('Subject is required for teacher');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        loginId: trimmedLoginId,
        password: formData.password,
        role: formData.role.toUpperCase(),
        email: formData.email?.trim() || '',
        course: formData.course?.trim() || '',
        className: formData.className?.trim() || '',
        section: formData.section?.trim() || '',
        subject: formData.subject?.trim() || '',
      };

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to create user');
        return;
      }

      setMessage('✅ User created successfully');

      setFormData({
        name: '',
        loginId: '',
        password: '',
        role: 'STUDENT',
        email: '',
        course: '',
        className: '',
        section: '',
        subject: '',
      });

      await loadDashboardStats();
    } catch (err) {
      console.error('CREATE USER ERROR:', err);
      setError('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetSubmitting(true);
    setResetMessage('');
    setResetError('');

    try {
    const res = await fetch('/api/admin/reset-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    loginId: resetForm.loginId.trim(),
    newPassword: resetForm.newPassword.trim(),
  }),
});

      const data = await res.json();

      if (!res.ok || !data.success) {
        setResetError(data.message || 'Failed to reset password');
        return;
      }

      setResetMessage('✅ Password reset successfully');
      setResetForm({
        loginId: '',
        newPassword: '',
      });
    } catch (err) {
      console.error('RESET PASSWORD ERROR:', err);
      setResetError('Something went wrong while resetting password');
    } finally {
      setResetSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="w-56 h-56 mx-auto">
            <DotLottieReact
              src="https://lottie.host/46c45159-7099-4955-8f9a-a466b342f9a1/9GPovZ7IOK.lottie"
              loop
              autoplay
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 -mt-4">Loading Admin Dashboard</h2>
          <p className="text-slate-600 mt-2">Please wait while we verify admin access.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Create students and teachers, manage users, and reset passwords.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/admin/students')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Students
            </button>
            <button
              onClick={() => router.push('/admin/teachers')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Teachers
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">Total Students</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">{stats.totalStudents}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">Total Teachers</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">{stats.totalTeachers}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">Total Submissions</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">{stats.totalSubmissions}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">Courses</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              {Object.keys(stats.studentsByCourse || {}).length}
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(stats.studentsByCourse || {}).map(([courseName, count]) => (
            <div
              key={courseName}
              className="bg-blue-600 text-white rounded-2xl shadow p-6"
            >
              <p className="text-sm opacity-90">{courseName}</p>
              <h2 className="text-4xl font-bold mt-2">{count}</h2>
              <p className="text-sm opacity-90 mt-1">Students</p>
            </div>
          ))}

          {Object.keys(stats.studentsByCourse || {}).length === 0 && (
            <div className="bg-blue-600 text-white rounded-2xl shadow p-6">
              <p className="text-sm opacity-90">No Courses</p>
              <h2 className="text-4xl font-bold mt-2">0</h2>
              <p className="text-sm opacity-90 mt-1">Students</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-5">Add New User</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Login ID</label>
                <input
                  type="text"
                  name="loginId"
                  value={formData.loginId}
                  onChange={handleChange}
                  placeholder="Enter unique username"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {formData.role === 'STUDENT' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Course *</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Course</option>
                      <option value="MCA">MCA</option>
                      <option value="BCA">BCA</option>
                      <option value="BSc">BSc</option>
                      <option value="BTech">BTech</option>
                      <option value="MTech">MTech</option>
                      <option value="BA">BA</option>
                      <option value="BCom">BCom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Class *</label>
                    <select
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Section *</label>
                    <select
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                </>
              )}

              {formData.role === 'TEACHER' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              {message && (
                <p className="text-green-600 text-sm font-medium">{message}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
              >
                {submitting ? 'Creating user...' : 'Create User'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-5">Reset Password</h2>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Login ID</label>
                  <input
                    type="text"
                    name="loginId"
                    value={resetForm.loginId}
                    onChange={handleResetChange}
                    placeholder="Enter user login ID"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={resetForm.newPassword}
                    onChange={handleResetChange}
                    placeholder="Enter new password"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {resetMessage && (
                  <p className="text-green-600 text-sm font-medium">{resetMessage}</p>
                )}

                {resetError && (
                  <p className="text-red-600 text-sm font-medium">{resetError}</p>
                )}

                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="w-full bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700 disabled:opacity-70"
                >
                  {resetSubmitting ? 'Resetting password...' : 'Reset Password'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

              <div className="space-y-4">
                <button
                  onClick={() => router.push('/admin/students')}
                  className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
                >
                  <p className="font-semibold text-slate-900">Manage Students</p>
                  <p className="text-sm text-slate-600 mt-1">
                    View, edit, and delete student accounts.
                  </p>
                </button>

                <button
                  onClick={() => router.push('/admin/teachers')}
                  className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
                >
                  <p className="font-semibold text-slate-900">Manage Teachers</p>
                  <p className="text-sm text-slate-600 mt-1">
                    View, edit, and delete teacher accounts.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}