import { ThemeProvider } from "@/lib/theme-provider";
import TanstackQueryProvider from "@/lib/tanstack-query-provider";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// pages have to be rendered dynamically because supabase server component client uses cookies
export const dynamic = "force-dynamic";

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
            <TooltipProvider>{children}</TooltipProvider>

            <Toaster />
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
