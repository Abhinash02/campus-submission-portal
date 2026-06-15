'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ title, links, accent = 'blue' }) {
  const pathname = usePathname();
  const activeMap = {
    blue: 'bg-blue-600 text-white',
    emerald: 'bg-emerald-600 text-white',
    violet: 'bg-violet-600 text-white',
  };
  const activeCls = activeMap[accent] || activeMap.blue;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${activeCls}`}>
            {title?.charAt(0) || 'P'}
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">{title}</h2>
            <p className="text-xs text-slate-400">Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                isActive ? activeCls : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
