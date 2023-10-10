import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";
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
      <Navbar />
      {children}
    </div>
  );
}
