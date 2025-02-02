import { SnackbarProps } from "@/types/snackbar";
import { useState, useCallback } from "react";

export const useSnackbar = () => {
  const [snackbars, setSnackbars] = useState<SnackbarProps[]>([]);

  const addSnackbar = useCallback((snackbar: Omit<SnackbarProps, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setSnackbars((prev) => [...prev, { ...snackbar, id }]);
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  return { snackbars, addSnackbar, removeSnackbar };
};
