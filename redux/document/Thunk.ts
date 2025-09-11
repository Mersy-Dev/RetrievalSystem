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
