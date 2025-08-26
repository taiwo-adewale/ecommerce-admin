import { Metadata } from "next";
import { ThemeProvider } from "@/lib/theme-provider";
import TanstackQueryProvider from "@/lib/tanstack-query-provider";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "@/contexts/UserContext";

// pages have to be rendered dynamically because supabase server component client uses cookies
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    template: "%s - Zorvex",
    default: "Zorvex",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TanstackQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <UserProvider>
              <TooltipProvider>{children}</TooltipProvider>

              <Toaster />
            </UserProvider>
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
