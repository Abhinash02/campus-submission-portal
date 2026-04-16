import Sidebar from '@/components/Sidebar';

export default function StudentLayout({ children }) {
  const links = [
    { href: '/student', label: 'Dashboard' },
    { href: '/student/submit', label: 'Submit Assignment' },
    { href: '/student/my-submissions', label: 'My Submissions' },
  ];

  return (
    <div className="flex">
      <Sidebar title="Student Panel" links={links} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}