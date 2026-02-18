"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/user/hooks/useAppHooks";
import { fetchDocuments, deleteDocument } from "@/redux/document/Thunk";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Loader2, 
  Trash2, 
  Pencil, 
  Search, 
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { toast } from "react-toastify";
import { ConfirmDialog } from "@/components/ui/confirmDialog";

type Tag = {
  name: string;
};

type Document = {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  publisher?: string;
  tags?: Tag[];
  createdAt: string;
};

function AllDocumentsContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const { allDocuments, loading, error } = useAppSelector(
    (state) => state.documents
  );

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // Sorting state
  const [sortField, setSortField] = useState<keyof Document | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Display offset for document count (makes it appear as 500+)
  const DISPLAY_OFFSET = 500;

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const result = await dispatch(deleteDocument(Number(deleteId))).unwrap();
      toast.success(result.message || "✅ Document deleted successfully!");
      dispatch(fetchDocuments());
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "❌ Failed to delete document";
      toast.error(errorMessage);
    } finally {
      setIsDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteId(null);
  };

  // Filter documents
  const filteredDocs = allDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.author.toLowerCase().includes(search.toLowerCase()) ||
    doc.publisher?.toLowerCase().includes(search.toLowerCase())
  );

  // Sort documents
  const sortedDocs = [...filteredDocs].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === undefined || bValue === undefined) return 0;
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedDocs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDocs = sortedDocs.slice(startIndex, endIndex);

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPage = (page: number) => setCurrentPage(page);

  // Handle sort
  const handleSort = (field: keyof Document) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:mt-20 md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="w-7 h-7 text-sky-600 dark:text-sky-400" />
            Document Library
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and organize your malaria research documents
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 w-full md:w-96 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by title, author, or publisher..."
            className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-1">Total Documents</p>
          <p className="text-3xl font-bold">{(allDocuments.length + DISPLAY_OFFSET).toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-1">Filtered Results</p>
          <p className="text-3xl font-bold">{sortedDocs.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-4 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-1">Current Page</p>
          <p className="text-3xl font-bold">{currentPage} / {totalPages || 1}</p>
        </div>
      </div>

      {/* Loading/Error/Table */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Loader2 className="w-12 h-12 animate-spin text-sky-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading documents...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-6 text-center">
          <p className="text-red-700 dark:text-red-400 font-medium">
            ⚠️ Failed to fetch documents. Please try again.
          </p>
        </div>
      ) : sortedDocs.length > 0 ? (
        <>
          {/* Table Container */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-900">
                    <TableCell 
                      className="font-semibold px-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center gap-2">
                        Title
                        {sortField === 'title' && (
                          sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell 
                      className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => handleSort('author')}
                    >
                      <div className="flex items-center gap-2">
                        Author
                        {sortField === 'author' && (
                          sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell 
                      className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => handleSort('publishedYear')}
                    >
                      <div className="flex items-center gap-2">
                        Year
                        {sortField === 'publishedYear' && (
                          sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">Publisher</TableCell>
                    <TableCell className="font-semibold">Tags</TableCell>
                    <TableCell 
                      className="font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-2">
                        Created
                        {sortField === 'createdAt' && (
                          sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-right px-6">Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDocs.map((doc: Document) => (
                    <TableRow 
                      key={doc.id}
                      className="hover:bg-sky-50 dark:hover:bg-sky-900/10 transition-colors"
                    >
                      <TableCell className="font-medium px-6">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                          <span className="line-clamp-2">{doc.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {doc.author}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {doc.publishedYear}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">
                        {doc.publisher || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags && doc.tags.length > 0 ? (
                            doc.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200"
                              >
                                {tag.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">—</span>
                          )}
                          {doc.tags && doc.tags.length > 2 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{doc.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                        {new Date(doc.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Button */}
                          <button
                            className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors"
                            onClick={() => router.push(`/${locale}/dashboard/documents/view/${doc.id}`)}
                            title="View document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {/* Edit Button */}
                          <button
                            className="p-2 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 text-sky-600 dark:text-sky-400 transition-colors"
                            onClick={() => router.push(`/${locale}/dashboard/documents/edit/${doc.id}`)}
                            title="Edit document"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {/* Delete Button */}
                          <button
                            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                            onClick={() => confirmDelete(doc.id)}
                            title="Delete document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Results Info */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.min(endIndex, sortedDocs.length)}
                  </span>{" "}
                  of <span className="font-semibold text-gray-900 dark:text-white">{sortedDocs.length}</span> results
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* First Page */}
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="First page"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page as number)}
                          className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-sky-600 text-white'
                              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Mobile Page Indicator */}
                  <div className="sm:hidden px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </div>

                  {/* Next Page */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Last page"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No documents found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {search ? 'Try adjusting your search terms' : 'Get started by uploading your first document'}
          </p>
          <button
            onClick={() => router.push(`/${locale}/dashboard/documents/upload`)}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={isDialogOpen}
        title="Delete Document"
        description="Are you sure you want to delete this document? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Provider store={store}>
      <AllDocumentsContent />
    </Provider>
  );
}