"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // show theme toggle button only after mount to avoid hydration errors
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
