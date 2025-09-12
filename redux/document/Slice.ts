// redux/document/Slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchDocuments, uploadDocument } from "./Thunk";

interface Tag {
  id: number;
  name: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  author: string;
  publishedYear: number;
  publisher?: string;
  referenceLink?: string;
  cloudinaryUrl: string;
  tags: Tag[];
  createdAt: string;
}

interface DocumentState {
  allDocuments: Document[];
  loading: boolean;
  error: string | null;
  uploadStatus: "idle" | "loading" | "success" | "failed";
  uploadedDocument: Document | null;
}

const initialState: DocumentState = {
  allDocuments: [],
  loading: false,
  error: null,
  uploadStatus: "idle",
  uploadedDocument: null,
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.uploadStatus = "idle";
      state.uploadedDocument = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchDocuments
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.allDocuments = action.payload.documents;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // uploadDocument
      .addCase(uploadDocument.pending, (state) => {
        state.uploadStatus = "loading";
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.uploadStatus = "success";
        state.uploadedDocument = action.payload;
        state.allDocuments.push(action.payload); // add new doc to list
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetUploadState } = documentSlice.actions;
export default documentSlice.reducer;
