// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// export default function AdminPage() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [resetSubmitting, setResetSubmitting] = useState(false);

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [resetMessage, setResetMessage] = useState('');
//   const [resetError, setResetError] = useState('');

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

//   const [resetForm, setResetForm] = useState({
//     loginId: '',
//     newPassword: '',
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
//       }
//     } catch (err) {
//       console.error('Failed to load dashboard stats:', err);
//       setError('Failed to load dashboard stats');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value };

//       if (name === 'role') {
//         if (value === 'STUDENT') {
//           updated.subject = '';
//         } else if (value === 'TEACHER') {
//           updated.course = '';
//           updated.className = '';
//           updated.section = '';
//         } else if (value === 'ADMIN') {
//           updated.course = '';
//           updated.className = '';
//           updated.section = '';
//           updated.subject = '';
//         }
//       }

//       return updated;
//     });
//   };

//   const handleResetChange = (e) => {
//     const { name, value } = e.target;
//     setResetForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setMessage('');
//     setError('');

//     const trimmedLoginId = formData.loginId.trim();

//     if (!trimmedLoginId) {
//       setError('Login ID / Roll No is required');
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
//       const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

//       const payload = {
//         name: formData.name.trim(),
//         loginId: trimmedLoginId,
//         password: formData.password.trim(),
//         role: formData.role.toUpperCase(),
//         email: formData.email?.trim() || '',
//         course: formData.course?.trim() || '',
//         className: formData.className?.trim() || '',
//         section: formData.section?.trim() || '',
//         subject: formData.subject?.trim() || '',
//         createdBy: savedUser?.loginId || '',
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

//       setMessage(`✅ ${formData.role} created successfully`);

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

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setResetSubmitting(true);
//     setResetMessage('');
//     setResetError('');

//     try {
//       const res = await fetch('/api/admin/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           loginId: resetForm.loginId.trim(),
//           newPassword: resetForm.newPassword.trim(),
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         setResetError(data.message || 'Failed to reset password');
//         return;
//       }

//       setResetMessage('✅ Password reset successfully');
//       setResetForm({
//         loginId: '',
//         newPassword: '',
//       });
//     } catch (err) {
//       console.error('RESET PASSWORD ERROR:', err);
//       setResetError('Something went wrong while resetting password');
//     } finally {
//       setResetSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
//           <div className="w-56 h-56 mx-auto">
//             <DotLottieReact
//               src="https://lottie.host/46c45159-7099-4955-8f9a-a466b342f9a1/9GPovZ7IOK.lottie"
//               loop
//               autoplay
//             />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-900 -mt-4">Loading Admin Dashboard</h2>
//           <p className="text-slate-600 mt-2">Please wait while we verify admin access.</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
//             <p className="text-slate-600 mt-1">
//               Create students, teachers, admins, and reset passwords from here.
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

//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-2xl font-semibold mb-5">Create User</h2>

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
//                   Login ID {formData.role === 'STUDENT' ? '/ Roll No' : ''}
//                 </label>
//                 <input
//                   type="text"
//                   name="loginId"
//                   value={formData.loginId}
//                   onChange={handleChange}
//                   placeholder={
//                     formData.role === 'STUDENT'
//                       ? 'Enter roll number / login ID'
//                       : 'Enter login ID'
//                   }
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
//                   <option value="ADMIN">Admin</option>
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

//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl shadow p-6">
//               <h2 className="text-2xl font-semibold mb-5">Reset Password</h2>

//               <form onSubmit={handleResetPassword} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Login ID / Roll No</label>
//                   <input
//                     type="text"
//                     name="loginId"
//                     value={resetForm.loginId}
//                     onChange={handleResetChange}
//                     placeholder="Enter login ID"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">New Password</label>
//                   <input
//                     type="password"
//                     name="newPassword"
//                     value={resetForm.newPassword}
//                     onChange={handleResetChange}
//                     placeholder="Enter new password"
//                     className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                     required
//                   />
//                 </div>

//                 {resetMessage && (
//                   <p className="text-green-600 text-sm font-medium">{resetMessage}</p>
//                 )}

//                 {resetError && (
//                   <p className="text-red-600 text-sm font-medium">{resetError}</p>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={resetSubmitting}
//                   className="w-full bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700 disabled:opacity-70"
//                 >
//                   {resetSubmitting ? 'Resetting password...' : 'Reset Password'}
//                 </button>
//               </form>
//             </div>

//             <div className="bg-white rounded-2xl shadow p-6">
//               <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

//               <div className="space-y-4">
//                 <button
//                   onClick={() => router.push('/admin/students')}
//                   className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//                 >
//                   <p className="font-semibold text-slate-900">Manage Students</p>
//                   <p className="text-sm text-slate-600 mt-1">
//                     View, edit, and delete student accounts.
//                   </p>
//                 </button>

//                 <button
//                   onClick={() => router.push('/admin/teachers')}
//                   className="w-full text-left border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
//                 >
//                   <p className="font-semibold text-slate-900">Manage Teachers</p>
//                   <p className="text-sm text-slate-600 mt-1">
//                     View, edit, and delete teacher accounts.
//                   </p>
//                 </button>
//               </div>
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
      }
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
      setError('Failed to load dashboard stats');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'role') {
        if (value === 'STUDENT') {
          updated.subject = '';
        } else if (value === 'TEACHER') {
          updated.course = '';
          updated.className = '';
          updated.section = '';
        } else if (value === 'ADMIN') {
          updated.course = '';
          updated.className = '';
          updated.section = '';
          updated.subject = '';
        }
      }

      return updated;
    });
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
      setError('Login ID / Roll No is required');
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
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

      const payload = {
        name: formData.name.trim(),
        loginId: trimmedLoginId,
        password: formData.password.trim(),
        role: formData.role.toUpperCase(),
        email: formData.email?.trim() || '',
        course: formData.course?.trim() || '',
        className: formData.className?.trim() || '',
        section: formData.section?.trim() || '',
        subject: formData.subject?.trim() || '',
        createdBy: savedUser?.loginId || '',
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

      setMessage(`✅ ${formData.role} created successfully`);

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
          <h2 className="text-2xl font-bold text-slate-900 -mt-4">
            Loading Admin Dashboard
          </h2>
          <p className="text-slate-600 mt-2">
            Please wait while we verify admin access.
          </p>
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
              Create students, teachers, admins, and reset passwords from here.
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
            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              {stats.totalStudents}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">Total Teachers</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              {stats.totalTeachers}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">Total Submissions</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              {stats.totalSubmissions}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-sm text-slate-500">Courses</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              {Object.keys(stats.studentsByCourse || {}).length}
            </h2>
          </div>
        </div>

        {Object.keys(stats.studentsByCourse || {}).length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-5">Students by Course</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.studentsByCourse).map(([course, count]) => (
                <div
                  key={course}
                  className="border border-slate-200 rounded-xl p-4 bg-slate-50"
                >
                  <p className="text-lg font-semibold text-slate-900">{course}</p>
                  <p className="text-slate-600 mt-1">{count} students</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-5">Create User</h2>

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
                <label className="block text-sm font-medium mb-1">
                  Login ID {formData.role === 'STUDENT' ? '/ Roll No' : ''}
                </label>
                <input
                  type="text"
                  name="loginId"
                  value={formData.loginId}
                  onChange={handleChange}
                  placeholder={
                    formData.role === 'STUDENT'
                      ? 'Enter roll number / login ID'
                      : 'Enter login ID'
                  }
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
                  <option value="ADMIN">Admin</option>
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
                  <label className="block text-sm font-medium mb-1">
                    Login ID / Roll No
                  </label>
                  <input
                    type="text"
                    name="loginId"
                    value={resetForm.loginId}
                    onChange={handleResetChange}
                    placeholder="Enter login ID"
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