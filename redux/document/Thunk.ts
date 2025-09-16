// redux/document/Thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// ✅ Fetch a single document
export const getSingleDocument = createAsyncThunk(
  "documents/getSingle",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/documents/${id}`);
      console.log("Fetched document:", response.data);
      return response.data; // backend returns the document object
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.error || "Failed to fetch document"
        );
      }
      return rejectWithValue("Failed to fetch document");
    }
  }
);


export const fetchDocuments = createAsyncThunk(
  "documents/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/documents");
      console.log("Fetched documents:", response.data);
      
      return response.data; // assuming backend returns { documents: [...] }

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.message || "Failed to fetch documents"
        );
      }
      return rejectWithValue("Failed to fetch documents");
    }
  }
);

// ✅ Upload a new document
export const uploadDocument = createAsyncThunk(
  "documents/upload",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Uploaded document:", response.data);
      return response.data.document; // backend returns { message, document }

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.error || "Failed to upload document"
        );
      }
      return rejectWithValue("Failed to upload document");
    }
  }
);

// ✅ Update an existing document
export const updateDocument = createAsyncThunk(
  "documents/update",
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`/api/documents/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Updated document:", response.data);
      return response.data.document; // backend returns { message, document }

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.error || "Failed to update document"
        );
      }
      return rejectWithValue("Failed to update document");
    }
  }
);


// ✅ Delete document thunk
export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/documents/${id}`);
      return { id, message: response.data.message };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.error || "Failed to delete document"
        );
      }
      return rejectWithValue("Failed to delete document");
    }
  }
);
