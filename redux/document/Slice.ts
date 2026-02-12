// redux/document/Slice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDocuments,
  fetchTranslatedDocument,
  uploadDocument,
  updateDocument,
  getSingleDocument,
  deleteDocument, // ✅ import delete thunk

} from "./Thunk";

interface Tag {
  id: number;
  name: string;
}

interface Feedback {
  id: number;
  userId?: number;
  comment?: string;
  rating?: number;
  createdAt?: string;
}

interface TranslationCache {
  language: string;
  title?: string;
  description?: string;
  author?: string;
  translatedAt?: string;
}

export interface Document {
  id: string;
  title: string;
  titleYo?: string;          // Yoruba translation (optional)
  description?: string;
  descriptionYo?: string;    // Yoruba translation (optional)
  author: string;
  authorYo?: string;         // Yoruba translation (optional)
  publishedYear: number;
  publisher?: string;
  referenceLink?: string;
  storageUrl: string;        // Supabase file path
  signedUrl?: string;        // temporary access URL
  pages?: number;            // total number of pages
  readingTime?: number;      // estimated reading time (minutes)
  fileSize?: number;         // in MB
  createdAt: string;
  updatedAt?: string;
  cloudinaryUrl?: string; // ✅ ADD THIS


  tags: Tag[];               // related tags
  feedbacks?: Feedback[];    // user feedback (if included in response)
  relatedDocs?: Document[];  // related documents
  translations?: TranslationCache[]; // translation records
}


interface DocumentState {
  allDocuments: Document[];
  singleDocument: Document | null;
  loading: boolean;
  error: string | null;
  success: string | null; // ✅ added for delete / general messages
  uploadStatus: "idle" | "loading" | "success" | "failed";
  updateStatus: "idle" | "loading" | "success" | "failed";
  deleteStatus: "idle" | "loading" | "success" | "failed"; // ✅ new
  uploadedDocument: Document | null;
  updatedDocument: Document | null;
}

const initialState: DocumentState = {
  allDocuments: [],
  singleDocument: null,
  loading: false,
  error: null,
  success: null,
  uploadStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
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
    resetDeleteState: (state) => { // ✅ new reset
      state.deleteStatus = "idle";
      state.success = null;
      state.error = null;
    },
    resetSingleDocument: (state) => {
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
      }).
      //Translated document
      addCase(fetchTranslatedDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTranslatedDocument.fulfilled, (state, action) => {
        state.loading = false;  
        // You might want to store the translated document somewhere
        // For now, we'll just log it
        console.log("Translated Document:", action.payload);
      })
      .addCase(fetchTranslatedDocument.rejected, (state, action) => {
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
      })

      // deleteDocument
      .addCase(deleteDocument.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
        state.success = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.allDocuments = state.allDocuments.filter(
          (doc) => doc.id !== String(action.payload.id)
        );
        state.success = action.payload.message;
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  resetUploadState,
  resetUpdateState,
  resetDeleteState, // ✅ export new reset action
  resetSingleDocument,
} = documentSlice.actions;

export default documentSlice.reducer;
