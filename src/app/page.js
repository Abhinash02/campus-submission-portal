
// // Student Dashboard
// function StudentDashboard() {
//   const [submissions, setSubmissions] = useState([
//     { id: 1, title: 'Math Assignment 1', status: 'REVIEWED', marks: 92, teacher: 'Mr. Sharma', date: '2026-04-10' },
//     { id: 2, title: 'Science Project', status: 'PENDING', marks: null, teacher: 'Ms. Gupta', date: '2026-04-11' }
//   ])
//   const [showForm, setShowForm] = useState(false)
//   const teachers = [
//     { id: 1, name: 'Mr. Sharma - Math' },
//     { id: 2, name: 'Ms. Gupta - Science' }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//               Student Dashboard
//             </h1>
//             <p className="text-gray-600 mt-2">Submit and track your assignments</p>
//           </div>
//           <button 
//             onClick={() => localStorage.removeItem('userRole') || localStorage.removeItem('userData') || window.location.reload()}
//             className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* My Submissions */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">📋 My Submissions</h2>
//               <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
//                 {submissions.filter(s => s.status === 'REVIEWED').length} Graded
//               </span>
//             </div>
            
//             <div className="space-y-3">
//               {submissions.map((submission) => (
//                 <div key={submission.id} className="p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="font-bold text-lg">{submission.title}</h3>
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       submission.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-emerald-100 text-emerald-800'
//                     }`}>
//                       {submission.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-2">Teacher: {submission.teacher}</p>
//                   <p className="text-sm text-gray-600">Marks: {submission.marks || 'Pending'}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Submit New Assignment */}
//           {!showForm ? (
//             <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-3xl p-8 shadow-2xl border-0 flex flex-col justify-center">
//               <div className="text-center mb-8">
//                 <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
//                   ➕
//                 </div>
//                 <h2 className="text-2xl font-bold mb-2">Submit New Assignment</h2>
//                 <p className="opacity-90">Ready to submit your next assignment?</p>
//               </div>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-[1.02] transition-all shadow-xl"
//               >
//                 📝 Submit Assignment
//               </button>
//             </div>
//           ) : (
//             <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">📝 New Assignment</h2>
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>
              
//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     defaultValue="STU001"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     defaultValue="Abhinash Abhi"
//                   />
//                 </div>
                
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
//                       defaultValue="10A"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
//                       defaultValue="A"
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Select Teacher</label>
//                   <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500">
//                     {teachers.map(teacher => (
//                       <option key={teacher.id}>{teacher.name}</option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     rows="4"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 resize-vertical"
//                     placeholder="Write your assignment description here..."
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">File Upload (Optional)</label>
//                   <input
//                     type="file"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//                   />
//                 </div>
                
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all shadow-xl"
//                 >
//                   🚀 Submit Assignment
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// 'use client'
// import { useState, useEffect } from 'react'

// export default function Home() {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [loginData, setLoginData] = useState({ username: '', password: '' })

//   useEffect(() => {
//     // Check if user is already logged in
//     const savedUser = localStorage.getItem('user')
//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     }
//     setLoading(false)
//   }, [])

//   const handleLogin = async () => {
//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData)
//       })

//       const data = await res.json()
      
//       if (data.success) {
//         localStorage.setItem('user', JSON.stringify(data.user))
//         setUser(data.user)
//       } else {
//         alert(data.message)
//       }
//     } catch (error) {
//       alert('Login failed: ' + error.message)
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

//   if (user) {
//     const roleComponents = {
//       admin: <AdminDashboard user={user} onLogout={handleLogout} />,
//       teacher: <TeacherDashboard user={user} onLogout={handleLogout} />,
//       student: <StudentDashboard user={user} onLogout={handleLogout} />
//     }
//     return roleComponents[user.role]
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/50">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Assignment Portal
//           </h1>
//           <p className="text-gray-600">Login with your credentials</p>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Username/Roll No</label>
//             <input
//               type="text"
//               value={loginData.username}
//               onChange={(e) => setLoginData({...loginData, username: e.target.value})}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="admin / teacher1 / STU001"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={loginData.password}
//               onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               placeholder="admin123"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
//         >
//           Login
//         </button>

//         <div className="text-xs text-gray-500 text-center space-y-1">
//           <p>🛠️ Default Accounts (change passwords in DB):</p>
//           <div className="text-left text-sm space-y-1 bg-gray-50 p-3 rounded-lg">
//             <p><strong>Admin:</strong> admin / admin123</p>
//             <p><strong>Teacher:</strong> teacher1 / teacher123</p>
//             <p><strong>Student:</strong> STU001 / student123</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Admin Dashboard - FULLY FUNCTIONAL
// function AdminDashboard({ user, onLogout }) {
//   const [teachers, setTeachers] = useState([])
//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', username: '', password: '' })
//   const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', className: '', section: '', username: '', password: '' })

//   useEffect(() => {
//     fetchTeachers()
//     fetchStudents()
//   }, [])

//   const fetchTeachers = async () => {
//     const res = await fetch('/api/admin/teachers')
//     const data = await res.json()
//     setTeachers(data)
//   }

//   const fetchStudents = async () => {
//     const res = await fetch('/api/admin/students')
//     const data = await res.json()
//     setStudents(data)
//     setLoading(false)
//   }

//   const createTeacher = async () => {
//     await fetch('/api/admin/teachers', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newTeacher)
//     })
//     setNewTeacher({ name: '', subject: '', username: '', password: '' })
//     fetchTeachers()
//   }

//   const deleteTeacher = async (id) => {
//     await fetch(`/api/admin/teachers?id=${id}`, { method: 'DELETE' })
//     fetchTeachers()
//   }

//   const createStudent = async () => {
//     await fetch('/api/admin/students', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newStudent)
//     })
//     setNewStudent({ name: '', rollNo: '', className: '', section: '', username: '', password: '' })
//     fetchStudents()
//   }

//   const deleteStudent = async (id) => {
//     await fetch(`/api/admin/students?id=${id}`, { method: 'DELETE' })
//     fetchStudents()
//   }

//   if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//               Admin Dashboard - {user.username}
//             </h1>
//             <p className="text-gray-600 mt-2">Manage teachers and students</p>
//           </div>
//           <button onClick={onLogout} className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all">
//             Logout
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Teachers Management */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">👨‍🏫 Teachers ({teachers.length})</h2>
            
//             {/* Add Teacher Form */}
//             <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl mb-6">
//               <h3 className="font-bold mb-4">➕ Add New Teacher</h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <input placeholder="Teacher Name" value={newTeacher.name} onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})} className="p-3 border rounded-xl" />
//                 <input placeholder="Subject" value={newTeacher.subject} onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})} className="p-3 border rounded-xl" />
//                 <input placeholder="Username" value={newTeacher.username} onChange={(e) => setNewTeacher({...newTeacher, username: e.target.value})} className="p-3 border rounded-xl" />
//                 <input type="password" placeholder="Password" value={newTeacher.password} onChange={(e) => setNewTeacher({...newTeacher, password: e.target.value})} className="p-3 border rounded-xl" />
//               </div>
//               <button onClick={createTeacher} className="w-full mt-4 bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">Create Teacher</button>
//             </div>

//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {teachers.map(teacher => (
//                 <div key={teacher._id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
//                   <div>
//                     <p className="font-semibold text-gray-800">{teacher.teacherName}</p>
//                     <p className="text-sm text-gray-600">{teacher.subject} • {teacher.username}</p>
//                   </div>
//                   <button onClick={() => deleteTeacher(teacher._id)} className="text-red-500 hover:text-red-700 font-bold bg-red-100 px-4 py-2 rounded-xl hover:bg-red-200 transition-all">Delete</button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Students Management */}
//           <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">👨‍🎓 Students ({students.length})</h2>
            
//             {/* Add Student Form */}
//             <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-6">
//               <h3 className="font-bold mb-4">➕ Add New Student</h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <input placeholder="Student Name" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} className="p-3 border rounded-xl" />
//                 <input placeholder="Roll No (STU001)" value={newStudent.rollNo} onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})} className="p-3 border rounded-xl" />
//                 <input placeholder="Class (10A)" value={newStudent.className} onChange={(e) => setNewStudent({...newStudent, className: e.target.value})} className="p-3 border rounded-xl" />
//                 <input placeholder="Section (A)" value={newStudent.section} onChange={(e) => setNewStudent({...newStudent, section: e.target.value})} className="p-3 border rounded-xl" />
//                 <input placeholder="Username" value={newStudent.username} onChange={(e) => setNewStudent({...newStudent, username: e.target.value})} className="p-3 border rounded-xl" />
//                 <input type="password" placeholder="Password" value={newStudent.password} onChange={(e) => setNewStudent({...newStudent, password: e.target.value})} className="p-3 border rounded-xl" />
//               </div>
//               <button onClick={createStudent} className="w-full mt-4 bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-all">Create Student</button>
//             </div>

//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {students.map(student => (
//                 <div key={student._id} className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
//                   <div>
//                     <p className="font-semibold text-gray-800">{student.name}</p>
//                     <p className="text-sm text-gray-600">{student.rollNumber} • {student.className}-{student.section} • {student.username}</p>
//                   </div>
//                   <button onClick={() => deleteStudent(student._id)} className="text-red-500 hover:text-red-700 font-bold bg-red-100 px-4 py-2 rounded-xl hover:bg-red-200 transition-all">Delete</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Teacher & Student dashboards remain the same for now...
// function TeacherDashboard({ user, onLogout }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">Teacher Dashboard</h1>
//           <button onClick={onLogout} className="px-6 py-2 bg-red-500 text-white rounded-xl">Logout</button>
//         </div>
//         <div className="text-2xl text-gray-600">Coming soon... (Submissions will connect to DB)</div>
//       </div>
//     </div>
//   )
// }

// function StudentDashboard({ user, onLogout }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between mb-8">
//           <h1 className="text-4xl font-bold text-gray-800">Student Dashboard</h1>
//           <button onClick={onLogout} className="px-6 py-2 bg-red-500 text-white rounded-xl">Logout</button>
//         </div>
//         <div className="text-2xl text-gray-600">Coming soon... (Submission form will connect to DB)</div>
//       </div>
//     </div>
//   )
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (
//         savedUser &&
//         savedUser !== 'undefined' &&
//         savedUser !== 'null'
//       ) {
//         const parsedUser = JSON.parse(savedUser);
//         setUser(parsedUser);

//         if (parsedUser.role === 'ADMIN') router.push('/admin');
//         else if (parsedUser.role === 'TEACHER') router.push('/teacher');
//         else if (parsedUser.role === 'STUDENT') router.push('/student');
//       }
//     } catch (error) {
//       console.error('Invalid localStorage user:', error);
//       localStorage.removeItem('user');
//     } finally {
//       setLoading(false);
//     }
//   }, [router]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSubmitting(true);

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ loginId, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data?.message || 'Login failed');
//         setSubmitting(false);
//         return;
//       }

//       const loggedInUser = {
//         loginId,
//         role: data.role,
//       };

//       localStorage.setItem('user', JSON.stringify(loggedInUser));
//       setUser(loggedInUser);

//       if (data.role === 'ADMIN') router.push('/admin');
//       else if (data.role === 'TEACHER') router.push('/teacher');
//       else if (data.role === 'STUDENT') router.push('/student');
//     } catch (error) {
//       console.error(error);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center">
//         <p className="text-lg font-medium">Loading...</p>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-4"
//       >
//         <h1 className="text-3xl font-bold">Login</h1>
//         <p className="text-slate-600 text-sm">
//           Use roll number for student or username for admin/teacher.
//         </p>

//         <input
//           value={loginId}
//           onChange={(e) => setLoginId(e.target.value)}
//           placeholder="Roll No / Username"
//           className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 disabled:opacity-50"
//         >
//           {submitting ? 'Logging in...' : 'Login'}
//         </button>

//         <div className="text-xs text-slate-500 space-y-1 pt-2">
//           <p>Admin: admin / 123456</p>
//           <p>Teacher: teacher1 / 123456</p>
//           <p>Student: 101 / 123456</p>
//         </div>
//       </form>
//     </main>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
//         const parsedUser = JSON.parse(savedUser);

//         if (parsedUser.role === 'ADMIN') router.push('/admin');
//         else if (parsedUser.role === 'TEACHER') router.push('/teacher');
//         else if (parsedUser.role === 'STUDENT') router.push('/student');
//       }
//     } catch (error) {
//       console.error('Invalid localStorage user:', error);
//       localStorage.removeItem('user');
//     } finally {
//       setLoading(false);
//     }
//   }, [router]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSubmitting(true);

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ loginId, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data?.message || 'Login failed');
//         return;
//       }

//         const userData = {
//     ...data.user,
//     className: data.user.className || '',
//   };
//       localStorage.setItem('user', JSON.stringify(data.user));

//       if (data.user.role === 'ADMIN') router.push('/admin');
//       else if (data.user.role === 'TEACHER') router.push('/teacher');
//       else if (data.user.role === 'STUDENT') router.push('/student');
      
//     } catch (error) {
//       console.error(error);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div className="p-10">Loading...</div>;

//   return (
//     <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-4"
//       >
//         <h1 className="text-3xl font-bold">Login</h1>

//         <input
//           value={loginId}
//           onChange={(e) => setLoginId(e.target.value)}
//           placeholder="Roll No / Username"
//           className="w-full border rounded-lg px-4 py-3 outline-none"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full border rounded-lg px-4 py-3 outline-none"
//         />

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-blue-600 text-white rounded-lg py-3"
//         >
//           {submitting ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function HomePage() {
//   const router = useRouter();
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
//         const parsedUser = JSON.parse(savedUser);

//         if (parsedUser.role === 'ADMIN') router.push('/admin');
//         else if (parsedUser.role === 'TEACHER') router.push('/teacher');
//         else if (parsedUser.role === 'STUDENT') router.push('/student');
//       }
//     } catch (error) {
//       console.error('Invalid localStorage user:', error);
//       localStorage.removeItem('user');
//     } finally {
//       setLoading(false);
//     }
//   }, [router]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSubmitting(true);

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ loginId, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data?.message || 'Login failed');
//         return;
//       }

//       const userData = {
//         ...data.user,
//         className: data.user.className || '',
//         courseName: data.user.courseName || '',
//       };

//       localStorage.setItem('user', JSON.stringify(userData));

//       if (userData.role === 'ADMIN') router.push('/admin');
//       else if (userData.role === 'TEACHER') router.push('/teacher');
//       else if (userData.role === 'STUDENT') router.push('/student');
//     } catch (error) {
//       console.error(error);
//       setError('Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <div className="p-10">Loading...</div>;

//   return (
//     <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-4"
//       >
//         <h1 className="text-3xl font-bold">Login</h1>

//         <input
//           value={loginId}
//           onChange={(e) => setLoginId(e.target.value)}
//           placeholder="Roll No / Username"
//           className="w-full border rounded-lg px-4 py-3 outline-none"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full border rounded-lg px-4 py-3 outline-none"
//         />

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full bg-blue-600 text-white rounded-lg py-3"
//         >
//           {submitting ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </main>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     loginId: '',
//     password: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (parsedUser?.role === 'STUDENT') {
//         router.push('/student');
//       } else if (parsedUser?.role === 'TEACHER') {
//         router.push('/teacher');
//       }
//     } catch (error) {
//       console.error('Failed to read saved user:', error);
//       localStorage.removeItem('user');
//     }
//   }, [router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           loginId: formData.loginId,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         setMessage(data.message || 'Login failed');
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem('user', JSON.stringify(data.user));

//       if (data.user.role === 'STUDENT') {
//         router.push('/student');
//       } else if (data.user.role === 'TEACHER') {
//         router.push('/teacher');
//       } else {
//         router.push('/');
//       }
//     } catch (error) {
//       console.error('LOGIN PAGE ERROR:', error);
//       setMessage('Something went wrong during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-slate-900">Student Assignment Portal</h1>
//           <p className="text-slate-600 mt-2">Login to continue</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label htmlFor="loginId" className="block text-sm font-medium text-slate-700 mb-2">
//               Login ID
//             </label>
//             <input
//               id="loginId"
//               name="loginId"
//               type="text"
//               value={formData.loginId}
//               onChange={handleChange}
//               placeholder="Enter your login ID"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {message && (
//             <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
//               {message}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     loginId: '',
//     password: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (parsedUser?.role === 'STUDENT') {
//         router.push('/student');
//       } else if (parsedUser?.role === 'TEACHER') {
//         router.push('/teacher');
//       } else if (parsedUser?.role === 'ADMIN') {
//         router.push('/admin');
//       }
//     } catch (error) {
//       console.error('Failed to read saved user:', error);
//       localStorage.removeItem('user');
//     }
//   }, [router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           loginId: formData.loginId,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         setMessage(data.message || 'Login failed');
//         return;
//       }

//       // localStorage.setItem('user', JSON.stringify(data.user));
//       localStorage.setItem(
//   'user',
//   JSON.stringify({
//     id: user._id || user.id,
//     name: user.name,
//     role: 'STUDENT',
//   })
// );

//       if (data.user.role === 'STUDENT') {
//         router.push('/student');
//       } else if (data.user.role === 'TEACHER') {
//         router.push('/teacher');
//       } else if (data.user.role === 'ADMIN') {
//         router.push('/admin');
//       } else {
//         setMessage('Unknown user role');
//         localStorage.removeItem('user');
//       }
//     } catch (error) {
//       console.error('LOGIN PAGE ERROR:', error);
//       setMessage('Something went wrong during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-slate-900">Student Assignment Portal</h1>
//           <p className="text-slate-600 mt-2">Login to continue</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label htmlFor="loginId" className="block text-sm font-medium text-slate-700 mb-2">
//               Login ID
//             </label>
//             <input
//               id="loginId"
//               name="loginId"
//               type="text"
//               value={formData.loginId}
//               onChange={handleChange}
//               placeholder="Enter your login ID"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {message && (
//             <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
//               {message}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     loginId: '',
//     password: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem('user');

//       if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       const role = String(parsedUser?.role || '').toUpperCase();

//       if (role === 'STUDENT') {
//         router.replace('/student');
//       } else if (role === 'TEACHER') {
//         router.replace('/teacher');
//       } else if (role === 'ADMIN') {
//         router.replace('/admin');
//       }
//     } catch (error) {
//       console.error('Failed to read saved user:', error);
//       localStorage.removeItem('user');
//     }
//   }, [router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           loginId: formData.loginId,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success || !data.user) {
//         setMessage(data.message || 'Login failed');
//         return;
//       }

//       const savedUser = {
//         id: data.user._id || data.user.id || data.user.userId,
//         _id: data.user._id || data.user.id || data.user.userId,
//         name: data.user.name || '',
//         loginId: data.user.loginId || '',
//         role: String(data.user.role || '').toUpperCase(),
//         email: data.user.email || '',
//       };

//       if (!savedUser.id || !savedUser.role) {
//         setMessage('Invalid user data received from server');
//         localStorage.removeItem('user');
//         return;
//       }

//       localStorage.setItem('user', JSON.stringify(savedUser));

//       if (savedUser.role === 'STUDENT') {
//         router.replace('/student');
//       } else if (savedUser.role === 'TEACHER') {
//         router.replace('/teacher');
//       } else if (savedUser.role === 'ADMIN') {
//         router.replace('/admin');
//       } else {
//         setMessage('Unknown user role');
//         localStorage.removeItem('user');
//       }
//     } catch (error) {
//       console.error('LOGIN PAGE ERROR:', error);
//       setMessage('Something went wrong during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Student Assignment Portal
//           </h1>
//           <p className="text-slate-600 mt-2">Login to continue</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label
//               htmlFor="loginId"
//               className="block text-sm font-medium text-slate-700 mb-2"
//             >
//               Login ID
//             </label>
//             <input
//               id="loginId"
//               name="loginId"
//               type="text"
//               value={formData.loginId}
//               onChange={handleChange}
//               placeholder="Enter your login ID"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-slate-700 mb-2"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {message && (
//             <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
//               {message}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        return;
      }

      const parsedUser = JSON.parse(savedUser);
      const role = String(parsedUser?.role || '').toUpperCase();

      if (role === 'STUDENT') {
        router.replace('/student');
      } else if (role === 'TEACHER') {
        router.replace('/teacher');
      } else if (role === 'ADMIN') {
        router.replace('/admin');
      }
    } catch (error) {
      console.error('Failed to read saved user:', error);
      localStorage.removeItem('user');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: formData.loginId,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.user) {
        setMessage(data.message || 'Login failed');
        return;
      }

      // We can rely on 'data.user.id' now because we fixed it in the backend
      const savedUser = {
        id: data.user.id,
        _id: data.user.id,
        name: data.user.name || '',
        loginId: data.user.loginId || '',
        role: String(data.user.role || '').toUpperCase(),
        email: data.user.email || '',
        course: data.user.course || '',
        className: data.user.className || '',
        section: data.user.section || '',
        subject: data.user.subject || ''
      };

      if (!savedUser.id || !savedUser.role) {
        setMessage('Invalid user data received from server');
        localStorage.removeItem('user');
        return;
      }

      localStorage.setItem('user', JSON.stringify(savedUser));

      if (savedUser.role === 'STUDENT') {
        router.replace('/student');
      } else if (savedUser.role === 'TEACHER') {
        router.replace('/teacher');
      } else if (savedUser.role === 'ADMIN') {
        router.replace('/admin');
      } else {
        setMessage('Unknown user role');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('LOGIN PAGE ERROR:', error);
      setMessage('Something went wrong during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Student Assignment Portal
          </h1>
          <p className="text-slate-600 mt-2">Login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="loginId" className="block text-sm font-medium text-slate-700 mb-2">
              Login ID
            </label>
            <input
              id="loginId"
              name="loginId"
              type="text"
              value={formData.loginId}
              onChange={handleChange}
              placeholder="Enter your login ID"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {message && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-600 text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}