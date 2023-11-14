"use client";

import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "@/redux/utils";
import { closeSidebar } from "@/redux/features/app-slice";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import SidebarContent from "@/containers/sidebar/SidebarContent";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";

export default function SidebarDesktop() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.app);
  const windowWidth = useGetWindowWidth();

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  /* toggle sidebar button for large screens */
  if (windowWidth >= 1024) {
    return (
      <aside
        className={cn(
          "hidden lg:block  bg-popover h-screen overflow-y-auto overflow-x-hidden flex-shrink-0 transition-all duration-500 shadow-md relative z-40",
          sidebarOpen ? "w-[350px]" : "w-0"
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
        className="w-full !max-w-[350px] bg-popover"
        overlayOnClickFn={handleCloseSidebar}
      >
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
