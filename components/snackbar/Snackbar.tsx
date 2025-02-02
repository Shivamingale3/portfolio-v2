"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SnackbarProps } from "@/types/snackbar";

const Snackbar: React.FC<SnackbarProps & { onClose: () => void }> = ({
  position = "bottom-right",
  timeout = 5000,
  prefixIcon,
  suffixIcon,
  header,
  description,
  expandedContent,
  status = "info",
  isDialog = false,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isDialog && timeout > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [isDialog, timeout]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const statusColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed z-50 max-w-sm w-full shadow-lg rounded-lg overflow-hidden",
        position.includes("top") ? "top-4" : "bottom-4",
        position.includes("left")
          ? "left-4"
          : position.includes("right")
          ? "right-4"
          : "left-1/2 transform -translate-x-1/2"
      )}
    >
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {prefixIcon ||
              (status === "success" ? (
                <CheckCircle className="text-green-500" />
              ) : status === "error" ? (
                <XCircle className="text-red-500" />
              ) : status === "warning" ? (
                <AlertCircle className="text-yellow-500" />
              ) : (
                <AlertCircle className="text-blue-500" />
              ))}
            <div>
              {header && <h4 className="font-semibold">{header}</h4>}
              {description && (
                <p className="text-sm opacity-90">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {expandedContent && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1"
              >
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </button>
            )}
            {suffixIcon}
            <button onClick={handleClose} className="p-1">
              <X />
            </button>
          </div>
        </div>
        {isExpanded && expandedContent && (
          <div className="mt-2 pt-2 border-t border-white/20">
            {expandedContent}
          </div>
        )}
        {isDialog && (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => {
                onCancel?.();
                handleClose();
              }}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                handleClose();
              }}
              className={cn("px-3 py-1 rounded", statusColors[status])}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
      <div className={cn("h-1", statusColors[status])} />
    </div>
  );
};

export default Snackbar;
