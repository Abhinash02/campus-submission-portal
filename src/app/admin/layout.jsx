// 'use client';

// import Sidebar from '@/components/Sidebar';

// export default function AdminLayout({ children }) {
//   const links = [
//     { href: '/admin', label: 'Dashboard' },
//     { href: '/admin/teachers', label: 'Manage Teachers' },
//     { href: '/admin/students', label: 'Manage Students' },
//     { href: '/admin/assignments', label: 'All Assignments' },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar title="Admin Panel" links={links} />
//       <main className="flex-1 bg-slate-100 p-6 overflow-auto">{children}</main>
//     </div>
//   );
// }

'use client';

import Sidebar from '@/components/Sidebar';

export default function AdminLayout({ children }) {
  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/teachers', label: 'Manage Teachers' },
    { href: '/admin/students', label: 'Manage Students' },
    { href: '/admin/assignments', label: 'All Assignments' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Sidebar title="Admin Panel" links={links} />

      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="mb-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 shadow-lg px-6 py-5">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Manage teachers, students, and assignments from one place.
          </p>
        </div>

        <div className="rounded-3xl bg-white/85 backdrop-blur-sm border border-slate-200 shadow-xl p-6 md:p-8 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}