import { redirect } from "next/navigation";

import isAuth from "@/helpers/isAuth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
