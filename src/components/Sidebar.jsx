import Link from 'next/link';

export default function Sidebar({ title, links }) {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-lg px-4 py-2 bg-slate-800 hover:bg-slate-700">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}