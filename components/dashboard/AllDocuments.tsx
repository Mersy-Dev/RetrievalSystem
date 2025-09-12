"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation"; // ✅ Add this
import { useAppDispatch, useAppSelector } from "@/redux/user/hooks/useAppHooks";
import { fetchDocuments } from "@/redux/document/Thunk";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash2, Pencil, Search, FileText } from "lucide-react";
    
type Tag = {
  name: string;
};

type Document = {
  id: string;
  title: string;
  author: string;
  publishedYear: number; // Match redux slice type
  publisher?: string;
  tags?: Tag[];
  createdAt: string;
};

function AllDocumentsContent() {
  const dispatch = useAppDispatch();
    const router = useRouter(); // ✅ for navigation

  const { allDocuments, loading, error } = useAppSelector(
    (state) => state.documents
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const filteredDocs = allDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-500" />
          Documents
        </h1>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 w-full md:w-80">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Loading/Error/Table */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">
          Failed to fetch documents. Try again.
        </p>
      ) : filteredDocs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-medium px-6">Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published Year</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell className="text-right px-6">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.map((doc: Document) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium px-6">{doc.title}</TableCell>
                <TableCell>{doc.author}</TableCell>
                <TableCell>{doc.publishedYear}</TableCell>
                <TableCell>{doc.publisher || "—"}</TableCell>
                <TableCell>
                  {doc.tags?.map((t: Tag) => t.name).join(", ") || "—"}
                </TableCell>
                <TableCell>
                  {new Date(doc.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-3 px-6">
                  {/* Update icon */}
                  <button
                    className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-500"
                    onClick={() => router.push(`/dashboard/documents/edit/${doc.id}`)
}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  {/* Delete icon */}
                  <button
                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
                    onClick={() => console.log("Delete doc:", doc.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No documents found.
        </p>
      )}
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
