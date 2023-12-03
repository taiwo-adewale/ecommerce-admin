import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { BsFillHandbagFill } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/navItems";

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="pb-[5rem] h-full">
      <div className="py-6 flex flex-col overflow-y-auto h-full">
        <h2 className="font-bold text-2xl mx-6 flex gap-2 items-center">
          <BsFillHandbagFill className="w-6 h-6 text-primary mb-1.5" />
          <span>Admin</span>
        </h2>

        <ul className="pt-6 flex flex-col">
          {navItems.map((navItem, index) => (
            <li key={`nav-item-${index}`}>
              <Link
                href={navItem.url}
                className={cn(
                  "relative px-6 py-4 flex items-center gap-x-2.5 text-popover-foreground [&_svg]:w-6  [&_svg]:h-6 font-medium",
                  pathname === navItem.url &&
                    "after:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:bg-primary after:rounded-r-lg"
                )}
              >
                {navItem.icon} {navItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-4 absolute left-0 w-full right-0 bottom-0">
        <form action="/auth/sign-out" method="post">
          <Button type="submit" className="w-full py-3 text-base">
            <LogOut className="w-6 h-6 mr-3" />
            Log out
          </Button>
        </form>
      </div>
    </div>
  );
}
