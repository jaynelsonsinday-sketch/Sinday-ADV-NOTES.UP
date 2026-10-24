import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteUp — a little space for your thoughts",
  description: "A calm, simple place to collect your notes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
