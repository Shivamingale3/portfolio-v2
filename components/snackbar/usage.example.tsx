"use client";

import { Button } from "@/components/ui/button";
import { Bell, Info } from "lucide-react";
import { useSnackbarContext } from "./SnackbarProvider";

const SnackbarDemo = () => {
  const { addSnackbar } = useSnackbarContext();

  const showBasicSnackbar = () => {
    addSnackbar({
      header: "Basic Snackbar",
      description: "This is a basic snackbar notification.",
      status: "info",
    });
  };

  const showCustomSnackbar = () => {
    addSnackbar({
      header: "Custom Snackbar",
      description: "This is a custom snackbar with icons and expanded content.",
      status: "success",
      prefixIcon: <Bell />,
      suffixIcon: <Info />,
      expandedContent: <p>This is the expanded content of the snackbar.</p>,
      position: "top-right",
      timeout: 0,
    });
  };

  const showDialogSnackbar = () => {
    addSnackbar({
      header: "Warning",
      description: "Are you sure you want to delete this item?",
      status: "warning",
      isDialog: true,
      onConfirm: () => console.log("Confirmed"),
      onCancel: () => console.log("Cancelled"),
    });
  };

  const throwError = () => {
    throw new Error("This is a test error");
  };

  const throwAsyncError = () => {
    setTimeout(() => {
      throw new Error("This is an asynchronous test error");
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Button onClick={showBasicSnackbar}>Show Basic Snackbar</Button>
      <Button onClick={showCustomSnackbar}>Show Custom Snackbar</Button>
      <Button onClick={showDialogSnackbar}>Show Dialog Snackbar</Button>
      <Button onClick={throwError}>Throw Sync Error</Button>
      <Button onClick={throwAsyncError}>Throw Async Error</Button>
    </div>
  );
};

export default function Home() {
  return <SnackbarDemo />;
}
