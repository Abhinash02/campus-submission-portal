import Sidebar from '@/components/Sidebar';

export default function StudentLayout({ children }) {
  const links = [
    { href: '/student', label: 'Dashboard' },
    { href: '/student/submit', label: 'Submit Assignment' },
    { href: '/student/tests', label: 'Take Tests' },
    { href: '/student/marks', label: 'My Marks' },
    { href: '/student/my-submissions', label: 'Submissions' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar title="Student" links={links} accent="blue" />
      <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
    </div>
  );
}
