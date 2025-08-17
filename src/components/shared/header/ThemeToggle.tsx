"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useGetMountStatus from "@/hooks/use-get-mount-status";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useGetMountStatus();

  if (!mounted) return <Skeleton className="size-10 rounded-full" />;

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
