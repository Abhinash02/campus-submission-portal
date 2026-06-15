'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editFile, setEditFile] = useState(null);
  const [editFileName, setEditFileName] = useState('');
  const [editFileUrl, setEditFileUrl] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingSubmission, setDeletingSubmission] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpenEditModal = (submission) => {
    setEditingSubmission(submission);
    setEditTitle(submission.title || '');
    setEditSubject(submission.subject || '');
    setEditDescription(submission.description || '');
    setEditFileName(submission.fileName || '');
    setEditFileUrl(submission.fileUrl || '');
    setEditFile(null);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!student || !editingSubmission) return;

    if (!editTitle.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      setEditLoading(true);

      let finalFileUrl = editFileUrl;
      let finalFileName = editFileName;

      // If a new file is chosen, upload it first
      if (editFile) {
        const uploadData = new FormData();
        uploadData.append('file', editFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadData });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
          toast.error(uploadJson.message || 'File upload failed');
          setEditLoading(false);
          return;
        }
        finalFileUrl = uploadJson.fileUrl;
        finalFileName = uploadJson.fileName || editFile.name;
      }

      const payload = {
        role: 'STUDENT',
        studentId: student._id || student.id,
        title: editTitle.trim(),
        subject: editSubject.trim(),
        description: editDescription.trim(),
        fileName: finalFileName,
        fileUrl: finalFileUrl,
      };

      const res = await fetch(`/api/submissions/${editingSubmission._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to update submission');
        return;
      }

      toast.success('Submission updated successfully!');
      setIsEditModalOpen(false);
      fetchSubmissions(); // refresh the list
    } catch (error) {
      console.error('EDIT ERROR:', error);
      toast.error('Something went wrong while updating');
    } finally {
      setEditLoading(false);
    }
  };

  const handleOpenDeleteModal = (submission) => {
    setDeletingSubmission(submission);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!student || !deletingSubmission) return;

    try {
      setDeleteLoading(true);
      const res = await fetch(
        `/api/submissions/${deletingSubmission._id}?studentId=${student._id || student.id}`,
        { method: 'DELETE' }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Failed to delete submission');
        return;
      }

      toast.success('Submission deleted successfully!');
      setIsDeleteModalOpen(false);
      fetchSubmissions(); // refresh the list
    } catch (error) {
      console.error('DELETE ERROR:', error);
      toast.error('Something went wrong while deleting');
    } finally {
      setDeleteLoading(false);
    }
  };

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
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
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
                          {item.fileUrl ? (
                            <a
                              href={item.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              View file ↗
                            </a>
                          ) : (
                            <span className="text-slate-400 text-sm">No file</span>
                          )}
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

                        <td className="px-6 py-5 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              disabled={item.status === 'Checked'}
                              onClick={() => handleOpenEditModal(item)}
                              className="inline-flex items-center px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                              title={item.status === 'Checked' ? 'Graded submissions cannot be edited' : 'Edit submission'}
                            >
                              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              disabled={item.status === 'Checked'}
                              onClick={() => handleOpenDeleteModal(item)}
                              className="inline-flex items-center px-3 py-1.5 border border-red-200 text-xs font-semibold rounded-xl text-red-600 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                              title={item.status === 'Checked' ? 'Graded submissions cannot be deleted' : 'Delete submission'}
                            >
                              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
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

              {/* Edit Submission Modal */}
              {isEditModalOpen && editingSubmission && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Backdrop */}
                    <div 
                      onClick={() => setIsEditModalOpen(false)}
                      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                      aria-hidden="true"
                    />

                    {/* Centering element */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    {/* Modal panel */}
                    <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-slate-100">
                      <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                          <h3 className="text-xl font-bold text-slate-900" id="modal-title">
                            Edit Submission Details
                          </h3>
                          <button 
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="text-slate-400 hover:text-slate-600 transition-colors p-1 bg-slate-50 hover:bg-slate-100 rounded-lg"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="mt-6 space-y-5">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Assignment Title *</label>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Subject</label>
                            <input
                              type="text"
                              value={editSubject}
                              onChange={(e) => setEditSubject(e.target.value)}
                              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Notes / Description</label>
                            <textarea
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                              rows={3}
                              placeholder="Add any extra notes here..."
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Attached File</label>
                            {editFileUrl ? (
                              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl mb-3 text-sm">
                                <span className="font-semibold text-slate-700 truncate max-w-[280px]">
                                  📄 {editFileName || 'view_file'}
                                </span>
                                <a 
                                  href={editFileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                  View Current ↗
                                </a>
                              </div>
                            ) : (
                              <div className="p-3 bg-amber-50 text-amber-700 rounded-xl text-xs font-medium mb-3">
                                No file uploaded.
                              </div>
                            )}

                            <div className="mt-1">
                              <label className="block text-xs text-slate-500 mb-2 font-medium">Replace file (optional, accept PDF or image):</label>
                              <input
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-600 bg-slate-50/50"
                              />
                              {editFile && (
                                <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                  </svg>
                                  New file selected: {editFile.name}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                            <button
                              type="button"
                              onClick={() => setIsEditModalOpen(false)}
                              disabled={editLoading}
                              className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={editLoading}
                              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                              {editLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                  Saving...
                                </>
                              ) : (
                                'Save Changes'
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Submission Modal */}
              {isDeleteModalOpen && deletingSubmission && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Backdrop */}
                    <div 
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                      aria-hidden="true"
                    />

                    {/* Centering element */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    {/* Modal panel */}
                    <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-slate-100">
                      <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                          <h3 className="text-xl font-bold text-slate-900" id="modal-title">
                            Delete Submission
                          </h3>
                          <button 
                            type="button"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="text-slate-400 hover:text-slate-600 transition-colors p-1 bg-slate-50 hover:bg-slate-100 rounded-lg"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-5 space-y-4">
                          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mx-auto">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-slate-600">
                              Are you sure you want to delete your submission for <strong className="text-slate-900">{deletingSubmission.title}</strong>?
                            </p>
                            <p className="text-xs text-red-500 font-semibold mt-2">
                              Warning: This action is permanent and cannot be undone.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                          <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(false)}
                            disabled={deleteLoading}
                            className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleDeleteConfirm}
                            disabled={deleteLoading}
                            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                          >
                            {deleteLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                Deleting...
                              </>
                            ) : (
                              'Delete Submission'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
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