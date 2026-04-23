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

//       // We can rely on 'data.user.id' now because we fixed it in the backend
//       const savedUser = {
//         id: data.user.id,
//         _id: data.user.id,
//         name: data.user.name || '',
//         loginId: data.user.loginId || '',
//         role: String(data.user.role || '').toUpperCase(),
//         email: data.user.email || '',
//         course: data.user.course || '',
//         className: data.user.className || '',
//         section: data.user.section || '',
//         subject: data.user.subject || ''
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
//         id: data.user.id,
//         _id: data.user.id,
//         name: data.user.name || '',
//         loginId: data.user.loginId || '',
//         role: String(data.user.role || '').toUpperCase(),
//         email: data.user.email || '',
//         course: data.user.course || '',
//         className: data.user.className || '',
//         section: data.user.section || '',
//         subject: data.user.subject || ''
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
//     <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 flex items-center justify-center px-4">
//       {/* Background Effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-[-120px] left-[-80px] w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-[-120px] right-[-80px] w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-sky-400/10 rounded-full blur-3xl animate-bounce [animation-duration:6s]"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_20%)]"></div>
//       </div>

//       <div className="relative w-full max-w-md">
//         <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 animate-[fadeIn_.6s_ease-out]">
//           <div className="mb-8 text-center">
//             <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 20.055a12.083 12.083 0 01-6.16-9.477L12 14z"
//                 />
//               </svg>
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
//               Student Assignment Portal
//             </h1>
//             <p className="text-blue-100/80 mt-3 text-sm md:text-base">
//               Login to continue to your dashboard
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label
//                 htmlFor="loginId"
//                 className="block text-sm font-medium text-blue-50 mb-2"
//               >
//                 Login ID
//               </label>
//               <input
//                 id="loginId"
//                 name="loginId"
//                 type="text"
//                 value={formData.loginId}
//                 onChange={handleChange}
//                 placeholder="Enter your login ID"
//                 className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-blue-100/50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
//                 required
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-blue-50 mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-blue-100/50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
//                 required
//               />
//             </div>

//             {message && (
//               <div className="rounded-xl bg-red-500/15 border border-red-300/30 px-4 py-3 text-red-100 text-sm backdrop-blur-sm animate-pulse">
//                 {message}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white py-3 font-semibold shadow-lg shadow-blue-900/40 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>
//         </div>
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

  // Quick login handlers
  const handleQuickLogin = async (loginId, password) => {
    setFormData({ loginId, password });
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.user) {
        setMessage(data.message || 'Login failed');
        return;
      }

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

      localStorage.setItem('user', JSON.stringify(savedUser));

      if (savedUser.role === 'STUDENT') {
        router.replace('/student');
      } else if (savedUser.role === 'TEACHER') {
        router.replace('/teacher');
      } else if (savedUser.role === 'ADMIN') {
        router.replace('/admin');
      }
    } catch (error) {
      console.error('Quick login error:', error);
      setMessage('Something went wrong during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-120px] left-[-80px] w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-120px] right-[-80px] w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-sky-400/10 rounded-full blur-3xl animate-bounce [animation-duration:6s]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_20%)]"></div>
      </div>

      <div className="relative w-full max-w-4xl flex flex-col lg:flex-row gap-8 items-center">
        {/* Left - Login Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 animate-[fadeIn_.6s_ease-out]">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0112 20.055a12.083 12.083 0 01-6.16-9.477L12 14z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Student Assignment Portal
              </h1>
              <p className="text-blue-100/80 mt-3 text-sm md:text-base">
                Login to continue to your dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="loginId"
                  className="block text-sm font-medium text-blue-50 mb-2"
                >
                  Login ID
                </label>
                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  value={formData.loginId}
                  onChange={handleChange}
                  placeholder="Enter your login ID"
                  className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-blue-100/50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-blue-50 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-blue-100/50 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                  required
                  disabled={loading}
                />
              </div>

              {message && (
                <div className="rounded-xl bg-red-500/15 border border-red-300/30 px-4 py-3 text-red-100 text-sm backdrop-blur-sm animate-pulse">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white py-3 font-semibold shadow-lg shadow-blue-900/40 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>

        {/* Right - Quick Login Buttons */}
        <div className="w-full lg:w-1/2 max-w-sm flex flex-col gap-4 lg:items-end">
          <div className="backdrop-blur-xl bg-white/5 border border-white/15 shadow-xl rounded-2xl p-6 w-full lg:w-72 animate-[fadeInUp_.6s_ease-out_.3s_both]">
            <h3 className="text-lg font-semibold text-white mb-6 text-center lg:text-right">
              Quick Demo Login
            </h3>
            
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleQuickLogin('ADMIN1', '123456')}
                disabled={loading}
                className="w-full group bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg shadow-orange-900/30 hover:scale-[1.02] hover:shadow-orange-500/40 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <div className="w-3 h-3 bg-white/20 rounded-full group-hover:bg-white"></div>
                Admin
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('202', '123456')}
                disabled={loading}
                className="w-full group bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg shadow-emerald-900/30 hover:scale-[1.02] hover:shadow-emerald-500/40 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <div className="w-3 h-3 bg-white/20 rounded-full group-hover:bg-white"></div>
                Teacher
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('1802', '123')}
                disabled={loading}
                className="w-full group bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg shadow-purple-900/30 hover:scale-[1.02] hover:shadow-purple-500/40 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <div className="w-3 h-3 bg-white/20 rounded-full group-hover:bg-white"></div>
                Student
              </button>
            </div>

            <p className="text-xs text-blue-200/70 mt-4 text-center lg:text-right">
              Demo passwords: <code className="bg-white/10 px-1 py-0.5 rounded font-mono text-xs">admin, teacher, student Click Above. <br></br> Login to paticular panel.</code>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}