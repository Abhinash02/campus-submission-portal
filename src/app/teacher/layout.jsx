import Sidebar from '@/components/Sidebar';

export default function TeacherLayout({ children }) {
  const links = [
    { href: '/teacher', label: 'Dashboard' },
    // { href: '/teacher/submissions', label: 'Submissions' },
    { href: '/teacher/notifications', label: 'Notifications' },
    { href: '/teacher/attendance', label: 'Attendance' },
  ];

  return (
    <div className="flex">
      <Sidebar title="Teacher Panel" links={links} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}