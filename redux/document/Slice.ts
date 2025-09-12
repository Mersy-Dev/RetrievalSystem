// redux/document/Slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDocuments,
  uploadDocument,
  updateDocument,
  getSingleDocument, // ✅ import new thunk
} from "./Thunk";

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
  singleDocument: Document | null; // ✅ new
  loading: boolean;
  error: string | null;
  uploadStatus: "idle" | "loading" | "success" | "failed";
  updateStatus: "idle" | "loading" | "success" | "failed";
  uploadedDocument: Document | null;
  updatedDocument: Document | null;
}

const initialState: DocumentState = {
  allDocuments: [],
  singleDocument: null, // ✅ new
  loading: false,
  error: null,
  uploadStatus: "idle",
  updateStatus: "idle",
  uploadedDocument: null,
  updatedDocument: null,
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
    resetUpdateState: (state) => {
      state.updateStatus = "idle";
      state.updatedDocument = null;
      state.error = null;
    },
    resetSingleDocument: (state) => { // ✅ reset single doc
      state.singleDocument = null;
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
        state.allDocuments.push(action.payload);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.payload as string;
      })

      // updateDocument
      .addCase(updateDocument.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.updatedDocument = action.payload;
        state.allDocuments = state.allDocuments.map((doc) =>
          doc.id === action.payload.id ? action.payload : doc
        );
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload as string;
      })

      // getSingleDocument
      .addCase(getSingleDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDocument = action.payload;
      })
      .addCase(getSingleDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.singleDocument = null;
      });
  },
});

export const {
  resetUploadState,
  resetUpdateState,
  resetSingleDocument, // ✅ export reset action
} = documentSlice.actions;

export default documentSlice.reducer;
