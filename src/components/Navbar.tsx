"use client";

import { Button } from "./ui/button";
import { ModeToggle } from "./ToggleTheme";

export default function Navbar() {
  return (
    <div>
      <form action="/auth/sign-out" method="post">
        <Button>Logout</Button>
      </form>

      <ModeToggle />
    </div>
  );
}
