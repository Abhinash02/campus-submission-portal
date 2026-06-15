// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function StudentDashboardPage() {
//   const router = useRouter();
  
//   // Apply the unified Auth State pattern
//   const [auth, setAuth] = useState({
//     loading: true,
//     student: null
//   });
  
//   const student = auth.student;

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const performAuthCheck = () => {
//       try {
//         const savedUser = localStorage.getItem('user');

//         if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
//           router.replace('/');
//           return;
//         }

//         const user = JSON.parse(savedUser);

//         if (user.role !== 'STUDENT') {
//           localStorage.removeItem('user');
//           router.replace('/');
//           return;
//         }

//         setAuth({
//           loading: false,
//           student: user
//         });
//       } catch (error) {
//         localStorage.removeItem('user');
//         router.replace('/');
//       }
//     };

//     performAuthCheck();
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.replace('/');
//   };

//   if (auth.loading) {
//     return (
//       <main className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <div className="text-sm font-medium text-slate-500 animate-pulse">Loading Profile...</div>
//         </div>
//       </main>
//     );
//   }

//   if (!student) return null;

//   return (
//     <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Page Header */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-5 mb-8 gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Dashboard</h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Welcome back, <span className="font-medium text-slate-700">{student?.name || 'Student'}</span>
//             </p>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="inline-flex items-center justify-center px-4 py-2 border border-red-500 shadow-sm text-sm font-medium rounded-lg text-white-200 bg-red-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//           > 
//             <svg className="w-4 h-4 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
//             </svg>
//             Sign out
//           </button>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
//           {/* Profile Details Card (Takes up 2 columns on large screens) */}
//           <div className="bg-white border border-slate-200 rounded-xl shadow-sm lg:col-span-2 overflow-hidden">
//             <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
//               <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//               </svg>
//               <h2 className="text-base font-semibold text-slate-800">Profile Information</h2>
//             </div>
            
//             <div className="p-6">
//               <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
//                 <div className="sm:col-span-1">
//                   <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Full Name</dt>
//                   <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.name || 'Not set'}</dd>
//                 </div>
//                 <div className="sm:col-span-1">
//                   <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Login ID / Roll No</dt>
//                   <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.loginId || 'Not set'}</dd>
//                 </div>
//                 <div className="sm:col-span-1">
//                   <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email Address</dt>
//                   <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.email || 'Not set'}</dd>
//                 </div>
//                 <div className="sm:col-span-1">
//                   <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Account Role</dt>
//                   <dd className="mt-1 text-sm font-semibold text-slate-900">
//                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                       {student?.role || 'STUDENT'}
//                     </span>
//                   </dd>
//                 </div>
//                 <div className="sm:col-span-1">
//                   <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Course Program</dt>
//                   <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.course || 'Not set'}</dd>
//                 </div>
//                 <div className="sm:col-span-1">
//                   <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Class & Section</dt>
//                   <dd className="mt-1 text-sm font-semibold text-slate-900">
//                     {student?.className || 'Not set'} <span className="text-slate-400 mx-1">•</span> Sec {student?.section || 'Not set'}
//                   </dd>
//                 </div>
//               </dl>
//             </div>
//           </div>

//           {/* Quick Actions Card (Takes up 1 column on large screens) */}
//           <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
//             <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
//               <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//               </svg>
//               <h2 className="text-base font-semibold text-slate-800">Quick Actions</h2>
//             </div>
            
//             <div className="p-4 space-y-3 flex-1 bg-slate-50/30">
//               {/* Action 1 */}
//               <button
//                 onClick={() => router.push('/student/submit')}
//                 className="w-full group flex items-start p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <div className="flex-shrink-0 mt-0.5">
//                   <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">Submit Assignment</h3>
//                   <p className="text-xs text-slate-500 mt-1">Upload a new document or file for review.</p>
//                 </div>
//               </button>

//               {/* Action 2 */}
//               <button
//                 onClick={() => router.push('/student/my-submissions')}
//                 className="w-full group flex items-start p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <div className="flex-shrink-0 mt-0.5">
//                   <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">My Submissions</h3>
//                   <p className="text-xs text-slate-500 mt-1">Check grades, statuses, and teacher feedback.</p>
//                 </div>
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

export default function StudentDashboardPage() {
  const router = useRouter();
  
  // Apply the unified Auth State pattern
  const [auth, setAuth] = useState({
    loading: true,
    student: null
  });
  
  const student = auth.student;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const performAuthCheck = () => {
      try {
        const savedUser = localStorage.getItem('user');

        if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
          router.replace('/');
          return;
        }

        const user = JSON.parse(savedUser);

        if (user.role !== 'STUDENT') {
          localStorage.removeItem('user');
          router.replace('/');
          return;
        }

        setAuth({
          loading: false,
          student: user
        });
      } catch (error) {
        localStorage.removeItem('user');
        router.replace('/');
      }
    };

    performAuthCheck();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.replace('/');
  };

  if (auth.loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <div className="text-sm font-medium text-slate-500 animate-pulse">Loading Dashboard...</div>
        </div>
      </main>
    );
  }

  if (!student) return null;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-slate-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-6 gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight">
              Student Dashboard
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Welcome back,{' '}
              <span className="font-semibold text-slate-800">{student?.name || 'Student'}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-red-500 shadow-sm font-medium rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Details Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 lg:col-span-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
            <div className="px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-xl text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Profile Information</h2>
            </div>
            
            <div className="p-8">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <div className="sm:col-span-1">
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Full Name</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.name || 'Not set'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Login ID / Roll No</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.loginId || 'Not set'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email Address</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.email || 'Not set'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Account Role</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {student?.role || 'STUDENT'}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Course Program</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{student?.course || 'Not set'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xs font-medium text-slate-500 uppercase tracking-wider">Class & Section</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    {student?.className || 'Not set'} <span className="text-slate-400 mx-1">•</span> Sec {student?.section || 'Not set'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
            <div className="px-8 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 flex items-center gap-3">
              <div className="p-2 bg-indigo-600/10 rounded-xl text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
            </div>
            
            <div className="p-6 space-y-4 flex-1">
              {/* Action 1 */}
              <button
                onClick={() => router.push('/student/submit')}
                className="w-full group flex items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Submit Assignment</h3>
                  <p className="text-xs text-slate-500 mt-1">Upload a new document or file for review.</p>
                </div>
              </button>

              {/* Action 2 */}
              <button
                onClick={() => router.push('/student/tests')}
                className="w-full group flex items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-violet-300 hover:shadow-md hover:bg-violet-50/30 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 group-hover:bg-violet-200 transition-colors">
                  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-violet-700 transition-colors">Take Tests</h3>
                  <p className="text-xs text-slate-500 mt-1">MCQ tests with instant results.</p>
                </div>
              </button>

              <button
                onClick={() => router.push('/student/marks')}
                className="w-full group flex items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-300 hover:shadow-md hover:bg-emerald-50/30 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">My Marks</h3>
                  <p className="text-xs text-slate-500 mt-1">See your marks growth over time.</p>
                </div>
              </button>

              <button
                onClick={() => router.push('/student/my-submissions')}
                className="w-full group flex items-center p-4 bg-white border border-slate-100 rounded-2xl hover:border-amber-300 hover:shadow-md hover:bg-amber-50/30 transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-amber-700 transition-colors">My Submissions</h3>
                  <p className="text-xs text-slate-500 mt-1">Check grades and teacher feedback.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}