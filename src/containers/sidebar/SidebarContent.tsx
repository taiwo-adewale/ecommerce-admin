import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { BsFillHandbagFill } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { navItems } from "@/constants/navItems";

export default function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="pb-[5rem] h-full">
      <div className="py-6 px-2 flex flex-col overflow-y-auto h-full">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "font-bold text-2xl px-6 gap-2 justify-start min-h-fit"
          )}
        >
          <BsFillHandbagFill className="size-6 text-primary mb-1.5 flex-shrink-0" />
          <Typography component="span">Admin</Typography>
        </Link>

        <ul className="pt-6 flex flex-col gap-y-2">
          {navItems.map((navItem, index) => (
            <li key={`nav-item-${index}`}>
              <Link
                href={navItem.url}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "relative w-full justify-start px-5 py-4 gap-x-2.5 [&_svg]:size-6 [&_svg]:flex-shrink-0 font-medium text-base",
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

      <div className="px-6 py-4 absolute left-0 w-full right-0 bottom-0 border-t">
        <form action="/auth/sign-out" method="post">
          <Button
            type="submit"
            className="w-full py-3 text-base whitespace-nowrap"
          >
            <LogOut className="size-6 mr-3 flex-shrink-0" />
            Log out
          </Button>
        </form>
      </div>
    </div>
  );
}
