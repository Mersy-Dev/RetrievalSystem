// redux/document/hooks/useDocument.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchDocuments } from "../Thunk";

export const useDocuments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allDocuments, loading, error } = useSelector(
    (state: RootState) => state.documents
  );

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return { allDocuments, loading, error };
};
