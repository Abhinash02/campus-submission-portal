import Sidebar from '@/components/Sidebar';

export default function TeacherLayout({ children }) {
  const links = [
    { href: '/teacher', label: 'Dashboard' },
    { href: '/teacher/submissions', label: 'Submissions' },
    { href: '/teacher/students', label: 'Students' },
    { href: '/teacher/notifications', label: 'Notifications' },
    { href: '/teacher/attendance', label: 'Attendance' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar title="Teacher Panel" links={links} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}