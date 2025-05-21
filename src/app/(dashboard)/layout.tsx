import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import isAuth from "@/helpers/isAuth";
import Header from "@/components/shared/header";
import Container from "@/components/ui/container";
import AppSidebar from "@/components/shared/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the user is authenticated by calling the isAuth function.
  const session = await isAuth();

  // If the user is not authenticated (no session), redirect them to the login page.
  if (!session) {
    return redirect("/login");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <div className="w-full relative overflow-y-auto">
        <Header />

        <main className="pt-6 pb-8">
          <Container>{children}</Container>
        </main>
      </div>
    </SidebarProvider>
  );
}
