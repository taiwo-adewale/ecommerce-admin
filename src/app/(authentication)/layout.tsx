import { redirect } from "next/navigation";

import isAuth from "@/helpers/isAuth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the user is authenticated by calling the isAuth function.
  const session = await isAuth();

  // If the user has an active session, redirect them to the dashboard page.
  if (session) {
    return redirect("/");
  }

  return <main>{children}</main>;
}
