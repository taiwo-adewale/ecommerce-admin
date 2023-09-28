import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Admin",
  description: "Ecommer admin template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
