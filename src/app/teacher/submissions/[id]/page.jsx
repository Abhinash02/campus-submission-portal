// import { prisma } from '@/lib/prisma';

// export default async function SubmissionDetailPage({ params }) {
//   const submission = await prisma.assignmentSubmission.findUnique({
//     where: { id: params.id },
//     include: {
//       student: { include: { user: true } },
//       teacher: { include: { user: true } },
//     },
//   });

//   if (!submission) return <div>Submission not found</div>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Assignment Details</h1>
//       <div className="bg-white rounded-2xl shadow p-6 space-y-3">
//         <p><strong>Roll No:</strong> {submission.student.user.rollNo}</p>
//         <p><strong>Name:</strong> {submission.student.user.name}</p>
//         <p><strong>Class:</strong> {submission.student.className}</p>
//         <p><strong>Section:</strong> {submission.student.section}</p>
//         <p><strong>Teacher:</strong> {submission.teacher.user.name}</p>
//         <p><strong>Description:</strong> {submission.description}</p>
//         <p><strong>Status:</strong> {submission.status}</p>
//         <p><strong>Marks:</strong> {submission.marks ?? '-'}</p>
//         {submission.fileUrl && <a href={submission.fileUrl} className="text-blue-600 underline">Open Uploaded File</a>}
//       </div>

//       <form action="/api/teacher/evaluate" method="POST" className="bg-white rounded-2xl shadow p-6 space-y-4 max-w-xl">
//         <input type="hidden" name="submissionId" value={submission.id} />
//         <select name="status" defaultValue={submission.status} className="w-full border rounded-lg px-4 py-3">
//           <option value="PENDING">PENDING</option>
//           <option value="REVIEWED">REVIEWED</option>
//           <option value="APPROVED">APPROVED</option>
//           <option value="REJECTED">REJECTED</option>
//         </select>
//         <input name="marks" defaultValue={submission.marks ?? ''} placeholder="Marks" className="w-full border rounded-lg px-4 py-3" />
//         <textarea name="feedback" defaultValue={submission.feedback ?? ''} placeholder="Feedback" className="w-full border rounded-lg px-4 py-3 h-32" />
//         <button className="bg-green-600 text-white px-5 py-3 rounded-lg">Update Evaluation</button>
//       </form>
//     </div>
//   );
// }