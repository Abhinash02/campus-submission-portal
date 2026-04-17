// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// export default function TeacherStudentsPage() {
//   const router = useRouter();
//   const [teacher, setTeacher] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     loginId: '',
//     password: '',
//     email: '',
//     course: '',
//     className: '',
//     section: '',
//   });

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.replace('/');
//         return;
//       }

//       const parsed = JSON.parse(savedUser);

//       if (String(parsed.role || '').toUpperCase() !== 'TEACHER') {
//         localStorage.removeItem('user');
//         router.replace('/');
//         return;
//       }

//       setTeacher(parsed);
//       setFormData((prev) => ({
//         ...prev,
//         className: parsed.className || '',
//       }));
//     } catch (error) {
//       localStorage.removeItem('user');
//       router.replace('/');
//     }
//   }, [router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       const payload = {
//         name: formData.name.trim(),
//         loginId: formData.loginId.trim(),
//         password: formData.password.trim(),
//         email: formData.email.trim(),
//         course: formData.course.trim(),
//         className: formData.className.trim(),
//         section: formData.section.trim(),
//         teacherId: teacher?.id || teacher?._id,
//       };

//       const res = await fetch('/api/teachers/create-student', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to create student');
//         return;
//       }

//       toast.success('Student account created successfully');
//       setFormData({
//         name: '',
//         loginId: '',
//         password: '',
//         email: '',
//         course: '',
//         className: teacher?.className || '',
//         section: '',
//       });
//     } catch (error) {
//       console.error('CREATE STUDENT ERROR:', error);
//       toast.error('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!teacher) return null;

//   return (
//     <main className="space-y-6">
//       <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Manage Students</h1>
//           <p className="text-slate-600 mt-1">
//             Create student accounts for your class.
//           </p>
//         </div>

//         <button
//           onClick={() => router.push('/teacher')}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Back to Dashboard
//         </button>
//       </div>

//       <form
//         onSubmit={handleCreate}
//         className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Student Name"
//           className="border rounded-lg px-4 py-3"
//           required
//         />

//         <input
//           name="loginId"
//           value={formData.loginId}
//           onChange={handleChange}
//           placeholder="Login ID"
//           className="border rounded-lg px-4 py-3"
//           required
//         />

//         <input
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="border rounded-lg px-4 py-3"
//           required
//         />

//         <input
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="border rounded-lg px-4 py-3"
//         />

//         <select
//           name="course"
//           value={formData.course}
//           onChange={handleChange}
//           className="border rounded-lg px-4 py-3"
//           required
//         >
//           <option value="">Select Course</option>
//           <option value="MCA">MCA</option>
//           <option value="BCA">BCA</option>
//           <option value="BSc">BSc</option>
//           <option value="BTech">BTech</option>
//           <option value="MTech">MTech</option>
//           <option value="BA">BA</option>
//           <option value="BCom">BCom</option>
//         </select>

//         <input
//           name="className"
//           value={formData.className}
//           onChange={handleChange}
//           placeholder="Class Name"
//           className="border rounded-lg px-4 py-3 bg-slate-50"
//           required
//         />

//         <select
//           name="section"
//           value={formData.section}
//           onChange={handleChange}
//           className="border rounded-lg px-4 py-3"
//           required
//         >
//           <option value="">Select Section</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//         </select>

//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             disabled={submitting}
//             className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 disabled:opacity-70"
//           >
//             {submitting ? 'Creating...' : 'Create Student Account'}
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function TeacherStudentsPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    loginId: '',
    password: '',
    email: '',
    course: '',
    className: '',
    section: '',
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.replace('/');
        return;
      }

      const parsed = JSON.parse(savedUser);

      if (String(parsed.role || '').toUpperCase() !== 'TEACHER') {
        localStorage.removeItem('user');
        router.replace('/');
        return;
      }

      setTeacher(parsed);
      setFormData((prev) => ({
        ...prev,
        course: parsed.course || '',
        className: parsed.className || '',
        section: parsed.section || '',
      }));
    } catch (error) {
      localStorage.removeItem('user');
      router.replace('/');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        loginId: formData.loginId.trim(),
        password: formData.password.trim(),
        email: formData.email.trim(),
        course: formData.course.trim(),
        className: formData.className.trim(),
        section: formData.section.trim(),
        teacherId: teacher?.id || teacher?._id,
      };

      const res = await fetch('/api/teachers/create-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to create student');
        return;
      }

      toast.success('Student account created successfully');

      setFormData({
        name: '',
        loginId: '',
        password: '',
        email: '',
        course: teacher?.course || '',
        className: teacher?.className || '',
        section: teacher?.section || '',
      });
    } catch (error) {
      console.error('CREATE STUDENT ERROR:', error);
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (!teacher) return null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Students</h1>
            <p className="text-slate-600 mt-1">
              Create student accounts for your class using the same structure as the admin panel.
            </p>
          </div>

          <button
            onClick={() => router.push('/teacher')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-5">Add New Student</h2>

            <form onSubmit={handleCreate} className="space-y-4">
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
                  placeholder="Enter unique login ID"
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
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  placeholder="Enter class name"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  required
                />
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

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-900 text-white rounded-lg py-3 hover:bg-slate-800 disabled:opacity-70"
              >
                {submitting ? 'Creating student...' : 'Create Student'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-5">Teacher Class Info</h2>

            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">Teacher Name</p>
                <p className="font-semibold text-slate-900 mt-1">{teacher?.name || 'N/A'}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">Course</p>
                <p className="font-semibold text-slate-900 mt-1">{teacher?.course || 'N/A'}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">Class</p>
                <p className="font-semibold text-slate-900 mt-1">{teacher?.className || 'N/A'}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-sm text-slate-500">Section</p>
                <p className="font-semibold text-slate-900 mt-1">{teacher?.section || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}