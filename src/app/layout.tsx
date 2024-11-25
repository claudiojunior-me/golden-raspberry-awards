import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/Menu";

export const metadata: Metadata = {
  title: "Golden Raspberry Awards",
  description: "Golden Raspberry Awards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <Menu />
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
