"use client";

import { Menu } from "lucide-react";

import { useDispatch } from "@/redux/utils";
import { toggleSidebar, openSidebar } from "@/redux/features/app-slice";
import { Button } from "@/components/ui/button";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";

export default function NavMenuToggle() {
  const dispatch = useDispatch();
  const windowWidth = useGetWindowWidth();

  // toggle sidebar function
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  // open sidebar function
  const handleSidebarOpen = () => {
    dispatch(openSidebar());
  };

  /* toggle sidebar button for large screens */
  if (windowWidth >= 1024) {
    return (
      <Button variant="ghost" size="icon" onClick={handleToggleSidebar}>
        <Menu />
      </Button>
    );
  }

  /* toggle sidebar button for small screens */
  return (
    <Button variant="ghost" size="icon" onClick={handleSidebarOpen}>
      <Menu />
    </Button>
  );
}
