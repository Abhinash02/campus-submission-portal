// import './globals.css';

// export const metadata = {
//   title: 'Student Assignment Portal',
//   description: 'Assignment submission portal for admin, teacher and student',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-slate-100 text-slate-900">{children}</body>
//     </html>
//   );
// }



// import './globals.css';
// import { Inter } from 'next/font/google';
// import { Toaster } from 'react-hot-toast';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Student Assignment Portal',
//   description: 'Assignment submission portal',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {children}
//         <Toaster position="top-right" />
//       </body>
//     </html>
//   );
// }


import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Student Assignment Portal',
  description: 'Assignment submission portal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}