"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/user/hooks/useAppHooks";
import { fetchDocuments } from "@/redux/document/Thunk";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash2, Pencil, Search, FileText } from "lucide-react";
import Button from "@/components/ui/button";

function AllDocumentsContent() {
  const dispatch = useAppDispatch();
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
        <div className="overflow-x-auto rounded-xl border border-gray-200  dark:border-gray-700 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800 ">
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead className="text-right px-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium px-6">{doc.title}</TableCell>
                  <TableCell>{"PDF"}</TableCell>
                  <TableCell>{"—"}</TableCell>
                  <TableCell>
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2 px-6">
                    <Button
                      defaultText="Update"
                      className="rounded-full border border-indigo-500 text-indigo-500 bg-white hover:bg-indigo-50"
                    >
                      <Pencil className="w-4 h-4 mr-1" /> Update
                    </Button>
                    <Button
                      defaultText="Delete"
                      className="rounded-full border border-red-500 text-red-500 bg-white hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
