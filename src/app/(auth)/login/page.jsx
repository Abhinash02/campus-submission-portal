// 'use client';

// import { auth } from '@/lib/auth';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function LoginPage() {
//   const router = useRouter();
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     const res = await signIn('credentials', {
//       loginId,
//       password,
//       redirect: false,
//     });

//     if (res?.error) {
//       setError('Invalid credentials');
//       return;
//     }

//     if (loginId === 'admin') router.push('/admin');
//     else if (loginId === 'teacher1') router.push('/teacher');
//     else router.push('/student');
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
//       <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-4">
//         <h1 className="text-3xl font-bold">Login</h1>
//         <p className="text-slate-600 text-sm">Use roll number for student or username for admin/teacher.</p>
//         <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Roll No / Username" className="w-full border rounded-lg px-4 py-3" />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-lg px-4 py-3" />
//         {error && <p className="text-red-600 text-sm">{error}</p>}
//         <button className="w-full bg-blue-600 text-white rounded-lg py-3">Login</button>
//         <div className="text-xs text-slate-500 space-y-1">
//           <p>Admin: admin / 123456</p>
//           <p>Teacher: teacher1 / 123456</p>
//           <p>Student: 101 / 123456</p>
//         </div>
//       </form>
//     </main>
//   );
// }


// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function LoginPage() {
//   const router = useRouter();
//   const [loginId, setLoginId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ loginId, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data?.message || 'Login failed');
//         setLoading(false);
//         return;
//       }

//       if (data.role === 'ADMIN') router.push('/admin');
//       else if (data.role === 'TEACHER') router.push('/teacher');
//       else router.push('/student');
//     } catch (err) {
//       setError('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
//       <form
//         onSubmit={onSubmit}
//         className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-4"
//       >
//         <h1 className="text-3xl font-bold">Login</h1>
//         <p className="text-slate-600 text-sm">
//           Use roll number for student or username for admin/teacher.
//         </p>

//         <input
//           value={loginId}
//           onChange={(e) => setLoginId(e.target.value)}
//           placeholder="Roll No / Username"
//           className="w-full border rounded-lg px-4 py-3"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full border rounded-lg px-4 py-3"
//         />

//         {error && <p className="text-red-600 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white rounded-lg py-3 disabled:opacity-50"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>

//         <div className="text-xs text-slate-500 space-y-1">
//           <p>Admin: admin / 123456</p>
//           <p>Teacher: teacher1 / 123456</p>
//           <p>Student: 101 / 123456</p>
//         </div>
//       </form>
//     </main>
//   );
// }



'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await res.json();
      console.log('LOGIN RESPONSE:', data);

      if (!res.ok) {
        setError(data?.message || 'Login failed');
        return;
      }

      if (data.role === 'ADMIN') router.push('/admin');
      else if (data.role === 'TEACHER') router.push('/teacher');
      else if (data.role === 'STUDENT') router.push('/student');
      else setError('Role not found');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-slate-600 text-sm">Use roll number for student or username for admin/teacher.</p>

        <input
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="Roll No / Username"
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-3"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-3 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-xs text-slate-500 space-y-1">
          <p>Admin: admin / 123456</p>
          <p>Teacher: teacher1 / 123456</p>
          <p>Student: 101 / 123456</p>
        </div>
      </form>
    </main>
  );
}