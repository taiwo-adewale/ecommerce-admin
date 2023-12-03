"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import useGetMountStatus from "@/hooks/useGetMountStatus";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const mounted = useGetMountStatus();
  const { theme, setTheme } = useTheme();

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
