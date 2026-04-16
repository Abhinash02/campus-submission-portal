import Link from 'next/link';

export default function SubmissionTable({ submissions = [], role = 'teacher' }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Roll No</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Teacher</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Marks</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.student.user.rollNo}</td>
              <td className="p-3">{item.student.user.name}</td>
              <td className="p-3">{item.student.className}</td>
              <td className="p-3">{item.student.section}</td>
              <td className="p-3">{item.teacher.user.name}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">{item.marks ?? '-'}</td>
              <td className="p-3">
                <Link href={`/${role}/submissions/${item.id}`} className="text-blue-600 hover:underline">
                  View More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}