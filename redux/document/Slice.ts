// redux/document/Slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchDocuments } from "./Thunk";

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
}

const initialState: DocumentState = {
  allDocuments: [],
  loading: false,
  error: null,
};

const documentSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDocuments
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.allDocuments = action.payload.documents; // assume payload matches updated Document interface
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default documentSlice.reducer;
