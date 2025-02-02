"use client";

import React, { useEffect, useState } from "react";
import { useSnackbarContext } from "./SnackbarProvider";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);
  const { addSnackbar } = useSnackbarContext();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  useEffect(() => {
    if (error) {
      addSnackbar({
        header: "An error occurred",
        description: error.message,
        status: "error",
        timeout: 0,
        expandedContent: <pre>{error.stack}</pre>,
      });
    }
  }, [error, addSnackbar]);

  if (error) {
    // You might want to render a fallback UI here
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ErrorBoundary;
