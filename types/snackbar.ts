import type { ReactNode } from "react";

export type SnackbarPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type SnackbarStatus = "success" | "error" | "warning" | "info";

export interface SnackbarProps {
  id: string;
  position?: SnackbarPosition;
  timeout?: number;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  header?: string;
  description?: string;
  expandedContent?: ReactNode;
  status?: SnackbarStatus;
  isDialog?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface SnackbarContextType {
  addSnackbar: (snackbar: Omit<SnackbarProps, "id">) => void;
  removeSnackbar: (id: string) => void;
}
