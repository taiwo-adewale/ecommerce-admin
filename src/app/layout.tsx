import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/lib/theme-provider";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

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
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}

            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
