// redux/document/Thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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