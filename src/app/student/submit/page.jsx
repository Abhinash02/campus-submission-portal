// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// export default function StudentSubmitPage() {
//   const router = useRouter();
//   const fileInputRef = useRef(null);

//   const [student, setStudent] = useState(null);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     subject: '',
//     description: '',
//     teacherId: '',
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         router.push('/');
//         return;
//       }

//       const parsed = JSON.parse(savedUser);

//       if (parsed.role !== 'STUDENT') {
//         router.push('/');
//         return;
//       }

//       setStudent(parsed);
//     } catch (error) {
//       console.error('STUDENT LOAD ERROR:', error);
//       localStorage.removeItem('user');
//       router.push('/');
//     }
//   }, [router]);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await fetch('/api/users', {
//           method: 'GET',
//           cache: 'no-store',
//         });

//         const data = await res.json();

//         const teacherList = Array.isArray(data)
//           ? data.filter((user) => user.role === 'TEACHER')
//           : data?.users?.filter((user) => user.role === 'TEACHER') || [];

//         setTeachers(teacherList);
//       } catch (error) {
//         console.error('FETCH TEACHERS ERROR:', error);
//         toast.error('Failed to load teachers');
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'teacherId') {
//       const selectedTeacher = teachers.find((t) => t._id === value);

//       setFormData((prev) => ({
//         ...prev,
//         teacherId: value,
//         subject: selectedTeacher?.subject || '',
//       }));
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0] || null;
//     setSelectedFile(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!student || !student._id) {
//       toast.error('Student data missing');
//       return;
//     }

//     if (!student.loginId) {
//       toast.error('Student login ID missing');
//       return;
//     }

//     const selectedTeacher = teachers.find((t) => t._id === formData.teacherId);

//     if (!selectedTeacher) {
//       toast.error('Please select a teacher');
//       return;
//     }

//     if (!formData.title.trim()) {
//       toast.error('Title is required');
//       return;
//     }

//     if (!formData.subject.trim()) {
//       toast.error('Subject is required');
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         studentId: student._id,
//         studentName: student.name || '',
//         studentLoginId: student.loginId || '',
//         teacherId: selectedTeacher._id,
//         teacherName: selectedTeacher.name || '',
//         teacherLoginId: selectedTeacher.loginId || '',
//         title: formData.title.trim(),
//         subject: formData.subject.trim(),
//         description: formData.description.trim(),
//         className: student.className || '',
//         courseName: student.course || '',
//         section: student.section || '',
//         fileName: selectedFile?.name || '',
//         fileUrl: '',
//       };

//       console.log('SUBMISSION PAYLOAD:', payload);

//       const res = await fetch('/api/submissions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log('SUBMIT RESPONSE:', data);

//       if (!res.ok || !data.success) {
//         toast.error(data.message || 'Failed to submit assignment');
//         return;
//       }

//       toast.success('Assignment submitted successfully');

//       setFormData({
//         title: '',
//         subject: '',
//         description: '',
//         teacherId: '',
//       });
//       setSelectedFile(null);

//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     } catch (error) {
//       console.error('SUBMIT ASSIGNMENT ERROR:', error);
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!student) return null;

//   return (
//     <main className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
//         <h1 className="text-3xl font-bold text-slate-900 mb-6">
//           Submit Assignment
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-2 font-medium">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Teacher</label>
//             <select
//               name="teacherId"
//               value={formData.teacherId}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               required
//             >
//               <option value="">Select teacher</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher._id}>
//                   {teacher.name} ({teacher.subject || 'No subject'})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Subject</label>
//             <input
//               type="text"
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2 bg-slate-50"
//               required
//               readOnly
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-2"
//               rows={4}
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">
//               Attach document (optional)
//             </label>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
//               onChange={handleFileChange}
//               className="w-full border rounded-lg px-4 py-2"
//             />
//             {selectedFile && (
//               <p className="text-sm text-slate-600 mt-2">
//                 Selected file: {selectedFile.name}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Submitting...' : 'Submit Assignment'}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function StudentSubmitPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [student, setStudent] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    teacherId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const parsed = JSON.parse(savedUser);

      if (parsed.role !== 'STUDENT') {
        router.push('/');
        return;
      }

      setStudent(parsed);
    } catch (error) {
      console.error('STUDENT LOAD ERROR:', error);
      localStorage.removeItem('user');
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/users', {
          method: 'GET',
          cache: 'no-store',
        });

        const data = await res.json();

        const teacherList = Array.isArray(data)
          ? data.filter((user) => user.role === 'TEACHER')
          : data?.users?.filter((user) => user.role === 'TEACHER') || [];

        setTeachers(teacherList);
      } catch (error) {
        console.error('FETCH TEACHERS ERROR:', error);
        toast.error('Failed to load teachers');
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'teacherId') {
      const selectedTeacher = teachers.find((t) => t._id === value);

      setFormData((prev) => ({
        ...prev,
        teacherId: value,
        subject: selectedTeacher?.subject || '',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student || !student._id) {
      toast.error('Student data missing');
      return;
    }

    if (!student.loginId) {
      toast.error('Student login ID missing');
      return;
    }

    const selectedTeacher = teachers.find((t) => t._id === formData.teacherId);

    if (!selectedTeacher) {
      toast.error('Please select a teacher');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.subject.trim()) {
      toast.error('Subject is required');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        studentId: student._id,
        studentName: student.name || '',
        studentLoginId: student.loginId || '',
        teacherId: selectedTeacher._id,
        teacherName: selectedTeacher.name || '',
        teacherLoginId: selectedTeacher.loginId || '',
        title: formData.title.trim(),
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        className: student.className || '',
        courseName: student.course || '',
        section: student.section || '',
        fileName: selectedFile?.name || '',
        fileUrl: '',
      };

      console.log('SUBMISSION PAYLOAD:', payload);

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('SUBMIT RESPONSE:', data);

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to submit assignment');
        return;
      }

      toast.success('Assignment submitted successfully');

      setFormData({
        title: '',
        subject: '',
        description: '',
        teacherId: '',
      });
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('SUBMIT ASSIGNMENT ERROR:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-2">
                Student Panel
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Submit Assignment
              </h1>
              <p className="text-slate-600 mt-2">
                Fill in the details and submit your assignment to the selected teacher.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/student')}
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition"
            >
              ← Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-slate-800">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                placeholder="Enter assignment title"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-800">Teacher</label>
              <select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              >
                <option value="">Select teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name} ({teacher.subject || 'No subject'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-800">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-slate-700 outline-none"
                required
                readOnly
                placeholder="Subject will appear automatically"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-800">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={5}
                placeholder="Write a short description..."
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-800">
                Attach document (optional)
              </label>
              <div className="border border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50 hover:bg-slate-100 transition">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                  onChange={handleFileChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
                />
                {selectedFile && (
                  <p className="text-sm text-slate-600 mt-3">
                    Selected file: <span className="font-medium text-slate-800">{selectedFile.name}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition shadow-md"
              >
                {loading ? 'Submitting...' : 'Submit Assignment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}