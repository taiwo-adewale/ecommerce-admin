"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FetchDropdownContainer from "@/components/shared/FetchDropdownContainer";

import { createBrowserClient } from "@/lib/supabase/client";
import { fetchStaffRolesDropdown } from "@/services/staff";

export default function StaffFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [role, setRole] = useState(searchParams.get("role") || "");

  const {
    data: staffRoles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staff_roles"],
    queryFn: () => fetchStaffRolesDropdown(createBrowserClient()),
    staleTime: 5 * 60 * 1000,
  });

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (role && role !== "all") params.set("role", role);

    params.set("page", "1");
    params.set("limit", searchParams.get("limit") || "10");
    router.push(`/staff?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setRole("all");
    router.push("/staff");
  };

  return (
    <Card className="mb-5">
      <form
        onSubmit={handleFilter}
        className="flex flex-col md:flex-row gap-4 lg:gap-6"
      >
        <Input
          type="search"
          placeholder="Search by name, email or phone"
          className="h-12 md:basis-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={role} onValueChange={(value) => setRole(value)}>
          <SelectTrigger className="md:basis-1/3 capitalize">
            <SelectValue placeholder="Role" />
          </SelectTrigger>

          <SelectContent>
            <FetchDropdownContainer
              isLoading={isLoading}
              isError={isError}
              errorMessage="Failed to load staff roles"
            >
              <SelectItem key="all" value="all">
                All Roles
              </SelectItem>

              {!isLoading &&
                !isError &&
                staffRoles &&
                staffRoles.map((role) => (
                  <SelectItem
                    key={role.name}
                    value={role.name}
                    className="capitalize"
                  >
                    {role.display_name}
                  </SelectItem>
                ))}
            </FetchDropdownContainer>
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" size="lg" className="h-12 md:basis-1/3">
              <Plus className="mr-2 size-4" /> Add Staff
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <Button type="submit" size="lg" className="flex-grow">
            Filter
          </Button>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            className="flex-grow"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}
