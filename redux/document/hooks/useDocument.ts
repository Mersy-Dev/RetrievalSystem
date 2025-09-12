// redux/document/hooks/useDocument.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchDocuments, uploadDocument } from "../Thunk";
import { resetUploadState } from "../Slice";

export const useDocuments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allDocuments, loading, error, uploadStatus, uploadedDocument } =
    useSelector((state: RootState) => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  // helper for uploading
  const handleUpload = (formData: FormData) => {
    dispatch(uploadDocument(formData));
  };

  // helper to reset upload state (e.g. after showing a toast)
  const resetUpload = () => {
    dispatch(resetUploadState());
  };

  return {
    allDocuments,
    loading,
    error,
    uploadStatus,
    uploadedDocument,
    handleUpload,
    resetUpload,
  };
};
