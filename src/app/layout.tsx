import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startpath",
  description: "Turn your business idea into real action",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Ambient background glow */}
        <div className="ambient-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
