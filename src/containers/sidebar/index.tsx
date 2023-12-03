"use client";

import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "@/redux/utils";
import { closeSidebar } from "@/redux/features/app-slice";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import SidebarContent from "@/containers/sidebar/SidebarContent";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import useGetMountStatus from "@/hooks/useGetMountStatus";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.app);
  const windowWidth = useGetWindowWidth();
  const mounted = useGetMountStatus();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  if (!mounted) {
    return null;
  }

  /* toggle sidebar button for large screens */
  if (windowWidth && windowWidth >= 1024) {
    return (
      <aside
        className={cn(
          "hidden lg:block bg-popover h-screen overflow-hidden flex-shrink-0 transition-all duration-500 shadow-md relative z-40",
          sidebarOpen ? "w-sidebar" : "w-0"
        )}
      >
        <SidebarContent />
      </aside>
    );
  }

  /* toggle sidebar button for small screens */
  return (
    <Sheet open={sidebarOpen}>
      <SheetContent
        side="left"
        className="w-full !max-w-sidebar bg-popover p-0"
        overlayOnClickFn={handleCloseSidebar}
      >
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
