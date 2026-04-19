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

// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// export default function Sidebar({ title, links }) {
//   const pathname = usePathname();

//   return (
//     <aside className="fixed top-0 left-0 z-50 h-screen w-72 bg-slate-950 text-slate-100 border-r border-slate-800 shadow-2xl">
//       <div className="flex h-full flex-col">
//         <div className="border-b border-slate-800 px-6 py-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold shadow-lg">
//               {title?.charAt(0) || 'S'}
//             </div>
//             <div>
//               <h2 className="text-xl font-bold tracking-wide text-white">{title}</h2>
//               <p className="text-sm text-slate-400">Dashboard Panel</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto px-4 py-5">
//           <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
//             Navigation
//           </p>

//           <nav className="space-y-2">
//             {links.map((link) => {
//               const isActive = pathname === link.href;

//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
//                     isActive
//                       ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30'
//                       : 'text-slate-300 hover:bg-slate-900 hover:text-white'
//                   }`}
//                 >
//                   <span
//                     className={`h-2.5 w-2.5 rounded-full transition-all ${
//                       isActive
//                         ? 'bg-white'
//                         : 'bg-slate-600 group-hover:bg-blue-400'
//                     }`}
//                   />
//                   <span>{link.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="border-t border-slate-800 p-4">
//           <div className="rounded-2xl bg-slate-900 p-4">
//             <p className="text-sm font-semibold text-white">Welcome back</p>
//             <p className="mt-1 text-xs leading-5 text-slate-400">
//               Manage assignments, submissions, and your dashboard from here.
//             </p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }