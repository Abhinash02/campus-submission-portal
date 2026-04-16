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
    <div className="flex min-h-screen">
      <Sidebar title="Admin Panel" links={links} />
      <main className="flex-1 bg-slate-100 p-6 overflow-auto">{children}</main>
    </div>
  );
}