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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-sm font-medium text-slate-500 animate-pulse">Loading Profile...</div>
        </div>
      </main>
    );
  }

  if (!student) return null;

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-5 mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back, <span className="font-medium text-slate-700">{student?.name || 'Student'}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center px-4 py-2 border border-red-500 shadow-sm text-sm font-medium rounded-lg text-white-200 bg-red-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          > 
            <svg className="w-4 h-4 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Sign out
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Details Card (Takes up 2 columns on large screens) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm lg:col-span-2 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <h2 className="text-base font-semibold text-slate-800">Profile Information</h2>
            </div>
            
            <div className="p-6">
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
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

          {/* Quick Actions Card (Takes up 1 column on large screens) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h2 className="text-base font-semibold text-slate-800">Quick Actions</h2>
            </div>
            
            <div className="p-4 space-y-3 flex-1 bg-slate-50/30">
              {/* Action 1 */}
              <button
                onClick={() => router.push('/student/submit')}
                className="w-full group flex items-start p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">Submit Assignment</h3>
                  <p className="text-xs text-slate-500 mt-1">Upload a new document or file for review.</p>
                </div>
              </button>

              {/* Action 2 */}
              <button
                onClick={() => router.push('/student/my-submissions')}
                className="w-full group flex items-start p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">My Submissions</h3>
                  <p className="text-xs text-slate-500 mt-1">Check grades, statuses, and teacher feedback.</p>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}