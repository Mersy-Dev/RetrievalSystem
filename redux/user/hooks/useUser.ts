import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useAppHooks";
import { checkAuth, logoutUser } from "../Action";

export const useUser = () => {
  const dispatch = useAppDispatch();
  
  const { 
    user, 
    token,
    isAuthenticated, 
    loading, 
    error, 
    success 
  } = useAppSelector((state) => state.auth);

  // ✅ FIX: Only check auth once on mount, not on every render
  useEffect(() => {
    const hasChecked = sessionStorage.getItem('authChecked');
    
    if (!hasChecked && !isAuthenticated && !loading) {
      sessionStorage.setItem('authChecked', 'true');
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, loading]); // ✅ Added required dependencies

  const logout = () => {
    sessionStorage.removeItem('authChecked'); // Clear flag on logout
    dispatch(logoutUser());
  };

  const isAdmin = user?.role === "admin";
  const firstName = user?.name?.split(" ")[0] || "";

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    success,
    isAdmin,
    firstName,
    logout,
  };
};