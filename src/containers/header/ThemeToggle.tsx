"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  if (theme === "light") {
    return (
      <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
        <Moon />
        <span className="sr-only">Dark Mode</span>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
      <Sun />
      <span className="sr-only">Light Mode</span>
    </Button>
  );
}
