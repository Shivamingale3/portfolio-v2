"use client";

import { SnackbarContextType, SnackbarProps } from "@/types/snackbar";
import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import ErrorBoundary from "./ErrorBoundry";
import Snackbar from "./Snackbar";

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider"
    );
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarProps[]>([]);

  const addSnackbar = useCallback((snackbar: Omit<SnackbarProps, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setSnackbars((prev) => [...prev, { ...snackbar, id }]);
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  return (
    <SnackbarContext.Provider value={{ addSnackbar, removeSnackbar }}>
      <ErrorBoundary>
        {children}
        {snackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            {...snackbar}
            onClose={() => removeSnackbar(snackbar.id)}
          />
        ))}
      </ErrorBoundary>
    </SnackbarContext.Provider>
  );
};
