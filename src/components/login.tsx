"use client";

import { useState } from "react";

import { logIn, logOut, toggleAdmin } from "@/redux/features/auth-slice";
import { useDispatch } from "@/redux/utils";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(logIn(username));
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleToggleAdmin = () => {
    dispatch(toggleAdmin());
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border"
        />

        <button
          onClick={handleLogin}
          className="bg-zinc-700 text-white px-4 py-2 ml-2"
        >
          login
        </button>

        <button
          onClick={handleLogout}
          className="bg-zinc-700 text-white px-4 py-2 ml-2"
        >
          logout
        </button>

        <button
          onClick={handleToggleAdmin}
          className="bg-zinc-700 text-white px-4 py-2 ml-2"
        >
          toggle admin
        </button>
      </div>
    </div>
  );
}
