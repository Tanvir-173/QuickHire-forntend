import "./globals.css";
import { ReactNode } from "react";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "QuickHire",
  description: "Simple job board application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
