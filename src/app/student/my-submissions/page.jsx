'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Helper function to color-code statuses
const getStatusBadge = (status) => {
  const lowerStatus = (status || '').toLowerCase();
  if (lowerStatus === 'checked' || lowerStatus === 'approved') {
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  }
  if (lowerStatus === 'under review') {
    return 'bg-amber-100 text-amber-700 border-amber-200';
  }
  if (lowerStatus === 'rejected') {
    return 'bg-red-100 text-red-700 border-red-200';
  }
  return 'bg-blue-100 text-blue-700 border-blue-200'; // default/submitted
};

export default function MySubmissionsPage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Server-Side Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const savedUser = localStorage.getItem('user');

      if (!savedUser || savedUser === 'undefined' || savedUser === 'null') {
        router.push('/');
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (parsedUser.role !== 'STUDENT') {
        router.push('/');
        return;
      }

      setStudent(parsedUser);

      // FIX: Passing page and limit to the API for server-side pagination
      const res = await fetch(
        `/api/submissions?studentLoginId=${parsedUser.loginId}&page=${currentPage}&limit=${itemsPerPage}`
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        console.error(data.message || 'Failed to fetch submissions');
        setLoading(false);
        return;
      }

      // The backend now returns the exact 5 items for the current page
      setSubmissions(data.submissions || []);
      
      // FIX: Setting total pages based on the backend's math, not the frontend's
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
        setTotalItems(data.pagination.total || 0);
      }
    } catch (error) {
      console.error('FETCH ERROR:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, router]); // Re-run when currentPage changes

  // Trigger fetch when component mounts or when currentPage changes
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Calculate starting index for row numbers
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Submissions
            </h1>
            <div className="mt-2 flex items-center gap-2 text-slate-500">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Student: <span className="font-semibold text-slate-700">{student?.name || 'Loading...'}</span></span>
            </div>
          </div>

          <button
            onClick={() => router.push('/student')}
            className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 bg-white">
            <h2 className="text-lg font-bold text-slate-800">Assignment History</h2>
            <p className="text-sm text-slate-500 mt-1">Review your submitted work, grades, and teacher feedback.</p>
          </div>

          {loading ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-500 font-medium animate-pulse">Fetching your records...</p>
            </div>
          ) : submissions.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No submissions found</h3>
              <p className="text-slate-500 mt-1 max-w-sm mx-auto">You haven't uploaded any assignments yet. Once you do, they will appear here.</p>
              <button 
                onClick={() => router.push('/student/submit')}
                className="mt-6 text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center"
              >
                Submit an assignment now
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          ) : (
            /* Data Table */
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">File</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Feedback</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Teacher</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {submissions.map((item, index) => (
                      <tr key={item._id} className="hover:bg-slate-50/80 transition-colors duration-150">
                        
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-400 font-medium">
                          {startIndex + index + 1}
                        </td>
                        
                        <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-slate-900">
                          {item.title}
                        </td>

                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600">
                          {item.subject}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600 min-w-[200px]">
                          {item.description || '-'}
                        </td>
                        
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center text-sm">
                            <svg className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                            <span className="text-slate-600 truncate max-w-[150px]" title={item.fileName || item.fileUrl}>
                              {item.fileName || item.fileUrl || 'No file'}
                            </span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                            {item.status || 'Pending'}
                          </span>
                        </td>
                        
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-baseline">
                            <span className="text-base font-bold text-slate-900">{item.marks ?? '-'}</span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-5">
                          <div className="text-sm text-slate-600 max-w-[250px] line-clamp-2 italic" title={item.feedback}>
                            {item.feedback ? `"${item.feedback}"` : <span className="text-slate-400 not-italic">-</span>}
                          </div>
                        </td>
                        
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-700 font-medium">
                          {item.reviewedBy || item.teacherName || <span className="text-slate-400 font-normal">Not reviewed</span>}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Server-Side Pagination Footer */}
              {totalPages > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50 gap-4 mt-auto">
                  <p className="text-sm text-slate-600">
                    Showing <span className="font-medium text-slate-900">{totalItems === 0 ? 0 : startIndex + 1}</span> to <span className="font-medium text-slate-900">{Math.min(startIndex + itemsPerPage, totalItems)}</span> of <span className="font-medium text-slate-900">{totalItems}</span> entries
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage >= totalPages}
                      className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}