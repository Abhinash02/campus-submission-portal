import Sidebar from '@/components/Sidebar';

export default function TeacherLayout({ children }) {
  const links = [
    { href: '/teacher', label: 'Dashboard' },
    { href: '/teacher/assignments', label: 'Assignments' },
    { href: '/teacher/tests', label: 'Tests' },
    { href: '/teacher/submissions', label: 'Submissions' },
    { href: '/teacher/students', label: 'Students' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar title="Teacher" links={links} accent="emerald" />
      <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
