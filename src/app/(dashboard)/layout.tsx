import { redirect } from "next/navigation";

import Header from "@/components/Header";
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
    <div>
      <Header />
      {children}
    </div>
  );
}
