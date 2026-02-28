"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0f172a",
          color: "#ffffff",
          border: "1px solid #1e293b",
          fontSize: "14px",
        },
        success: {
          style: {
            background: "#0f172a",
            color: "#ffffff",
            border: "1px solid #16a34a",
          },
        },
        error: {
          style: {
            background: "#0f172a",
            color: "#ffffff",
            border: "1px solid #dc2626",
          },
        },
      }}
    />
  );
}
