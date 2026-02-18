import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI.F.C - Artificial Intelligence Fighting Championship",
  description: "Where humans and AI fight for glory. Step into the octagon.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
