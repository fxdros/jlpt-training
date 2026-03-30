import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JLPT N2 Quiz",
  description: "Latihan kosakata dan kanji JLPT N2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
