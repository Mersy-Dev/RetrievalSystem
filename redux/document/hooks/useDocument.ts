// redux/document/hooks/useDocument.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchDocuments, uploadDocument, updateDocument } from "../Thunk";
import { resetUploadState, resetUpdateState } from "../Slice";

export const useDocuments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    allDocuments,
    loading,
    error,
    uploadStatus,
    uploadedDocument,
    updateStatus,
    updatedDocument,
  } = useSelector((state: RootState) => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  // ✅ helper for uploading
  const handleUpload = (formData: FormData) => {
    dispatch(uploadDocument(formData));
  };

  // ✅ helper for updating
  const handleUpdate = (id: number, formData: FormData) => {
    dispatch(updateDocument({ id, formData }));
  };

  // ✅ reset upload state (after showing toast, etc.)
  const resetUpload = () => {
    dispatch(resetUploadState());
  };

  // ✅ reset update state
  const resetUpdate = () => {
    dispatch(resetUpdateState());
  };

  return {
    allDocuments,
    loading,
    error,
    uploadStatus,
    uploadedDocument,
    updateStatus,
    updatedDocument,
    handleUpload,
    handleUpdate,
    resetUpload,
    resetUpdate,
  };
};
