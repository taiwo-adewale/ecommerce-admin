"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Settings, LogOut, LayoutGrid } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export default function Profile() {
  const { profile } = useUser();

  const getInitials = (name: string | null | undefined): string => {
    if (!name) return "??";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex ml-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="rounded-full ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <Avatar>
            <AvatarImage
              src={profile?.image_url ?? undefined}
              alt={profile?.name ?? "User avatar"}
              className="object-cover object-center"
            />
            <AvatarFallback>{getInitials(profile?.name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          alignOffset={-10}
          className="flex flex-col"
          align="end"
        >
          <DropdownMenuItem asChild>
            <Link
              href="/"
              className="w-full justify-start py-3.5 pl-3 pr-8 tracking-wide !cursor-pointer"
            >
              <LayoutGrid className="mr-3 size-5" /> Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/edit-profile"
              className="w-full justify-start py-3.5 pl-3 pr-8 tracking-wide !cursor-pointer"
            >
              <Settings className="mr-3 size-5" /> Edit Profile
            </Link>
          </DropdownMenuItem>

          <form action="/auth/sign-out" method="post">
            <DropdownMenuItem asChild>
              <button
                type="submit"
                className="w-full justify-start py-3.5 pl-3 pr-8 tracking-wide !cursor-pointer"
              >
                <LogOut className="mr-3 size-5" /> Log Out
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
