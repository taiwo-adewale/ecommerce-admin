"use client";

import Login from "@/components/login";
import { useSelector } from "@/redux/utils";

export default function Home() {
  const { username, isAdmin } = useSelector((state) => state.auth.value);

  return (
    <main>
      <h1>Username: {username}</h1>

      {isAdmin && <p>This user is an admin</p>}

      <Login />
    </main>
  );
}
