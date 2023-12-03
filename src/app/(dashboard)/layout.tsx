import { redirect } from "next/navigation";

import Header from "@/containers/header";
import Sidebar from "@/containers/sidebar";
import Container from "@/components/ui/container";
import isAuth from "@/helpers/isAuth";

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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="w-full relative overflow-y-auto">
        <Header />

        <main className="pt-6 pb-8">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}
