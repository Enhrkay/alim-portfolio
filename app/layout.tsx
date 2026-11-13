import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alim Abdulwasiu | AI Automation Engineer & Data Strategy Consultant",
  description:
    "Professional portfolio of Alim Abdulwasiu — AI Automation Engineer, Data Strategy Consultant and Trainer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
