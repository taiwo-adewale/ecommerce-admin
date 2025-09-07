import { cookies } from "next/headers";

import Header from "@/components/shared/header";
import Container from "@/components/ui/container";
import AppSidebar from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <div className="flex flex-col flex-grow min-w-0">
        <Header />

        <main className="pt-6 pb-8 flex-grow print:!py-0">
          <Container>{children}</Container>
        </main>
      </div>
    </SidebarProvider>
  );
}
